import { Uploader } from "@/components/Uploader";

/** Real rows from public/fixtures/stripe-payout-sample.csv (key columns only). */
const stripeBeforeRows = [
  {
    category: "charge",
    description: "Payment from Acme Co — Invoice INV-1042",
    gross: "500.00",
    fee: "14.80",
    net: "485.20",
  },
  {
    category: "charge",
    description: "Payment from Bright Labs",
    gross: "299.00",
    fee: "8.97",
    net: "290.03",
  },
  {
    category: "charge",
    description: "Payment from Cedar Studio",
    gross: "175.50",
    fee: "5.39",
    net: "170.11",
  },
  {
    category: "charge",
    description: "Payment from Delta LLC",
    gross: "88.00",
    fee: "2.85",
    net: "85.15",
  },
  {
    category: "refund",
    description: "Refund to Acme Co — INV-1042 partial",
    gross: "-50.00",
    fee: "0.00",
    net: "-50.00",
  },
  {
    category: "charge",
    description: "Payment from Echo Inc",
    gross: "120.00",
    fee: "3.78",
    net: "116.22",
  },
] as const;

/**
 * Real output of processStripeCsvText → toQboJournalCsv on the fixture
 * (see src/__tests__/fixture-journal.test.ts).
 */
const qboAfterRows = [
  {
    journalNo: "SC-xSandbox0001",
    journalDate: "2026-03-15",
    accountName: "Bank - Stripe Payouts",
    debits: "1096.71",
    credits: "",
    description: "Stripe deposit po_1NqR2xSandbox0001 2026-03-15",
  },
  {
    journalNo: "SC-xSandbox0001",
    journalDate: "2026-03-15",
    accountName: "Stripe Processing Fees",
    debits: "35.79",
    credits: "",
    description: "Stripe fees for po_1NqR2xSandbox0001",
  },
  {
    journalNo: "SC-xSandbox0001",
    journalDate: "2026-03-15",
    accountName: "Sales Returns and Refunds",
    debits: "50.00",
    credits: "",
    description: "Stripe refunds in po_1NqR2xSandbox0001",
  },
  {
    journalNo: "SC-xSandbox0001",
    journalDate: "2026-03-15",
    accountName: "Stripe Sales",
    debits: "",
    credits: "1182.50",
    description: "Stripe charges settled in po_1NqR2xSandbox0001",
  },
] as const;

const faqs = [
  {
    q: "Is this CPA advice?",
    a: "No. SettleClear drafts an import-ready journal from Stripe’s gross/fee/net. Map account names to your chart of accounts and verify the bank deposit before posting.",
  },
  {
    q: "What’s free vs membership?",
    a: "Free: one full conversion in this browser (real QBO + Xero journals). Membership: $12/mo for ongoing payouts — cancel anytime on Gumroad.",
  },
  {
    q: "Does the journal match the bank?",
    a: "On the public sample, deposit net is $1,096.71 (sample deposit net — not a price). We aim for journals that net to Stripe’s reported deposit; if Stripe changes columns, we fix parsers.",
  },
  {
    q: "Do you connect to Stripe?",
    a: "No OAuth, no sync. Upload a CSV; processing stays in the browser.",
  },
  {
    q: "QuickBooks and Xero?",
    a: "Yes — QBO journal CSV plus a Xero journal CSV on every successful run.",
  },
];

function shortDesc(s: string, max = 36) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "…";
}

