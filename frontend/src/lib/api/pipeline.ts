import { apiFetch } from './client';

export async function getPipelineStatus() {
  return apiFetch('/run/status');
}

export async function triggerPipeline(config: any) {
  return apiFetch('/run', { method: 'POST', body: JSON.stringify(config) });
}
