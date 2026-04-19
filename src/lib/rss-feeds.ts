import Parser from "rss-parser";

// ─── Core types ──────────────────────────────────────────────────────────────

export type Topic = "tools" | "research" | "business" | "design";

export type ArticleTag =
  | "image-gen"
  | "video-gen"
  | "workflows"
  | "ai-tools"
  | "industry"
  | "design";

export interface FeedSource {
  url: string;
  name: string;
  baseTopic: Topic;
  baseTags: ArticleTag[];
  color: string;
}

export interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceColor: string;
  topic: Topic;
  tags: ArticleTag[];
  summary: string;
  publishedAt: string; // ISO string
}

export interface SourceStatus {
  name: string;
  color: string;
  ok: boolean;
  count: number;
}

export interface FetchResult {
  articles: Article[];
  sourceStatuses: SourceStatus[];
  fetchedAt: string;
}

// ─── Display metadata ────────────────────────────────────────────────────────

export const TOPIC_META: Record<Topic, { label: string; chip: string }> = {
  tools:    { label: "Tools",    chip: "bg-blue-500/15 text-blue-300 border border-blue-500/25" },
  research: { label: "Research", chip: "bg-violet-500/15 text-violet-300 border border-violet-500/25" },
  business: { label: "Business", chip: "bg-amber-500/15 text-amber-300 border border-amber-500/25" },
  design:   { label: "Design",   chip: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25" },
};

export const TAG_META: Record<ArticleTag, { label: string; chip: string }> = {
  "image-gen": { label: "Image Gen",  chip: "bg-pink-500/15 text-pink-300 border border-pink-500/25" },
  "video-gen": { label: "Video Gen",  chip: "bg-orange-500/15 text-orange-300 border border-orange-500/25" },
  "workflows": { label: "Workflows",  chip: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25" },
  "ai-tools":  { label: "AI Tools",   chip: "bg-sky-500/15 text-sky-300 border border-sky-500/25" },
  "industry":  { label: "Industry",   chip: "bg-amber-500/15 text-amber-300 border border-amber-500/25" },
  "design":    { label: "Design",     chip: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25" },
};

// ─── Feed sources ────────────────────────────────────────────────────────────

export const FEED_SOURCES: FeedSource[] = [
  {
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    name: "TechCrunch",
    baseTopic: "business",
    baseTags: ["ai-tools", "industry"],
    color: "#3ecf8e",
  },
  {
    url: "https://venturebeat.com/category/ai/feed/",
    name: "VentureBeat",
    baseTopic: "business",
    baseTags: ["industry", "ai-tools"],
    color: "#e879a0",
  },
  {
    url: "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml",
    name: "The Verge",
    baseTopic: "business",
    baseTags: ["industry"],
    color: "#fa4d3b",
  },
  {
    url: "https://huggingface.co/blog/feed.xml",
    name: "Hugging Face",
    baseTopic: "research",
    baseTags: ["ai-tools", "workflows"],
    color: "#fbbf24",
  },
  {
    url: "https://feeds.arstechnica.com/arstechnica/technology-lab",
    name: "Ars Technica",
    baseTopic: "research",
    baseTags: ["ai-tools", "industry"],
    color: "#f97316",
  },
  {
    url: "https://simonwillison.net/atom/everything/",
    name: "Simon Willison",
    baseTopic: "research",
    baseTags: ["ai-tools", "workflows"],
    color: "#818cf8",
  },
  {
    url: "https://www.smashingmagazine.com/feed/",
    name: "Smashing Mag",
    baseTopic: "design",
    baseTags: ["design", "workflows"],
    color: "#ef4444",
  },
  {
    url: "https://www.artificialintelligence-news.com/feed/",
    name: "AI News",
    baseTopic: "business",
    baseTags: ["industry", "ai-tools"],
    color: "#38bdf8",
  },
];

// ─── Keyword-based tag detection ─────────────────────────────────────────────

const TAG_KEYWORDS: Record<ArticleTag, string[]> = {
  "image-gen": [
    "stable diffusion", "midjourney", "dall-e", "dall·e", "imagen",
    "flux model", "image generation", "text-to-image", "generative image",
    "ai image", "diffusion model", "adobe firefly", "image synthesis",
    "image model", "visual generation",
  ],
  "video-gen": [
    "sora", "runway ml", "runwayml", "video generation", "text-to-video",
    "ai video", "kling", "pika labs", "video ai", "gen-2", "gen-3",
    "video synthesis", "animatediff", "wan2.1", "video model",
    "video diffusion", "video editing ai",
  ],
  "workflows": [
    "n8n", "comfyui", "workflow", "automation pipeline", "agentic",
    "make.com", "zapier", "langchain", "langgraph", "orchestration",
    "agent workflow", "multi-agent", "autonomous agent", "ai agent",
    "tool use", "function calling",
  ],
  "ai-tools": [
    "gpt-4", "gpt-5", "claude 3", "claude 4", "gemini", "llama",
    "mistral", "chatgpt", "copilot", "language model", "llm",
    "model release", "open source model", "foundation model",
    "cursor ai", "replit", "api released", "new model",
  ],
  "industry": [
    "funding", " ipo", "acquisition", "acquired", "acqui-hire",
    "layoffs", "revenue", "valuation", "series a", "series b",
    "series c", "venture capital", "regulation", "policy", "antitrust",
    "partnership agreement", "merger", "invest",
  ],
  "design": [
    "figma", "adobe", "sketch app", "design system", "typography",
    " ux ", "ui design", "canva", "framer", "webflow",
    "design tool", "creative ai", "generative design", "design industry",
  ],
};

// ─── Helper functions ─────────────────────────────────────────────────────────

function detectTags(text: string, baseTags: ArticleTag[]): ArticleTag[] {
  const lower = text.toLowerCase();
  const found = new Set<ArticleTag>(baseTags);
  for (const [tag, kws] of Object.entries(TAG_KEYWORDS) as [ArticleTag, string[]][]) {
    if (kws.some((kw) => lower.includes(kw))) found.add(tag);
  }
  return Array.from(found);
}

function refineTopic(tags: ArticleTag[], base: Topic): Topic {
  if (tags.some((t) => t === "image-gen" || t === "video-gen" || t === "workflows")) return "tools";
  if (tags.includes("design") && !tags.includes("industry")) return "design";
  if (tags.includes("industry")) return "business";
  return base;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(str: string, max: number): string {
  if (!str || str.length <= max) return str;
  return str.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

// ─── Main fetch function ──────────────────────────────────────────────────────

export async function fetchAllArticles(): Promise<FetchResult> {
  const parser = new Parser({
    timeout: 8000,
    headers: {
      "User-Agent": "ContentHub/1.0 RSS Reader",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });

  const settled = await Promise.allSettled(
    FEED_SOURCES.map((src) => parser.parseURL(src.url))
  );

  const sourceStatuses: SourceStatus[] = [];
  const articleMap = new Map<string, Article>();

  for (let i = 0; i < settled.length; i++) {
    const src = FEED_SOURCES[i];
    const result = settled[i];

    if (result.status === "rejected") {
      sourceStatuses.push({ name: src.name, color: src.color, ok: false, count: 0 });
      continue;
    }

    const items = (result.value.items ?? []).slice(0, 12);
    let count = 0;

    for (const item of items) {
      const url = item.link ?? "";
      if (!url || articleMap.has(url)) continue;

      const rawText = [
        item.title ?? "",
        item.contentSnippet ?? "",
        stripHtml(item.content ?? item.summary ?? ""),
      ].join(" ");

      const tags = detectTags(rawText, src.baseTags);
      const topic = refineTopic(tags, src.baseTopic);
      const rawSnippet =
        item.contentSnippet ??
        stripHtml(item.content ?? item.summary ?? "");
      const summary = truncate(rawSnippet, 240);

      articleMap.set(url, {
        id: item.guid ?? url,
        title: (item.title ?? "Untitled").trim(),
        url,
        source: src.name,
        sourceColor: src.color,
        topic,
        tags,
        summary,
        publishedAt: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
      });
      count++;
    }

    sourceStatuses.push({ name: src.name, color: src.color, ok: true, count });
  }

  const articles = Array.from(articleMap.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return { articles, sourceStatuses, fetchedAt: new Date().toISOString() };
}