export default function Home() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-emerald-100/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
              SC
            </span>
            <div className="leading-tight">
              <span className="font-semibold tracking-tight">SettleClear</span>
              <span className="ml-2 hidden text-xs text-slate-500 sm:inline">
                by Vetted Stuff
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#pricing"
              className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:inline"
            >
              Pricing
            </a>
            <a
              href="#upload"
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Try sample
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-28">
        {/* —— HERO (tight) —— */}
        <section className="pb-6 pt-8 sm:pb-8 sm:pt-12">
          <p className="text-sm font-semibold text-emerald-800">
            For founders & bookkeepers reconciling Stripe
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.08]">
            Stripe hit your bank. QuickBooks still doesn’t match.
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            Turn one payout CSV into an import-ready journal that ties to the
            deposit.
          </p>
          <div className="mt-6">
            <a
              href="#upload"
              className="inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Try sample / Fix this deposit
            </a>
          </div>
        </section>

        {/* —— PROBLEM (one breath) —— */}
        <section className="mb-10">
          <div className="rounded-2xl bg-rose-50 px-5 py-4 ring-1 ring-rose-100 sm:px-6">
            <p className="text-base font-medium text-rose-950 sm:text-lg">
              One bank deposit. Dozens of CSV rows. Match fails.
            </p>
            <p className="mt-1 text-sm text-rose-900/75">
              Fees and refunds hide in the payout file — so sales on the books
              never equal the bank line.
            </p>
          </div>
        </section>

        {/* —— BEFORE / AFTER TABLES —— */}
        <section id="sample-results" className="mb-14 space-y-8">
          {/* BEFORE */}
          <div className="overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-sm">
            <div className="border-b border-rose-100 bg-rose-50 px-4 py-3 sm:px-5">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-800">
                Before
              </p>
              <p className="mt-0.5 text-sm font-medium text-rose-950">
                What Stripe actually exports (itemized payout CSV).
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2.5 sm:px-4">reporting_category</th>
                    <th className="px-3 py-2.5 sm:px-4">description</th>
                    <th className="px-3 py-2.5 text-right sm:px-4">gross</th>
                    <th className="px-3 py-2.5 text-right sm:px-4">fee</th>
                    <th className="px-3 py-2.5 text-right sm:px-4">net</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs sm:text-sm">
                  {stripeBeforeRows.map((row) => (
                    <tr
                      key={row.description}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-3 py-2 text-slate-700 sm:px-4">
                        {row.category}
                      </td>
                      <td
                        className="max-w-[14rem] truncate px-3 py-2 text-slate-800 sm:px-4"
                        title={row.description}
                      >
                        {shortDesc(row.description)}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-800 sm:px-4">
                        {row.gross}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-600 sm:px-4">
                        {row.fee}
                      </td>
                      <td className="px-3 py-2 text-right font-semibold text-slate-900 sm:px-4">
                        {row.net}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-rose-100 bg-rose-50/80 px-4 py-3 sm:px-5">
              <p className="text-sm text-rose-950">
                Bank = one deposit = sum of net{" "}
                <span className="font-mono font-bold">$1,096.71</span>
                <span className="ml-2 text-xs font-medium text-rose-800/80">
                  sample deposit net — not a price
                </span>
              </p>
            </div>
          </div>

          {/* AFTER */}
          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
            <div className="border-b border-emerald-100 bg-emerald-50 px-4 py-3 sm:px-5">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                After
              </p>
              <p className="mt-0.5 text-sm font-medium text-emerald-950">
                Import-ready journal CSV — map account names to your chart of
                accounts, then import into QuickBooks (Xero file also
                available).
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2.5 sm:px-4">JournalNo</th>
                    <th className="px-3 py-2.5 sm:px-4">JournalDate</th>
                    <th className="px-3 py-2.5 sm:px-4">AccountName</th>
                    <th className="px-3 py-2.5 text-right sm:px-4">Debits</th>
                    <th className="px-3 py-2.5 text-right sm:px-4">Credits</th>
                    <th className="px-3 py-2.5 sm:px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs sm:text-sm">
                  {qboAfterRows.map((row) => (
                    <tr
                      key={row.accountName}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="whitespace-nowrap px-3 py-2 text-slate-600 sm:px-4">
                        {row.journalNo}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-slate-600 sm:px-4">
                        {row.journalDate}
                      </td>
                      <td className="px-3 py-2 font-sans text-sm font-medium text-slate-900 sm:px-4">
                        {row.accountName}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-800 sm:px-4">
                        {row.debits}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-800 sm:px-4">
                        {row.credits}
                      </td>
                      <td
                        className="max-w-[12rem] truncate px-3 py-2 text-slate-500 sm:px-4"
                        title={row.description}
                      >
                        {shortDesc(row.description, 32)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-emerald-100 bg-emerald-50/80 px-4 py-3 sm:px-5">
              <p className="text-sm text-emerald-950">
                Balanced to bank deposit{" "}
                <span className="font-mono font-bold">$1,096.71</span>
                <span className="ml-2 text-xs font-medium text-emerald-800/80">
                  sample deposit net — not a price · Xero CSV also available
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-slate-900 px-5 py-4 text-sm text-slate-100">
            <p className="flex-1">
              Run the same fixture below — download full QBO and Xero journals.
            </p>
            <a
              href="#upload"
              className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400"
            >
              Run this sample now
            </a>
            <a
              href={`${base}/docs/export-from-stripe/`}
              className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              How to export
            </a>
          </div>
        </section>

        {/* —— UPLOADER —— */}
        <Uploader />

        {/* —— PRICING (short) —— */}
        <section id="pricing" className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Pricing
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Free
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">1 file</p>
              <p className="mt-2 text-sm text-slate-600">
                Full QBO + Xero journals in this browser — not a teaser.
              </p>
              <a
                href="#upload"
                className="mt-5 inline-flex rounded-xl border border-emerald-600 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
              >
                Try sample
              </a>
            </div>
            <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50/40 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                Membership
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                $12<span className="text-lg font-semibold">/mo</span>
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Ongoing payouts. Cancel anytime on Gumroad.
              </p>
              <a
                href="https://craftingwithdonna.gumroad.com/l/settleclear"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Get Membership — $12/mo
              </a>
            </div>
          </div>
        </section>

        {/* —— FAQ (short) —— */}
        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">FAQ</h2>
          <dl className="mt-6 space-y-3">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <dt className="font-semibold text-slate-900">{f.q}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      {/* —— STICKY CTA —— */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-emerald-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">
              Stripe deposit ≠ books?
            </span>{" "}
            <span className="hidden sm:inline">
              Run the sample — full journal CSV, not a teaser.
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="#upload"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Try sample
            </a>
            <a
              href="#pricing"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Membership $12/mo
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white py-8 pb-24 text-center text-xs text-slate-500">
        SettleClear by{" "}
        <span className="font-medium text-slate-700">Vetted Stuff</span> ·
        File-first payout reconciliation · Not a CPA firm · No Stripe OAuth ·
        Membership $12/mo, cancel anytime
      </footer>
    </div>
  );
}
