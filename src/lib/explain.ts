import { formatUsd } from "./money";
import type { PayoutSummary } from "./stripe-types";

/** Plain-English “why is this deposit $X?” narrative. */
export function explainDeposit(summary: PayoutSummary): string {
  const lines: string[] = [];
  const deposit = formatUsd(summary.netCents);
  const dateBit = summary.payoutDate ? ` on ${summary.payoutDate}` : "";
  const payoutBit =
    summary.payoutId && summary.payoutId !== "(unknown)"
      ? ` (Stripe payout ${summary.payoutId})`
      : "";

  lines.push(`Your bank deposit is ${deposit}${dateBit}${payoutBit}.`);
  lines.push("");
  lines.push("Here’s why:");

  const chargeNet = summary.byCategory.charge?.netCents ?? 0;
  const chargeGross = summary.byCategory.charge?.grossCents ?? summary.chargeGrossCents;
  const chargeFee = summary.byCategory.charge?.feeCents ?? 0;
  const chargeCount = summary.byCategory.charge?.count ?? 0;

  if (chargeCount > 0) {
    lines.push(
      `• ${chargeCount} charge${chargeCount === 1 ? "" : "s"} totaling ${formatUsd(chargeGross)} in sales, minus ${formatUsd(chargeFee)} in Stripe fees → ${formatUsd(chargeNet)} net.`
    );
  }

  const refund = summary.byCategory.refund;
  if (refund && refund.count > 0) {
    lines.push(
      `• ${refund.count} refund${refund.count === 1 ? "" : "s"} of ${formatUsd(Math.abs(refund.grossCents))} reduced the payout by ${formatUsd(Math.abs(refund.netCents))}.`
    );
  }

  for (const [cat, agg] of Object.entries(summary.byCategory)) {
    if (cat === "charge" || cat === "refund") continue;
    lines.push(
      `• ${agg.count}× “${cat}”: gross ${formatUsd(agg.grossCents)}, fees ${formatUsd(agg.feeCents)}, net ${formatUsd(agg.netCents)}.`
    );
  }

  lines.push("");
  lines.push(
    `Math check: gross ${formatUsd(summary.grossCents)} − fees ${formatUsd(summary.feeCents)} = net deposit ${deposit}.`
  );

  if (summary.warnings.length) {
    lines.push("");
    lines.push("Notes:");
    for (const w of summary.warnings) lines.push(`• ${w}`);
  }

  lines.push("");
  lines.push(
    "Tip: In QuickBooks/Xero, record the bank deposit as the net amount, expense Stripe fees separately, and keep refunds off revenue — the journal CSVs below follow that pattern."
  );

  return lines.join("\n");
}
