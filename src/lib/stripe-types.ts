/**
 * Stripe CSV column assumptions
 * -------------------------------
 * Source of truth: Stripe Dashboard "Payout reconciliation" → Download → Itemized
 * (API report type family: payout_reconciliation.itemized.* / by_id.itemized.*).
 * Docs: https://docs.stripe.com/reports/payout-reconciliation
 *
 * Amounts (`gross`, `fee`, `net`) are in major currency units (dollars for USD),
 * not Stripe API minor units (cents). Confirmed in Stripe report column descriptions.
 *
 * `reporting_category` is preferred over legacy `type` for accounting classification.
 * We also accept a Dashboard "Balance" itemized export that uses similar headers.
 *
 * A payout's bank deposit equals the sum of `net` across activity rows in that payout.
 * We exclude rows whose reporting_category is `payout` (the payout BT itself), if present.
 */

export const REQUIRED_HEADERS = ["currency", "gross", "fee", "net"] as const;

/** Headers we look for (any casing). Aliases map common variants → canonical. */
export const HEADER_ALIASES: Record<string, string> = {
  currency: "currency",
  gross: "gross",
  fee: "fee",
  net: "net",
  reporting_category: "reporting_category",
  reportingcategory: "reporting_category",
  category: "reporting_category",
  type: "reporting_category",
  description: "description",
  balance_transaction_id: "balance_transaction_id",
  id: "balance_transaction_id",
  automatic_payout_id: "automatic_payout_id",
  payout_id: "automatic_payout_id",
  automatic_payout_effective_at: "automatic_payout_effective_at",
  created: "created",
  available_on: "available_on",
  source_id: "source_id",
  charge_id: "charge_id",
  customer_email: "customer_email",
  customer_name: "customer_name",
};

export type StripeTxn = {
  balanceTransactionId: string;
  payoutId: string;
  payoutEffectiveAt: string;
  created: string;
  availableOn: string;
  currency: string;
  grossCents: number;
  feeCents: number;
  netCents: number;
  reportingCategory: string;
  description: string;
  sourceId: string;
  chargeId: string;
  customerEmail: string;
  customerName: string;
};

export type PayoutSummary = {
  payoutId: string;
  payoutDate: string;
  currency: string;
  currencies: string[];
  nonUsd: boolean;
  grossCents: number;
  feeCents: number;
  netCents: number; // deposit total
  chargeGrossCents: number;
  refundGrossCents: number; // typically negative sum of refund gross
  otherNetCents: number;
  byCategory: Record<string, { count: number; grossCents: number; feeCents: number; netCents: number }>;
  transactions: StripeTxn[];
  warnings: string[];
};
