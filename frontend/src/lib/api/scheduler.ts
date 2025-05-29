import { apiFetch } from './client';

export async function getScheduledPosts(token: string) {
  return apiFetch('/scheduler', { headers: { Authorization: `Bearer ${token}` } });
}

export async function createScheduledPost(post: any, token: string) {
  return apiFetch('/scheduler', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deleteScheduledPost(id: number, token: string) {
  return apiFetch(`/scheduler/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}
