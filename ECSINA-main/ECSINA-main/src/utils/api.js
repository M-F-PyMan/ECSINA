export async function fetchWithAuth(url, options = {}) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
  let access = localStorage.getItem("access");

  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };
  if (access) headers.Authorization = `Bearer ${access}`;

  // First attempt
  let res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
    credentials: "include", // include cookies for refresh
  });

  // If access expired, try refresh
  if (res.status === 401) {
    const refreshRes = await fetch(`${API_BASE}/api/v1/accounts/auth/refresh/`, {
      method: "POST",
      credentials: "include",
    });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      if (data.access) {
        localStorage.setItem("access", data.access);
        headers.Authorization = `Bearer ${data.access}`;
        // retry original request
        res = await fetch(`${API_BASE}${url}`, {
          ...options,
          headers,
          credentials: "include",
        });
      }
    }
  }
  return res;
}

