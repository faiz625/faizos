"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { PropsWithChildren, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  title: string;
  onClose?: () => void;
  initialX?: number;
  initialY?: number;
  className?: string;
}>;

export default function DesktopWindow({ title, onClose, initialX = 80, initialY = 120, className, children }: Props) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const dragRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    const rect = dragRef.current!.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  };
  const onMouseUp = () => { dragging.current = false; };

  return (
    <motion.div
      className={cn("fixed rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl", className)}
      style={{ left: pos.x, top: pos.y }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div
        ref={dragRef}
        onMouseDown={onMouseDown}
        className="cursor-move flex items-center justify-between px-4 py-2 border-b border-white/10"
      >
        <span className="text-sm font-medium">{title}</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/10">
          <X size={16} />
        </button>
      </div>
      <div className="p-4 overflow-auto max-h-[70vh]">{children}</div>
    </motion.div>
  );
}
