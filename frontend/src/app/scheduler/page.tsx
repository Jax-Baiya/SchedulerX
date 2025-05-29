"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getScheduledPosts, createScheduledPost, deleteScheduledPost } from "@/lib/api/scheduler";

interface ScheduledPost {
  id: number;
  platform: string;
  content: string;
  scheduledAt: string;
}

export default function SchedulerPage() {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [platform, setPlatform] = useState("");
  const [content, setContent] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    getScheduledPosts(token)
      .then(setPosts)
      .catch((e) => setError(e.message));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return setError("Not authenticated");
    try {
      const created = await createScheduledPost({ platform, content, scheduledAt }, token);
      setPosts((prev) => [...prev, created]);
      setPlatform("");
      setContent("");
      setScheduledAt("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDelete = async (id: number) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return setError("Not authenticated");
    try {
      await deleteScheduledPost(id, token);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule a Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleAdd}>
            <Input
              placeholder="Platform (e.g. TikTok, IG)"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              required
            />
            <Input
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <Input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              required
            />
            <Button type="submit">Add Schedule</Button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-muted-foreground">No scheduled posts.</div>
          ) : (
            <ul className="space-y-2">
              {posts.map((p) => (
                <li key={p.id} className="border rounded p-2 flex flex-col md:flex-row md:items-center md:gap-4">
                  <span><b>Platform:</b> {p.platform}</span>
                  <span><b>Content:</b> {p.content}</span>
                  <span><b>Scheduled At:</b> {p.scheduledAt}</span>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>Delete</Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
