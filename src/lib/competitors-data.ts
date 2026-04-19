import type { Competitor, SocialAccount, FollowerPoint, CompetitorPost } from "@/types/competitors";

// Generates 30 daily data points around a start value with a given drift
function makeHistory(start: number, dailyDrift: number, days = 30): FollowerPoint[] {
  const points: FollowerPoint[] = [];
  let val = start;
  for (let i = days; i >= 0; i--) {
    const d = new Date("2026-04-19");
    d.setDate(d.getDate() - i);
    val += dailyDrift + Math.floor((Math.random() - 0.45) * Math.abs(dailyDrift) * 4);
    points.push({ date: d.toISOString().slice(0, 10), count: Math.max(0, val) });
  }
  return points;
}

const IG_RIVAL_POSTS: CompetitorPost[] = [
  { id: "r1p1", caption: "Summer lookbook drop 🌊 — 12 pieces, all under $80. Link in bio.", type: "Carousel", likes: 3820, comments: 214, shares: 187, engagementRate: 7.9, postedAt: "2026-04-17" },
  { id: "r1p2", caption: "Behind every great outfit is a great morning routine. BTS reel now live.", type: "Reel", likes: 5140, comments: 302, shares: 419, engagementRate: 11.2, postedAt: "2026-04-14" },
  { id: "r1p3", caption: "We partnered with @stylist_x for an exclusive capsule. Tag a friend who needs this.", type: "Photo", likes: 2970, comments: 168, shares: 95, engagementRate: 6.3, postedAt: "2026-04-11" },
  { id: "r1p4", caption: "New colorways just landed for the Minimal Series. Which is your favourite?", type: "Carousel", likes: 2350, comments: 430, shares: 62, engagementRate: 5.9, postedAt: "2026-04-08" },
  { id: "r1p5", caption: "Sustainability update: 100% recycled packaging starting May 1st.", type: "Photo", likes: 1890, comments: 97, shares: 213, engagementRate: 4.6, postedAt: "2026-04-05" },
];

const YT_RIVAL_POSTS: CompetitorPost[] = [
  { id: "r1y1", caption: "I tested 30 minimalist brands so you don't have to — honest tier list", type: "Video", likes: 8420, comments: 634, shares: 1102, engagementRate: 9.4, postedAt: "2026-04-16" },
  { id: "r1y2", caption: "What $500 gets you in 2026: sustainable fashion haul & review", type: "Video", likes: 6100, comments: 481, shares: 734, engagementRate: 7.8, postedAt: "2026-04-09" },
  { id: "r1y3", caption: "Capsule wardrobe for spring — 10 pieces, 30 outfits", type: "Video", likes: 11240, comments: 892, shares: 2100, engagementRate: 13.1, postedAt: "2026-04-02" },
];

const IG_COMP_POSTS: CompetitorPost[] = [
  { id: "c2p1", caption: "Flash sale: 40% off everything this weekend only ⚡", type: "Photo", likes: 1240, comments: 58, shares: 34, engagementRate: 4.2, postedAt: "2026-04-18" },
  { id: "c2p2", caption: "Tutorial: how to style our best-selling blazer 3 ways", type: "Reel", likes: 2180, comments: 119, shares: 88, engagementRate: 7.3, postedAt: "2026-04-15" },
  { id: "c2p3", caption: "New arrivals are here. Shop the full collection at the link.", type: "Carousel", likes: 890, comments: 43, shares: 19, engagementRate: 3.0, postedAt: "2026-04-12" },
  { id: "c2p4", caption: "Customer of the month spotlight: Sarah, NYC 🗽", type: "Photo", likes: 1560, comments: 88, shares: 41, engagementRate: 5.3, postedAt: "2026-04-09" },
];

