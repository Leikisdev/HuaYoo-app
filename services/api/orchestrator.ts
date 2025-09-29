import { Platform } from "react-native";
import { authenticatedFetch } from "../auth/authenticatedFetch";

const API_BASE = Platform.OS === 'web' && process.env.EXPO_PUBLIC_ENV === 'development' ? 
  'http://localhost:8000' : process.env.EXPO_PUBLIC_ORCHESTRATOR_URL;

export async function createUser(payload: { email: string, displayName: string }) {
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