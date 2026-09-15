# SettleClear

**Your Stripe deposit doesn’t match QuickBooks. Fix it in one upload.**

File-first MVP by **Vetted Stuff**: upload a Stripe payout / balance-transaction CSV → download a QuickBooks Online–friendly journal CSV, a Xero-friendly journal CSV, and a plain-English explanation of why the deposit is $X.

- Parses **in the browser** (no storing user books)
- **USD-first** (warns on other currencies)
- Free **1 file** per browser via `localStorage`; 2nd file shows Gumroad paywall (`NEXT_PUBLIC_GUMROAD_URL`)
- Primary paid offer: **$12/mo** membership (optional $4 one-file when listed)
- **Static-exportable** (`output: 'export'`) for Bluehost / any static host — no Node required at runtime
- No Stripe OAuth, sync, multi-platform CRM, or “AI bookkeeper” claims

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: set NEXT_PUBLIC_GUMROAD_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test          # vitest — journal net === fixture deposit
npm run build     # static export → out/
```

Upload `out/` (or `settleclear-site.zip`) to Bluehost / any static host.

## Fixture deposit total

Sample file: [`public/fixtures/stripe-payout-sample.csv`](public/fixtures/stripe-payout-sample.csv)  
Served at: `/fixtures/stripe-payout-sample.csv`

| Metric | Amount |
| --- | ---: |
| **Expected bank deposit (sum of `net`)** | **$1,096.71** |
| Gross (sum of `gross`) | $1,132.50 |
| Fees (sum of `fee`) | $35.79 |
| Charges | 5 |
| Refunds | 1 ($50.00) |
| Payout ID | `po_1NqR2xSandbox0001` |
| Payout effective | 2026-03-15 |

Math: `$1,132.50 − $35.79 = $1,096.71`.

## Stripe CSV assumptions

We target Stripe Dashboard **Payout reconciliation → Download → Itemized** columns (`payout_reconciliation.itemized.*`). See comments in `src/lib/stripe-types.ts` and [docs/export-from-stripe.md](docs/export-from-stripe.md).

Required headers: `currency`, `gross`, `fee`, `net`.

## Project layout

```
src/lib/           # CSV parse, Stripe → summary, journals, explain
src/components/    # Uploader UI
public/fixtures/   # Sample Stripe CSV
docs/              # Export how-to
src/__tests__/     # Vitest
out/               # Static export (after npm run build)
```

## License

Private MVP — all rights reserved. SettleClear / Vetted Stuff.
