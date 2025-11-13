"use client";

import { Briefcase, Brain, LineChart, Mail, User, Camera } from "lucide-react";

type DockItem = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export default function Dock({ items }: { items: DockItem[] }) {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50">
      <div className="flex gap-3 rounded-3xl bg-white/10 backdrop-blur-xl px-4 py-2 border border-white/10">
        {items.map((it) => (
          <button
            key={it.label}
            onClick={it.onClick}
            className="group relative p-3 rounded-2xl hover:bg-white/10 transition"
            aria-label={it.label}
            title={it.label}
          >
            <div className="scale-100 group-hover:scale-110 transition-transform">
              {it.icon}
            </div>
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100">
              {it.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function defaultDock(on: Record<string, () => void>) {
  return [
    { label: "About", icon: <User />, onClick: on.about },
    { label: "Projects", icon: <Briefcase />, onClick: on.projects },
    { label: "AI Demos", icon: <Brain />, onClick: on.demos },
    { label: "Trading", icon: <LineChart />, onClick: on.trading },
    { label: "Photography", icon: <Camera />, onClick: on.photography },
    { label: "Contact", icon: <Mail />, onClick: on.contact },
  ];
}
