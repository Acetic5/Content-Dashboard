import { Newspaper } from "lucide-react";
import { fetchAllArticles } from "@/lib/rss-feeds";
import { NewsFeed } from "@/components/news/NewsFeed";

// Revalidate every 30 minutes so ISR keeps the feed fresh
export const revalidate = 1800;

export default async function NewsPage() {
  const { articles, sourceStatuses, fetchedAt } = await fetchAllArticles();

  const liveSources = sourceStatuses.filter((s) => s.ok).length;
  const totalSources = sourceStatuses.length;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-border px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
            <Newspaper className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">News Consolidator</h1>
            <p className="text-xs text-muted-foreground">
              {articles.length} articles · {liveSources}/{totalSources} sources live
            </p>
          </div>
        </div>
      </div>

      {/* Interactive feed (client component) */}
      <NewsFeed
        articles={articles}
        sourceStatuses={sourceStatuses}
        fetchedAt={fetchedAt}
      />
    </div>
  );
}
