import { apiFetch } from './client';

export async function getSettings(token: string) {
  return apiFetch('/settings', { headers: { Authorization: `Bearer ${token}` } });
}

export async function updateSettings(settings: object, token: string) {
  return apiFetch('/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
    headers: { Authorization: `Bearer ${token}` },
  });
}
