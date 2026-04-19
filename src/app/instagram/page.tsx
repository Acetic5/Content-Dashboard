"use client";

import { useState } from "react";
import { Plus, Instagram, Image, Film, RefreshCw, Layers, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SEED_POSTS } from "@/lib/instagram-data";
import type { InstagramPost, PostStatus, PostType } from "@/types/instagram";

const STATUS_TABS: { key: PostStatus; label: string; color: string }[] = [
  { key: "scheduled", label: "Scheduled", color: "text-blue-400" },
  { key: "draft", label: "Drafts", color: "text-amber-400" },
  { key: "published", label: "Published", color: "text-emerald-400" },
  { key: "backlog", label: "Backlog", color: "text-muted-foreground" },
];

const POST_TYPE_ICONS: Record<PostType, React.ElementType> = {
  photo: Image,
  carousel: Layers,
  reel: Film,
  story: RefreshCw,
  video: Video,
};

const POST_TYPE_COLORS: Record<PostType, string> = {
  photo: "text-pink-400",
  carousel: "text-purple-400",
  reel: "text-blue-400",
  story: "text-amber-400",
  video: "text-emerald-400",
};

function statusBadgeVariant(status: PostStatus) {
  return status === "published"
    ? "success"
    : status === "scheduled"
    ? "info"
    : status === "draft"
    ? "warning"
    : "outline";
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const EMPTY_FORM = {
  caption: "",
  type: "photo" as PostType,
  status: "draft" as PostStatus,
  scheduledDate: "",
  hashtags: "",
  notes: "",
};

export default function InstagramPage() {
  const [posts, setPosts] = useState<InstagramPost[]>(SEED_POSTS);
  const [activeTab, setActiveTab] = useState<PostStatus>("scheduled");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const visiblePosts = posts.filter((p) => p.status === activeTab);

  function handleAdd() {
    if (!form.caption.trim()) return;
    const newPost: InstagramPost = {
      id: Date.now().toString(),
      caption: form.caption,
      type: form.type,
      status: form.status,
      scheduledDate: form.scheduledDate || undefined,
      hashtags: form.hashtags || undefined,
      notes: form.notes || undefined,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
    setForm({ ...EMPTY_FORM });
    setDialogOpen(false);
    setActiveTab(form.status);
  }

  function handleDelete(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/10">
            <Instagram className="h-5 w-5 text-pink-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Instagram Manager</h1>
            <p className="text-xs text-muted-foreground">{posts.length} posts total</p>
          </div>
        </div>
        <Button onClick={() => setDialogOpen(true)} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 border-b border-border px-8 pt-2">
        {STATUS_TABS.map((tab) => {
          const count = posts.filter((p) => p.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? `border-primary ${tab.color}`
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-xs font-medium",
                  activeTab === tab.key
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Posts Grid */}
      <div className="flex-1 overflow-y-auto p-8">
        {visiblePosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Instagram className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No posts here yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add a new post and set its status to &quot;{STATUS_TABS.find((t) => t.key === activeTab)?.label}&quot;
            </p>
            <Button
              onClick={() => setDialogOpen(true)}
              variant="outline"
              size="sm"
              className="mt-4 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Post
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map((post) => {
              const TypeIcon = POST_TYPE_ICONS[post.type];
              return (
                <Card key={post.id} className="flex flex-col transition-colors hover:border-border/80">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <TypeIcon
                          className={cn("h-4 w-4 shrink-0", POST_TYPE_COLORS[post.type])}
                        />
                        <span className="text-xs font-medium capitalize text-muted-foreground">
                          {post.type}
                        </span>
                      </div>
                      <Badge variant={statusBadgeVariant(post.status)} className="capitalize shrink-0">
                        {post.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col gap-3 pt-0">
                    <p className="line-clamp-3 text-sm leading-relaxed text-foreground">
                      {post.caption}
                    </p>

                    {post.hashtags && (
                      <p className="line-clamp-1 text-xs text-primary/70">
                        {post.hashtags}
                      </p>
                    )}

                    {post.notes && (
                      <>
                        <Separator />
                        <p className="text-xs italic text-muted-foreground">
                          {post.notes}
                        </p>
                      </>
                    )}

                    <div className="mt-auto flex flex-col gap-1.5 pt-1">
                      {post.scheduledDate && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-muted-foreground">Scheduled:</span>
                          <span className="text-xs font-medium text-blue-400">
                            {formatDate(post.scheduledDate)}
                          </span>
                        </div>
                      )}
                      {post.publishedDate && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-muted-foreground">Published:</span>
                          <span className="text-xs font-medium text-emerald-400">
                            {formatDate(post.publishedDate)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-end pt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Post Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Post Idea</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                placeholder="Write your caption here..."
                rows={4}
                value={form.caption}
                onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label>Post Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm((f) => ({ ...f, type: v as PostType }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="reel">Reel</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1.5">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm((f) => ({ ...f, status: v as PostStatus }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="backlog">Backlog</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(form.status === "scheduled" || form.status === "published") && (
              <div className="grid gap-1.5">
                <Label htmlFor="date">
                  {form.status === "scheduled" ? "Scheduled Date & Time" : "Published Date & Time"}
                </Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={form.scheduledDate}
                  onChange={(e) => setForm((f) => ({ ...f, scheduledDate: e.target.value }))}
                />
              </div>
            )}

            <div className="grid gap-1.5">
              <Label htmlFor="hashtags">Hashtags</Label>
              <Input
                id="hashtags"
                placeholder="#example #hashtag"
                value={form.hashtags}
                onChange={(e) => setForm((f) => ({ ...f, hashtags: e.target.value }))}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                placeholder="Internal notes or reminders..."
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!form.caption.trim()}>
              Add Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
