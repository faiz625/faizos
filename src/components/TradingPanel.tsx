"use client";

import { useEffect, useState } from "react";
import { Candle, Trade, backtest212, recommend212, arming212 } from "@/lib/ta";
import {
  Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Scatter, AreaChart, Area
} from "recharts";
import LiveScout from "@/components/trading/LiveScout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fCur, fNum, fPct, fTime, rowsToCSV } from "@/lib/format";

/* ================= Allowed combos for Yahoo ================= */

const ALLOWED: Record<string, string[]> = {
  "1d":  ["1m", "2m", "5m", "15m"],
  "5d":  ["5m", "15m", "1h"],
  "1mo": ["15m", "1h", "1d"],
  "3mo": ["1h", "1d"],
};
function validateCombo(range: string, interval: string) {
  const allowed = ALLOWED[range] || ["1m"];
  return allowed.includes(interval) ? interval : allowed[0];
}

/* ================= Shared field components (dark theme) ================= */

function labelCls(extra = "") {
  return `text-[11px] uppercase tracking-wide text-gray-600 dark:text-white/70 mb-1 ${extra}`;
}
function boxCls(extra = "") {
  return `w-full rounded-md bg-gray-100 dark:bg-black/40 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400/40 transition ${extra}`;
}

function LabeledInput(props: {
  id: string; label: string; type?: string;
  value: string | number; onChange: (e: any) => void; placeholder?: string; step?: number;
}) {
  const { id, label, type="text", value, onChange, placeholder="", step } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={labelCls()}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        step={step as any} className={boxCls("px-3 py-2")} />
    </div>
  );
}

