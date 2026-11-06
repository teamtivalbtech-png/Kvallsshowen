// Spelar 30-sekundersklipp som hämtas via /api/song.
const cache=new Map<string,string|null>();
export async function previewUrl(s:{t:string,a:string}):Promise<string|null>{
  const k=s.a+s.t;if(cache.has(k))return cache.get(k)!;
  try{const r=await fetch(`/api/song?t=${encodeURIComponent(s.t)}&a=${encodeURIComponent(s.a)}`);const j=await r.json();cache.set(k,j.url||null);return j.url||null}catch{return null}}
const au=typeof Audio!=='undefined'?new Audio():null as any;if(au)au.preload='auto';
export const audioState={blocked:false,sub:new Set<()=>void>()};const flag=(b:boolean)=>{audioState.blocked=b;audioState.sub.forEach(f=>f())};
export function unlockSong(){try{au.src='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';au.play().then(()=>flag(false)).catch(()=>{})}catch{}}
let fadeT:any=0,tok=0,ducked=false,wanted=-1;
function fade(to:number,ms:number,done?:()=>void){clearInterval(fadeT);const from=au.volume,t0=performance.now();fadeT=setInterval(()=>{const k=Math.min(1,(performance.now()-t0)/ms);au.volume=Math.max(0,Math.min(1,from+(to-from)*k));if(k>=1){clearInterval(fadeT);done?.()}},40)}
const lvl=()=>ducked?.3:1;
let leaving=false;
export function songDuck(on:boolean){ducked=on;if(!au.paused&&!leaving)fade(lvl(),700)}
const stale=()=>new Promise<any>(()=>{});let on=0;
const binUrl=(s:any)=>`/api/song?bin=1&t=${encodeURIComponent(s.t)}&a=${encodeURIComponent(s.a)}`;
export async function playSong(s:any){const t=++tok;const u=await previewUrl(s);if(t!==tok)return stale();if(!u)return false;on=t;
  if(!au.paused&&au.volume>.02){leaving=true;await new Promise<void>(r=>fade(0,1800,r));leaving=false;if(t!==tok)return stale()}
  const go=async(src:string)=>{clearInterval(fadeT);au.volume=0;au.src=src;await au.play()};
  try{try{await go(u)}catch(e:any){if(e?.name==='NotAllowedError'||t!==tok)throw e;await go(binUrl(s))}
    if(t!==tok){if(on===t)au.pause();return stale()}wanted=t;leaving=false;fade(lvl(),2000);flag(false);return true}
  catch(e:any){if(t!==tok)return stale();console.warn('låt',e);if(e?.name==='NotAllowedError')flag(true);return false}}
// Klippen är bara 30 sekunder. I stället för att tystna tvärt tonas de ner och börjar om mjukt.
// Längden är okänd för vissa ljudkällor, då räknas klippet som 30 sekunder.
const again=()=>{leaving=false;try{au.currentTime=0;au.play().catch(()=>{});fade(lvl(),1800)}catch{}};
if(au){setInterval(()=>{if(au.paused||leaving)return;const d=au.duration&&isFinite(au.duration)?au.duration:30;if(d-au.currentTime>2.6)return;const t=tok;leaving=true;fade(0,2300,()=>{if(t===tok)again();else leaving=false})},200);
 // Tog ljudet ändå slut, till exempel efter ett nätavbrott, börjar det om mjukt i stället för att vara tyst.
 au.addEventListener('ended',()=>{if(wanted===tok)again()})}
export function stopSong(ms=2500){tok++;if(au.paused)return;const t=tok;leaving=true;fade(0,ms,()=>{leaving=false;if(t===tok)au.pause()})}
export function resumeSong(){tok++;au.play().catch(()=>{});fade(lvl(),1500)}
