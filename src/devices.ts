// iPhone (Safari) och Android (Chrome/Samsung Internet): alla sensorer måste startas från ett tryck.
export const isIOS=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
export function buzz(ms:number|number[]=15){try{navigator.vibrate?.(ms)}catch{}} // Safari saknar vibration, tyst reserv
let lock:any=null;
export async function keepAwake(){try{lock=await (navigator as any).wakeLock?.request('screen');}catch{}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')keepAwake()});
export const tilt={gamma:0,beta:0,alpha:0,ok:false};
export const motion={shake:0};
let lastA=0;
function onO(e:DeviceOrientationEvent){tilt.gamma=e.gamma||0;tilt.beta=e.beta||0;tilt.alpha=e.alpha||0;tilt.ok=true}
function onM(e:DeviceMotionEvent){const a=e.accelerationIncludingGravity;if(!a)return;const m=Math.abs(a.x||0)+Math.abs(a.y||0)+Math.abs(a.z||0);if(Math.abs(m-lastA)>14)motion.shake++;lastA=m}
export async function askMotion():Promise<boolean>{
  try{const D:any=DeviceOrientationEvent;if(typeof D?.requestPermission==='function'){if(await D.requestPermission()!=='granted')return false;const M:any=DeviceMotionEvent;if(M.requestPermission)await M.requestPermission().catch(()=>{})}}catch{return false}
  window.addEventListener('deviceorientation',onO);window.addEventListener('devicemotion',onM);return true;
}
let cam:MediaStream|null=null,mic:MediaStream|null=null;
export async function getCam(facing:'user'|'environment'){
  if(cam&&(cam as any)._f===facing&&cam.active)return cam;cam?.getTracks().forEach(t=>t.stop());
  cam=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:facing},width:{ideal:640},height:{ideal:480}},audio:false});(cam as any)._f=facing;return cam;
}
export function stopCam(){cam?.getTracks().forEach(t=>t.stop());cam=null}
export let micCtx:AudioContext|null=null;
export async function getMic(){if(!micCtx){micCtx=new (window.AudioContext||(window as any).webkitAudioContext)()}micCtx.resume().catch(()=>{});if(mic?.active)return mic;mic=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});return mic}
/** Autokorrelation: returnerar tonhöjd i Hz eller 0 om det är tyst. */
export function pitch(buf:Float32Array,sr:number){
  let rms=0;for(const v of buf)rms+=v*v;if(Math.sqrt(rms/buf.length)<.012)return 0;
  const n=buf.length>>1;let best=-1,bv=0;let prev=1;let rising=false;
  for(let lag=Math.floor(sr/1000);lag<Math.floor(sr/70)&&lag<n;lag++){let c=0;for(let i=0;i<n;i++)c+=buf[i]*buf[i+lag];
    if(c>prev)rising=true;if(rising&&c>bv){bv=c;best=lag}prev=c}
  return best>0?sr/best:0;
}
