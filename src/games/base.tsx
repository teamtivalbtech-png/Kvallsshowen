import React from 'react';import {Api,Inst} from '../types';
export const shuffle=<T,>(a:T[])=>[...a].sort(()=>Math.random()-.5);
export const norm=(s:string)=>String(s).toLowerCase().normalize('NFC').replace(/[^a-zåäö0-9 ]/g,'').replace(/\s+/g,' ').trim();
export const pts=(ms:number,lim:number,mx=1000)=>Math.round(mx*(.5+.5*Math.max(0,1-ms/lim)));
export abstract class RB implements Inst{
  idx=-1;phase='q';ans:Record<string,any>={};t0=0;items:any[]=[];qms=20000;revealMs=6000;mood='tense';
  constructor(public api:Api){}
  setup(){};begin(){};abstract score():void;abstract ask(pid:string):any;
  start(){this.setup();this.api.music(this.mood);this.nextRound()}
  nextRound(){this.idx++;if(this.idx>=this.items.length)return this.api.end();this.ans={};this.phase='q';this.t0=this.api.now();this.begin();this.api.countdown(this.qms,()=>this.close());this.api.refresh()}
  get cur(){return this.items[this.idx]}
  answerers(){return this.api.online()}
  close(){if(this.phase!=='q')return;this.phase='reveal';this.api.stopCountdown();this.score();this.api.sfx('reveal');this.api.quip(Math.random()<.5);this.api.after(this.revealMs,()=>this.nextRound());this.api.refresh()}
  sel(p:string){return this.ans[p]?.v}
  onInput(p:string,d:any){if(this.phase!=='q'||p in this.ans)return;this.ans[p]={v:d.a,t:this.api.now()-this.t0};this.api.sfx('tick');if(this.answerers().every(x=>x.id in this.ans))this.close();this.api.refresh()}
  onLeave(){if(this.phase==='q'&&this.answerers().length&&this.answerers().every(x=>x.id in this.ans))this.close()}
  phone(p:string){if(this.phase==='q')return{...this.ask(p),key:this.idx+this.phase};return this.result(p)}
  result(p:string):any{return{k:'wait',msg:'Se tv:n',key:'r'+this.idx}}
}
export function Stage({kicker,title,children,img}:any){return <div className="stg">{kicker&&<div className="kick">{kicker}</div>}<h1 className="qt">{title}</h1>{children}</div>}
export function Answered({g,show}:any){const ps=show.players;return <div className="ansrow">{ps.map((p:any)=><span key={p.id} className={(p.id in g.ans?'in ':'')+(p.connected?'':'off')} style={{borderColor:p.color}}><Av p={p}/></span>)}</div>}
export function Opts({list,right,counts}:any){return <div className="tvopts">{list.map((o:string,i:number)=><div key={o} className={'tvo c'+(i%4)+(right!=null?(o===right?' r':' x'):'')}><b>{'ABCD'[i]}</b><span>{o}</span>{counts&&<em>{counts[o]||''}</em>}</div>)}</div>}
export const Av=({p}:any)=>p?.photo?<img className="av" src={p.photo} alt={p.name}/>:<span className="av em">{p?.avatar}</span>;
export const nameOf=(show:any,id:string)=>show.players.find((p:any)=>p.id===id);
export function Canvas({draw}:{draw:(c:CanvasRenderingContext2D,w:number,h:number)=>void}){
  const r=React.useRef<HTMLCanvasElement>(null);React.useEffect(()=>{let f=0;const go=()=>{const c=r.current;if(c){const w=c.clientWidth,h=c.clientHeight;if(c.width!==w){c.width=w;c.height=h}draw(c.getContext('2d')!,w,h)}f=requestAnimationFrame(go)};go();return()=>cancelAnimationFrame(f)},[draw]);
  return <canvas ref={r} className="cv"/>;
}
