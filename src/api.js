const API_BASE = "https://resource-backend.onrender.com";

export async function fetchResources() {
  const res = await fetch(`${API_BASE}/resources`);
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}