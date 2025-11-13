// src/lib/ta.ts

export type Candle = {
  t: number;           // ms epoch
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number | null;
};

export type Trade = {
  time: number;
  side: "BUY" | "SELL" | "SHORT" | "COVER";
  price: number;
  size: number; // quantity (+ long, - short stored as positive size field)
  note?: string;
};

/* ========= Basic TA ========= */

export function ema(values: number[], period: number): (number | null)[] {
  const k = 2 / (period + 1);
  const out: (number | null)[] = Array(values.length).fill(null);
  let prev: number | null = null;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (v == null) continue;
    if (i === 0 || prev == null) { prev = v; out[i] = prev; }
    else { prev = v * k + prev * (1 - k); out[i] = prev; }
  }
  return out;
}

export function atr(c: Candle[], period = 14): (number | null)[] {
  if (!c.length) return [];
  const tr: number[] = [];
  for (let i = 0; i < c.length; i++) {
    const hi = c[i].high, lo = c[i].low, prevClose = i > 0 ? c[i-1].close : c[i].close;
    tr.push(Math.max(hi - lo, Math.abs(hi - prevClose), Math.abs(lo - prevClose)));
  }
  const out: (number | null)[] = Array(c.length).fill(null);
  let sum = 0;
  for (let i = 0; i < c.length; i++) {
    sum += tr[i];
    if (i === period - 1) out[i] = sum / period;
    if (i >= period) {
      const prev = out[i-1] ?? (sum / period);
      out[i] = (prev! * (period - 1) + tr[i]) / period;
    }
  }
  return out;
}

/* ========= TheStrat bar types & 2-1-2 detection ========= */

export function stratBarType(curr: Candle, prev: Candle): "1" | "2u" | "2d" | "3" {
  const up = curr.high > prev.high;
  const down = curr.low < prev.low;
  if (up && down) return "3";
  if (!up && !down) return "1";
  return up ? "2u" : "2d";
}

/** Detect 2-1-2 sequences; returns bar index for the *third* bar plus inside bar bounds. */
export function detect212(candles: Candle[]) {
  const types: ("1" | "2u" | "2d" | "3")[] = Array(candles.length).fill("1");
  for (let i = 1; i < candles.length; i++) types[i] = stratBarType(candles[i], candles[i - 1]);

  const signals: { i: number; kind: "212u" | "212d"; insideHigh: number; insideLow: number }[] = [];
  for (let i = 2; i < candles.length; i++) {
    const a = types[i - 2], b = types[i - 1], c = types[i];
    if ((a === "2u" || a === "2d") && b === "1" && c === "2u") {
      signals.push({ i, kind: "212u", insideHigh: candles[i - 1].high, insideLow: candles[i - 1].low });
    }
    if ((a === "2u" || a === "2d") && b === "1" && c === "2d") {
      signals.push({ i, kind: "212d", insideHigh: candles[i - 1].high, insideLow: candles[i - 1].low });
    }
  }
  return { types, signals };
}

/* ========= Fair Value Gaps (3-candle) ========= */

export type FVG = { i: number; type: "bull" | "bear"; top: number; bottom: number };

export function detectFVG(c: Candle[]) {
  const zones: FVG[] = [];
  for (let i = 2; i < c.length; i++) {
    // bullish displacement: low[i] > high[i-2]
    if (c[i].low > c[i - 2].high) zones.push({ i, type: "bull", top: c[i].low, bottom: c[i - 2].high });
    // bearish displacement: high[i] < low[i-2]
    if (c[i].high < c[i - 2].low) zones.push({ i, type: "bear", top: c[i - 2].low, bottom: c[i].high });
  }
  // active zones timeline: zone removed when a candle fully overlaps it
  const activeByIndex: { bull: FVG[]; bear: FVG[] }[] = c.map(() => ({ bull: [], bear: [] }));
  const active: FVG[] = [];
  for (let i = 0; i < c.length; i++) {
    for (let j = active.length - 1; j >= 0; j--) {
      const z = active[j];
      const filled =
        c[i].low <= z.top && c[i].high >= z.bottom;
      if (filled) active.splice(j, 1);
    }
    const created = zones.filter(z => z.i === i);
    active.push(...created);
    activeByIndex[i] = { bull: active.filter(z => z.type === "bull"), bear: active.filter(z => z.type === "bear") };
  }
  return { zones, activeByIndex };
}

