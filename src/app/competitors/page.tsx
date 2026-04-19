import { Swords, TrendingUp, Users, Eye, Heart, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const COMPETITORS = [
  {
    id: "1",
    handle: "@brandrivalone",
    name: "Brand Rival One",
    followers: "48.2K",
    followersRaw: 48200,
    avgEngagement: "6.4%",
    postsPerWeek: 5,
    recentContent: ["New summer lookbook", "Behind-the-scenes reel", "Collab with @stylist_x"],
    platform: "Instagram",
    trend: "up",
    notes: "Strong reel strategy, high UGC volume",
  },
  {
    id: "2",
    handle: "@competitorbrand",
    name: "Competitor Brand",
    followers: "31.5K",
    followersRaw: 31500,
    avgEngagement: "4.1%",
    postsPerWeek: 3,
    recentContent: ["Product drop announcement", "Discount flash sale", "Tutorial video"],
    platform: "Instagram",
    trend: "stable",
    notes: "Primarily promotion-focused, lower organic reach",
  },
  {
    id: "3",
    handle: "@industryplayer",
    name: "Industry Player",
    followers: "112.8K",
    followersRaw: 112800,
    avgEngagement: "3.2%",
    postsPerWeek: 7,
    recentContent: ["Trend forecast post", "Podcast episode snippet", "Leadership thought piece"],
    platform: "Instagram",
    trend: "up",
    notes: "Large following but declining engagement per post",
  },
  {
    id: "4",
    handle: "@nimbleupstart",
    name: "Nimble Upstart",
    followers: "9.7K",
    followersRaw: 9700,
    avgEngagement: "9.8%",
    postsPerWeek: 9,
    recentContent: ["User story spotlight", "Meme-style content", "Viral challenge response"],
    platform: "Instagram",
    trend: "up",
    notes: "Very high engagement for size — monitor closely",
  },
];

export default function CompetitorsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
            <Swords className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Competitor Tracker</h1>
            <p className="text-xs text-muted-foreground">Monitor competitor content strategies</p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {COMPETITORS.length} competitors tracked
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {COMPETITORS.map((c) => (
            <Card key={c.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{c.name}</CardTitle>
                    <CardDescription className="mt-0.5 flex items-center gap-1.5 text-xs">
                      <span className="text-primary">{c.handle}</span>
                      <span>·</span>
                      <span>{c.platform}</span>
                    </CardDescription>
                  </div>
                  <Badge
                    variant={c.trend === "up" ? "success" : "outline"}
                    className="shrink-0 gap-1 text-xs"
                  >
                    {c.trend === "up" && <TrendingUp className="h-3 w-3" />}
                    {c.trend === "up" ? "Growing" : "Stable"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4 pt-0">
                {/* Stats row */}
                <div className="grid grid-cols-3 divide-x divide-border rounded-lg border border-border">
                  <div className="flex flex-col items-center p-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      Followers
                    </div>
                    <p className="mt-1 text-sm font-semibold">{c.followers}</p>
                  </div>
                  <div className="flex flex-col items-center p-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="h-3 w-3" />
                      Engagement
                    </div>
                    <p className="mt-1 text-sm font-semibold">{c.avgEngagement}</p>
                  </div>
                  <div className="flex flex-col items-center p-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      Posts/wk
                    </div>
                    <p className="mt-1 text-sm font-semibold">{c.postsPerWeek}</p>
                  </div>
                </div>

                {/* Recent content */}
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Recent Content
                  </p>
                  <ul className="space-y-1">
                    {c.recentContent.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-foreground">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notes */}
                <div className="mt-auto rounded-md bg-muted/40 px-3 py-2">
                  <p className="text-xs italic text-muted-foreground">{c.notes}</p>
                </div>

                <div className="flex justify-end">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                    View Profile <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-dashed border-border p-8 text-center">
          <Swords className="mx-auto h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">Add more competitors</p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Connect your Metricool account to auto-import competitor data and analytics.
          </p>
        </div>
      </div>
    </div>
  );
}
