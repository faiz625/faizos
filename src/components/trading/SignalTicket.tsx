"use client";

import { fNum, fCur } from "@/lib/format";
import { GlassCard } from "@/components/ui/Glass";

export default function SignalTicket({
  plan, account, onSetEntry, onSetStop, onSetRisk,
}: {
  plan: any;
  account: number;
  onSetEntry: (v:number)=>void;
  onSetStop: (v:number)=>void;
  onSetRisk: (v:number)=>void;
}) {
  const isLong = plan?.status === "long";
  const isShort = plan?.status === "short";
  const tone = isLong ? "ring-emerald-400/50" : isShort ? "ring-rose-400/50" : "ring-white/20";

  return (
    <GlassCard className={`p-4 ring-1 ${tone}`}>
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-white/70">Signal Ticket</div>
        <div className="text-[11px] text-white/60">{plan?.status}</div>
      </div>

      {isLong || isShort ? (
        <div className="mt-3 grid md:grid-cols-4 gap-3 text-sm">
          <Info label="Side" value={isLong ? "BUY" : "SHORT"} accent={isLong ? "text-emerald-300" : "text-rose-300"} />
          <Info label="Entry" value={fNum(plan.entry,2)} />
          <Info label="Stop" value={fNum(plan.stop,2)} />
          <Info label="Size" value={fNum(plan.size)} />
          <Targets label="Targets" arr={plan.targets} rr={plan.rr} />
          <Editable label="Adj. Entry" value={plan.entry != null ? Number(fNum(plan.entry, 2)) : ""} onChange={onSetEntry} />
          <Editable label="Adj. Stop" value={plan.stop != null ? Number(fNum(plan.stop, 2)) : ""} onChange={onSetStop} />
          <Editable label="Risk %" value={plan.riskPct ?? 0.5} onChange={onSetRisk} />
          <Info label="Risk $/trade" value={fCur(account * ((plan.riskPct ?? 0.5)/100))} />
        </div>
      ) : (
        <div className="mt-2 text-xs text-white/75">
          {plan?.arm ? (
            <>
              Setup arming: <b>{plan.arm.expected}</b> — watch ↑ <b>{fNum(plan.arm.triggerUp,2)}</b> / ↓ <b>{fNum(plan.arm.triggerDown,2)}</b>
            </>
          ) : <>No active 2-1-2 signal right now.</>}
        </div>
      )}
    </GlassCard>
  );
}

function Info({label, value, accent=""}: any) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-3">
      <div className="text-[10px] uppercase text-white/60">{label}</div>
      <div className={`font-semibold ${accent}`}>{value}</div>
    </div>
  );
}
function Targets({label, arr, rr}: any) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-3 md:col-span-2">
      <div className="text-[10px] uppercase text-white/60 mb-1">{label}</div>
      <div className="flex flex-wrap gap-2">
        {arr?.map((t:number, i:number)=>(
          <span key={i} className="text-xs tabular-nums rounded bg-black/50 border border-white/10 px-2 py-1">
            {fNum(t,2)} <span className="text-white/60">({rr?.[i]}R)</span>
          </span>
        ))}
      </div>
    </div>
  );
}
function Editable({label, value, onChange}: any) {
  return (
    <label className="rounded-lg bg-white/5 border border-white/10 p-3 flex flex-col">
      <span className="text-[10px] uppercase text-white/60 mb-1">{label}</span>
      <input
        className="bg-black/40 border border-white/20 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-sky-400/40"
        type="number"
        value={value ?? ""}
        onChange={(e)=>onChange(Number(e.target.value))}
      />
    </label>
  );
}
