import { explainDeposit } from "./explain";
import { buildJournalLines, journalIsBalanced, toQboJournalCsv, toXeroJournalCsv } from "./journals";
import { parseStripeCsv } from "./parse-stripe";
import type { PayoutSummary } from "./stripe-types";

export type ProcessResult = {
  summary: PayoutSummary;
  explanation: string;
  qboCsv: string;
  xeroCsv: string;
  balanced: boolean;
};

export function processStripeCsvText(text: string): ProcessResult {
  const summary = parseStripeCsv(text);
  const lines = buildJournalLines(summary);
  return {
    summary,
    explanation: explainDeposit(summary),
    qboCsv: toQboJournalCsv(summary),
    xeroCsv: toXeroJournalCsv(summary),
    balanced: journalIsBalanced(lines),
  };
}
