import { apiFetch } from './client';

export async function getAdminStats(token: string) {
  return apiFetch('/admin/system', { headers: { Authorization: `Bearer ${token}` } });
}

export async function getSystemHealth(token: string) {
  return apiFetch('/admin/logs', { headers: { Authorization: `Bearer ${token}` } });
}
