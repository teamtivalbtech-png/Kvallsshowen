import {level,canvasMax} from '../lite';import {rs} from '../rand';import React from 'react';import {Api,Inst} from '../types';
export const shuffle=<T,>(a:T[])=>[...a].sort(rs());
export const norm=(s:string)=>String(s).toLowerCase().normalize('NFC').replace(/[^a-zåäö0-9 ]/g,'').replace(/\s+/g,' ').trim();
export const pts=(ms:number,lim:number,mx=1000)=>Math.round(mx*(.5+.5*Math.max(0,1-ms/lim)));
export abstract class RB implements Inst{
  idx=-1;phase='q';ans:Record<string,any>={};t0=0;items:any[]=[];qms=20000;revealMs=6000;mood='tense';quiet=false;
  constructor(public api:Api){}
  setup(){};begin(){};abstract score():void;abstract ask(pid:string):any;
  start(){this.setup();this.api.music(this.mood);this.nextRound()}
  nextRound(){this.idx++;if(this.idx>=this.items.length)return this.api.end();this.ans={};this.phase='q';this.t0=this.api.now();this.begin();this.api.countdown(this.qms,()=>this.close());this.api.refresh()}
  get cur(){return this.items[this.idx]}
  answerers(){return this.api.online()}
  close(){if(this.phase!=='q')return;this.phase='reveal';this.api.stopCountdown();const sum=()=>this.api.players().reduce((n,p)=>n+(this.api.raw(p.id)||0),0),was=sum();this.score();this.api.sfx('reveal');if(!this.quiet)this.api.quip(sum()>was);this.api.after(this.revealMs,()=>this.nextRound());this.api.refresh()}
  sel(p:string){return this.ans[p]?.v}
  ok(a:any){return true}
  onInput(p:string,d:any){if(this.phase!=='q'||p in this.ans||d?.a==null||(typeof d.a==='object'&&!Array.isArray(d.a))||!this.ok(d.a))return;this.ans[p]={v:typeof d.a==='string'?d.a.slice(0,200):d.a,t:this.api.now()-this.t0};this.api.stat(p,'ans',1);this.api.stat(p,'ms',this.ans[p].t);this.api.sfx('tick');if(this.answerers().every(x=>x.id in this.ans))this.close();this.api.refresh()}
  onLeave(){if(this.phase==='q'&&this.answerers().length&&this.answerers().every(x=>x.id in this.ans))this.close()}
  phone(p:string){if(this.phase==='q')return{...this.ask(p),key:this.idx+this.phase};return this.result(p)}
  result(p:string):any{return{k:'wait',msg:'Se tv:n',key:'r'+this.idx}}
}
export function Stage({kicker,title,children,img}:any){return <div className="stg">{kicker&&<div className="kick">{kicker}</div>}<h1 className="qt" key={typeof title==='string'?title:undefined}>{title}</h1>{children}</div>}
export function Answered({g,show}:any){const ps=show.players;return <div className="ansrow">{ps.map((p:any)=><span key={p.id} className={(p.id in g.ans?'in ':'')+(p.connected?'':'off')} style={{borderColor:p.color}}><Av p={p}/></span>)}</div>}
/** Svarsalternativen. När rätt svar visas syns också vilka som valde vad. */
export function Opts({list,right,counts,g}:any){const ps=right!=null&&g?.ans?(g.api?.players?.()||[]):[];const who=(o:string,i:number)=>ps.filter((p:any)=>{const v=g.ans[p.id]?.v;return v===o||v===i});return <div className="tvopts">{list.map((o:string,i:number)=>{const w=who(o,i);return <div key={i+':'+o} className={'tvo c'+(i%4)+(right!=null?(o===right?' r':' x'):'')+(w.length?' has':'')}><b>{'ABCDEFGH'[i]}</b><span>{o}</span>{counts&&<em>{counts[o]||''}</em>}{w.length>0&&<i className="tvwho">{w.map((p:any)=><Av key={p.id} p={p}/>)}</i>}</div>})}</div>}
export const Av=({p}:any)=>p?.photo?<img className="av" src={p.photo} alt={p.name}/>:<span className="av em">{p?.avatar}</span>;
export const nameOf=(show:any,id:string)=>show.players.find((p:any)=>p.id===id);
/** Spelyta på canvas. Ritas i lägre upplösning och skalas upp, draw får ändå elementets storlek i px. */
export function Canvas({draw}:{draw:(c:CanvasRenderingContext2D,w:number,h:number)=>void}){
  const r=React.useRef<HTMLCanvasElement>(null);React.useEffect(()=>{let f=0,n=0,w=0,h=0,k=1,x:CanvasRenderingContext2D|null=null;const go=()=>{f=requestAnimationFrame(go);const c=r.current;if(!c)return;n++;if(level>1&&n%2)return;if(!w||n%45===1){const W=c.clientWidth,H=c.clientHeight,K=Math.min(1,canvasMax()/Math.max(1,W)),cw=Math.round(W*K);if(W!==w||H!==h||c.width!==cw){w=W;h=H;k=K;c.width=cw;c.height=Math.round(H*K)}}if(!w)return;x=x||c.getContext('2d');if(!x)return;x.setTransform(k,0,0,k,0,0);try{draw(x,w,h)}catch(e){console.error(e)}};go();return()=>cancelAnimationFrame(f)},[draw]);
  return <canvas ref={r} className="cv"/>;
}