function LabeledSelect(props: {
  id: string; label: string; value: string; onChange: (e:any)=>void; options: string[];
}) {
  const { id, label, value, onChange, options } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={labelCls()}>{label}</label>
      <select id={id} value={value} onChange={onChange} className={boxCls("px-3 py-2")}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function LabeledCheckbox(props: {
  id: string; label: string; checked: boolean; onChange: (e:any)=>void;
}) {
  const { id, label, checked, onChange } = props;
  return (
    <label className="flex items-center gap-2 select-none">
      <input id={id} type="checkbox" checked={checked} onChange={onChange}
        className="h-4 w-4 rounded bg-black/40 border border-white/30 accent-sky-400" />
      <span className="text-[12px] text-gray-700 dark:text-white/80">{label}</span>
    </label>
  );
}

/* ================= Main Panel Tabs ================= */

export default function TradingPanel() {
  return (
    <Tabs defaultValue="bot" className="w-full">
      <TabsList className="mb-3 bg-white/10">
        <TabsTrigger value="template">Template</TabsTrigger>
        <TabsTrigger value="bot">Paper Bot</TabsTrigger>
        <TabsTrigger value="advisor">LiveScout</TabsTrigger>
      </TabsList>

      {/* keep Template + PaperBot as you have */}
      <TabsContent value="template"><TemplateGen /></TabsContent>
      <TabsContent value="bot"><PaperBot /></TabsContent>

      {/* NEW: LiveScout */}
      <TabsContent value="advisor"><LiveScout /></TabsContent>
    </Tabs>
  );
}

/* ================= Template Generator ================= */

function TemplateGen() {
  const [symbol, setSymbol] = useState("QQQ");
  const [entry, setEntry] = useState("");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");
  const [risk, setRisk] = useState(0.5);
  const [account, setAccount] = useState(10000);

  const e = Number(entry), s = Number(sl), t = Number(tp);
  const ready = e > 0 && s > 0 && t > 0 && account > 0 && risk > 0;
  const ptsRisk = ready ? Math.abs(e - s) : 0;
  const ptsReward = ready ? Math.abs(t - e) : 0;
  const rr = ready ? (ptsReward / (ptsRisk || 1)) : 0;
  const size = ready ? Math.max(1, Math.floor(((risk / 100) * account) / Math.max(ptsRisk, 0.01))) : 0;

  return (
    <div className="space-y-4 text-sm">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <LabeledInput id="tmpl-symbol" label="Symbol" value={symbol} onChange={(e)=>setSymbol(e.target.value.toUpperCase())} />
        <LabeledInput id="tmpl-account" label="Account ($)" type="number" value={account} onChange={(e)=>setAccount(Number(e.target.value)||0)} />
        <LabeledInput id="tmpl-risk" label="Risk % per trade" type="number" step={0.1} value={risk} onChange={(e)=>setRisk(Number(e.target.value)||0)} />
        <LabeledInput id="tmpl-entry" label="Entry" value={entry} onChange={(e)=>setEntry(e.target.value)} />
        <LabeledInput id="tmpl-stop" label="Stop" value={sl} onChange={(e)=>setSl(e.target.value)} />
        <LabeledInput id="tmpl-tp" label="Take Profit" value={tp} onChange={(e)=>setTp(e.target.value)} />
      </div>

      <div className="rounded-xl border border-white/10 bg-black/50 p-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <Info label="Symbol" value={symbol} />
          <Info label="Size" value={fNum(size)} />
          <Info label="Risk/Reward" value={ready ? `${ptsRisk.toFixed(2)} / ${ptsReward.toFixed(2)} (R:${rr.toFixed(2)})` : "-"} />
          <Info label="Account" value={fCur(account)} />
          <Info label="Entry" value={ready ? fNum(e, 2) : "-"} />
          <Info label="Stop" value={ready ? fNum(s, 2) : "-"} />
          <Info label="Target" value={ready ? fNum(t, 2) : "-"} />
          <Info label="Risk %" value={`${risk}%`} />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-2">
      <div className="text-[10px] uppercase tracking-wide text-gray-600 dark:text-white/60">{label}</div>
      <div className="font-medium text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}

/* ================= Paper Bot (Backtest UI) ================= */

function PaperBot() {
  const [symbol, setSymbol] = useState("QQQ");
  const [range, setRange] = useState("5d");
  const [interval, setInterval_] = useState("5m");
  const [initCash, setInitCash] = useState(10000);

  const [emaFilter, setEmaFilter] = useState(true);
  const [allowShorts, setAllowShorts] = useState(true);
  const [requireFVG, setRequireFVG] = useState(false);

  const [candles, setCandles] = useState<Candle[]>([]);
  const [equity, setEquity] = useState<{ t:number; equity:number }[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [ema8, setEma8] = useState<(number | null)[]>([]);
  const [signals, setSignals] = useState<{ i:number; kind:"212u"|"212d"; insideHigh:number; insideLow:number }[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<{ finalEquity:number; pl:number; plPct:number } | null>(null);

  const load = async () => {
    setErr(null); setLoading(true);
    try {
      const r = await fetch(`/api/yf?symbol=${encodeURIComponent(symbol)}&range=${range}&interval=${interval}`, { cache: "no-store" });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "fetch failed");
      const data: Candle[] = j.candles;
      setCandles(data);

      const res = backtest212(data, { emaFilter, allowShorts, requireFVG, initCash });
      setEquity(res.equityCurve);
      setTrades(res.trades);
      setEma8(res.ema8);
      setSignals(res.signals);
      setMetrics({ finalEquity: res.finalEquity, pl: res.pl, plPct: res.plPct });
    } catch (e:any) {
      setErr(e?.message || String(e));
    } finally { setLoading(false); }
  };

  const exportTrades = () => {
    if (!trades.length) return alert("No trades to export.");
    const csv = rowsToCSV(trades.map(t => ({
      time: fTime(t.time),
      side: t.side,
      size: t.size,
      price: t.price,
      note: t.note || ""
    })));
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `trades_${symbol}_${range}_${interval}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 text-sm">
      <div className="grid md:grid-cols-6 grid-cols-2 gap-3">
        <LabeledInput id="pb-symbol" label="Symbol" value={symbol} onChange={(e)=>setSymbol(e.target.value.toUpperCase())}/>
        <LabeledSelect id="pb-range" label="Range" value={range} onChange={(e)=>setRange(e.target.value)} options={["1d","5d","1mo","3mo"]} />
        <LabeledSelect id="pb-interval" label="Interval" value={interval} onChange={(e)=>setInterval_(e.target.value)} options={["1m","2m","5m","15m","1h","1d"]} />
        <LabeledInput id="pb-cash" label="Initial Cash ($)" type="number" value={initCash} onChange={(e)=>setInitCash(Number(e.target.value)||0)}/>
        <div className="flex flex-col justify-end"><LabeledCheckbox id="pb-ema" label="8-EMA filter" checked={emaFilter} onChange={(e)=>setEmaFilter(e.target.checked)}/></div>
        <div className="flex flex-col justify-end"><LabeledCheckbox id="pb-shorts" label="Allow shorts" checked={allowShorts} onChange={(e)=>setAllowShorts(e.target.checked)}/></div>
        <div className="flex flex-col justify-end md:col-span-2"><LabeledCheckbox id="pb-fvg" label="Require FVG" checked={requireFVG} onChange={(e)=>setRequireFVG(e.target.checked)}/></div>
        <div className="flex gap-2 md:col-span-4">
          <button onClick={load} className={boxCls("px-3 py-2 text-sm bg-white/10 hover:bg-white/15")}>
            {loading ? "Loading…" : "Backtest 2-1-2"}
          </button>
          <button onClick={exportTrades} className={boxCls("px-3 py-2 text-sm bg-white/10 hover:bg-white/15")}>Export trades</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Metric label="Initial" value={fCur(initCash)} />
        <Metric label="Final" value={metrics ? fCur(metrics.finalEquity) : "-"} />
        <Metric label="P/L" value={metrics ? `${fCur(metrics.pl)} (${fPct(metrics.plPct)})` : "-"} color={metrics ? (metrics.pl >= 0 ? "text-emerald-300" : "text-rose-300") : ""}/>
        <Metric label="Trades" value={trades.length ? String(trades.length) : "-"} />
      </div>

      {/* Price + EMA + signals */}
      <div className="border-t border-white/10 pt-3">
        <div className="font-medium mb-2">Price + EMA-8 + 2-1-2 markers</div>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={candles.map((c, i) => ({
                t: c.t,
                close: c.close,
                ema8: ema8[i],
                buy: signals.find(s => s.i === i && s.kind === "212u") ? c.close : null,
                sell: signals.find(s => s.i === i && s.kind === "212d") ? c.close : null,
              }))}
            >
              <CartesianGrid strokeOpacity={0.08} />
              <XAxis dataKey="t" tickFormatter={(v)=>new Date(v).toLocaleTimeString()} />
              <YAxis domain={["auto","auto"]} />
              <Tooltip formatter={(v, n) => typeof v === "number" ? [fNum(v, 2), n as string] : [v as any, n as string]} labelFormatter={(v)=>fTime(Number(v))} />
              <Legend />
              <Line type="monotone" dataKey="close" name="Close" dot={false} stroke="#d1d5db" strokeWidth={1.2} />
              <Line type="monotone" dataKey="ema8" name="EMA 8" dot={false} stroke="#60a5fa" strokeDasharray="5 5" strokeWidth={1.1} />
              <Scatter dataKey="buy" name="212u (Buy)" shape="triangle" fill="#34d399" />
              <Scatter dataKey="sell" name="212d (Sell)" shape="triangle" fill="#f87171" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Equity curve */}
      <div className="border-t border-white/10 pt-3">
        <div className="font-medium mb-2">Equity Curve (Backtest)</div>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <AreaChart data={equity}>
              <CartesianGrid strokeOpacity={0.08} />
              <XAxis dataKey="t" tickFormatter={(v)=>new Date(v).toLocaleDateString()} />
              <YAxis domain={["auto","auto"]} />
              <Tooltip formatter={(v, n) => typeof v === "number" ? [fNum(v, 2), n as string] : [v as any, n as string]} labelFormatter={(v)=>fTime(Number(v))} />
              <Area dataKey="equity" name="Equity" type="monotone" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.15} strokeWidth={1.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trades */}
      <div className="border-t border-white/10 pt-3">
        <div className="font-medium mb-2">Trades</div>
        {!trades.length ? (
          <div className="text-gray-600 dark:text-white/60 text-xs">No trades.</div>
        ) : (
          <div className="max-h-64 overflow-auto rounded-lg border border-white/10">
            <table className="text-xs w-full">
              <thead className="sticky top-0 bg-black/70 backdrop-blur border-b border-white/10">
                <tr>
                  <Th>Time</Th><Th>Side</Th><Th className="text-right">Qty</Th><Th className="text-right">Price</Th><Th>Note</Th>
                </tr>
              </thead>
              <tbody>
                {trades.map((t,i)=>(
                  <tr key={i} className="border-b border-white/5 odd:bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                    <Td>{fTime(t.time)}</Td>
                    <Td><SideBadge side={t.side} /></Td>
                    <Td className="text-right tabular-nums">{fNum(t.size)}</Td>
                    <Td className="text-right tabular-nums">{fNum(t.price, 2)}</Td>
                    <Td>{t.note}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="text-gray-600 dark:text-white/60 text-xs mt-2">Paper trading only. Educational use.</div>
        {err && <div className="text-rose-300 text-xs mt-2">Error: {err}</div>}
      </div>
    </div>
  );
}

/* ================= Live Advisor (Recommendations) ================= */

function Advisor() {
  const [symbol, setSymbol] = useState("QQQ");
  const [range, setRange] = useState("1d");
  const [interval, setInterval_] = useState("1m");
  const [account, setAccount] = useState(10000);
  const [riskPct, setRiskPct] = useState(0.5);
  const [emaFilter, setEmaFilter] = useState(true);
  const [allowShorts, setAllowShorts] = useState(true);
  const [requireFVG, setRequireFVG] = useState(false);
  const [pollSec, setPollSec] = useState(30);

  const [plan, setPlan] = useState<any>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [ema8v, setEma8v] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("idle");
  const [err, setErr] = useState<string | null>(null);
  const [ts, setTs] = useState<number | null>(null);

  const load = async () => {
    try {
      setErr(null); setStatus("updating");
      const r = await fetch(`/api/yf?symbol=${encodeURIComponent(symbol)}&range=${range}&interval=${interval}`, { cache: "no-store" });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "fetch failed");
      const candles: Candle[] = j.candles;

      const rec = recommend212(candles, { account, riskPct, emaFilter, allowShorts, requireFVG });
      const arm = arming212(candles);

      setTs(Date.now());
      setPrice(rec.price ?? candles[candles.length - 1]?.close ?? null);
      setEma8v(rec.ema8 ?? null);
      setPlan({ ...rec, arm });
      setStatus(rec.status);
    } catch (e:any) {
      setErr(e?.message || String(e));
      setStatus("error");
    }
  };

  useEffect(() => {
    setInterval_(iv => validateCombo(range, iv));
  }, [range]);

  useEffect(() => {
    load();
    const id = setInterval(load, Math.max(10, pollSec) * 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, range, interval, account, riskPct, emaFilter, allowShorts, requireFVG, pollSec]);

  const color =
    status === "long" ? "border-emerald-400/40 bg-emerald-500/10"
  : status === "short" ? "border-rose-400/40 bg-rose-500/10"
  : status === "filtered" ? "border-amber-400/40 bg-amber-500/10"
  : "border-white/15 bg-white/5";

  return (
    <div className="space-y-4 text-sm">
      {/* Controls */}
      <div className="grid md:grid-cols-6 grid-cols-2 gap-3">
        <LabeledInput id="ad-symbol" label="Symbol" value={symbol} onChange={(e)=>setSymbol(e.target.value.toUpperCase())}/>
        <LabeledSelect id="ad-range" label="Range" value={range} onChange={(e) => {
          const r = e.target.value;
          const newInterval = validateCombo(r, interval);
          setRange(r); setInterval_(newInterval);
        }} options={Object.keys(ALLOWED)} />
        <LabeledSelect id="ad-interval" label="Interval" value={interval} onChange={(e)=>setInterval_(validateCombo(range, e.target.value))} options={ALLOWED[range]} />
        <LabeledInput id="ad-account" label="Account ($)" type="number" value={account} onChange={(e)=>setAccount(Number(e.target.value)||0)} />
        <LabeledInput id="ad-risk" label="Risk % / trade" type="number" step={0.1} value={riskPct} onChange={(e)=>setRiskPct(Number(e.target.value)||0)} />
        <LabeledInput id="ad-poll" label="Poll seconds" type="number" value={pollSec} onChange={(e)=>setPollSec(Number(e.target.value)||30)} />
        <div className="flex flex-col justify-end"><LabeledCheckbox id="ad-ema" label="8-EMA filter" checked={emaFilter} onChange={(e)=>setEmaFilter(e.target.checked)} /></div>
        <div className="flex flex-col justify-end"><LabeledCheckbox id="ad-shorts" label="Allow shorts" checked={allowShorts} onChange={(e)=>setAllowShorts(e.target.checked)} /></div>
        <div className="flex flex-col justify-end md:col-span-2"><LabeledCheckbox id="ad-fvg" label="Require FVG" checked={requireFVG} onChange={(e)=>setRequireFVG(e.target.checked)} /></div>
        <div className="flex gap-2 md:col-span-2">
          <button onClick={load} className={boxCls("px-3 py-2 text-sm bg-white/10 hover:bg-white/15")}>Refresh now</button>
        </div>
      </div>

      <div className="text-[11px] text-white/50">
        Using range <b>{range}</b> with interval <b>{interval}</b>.
      </div>

      {/* Live card */}
      <div className={`rounded-xl border p-4 ${color}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs uppercase tracking-wide text-white/70">Live Advisor — {symbol}</div>
          <div className="text-xs text-white/60">{ts ? `Updated ${fTime(ts)}` : ""}</div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="rounded-lg bg-black/30 border border-white/10 p-3">
            <div className="text-[10px] uppercase text-white/60">Market</div>
            <div className="text-sm">Price: <b>{price != null ? fNum(price, 2) : "-"}</b></div>
            <div className="text-sm">EMA 8: <b>{ema8v != null ? fNum(ema8v, 2) : "-"}</b></div>
            <div className="text-xs text-white/60 mt-1">Status: {status}</div>
          </div>

          <div className="rounded-lg bg-black/30 border border-white/10 p-3">
            <div className="text-[10px] uppercase text-white/60">Plan</div>
            {plan?.status === "long" && (
              <div className="space-y-1">
                <div>Side: <b className="text-emerald-300">BUY</b></div>
                <div>Entry: <b>{fNum(plan.entry, 2)}</b> | Stop: <b>{fNum(plan.stop, 2)}</b></div>
                <div>Size: <b>{fNum(plan.size)}</b></div>
                <div>Targets: {plan.targets.map((t:number,i:number)=><b key={i} className="mr-2">{fNum(t,2)} ({plan.rr[i]}R)</b>)}</div>
              </div>
            )}
            {plan?.status === "short" && (
              <div className="space-y-1">
                <div>Side: <b className="text-rose-300">SHORT</b></div>
                <div>Entry: <b>{fNum(plan.entry, 2)}</b> | Stop: <b>{fNum(plan.stop, 2)}</b></div>
                <div>Size: <b>{fNum(plan.size)}</b></div>
                <div>Targets: {plan.targets.map((t:number,i:number)=><b key={i} className="mr-2">{fNum(t,2)} ({plan.rr[i]}R)</b>)}</div>
              </div>
            )}
            {plan && (plan.status === "filtered" || plan.status === "no-signal" || plan.status === "insufficient") && (
              <div className="text-white/80 text-xs space-y-1">
                {plan.status === "filtered"     && <div>Signal exists but filtered out by EMA8/FVG/shorts settings.</div>}
                {plan.status === "no-signal"    && <div>No 2-1-2 signal on the latest bar.</div>}
                {plan.status === "insufficient" && <div>Not enough bars for a safe recommendation yet.</div>}
                {plan?.arm && (
                  <div className="mt-1">
                    Setup arming: <b>{plan.arm.expected}</b><br/>
                    Watch triggers: ↑ <b>{fNum(plan.arm.triggerUp,2)}</b> / ↓ <b>{fNum(plan.arm.triggerDown,2)}</b>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="rounded-lg bg-black/30 border border-white/10 p-3">
            <div className="text-[10px] uppercase text-white/60">Checklist</div>
            <ul className="text-xs space-y-1 list-disc ml-4">
              <li>Only act if price <b>crosses entry</b> (use stop/limit for paper fills).</li>
              <li>Risk: <b>{riskPct}%</b> of account = {fCur(account * (riskPct/100))}.</li>
              <li>Partial at 1R, move stop to BE after fill.</li>
              <li>Paper only. No real orders placed.</li>
            </ul>
          </div>
        </div>

        {err && <div className="text-rose-300 text-xs mt-2">Error: {err}</div>}
      </div>
    </div>
  );
}

/* ================= UI bits ================= */

function Th({ children, className = "" }: any) {
  return <th className={`text-left px-2 py-2 font-semibold ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: any) {
  return <td className={`px-2 py-2 ${className}`}>{children}</td>;
}

function Metric({ label, value, color = "" }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3">
      <div className="text-[10px] uppercase tracking-wide text-gray-600 dark:text-white/60">{label}</div>
      <div className={`text-sm font-semibold text-gray-900 dark:text-white ${color}`}>{value}</div>
    </div>
  );
}

function SideBadge({ side }: { side: Trade["side"] }) {
  const map: Record<Trade["side"], { text: string; cls: string }> = {
    BUY:   { text: "BUY",   cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
    SELL:  { text: "SELL",  cls: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
    SHORT: { text: "SHORT", cls: "bg-rose-500/15 text-rose-300 border-rose-500/30" },
    COVER: { text: "COVER", cls: "bg-sky-500/15 text-sky-300 border-sky-500/30" },
  };
  const m = map[side];
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-semibold ${m.cls}`}>{m.text}</span>;
}
