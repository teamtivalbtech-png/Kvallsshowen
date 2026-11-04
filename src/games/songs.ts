// Spelar 30-sekundersklipp som hämtas via /api/song.
const cache=new Map<string,string|null>();
export async function previewUrl(s:{t:string,a:string}):Promise<string|null>{
  const k=s.a+s.t;if(cache.has(k))return cache.get(k)!;
  try{const r=await fetch(`/api/song?t=${encodeURIComponent(s.t)}&a=${encodeURIComponent(s.a)}`);const j=await r.json();cache.set(k,j.url||null);return j.url||null}catch{return null}}
const au=typeof Audio!=='undefined'?new Audio():null as any;if(au)au.preload='auto';
export const audioState={blocked:false,sub:new Set<()=>void>()};const flag=(b:boolean)=>{audioState.blocked=b;audioState.sub.forEach(f=>f())};
export function unlockSong(){try{au.src='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';au.play().then(()=>flag(false)).catch(()=>{})}catch{}}
let fadeT:any=0,tok=0,ducked=false;
function fade(to:number,ms:number,done?:()=>void){clearInterval(fadeT);const from=au.volume,t0=performance.now();fadeT=setInterval(()=>{const k=Math.min(1,(performance.now()-t0)/ms);au.volume=Math.max(0,Math.min(1,from+(to-from)*k));if(k>=1){clearInterval(fadeT);done?.()}},40)}
const lvl=()=>ducked?.3:1;
export function songDuck(on:boolean){ducked=on;if(!au.paused)fade(lvl(),350)}
export async function playSong(s:any){const u=await previewUrl(s);if(!u)return false;const t=++tok;try{clearInterval(fadeT);au.volume=0;au.src=u;await au.play();if(t!==tok){return true}fade(lvl(),1400);flag(false);return true}catch(e:any){console.warn('låt',e);if(e?.name==='NotAllowedError')flag(true);return false}}
export function stopSong(){tok++;if(au.paused)return;const t=tok;fade(0,800,()=>{if(t===tok)au.pause()})}
export function resumeSong(){tok++;au.play().catch(()=>{});fade(lvl(),600)}
