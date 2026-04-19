"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  ExternalLink,
  Search,
  X,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  Article,
  SourceStatus,
  Topic,
  ArticleTag,
} from "@/lib/rss-feeds";
import { TOPIC_META, TAG_META } from "@/lib/rss-feeds";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatFetchTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Article card ─────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: Article }) {
  const topicMeta = TOPIC_META[article.topic];
  // Show at most 3 tags; de-dupe against topic label
  const displayTags = article.tags.slice(0, 3);

  return (
    <article className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-border/60 hover:bg-card/60">
      {/* Meta row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: article.sourceColor }}
          />
          <span className="truncate text-xs font-medium text-muted-foreground">
            {article.source}
          </span>
          <span className="text-xs text-muted-foreground/40">·</span>
          <span className="shrink-0 text-xs text-muted-foreground/60">
            {timeAgo(article.publishedAt)}
          </span>
        </div>
        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold", topicMeta.chip)}>
          {topicMeta.label}
        </span>
      </div>

      {/* Headline */}
      <h2 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
        {article.title}
      </h2>

      {/* Summary */}
      {article.summary && (
        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {article.summary}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex flex-wrap gap-1.5">
          {displayTags.map((tag) => {
            const meta = TAG_META[tag];
            return (
              <span
                key={tag}
                className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", meta.chip)}
              >
                {meta.label}
              </span>
            );
          })}
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
          onClick={(e) => e.stopPropagation()}
        >
          Read
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

// ─── Source health strip ──────────────────────────────────────────────────────

function SourceHealthStrip({
  statuses,
  fetchedAt,
}: {
  statuses: SourceStatus[];
  fetchedAt: string;
}) {
  const [open, setOpen] = useState(false);
  const live = statuses.filter((s) => s.ok).length;
  const total = statuses.length;

  return (
    <div className="rounded-lg border border-border bg-card/50 px-4 py-3">
      <button
        className="flex w-full items-center justify-between gap-2 text-xs"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              live === total ? "bg-emerald-400" : live > 0 ? "bg-amber-400" : "bg-red-400"
            )}
          />
          <span>
            {live}/{total} sources live · Updated {formatFetchTime(fetchedAt)}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="mt-3 flex flex-wrap gap-2">
          {statuses.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-1.5 rounded border border-border bg-background/60 px-2.5 py-1"
            >
              {s.ok ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              ) : (
                <XCircle className="h-3 w-3 text-red-400" />
              )}
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs text-muted-foreground">{s.name}</span>
              {s.ok && (
                <span className="text-xs text-muted-foreground/50">
                  ({s.count})
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const TOPICS: { key: Topic | "all"; label: string }[] = [
  { key: "all",      label: "All" },
  { key: "tools",    label: "Tools" },
  { key: "research", label: "Research" },
  { key: "business", label: "Business" },
  { key: "design",   label: "Design" },
];

const ALL_TAGS: ArticleTag[] = [
  "image-gen",
  "video-gen",
  "workflows",
  "ai-tools",
  "industry",
  "design",
];

const PAGE_SIZE = 20;

interface NewsFeedProps {
  articles: Article[];
  sourceStatuses: SourceStatus[];
  fetchedAt: string;
}

export function NewsFeed({ articles, sourceStatuses, fetchedAt }: NewsFeedProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [topicFilter, setTopicFilter] = useState<Topic | "all">("all");
  const [activeTag, setActiveTag] = useState<ArticleTag | null>(null);
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  // Counts per topic for tab badges
  const topicCounts = useMemo(() => {
    const map: Record<string, number> = { all: articles.length };
    for (const a of articles) map[a.topic] = (map[a.topic] ?? 0) + 1;
    return map;
  }, [articles]);

  // Which tags appear in the current topic filter (to show only relevant pills)
  const availableTags = useMemo(() => {
    const base = topicFilter === "all" ? articles : articles.filter((a) => a.topic === topicFilter);
    const tagSet = new Set<ArticleTag>();
    for (const a of base) a.tags.forEach((t) => tagSet.add(t));
    return ALL_TAGS.filter((t) => tagSet.has(t));
  }, [articles, topicFilter]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter((a) => {
      if (topicFilter !== "all" && a.topic !== topicFilter) return false;
      if (activeTag && !a.tags.includes(activeTag)) return false;
      if (q) {
        const haystack = `${a.title} ${a.summary} ${a.source}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [articles, topicFilter, activeTag, search]);

  function handleTopicChange(t: Topic | "all") {
    setTopicFilter(t);
    setActiveTag(null);
    setDisplayCount(PAGE_SIZE);
  }

  function handleTagToggle(tag: ArticleTag) {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setDisplayCount(PAGE_SIZE);
  }

  function handleRefresh() {
    startTransition(() => router.refresh());
  }

  const visible = filtered.slice(0, displayCount);
  const hasMore = filtered.length > displayCount;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-border px-6 py-4">
        {/* Topic tabs + search + refresh */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-0.5">
            {TOPICS.map(({ key, label }) => {
              const count = topicCounts[key] ?? 0;
              const active = topicFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => handleTopicChange(key)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-px text-[10px] font-semibold",
                      active
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setDisplayCount(PAGE_SIZE);
                }}
                className="h-8 w-52 rounded-md border border-input bg-background pl-8 pr-7 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={isPending}
              className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", isPending && "animate-spin")} />
              {isPending ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </div>

        {/* Tag pills */}
        {availableTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-muted-foreground/60">Filter:</span>
            {availableTags.map((tag) => {
              const meta = TAG_META[tag];
              const active = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium transition-all",
                    active
                      ? meta.chip + " ring-1 ring-offset-1 ring-offset-background ring-current"
                      : "border border-border bg-background text-muted-foreground hover:border-border/80 hover:text-foreground"
                  )}
                >
                  {meta.label}
                </button>
              );
            })}
            {activeTag && (
              <button
                onClick={() => setActiveTag(null)}
                className="flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-muted-foreground"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {/* Source health */}
        <div className="mb-5">
          <SourceHealthStrip statuses={sourceStatuses} fetchedAt={fetchedAt} />
        </div>

        {/* Results count */}
        <p className="mb-4 text-xs text-muted-foreground">
          {filtered.length === 0
            ? "No articles match your filters"
            : `${filtered.length} article${filtered.length !== 1 ? "s" : ""}${
                filtered.length !== articles.length
                  ? ` · ${articles.length} total`
                  : ""
              }`}
        </p>

        {/* Article list */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No articles found</p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
              {visible.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setDisplayCount((c) => c + PAGE_SIZE)}
                  className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ChevronDown className="h-4 w-4" />
                  Load more ({filtered.length - displayCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
