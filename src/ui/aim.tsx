import React,{useEffect,useRef,useState} from 'react';import {buzz} from '../devices';import {getCam} from '../devices';
declare const AR:any;
let load:Promise<void>|null=null;
export function loadAruco(){return load||=new Promise((ok,no)=>{const a=(s:string,n?:()=>void)=>{const e=document.createElement('script');e.src=s;e.onload=()=>n?n():ok();e.onerror=no;document.head.appendChild(e)};a('/aruco/cv.js',()=>a('/aruco/aruco.js'))})}
export const PANEL=5/6;export const S=.16,SY=S*PANEL,M=.02,MY=M*PANEL;
export const box=(i:number)=>({x:i%2?1-M-S:M,y:i>>1?1-MY-SY:MY});
export const CORN=(i:number)=>{const{x,y}=box(i);return[[x,y],[x+S,y],[x+S,y+SY],[x,y+SY]]};
export const svg=(id:number)=>new AR.Dictionary('ARUCO').generateSVG(id);
/** Beräknar 3×3-homografi (minsta kvadrat) från bildpunkter till panelkoordinater. */
export function homography(src:number[][],dst:number[][]){
  const A=Array.from({length:8},()=>new Array(9).fill(0));
  for(let i=0;i<src.length;i++){const[x,y]=src[i],[u,v]=dst[i];const r=[[x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]];
    for(const q of r)for(let a=0;a<8;a++)for(let b=0;b<9;b++)A[a][b]+=q[a]*q[b]}
  for(let i=0;i<8;i++){let p=i;for(let j=i+1;j<8;j++)if(Math.abs(A[j][i])>Math.abs(A[p][i]))p=j;[A[i],A[p]]=[A[p],A[i]];if(Math.abs(A[i][i])<1e-12)return null;
    for(let j=0;j<8;j++)if(j!==i){const f=A[j][i]/A[i][i];for(let k=i;k<9;k++)A[j][k]-=f*A[i][k]}}
  return A.map((r,i)=>r[8]/r[i]).concat(1);
}
export const apply=(h:number[],x:number,y:number)=>{const w=h[6]*x+h[7]*y+h[8];return[(h[0]*x+h[1]*y+h[2])/w,(h[3]*x+h[4]*y+h[5])/w]};
export function locate(markers:any[],base:number,cx:number,cy:number){
  const src:number[][]=[],dst:number[][]=[];let n=0;
  for(const m of markers){const i=m.id-base;if(i<0||i>3)continue;n++;const c=CORN(i);m.corners.forEach((p:any,k:number)=>{src.push([p.x,p.y]);dst.push(c[k])})}
  if(n<1)return null;const h=homography(src,dst);if(!h)return null;const[x,y]=apply(h,cx,cy);return{x,y,n};
}
export function Aim({base,color,ammo,link,rate,score}:any){
  const v=useRef<HTMLVideoElement>(null);const[lock,setL]=useState(0);const[mode,setM]=useState<'cam'|'touch'>('cam');const[err,setE]=useState('');const[direct,setD]=useState(false);useEffect(()=>{const i=setInterval(()=>setD(link.fast()),1000);return()=>clearInterval(i)},[]);const[zoom,setZ]=useState(2);const zr=useRef(2);const dig=useRef(2);const hw=useRef<any>(null);const pos=useRef({x:.5,y:.5});const sm=useRef<any>(null);const last=useRef(0);
  const[fl,setFl]=useState(0);function shot(){setFl(n=>n+1);try{const A=(window as any).__sc||=new (window.AudioContext||(window as any).webkitAudioContext)();A.resume();const o=A.createOscillator(),g=A.createGain();o.type='square';o.frequency.setValueAtTime(190,A.currentTime);o.frequency.exponentialRampToValueAtTime(60,A.currentTime+.09);g.gain.setValueAtTime(.25,A.currentTime);g.gain.exponentialRampToValueAtTime(.001,A.currentTime+.1);o.connect(g);g.connect(A.destination);o.start();o.stop(A.currentTime+.11)}catch{}}
  function applyZoom(z:number){zr.current=z;setZ(z);const H=hw.current;let rest=z;if(H){const hz=Math.max(H.min,Math.min(H.max,z));H.tr.applyConstraints({advanced:[{zoom:hz}]}).catch(()=>{});rest=z/hz}dig.current=rest;if(v.current)v.current.style.transform=`scale(${rest})`}
  const wasLock=useRef(true);useEffect(()=>{const on=mode==='touch'||lock>0;if(!on&&wasLock.current)buzz([80,60,80]);wasLock.current=on},[lock,mode]);
  useEffect(()=>{if(mode!=='cam')return;let stop=false,t:any;
    (async()=>{try{await loadAruco();const s=await getCam('environment');const V=v.current!;V.srcObject=s;const tr:any=s.getVideoTracks()[0];const cap=tr.getCapabilities?.()||{};hw.current=cap.zoom?{tr,max:cap.zoom.max,min:cap.zoom.min}:null;applyZoom(zr.current);await V.play().catch(()=>{});
      const det=new AR.Detector({dictionaryName:'ARUCO',maxHammingDistance:2});const c=document.createElement('canvas'),x=c.getContext('2d',{willReadFrequently:true})!;
      const run=()=>{if(stop)return;if(V.videoWidth){const w=640,h=Math.round(w*V.videoHeight/V.videoWidth);c.width=w;c.height=h;const z=dig.current,sw=V.videoWidth/z,sh=V.videoHeight/z;x.drawImage(V,(V.videoWidth-sw)/2,(V.videoHeight-sh)/2,sw,sh,0,0,w,h);const m=det.detect(x.getImageData(0,0,w,h));const r=locate(m,base,w/2,h/2);
        if(r&&r.x>-.3&&r.x<1.3&&r.y>-.3&&r.y<1.3){const k=sm.current?.75:1;sm.current=sm.current?{x:sm.current.x+(r.x-sm.current.x)*k,y:sm.current.y+(r.y-sm.current.y)*k}:r;pos.current=sm.current;last.current=Date.now();setL(r.n)}else if(Date.now()-last.current>500){setL(0);sm.current=null}}
        t=setTimeout(run,12)};run()}catch(e){setE('Kameran kunde inte startas');setM('touch')}})();
    return()=>{stop=true;clearTimeout(t)}},[mode,base]);
  useEffect(()=>{const i=setInterval(()=>{link.stream({x:+pos.current.x.toFixed(3),y:+pos.current.y.toFixed(3),l:mode==='touch'||last.current>Date.now()-500?1:0})},link.fast()?25:Math.min(1000/rate,50));return()=>clearInterval(i)},[rate,mode,direct]);
  const drag=(e:any)=>{if(mode==='touch'&&e.buttons!==0||e.pointerType==='touch'&&mode==='touch'){pos.current={x:Math.max(0,Math.min(1,pos.current.x+e.movementX/220)),y:Math.max(0,Math.min(1,pos.current.y+e.movementY/220))}}};
  return <div className="aim" style={{'--c':color} as any}>
    <div className={'scope '+(lock?'lock':'')} onPointerMove={drag}>{mode==='cam'?<video ref={v} playsInline muted/>:<div className="padhint">Dra här för att sikta</div>}<i className="cross"/>{fl>0&&<i key={fl} className="muzzle"/>}{mode==='cam'&&!lock&&<div className="nolock"><b>Ingen spårning</b><span>Rikta mot din halva av tv:n så att de svartvita rutorna syns. Backa eller zooma ut.</span></div>}<span className="st">{direct?'⚡ Direktlänk · ':''}{mode==='cam'?(lock?`Spårning klar · ${lock} markör${lock>1?'er':''}`:'Söker markörer'):'Pekstyrning'}</span></div>
    {err&&<p className="note">{err}</p>}
    {mode==='cam'&&<div className="zoomrow">{[1,1.5,2,3].map(q=><button key={q} className={zoom===q?'on':''} onClick={()=>applyZoom(q)}>{String(q).replace('.',',')}x</button>)}</div>}<div className="aimrow"><button className="fire" onPointerDown={()=>{buzz(30);shot();const sid=Date.now(),x=pos.current.x,y=pos.current.y,t=link.host();link.stream({x,y,l:1,sid,t});link.input({a:'shoot',x,y,t,sid})}}>SKJUT</button></div>
    <button className="mini" onClick={()=>setM(m=>m==='cam'?'touch':'cam')}>{mode==='cam'?'Byt till pekstyrning':'Byt till kamera'}</button>
  </div>;
}
(window as any).__locate=locate;
