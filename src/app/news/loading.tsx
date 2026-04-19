import { Newspaper } from "lucide-react";

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
      {/* Meta row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-muted" />
          <span className="h-3 w-20 rounded bg-muted" />
          <span className="h-3 w-10 rounded bg-muted" />
        </div>
        <span className="h-4 w-16 rounded-full bg-muted" />
      </div>
      {/* Headline */}
      <div className="space-y-1.5">
        <span className="block h-4 w-full rounded bg-muted" />
        <span className="block h-4 w-4/5 rounded bg-muted" />
      </div>
      {/* Summary */}
      <div className="space-y-1">
        <span className="block h-3 w-full rounded bg-muted/60" />
        <span className="block h-3 w-full rounded bg-muted/60" />
        <span className="block h-3 w-3/4 rounded bg-muted/60" />
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="flex gap-1.5">
          <span className="h-4 w-14 rounded bg-muted/60" />
          <span className="h-4 w-16 rounded bg-muted/60" />
        </div>
        <span className="h-3 w-10 rounded bg-muted/60" />
      </div>
    </div>
  );
}

export default function NewsLoading() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
            <Newspaper className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">News Consolidator</h1>
            <p className="text-xs text-muted-foreground">Fetching latest articles…</p>
          </div>
        </div>
      </div>

      {/* Toolbar skeleton */}
      <div className="flex flex-col gap-3 border-b border-border px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="h-8 w-72 rounded-lg bg-muted/60" />
          <div className="flex gap-2">
            <div className="h-8 w-44 rounded-md bg-muted/60" />
            <div className="h-8 w-20 rounded-md bg-muted/60" />
          </div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="mb-5 h-10 w-full rounded-lg bg-muted/40" />
        <div className="mb-4 h-4 w-24 rounded bg-muted/40" />
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