const TW_COMP_POSTS: CompetitorPost[] = [
  { id: "c2t1", caption: "Poll: what's your go-to casual Friday fit? 🧵", type: "Tweet", likes: 312, comments: 78, shares: 45, engagementRate: 5.1, postedAt: "2026-04-18" },
  { id: "c2t2", caption: "Thread: 10 styling mistakes everyone makes (and how to fix them)", type: "Tweet", likes: 2840, comments: 301, shares: 1200, engagementRate: 12.4, postedAt: "2026-04-15" },
  { id: "c2t3", caption: "Spring collection is live. Retweet for a chance to win a $200 gift card.", type: "Tweet", likes: 540, comments: 134, shares: 892, engagementRate: 8.7, postedAt: "2026-04-10" },
];

const FB_COMP_POSTS: CompetitorPost[] = [
  { id: "c2f1", caption: "Easter sale starts now — use code SPRING25 for 25% off sitewide!", type: "Photo", likes: 420, comments: 61, shares: 88, engagementRate: 3.4, postedAt: "2026-04-17" },
  { id: "c2f2", caption: "Introducing our new loyalty program. Sign up to earn points on every purchase.", type: "Video", likes: 310, comments: 44, shares: 57, engagementRate: 2.6, postedAt: "2026-04-11" },
];

const IG_INDUSTRY_POSTS: CompetitorPost[] = [
  { id: "i3p1", caption: "The 2026 trend report is here. 42 pages of what's coming next season.", type: "Carousel", likes: 9820, comments: 504, shares: 1830, engagementRate: 8.7, postedAt: "2026-04-19" },
  { id: "i3p2", caption: "Episode 88 of the Style Forward podcast drops tomorrow. Subscribe now.", type: "Reel", likes: 4120, comments: 209, shares: 614, engagementRate: 3.7, postedAt: "2026-04-16" },
  { id: "i3p3", caption: "My take on why fast fashion is making a comeback — and why that's complicated.", type: "Video", likes: 7340, comments: 1102, shares: 2200, engagementRate: 6.5, postedAt: "2026-04-13" },
  { id: "i3p4", caption: "The future of retail: what 2027 looks like for independent brands.", type: "Carousel", likes: 5610, comments: 387, shares: 920, engagementRate: 5.0, postedAt: "2026-04-10" },
  { id: "i3p5", caption: "Brand collab announcement — details drop Friday 🤐", type: "Photo", likes: 12400, comments: 1840, shares: 3100, engagementRate: 11.0, postedAt: "2026-04-07" },
];

const YT_INDUSTRY_POSTS: CompetitorPost[] = [
  { id: "i3y1", caption: "Deep dive: is sustainable fashion actually sustainable?", type: "Video", likes: 24800, comments: 2140, shares: 4900, engagementRate: 10.2, postedAt: "2026-04-17" },
  { id: "i3y2", caption: "I spent a week wearing only 5 items — here's what I learned", type: "Video", likes: 18200, comments: 1620, shares: 3400, engagementRate: 8.4, postedAt: "2026-04-10" },
  { id: "i3y3", caption: "Shorts: one styling trick that changes everything", type: "Short", likes: 41000, comments: 880, shares: 7200, engagementRate: 14.3, postedAt: "2026-04-07" },
];

const TK_INDUSTRY_POSTS: CompetitorPost[] = [
  { id: "i3tk1", caption: "POV: you finally found your aesthetic #StyleForward #Fashion2026", type: "Video", likes: 88400, comments: 3210, shares: 14200, engagementRate: 15.2, postedAt: "2026-04-18" },
  { id: "i3tk2", caption: "Brand reveal 👀 #NewDrop #FashionTok", type: "Video", likes: 124000, comments: 6800, shares: 22400, engagementRate: 19.8, postedAt: "2026-04-14" },
];

const IG_NIMBLE_POSTS: CompetitorPost[] = [
  { id: "n4p1", caption: "User-generated content hits different when it's THIS good 🔥 #community", type: "Reel", likes: 1820, comments: 214, shares: 390, engagementRate: 18.8, postedAt: "2026-04-19" },
  { id: "n4p2", caption: "We did the viral trend and honestly… we loved it 😂 #FashionChallenge", type: "Reel", likes: 2340, comments: 301, shares: 580, engagementRate: 24.1, postedAt: "2026-04-17" },
  { id: "n4p3", caption: "DM us 'DRIP' to get early access to the next drop 👀", type: "Photo", likes: 980, comments: 642, shares: 102, engagementRate: 17.7, postedAt: "2026-04-15" },
  { id: "n4p4", caption: "Street style meets comfort. New drop this Friday 🙌", type: "Carousel", likes: 760, comments: 119, shares: 88, engagementRate: 9.8, postedAt: "2026-04-12" },
];

