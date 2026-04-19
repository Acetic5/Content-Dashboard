"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ---------- Types & data ----------------------------------------------------
type Platform = "instagram" | "youtube" | "twitter" | "facebook";
type ContentStatus = "scheduled" | "published" | "draft";

interface CalendarPost {
  id: string;
  title: string;
  platform: Platform;
  status: ContentStatus;
  date: string; // YYYY-MM-DD
}

const PLATFORM_META: Record<
  Platform,
  { label: string; icon: React.ElementType; chip: string; dot: string }
> = {
  instagram: {
    label: "Instagram",
    icon: Instagram,
    chip: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    dot: "bg-pink-500",
  },
  youtube: {
    label: "YouTube",
    icon: Youtube,
    chip: "bg-red-500/20 text-red-300 border-red-500/30",
    dot: "bg-red-500",
  },
  twitter: {
    label: "Twitter / X",
    icon: Twitter,
    chip: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    dot: "bg-sky-500",
  },
  facebook: {
    label: "Facebook",
    icon: Facebook,
    chip: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    dot: "bg-blue-600",
  },
};

const CALENDAR_POSTS: CalendarPost[] = [
  { id: "c1", title: "Spring collection launch", platform: "instagram", status: "published", date: "2026-04-01" },
  { id: "c2", title: "Behind the scenes reel", platform: "instagram", status: "published", date: "2026-04-03" },
  { id: "c3", title: "Product review video", platform: "youtube", status: "published", date: "2026-04-05" },
  { id: "c4", title: "Community poll", platform: "twitter", status: "published", date: "2026-04-06" },
  { id: "c5", title: "Weekend giveaway", platform: "instagram", status: "published", date: "2026-04-08" },
  { id: "c6", title: "Tutorial: 3 styling tips", platform: "youtube", status: "published", date: "2026-04-10" },
  { id: "c7", title: "Founder story video", platform: "instagram", status: "published", date: "2026-04-12" },
  { id: "c8", title: "New arrivals post", platform: "facebook", status: "published", date: "2026-04-12" },
  { id: "c9", title: "Artisan partnership story", platform: "instagram", status: "published", date: "2026-04-15" },
  { id: "c10", title: "Weekly thread", platform: "twitter", status: "published", date: "2026-04-15" },
  { id: "c11", title: "Unboxing video", platform: "youtube", status: "published", date: "2026-04-17" },
  { id: "c12", title: "Product shoot BTS", platform: "instagram", status: "scheduled", date: "2026-04-22" },
  { id: "c13", title: "Feature highlight reel", platform: "youtube", status: "scheduled", date: "2026-04-23" },
  { id: "c14", title: "Spring collection carousel", platform: "instagram", status: "scheduled", date: "2026-04-24" },
  { id: "c15", title: "Community Q&A thread", platform: "twitter", status: "scheduled", date: "2026-04-25" },
  { id: "c16", title: "How-to guide video", platform: "youtube", status: "scheduled", date: "2026-04-26" },
  { id: "c17", title: "Styling tips reel", platform: "instagram", status: "scheduled", date: "2026-04-29" },
  { id: "c18", title: "May teaser post", platform: "facebook", status: "draft", date: "2026-04-30" },
  { id: "c19", title: "Collab announcement", platform: "instagram", status: "draft", date: "2026-05-05" },
  { id: "c20", title: "Monthly recap", platform: "youtube", status: "scheduled", date: "2026-05-01" },
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ALL_PLATFORMS: Platform[] = ["instagram", "youtube", "twitter", "facebook"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ---------- Page -------------------------------------------------------------
export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [activePlatforms, setActivePlatforms] = useState<Set<Platform>>(
    new Set(ALL_PLATFORMS)
  );

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthLabel = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

  function togglePlatform(p: Platform) {
    setActivePlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(p)) { if (next.size > 1) next.delete(p); }
      else next.add(p);
      return next;
    });
  }

  const postsByDate = useMemo(() => {
    const map: Record<string, CalendarPost[]> = {};
    CALENDAR_POSTS.filter((p) => activePlatforms.has(p.platform)).forEach((post) => {
      const key = post.date;
      if (!map[key]) map[key] = [];
      map[key].push(post);
    });
    return map;
  }, [activePlatforms]);

  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  // Grid: fill leading empty cells, then days, then trailing empties
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
            <CalendarDays className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Content Calendar</h1>
            <p className="text-xs text-muted-foreground">Plan & track your publishing schedule</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Platform filters */}
          {ALL_PLATFORMS.map((p) => {
            const meta = PLATFORM_META[p];
            const Icon = meta.icon;
            const active = activePlatforms.has(p);
            return (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  active ? meta.chip : "border-border text-muted-foreground opacity-50 hover:opacity-100"
                )}
              >
                <Icon className="h-3 w-3" />
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-border">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-sm font-semibold">{monthLabel}</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Day-of-week headers */}
        <div className="mb-1 grid grid-cols-7">
          {DAYS_OF_WEEK.map((d) => (
            <div key={d} className="py-1 text-center text-xs font-medium text-muted-foreground">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px rounded-lg overflow-hidden border border-border bg-border">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="min-h-[96px] bg-background/40 p-1" />;
            }
            const dateKey = toDateKey(year, month, day);
            const dayPosts = postsByDate[dateKey] ?? [];
            const isToday = dateKey === todayKey;

            return (
              <div
                key={dateKey}
                className={cn(
                  "min-h-[96px] bg-background p-1.5",
                  isToday && "bg-primary/5"
                )}
              >
                <div className="mb-1 flex items-center justify-end">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium",
                      isToday
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {day}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {dayPosts.slice(0, 3).map((post) => {
                    const meta = PLATFORM_META[post.platform];
                    return (
                      <div
                        key={post.id}
                        title={`${meta.label}: ${post.title}`}
                        className={cn(
                          "flex items-center gap-1 rounded px-1 py-0.5 text-[10px] leading-tight truncate border",
                          meta.chip,
                          post.status === "draft" && "opacity-60"
                        )}
                      >
                        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", meta.dot)} />
                        <span className="truncate">{post.title}</span>
                      </div>
                    );
                  })}
                  {dayPosts.length > 3 && (
                    <span className="px-1 text-[10px] text-muted-foreground">
                      +{dayPosts.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {ALL_PLATFORMS.filter((p) => activePlatforms.has(p)).map((p) => {
            const meta = PLATFORM_META[p];
            return (
              <div key={p} className="flex items-center gap-1.5">
                <span className={cn("h-2.5 w-2.5 rounded-sm", meta.dot)} />
                {meta.label}
              </div>
            );
          })}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm border border-border opacity-60" />
            Draft (dimmed)
          </div>
        </div>
      </div>
    </div>
  );
}
