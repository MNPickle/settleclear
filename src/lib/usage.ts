/** Client-only free-tier gate via localStorage. */

export const USAGE_KEY = "settleclear_free_files_used";
export const FREE_FILE_LIMIT = 1;

export function getFilesUsed(): number {
  if (typeof window === "undefined") return 0;
  const n = parseInt(localStorage.getItem(USAGE_KEY) || "0", 10);
  return Number.isFinite(n) ? n : 0;
}

export function incrementFilesUsed(): number {
  const next = getFilesUsed() + 1;
  localStorage.setItem(USAGE_KEY, String(next));
  return next;
}

export function canProcessFree(): boolean {
  return getFilesUsed() < FREE_FILE_LIMIT;
}

export function gumroadUrl(): string {
  return (
    process.env.NEXT_PUBLIC_GUMROAD_URL ||
    "https://craftingwithdonna.gumroad.com/l/settleclear"
  );
}
