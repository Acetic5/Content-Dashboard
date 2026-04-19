"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, Eye, Heart, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ---------- Mock data -------------------------------------------------------
const DAILY_DATA = [
  { date: "Apr 1", impressions: 4200, engagement: 3.2, followers: 12400 },
  { date: "Apr 2", impressions: 3800, engagement: 2.9, followers: 12430 },
  { date: "Apr 3", impressions: 5100, engagement: 4.1, followers: 12490 },
  { date: "Apr 4", impressions: 4700, engagement: 3.7, followers: 12510 },
  { date: "Apr 5", impressions: 6200, engagement: 5.2, followers: 12580 },
  { date: "Apr 6", impressions: 5800, engagement: 4.8, followers: 12620 },
  { date: "Apr 7", impressions: 7100, engagement: 6.0, followers: 12700 },
  { date: "Apr 8", impressions: 6400, engagement: 5.5, followers: 12740 },
  { date: "Apr 9", impressions: 5900, engagement: 4.9, followers: 12780 },
  { date: "Apr 10", impressions: 8200, engagement: 7.1, followers: 12870 },
  { date: "Apr 11", impressions: 7600, engagement: 6.4, followers: 12920 },
  { date: "Apr 12", impressions: 9100, engagement: 8.0, followers: 13050 },
  { date: "Apr 13", impressions: 8700, engagement: 7.5, followers: 13100 },
  { date: "Apr 14", impressions: 7300, engagement: 6.1, followers: 13140 },
  { date: "Apr 15", impressions: 10200, engagement: 9.2, followers: 13280 },
  { date: "Apr 16", impressions: 9500, engagement: 8.6, followers: 13340 },
  { date: "Apr 17", impressions: 8800, engagement: 7.8, followers: 13390 },
  { date: "Apr 18", impressions: 11000, engagement: 9.8, followers: 13500 },
  { date: "Apr 19", impressions: 10400, engagement: 9.1, followers: 13560 },
];

const TOP_POSTS = [
  {
    id: "1",
    caption: "Our founder shares the story behind the brand. 5 years, countless lessons, one vision.",
    type: "Video",
    impressions: 18400,
    engagementRate: 12.4,
    likes: 1820,
    date: "Apr 15",
  },
  {
    id: "2",
    caption: "New arrivals are here! The summer drop you've been waiting for is finally live. 🌊☀️",
    type: "Photo",
    impressions: 14200,
    engagementRate: 9.7,
    likes: 1380,
    date: "Apr 12",
  },
  {
    id: "3",
    caption: "How we give back — our partnership with local artisans in Vietnam.",
    type: "Carousel",
    impressions: 11800,
    engagementRate: 8.2,
    likes: 970,
    date: "Apr 10",
  },
  {
    id: "4",
    caption: "Quick tip Tuesday: How to style one piece three different ways.",
    type: "Reel",
    impressions: 9600,
    engagementRate: 7.5,
    likes: 720,
    date: "Apr 8",
  },
];

const DATE_RANGES = [
  { label: "7d", days: 7 },
  { label: "14d", days: 14 },
  { label: "30d", days: 30 },
];

// ---------- Custom tooltip ---------------------------------------------------
function ChartTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
          <span className="capitalize text-muted-foreground">{entry.name}:</span>
          <span className="font-medium text-foreground">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ---------- Stat Card --------------------------------------------------------
function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  delta: number;
  deltaLabel: string;
  icon: React.ElementType;
  color: string;
}) {
  const positive = delta >= 0;
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", color)}>
            <Icon className="h-4 w-4" />
          </div>
          <Badge
            variant={positive ? "success" : "destructive"}
            className="gap-1 text-xs"
          >
            {positive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(delta)}%
          </Badge>
        </div>
        <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground/60">{deltaLabel}</p>
      </CardContent>
    </Card>
  );
}

// ---------- Page -------------------------------------------------------------
export default function AnalyticsPage() {
  const [range, setRange] = useState(14);
  const [startDate, setStartDate] = useState("2026-04-01");
  const [endDate, setEndDate] = useState("2026-04-19");

  const filtered = useMemo(() => DAILY_DATA.slice(-range), [range]);

  const totalImpressions = filtered.reduce((s, d) => s + d.impressions, 0);
  const avgEngagement = (filtered.reduce((s, d) => s + d.engagement, 0) / filtered.length).toFixed(1);
  const followerStart = filtered[0]?.followers ?? 0;
  const followerEnd = filtered[filtered.length - 1]?.followers ?? 0;
  const followerGrowth = followerEnd - followerStart;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
            <BarChart3 className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Analytics</h1>
            <p className="text-xs text-muted-foreground">Connected via Metricool</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Date range presets */}
          <div className="flex rounded-md border border-border overflow-hidden">
            {DATE_RANGES.map((r) => (
              <button
                key={r.label}
                onClick={() => setRange(r.days)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  range === r.days
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Custom date pickers */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <span className="text-xs text-muted-foreground">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Impressions"
            value={totalImpressions.toLocaleString()}
            delta={14.2}
            deltaLabel="vs previous period"
            icon={Eye}
            color="bg-blue-500/10 text-blue-400"
          />
          <StatCard
            label="Avg Engagement Rate"
            value={`${avgEngagement}%`}
            delta={2.1}
            deltaLabel="vs previous period"
            icon={Heart}
            color="bg-pink-500/10 text-pink-400"
          />
          <StatCard
            label="Follower Growth"
            value={`+${followerGrowth.toLocaleString()}`}
            delta={8.5}
            deltaLabel="net new followers"
            icon={Users}
            color="bg-emerald-500/10 text-emerald-400"
          />
          <StatCard
            label="Total Followers"
            value={followerEnd.toLocaleString()}
            delta={1.1}
            deltaLabel="current total"
            icon={Users}
            color="bg-violet-500/10 text-violet-400"
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Daily Impressions</CardTitle>
              <CardDescription className="text-xs">Total content views per day</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={filtered} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    interval={Math.floor(filtered.length / 6)}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--accent))" }} />
                  <Bar dataKey="impressions" fill="hsl(217 91% 60%)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Engagement Rate</CardTitle>
              <CardDescription className="text-xs">Engagement % over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={filtered} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    interval={Math.floor(filtered.length / 6)}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="hsl(330 86% 68%)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "hsl(330 86% 68%)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Follower growth line chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Follower Growth</CardTitle>
            <CardDescription className="text-xs">Cumulative followers over the selected period</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={filtered} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  interval={Math.floor(filtered.length / 6)}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                  domain={["dataMin - 200", "dataMax + 200"]}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="followers"
                  stroke="hsl(142 71% 45%)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "hsl(142 71% 45%)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Posts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Top Performing Posts</CardTitle>
            <CardDescription className="text-xs">Highest impressions in the selected period</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y divide-border">
              {TOP_POSTS.map((post, i) => (
                <div key={post.id} className="flex items-center gap-4 py-3">
                  <span className="w-5 shrink-0 text-center text-xs font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-foreground">{post.caption}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">{post.type}</Badge>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {post.impressions.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{post.engagementRate}% eng.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
