// API for media CRUD operations
import type { Media } from "@/app/data/page";
import { apiFetch } from './client';

// Removed mock data

export async function getMediaList(token: string): Promise<Media[]> {
  return apiFetch('/media', { headers: { Authorization: `Bearer ${token}` } });
}

export async function getMediaDetail(id: string, token: string) {
  return apiFetch(`/media/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

export async function addMedia(media: Omit<Media, "id">, token: string) {
  return apiFetch('/media', {
    method: 'POST',
    body: JSON.stringify(media),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateMedia(id: number, updates: Partial<Media>, token: string) {
  return apiFetch(`/media/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deleteMedia(id: number, token: string) {
  return apiFetch(`/media/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function mockUploadFiles(files: FileList): Promise<void> {
  // TODO: Replace with real upload API call
  return Promise.resolve();
}
