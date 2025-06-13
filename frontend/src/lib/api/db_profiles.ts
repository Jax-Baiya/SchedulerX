import { apiFetch } from './client';

export async function getDbProfiles() {
  return apiFetch('/db-profiles');
}

export async function setDbProfile(profileName: string) {
  const res = await fetch("/api/v1/db-profiles/select", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile_name: profileName }),
  });
  if (!res.ok) throw new Error("Failed to set DB profile");
  return res.json();
}

export async function getActiveDbProfile() {
  const res = await fetch("/api/v1/db-profiles/current");
  if (!res.ok) throw new Error("Failed to get active DB profile");
  return res.json();
}
