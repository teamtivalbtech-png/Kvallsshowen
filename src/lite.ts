// Anpassar utseendet efter vad apparaten orkar. Nivå 0: allt på. 1: inga dyra skuggor och oskärpa, lägre upplösning på spelytor. 2: dessutom inga dekorativa loopar.
const q=new URLSearchParams(location.search);const KEY='ks-lite-v1';
const TV=/SmartTV|SMART-TV|Tizen|Web0S|WebOS|BRAVIA|GoogleTV|Android TV|AFT[A-Z]|HbbTV|VIDAA|NetCast|Viera|CrKey|TV Safari/i;
export let level=0;
function set(n:number,keep=true){level=n;const c=document.documentElement.classList;c.toggle('lite',n>0);c.toggle('lite2',n>1);if(keep)try{localStorage.setItem(KEY,JSON.stringify({l:n,at:Date.now()}))}catch{}}
/** Hur stor spelyta (px bredd) som ritas just nu. Skalas upp av webbläsaren. */
export const canvasMax=()=>level>1?800:level>0?1024:1280;
export const scene3d=()=>level>1?.42:level>0?.55:.72;
export function startLite(){
  const f=q.get('lite');if(f!==null){set(+f||0,false);return}
  let n=0;try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&Date.now()-s.at<864e5)n=+s.l||0}catch{}
  if(TV.test(navigator.userAgent))n=Math.max(1,n);set(n,false);
  let t0=performance.now()+6000,fr=0,bad=0;
  const go=(t:number)=>{requestAnimationFrame(go);if(document.hidden){t0=t+1500;fr=0;bad=0;return}if(t<t0){fr=0;return}fr++;const d=t-t0;if(d<3000)return;const fps=fr*1000/d;t0=t;fr=0;
    if(fps<36){if(++bad>=2&&level<2){set(level+1);bad=0;t0=t+3000}}else bad=0};
  requestAnimationFrame(go);
}
