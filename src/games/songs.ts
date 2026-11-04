// Spelar 30-sekundersklipp från iTunes. Laddas i tv:ns webbläsare via JSONP.
let n=0;const cache=new Map<string,string|null>();
export function previewUrl(s:{t:string,a:string}):Promise<string|null>{
  const k=s.a+s.t;if(cache.has(k))return Promise.resolve(cache.get(k)!);
  return new Promise(ok=>{const cb='itcb'+(++n),e=document.createElement('script');const done=(u:string|null)=>{cache.set(k,u);delete (window as any)[cb];e.remove();ok(u)};const to=setTimeout(()=>done(null),4000);
    (window as any)[cb]=(r:any)=>{clearTimeout(to);const m=(r.results||[]).find((x:any)=>x.previewUrl&&x.artistName.toLowerCase().includes(s.a.toLowerCase().slice(0,4)))||r.results?.[0];done(m?.previewUrl||null)};
    e.onerror=()=>{clearTimeout(to);done(null)};e.src=`https://itunes.apple.com/search?term=${encodeURIComponent(s.a+' '+s.t)}&media=music&entity=song&limit=5&country=SE&callback=${cb}`;document.head.appendChild(e)})}
const au=typeof Audio!=='undefined'?new Audio():null as any;if(au)au.preload='auto';
export async function playSong(s:any){const u=await previewUrl(s);if(!u)return false;try{au.src=u;au.currentTime=0;au.volume=1;await au.play();return true}catch{return false}}
export function stopSong(){try{au.pause()}catch{}}
export function resumeSong(){au.play().catch(()=>{})}
