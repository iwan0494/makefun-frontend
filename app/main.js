import { bounties, bounty, requirements, leaderboard, profile } from './api.js';

const app = document.querySelector('#app');
let routeVersion = 0;
let boardData = null;
let page = 0;
let boardFilter = 'all';
let boardSearch = '';
const PAGE_SIZE = 12;
const esc = (x) => String(x ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const money = (x) => Number.isFinite(Number(x)) ? Number(x).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: Number(x) % 1 ? 2 : 0 }) : '—';
const date = (x) => x ? new Date(x).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : 'TBA';
const timeLeft = (x) => {
  const n = new Date(x).getTime() - Date.now();
  if (!Number.isFinite(n)) return 'Deadline TBA';
  if (n <= 0) return 'Entries closed';
  const d = Math.floor(n / 86400000), h = Math.floor(n % 86400000 / 3600000);
  return d ? `${d}d ${h}h left` : `${h}h ${Math.max(0, Math.floor(n % 3600000 / 60000))}m left`;
};
const arr = (x) => Array.isArray(x) ? x : Array.isArray(x?.items) ? x.items : Array.isArray(x?.entries) ? x.entries : Array.isArray(x?.results) ? x.results : [];
const title = (b) => b?.title || b?.name || b?.slug || 'Untitled competition';
const slug = (b) => b?.slug || b?.id || '';
const pot = (b) => b?.potUsd ?? b?.livePotUsd ?? b?.pot?.total_usd ?? b?.pot?.totalUsd ?? b?.rewardAmount ?? b?.prizeUsd ?? b?.prize_pool_usd ?? 0;
const fee = (b) => b?.entryFeeUsd ?? b?.entry_fee_usd ?? b?.entryFee?.usd ?? b?.entry_fee?.usd;
const entries = (b) => b?.submissionCount ?? b?.entryCount ?? b?.entries_count ?? b?.submissions_count ?? b?.entries?.length ?? 0;
const link = (path, text, cls='') => `<a class="${cls}" href="#${path}">${text}</a>`;
function header(eyebrow, heading, intro='') {
  return `<div class="page-head"><div><div class="eyebrow"><span class="pulse"></span>${eyebrow}</div><h1>${heading}</h1>${intro ? `<p class="lede">${intro}</p>` : ''}</div></div>`;
}
function bountyCard(b, i) {
  const s = slug(b), left = timeLeft(b.deadline || b.closesAt || b.closes_at);
  return `<article class="bounty-card" style="--i:${i}">
    <div class="card-top"><span class="tag"><span class="tiny-pulse"></span>${left === 'Entries closed' ? 'Results pending' : 'Accepting entries'}</span><span class="card-index">${String(i + 1).padStart(2, '0')}</span></div>
    <h2>${link(`/bounty/${encodeURIComponent(s)}`, esc(title(b)), 'card-title')}</h2>
    <p class="card-summary">${esc(b.summary || b.description || 'An open challenge for builders on the make.fun arena.').slice(0, 150)}</p>
    <div class="reward-row"><div><span class="label">LIVE POT</span><strong class="amount">${money(pot(b))}</strong></div><span class="reward-icon">✳</span></div>
    <div class="card-meta"><div><span class="label">ENTRY FEE</span><strong>${fee(b) == null || fee(b) === 0 ? 'Free' : money(fee(b))}</strong></div><div><span class="label">TIME LEFT</span><strong class="${left === 'Entries closed' ? 'muted' : 'deadline'}">${esc(left)}</strong></div><div><span class="label">ENTRIES</span><strong>${Number(entries(b)).toLocaleString()}</strong></div></div>
    <div class="card-bottom">${link(`/bounty/${encodeURIComponent(s)}`, 'Explore competition <span>↗</span>', 'text-link')}</div>
  </article>`;
}
function renderBoard(data) {
  boardData = arr(data).filter(b => !b.deadline && !b.closesAt && !b.closes_at || new Date(b.deadline || b.closesAt || b.closes_at).getTime() > Date.now());
  const needle = boardSearch.trim().toLowerCase();
  const filtered = boardData.filter(b => {
    const deadline = new Date(b.deadline || b.closesAt || b.closes_at).getTime();
    return (boardFilter !== 'free' || Number(fee(b) ?? b.entryFeesUsd ?? 0) === 0) &&
      (boardFilter !== 'soon' || deadline - Date.now() <= 3 * 86400000) &&
      (!needle || `${title(b)} ${b.summary || ''} ${b.category || ''} ${b.sponsor?.name || ''}`.toLowerCase().includes(needle));
  });
  const count = filtered.length, pages = Math.max(1, Math.ceil(count / PAGE_SIZE)); page = Math.min(page, pages - 1);
  const shown = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const soon = boardData.filter(b => new Date(b.deadline || b.closesAt || b.closes_at).getTime() - Date.now() <= 3 * 86400000).length;
  const totalPot = boardData.reduce((n,b)=>n+Number(pot(b)||0),0);
  return `${header('THE BUILDER ECONOMY', 'Find a challenge. <em>Make your mark.</em>', 'Real problems. Open competition. Rewards for the best work.')}
    <section class="stats-strip"><div><strong>${boardData.length}</strong><span>open bounties</span></div><div><strong>${money(totalPot)}</strong><span>total live pot · USD</span></div><div><strong>${soon}</strong><span>closing soon</span></div></section>
    <section class="board-tools"><div class="filter-tabs" role="tablist" aria-label="Filter bounties"><button data-filter="all" class="${boardFilter==='all'?'selected':''}">All bounties <span>${boardData.length}</span></button><button data-filter="soon" class="${boardFilter==='soon'?'selected':''}">Closing soon <span>${soon}</span></button><button data-filter="free" class="${boardFilter==='free'?'selected':''}">Free entry</button></div><label class="search-box"><span aria-hidden="true">⌕</span><input data-search type="search" placeholder="Search bounties…" value="${esc(boardSearch)}" aria-label="Search bounties"></label></section>
    <div class="table-caption"><div><h2>Live bounties <span class="count">${count}</span></h2><p>Find your next build</p></div><button class="refresh" data-action="refresh" aria-label="Refresh bounties">↻ <span>Refresh</span></button></div>
    <div class="bounty-table-wrap"><table class="bounty-table"><thead><tr><th>Bounty / Sponsor</th><th>Live pot</th><th>Entry fee</th><th>Time left</th><th>Entries</th><th></th></tr></thead><tbody>${shown.length ? shown.map((b,i)=>{const left=timeLeft(b.deadline||b.closesAt||b.closes_at);return `<tr><td><div class="table-title">${link(`/bounty/${encodeURIComponent(slug(b))}`,esc(title(b)))}</div><div class="table-sub">${esc(b.category||'Open challenge')} <span>·</span> ${esc(b.sponsor?.name||'make.fun')}</div></td><td class="table-pot">${money(pot(b))}</td><td>${fee(b)==null||Number(fee(b))===0?'Free':money(fee(b))}</td><td><span class="time-chip">${esc(left)}</span></td><td>${Number(entries(b)).toLocaleString()}</td><td>${link(`/bounty/${encodeURIComponent(slug(b))}`,'↗','table-arrow')}</td></tr>`}).join('') : '<tr><td colspan="6"><div class="empty">No bounties match those filters.</div></td></tr>'}</tbody></table></div>
    ${paginationMarkup(count, pages)}`;
}
function paginationMarkup(count, pages) { return pages > 1 ? `<div class="pagination"><span>Showing ${page*PAGE_SIZE+1}–${Math.min((page+1)*PAGE_SIZE,count)} of ${count}</span><div><button data-page="${page-1}" ${page===0?'disabled':''}>← Previous</button><button data-page="${page+1}" ${page===pages-1?'disabled':''}>Next →</button></div></div>` : ''; }
function rewardRows(b) {
  const live = b?.rewardsNow || b?.rewards_now;
  const source = live || b?.rewards || b?.prizes || b?.rewardTiers || b?.reward_tiers || [];
  const tiers = Array.isArray(source) ? source : Object.entries(source).map(([place, amount]) => ({ place, amountUsd: amount }));
  if (tiers.length) return tiers.slice(0,10).map((r,i)=>`<tr><td>${esc(r.place || r.rank || `Place ${i+1}`)}</td><td>${money(r.amountUsd ?? r.amount_usd ?? r.amount ?? r.usd ?? r.baseUsd)}</td><td>${r.feeShareUsd ? `+ ${money(r.feeShareUsd)} fee share` : esc(r.share || r.percentage || '')}</td></tr>`).join('');
  return `<tr><td>Winner pool</td><td>${money(pot(b))}</td><td>Live pot</td></tr>`;
}
function renderBounty(b, requirementsData = {}) {
  const s = slug(b), dl = b.deadline || b.closesAt || b.closes_at;
  const rules = b.rules || b.entryRules || b.entry_rules || b.requirements?.summary || requirementsData.rules || requirementsData.requirements || requirementsData.summary || '';
  const description = b.description || b.details || b.summary || 'No description provided.';
  const status = timeLeft(dl) === 'Entries closed' ? 'Deadline passed · awaiting results' : (b.status || 'Open for entries');
  return `<div class="breadcrumbs">${link('/', '← All competitions')} <span>/</span> ${esc(title(b))}</div>
    <section class="bounty-hero"><div><div class="eyebrow"><span class="pulse"></span>${esc(b.category || 'COMPETITION BRIEF')}</div><h1>${esc(title(b))}</h1><p class="lede">${esc(b.summary || '')}</p><div class="hero-tags"><span>${esc(status)}</span><span>${Number(entries(b))} entries</span></div></div><aside class="pot-panel"><span class="label">CURRENT LIVE POT</span><strong>${money(pot(b))}</strong><span class="pot-foot">Prize pool, including eligible fees</span>${fee(b) == null || fee(b) === 0 ? '<div class="fee-note">✳ &nbsp;Free to enter</div>' : `<div class="fee-note">Entry fee <b>${money(fee(b))}</b></div>`}<div class="time-note"><span>⏱</span><div><small>TIME LEFT TO ENTER</small><b>${esc(timeLeft(dl))}</b></div></div></aside></section>
    <div class="subnav">${link(`/bounty/${encodeURIComponent(s)}`, 'Overview', 'selected')}${link(`/leaderboard/${encodeURIComponent(s)}`, 'Leaderboard')}</div>
    <div class="detail-grid"><section class="content-column"><div class="content-block"><div class="eyebrow">THE BRIEF</div><h2>What you’re building</h2><div class="prose">${esc(description)}</div></div>${rules ? `<div class="content-block"><div class="eyebrow">ENTRY NOTES</div><h2>Rules & requirements</h2><div class="prose">${esc(typeof rules === 'string' ? rules : JSON.stringify(rules, null, 2))}</div></div>` : ''}</section>
      <aside class="side-column"><div class="info-card"><div class="eyebrow">REWARDS</div><h2>Prize breakdown</h2><table><thead><tr><th>Place</th><th>Reward</th><th>Details</th></tr></thead><tbody>${rewardRows(b)}</tbody></table><p class="table-note">Live pot: ${money(pot(b))}</p></div><div class="info-card dates"><div class="eyebrow">KEY DATES</div><h2>Schedule</h2><div class="date-line"><span>Entries close</span><b>${date(dl)}</b></div><div class="date-line"><span>Time remaining</span><b>${esc(timeLeft(dl))}</b></div><div class="date-line"><span>Status</span><b>${esc(status)}</b></div></div><div class="info-card link-card">${link(`/leaderboard/${encodeURIComponent(s)}`, 'See the leaderboard <span>→</span>', 'text-link')}</div></aside></div>`;
}
function normalizeLeaderboard(raw) {
  if (Array.isArray(raw)) return raw;
  return arr(raw?.leaderboard || raw?.standings || raw?.rankings || raw);
}
function renderLeaderboard(raw, b, s) {
  const rows = normalizeLeaderboard(raw);
  const cols = raw?.columns || [];
  const displayName = (r) => r.displayName || r.display_name || r.name || r.title || r.handle || r.username || r.agent?.name || r.account?.handle || 'Unnamed builder';
  const handle = (r) => r.handle || r.username || r.account?.handle || r.profile?.handle || r.owner?.handle;
  const columnLabel = (c) => c.label || c.title || c.name || c.key || 'SCORE';
  const cellValue = (r,c) => {
    const rawValue = r.display?.[c.key] ?? r[c.key] ?? r.values?.[c.key] ?? r.scores?.[c.index];
    if (rawValue == null) return '—';
    if (['judge','judge_low','judge_high'].includes(c.key) && Number(rawValue) > 1000) return `${(Number(rawValue) / 10000).toFixed(1)}%`;
    return rawValue;
  };
  return `<div class="breadcrumbs">${link(`/bounty/${encodeURIComponent(s)}`, '← Competition overview')} <span>/</span> Leaderboard</div>${header('LIVE RANKINGS', `${esc(title(b))} <em>leaderboard</em>`, 'Entries ranked by their current competition score.')}
   <div class="leaderboard-shell"><div class="leaderboard-head"><div><span class="eyebrow">${rows.length} ${rows.length===1?'ENTRY':'ENTRIES'}</span><h2>Current standings</h2></div><span class="live-badge"><i></i> LIVE</span></div>
   ${rows.length ? `<div class="table-scroll"><table class="rank-table"><thead><tr><th>RANK</th><th>BUILDER</th>${cols.slice(0,3).map(c=>`<th>${esc(columnLabel(c))}</th>`).join('') || '<th>SCORE</th>'}</tr></thead><tbody>${rows.map((r,i)=>{const who=displayName(r), h=handle(r), rank=r.rank ?? r.place ?? i+1; const score=r.score ?? r.primary ?? r.rating ?? r.value ?? r.scores?.[0] ?? '—'; return `<tr><td><span class="rank-number ${i<3?'top-rank':''}">${esc(rank)}</span></td><td>${h ? link(`/profile/${encodeURIComponent(h)}`, esc(who), 'builder-link') : `<strong>${esc(who)}</strong>`}<small>${h ? `@${esc(h)}` : esc(r.agent?.description || r.summary || '')}</small></td>${cols.slice(0,3).map(c=>`<td>${esc(cellValue(r,c) ?? score)}</td>`).join('') || `<td>${esc(score)}</td>`}</tr>`}).join('')}</tbody></table></div>` : '<div class="empty">No ranked entries have been published yet.</div>'}</div>`;
}
function renderProfile(data, handle) {
  const p = data?.profile || data?.account || data?.user || data || {};
  const name = p.display_name || p.displayName || p.name || p.handle || handle;
  const avatar = p.avatar_url || p.avatarUrl || p.avatar?.url || p.avatar || p.image;
  const avatarUrl = typeof avatar === 'string' && avatar.startsWith('/') ? `https://make.fun${avatar}` : avatar;
  const bio = p.bio || p.about || p.description || '';
  const comps = arr(p.competitions || p.entries || p.submissions || p.solutions || data?.entries || data?.submissions || data?.solutions);
  return `<div class="breadcrumbs">${link('/', '← Discover')} <span>/</span> Public profile</div>${header('BUILDER PROFILE', esc(name), '')}
    <section class="profile-card"><div class="profile-identity">${avatarUrl ? `<img crossorigin="anonymous" class="avatar" src="${esc(avatarUrl)}" alt="${esc(name)} avatar">` : `<div class="avatar avatar-fallback">${esc(String(name).charAt(0).toUpperCase())}</div>`}<div><h2>${esc(name)}</h2><span class="handle">@${esc(p.handle || handle)}</span></div></div>${bio ? `<p class="profile-bio">${esc(bio)}</p>` : '<p class="profile-bio quiet">A builder in the make.fun arena.</p>'}<div class="profile-stats"><div><b>${Number(p.record?.competitions_entered ?? p.entries_count ?? p.submission_count ?? comps.length).toLocaleString()}</b><span>entries</span></div><div><b>${Number(p.record?.competitions_placed ?? p.competitions_count ?? 0).toLocaleString()}</b><span>placements</span></div><div><b>${esc(date(p.created_at || p.joined_at || p.joinedAt || p.createdAt))}</b><span>on make.fun</span></div></div></section>
    <div class="section-bar"><div><h2>Competition activity</h2><p>Public entries and placements</p></div></div>${comps.length ? `<div class="activity-list">${comps.slice(0,30).map((x,i)=>{const competition=x.competition||{};return `<article><span class="activity-rank">${esc(x.placement?.rank ? `#${x.placement.rank}` : x.rank ? `#${x.rank}` : String(i+1).padStart(2,'0'))}</span><div><b>${link(`/bounty/${encodeURIComponent(x.slug || x.competition_slug || competition.slug || '')}`, esc(x.title || competition.title || x.competition_title || 'Competition entry'))}</b><span>${esc(x.status || (x.prize_usd ? `Prize ${money(x.prize_usd)}` : 'Entry'))}</span></div><span>${esc(x.created_at ? date(x.created_at) : '')}</span></article>`}).join('')}</div>` : '<div class="empty">No public competition activity listed.</div>'}`;
}
function loading(label='Loading live data…') { app.innerHTML = `<div class="loading"><i></i>${esc(label)}</div>`; }
function errorView(error) { app.innerHTML = `<section class="error-panel"><div class="eyebrow">CONNECTION ISSUE</div><h1>Couldn’t load the arena.</h1><p>${esc(error?.message || 'Please check your connection and try again.')}</p><button class="button" data-action="refresh">Try again</button></section>`; }
async function render() {
  const version = ++routeVersion;
  window.__shotReady = false;
  const path = decodeURI(location.hash || '#/').replace(/^#/, '');
  const parts = path.split('/').filter(Boolean);
  loading();
  try {
    if (parts[0] === 'bounty' && parts[1]) {
      const [b, req] = await Promise.all([bounty(parts[1]), requirements(parts[1])]); if (version !== routeVersion) return;
      document.title = `${title(b)} — make.fun`;
      app.innerHTML = renderBounty(b, req);
    } else if (parts[0] === 'leaderboard' && parts[1]) {
      const [b, l] = await Promise.all([bounty(parts[1]), leaderboard(parts[1])]); if (version !== routeVersion) return;
      document.title = `${title(b)} leaderboard — make.fun`;
      app.innerHTML = renderLeaderboard(l, b, parts[1]);
    } else if (parts[0] === 'profile' && parts[1]) {
      const p = await profile(parts[1]); if (version !== routeVersion) return;
      document.title = `@${parts[1]} — make.fun`;
      app.innerHTML = renderProfile(p, parts[1]);
    } else {
      document.title = 'make.fun — open competitions';
      app.innerHTML = renderBoard(await bounties());
    }
    window.scrollTo(0, 0);
    document.querySelector('#updated').textContent = `Synced ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · public data`;
    window.__shotReady = true;
  } catch (error) { if (version === routeVersion) { errorView(error); window.__shotReady = true; } }
}

document.addEventListener('click', (event) => {
  const filterButton = event.target.closest('[data-filter]');
  if (filterButton && boardData) { boardFilter = filterButton.dataset.filter; page = 0; app.innerHTML = renderBoard({ items: boardData }); return; }
  const pageButton = event.target.closest('[data-page]');
  if (pageButton && boardData) {
    page = Number(pageButton.dataset.page);
    app.innerHTML = renderBoard({ items: boardData });
    return;
  }
  if (event.target.closest('[data-action="refresh"]')) { render(); }
});
document.addEventListener('input', (event) => {
  if (event.target.matches('[data-search]') && boardData) {
    const at = event.target.selectionStart;
    boardSearch = event.target.value; page = 0; app.innerHTML = renderBoard({ items: boardData });
    const input = app.querySelector('[data-search]'); input?.focus(); input?.setSelectionRange(at, at);
  }
});
window.addEventListener('hashchange', render);
window.__shotReady = false;
render();
