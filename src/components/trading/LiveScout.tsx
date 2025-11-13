"use client";

import { useEffect, useMemo, useState } from "react";
import { Candle, recommend212, arming212 } from "@/lib/ta";
import { fCur, fNum, fTime } from "@/lib/format";
import { GlassCard } from "@/components/ui/Glass";
import RadialDial from "./RadialDial";
import SignalTicket from "./SignalTicket";

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

export default function LiveScout() {
  const [symbol, setSymbol] = useState("QQQ");
  const [range, setRange] = useState("1d");
  const [interval, setInterval_] = useState("1m");
  const [account, setAccount] = useState(10000);
  const [riskPct, setRiskPct] = useState(0.5);
  const [emaFilter, setEmaFilter] = useState(true);
  const [allowShorts, setAllowShorts] = useState(true);
  const [requireFVG, setRequireFVG] = useState(false);
  const [pollSec, setPollSec] = useState(20);

  const [plan, setPlan] = useState<any>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [ema8v, setEma8v] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("idle");
  const [err, setErr] = useState<string | null>(null);
  const [ts, setTs] = useState<number | null>(null);

  // load & schedule
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
      setPlan({ ...rec, arm, riskPct });
      setStatus(rec.status);
    } catch (e:any) {
      setErr(e?.message || String(e));
      setStatus("error");
    }
  };

  useEffect(() => { setInterval_(iv => validateCombo(range, iv)); }, [range]);

  useEffect(() => {
    load();
    const id = setInterval(load, Math.max(10, pollSec) * 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, range, interval, account, riskPct, emaFilter, allowShorts, requireFVG, pollSec]);

  // keyboard UX
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r") load();
      if (e.key.toLowerCase() === "e") setEmaFilter(v=>!v);
      if (e.key.toLowerCase() === "f") setRequireFVG(v=>!v);
      if (e.key.toLowerCase() === "s") setAllowShorts(v=>!v);
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const list = ALLOWED[range];
        const idx = list.indexOf(interval);
        const next = e.key === "ArrowUp" ? Math.max(0, idx-1) : Math.min(list.length-1, idx+1);
        setInterval_(list[next]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [interval, range]);

  const color =
    status === "long" ? "ring-emerald-400/50"
  : status === "short" ? "ring-rose-400/50"
  : status === "filtered" ? "ring-amber-400/50"
  : "ring-white/20";

  const actions = useMemo(() => [
    { id: "refresh", label: "Refresh (R)", onClick: load },
    { id: "ema",     label: (emaFilter ? "EMA On" : "EMA Off") + " (E)", onClick: ()=>setEmaFilter(v=>!v) },
    { id: "fvg",     label: (requireFVG ? "FVG On" : "FVG Off") + " (F)", onClick: ()=>setRequireFVG(v=>!v) },
    { id: "shorts",  label: (allowShorts ? "Shorts On" : "Shorts Off") + " (S)", onClick: ()=>setAllowShorts(v=>!v) },
    { id: "copy",    label: "Copy Ticket", onClick: () => {
        const text = ticketText(symbol, plan, account);
        navigator.clipboard?.writeText(text);
      }},
  ], [emaFilter, requireFVG, allowShorts, symbol, plan, account]);

  return (
    <div className="space-y-4">
      {/* Controls — ultra compact with labels */}
      <GlassCard className="p-4 ring-1 ring-white/15">
        <div className="grid md:grid-cols-7 grid-cols-2 gap-3 items-end">
          <Field label="Symbol">
            <input className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 outline-none focus:ring-2 focus:ring-sky-400/40"
                   value={symbol} onChange={e=>setSymbol(e.target.value.toUpperCase())}/>
          </Field>
          <Field label="Range">
            <select className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 outline-none focus:ring-2 focus:ring-sky-400/40"
                    value={range} onChange={(e)=>{ const r=e.target.value; setRange(r); setInterval_(validateCombo(r, interval)); }}>
              {Object.keys(ALLOWED).map(r=> <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Interval">
            <select className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 outline-none focus:ring-2 focus:ring-sky-400/40"
                    value={interval} onChange={(e)=>setInterval_(validateCombo(range, e.target.value))}>
              {ALLOWED[range].map(iv => <option key={iv}>{iv}</option>)}
            </select>
          </Field>
          <Field label="Account ($)">
            <input type="number" className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 outline-none focus:ring-2 focus:ring-sky-400/40"
                   value={account} onChange={e=>setAccount(Number(e.target.value)||0)} />
          </Field>
          <Field label="Risk %">
            <input type="number" step={0.1} className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 outline-none focus:ring-2 focus:ring-sky-400/40"
                   value={riskPct} onChange={e=>setRiskPct(Number(e.target.value)||0)} />
          </Field>
          <Field label="Poll (s)">
            <input type="number" className="w-full px-3 py-2 rounded bg-black/40 border border-white/20 outline-none focus:ring-2 focus:ring-sky-400/40"
                   value={pollSec} onChange={e=>setPollSec(Number(e.target.value)||20)} />
          </Field>

          {/* Radial dial removed, functionality remains via keyboard shortcuts and programmatic access */}
        </div>

        <div className="text-[11px] text-white/60 mt-2">
          Using <b>{range}</b> / <b>{interval}</b>. Shortcuts: R refresh, E EMA, F FVG, S Shorts, ↑/↓ interval.
        </div>
      </GlassCard>

      {/* HUD + Ticket */}
      <div className="grid md:grid-cols-3 gap-4">
        <GlassCard className={`p-4 ring-1 ${color}`}>
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-white/70">HUD — {symbol}</div>
            <div className="text-[11px] text-white/60">{ts ? `Updated ${fTime(ts)}` : ""}</div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Info label="Price" value={price != null ? fNum(price, 2) : "-"} />
            <Info label="EMA 8" value={ema8v != null ? fNum(ema8v, 2) : "-"} />
            <Info label="Risk $" value={fCur(Math.round((account * (riskPct/100) + Number.EPSILON) * 100) / 100)} />
            <Info label="Filters" value={[
              emaFilter ? "EMA" : "",
              requireFVG ? "FVG" : "",
              allowShorts ? "Shorts" : "",
            ].filter(Boolean).join(" · ") || "None"} />
          </div>
          {err && <div className="text-rose-300 text-xs mt-2">Error: {err}</div>}
        </GlassCard>

        <div className="md:col-span-2">
          <SignalTicket
            plan={plan}
            account={account}
            onSetEntry={(v)=> setPlan((p:any)=> ({...p, entry: v}))}
            onSetStop={(v)=> setPlan((p:any)=> ({...p, stop: v}))}
            onSetRisk={(v)=> setPlan((p:any)=> ({...p, riskPct: v}))}
          />
        </div>
      </div>
    </div>
  );
}

function Field({label, children}:{label:string; children:any}) {
  return (
    <label className="flex flex-col">
      <span className="text-[11px] uppercase tracking-wide text-white/70 mb-1">{label}</span>
      {children}
    </label>
  );
}
function Info({label, value}:{label:string; value:string}) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-3">
      <div className="text-[10px] uppercase text-white/60">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function ticketText(sym: string, plan: any, account: number) {
  if (!plan) return `${sym}: no signal`;
  if (plan.status === "long" || plan.status === "short") {
    return [
      `Symbol: ${sym}`,
      `Side: ${plan.status === "long" ? "BUY" : "SHORT"}`,
  `Entry: ${fNum(plan.entry, 2)} | Stop: ${fNum(plan.stop, 2)}`,
      `Size: ${plan.size}`,
  `Targets: ${plan.targets?.map((t:number,i:number)=>`${fNum(t, 2)}(${plan.rr[i]}R)`).join(", ")}`,
  `Risk: ${plan.riskPct != null ? fNum(plan.riskPct, 2) : "0.50"}% of ${fCur(account)}`
    ].join("\n");
  }
  if (plan.arm) {
  return `${sym} arming ${plan.arm.expected}: ▲ ${fNum(plan.arm.triggerUp, 2)} / ▼ ${fNum(plan.arm.triggerDown, 2)}`;
  }
  return `${sym}: ${plan.status}`;
}
