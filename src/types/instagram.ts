export type PostStatus = "scheduled" | "draft" | "published" | "backlog";

export type PostType =
  | "photo"
  | "carousel"
  | "reel"
  | "story"
  | "video";

export interface InstagramPost {
  id: string;
  caption: string;
  type: PostType;
  status: PostStatus;
  scheduledDate?: string;
  publishedDate?: string;
  hashtags?: string;
  notes?: string;
  createdAt: string;
}
