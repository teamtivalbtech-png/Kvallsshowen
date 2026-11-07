// Håller koll på om tv-sidan ligger i bakgrunden (appen stängd med hemknappen, fliken byttes). Då ska allt ljud tystna.
let hidden=false,doc=false,pz=false;const subs=new Set<(h:boolean)=>void>();
function set(h:boolean){doc=h;apply()}
function apply(){const h=doc||pz;if(h===hidden)return;hidden=h;subs.forEach(f=>{try{f(h)}catch{}})}
export const isBg=()=>hidden;
/** Spelledaren pausade: tysta allt precis som när appen läggs i bakgrunden. */
export function setPaused(p:boolean){pz=p;apply()}
export function onBg(f:(h:boolean)=>void){subs.add(f);return()=>subs.delete(f)}
if(typeof document!=='undefined'){
  document.addEventListener('visibilitychange',()=>set(document.visibilityState==='hidden'));
  window.addEventListener('pagehide',()=>set(true));window.addEventListener('pageshow',()=>set(document.visibilityState==='hidden'));
  // Tv-appen anropar den här när den läggs i bakgrunden eller kommer tillbaka.
  (window as any).__bg=(h:any)=>set(!!h);
}
