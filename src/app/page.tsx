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
    a: "On the public sample, the deposit nets to $1,096.71 (worked example — not a price). On paid use: if Stripe changes export columns or a journal doesn’t net to Stripe’s reported deposit, we fix the parsers and iterate with you — not a fake money-back guarantee.",
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
              Fix this deposit
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-28">
        {/* —— HERO: problem first, then offer —— */}
        <section className="pb-8 pt-6 sm:pb-10 sm:pt-10">
          <div className="rounded-3xl bg-gradient-to-br from-rose-50 via-white to-amber-50 p-6 ring-1 ring-rose-100 sm:p-10">
            <p className="text-sm font-semibold text-rose-800">
              For SaaS founders, solos & bookkeepers
            </p>

            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.1]">
              Stripe hit your bank. QuickBooks (or Xero) still doesn’t match.
            </h1>

            <p className="mt-4 max-w-2xl text-base text-slate-700 sm:text-lg">
              Bank shows one Stripe deposit. Your books show sales that won’t
              match it 1:1 — fees and refunds are buried in the payout file.
              That reconciliation gap is the problem. SettleClear turns the
              Stripe CSV into a plain-English tie-out plus import-ready QBO +
              Xero journals so the deposit matches.
            </p>

            <ul className="mt-5 flex max-w-2xl flex-wrap gap-2">
              {withouts.map((w) => (
                <li
                  key={w}
                  className="rounded-full border border-white bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm sm:text-sm"
                >
                  ✓ {w}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#upload"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Try sample / Fix this deposit
              </a>
              <a
                href="#sample-results"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                See before → after sample
              </a>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              Membership is{" "}
              <strong className="text-slate-900">$12/mo</strong> (cancel anytime)
              · free first file is full output ·{" "}
              <a
                href={`${base}/docs/export-from-stripe/`}
                className="font-medium text-emerald-700 underline-offset-2 hover:underline"
              >
                how export works
              </a>
            </p>
          </div>
        </section>

        {/* —— BEFORE / AFTER SAMPLE —— */}
        <section id="sample-results" className="mb-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Worked example — public fixture
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Why bank match fails — then how it ties
              </h2>
            </div>
            <p className="rounded-full bg-slate-200/80 px-3 py-1 text-xs font-semibold text-slate-700">
              Sample deposit net (not a price)
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* BEFORE — reconciliation mismatch */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wide text-rose-900">
                  Before — bank ≠ books
                </h3>
                <span className="rounded bg-rose-200/80 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-900">
                  Won’t match
                </span>
              </div>
              <p className="mt-2 text-sm text-rose-900/80">
                Same payout week: one bank deposit vs sales on the books that
                don’t line up 1:1.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-rose-200 bg-white text-sm">
                  <div className="border-b border-rose-100 bg-rose-100/50 px-3 py-2 text-xs font-semibold text-rose-950">
                    Bank / Stripe payout
                  </div>
                  <div className="px-3 py-4">
                    <p className="text-xs text-slate-500">One deposit line</p>
                    <p className="mt-1 font-mono text-2xl font-bold text-slate-900">
                      $1,096.71
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Sample deposit net — not a price
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-amber-200 bg-white text-sm">
                  <div className="border-b border-amber-100 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-950">
                    Books / sales side
                  </div>
                  <ul className="divide-y divide-amber-50 px-3 py-1 font-mono text-xs">
                    <li className="flex justify-between py-1.5">
                      <span className="truncate text-slate-600">Acme</span>
                      <span>$500.00</span>
                    </li>
                    <li className="flex justify-between py-1.5">
                      <span className="truncate text-slate-600">Bright Labs</span>
                      <span>$299.00</span>
                    </li>
                    <li className="flex justify-between py-1.5">
                      <span className="truncate text-slate-600">Cedar + Delta + Echo</span>
                      <span>$383.50</span>
                    </li>
                    <li className="flex justify-between py-1.5 text-rose-700">
                      <span className="truncate">Refund (Acme)</span>
                      <span>−$50.00</span>
                    </li>
                    <li className="flex justify-between border-t border-amber-100 py-2 font-sans text-xs">
                      <span className="font-semibold text-amber-950">
                        Sales / gross
                      </span>
                      <span className="font-bold text-amber-950">$1,132.50</span>
                    </li>
                  </ul>
                  <p className="border-t border-amber-100 bg-amber-50/60 px-3 py-1.5 text-[10px] text-amber-900/80">
                    Fees ($35.79) sit in the payout file — not on the bank line.
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-lg border-2 border-rose-400 bg-rose-100 px-3 py-2.5 text-sm font-semibold text-rose-950">
                Bank $1,096.71 ≠ Books/sales $1,132.50 — won’t match 1:1
              </div>
              <p className="mt-2 text-xs leading-relaxed text-rose-900/85">
                This is why QBO/Xero bank match fails — and why you end up in
                Excel hunting fees and refunds.
              </p>
            </div>

            {/* AFTER — deposit ties; journal secondary */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-900">
                  After — same deposit ties
                </h3>
                <span className="rounded bg-emerald-200/80 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-900">
                  Matches bank
                </span>
              </div>
              <p className="mt-2 text-sm text-emerald-900/80">
                One bank deposit, explained in plain English — then optional
                import lines so QBO/Xero can post it.
              </p>

              <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  Why the bank shows this amount
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-800">
                  Charges{" "}
                  <span className="font-semibold">$1,182.50</span>
                  {" − "}
                  refund{" "}
                  <span className="font-semibold">$50.00</span>
                  {" − "}
                  fees{" "}
                  <span className="font-semibold">$35.79</span>
                  {" = "}
                  <span className="font-bold text-emerald-800">
                    deposit $1,096.71
                  </span>
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Same math: gross $1,132.50 − fees $35.79 ={" "}
                  <strong className="text-slate-700">$1,096.71</strong> sample
                  deposit net (not a price).
                </p>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-100/80 px-3 py-2">
                  <span className="text-sm font-medium text-emerald-950">
                    Bank deposit now ties
                  </span>
                  <span className="font-mono text-lg font-bold text-emerald-950">
                    $1,096.71 ✓
                  </span>
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-xl border border-emerald-100 bg-white/80">
                <p className="border-b border-emerald-50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-emerald-700/90">
                  What QBO/Xero import looks like
                  <span className="ml-1 font-normal normal-case tracking-normal text-slate-500">
                    (secondary — map to your accounts)
                  </span>
                </p>
                <ul className="divide-y divide-emerald-50/80 px-3 py-1 text-[11px] text-slate-600">
                  <li className="flex justify-between py-1">
                    <span>Bank — Stripe payouts</span>
                    <span className="font-mono">+$1,096.71</span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span>Processing fees</span>
                    <span className="font-mono">+$35.79</span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span>Refunds</span>
                    <span className="font-mono">+$50.00</span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span>Sales</span>
                    <span className="font-mono">−$1,182.50</span>
                  </li>
                </ul>
                <p className="border-t border-emerald-100 bg-emerald-50/50 px-3 py-1.5 text-[11px] text-emerald-900">
                  Net = bank deposit <strong>$1,096.71</strong> — import-ready so
                  the deposit matches.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl bg-slate-900 px-5 py-4 text-sm text-slate-100">
            <p className="flex-1">
              Load the same fixture below — download full{" "}
              <strong>QBO</strong> and <strong>Xero</strong> journals (not a
              teaser).
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
              How to export from Stripe
            </a>
          </div>
        </section>

        {/* —— WHAT YOU GET (offer after problem) —— */}
        <section className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-emerald-700 p-5 text-white shadow-sm sm:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
              What you get
            </p>
            <h2 className="mt-2 text-xl font-bold">
              Journals that tie to the bank — plus the story
            </h2>
            <p className="mt-2 text-sm text-emerald-50/95">
              Upload one Stripe payout CSV. Download QBO + Xero journals and a
              fee/refund explanation — without connecting Stripe or uploading
              your books.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">QBO journal CSV</p>
            <p className="mt-1 text-sm text-slate-600">
              Debit bank + fees + refunds; credit sales — map to your chart of
              accounts.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Xero journal CSV</p>
            <p className="mt-1 text-sm text-slate-600">
              Same balanced lines in Xero manual-journal shape — not QBO-only.
            </p>
          </div>
        </section>

        {/* —— HOW IT WORKS —— */}
        <section id="how" className="mb-14">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              How it works
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600">
              Three steps. One upload. Output that supports the bank deposit —
              not a product tour.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                    {s.n}
                  </div>
                  <h3 className="mt-3 font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.body}</p>
                </div>
              ))}
            </div>
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
              <p className="mt-1 text-3xl font-bold text-slate-900">1 file</p>
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
              Run the sample — full QBO + Xero journal, not a teaser.
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
