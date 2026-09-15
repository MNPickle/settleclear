import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { explainDeposit } from "../lib/explain";
import {
  buildJournalLines,
  journalIsBalanced,
  toQboJournalCsv,
  toXeroJournalCsv,
} from "../lib/journals";
import { parseStripeCsv } from "../lib/parse-stripe";
import { processStripeCsvText } from "../lib/process";
import { formatUsdPlain } from "../lib/money";

/** Documented fixture deposit total (sum of `net` column). */
export const FIXTURE_DEPOSIT_TOTAL_CENTS = 109671; // $1,096.71
export const FIXTURE_DEPOSIT_TOTAL = "1096.71";

const fixturePath = resolve(
  __dirname,
  "../../public/fixtures/stripe-payout-sample.csv"
);

describe("stripe-payout-sample fixture", () => {
  const text = readFileSync(fixturePath, "utf8");
  const summary = parseStripeCsv(text);

  it("journal net (deposit) === fixture deposit total $1,096.71", () => {
    expect(summary.netCents).toBe(FIXTURE_DEPOSIT_TOTAL_CENTS);
    expect(formatUsdPlain(summary.netCents)).toBe(FIXTURE_DEPOSIT_TOTAL);
  });

  it("gross − fees === net", () => {
    expect(summary.grossCents - summary.feeCents).toBe(summary.netCents);
  });

  it("expected category mix: 5 charges, 1 refund", () => {
    expect(summary.byCategory.charge?.count).toBe(5);
    expect(summary.byCategory.refund?.count).toBe(1);
  });

  it("builds a balanced journal whose bank debit equals deposit", () => {
    const lines = buildJournalLines(summary);
    expect(journalIsBalanced(lines)).toBe(true);
    const bank = lines.find((l) => l.account.startsWith("Bank"));
    expect(bank?.debit).toBe(FIXTURE_DEPOSIT_TOTAL_CENTS);
  });

  it("QBO and Xero CSVs include the deposit amount", () => {
    const qbo = toQboJournalCsv(summary);
    const xero = toXeroJournalCsv(summary);
    expect(qbo).toContain(FIXTURE_DEPOSIT_TOTAL);
    expect(xero).toContain(FIXTURE_DEPOSIT_TOTAL);
    expect(qbo.split("\n")[0]).toContain("JournalNo");
    expect(xero.split("\n")[0]).toContain("*Narration");
  });

  it("plain-English explanation mentions the deposit total", () => {
    const story = explainDeposit(summary);
    expect(story).toContain("$1,096.71");
    expect(story.toLowerCase()).toContain("refund");
  });

  it("processStripeCsvText end-to-end", () => {
    const result = processStripeCsvText(text);
    expect(result.balanced).toBe(true);
    expect(result.summary.netCents).toBe(FIXTURE_DEPOSIT_TOTAL_CENTS);
  });
});
