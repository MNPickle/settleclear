/** Money helpers — amounts stored as integer cents to avoid float drift. */

export function parseAmountToCents(raw: string | number): number {
  if (typeof raw === "number") {
    return Math.round(raw * 100);
  }
  const cleaned = raw.replace(/[$,\s]/g, "").trim();
  if (!cleaned) return 0;
  const neg = cleaned.startsWith("-") || cleaned.startsWith("(");
  const num = cleaned.replace(/[()-]/g, "");
  const cents = Math.round(parseFloat(num) * 100);
  if (Number.isNaN(cents)) return 0;
  return neg ? -Math.abs(cents) : cents;
}

export function centsToDollars(cents: number): number {
  return cents / 100;
}

/** Display with thousands separators, e.g. $1,096.71 */
export function formatUsd(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents) / 100;
  return `${sign}$${abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Plain decimal for CSV cells (no $ / commas). */
export function formatUsdPlain(cents: number): string {
  return (cents / 100).toFixed(2);
}
