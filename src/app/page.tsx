import { Uploader } from "@/components/Uploader";

const withouts = [
  "No Stripe OAuth",
  "Books stay in your browser",
  "No Excel archaeology",
  "No bookkeeper hour",
  "First file is full — not a teaser",
];

const steps = [
  {
    n: "1",
    title: "Export from Stripe",
    body: "Download the itemized payout reconciliation CSV for the deposit that won’t match. We walk you through it.",
  },
  {
    n: "2",
    title: "Drop it in SettleClear",
    body: "We parse gross, fees, refunds, and net in your browser — your books never leave your machine.",
  },
  {
    n: "3",
    title: "Import & explain",
    body: "Download QBO + Xero journal CSVs and a plain-English “why this deposit is $X” story that ties to the bank.",
  },
];

const faqs = [
  {
    q: "Is SettleClear a substitute for my CPA?",
    a: "No. SettleClear helps you see why a Stripe deposit is a certain amount and drafts a journal CSV you can map to your chart of accounts. Accuracy is best-effort against Stripe’s reported gross/fee/net — it is not CPA advice, tax advice, or an audit. Always verify totals against your bank deposit before posting.",
  },
  {
    q: "What’s free vs SettleClear Membership?",
    a: "Free: one full conversion in this browser (real journal + explanation — not a teaser). Membership: $12/mo for ongoing payouts, cancel anytime on Gumroad. Optional one-file unlock ($4) may be offered when available — primary offer is membership.",
  },
  {
    q: "Will the journal net match Stripe’s reported deposit?",
    a: "That’s the stake. On the public sample, deposit total is $1,096.71. On paid use: if Stripe changes export columns or a journal doesn’t net to Stripe’s reported deposit, we fix the parsers and iterate with you — not a fake money-back guarantee.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel or manage billing on Gumroad anytime. Access continues through the period you already paid; no annual lock-in.",
  },
  {
    q: "Do you connect to Stripe or store my books?",
    a: "No Stripe OAuth, no sync, no cloud ledger. Upload a CSV; processing stays in the browser. We are not an AI bookkeeper.",
  },
  {
    q: "QuickBooks Online and Xero both work?",
    a: "Yes. Every successful conversion downloads a QBO-friendly journal CSV and a Xero-friendly journal CSV. Map accounts to your COA before posting.",
  },
  {
    q: "What currencies are supported?",
    a: "USD-first. Other currencies will convert/parse as numbers and show a warning — review carefully before importing.",
  },
];

export default function Home() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-slate-900">
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
              Fix this deposit
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-28">
        {/* —— HERO (above the fold) —— */}
        <section className="pb-10 pt-6 text-center sm:pb-14 sm:pt-10">
          <p className="text-sm font-semibold text-emerald-800">
            For SaaS founders, solos & bookkeepers whose Stripe deposit ≠
            QuickBooks or Xero
          </p>

          <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.1]">
            Get an import-ready journal that ties to the bank deposit — and a
            plain-English answer for why Stripe paid $X.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Upload one Stripe payout CSV. Download QBO + Xero journals plus a
            fee/refund story that explains the deposit — without connecting
            Stripe or uploading your books.
          </p>

          <div className="mx-auto mt-5 max-w-xl rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-950">
            <strong className="font-semibold">Stake:</strong> public sample hits{" "}
            <strong>$1,096.71</strong>. Paid: we fix parsers when Stripe exports
            change — journal nets to Stripe’s reported deposit or we iterate.
            (No fake money-back theater.)
          </div>

          <ul className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            {withouts.map((w) => (
              <li
                key={w}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm sm:text-sm"
              >
                ✓ {w}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#upload"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Try sample / Fix this deposit
            </a>
            <a
              href="#sample-results"
              className="rounded-xl border border-emerald-600 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
            >
              See sample result $1,096.71
            </a>
          </div>

          <p className="mx-auto mt-4 max-w-lg text-sm text-slate-500">
            Proof peek: fixture deposit{" "}
            <strong className="text-slate-800">$1,096.71</strong> · full journal
            download, not a teaser ·{" "}
            <a
              href={`${base}/docs/export-from-stripe/`}
              className="font-medium text-emerald-700 underline-offset-2 hover:underline"
            >
              how export works
            </a>
          </p>
        </section>

        {/* —— HOW IT WORKS —— */}
        <section id="how" className="mb-14">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600">
            Three steps. One upload. Journals that support the offer — not a
            product tour.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                  {s.n}
                </div>
                <h3 className="mt-3 font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* —— SAMPLE RESULTS (proof) —— */}
        <section
          id="sample-results"
          className="mb-14 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Worked example — public fixture
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Sample result: deposit{" "}
            <span className="text-emerald-700">$1,096.71</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Transparent math from the included Stripe sample CSV — not a
            testimonial, not a logo wall. Gross $1,132.50 − fees $35.79 ={" "}
            <strong className="text-slate-800">$1,096.71</strong> net to the
            bank. Load it below and download the full QBO + Xero journals.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Gross</p>
              <p className="text-xl font-bold text-slate-900">$1,132.50</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Fees</p>
              <p className="text-xl font-bold text-slate-900">$35.79</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
              <p className="text-xs font-medium text-emerald-800">
                Bank deposit (net)
              </p>
              <p className="text-xl font-bold text-emerald-900">$1,096.71</p>
            </div>
          </div>
          <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <li className="flex gap-2">
              <span className="text-emerald-600">→</span> QBO journal CSV
              download
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">→</span> Xero journal CSV
              download
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">→</span> Plain-English “why $X”
              fee/refund story
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">→</span> Full output on first
              file (not a teaser)
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="#upload"
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Run this sample now
            </a>
            <a
              href={`${base}/docs/export-from-stripe/`}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              How to export from Stripe
            </a>
          </div>
        </section>

        {/* —— UPLOADER —— */}
        <Uploader />

        {/* —— PRICING —— */}
        <section id="pricing" className="mx-auto mt-16 max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Pricing
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600">
            Cheaper than one bookkeeper hour spent hunting fees in Excel. Cancel
            membership anytime.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Free
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                1 file
              </p>
              <p className="mt-2 text-sm text-slate-600">
                One full conversion in this browser — real QBO + Xero journals
                and the deposit explanation. Not a watermarked teaser.
              </p>
              <a
                href="#upload"
                className="mt-5 inline-flex rounded-xl border border-emerald-600 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
              >
                Try sample / Fix this deposit
              </a>
            </div>
            <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50/40 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                SettleClear Membership
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                $12<span className="text-lg font-semibold">/mo</span>
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Every future payout explained + import-ready journals. Cancel
                anytime. Optional $4 one-file unlock may appear on the product
                page when available — membership is the main path.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                <li>✓ Ongoing conversions after your free file</li>
                <li>✓ Parser updates when Stripe exports change</li>
                <li>✓ vs. bookkeeper time / spreadsheet archaeology</li>
              </ul>
              <a
                href="https://craftingwithdonna.gumroad.com/l/settleclear"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Get SettleClear Membership — $12/mo
              </a>
            </div>
          </div>
        </section>

        {/* —— FAQ —— */}
        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">FAQ</h2>
          <dl className="mt-6 space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <dt className="font-semibold text-slate-900">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">
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
              Run the $1,096.71 sample — full journal, not a teaser.
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="#upload"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Try sample / Fix this deposit
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
        File-first payout reconciliation helper · Not a CPA firm · No Stripe
        OAuth · SettleClear Membership $12/mo, cancel anytime
      </footer>
    </div>
  );
}