const TK_NIMBLE_POSTS: CompetitorPost[] = [
  { id: "n4tk1", caption: "we spent $50 on an outfit and this is what happened 😮‍💨 #OutfitChallenge", type: "Video", likes: 186000, comments: 9200, shares: 32000, engagementRate: 28.4, postedAt: "2026-04-18" },
  { id: "n4tk2", caption: "replying to @user nobody expected THIS from a small brand #FashionTok", type: "Video", likes: 94000, comments: 5100, shares: 18000, engagementRate: 21.3, postedAt: "2026-04-15" },
  { id: "n4tk3", caption: "day in the life of a small fashion brand founder 🧵", type: "Video", likes: 61000, comments: 3400, shares: 9800, engagementRate: 17.8, postedAt: "2026-04-12" },
];

// Build seed accounts
function makeAccount(
  overrides: Partial<SocialAccount> & Pick<SocialAccount, "id" | "competitorId" | "platform" | "handle" | "followers" | "followersGrowth30d" | "followersGrowthPct30d" | "avgEngagementRate" | "postsPerWeek" | "lastPostedAt" | "recentPosts">
): SocialAccount {
  const { followers, followersGrowth30d } = overrides;
  const dailyDrift = Math.round(followersGrowth30d! / 30);
  const startVal = followers! - followersGrowth30d!;
  return {
    followerHistory: makeHistory(startVal, dailyDrift),
    ...overrides,
  };
}

