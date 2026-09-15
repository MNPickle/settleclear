"use client";

import { useCallback, useEffect, useState } from "react";
import { formatUsd } from "@/lib/money";
import { processStripeCsvText, type ProcessResult } from "@/lib/process";
import { downloadBlob } from "@/lib/journals";
import {
  canProcessFree,
  getFilesUsed,
  gumroadUrl,
  incrementFilesUsed,
} from "@/lib/usage";

type Status = "idle" | "ready" | "paywall" | "error";

export function Uploader() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [used, setUsed] = useState(0);

  useEffect(() => {
    setUsed(getFilesUsed());
  }, []);

  const runFile = useCallback(async (file: File) => {
    setError(null);
    setResult(null);
    setFileName(file.name);

    if (!canProcessFree()) {
      setStatus("paywall");
      setUsed(getFilesUsed());
      return;
    }

    try {
      const text = await file.text();
      const processed = processStripeCsvText(text);
      incrementFilesUsed();
      setUsed(getFilesUsed());
      setResult(processed);
      setStatus("ready");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Could not parse that CSV.");
    }
  }, []);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void runFile(file);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) void runFile(file);
  };

  return (
    <section id="upload" className="mx-auto w-full max-w-3xl">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="rounded-2xl border-2 border-dashed border-emerald-300/80 bg-white p-8 shadow-sm"
      >
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">
            Drop your Stripe payout CSV here
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Parsed in your browser. Nothing is uploaded to our servers.
          </p>
          <label className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
            Choose CSV
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={onInput}
            />
          </label>
          <p className="mt-3 text-xs text-slate-500">
            Free: {Math.max(0, 1 - used)} of 1 file remaining this browser.
            Try the{" "}
            <a
              className="underline"
              href="/fixtures/stripe-payout-sample.csv"
              download
            >
              sample fixture
            </a>
            .
          </p>
        </div>
      </div>

      {status === "paywall" && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-lg font-semibold text-amber-950">
            You’ve used your free file
          </h3>
          <p className="mt-2 text-sm text-amber-900/90">
            Unlock unlimited conversions on Gumroad. This is a placeholder
            checkout link for the MVP — no card has been charged by SettleClear.
          </p>
          <a
            href={gumroadUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex rounded-xl bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
          >
            Unlock on Gumroad
          </a>
          <p className="mt-3 text-xs text-amber-800/80">
            Last file: {fileName || "(none)"} · localStorage gate only (clear
            site data to reset for demos).
          </p>
        </div>
      )}

      {status === "error" && error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {status === "ready" && result && (
        <div className="mt-6 space-y-4">
          {result.summary.nonUsd && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              ⚠ Non-USD currency detected. SettleClear is USD-first — double-check
              before importing journals.
            </div>
          )}
          {result.summary.warnings
            .filter((w) => !w.toLowerCase().includes("non-usd"))
            .map((w) => (
              <div
                key={w}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
              >
                {w}
              </div>
            ))}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Deposit total (sum of net)
                </p>
                <p className="text-3xl font-bold tracking-tight text-slate-900">
                  {formatUsd(result.summary.netCents)}
                </p>
              </div>
              <div className="text-right text-sm text-slate-600">
                <div>Gross {formatUsd(result.summary.grossCents)}</div>
                <div>Fees {formatUsd(result.summary.feeCents)}</div>
                <div>
                  {result.summary.transactions.length} transactions ·{" "}
                  {result.summary.payoutDate || "no payout date"}
                </div>
              </div>
            </div>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Why this deposit is {formatUsd(result.summary.netCents)}
            </h3>
            <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
              {result.explanation}
            </pre>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                onClick={() =>
                  downloadBlob(
                    `settleclear-qbo-${result.summary.payoutId || "journal"}.csv`,
                    result.qboCsv
                  )
                }
              >
                Download QBO journal CSV
              </button>
              <button
                type="button"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                onClick={() =>
                  downloadBlob(
                    `settleclear-xero-${result.summary.payoutId || "journal"}.csv`,
                    result.xeroCsv
                  )
                }
              >
                Download Xero journal CSV
              </button>
            </div>
            {!result.balanced && (
              <p className="mt-3 text-sm text-red-700">
                Journal did not balance — review Stripe Clearing Adjustments
                before import.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
