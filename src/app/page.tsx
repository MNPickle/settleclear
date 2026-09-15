import { Uploader } from "@/components/Uploader";

const steps = [
  {
    n: "1",
    title: "Export from Stripe",
    body: "Download the itemized payout reconciliation CSV for the deposit that won’t match.",
  },
  {
    n: "2",
    title: "Upload once",
    body: "We parse gross, fees, refunds, and net in your browser — your books never leave your machine.",
  },
  {
    n: "3",
    title: "Download & explain",
    body: "Get a QBO-friendly journal CSV, a Xero-friendly journal CSV, and a plain-English “why $X” story.",
  },
];

const faqs = [
  {
    q: "Is SettleClear a substitute for my CPA?",
    a: "No. SettleClear helps you see why a Stripe deposit is a certain amount and drafts a journal CSV you can map to your chart of accounts. Accuracy is best-effort against Stripe’s reported gross/fee/net — it is not CPA advice, tax advice, or an audit. Always verify totals against your bank deposit before posting.",
  },
  {
    q: "What’s free vs paid?",
    a: "Free: one full conversion in this browser (real journal + explanation — not a teaser). Paid: $12/mo membership for ongoing conversions, cancel anytime on Gumroad. Optional one-file unlock ($4) may be offered when available — primary offer is $12/mo.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel or manage billing on Gumroad anytime. Access continues through the period you already paid; no SettleClear subscription trap and no annual lock-in.",
  },
  {
    q: "What’s your refund policy?",
    a: "No refund theater. Try the free sample file first and confirm the deposit total ties. If Gumroad’s buyer protection applies to a purchase, use Gumroad. We fix parsers when exports change — we don’t do money-back drama after you’ve seen a real output.",
  },
  {
    q: "Do you connect to Stripe or store my books?",
    a: "No Stripe OAuth, no sync, no cloud ledger. Upload a CSV; processing stays in the browser. We are not an AI bookkeeper and we don’t claim multi-platform CRM magic.",
  },
  {
    q: "What currencies are supported?",
    a: "USD-first. Other currencies will convert/parse as numbers and show a warning — review carefully before importing.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-slate-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
            SC
          </span>
          <div className="leading-tight">
            <span className="font-semibold tracking-tight">SettleClear</span>
            <span className="ml-2 text-xs text-slate-500">by Vetted Stuff</span>
          </div>
        </div>
        <a
          href="#upload"
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Upload CSV
        </a>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20">
        <section className="pb-12 pt-8 text-center sm:pt-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Stripe → QuickBooks / Xero
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Your Stripe deposit doesn’t match QuickBooks. Fix it in one upload.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Turn a Stripe payout CSV into a journal you can import — plus a
            plain-English breakdown of fees and refunds — without connecting
            Stripe or storing your books.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#upload"
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Fix my deposit
            </a>
            <a
              href="#try-sample"
              className="rounded-xl border border-emerald-600 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
            >
              Try sample file
            </a>
            <a
              href="/docs/export-from-stripe/"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              How to export from Stripe
            </a>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500">
            New here? Download the sample CSV, drop it below, and expect deposit{" "}
            <strong className="text-slate-700">$1,096.71</strong> — full journal,
            not a teaser.
          </p>
        </section>

        <section className="mb-14 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                {s.n}
              </div>
              <h2 className="mt-3 font-semibold text-slate-900">{s.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{s.body}</p>
            </div>
          ))}
        </section>

        <Uploader />

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

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        SettleClear by{" "}
        <span className="font-medium text-slate-700">Vetted Stuff</span> ·
        File-first payout reconciliation helper · Not a CPA firm · No Stripe
        OAuth · $12/mo membership, cancel anytime
      </footer>
    </div>
  );
}
