// src/app/api/yf/route.ts
// Tiny proxy for Yahoo Finance chart API (no API key). For paper trading ONLY.
export const revalidate = 0; // always fresh

type YFResp = {
  chart: {
    result: Array<{
      timestamp: number[];
      indicators: { quote: Array<{ open: number[]; high: number[]; low: number[]; close: number[]; volume: number[] }> };
      meta: { symbol: string; exchangeName?: string; regularMarketPrice?: number };
    }>;
    error: any;
  };
};

function ok(json: any, status = 200) { return new Response(JSON.stringify(json), { status, headers: { "content-type": "application/json" } }); }
function bad(msg: string, status = 400) { return ok({ error: msg }, status); }

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "QQQ";
  const range = searchParams.get("range") || "5d";      // e.g., 1d,5d,1mo,3mo
  const interval = searchParams.get("interval") || "5m"; // e.g., 1m,5m,15m,1h,1d

  // Yahoo chart endpoint
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}`;

  try {
    const r = await fetch(url, { headers: { "accept": "application/json" } , cache: "no-store"});
    if (!r.ok) return bad(`Upstream error ${r.status}`);
    const data = (await r.json()) as YFResp;
    const res = data?.chart?.result?.[0];
    if (!res?.timestamp?.length) return bad("No data");

    const q = res.indicators.quote[0];
    const out = res.timestamp.map((t, i) => ({
      t: t * 1000, // ms
      open: q.open?.[i] ?? null,
      high: q.high?.[i] ?? null,
      low: q.low?.[i] ?? null,
      close: q.close?.[i] ?? null,
      volume: q.volume?.[i] ?? null,
    })).filter(d => d.close != null);

    return ok({ symbol: res.meta.symbol, candles: out });
  } catch (e: any) {
    return bad(`Fetch failed: ${e?.message || String(e)}`, 502);
  }
}
