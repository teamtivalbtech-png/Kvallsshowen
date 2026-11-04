// Spelar 30-sekundersklipp som hämtas via /api/song.
const cache=new Map<string,string|null>();
export async function previewUrl(s:{t:string,a:string}):Promise<string|null>{
  const k=s.a+s.t;if(cache.has(k))return cache.get(k)!;
  try{const r=await fetch(`/api/song?t=${encodeURIComponent(s.t)}&a=${encodeURIComponent(s.a)}`);const j=await r.json();cache.set(k,j.url||null);return j.url||null}catch{return null}}
const au=typeof Audio!=='undefined'?new Audio():null as any;if(au)au.preload='auto';
export const audioState={blocked:false,sub:new Set<()=>void>()};const flag=(b:boolean)=>{audioState.blocked=b;audioState.sub.forEach(f=>f())};
export function unlockSong(){try{au.src='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';au.play().then(()=>flag(false)).catch(()=>{})}catch{}}
export async function playSong(s:any){const u=await previewUrl(s);if(!u)return false;try{au.src=u;au.volume=1;await au.play();flag(false);return true}catch(e:any){console.warn('låt',e);if(e?.name==='NotAllowedError')flag(true);return false}}
export function stopSong(){try{au.pause()}catch{}}
export function resumeSong(){au.play().catch(()=>{})}
