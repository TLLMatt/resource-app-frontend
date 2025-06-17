const API_BASE = "https://resource-app-backend.onrender.com";

export async function fetchResources() {
  const res = await fetch(`${API_BASE}/resources`);
  return res.json();
}

export async function createResource(data) {
  const res = await fetch(`${API_BASE}/resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}

export async function createProject(data) {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}