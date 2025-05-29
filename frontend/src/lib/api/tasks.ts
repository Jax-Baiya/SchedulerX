import { apiFetch } from './client';

export async function getTasks(token: string) {
  return apiFetch('/tasks', { headers: { Authorization: `Bearer ${token}` } });
}

export async function createTask(task: object, token: string) {
  return apiFetch('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deleteTask(id: number, token: string) {
  return apiFetch(`/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}
