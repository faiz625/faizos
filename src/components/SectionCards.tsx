import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ProjectItem = {
  title: string;
  body: string;
  url?: string;
  architecture?: string;
};

export function Grid({ items, onItemClick }: { items: ProjectItem[]; onItemClick?: (item: ProjectItem) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((it) => (
        (it.architecture || onItemClick) ? (
          <button
            key={it.title}
            className="block text-left w-full"
            onClick={() => onItemClick?.(it)}
          >
            <Card className="bg-white/5 border-white/10 hover:ring-2 hover:ring-sky-400/40 transition">
              <CardHeader><CardTitle className="text-base">{it.title}</CardTitle></CardHeader>
              <CardContent className="text-sm text-white/80">{it.body}</CardContent>
            </Card>
          </button>
        ) : it.url ? (
          <a
            key={it.title}
            href={it.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="bg-white/5 border-white/10 hover:ring-2 hover:ring-sky-400/40 transition">
              <CardHeader><CardTitle className="text-base">{it.title}</CardTitle></CardHeader>
              <CardContent className="text-sm text-white/80">{it.body}</CardContent>
            </Card>
          </a>
        ) : (
          <Card key={it.title} className="bg-white/5 border-white/10">
            <CardHeader><CardTitle className="text-base">{it.title}</CardTitle></CardHeader>
            <CardContent className="text-sm text-white/80">{it.body}</CardContent>
          </Card>
        )
      ))}
    </div>
  );
}
