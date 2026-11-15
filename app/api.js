const ROOT='https://make.fun/api';
const memory=new Map();
const TTL=60_000;
export async function get(path){
  const key=ROOT+path, now=Date.now(), cached=memory.get(key);
  if(cached&&now-cached.time<TTL)return cached.value;
  try{
    const res=await fetch(key,{headers:{Accept:'application/json'}});
    if(!res.ok)throw new Error(`API ${res.status}`);
    const value=await res.json();memory.set(key,{value,time:now});
    try{sessionStorage.setItem('fn:'+key,JSON.stringify({time:now,value}));}catch{}
    return value;
  }catch(error){
    if(cached)return cached.value;
    try{const old=JSON.parse(sessionStorage.getItem('fn:'+key)||'null');if(old?.value)return old.value;}catch{}
    throw error;
  }
}
export async function bounties(){
  async function byStatus(status){
    let cursor='',all=[],pages=0;
    do{const q=new URLSearchParams({status,activity:'times',limit:'100'});if(cursor)q.set('cursor',cursor);const data=await get('/competitions?'+q);all.push(...(data.items||[]));cursor=data.next_cursor||'';pages++;}while(cursor&&pages<8);
    return all;
  }
  const [open,resolved]=await Promise.allSettled([byStatus('open'),byStatus('resolved')]);
  if(open.status==='rejected'&&resolved.status==='rejected')throw open.reason;
  return [...(open.status==='fulfilled'?open.value:[]),...(resolved.status==='fulfilled'?resolved.value:[])];
}
export const bounty=slug=>get('/competitions/'+encodeURIComponent(slug)+'?submissions=summary');
export const leaderboard=slug=>get('/competitions/'+encodeURIComponent(slug)+'/leaderboard?rows=first');
export const profile=handle=>get('/profiles/'+encodeURIComponent(handle));
