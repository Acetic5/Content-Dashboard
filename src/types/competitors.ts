export type Platform =
  | "instagram"
  | "youtube"
  | "twitter"
  | "facebook"
  | "tiktok";

export type PostType =
  | "Photo"
  | "Carousel"
  | "Reel"
  | "Video"
  | "Story"
  | "Tweet"
  | "Short";

export interface FollowerPoint {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface CompetitorPost {
  id: string;
  caption: string;
  type: PostType;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
  postedAt: string; // YYYY-MM-DD
}

export interface SocialAccount {
  id: string;
  competitorId: string;
  platform: Platform;
  handle: string;
  followers: number;
  followersGrowth30d: number;
  followersGrowthPct30d: number;
  avgEngagementRate: number;
  postsPerWeek: number;
  lastPostedAt: string;
  followerHistory: FollowerPoint[];
  recentPosts: CompetitorPost[];
}

export interface Competitor {
  id: string;
  name: string;
  accounts: SocialAccount[];
  addedAt: string;
  notes?: string;
}

export type SortField =
  | "handle"
  | "platform"
  | "followers"
  | "followersGrowthPct30d"
  | "avgEngagementRate"
  | "postsPerWeek"
  | "lastPostedAt";

export type SortDir = "asc" | "desc";
