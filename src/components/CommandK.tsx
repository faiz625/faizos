"use client";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";

type Cmd = { id: string; label: string; action: () => void };

export default function CommandK({ commands }: { commands: Cmd[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Windows">
          {commands.map((c) => (
            <CommandItem key={c.id} value={c.label} onSelect={() => { c.action(); setOpen(false); }}>
              {c.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Quick Links">
          <CommandItem onSelect={() => window.open("https://github.com/faiz625", "_blank")}>Open GitHub</CommandItem>
          <CommandItem onSelect={() => window.open("https://www.linkedin.com/in/faizkapadia/", "_blank")}>Open LinkedIn</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
