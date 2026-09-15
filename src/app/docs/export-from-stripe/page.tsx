import Link from "next/link";

export const metadata = {
  title: "Export from Stripe — SettleClear",
};

export default function ExportDocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <article className="prose prose-slate mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p>
          <Link href="/" className="text-emerald-700 no-underline hover:underline">
            ← SettleClear
          </Link>
        </p>
        <h1>How to export a Stripe payout CSV</h1>
        <p>
          SettleClear expects an <strong>itemized</strong> CSV of the
          transactions inside a payout. Processing happens in your browser.
        </p>
        <h2>Recommended: Payout reconciliation (itemized)</h2>
        <ol>
          <li>Open the Stripe Dashboard.</li>
          <li>
            Go to <strong>Reports</strong> → <strong>Payout reconciliation</strong>.
          </li>
          <li>Pick the date range that includes your payout.</li>
          <li>
            Click <strong>Download → Itemized</strong>.
          </li>
          <li>Upload that CSV to SettleClear.</li>
        </ol>
        <p>
          Docs:{" "}
          <a
            href="https://docs.stripe.com/reports/payout-reconciliation"
            target="_blank"
            rel="noreferrer"
          >
            stripe.com/docs/reports/payout-reconciliation
          </a>
        </p>
        <h2>Columns we need</h2>
        <p>
          Required: <code>currency</code>, <code>gross</code>, <code>fee</code>,{" "}
          <code>net</code>. Helpful: <code>automatic_payout_id</code>,{" "}
          <code>reporting_category</code>, <code>description</code>,{" "}
          <code>balance_transaction_id</code>.
        </p>
        <p>
          Amounts are major units (dollars for USD), matching Stripe report
          exports — not API cents.
        </p>
        <h2>Sample fixture</h2>
        <p>
          <a href="/fixtures/stripe-payout-sample.csv" download>
            stripe-payout-sample.csv
          </a>{" "}
          — expected deposit total <strong>$1,096.71</strong>.
        </p>
        <p className="text-sm text-slate-500">
          SettleClear by Vetted Stuff · Full write-up also lives in the repo at{" "}
          <code>docs/export-from-stripe.md</code>.
        </p>
      </article>
    </div>
  );
}
