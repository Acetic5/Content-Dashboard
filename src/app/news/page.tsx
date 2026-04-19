import { Newspaper, ExternalLink, Clock, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NEWS_ITEMS = [
  {
    id: "1",
    title: "Instagram Introduces New Scheduling Features for Creators",
    source: "Social Media Today",
    url: "#",
    category: "Platform Update",
    summary:
      "Instagram has rolled out an updated native scheduling interface allowing creators to schedule Reels, carousels, and stories up to 75 days in advance.",
    publishedAt: "2026-04-18",
    tags: ["Instagram", "Scheduling", "Creators"],
  },
  {
    id: "2",
    title: "Short-Form Video Dominates 2026 Content Strategy Reports",
    source: "Content Marketing Institute",
    url: "#",
    category: "Industry Trend",
    summary:
      "New research shows that 87% of brands plan to increase Reels and TikTok production in 2026 as short-form continues to outperform static content on engagement metrics.",
    publishedAt: "2026-04-17",
    tags: ["Reels", "Video", "Strategy"],
  },
  {
    id: "3",
    title: "Engagement Rates Decline Industry-Wide — What It Means for Brands",
    source: "Sprout Social",
    url: "#",
    category: "Analytics",
    summary:
      "Average engagement rates across Instagram have dropped 11% YoY. Experts attribute this to algorithm shifts favouring paid distribution and Explore tab changes.",
    publishedAt: "2026-04-16",
    tags: ["Analytics", "Engagement", "Algorithm"],
  },
  {
    id: "4",
    title: "The Rise of Micro-Influencer Partnerships in Fashion",
    source: "Vogue Business",
    url: "#",
    category: "Partnerships",
    summary:
      "Fashion brands are shifting budgets from mega-influencers to micro-influencer campaigns, reporting 3x higher conversion rates and more authentic audience responses.",
    publishedAt: "2026-04-15",
    tags: ["Influencers", "Fashion", "Partnerships"],
  },
  {
    id: "5",
    title: "AI Content Tools Are Reshaping Social Media Workflows",
    source: "TechCrunch",
    url: "#",
    category: "Technology",
    summary:
      "From caption generation to image enhancement, AI-powered tools are being adopted by over 60% of social media managers surveyed in the latest State of Social report.",
    publishedAt: "2026-04-14",
    tags: ["AI", "Tools", "Productivity"],
  },
  {
    id: "6",
    title: "YouTube Shorts Expands Monetisation to All Eligible Creators",
    source: "YouTube Blog",
    url: "#",
    category: "Platform Update",
    summary:
      "YouTube has opened its Shorts monetisation program globally, lowering the subscriber threshold to 500 and enabling ad revenue sharing for qualifying short-form videos.",
    publishedAt: "2026-04-13",
    tags: ["YouTube", "Monetisation", "Shorts"],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Platform Update": "info",
  "Industry Trend": "success",
  "Analytics": "warning",
  "Partnerships": "secondary",
  "Technology": "default",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
            <Newspaper className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">News Consolidator</h1>
            <p className="text-xs text-muted-foreground">Industry news & platform updates</p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {NEWS_ITEMS.length} articles
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col gap-3">
          {NEWS_ITEMS.map((item) => (
            <Card key={item.id} className="transition-colors hover:border-border/80">
              <CardContent className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge
                        variant={(CATEGORY_COLORS[item.category] ?? "outline") as Parameters<typeof Badge>[0]["variant"]}
                        className="text-[10px]"
                      >
                        {item.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(item.publishedAt)}
                      </span>
                      <span className="text-xs text-muted-foreground">· {item.source}</span>
                    </div>

                    <h3 className="text-sm font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {item.summary}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={item.url}
                    className="flex shrink-0 items-center gap-1 self-start rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground"
                  >
                    Read
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-dashed border-border p-8 text-center">
          <Newspaper className="mx-auto h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">Connect RSS feeds</p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Add custom RSS feeds or newsletters to auto-populate this page with fresh content.
          </p>
        </div>
      </div>
    </div>
  );
}
