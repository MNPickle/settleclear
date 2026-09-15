import { parseCsv, rowsToObjects } from "./csv";
import { parseAmountToCents } from "./money";
import {
  HEADER_ALIASES,
  REQUIRED_HEADERS,
  type PayoutSummary,
  type StripeTxn,
} from "./stripe-types";

function normalizeHeader(h: string): string {
  const key = h.trim().toLowerCase().replace(/\s+/g, "_");
  return HEADER_ALIASES[key] ?? key;
}

function normalizeRow(raw: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    out[normalizeHeader(k)] = v;
  }
  return out;
}

function rowToTxn(row: Record<string, string>, index: number): StripeTxn {
  return {
    balanceTransactionId:
      row.balance_transaction_id || `row_${index + 1}`,
    payoutId: row.automatic_payout_id || "",
    payoutEffectiveAt: row.automatic_payout_effective_at || "",
    created: row.created || "",
    availableOn: row.available_on || "",
    currency: (row.currency || "usd").toLowerCase(),
    grossCents: parseAmountToCents(row.gross ?? "0"),
    feeCents: parseAmountToCents(row.fee ?? "0"),
    netCents: parseAmountToCents(row.net ?? "0"),
    reportingCategory: (row.reporting_category || "unknown").toLowerCase(),
    description: row.description || "",
    sourceId: row.source_id || "",
    chargeId: row.charge_id || "",
    customerEmail: row.customer_email || "",
    customerName: row.customer_name || "",
  };
}

/** Activity rows that contribute to the bank deposit (exclude the payout BT itself). */
function isActivityRow(txn: StripeTxn): boolean {
  return txn.reportingCategory !== "payout" && txn.reportingCategory !== "payout_failure";
}

export function parseStripeCsv(text: string): PayoutSummary {
  const matrix = parseCsv(text);
  if (matrix.length < 2) {
    throw new Error("CSV looks empty — need a header row and at least one transaction.");
  }

  const objects = rowsToObjects(matrix).map(normalizeRow);
  const headers = Object.keys(objects[0] ?? {});
  for (const req of REQUIRED_HEADERS) {
    if (!headers.includes(req)) {
      throw new Error(
        `Missing required column "${req}". Export Stripe’s itemized payout reconciliation CSV (gross, fee, net, currency).`
      );
    }
  }

  const allTxns = objects.map(rowToTxn);
  const transactions = allTxns.filter(isActivityRow);
  if (transactions.length === 0) {
    throw new Error("No activity transactions found in this CSV.");
  }

  const warnings: string[] = [];
  const currencies = [...new Set(transactions.map((t) => t.currency))];
  const nonUsd = currencies.some((c) => c !== "usd");
  if (nonUsd) {
    warnings.push(
      `This file includes non-USD currency (${currencies.filter((c) => c !== "usd").join(", ").toUpperCase()}). SettleClear is USD-first — review amounts carefully before importing.`
    );
  }

  // Validate net ≈ gross − fee (Stripe fee is typically positive cost).
  for (const t of transactions) {
    const expected = t.grossCents - t.feeCents;
    if (Math.abs(expected - t.netCents) > 1) {
      warnings.push(
        `Row ${t.balanceTransactionId}: net (${t.netCents}) ≠ gross−fee (${expected}). Using reported net.`
      );
    }
  }

  const byCategory: PayoutSummary["byCategory"] = {};
  let grossCents = 0;
  let feeCents = 0;
  let netCents = 0;
  let chargeGrossCents = 0;
  let refundGrossCents = 0;
  let otherNetCents = 0;

  for (const t of transactions) {
    grossCents += t.grossCents;
    feeCents += t.feeCents;
    netCents += t.netCents;

    const cat = t.reportingCategory;
    if (!byCategory[cat]) {
      byCategory[cat] = { count: 0, grossCents: 0, feeCents: 0, netCents: 0 };
    }
    byCategory[cat].count += 1;
    byCategory[cat].grossCents += t.grossCents;
    byCategory[cat].feeCents += t.feeCents;
    byCategory[cat].netCents += t.netCents;

    if (cat === "charge" || cat === "payment" || cat === "charge_failure") {
      chargeGrossCents += t.grossCents;
    } else if (cat === "refund" || cat === "partial_capture_reversal") {
      refundGrossCents += t.grossCents; // usually negative
    } else {
      otherNetCents += t.netCents;
    }
  }

  const payoutIds = [...new Set(transactions.map((t) => t.payoutId).filter(Boolean))];
  if (payoutIds.length > 1) {
    warnings.push(
      `File spans ${payoutIds.length} payout IDs. Totals are for the whole file; split by payout if you need one deposit each.`
    );
  }

  const payoutDates = transactions
    .map((t) => t.payoutEffectiveAt)
    .filter(Boolean)
    .sort();

  return {
    payoutId: payoutIds[0] || "(unknown)",
    payoutDate: (payoutDates[0] || transactions[0]?.created || "").slice(0, 10),
    currency: currencies.includes("usd") ? "usd" : currencies[0],
    currencies,
    nonUsd,
    grossCents,
    feeCents,
    netCents,
    chargeGrossCents,
    refundGrossCents,
    otherNetCents,
    byCategory,
    transactions,
    warnings,
  };
}
