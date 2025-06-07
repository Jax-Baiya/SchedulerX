import { apiFetch } from './client';

export async function getDbProfiles() {
  return apiFetch('/db-profiles');
}
