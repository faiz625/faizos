import { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
}: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] " +
        "hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-shadow " +
        className
      }
    >
      {children}
    </div>
  );
}
