import { toCsv } from "./csv";
import { formatUsdPlain } from "./money";
import type { PayoutSummary } from "./stripe-types";

/**
 * Journal construction assumptions
 * --------------------------------
 * One compound journal per payout/file:
 *   Dr Bank (or Undeposited Funds / Stripe Clearing)  = deposit net
 *   Dr Stripe Processing Fees                          = total fees
 *   Dr Sales Returns / Refunds                         = |refund gross| (if any)
 *   Cr Stripe Sales / Income                           = charge (and other positive) gross
 *
 * Account names are placeholders — map them in QBO/Xero to your chart of accounts.
 * We do not claim CPA-grade tax treatment; multi-currency is warned but not converted.
 */

export type JournalLine = {
  account: string;
  debit: number; // cents
  credit: number; // cents
  memo: string;
};

export function buildJournalLines(summary: PayoutSummary): JournalLine[] {
  const lines: JournalLine[] = [];
  const dateLabel = summary.payoutDate || "payout";
  const ref = summary.payoutId !== "(unknown)" ? summary.payoutId : "Stripe payout";

  // Bank side = net deposit
  lines.push({
    account: "Bank - Stripe Payouts",
    debit: Math.max(summary.netCents, 0),
    credit: Math.max(-summary.netCents, 0),
    memo: `Stripe deposit ${ref} ${dateLabel}`,
  });

  if (summary.feeCents !== 0) {
    lines.push({
      account: "Stripe Processing Fees",
      debit: Math.max(summary.feeCents, 0),
      credit: Math.max(-summary.feeCents, 0),
      memo: `Stripe fees for ${ref}`,
    });
  }

  const refundAbs = Math.abs(summary.refundGrossCents);
  if (refundAbs > 0) {
    lines.push({
      account: "Sales Returns and Refunds",
      debit: refundAbs,
      credit: 0,
      memo: `Stripe refunds in ${ref}`,
    });
  }

  // Credit income for positive gross activity (charges + any other positive gross)
  let incomeCredit = 0;
  for (const [cat, agg] of Object.entries(summary.byCategory)) {
    if (cat === "refund") continue;
    if (agg.grossCents > 0) incomeCredit += agg.grossCents;
  }
  // If refunds were the only negative gross, income = total gross + |refunds|
  // Equivalent: charge gross (+ other positive). Prefer chargeGross when present.
  if (summary.chargeGrossCents > 0) {
    incomeCredit = summary.chargeGrossCents;
    for (const [cat, agg] of Object.entries(summary.byCategory)) {
      if (cat === "charge" || cat === "refund") continue;
      if (agg.grossCents > 0) incomeCredit += agg.grossCents;
    }
  }

  if (incomeCredit > 0) {
    lines.push({
      account: "Stripe Sales",
      debit: 0,
      credit: incomeCredit,
      memo: `Stripe charges settled in ${ref}`,
    });
  }

  // Balance pad for edge categories (disputes, adjustments) where gross/fee/net don't fit the simple model
  const debitSum = lines.reduce((s, l) => s + l.debit, 0);
  const creditSum = lines.reduce((s, l) => s + l.credit, 0);
  const delta = debitSum - creditSum;
  if (delta !== 0) {
    lines.push({
      account: "Stripe Clearing Adjustments",
      debit: delta < 0 ? -delta : 0,
      credit: delta > 0 ? delta : 0,
      memo: `Balancing adjustment for ${ref} (review category mix)`,
    });
  }

  return lines;
}

export function journalIsBalanced(lines: JournalLine[]): boolean {
  const d = lines.reduce((s, l) => s + l.debit, 0);
  const c = lines.reduce((s, l) => s + l.credit, 0);
  return d === c;
}

/** QuickBooks Online–friendly journal CSV (Journal Entry import style). */
export function toQboJournalCsv(summary: PayoutSummary): string {
  const lines = buildJournalLines(summary);
  const journalNo = `SC-${(summary.payoutId || "PAYOUT").replace(/[^a-zA-Z0-9]/g, "").slice(-12) || "1"}`;
  const date = summary.payoutDate || new Date().toISOString().slice(0, 10);

  const headers = [
    "JournalNo",
    "JournalDate",
    "AccountName",
    "Debits",
    "Credits",
    "Description",
    "Currency",
  ];

  const rows = lines.map((l) => [
    journalNo,
    date,
    l.account,
    l.debit ? formatUsdPlain(l.debit) : "",
    l.credit ? formatUsdPlain(l.credit) : "",
    l.memo,
    summary.currency.toUpperCase(),
  ]);

  return toCsv(headers, rows);
}

/** Xero Manual Journal–style CSV. Amount: positive = debit, negative = credit (common pattern). */
export function toXeroJournalCsv(summary: PayoutSummary): string {
  const lines = buildJournalLines(summary);
  const date = summary.payoutDate || new Date().toISOString().slice(0, 10);
  const narration = `Stripe payout ${summary.payoutId} — SettleClear`;

  const headers = [
    "*Narration",
    "*Date",
    "*AccountCode",
    "AccountName",
    "*Amount",
    "Description",
    "TrackingName1",
    "TrackingOption1",
  ];

  // Xero often wants account codes; we put a placeholder code and the name for mapping.
  const codeFor = (name: string): string => {
    if (name.startsWith("Bank")) return "090";
    if (name.includes("Fees")) return "404";
    if (name.includes("Refunds")) return "260";
    if (name.includes("Sales")) return "200";
    return "999";
  };

  const rows = lines.map((l) => {
    const amountCents = l.debit > 0 ? l.debit : -l.credit;
    return [
      narration,
      date,
      codeFor(l.account),
      l.account,
      formatUsdPlain(amountCents),
      l.memo,
      "",
      "",
    ];
  });

  return toCsv(headers, rows);
}

export function downloadBlob(filename: string, content: string, mime = "text/csv;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
