// src/components/authFetch.js
const API_BASE_URL = import.meta.env.VITE_API_URL || '/';

function buildUrl(endpoint) {
  // if user passes an absolute URL, use it
  if (/^https?:\/\//.test(endpoint)) return endpoint;
  // otherwise, join base + endpoint without doubling slashes
  const base = API_BASE_URL.replace(/\/$/, '');
  const path = endpoint.replace(/^\//, '');
  return `${base}/${path}`;
}

export async function authFetch(endpoint, opts = {}) {
  const url = buildUrl(endpoint);
  const token = localStorage.getItem('token');

  const res = await fetch(url, {
    ...opts,
    headers: {
      ...(opts.headers || {}),
      // only set Authorization if token exists
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // auto‐logout on expired/401
  if (res.status === 401) {
    let msg = '';
    try {
      const body = await res.json();
      msg = body.msg || '';
    } catch {}
    if (msg.toLowerCase().includes('expired')) {
      localStorage.removeItem('token');
      // redirect to login
      window.location.href = '/';
      throw new Error('Session expired');
    }
  }

  return res;
}
