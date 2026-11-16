const styles = `
:root{color-scheme:light;--paper:#f7f8f5;--white:#fff;--ink:#17221b;--muted:#79847c;--line:#e5e9e3;--green:#247a52;--mint:#e8f4ec;--orange:#f1a451;--red:#bd363b;--shadow:0 14px 34px #1d39200b}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:14px/1.45 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}button,a{font:inherit}a{color:inherit;text-decoration:none}button{cursor:pointer}.shell{max-width:1440px;margin:auto;padding:0 32px}.topbar{height:72px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line)}.brand{display:flex;align-items:center;gap:10px;font-weight:750;letter-spacing:-.04em;font-size:17px}.mark{width:31px;height:31px;display:grid;place-items:center;background:#183e2b;border-radius:10px;color:#fff}.mark svg{width:19px}.nav{display:flex;gap:27px;color:#68736c;font-size:13px}.nav a:hover,.nav .active{color:var(--green)}.user{border:1px solid var(--line);border-radius:99px;padding:8px 13px;background:#fff;font-size:12px;font-weight:650}.intro{display:flex;justify-content:space-between;align-items:end;padding:16px 0 10px}.eyebrow{text-transform:uppercase;letter-spacing:.12em;color:var(--green);font-size:10px;font-weight:800}.intro h1{font-size:25px;letter-spacing:-.045em;margin:6px 0 3px}.intro p{color:var(--muted);margin:0;font-size:12px}.live{display:flex;align-items:center;gap:7px;color:#557160;font-size:11px}.livebox{text-align:right}.livebox small{display:block;margin-top:6px;color:var(--muted);font-size:9px}.dot{width:7px;height:7px;background:#52a571;border-radius:50%;box-shadow:0 0 0 3px #52a5711f}.split{display:grid;grid-template-columns:minmax(270px,.88fr) minmax(520px,1.9fr);gap:16px;padding-bottom:22px;align-items:start}.panel{background:var(--white);border:1px solid var(--line);border-radius:15px;box-shadow:var(--shadow)}.board{padding:17px 14px;position:sticky;top:14px}.section-head{display:flex;justify-content:space-between;align-items:center;padding:0 4px 13px}.section-head h2{margin:0;font-size:13px;letter-spacing:-.015em}.count{font-size:10px;color:var(--muted);background:#f3f5f2;border-radius:20px;padding:4px 8px}.search{width:100%;border:1px solid var(--line);border-radius:9px;padding:9px 10px;background:#fafbf9;color:var(--ink);outline:0;margin-bottom:10px;font-size:11px}.search:focus{border-color:#9abda6}.filters{display:flex;gap:6px;margin:0 0 10px}.filters button{border:1px solid var(--line);background:#fff;color:var(--muted);border-radius:7px;padding:6px 8px;font-size:9px;font-weight:700}.filters button.active[data-status=open]{background:var(--mint);border-color:#c4dfcc;color:var(--green)}.filters button[data-status=resolved]{color:var(--red);background:#fff7f6}.filters button.active[data-status=resolved]{background:#fbe9e8;border-color:#f0cccc}.cards{display:grid;gap:7px;max-height:calc(100vh - 262px);overflow:auto;padding-right:2px}.bounty-card{width:100%;text-align:left;border:1px solid transparent;border-radius:10px;padding:10px;background:#fff;display:block;color:inherit}.bounty-card:hover{background:#f8faf7}.bounty-card.selected{border-color:#c4dfcc;background:#f2f8f3}.card-top{display:flex;justify-content:space-between;gap:10px;align-items:center}.sponsor{font-size:10px;color:var(--muted)}.tag{font-size:9px;color:var(--green);background:var(--mint);border-radius:20px;padding:3px 7px;font-weight:700;white-space:nowrap}.tag.closed{color:var(--red);background:#fbe9e8}.bounty-card strong{display:block;margin:5px 0 8px;font-size:11px;line-height:1.35}.card-bottom{display:flex;justify-content:space-between;font-size:10px;color:var(--muted)}.card-bottom b{color:var(--ink);font-size:11px}.detail{padding:21px 22px}.detail-head{display:flex;justify-content:space-between;align-items:start;gap:14px}.crumb{font-size:10px;color:var(--muted);margin-bottom:11px}.detail h2{font-size:22px;line-height:1.2;letter-spacing:-.045em;margin:0 0 7px;max-width:590px}.detail-desc{color:#6e7971;font-size:11px;max-width:660px;margin:0 0 15px;line-height:1.55}.sponsor-line{font-size:10px;color:var(--muted);display:flex;align-items:center;gap:7px;margin-bottom:14px}.verified{color:var(--green);font-weight:800}.reward{border:1px solid #dce9dd;background:#f4f8f3;border-radius:12px;padding:13px 15px;margin-bottom:15px}.reward-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.reward-head span{font-size:10px;color:#617066;font-weight:700}.reward-head b{font-size:12px;color:var(--green)}.reward-table{width:100%;border-collapse:collapse;text-align:right;font-variant-numeric:tabular-nums}.reward-table th{text-transform:uppercase;letter-spacing:.08em;font-size:8px;color:#829087;font-weight:750;padding:4px 7px}.reward-table td{font-size:10px;padding:4px 7px;border-top:1px solid #e5ece5}.reward-table th:first-child,.reward-table td:first-child{text-align:left}.reward-table td:last-child{font-weight:750;color:#1e5437}.reward-pair{display:grid;grid-template-columns:1fr 1fr;gap:18px}.metadata{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:0 0 17px}.meta{border:1px solid var(--line);border-radius:10px;padding:9px 10px}.meta span{display:block;color:var(--muted);font-size:9px;margin-bottom:4px}.meta b{font-size:10px}.leader{border:1px solid var(--line);border-radius:12px;overflow:hidden}.leader-head{display:flex;justify-content:space-between;align-items:center;padding:11px 13px;border-bottom:1px solid var(--line)}.leader-head strong{font-size:11px}.leader-head a{font-size:10px;color:var(--green);font-weight:700}.leader-labels,.leader-row{display:grid;grid-template-columns:38px minmax(100px,1fr) 100px 80px;gap:8px;align-items:center}.leader-labels{padding:8px 13px;color:#89938b;font-size:8px;text-transform:uppercase;letter-spacing:.09em;background:#fafbf9}.leader-row{padding:5px 13px;border-top:1px solid #eff1ee;font-size:10px}.rank{font-weight:750;color:#87928a}.entrant{font-weight:650;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rate{text-align:right;font-weight:750;color:#1d5438;font-variant-numeric:tabular-nums}.scorebar{height:4px;background:#edf1ed;border-radius:5px;overflow:hidden}.scorebar i{display:block;height:100%;background:#6aa67b;border-radius:5px}.leader-foot{border-top:1px solid var(--line);padding:10px 13px;display:flex;justify-content:space-between;color:var(--muted);font-size:9px}.button{border:1px solid #dce6dd;border-radius:8px;color:var(--green);background:#f7faf7;padding:7px 10px;font-size:10px;font-weight:750}.button:hover{background:#eaf4ec}.desc-block{margin:15px 0;color:#68746d;font-size:11px;line-height:1.6}.page-title{padding:24px 0 17px}.page-title h1{font-size:24px;letter-spacing:-.045em;margin:5px 0}.page-title p{margin:0;color:var(--muted);font-size:11px}.full-table{width:100%;border-collapse:collapse}.full-table th{text-align:left;background:#f8faf7;color:#849087;text-transform:uppercase;letter-spacing:.09em;font-size:8px;padding:11px 13px}.full-table th:last-child,.full-table td:last-child{text-align:right}.full-table td{border-top:1px solid #edf0ec;padding:11px 13px;font-size:11px}.full-table tr:first-child td{background:#f8fbf8}.full-table .rate{font-size:11px}.profile{display:grid;grid-template-columns:1fr 2fr;gap:16px}.profile-card{padding:22px}.avatar{width:55px;height:55px;border-radius:50%;background:#e6efe7;display:grid;place-items:center;color:var(--green);font-size:18px;font-weight:800;margin-bottom:12px}.profile-card h2{margin:0 0 4px;font-size:21px}.handle{color:var(--muted);font-size:11px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:20px}.stat{border:1px solid var(--line);border-radius:9px;padding:10px}.stat b{display:block;font-size:14px}.stat span{font-size:9px;color:var(--muted)}.activity{padding:19px}.activity h3{margin:0 0 12px;font-size:12px}.activity-row{padding:11px 0;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:12px;font-size:10px}.activity-row small{display:block;color:var(--muted);margin-top:3px}.empty{padding:22px;color:var(--muted);text-align:center;font-size:11px}.footer{display:flex;justify-content:space-between;gap:12px;padding:12px 0 24px;color:#8a948d;font-size:9px;border-top:1px solid var(--line)}.footer strong{color:#5f6c63}.error{color:var(--red);padding:10px;font-size:10px}.loading{padding:30px;text-align:center;color:var(--muted);font-size:11px}
@media(max-width:850px){.shell{padding:0 17px}.split{grid-template-columns:1fr;gap:12px}.board{position:static}.cards{display:flex;overflow:auto;max-height:none}.bounty-card{min-width:205px;border:1px solid var(--line)}.detail{padding:17px}.nav{gap:14px}.profile{grid-template-columns:1fr}.intro{padding-top:23px}.metadata{grid-template-columns:repeat(2,1fr)}}@media(max-width:520px){.reward-pair{grid-template-columns:1fr;gap:0}.shell{padding:0 12px}.topbar{height:60px}.nav{font-size:11px;gap:10px}.user{display:none}.intro h1{font-size:21px}.live{font-size:9px}.detail h2{font-size:19px}.detail{padding:14px}.leader-labels,.leader-row{grid-template-columns:26px minmax(72px,1fr) 72px 50px;gap:5px;padding-left:9px;padding-right:9px}.reward-table th{font-size:7px;padding:4px}.reward-table td{font-size:9px;padding:6px 4px}.footer{font-size:8px}.stats{gap:4px}.stat{padding:8px 6px}}
`;
const API = 'https://make.fun/api';
const cache = new Map();
const meter = { requests: 0, memory: 0, notModified: 0, json: 0 };
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = value => '$' + Number(value || 0).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
const date = value => value ? new Date(value).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}) : '—';
const fee = item => item.entryFeeUsd != null ? money(item.entryFeeUsd) : (item.description?.match(/(?:entering costs|entry fee(?: is|:)?|costs)\s*\$(\d+(?:\.\d{1,2})?)/i)?.[1] ? '$'+item.description.match(/(?:entering costs|entry fee(?: is|:)?|costs)\s*\$(\d+(?:\.\d{1,2})?)/i)[1] : '—');
const timeLeft = value => { const ms = new Date(value).getTime() - Date.now(); if (!Number.isFinite(ms)) return 'No deadline'; if (ms <= 0) return 'Deadline passed'; const days=Math.floor(ms/86400000), hours=Math.floor(ms%86400000/3600000); return days ? `${days}d ${hours}h left` : `${hours}h left`; };
function request(path) {
  const old = cache.get(path);
  if (old && Date.now() - old.time < 30000) { meter.memory++; renderMeter(); return Promise.resolve(old.data); }
  meter.requests++;
  const headers = old?.etag ? {'If-None-Match':old.etag} : {};
  return fetch(API + path, {headers}).then(async response => {
    if (response.status === 304 && old) { meter.notModified++; old.time = Date.now(); renderMeter(); return old.data; }
    if (!response.ok) throw new Error(`Public API returned ${response.status}`);
    const bytes = await response.arrayBuffer(); meter.json += bytes.byteLength;
    const data = JSON.parse(new TextDecoder().decode(bytes));
    cache.set(path, {data, time:Date.now(), etag:response.headers.get('ETag')});
    renderMeter(); return data;
  });
}
function rate(entry) {
  const raw = entry?.values?.judge ?? entry?.display?.judge;
  const n = Number(raw); return Number.isFinite(n) ? `${(n / 10000).toFixed(2)}%` : '—';
}
function icon() { return `<span class="mark"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 17V7l7 5 7-5v10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="5" cy="7" r="1.5" fill="#f1a451"/><circle cx="19" cy="7" r="1.5" fill="#f1a451"/></svg></span>`; }
let root, bounties=[], selected='makefun-frontend-01', leaders=[], leaderCount=0, pagePath='/';
export async function start(target) {
  root=target; document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
  window.addEventListener('hashchange', route);
  await route();
}
function currentRoute() { const h=location.hash.slice(1) || '/'; return h.startsWith('/') ? h : '/'+h; }
async function route() {
  pagePath=currentRoute(); const match=pagePath.match(/^\/bounty\/([^/]+)(?:\/(leaderboard))?$/);
  if (pagePath.startsWith('/profile/')) return profilePage(decodeURIComponent(pagePath.split('/')[2] || 'iwan0494'));
  if (match && match[2]) return leaderboardPage(match[1]);
  if (match) { selected=match[1]; return bountyPage(match[1]); }
  return boardPage('makefun-frontend-01');
}
async function loadBoard() {
  if (!bounties.length) { const response=await request('/competitions?activity=times&limit=100'); bounties=(response.items || response.competitions || []).sort((a,b)=>Number(isClosed(a))-Number(isClosed(b))); }
  return bounties;
}
function layout(content, active='board') {
  return `<div class="shell"><header class="topbar"><a class="brand" href="#/">${icon()}<span>make.fun</span></a><nav class="nav"><a class="${active==='board'?'active':''}" href="#/">Explore</a><a href="#/bounty/makefun-frontend-01">Bounties</a><a class="${active==='leaderboard'?'active':''}" href="#/bounty/makefun-frontend-01/leaderboard">Leaderboard</a></nav><a class="user" href="#/profile/iwan0494">@iwan0494 ↗</a></header>${content}<footer class="footer"><span id="meter">Loading performance data…</span><strong>Public API · live data</strong></footer></div>`;
}
function renderMeter() {
  const el=document.querySelector('#meter'); if(!el)return;
  const entries=performance.getEntriesByType('navigation'); const nav=entries[0];
  const appResources=performance.getEntriesByType('resource');
  const initial=[...(nav?[nav]:[]),...appResources.filter(e=>new URL(e.name).pathname.endsWith('/boot.js'))];
  const raw=initial.reduce((n,e)=>n+(e.decodedBodySize||0),0), zipped=initial.reduce((n,e)=>n+(e.encodedBodySize||0),0);
  const line=`${initial.length} first-load files · ${raw.toLocaleString()} B raw / ${zipped.toLocaleString()} B gzip · API ${meter.requests} req · ${meter.memory} cache · ${meter.notModified} × 304 · ${(meter.json/1024).toFixed(1)} KB JSON`;
  el.textContent=line; const hero=document.querySelector('#hero-meter'); if(hero) hero.textContent=line;
}
function isClosed(x) { return ['resolved','closed','complete','completed'].includes(String(x.status||'').toLowerCase()) || !!x.resolvedAt; }
function card(x, slug) {
  const chosen=x.slug===slug, closed=isClosed(x);
  return `<a class="bounty-card ${chosen?'selected':''}" href="#/bounty/${encodeURIComponent(x.slug)}"><span class="card-top"><span class="sponsor">${escapeHtml(x.sponsor?.name||'make.fun')}</span><span class="tag ${closed?'closed':''}">${closed?'Resolved':escapeHtml(x.status||'Open')}</span></span><strong>${escapeHtml(x.title)}</strong><span class="card-bottom"><span>${Number(x.submissionCount||0).toLocaleString()} entries · fee ${fee(x)}</span><b>${money(x.potUsd ?? x.rewardAmount)}</b></span><span class="card-time" data-deadline="${escapeHtml(x.deadline)}">${timeLeft(x.deadline)}</span></a>`;
}
function rewardTable(data, limit=3) {
  const rewards=(data.rewardsNow||[]).slice(0,limit);
  if (!rewards.length) return `<div class="empty">Prize breakdown is not available yet.</div>`;
  const rows = group => `<table class="reward-table"><thead><tr><th>Place</th><th>Base</th><th>Fee share</th><th>Amount</th></tr></thead><tbody>${group.map(r=>`<tr><td>${r.place}${r.place===1?'st':r.place===2?'nd':r.place===3?'rd':'th'}</td><td>${money(r.baseUsd)}</td><td>+${money(r.feeShareUsd)}</td><td>${money(r.amountUsd)}</td></tr>`).join('')}</tbody></table>`;
  const tables = rewards.length > 10 ? `<div class="reward-pair">${rows(rewards.slice(0,10))}${rows(rewards.slice(10))}</div>` : rows(rewards);
  return `<div class="reward"><div class="reward-head"><span>REWARDS · LIVE POOL ${money(data.potUsd)}</span><b>Entry fees ${data.entryFeesUsd != null ? money(data.entryFeesUsd) : '—'}</b></div>${tables}</div>`;
}
function leaderRows(entries, limit=10) {
  return (entries||[]).slice(0,limit).map(e=>`<div class="leader-row"><span class="rank">${String(e.rank||'—').padStart(2,'0')}</span><a class="entrant" href="#/profile/${encodeURIComponent(e.handle||'')}" title="${escapeHtml(e.title||'')}">@${escapeHtml(e.handle||'unknown')}</a><span class="rate">${rate(e)}</span><span class="scorebar"><i style="width:${Math.max(0,Math.min(100,Number(e.values?.judge||0)/10000))}%"></i></span></div>`).join('') || `<div class="empty">No judged entries yet.</div>`;
}
async function boardPage(slug) {
  root.innerHTML=layout(`<main><section class="intro"><div><div class="eyebrow">Independent bounty explorer</div><h1>Build the best make.fun frontend</h1><p>A clear view of the work, the rewards and who's leading.</p></div><div class="livebox"><div class="live"><i class="dot"></i>Live public data</div><small id="hero-meter">Measuring first load…</small></div></section><section class="split"><aside class="panel board"><div class="section-head"><h2>Bounties</h2><span class="count" id="bounty-count">—</span></div><input class="search" id="search" placeholder="Find a bounty…" aria-label="Find a bounty"><div class="filters" aria-label="Filter bounties"><button class="active" data-status="open">Open</button><button data-status="resolved">Resolved</button></div><div class="cards" id="cards"><div class="loading">Loading live bounties…</div></div></aside><article class="panel detail" id="detail"><div class="loading">Loading bounty details…</div></article></section></main>`);
  try {
    const [sourceItems, detail, board]=await Promise.all([loadBoard(), request(`/competitions/${encodeURIComponent(slug)}?submissions=summary`), request(`/competitions/${encodeURIComponent(slug)}/leaderboard?rows=first&ties=runs`)]);
    const items=sourceItems.slice().sort((a,b)=>Number(a.slug!==slug)-Number(b.slug!==slug));
    leaders=board.entries||[]; leaderCount=leaders.length+(board.rest||[]).length;
    let statusFilter='open';
    const filter=()=>{const q=document.querySelector('#search').value.toLowerCase(); const list=items.filter(x=>(statusFilter==='resolved')===isClosed(x)).filter(x=>!q||`${x.title} ${x.sponsor?.name} ${x.category}`.toLowerCase().includes(q)); document.querySelector('#cards').innerHTML=list.map(x=>card(x,slug)).join('')||'<div class="empty">No matching bounties.</div>';};
    filter();
    document.querySelectorAll('[data-status]').forEach(button=>button.addEventListener('click',()=>{statusFilter=button.dataset.status;document.querySelectorAll('[data-status]').forEach(item=>item.classList.toggle('active',item===button));filter();})); document.querySelector('#bounty-count').textContent=`${items.filter(x=>!isClosed(x)).length} open · ${items.filter(isClosed).length} resolved`;
    document.querySelector('#search').addEventListener('input',filter);
    setInterval(()=>document.querySelectorAll('[data-deadline]').forEach(el=>el.textContent=timeLeft(el.dataset.deadline)),60000);
    document.querySelector('#detail').innerHTML=detailView(detail,leaders,3,leaderCount);
  } catch(err) { document.querySelector('#detail').innerHTML=`<p class="error">${escapeHtml(err.message)}. Refresh to try again.</p>`; }
  renderMeter();
}
async function bountyPage(slug) {
  root.innerHTML=layout(`<main><section class="page-title"><div class="eyebrow">Bounty details</div><h1>Rewards, dates &amp; live standings</h1><p>Current information from the public make.fun API</p></section><article class="panel detail" id="detail"><div class="loading">Loading bounty details…</div></article></main>`);
  try {
    const [d,b]=await Promise.all([request(`/competitions/${encodeURIComponent(slug)}?submissions=summary`),request(`/competitions/${encodeURIComponent(slug)}/leaderboard?rows=first&ties=runs`)]);
    document.querySelector('#detail').innerHTML=detailView(d,b.entries||[],20,(b.entries||[]).length+(b.rest||[]).length);
  } catch(err) { document.querySelector('#detail').innerHTML=`<p class="error">${escapeHtml(err.message)}. Refresh to try again.</p>`; }
  renderMeter();
}
function detailView(d, entries, rewardLimit=3, totalEntries=entries.length) {
  const status=isClosed(d), phase=d.phases?.[0]||{};
  const longDesc=String(d.description||'').split('\n')[0];
  const desc=longDesc.length>175 ? longDesc.slice(0,172).trimEnd()+'…' : longDesc;
  return `<div class="detail-head"><div><div class="crumb">Bounties / ${escapeHtml(d.category||'Open call')}</div><h2>${escapeHtml(d.title)}</h2></div><span class="tag ${status?'closed':''}">${status?'Resolved':escapeHtml(d.status||'Open')}</span></div><div class="sponsor-line"><span class="verified">✓</span>${escapeHtml(d.sponsor?.name||'make.fun')} · ${Number(d.submissionCount||0).toLocaleString()} entries · ${escapeHtml((d.skills||[]).slice(0,3).join(' · '))} · ${escapeHtml(fee(d))} entry fee</div><p class="detail-desc">${escapeHtml(desc)}</p>${rewardTable(d,rewardLimit)}<div class="metadata"><div class="meta"><span>Opened</span><b>${date(d.publishedAt||d.opensAt)}</b></div><div class="meta"><span>Deadline</span><b>${date(d.deadline)}</b></div><div class="meta"><span>Development</span><b>${date(phase.startsAt)} – ${date(phase.endsAt)}</b></div><div class="meta"><span>Final</span><b>${date(d.phases?.[1]?.startsAt)} – ${date(d.phases?.[1]?.endsAt)}</b></div></div><section class="leader"><div class="leader-head"><strong>Leaderboard · Judge win rate</strong><a href="#/bounty/${encodeURIComponent(d.slug)}/leaderboard">Full leaderboard ↗</a></div><div class="leader-labels"><span>#</span><span>Entrant</span><span style="text-align:right">Win rate</span><span>Score</span></div>${leaderRows(entries)}<div class="leader-foot"><span>${entries.length} shown · ${totalEntries} ranked · live API</span><a href="#/bounty/${encodeURIComponent(d.slug)}/leaderboard">View all →</a></div></section>`;
}
async function leaderboardPage(slug) {
  root.innerHTML=layout(`<main><section class="page-title"><div class="eyebrow">Live standings</div><h1>Leaderboard</h1><p>Judge win rate · ${escapeHtml(slug)}</p></section><section class="panel" id="table"><div class="loading">Loading ranked entries…</div></section></main>`,'leaderboard');
  try {
    const b=await request(`/competitions/${encodeURIComponent(slug)}/leaderboard`);
    const entries=b.entries||[];
    document.querySelector('#table').innerHTML=`<table class="full-table"><thead><tr><th>Place</th><th>Entrant</th><th>Entry</th><th>Judge win rate</th></tr></thead><tbody>${entries.map(e=>`<tr><td class="rank">${e.rank??'—'}</td><td><a class="entrant" href="#/profile/${encodeURIComponent(e.handle||'')}">@${escapeHtml(e.handle||'unknown')}</a></td><td>${escapeHtml(e.title||'—')}</td><td class="rate">${rate(e)}</td></tr>`).join('')}</tbody></table>`;
    document.querySelector('.page-title p').textContent=`${entries.length} entries · Judge win rate · updated from live API`;
  } catch(err) { document.querySelector('#table').innerHTML=`<p class="error">${escapeHtml(err.message)}</p>`; }
  renderMeter();
}
async function profilePage(handle) {
  root.innerHTML=layout(`<main><section class="page-title"><div class="eyebrow">Community</div><h1>Public profile</h1><p>Live account details from make.fun</p></section><section id="profile" class="loading">Loading public profile…</section></main>`);
  try {
    const p=await request(`/profiles/${encodeURIComponent(handle)}`), r=p.record||{};
    const entered=Number(r.competitions_entered||0), won=Number(r.competitions_won||0), prize=money(r.prize_usd||0);
    const solutions=(p.solutions||[]).slice(0,8);
    document.querySelector('#profile').className='profile';
    document.querySelector('#profile').innerHTML=`<section class="panel profile-card"><div class="avatar">${escapeHtml((p.display_name||handle).slice(0,1).toUpperCase())}</div><h2>${escapeHtml(p.display_name||handle)}</h2><div class="handle">@${escapeHtml(p.handle||handle)}</div><div class="stats"><div class="stat"><b>${entered}</b><span>Entered</span></div><div class="stat"><b>${won}</b><span>Won</span></div><div class="stat"><b>${prize}</b><span>Prizes</span></div></div></section><section class="panel activity"><h3>Recent entries</h3>${solutions.map(s=>`<div class="activity-row"><div><a href="#/bounty/${encodeURIComponent(s.competition?.slug||'')}">${escapeHtml(s.title)}</a><small>${escapeHtml(s.competition?.title||'Competition')} · ${date(s.entered_at)}</small></div><span>${s.placement?`#${s.placement}`:'Entered'}</span></div>`).join('')||'<div class="empty">No public entries yet.</div>'}</section>`;
  } catch(err) { document.querySelector('#profile').innerHTML=`<p class="error">${escapeHtml(err.message)}</p>`; }
  renderMeter();
}