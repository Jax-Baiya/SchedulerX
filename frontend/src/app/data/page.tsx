"use client";
import { useEffect, useState } from "react";
import { getMediaList, addMedia, updateMedia, deleteMedia } from "@/lib/api/media";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface Media {
  id: number;
  filename: string;
  path: string;
  size?: number;
  created_at?: string;
}

export default function DataBrowserPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newMedia, setNewMedia] = useState<Omit<Media, "id">>({ filename: "", path: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [editMedia, setEditMedia] = useState<Partial<Media>>({});

  useEffect(() => {
    setLoading(true);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    getMediaList(token)
      .then(setMedia)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Not authenticated");
      const created = await addMedia(newMedia, token);
      setMedia((prev) => [...prev, created as Media]);
      setShowAdd(false);
      setNewMedia({ filename: "", path: "" });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId == null) return;
    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Not authenticated");
      const updated = await updateMedia(editId, editMedia, token);
      setMedia((prev) => prev.map((m) => (m.id === editId ? (updated as Media) : m)));
      setEditId(null);
      setEditMedia({});
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Not authenticated");
      await deleteMedia(id, token);
      setMedia((prev) => prev.filter((m) => m.id !== id));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const filtered = search
    ? media.filter((m) => m.filename.toLowerCase().includes(search.toLowerCase()))
    : media;

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search by filename"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setShowAdd(true)}>Add Media</Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Loading...</div>}
      {showAdd && (
        <form className="space-y-2" onSubmit={handleAdd}>
          <Input
            placeholder="Filename"
            value={newMedia.filename}
            onChange={(e) => setNewMedia((m) => ({ ...m, filename: e.target.value }))}
            required
          />
          <Input
            placeholder="Path"
            value={newMedia.path}
            onChange={(e) => setNewMedia((m) => ({ ...m, path: e.target.value }))}
            required
          />
          <Button type="submit">Add</Button>
          <Button type="button" variant="ghost" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
        </form>
      )}
      <div className="space-y-2">
        {filtered.map((m) => (
          <Card key={m.id}>
            <CardHeader>
              <CardTitle>{m.filename}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Path: {m.path}</div>
              <div>Size: {m.size ?? "-"}</div>
              <div>Created: {m.created_at ?? "-"}</div>
              <Button size="sm" onClick={() => { setEditId(m.id); setEditMedia(m); }}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(m.id)}>Delete</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {editId !== null && (
        <form className="space-y-2" onSubmit={handleEdit}>
          <Input
            placeholder="Filename"
            value={editMedia.filename || ""}
            onChange={(e) => setEditMedia((em) => ({ ...em, filename: e.target.value }))}
            required
          />
          <Input
            placeholder="Path"
            value={editMedia.path || ""}
            onChange={(e) => setEditMedia((em) => ({ ...em, path: e.target.value }))}
            required
          />
          <Button type="submit">Save</Button>
          <Button type="button" variant="ghost" onClick={() => setEditId(null)}>
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
}
