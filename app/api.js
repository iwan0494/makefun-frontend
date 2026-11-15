const ROOT = 'https://make.fun/api';
const memory = new Map();
const TTL = 60_000;

function readCache(key) {
  const m = memory.get(key);
  if (m && Date.now() - m.at < TTL) return m;
  try {
    const saved = JSON.parse(localStorage.getItem(`mf:${key}`) || 'null');
    if (saved && Date.now() - saved.at < TTL) { memory.set(key, saved); return saved; }
  } catch {}
  return m || null;
}

async function get(path, { fresh = false } = {}) {
  const key = path;
  const cached = !fresh && readCache(key);
  if (cached && Date.now() - cached.at < TTL) return cached.data;
  const headers = {};
  if (cached?.etag) headers['If-None-Match'] = cached.etag;
  const response = await fetch(ROOT + path, { headers });
  if (response.status === 304 && cached) { cached.at = Date.now(); memory.set(key, cached); return cached.data; }
  if (!response.ok) throw new Error(`make.fun returned ${response.status}`);
  const data = await response.json();
  const record = { data, etag: response.headers.get('ETag'), at: Date.now() };
  memory.set(key, record);
  try { localStorage.setItem(`mf:${key}`, JSON.stringify(record)); } catch {}
  return data;
}

export const bounties = () => get('/competitions?status=open&activity=times');
export const bounty = (slug) => get(`/competitions/${encodeURIComponent(slug)}`);
export const requirements = (slug) => get(`/competitions/${encodeURIComponent(slug)}/requirements`);
export const leaderboard = (slug) => get(`/competitions/${encodeURIComponent(slug)}/leaderboard`);
export const profile = (handle) => get(`/profiles/${encodeURIComponent(handle.replace(/^@/, ''))}`);
