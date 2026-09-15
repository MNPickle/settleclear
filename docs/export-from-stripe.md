# How to export a Stripe payout / balance-transaction CSV

SettleClear expects an **itemized** CSV of the transactions inside a payout (or a date range of payouts). Processing happens in your browser — we do not store your books.

## Recommended: Payout reconciliation (itemized)

1. Open the [Stripe Dashboard](https://dashboard.stripe.com).
2. Go to **Reports → Reports** (or **Balances → Payouts** / **Reconciliation**, depending on Dashboard layout).
3. Open **Payout reconciliation**.
4. Pick the date range that includes the payout you care about.
5. In the **Payout reconciliation** section, click **Download → Itemized**.
6. Save the CSV and upload it to SettleClear.

Official docs: [Payout reconciliation report](https://docs.stripe.com/reports/payout-reconciliation).

### Columns SettleClear uses

Required:

- `currency`
- `gross`
- `fee`
- `net`

Helpful (included in Stripe’s default itemized export):

- `automatic_payout_id`
- `automatic_payout_effective_at`
- `balance_transaction_id`
- `reporting_category`
- `description`
- `created` / `available_on`
- `source_id` / `charge_id`
- `customer_email` / `customer_name`

Amounts are in **major units** (e.g. dollars for USD), not cents — matching Stripe’s report docs.

## Alternative: single payout from the payout detail page

1. **Balances → Payouts** (or **Payments → Payouts**).
2. Open the payout (`po_…`).
3. Download / export the related balance transactions if offered, or use **Reporting API** report type `payout_reconciliation.by_id.itemized.*`.

## Tip for one bank deposit

If your CSV spans multiple `automatic_payout_id` values, SettleClear totals the whole file and warns you. For a clean “why is *this* deposit $X?” answer, filter to one payout ID before upload (or export by payout).

## Sample fixture

See [`/fixtures/stripe-payout-sample.csv`](../public/fixtures/stripe-payout-sample.csv). Expected deposit (sum of `net`): **$1,096.71**.
