import { apiFetch } from './client';

export async function login(username: string, password: string) {
  const data = new URLSearchParams();
  data.append('username', username);
  data.append('password', password);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1'}/auth/login`, {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (!res.ok) throw new Error('Login failed');
  const json = await res.json();
  if (typeof window !== 'undefined') localStorage.setItem('token', json.access_token);
  return json;
}

export async function register(username: string, password: string) {
  const data = new URLSearchParams();
  data.append('username', username);
  data.append('password', password);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1'}/auth/register`, {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (!res.ok) throw new Error('Register failed');
  const json = await res.json();
  if (typeof window !== 'undefined') localStorage.setItem('token', json.access_token);
  return json;
}

export function logout() {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
}