export const SEED_COMPETITORS: Competitor[] = [
  {
    id: "comp-1",
    name: "Brand Rival One",
    addedAt: "2026-03-01",
    notes: "Strong reel strategy — high UGC volume. Main direct competitor in the 25-34 demo.",
    accounts: [
      makeAccount({ id: "acc-1a", competitorId: "comp-1", platform: "instagram", handle: "@brandrivalone", followers: 48200, followersGrowth30d: 1240, followersGrowthPct30d: 2.6, avgEngagementRate: 7.9, postsPerWeek: 5, lastPostedAt: "2026-04-17", recentPosts: IG_RIVAL_POSTS }),
      makeAccount({ id: "acc-1b", competitorId: "comp-1", platform: "youtube", handle: "BrandRivalOne", followers: 12100, followersGrowth30d: 880, followersGrowthPct30d: 7.8, avgEngagementRate: 10.1, postsPerWeek: 1, lastPostedAt: "2026-04-16", recentPosts: YT_RIVAL_POSTS }),
    ],
  },
  {
    id: "comp-2",
    name: "Competitor Brand",
    addedAt: "2026-03-05",
    notes: "Primarily promotion-focused. Lower organic reach but high discount-driven conversion.",
    accounts: [
      makeAccount({ id: "acc-2a", competitorId: "comp-2", platform: "instagram", handle: "@competitorbrand", followers: 31500, followersGrowth30d: -320, followersGrowthPct30d: -1.0, avgEngagementRate: 4.8, postsPerWeek: 3, lastPostedAt: "2026-04-18", recentPosts: IG_COMP_POSTS }),
      makeAccount({ id: "acc-2b", competitorId: "comp-2", platform: "twitter", handle: "@compbrand_x", followers: 8400, followersGrowth30d: 210, followersGrowthPct30d: 2.6, avgEngagementRate: 7.2, postsPerWeek: 7, lastPostedAt: "2026-04-18", recentPosts: TW_COMP_POSTS }),
      makeAccount({ id: "acc-2c", competitorId: "comp-2", platform: "facebook", handle: "CompetitorBrandOfficial", followers: 22100, followersGrowth30d: -180, followersGrowthPct30d: -0.8, avgEngagementRate: 2.9, postsPerWeek: 2, lastPostedAt: "2026-04-17", recentPosts: FB_COMP_POSTS }),
    ],
  },
  {
    id: "comp-3",
    name: "Industry Player",
    addedAt: "2026-02-20",
    notes: "Large following but engagement is declining. Strong long-form content. Monitor algorithm adaptations.",
    accounts: [
      makeAccount({ id: "acc-3a", competitorId: "comp-3", platform: "instagram", handle: "@industryplayer", followers: 112800, followersGrowth30d: 1890, followersGrowthPct30d: 1.7, avgEngagementRate: 3.2, postsPerWeek: 7, lastPostedAt: "2026-04-19", recentPosts: IG_INDUSTRY_POSTS }),
      makeAccount({ id: "acc-3b", competitorId: "comp-3", platform: "youtube", handle: "StyleForwardOfficial", followers: 89400, followersGrowth30d: 4200, followersGrowthPct30d: 4.9, avgEngagementRate: 11.0, postsPerWeek: 2, lastPostedAt: "2026-04-17", recentPosts: YT_INDUSTRY_POSTS }),
      makeAccount({ id: "acc-3c", competitorId: "comp-3", platform: "tiktok", handle: "@styleforwardtv", followers: 231000, followersGrowth30d: 18400, followersGrowthPct30d: 8.6, avgEngagementRate: 17.5, postsPerWeek: 10, lastPostedAt: "2026-04-18", recentPosts: TK_INDUSTRY_POSTS }),
    ],
  },
  {
    id: "comp-4",
    name: "Nimble Upstart",
    addedAt: "2026-04-01",
    notes: "Tiny following but stratospheric engagement. TikTok-first brand — monitor viral potential closely.",
    accounts: [
      makeAccount({ id: "acc-4a", competitorId: "comp-4", platform: "instagram", handle: "@nimbleupstart", followers: 9700, followersGrowth30d: 1840, followersGrowthPct30d: 23.4, avgEngagementRate: 17.6, postsPerWeek: 9, lastPostedAt: "2026-04-19", recentPosts: IG_NIMBLE_POSTS }),
      makeAccount({ id: "acc-4b", competitorId: "comp-4", platform: "tiktok", handle: "@nimbleupstart", followers: 41200, followersGrowth30d: 12800, followersGrowthPct30d: 45.1, avgEngagementRate: 22.5, postsPerWeek: 14, lastPostedAt: "2026-04-18", recentPosts: TK_NIMBLE_POSTS }),
    ],
  },
];

// Generates plausible-looking mock data for newly added accounts
export function generateMockAccount(
  competitorId: string,
  platform: string,
  handle: string
): SocialAccount {
  const followers = Math.floor(Math.random() * 80000) + 5000;
  const growthPct = parseFloat((Math.random() * 6 - 1).toFixed(1));
  const growth = Math.round((growthPct / 100) * followers);
  const engagement = parseFloat((Math.random() * 8 + 1).toFixed(1));
  const freq = Math.floor(Math.random() * 8) + 1;

  const today = new Date("2026-04-19");
  const lastPosted = new Date(today);
  lastPosted.setDate(today.getDate() - Math.floor(Math.random() * 5));

  return makeAccount({
    id: `acc-${Date.now()}`,
    competitorId,
    platform: platform as SocialAccount["platform"],
    handle,
    followers,
    followersGrowth30d: growth,
    followersGrowthPct30d: growthPct,
    avgEngagementRate: engagement,
    postsPerWeek: freq,
    lastPostedAt: lastPosted.toISOString().slice(0, 10),
    recentPosts: [
      {
        id: `mock-p1-${Date.now()}`,
        caption: "Latest content drop — check our profile for more.",
        type: "Photo",
        likes: Math.floor(followers * engagement * 0.008),
        comments: Math.floor(followers * 0.003),
        shares: Math.floor(followers * 0.002),
        engagementRate: engagement,
        postedAt: lastPosted.toISOString().slice(0, 10),
      },
    ],
  });
}
