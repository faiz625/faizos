// src/lib/format.ts

export const fCur = (n: number | null | undefined, currency = "USD") =>
  n == null ? "-" : new Intl.NumberFormat(undefined, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.round((n + Number.EPSILON) * 100) / 100);

export const fNum = (n: number | null | undefined, dp = 2) =>
  n == null ? "-" : new Intl.NumberFormat(undefined, { minimumFractionDigits: dp, maximumFractionDigits: dp }).format(Math.round((n + Number.EPSILON) * Math.pow(10, dp)) / Math.pow(10, dp));

export const fPct = (n: number | null | undefined, dp = 2) =>
  n == null ? "-" : `${n.toFixed(dp)}%`;

export const fTime = (ms: number) =>
  new Date(ms).toLocaleString();

export function rowsToCSV<T extends Record<string, any>>(rows: T[]) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map(h => JSON.stringify(r[h] ?? "").replace(/^"|"$/g, "")).join(","));
  }
  return lines.join("\n");
}
