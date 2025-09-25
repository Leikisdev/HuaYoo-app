import { authenticatedFetch } from "../auth/authenticatedFetch";

const API_BASE = process.env.EXPO_PUBLIC_ORCHESTRATOR_URL ?? 'http://127.0.0.1:8000';

export async function createUser(payload: { email: string, nickname: string }) {
  const res = await authenticatedFetch(`${API_BASE}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error ${res.status}: ${text}`);
  }
  return res.json();
}