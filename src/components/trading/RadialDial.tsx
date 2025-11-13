"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

type Action = { id: string; label: string; onClick: () => void; };

export default function RadialDial({
  actions,
  center = "⋯",
}: { actions: Action[]; center?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const radius = 72; // px
  return (
    <div className="relative select-none">
      <button
        onClick={() => setOpen(v => !v)}
        className="rounded-full h-12 w-12 grid place-content-center
                   bg-gradient-to-b from-white/25 to-white/10 border border-white/20
                   text-white/90 hover:from-white/35 hover:to-white/15"
        aria-label="Actions"
      >
        {center}
      </button>

      {actions.map((a, idx) => {
        const angle = (idx / actions.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <motion.button
            key={a.id}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
            animate={open ? { opacity: 1, x, y, scale: 1 } : { opacity: 0, x:0, y:0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.03 }}
            onClick={() => { a.onClick(); }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       rounded-full h-10 px-3 border border-white/20 bg-black/60 text-[12px]
                       hover:bg-black/50"
            aria-label={a.label}
          >
            {a.label}
          </motion.button>
        );
      })}
    </div>
  );
}