/* ========= Backtest: 2-1-2 + EMA8 filter + FVG confluence ========= */

export function backtest212(
  candles: Candle[],
  opts: { emaFilter?: boolean; allowShorts?: boolean; requireFVG?: boolean; initCash?: number } = {}
) {
  const { emaFilter = true, allowShorts = true, requireFVG = false, initCash = 10000 } = opts;
  const closes = candles.map((x) => x.close);
  const ema8 = ema(closes, 8);
  const { signals } = detect212(candles);
  const fvg = detectFVG(candles);

  let cash = initCash;
  let pos = 0;           // +qty long, -qty short
  let lastPrice = closes[0] || 0;
  const trades: Trade[] = [];
  const equityCurve: { t: number; equity: number }[] = [];

  const nearFVG = (i: number, side: "long" | "short") => {
    if (!requireFVG) return true;
    const act = fvg.activeByIndex[i] || { bull: [], bear: [] };
    const price = candles[i].close;
    if (side === "long") {
      return act.bull.some(z => Math.abs(price - z.bottom) <= (z.top - z.bottom) || Math.abs(price - z.top) <= (z.top - z.bottom));
    } else {
      return act.bear.some(z => Math.abs(price - z.top) <= (z.top - z.bottom) || Math.abs(price - z.bottom) <= (z.top - z.bottom));
    }
  };

  for (let i = 0; i < candles.length; i++) {
    const c = candles[i];
    const price = c.close;
    if (price == null) continue;
    lastPrice = price;

    const equity = cash + pos * price;
    equityCurve.push({ t: c.t, equity: +equity.toFixed(2) });

    const sig = signals.find(s => s.i === i);
    if (!sig) continue;

    const emaOkLong  = !emaFilter || (ema8[i] != null && price >= (ema8[i] as number));
    const emaOkShort = !emaFilter || (ema8[i] != null && price <= (ema8[i] as number));

    if (sig.kind === "212u" && emaOkLong && nearFVG(i, "long")) {
      if (pos < 0) { cash += (-pos) * price; trades.push({ time: c.t, side: "COVER", price, size: -pos, note: "flip long" }); pos = 0; }
      if (pos === 0) {
        const qty = Math.floor((cash / price) * 1000) / 1000;
        if (qty > 0) { pos = qty; cash -= qty * price; trades.push({ time: c.t, side: "BUY", price, size: qty, note: "212u" }); }
      }
    }
    if (sig.kind === "212d" && allowShorts && emaOkShort && nearFVG(i, "short")) {
      if (pos > 0) { cash += pos * price; trades.push({ time: c.t, side: "SELL", price, size: pos, note: "flip short" }); pos = 0; }
      if (pos === 0) {
        const qty = Math.floor((cash / price) * 1000) / 1000;
        if (qty > 0) { pos = -qty; cash += qty * price; trades.push({ time: c.t, side: "SHORT", price, size: qty, note: "212d" }); }
      }
    }
  }

  const finalEquity = cash + pos * lastPrice;
  const pl = +(finalEquity - initCash).toFixed(2);
  const plPct = +((finalEquity / initCash - 1) * 100).toFixed(2);

  return { ema8, signals, fvg, trades, equityCurve, finalEquity: +finalEquity.toFixed(2), pl, plPct };
}

/* ========= Live latest signal & recommendation ========= */

