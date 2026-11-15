const ROOT='https://make.fun/api';
const fresh=new Map();
export async function get(path){
  const key=ROOT+path, cached=fresh.get(key), now=Date.now();
  if(cached&&now-cached.at<45000)return cached.value;
  const headers={Accept:'application/json'};
  if(cached?.etag)headers['If-None-Match']=cached.etag;
  const response=await fetch(key,{headers});
  if(response.status===304&&cached){cached.at=now;return cached.value;}
  if(!response.ok)throw new Error(`make.fun API returned ${response.status}`);
  const value=await response.json();fresh.set(key,{value,at:now,etag:response.headers.get('ETag')});return value;
}
export const bounties=()=>get('/competitions?status=open&activity=times');
export const bounty=slug=>get(`/competitions/${encodeURIComponent(slug)}?submissions=summary`);
export const leaderboard=slug=>get(`/competitions/${encodeURIComponent(slug)}/leaderboard?rows=first`);
export const profile=handle=>get(`/profiles/${encodeURIComponent(handle)}`);