export function latest212(candles: Candle[]) {
  if (candles.length < 4) return null;
  const i = candles.length - 2; // <- use last COMPLETED bar
  const a = stratBarType(candles[i-2], candles[i-3]);
  const b = stratBarType(candles[i-1], candles[i-2]);
  const c = stratBarType(candles[i],   candles[i-1]);
  if ((a === "2u" || a === "2d") && b === "1" && c === "2u")
    return { i, kind: "212u" as const, insideHigh: candles[i-1].high, insideLow: candles[i-1].low };
  if ((a === "2u" || a === "2d") && b === "1" && c === "2d")
    return { i, kind: "212d" as const, insideHigh: candles[i-1].high, insideLow: candles[i-1].low };
  return null;
}

export function arming212(candles: Candle[]) {
  if (candles.length < 3) return null;
  const i = candles.length - 1; // current (possibly forming) bar
  const prev2 = candles[i-2];
  const prev1 = candles[i-1];
  if (!prev2 || !prev1) return null;

  const a = stratBarType(prev2, candles[i-3] ?? prev2);
  const b = stratBarType(prev1, prev2);
  if ((a === "2u" || a === "2d") && b === "1") {
    return {
      i,
      expected: a === "2u" ? ("212u" as const) : ("212d" as const),
      triggerUp: prev1.high,
      triggerDown: prev1.low,
    };
  }
  return null;
}

export function recommend212(
  candles: Candle[],
  opts: {
    account: number;
    riskPct: number;       // e.g., 0.5
    emaFilter?: boolean;
    allowShorts?: boolean;
    requireFVG?: boolean;
    tick?: number;         // min price increment buffer
  }
) {
  const { account, riskPct, emaFilter = true, allowShorts = true, requireFVG = false, tick } = opts;
  if (candles.length < 20) return { status: "insufficient" as const };

  const price = candles[candles.length - 1].close;
  const ema8Arr = ema(candles.map(c=>c.close), 8);
  const ema8v = ema8Arr[ema8Arr.length - 1];
  const fvg = detectFVG(candles);
  const sig = latest212(candles);
  if (!sig) return { status: "no-signal" as const, price, ema8: ema8v ?? null };

  const step = tick ?? Math.max(0.01, +(price * 0.0005).toFixed(2)); // ~5 bps, min $0.01
  const emaOkLong  = !emaFilter || (ema8v != null && price >= (ema8v as number));
  const emaOkShort = !emaFilter || (ema8v != null && price <= (ema8v as number));
  const act = fvg.activeByIndex[candles.length - 1] || { bull: [], bear: [] };
  const nearBull = act.bull.some(z => Math.abs(price - z.bottom) <= (z.top - z.bottom) || Math.abs(price - z.top) <= (z.top - z.bottom));
  const nearBear = act.bear.some(z => Math.abs(price - z.top) <= (z.top - z.bottom) || Math.abs(price - z.bottom) <= (z.top - z.bottom));

  if (sig.kind === "212u" && emaOkLong && (!requireFVG || nearBull)) {
    const entry = sig.insideHigh + step;
    const stop  = Math.min(sig.insideLow, entry - step) - step;
    const risk  = Math.max(entry - stop, step);
    const riskAmt = account * (riskPct / 100);
    const size  = Math.floor((riskAmt / risk) * 1000) / 1000;
    return {
      status: "long" as const, side: "BUY" as const,
      price, ema8: ema8v ?? null, entry, stop, size,
      targets: [entry + risk, entry + 2*risk, entry + 3*risk], rr: [1,2,3] as const
    };
  }

  if (sig.kind === "212d" && allowShorts && emaOkShort && (!requireFVG || nearBear)) {
    const entry = sig.insideLow - step;
    const stop  = Math.max(sig.insideHigh, entry + step) + step;
    const risk  = Math.max(stop - entry, step);
    const riskAmt = account * (riskPct / 100);
    const size  = Math.floor((riskAmt / risk) * 1000) / 1000;
    return {
      status: "short" as const, side: "SHORT" as const,
      price, ema8: ema8v ?? null, entry, stop, size,
      targets: [entry - risk, entry - 2*risk, entry - 3*risk], rr: [1,2,3] as const
    };
  }

  return { status: "filtered" as const, price, ema8: ema8v ?? null };
}
