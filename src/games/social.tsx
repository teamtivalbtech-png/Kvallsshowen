import React,{useEffect,useRef} from 'react';import {Av,RB,shuffle,norm,Stage,Answered,Opts,nameOf,pts} from './base';import {WORDS,FIB,WHO,LIKE,SPY,MIME,SELFIE} from '../content/more';
class Draw{phase='draw';turn=0;order:any[]=[];word='';strokes:any[]=[];got:Record<string,number>={};rounds=0;constructor(public api:any){}
 start(){this.api.music('lobby');this.order=shuffle(this.api.online().filter((x:any)=>!x.bot));this.rounds=Math.min(this.order.length,6);this.go()}
 go(){if(this.turn>=this.rounds)return this.api.end();this.strokes=[];this.got={};this.phase='draw';this.word=WORDS[this.api.used('w',1,WORDS.length)[0]];this.api.countdown(60000,()=>this.stop());this.api.refresh()}
 get artist(){return this.order[this.turn]}
 stop(){this.phase='rev';try{const c=document.querySelector('.drawtv canvas') as HTMLCanvasElement;if(c&&this.strokes.length)this.api.keep(c.toDataURL('image/jpeg',.6),`${this.artist.name} ritade ${this.word}`)}catch{};this.api.stopCountdown();this.api.sfx('reveal');this.api.after(5000,()=>{this.turn++;this.go()});this.api.refresh()}
 onStream(p:string,d:any){if(p!==this.artist.id)return;if(d.clear)this.strokes=[];else if(Array.isArray(d.p))this.strokes.push(d);this.ver++}ver=0;
 onInput(p:string,d:any){if(this.phase!=='draw'||p===this.artist.id||p in this.got)return;if(norm(d.a)===norm(this.word)){const n=Object.keys(this.got).length;this.got[p]=1;this.api.award(p,Math.max(300,1000-n*200));this.api.award(this.artist.id,300);this.api.sfx('correct');if(this.api.online().filter((x:any)=>x.id!==this.artist.id).every((x:any)=>x.id in this.got))this.stop()}else{this.last[p]=d.a}this.api.refresh()}last:any={};
 phone(p:string){if(this.phase==='rev')return{k:'wait',msg:this.word,sub:'Rätt ord',key:'r'+this.turn};if(p===this.artist.id)return{k:'draw',word:this.word,key:'d'+this.turn};if(p in this.got)return{k:'wait',msg:'Rätt gissat!',big:'🎉',key:'g'+this.turn};return{k:'guess',prompt:'Vad ritas?',fb:this.last[p]?`"${this.last[p]}" var fel`:'',key:'q'+this.turn}}}
function DrawTv({g,show}:any){const r=useRef<HTMLCanvasElement>(null);useEffect(()=>{const i=setInterval(()=>{const c=r.current;if(!c)return;const x=c.getContext('2d')!;x.fillStyle='#fff7e8';x.fillRect(0,0,1200,900);x.lineCap='round';x.lineJoin='round';const by:any={};g.strokes.forEach((s:any)=>(by[s.s]||=[]).push(s));Object.values(by).forEach((seg:any)=>{x.strokeStyle=seg[0].c;x.lineWidth=seg[0].c==='#fff7e8'?52:12;x.beginPath();let f=true;seg.forEach((s:any)=>{for(let i=0;i<s.p.length;i+=2){const X=s.p[i]*1200,Y=s.p[i+1]*900;f?x.moveTo(X,Y):x.lineTo(X,Y);f=false}});x.stroke()})},120);return()=>clearInterval(i)},[g]);
 return <div className="drawtv"><canvas ref={r} width={1200} height={900}/><div><div className="kick">Pictionary</div><h2><Av p={g.artist}/> {g.artist.name} ritar</h2>{g.phase==='rev'&&<h1 className="qt">{g.word}</h1>}<div className="ansrow">{show.players.map((p:any)=><span key={p.id} className={p.id in g.got?'in':''} style={{borderColor:p.color}}><Av p={p}/></span>)}</div></div></div>}
export class Bluff extends RB{qms=45000;stage='write';lies:any={};o:any[]=[];votes:any={};revealMs=10000;
 setup(){this.items=this.api.used('fib',6,FIB.length).map((i:number)=>FIB[i])}
 begin(){this.stage='write';this.lies={};this.votes={};this.o=[];this.qms=45000}
 ask(p:string){if(this.stage==='write')return{k:'text',key:'w'+this.idx,prompt:'Skriv ett trovärdigt falskt svar',max:50,sel:this.ans[p]?.v};return{k:'choice',key:'v'+this.idx,prompt:'Vilket är sant?',opts:this.o.filter(x=>!x.by.includes(p)).map(x=>({id:x.text,label:x.text})),sel:this.ans[p]?.v}}
 close(){if(this.phase!=='q')return;if(this.stage==='write'){const m:any={};m[norm(this.cur.a)]={text:this.cur.a,by:[]};Object.entries(this.ans).forEach(([p,a]:any)=>{const k=norm(a.v);if(k===norm(this.cur.a)){this.api.award(p,300);return}(m[k]||={text:a.v,by:[]}).by.push(p)});this.o=shuffle(Object.values(m));this.stage='vote';this.ans={};this.t0=this.api.now();this.api.countdown(25000,()=>this.close());this.api.refresh();return}super.close()}
 score(){Object.entries(this.ans).forEach(([p,a]:any)=>{const o=this.o.find(x=>x.text===a.v);if(!o)return;this.votes[o.text]=(this.votes[o.text]||[]).concat(p);if(a.v===this.cur.a)this.api.award(p,1000);o.by.forEach((b:string)=>{this.api.award(b,500);this.api.stat(b,'fooled',1)})})}
 result(p:string){return{k:'wait',msg:this.cur.a,sub:'Rätt svar',key:'r'+this.idx}}
 answerers(){return this.api.online()}}
const BluffTv=({g,show}:any)=><Stage kicker={`Rappakalja ${g.idx+1}/${g.items.length}`} title={g.cur.q}>{g.stage==='write'?<><p className="lead">Skriv en bluff som lurar de andra.</p><Answered g={g} show={show}/></>:<div className="blf">{g.o.map((o:any)=><div key={o.text} className={g.phase==='reveal'?(o.text===g.cur.a?'r':'x'):''}><span>{o.text}</span>{g.phase==='reveal'&&<em>{(g.votes[o.text]||[]).map((p:string)=><Av key={p} p={nameOf(show,p)}/>)}{o.by.length?` · skrev: ${o.by.map((b:string)=>nameOf(show,b)?.name).join(', ')}`:''}</em>}</div>)}</div>}</Stage>;
class Who extends RB{qms=18000;revealMs=6000;c:any={};setup(){this.items=this.api.used('who',8,WHO.length).map((i:number)=>WHO[i])}
 ask(p:string){return{k:'choice',prompt:this.cur,opts:this.api.online().map((x:any)=>({id:x.id,label:x.name,icon:x.avatar})),sel:this.sel(p)}}
 score(){this.c={};Object.values(this.ans).forEach((a:any)=>this.c[a.v]=(this.c[a.v]||0)+1);const mx=Math.max(0,...Object.values(this.c) as number[]);Object.entries(this.ans).forEach(([p,a]:any)=>{if(this.c[a.v]===mx)this.api.award(p,500)})}}
const WhoTv=({g,show}:any)=>{const t=Object.entries(g.c).sort((a:any,b:any)=>b[1]-a[1]);return <Stage kicker={`Vem av oss? ${g.idx+1}/${g.items.length}`} title={g.cur}>{g.phase==='q'?<Answered g={g} show={show}/>:<div className="bars">{t.map(([id,n]:any,i)=>{const p=nameOf(show,id);return <div key={id} style={{animationDelay:i*.25+'s'}}><span><Av p={p}/> {p?.name}</span><i style={{width:n/Math.max(1,Object.keys(g.ans).length)*100+'%',background:p?.color}}/><b>{n}</b></div>})}</div>}</Stage>};
class Like extends RB{qms=25000;revealMs=7500;groups:any[]=[];setup(){this.items=this.api.used('like',8,LIKE.length).map((i:number)=>LIKE[i])}
 ask(p:string){return{k:'text',prompt:this.cur,max:24,sel:this.sel(p)}}
 score(){const m:any={};Object.entries(this.ans).forEach(([p,a]:any)=>{const k=norm(a.v).replace(/^(en|ett|den|det) /,'').replace(/(en|et|ar|er|na)$/,'');(m[k]||={t:a.v,ps:[]}).ps.push(p)});this.groups=Object.values(m).sort((a:any,b:any)=>b.ps.length-a.ps.length);this.groups.forEach(g=>{if(g.ps.length>1)g.ps.forEach((p:string)=>this.api.award(p,g.ps.length*200))})}}
const LikeTv=({g,show}:any)=><Stage kicker={`Tänk likadant ${g.idx+1}/${g.items.length}`} title={g.cur}>{g.phase==='q'?<Answered g={g} show={show}/>:<div className="grp">{g.groups.map((x:any,i:number)=><div key={i} style={{animationDelay:i*.2+'s'}}><b>{x.t}</b><span>{x.ps.map((p:string)=><Av key={p} p={nameOf(show,p)}/>)}</span></div>)}</div>}</Stage>;
class Spy{stage='talk';word='';spy='';votes:any={};guess:string|null=null;opts:string[]=[];r=0;rounds=2;constructor(public api:any){}
 start(){this.api.music('tense');this.round()}
 round(){if(this.r>=this.rounds)return this.api.end();this.stage='talk';this.votes={};this.guess=null;const on=this.api.online();this.spy=on[Math.random()*on.length|0].id;this.word=SPY[this.api.used('spy',1,SPY.length)[0]];this.opts=shuffle([this.word,...shuffle(SPY.filter(s=>s!==this.word)).slice(0,5)]);this.api.countdown(100000,()=>this.toVote());this.api.refresh()}
 toVote(){this.stage='vote';this.api.countdown(25000,()=>this.count());this.api.refresh()}
 onInput(p:string,d:any){if(this.stage==='talk'&&d.a==='vote')this.toVote();else if(this.stage==='vote'&&!(p in this.votes)){this.votes[p]=d.a;if(this.api.online().every((x:any)=>x.id in this.votes))this.count()}else if(this.stage==='guess'&&p===this.spy){this.guess=d.a;this.finish()}this.api.refresh()}
 caught=false;count(){const c:any={};Object.values(this.votes).forEach((v:any)=>c[v]=(c[v]||0)+1);const top=Object.keys(c).sort((a,b)=>c[b]-c[a])[0];this.caught=top===this.spy;this.api.sfx(this.caught?'correct':'wrong');this.stage='guess';this.api.countdown(20000,()=>this.finish());this.api.refresh()}
 finish(){this.api.stopCountdown();const hit=this.guess===this.word;this.api.players().forEach((p:any)=>{if(p.id===this.spy){this.api.award(p.id,(this.caught?0:1000)+(hit?800:0))}else if(this.caught&&this.votes[p.id]===this.spy)this.api.award(p.id,700)});this.stage='rev';this.api.sfx('reveal');this.api.after(7000,()=>{this.r++;this.round()});this.api.refresh()}
 phone(p:string){const sp=p===this.spy;if(this.stage==='talk')return{k:'actions',key:'t'+this.r,title:sp?'Du är spionen 🕵️':this.word,body:sp?'Hitta ordet utan att avslöja dig. Lyssna noga.':'Säg ett ord i tur och ordning som bevisar att du vet, men som inte hjälper spionen.',btns:[{id:'vote',label:'Vi är redo att rösta'}]};
  if(this.stage==='vote')return{k:'choice',key:'v'+this.r,prompt:'Vem är spionen?',opts:this.api.online().filter((x:any)=>x.id!==p).map((x:any)=>({id:x.id,label:x.name,icon:x.avatar})),sel:this.votes[p]};
  if(this.stage==='guess')return sp?{k:'choice',key:'g'+this.r,prompt:'Sista chansen: vilket var ordet?',opts:this.opts.map(o=>({id:o,label:o}))}:{k:'wait',msg:'Spionen gissar',big:'🕵️'};return{k:'wait',msg:this.word,sub:'Var det hemliga ordet',key:'r'+this.r}}}
const SpyTv=({g,show}:any)=>{const s=nameOf(show,g.spy);return <Stage kicker={`Spyfall · runda ${g.r+1}/${g.rounds}`} title={{talk:'Säg ett ord var, högt',vote:'Vem är spionen?',guess:g.caught?'Spionen är avslöjad!':'Spionen klarade sig',rev:`$<Av p={s}/> ${s?.name} var spionen`}[g.stage]}>{g.stage==='rev'&&<div className="bignum">{g.word}</div>}{g.stage==='vote'&&<div className="ansrow">{show.players.map((p:any)=><span key={p.id} className={p.id in g.votes?'in':''} style={{borderColor:p.color}}><Av p={p}/></span>)}</div>}{g.stage==='guess'&&<p className="lead">Nu får spionen gissa ordet för bonuspoäng.</p>}</Stage>};
const MCOL=[{name:'Lag Guld',color:'#ffc23d'},{name:'Lag Korall',color:'#ff5d5d'},{name:'Lag Is',color:'#4fd1ff'},{name:'Lag Lime',color:'#a6e84a'}];
const MSECS=[30,45,60,90,120],MROUNDS=[1,2,3,4];
/** Charader. Spelledaren väljer tid per tur, antal rundor och lag. Den som mimar eller någon i laget trycker Rätt. */
class Mime{set=true;secs=60;rounds=1;n=2;teams:any[]=[];turns:any[]=[];idx=0;word='';wi=0;cur:any=null;w=0;ready=true;constructor(public api:any){}
 start(){this.api.music('action');const t=this.api.teams();if(t.length>1){this.teams=t.map((x:any,i:number)=>({id:i,name:x.name||MCOL[i%4].name,color:x.color||MCOL[i%4].color,members:x.members.map((m:any)=>m.id),w:0}));this.n=this.teams.length}else this.deal(2);
  const h=this.api.host();if(!h||!this.api.online().some((m:any)=>m.id===h&&!m.bot))return this.begin();this.api.refresh()}
 humans(){return this.api.online().filter((m:any)=>!m.bot)}
 deal(n:number){const pl=shuffle(this.api.online());this.n=n;this.teams=MCOL.slice(0,n).map((c:any,i:number)=>({id:i,...c,members:[],w:0}));
  // Människorna fördelas först så att varje lag får någon som kan mima.
  const hs=pl.filter((m:any)=>!m.bot),bs=pl.filter((m:any)=>m.bot);[...hs,...bs].forEach((p:any,i:number)=>this.teams[i%n].members.push(p.id))}
 maxTeams(){return Math.max(2,Math.min(4,this.humans().length))}
 begin(){if(!this.set)return;this.set=false;const pl=this.api.players();const per=this.teams.map((t:any)=>t.members.map((id:string)=>pl.find((p:any)=>p.id===id)).filter((m:any)=>m&&!m.bot));
  this.turns=[];for(let r=0;r<this.rounds;r++){const L=Math.max(...per.map((x:any[])=>x.length));for(let i=0;i<L;i++)this.teams.forEach((t:any,k:number)=>{const h=per[k];if(h.length)this.turns.push({t,m:h[(i+r*L)%h.length],r})})}
  if(!this.turns.length)return this.api.end();this.idx=0;this.next()}
 skip(){if(this.set)this.begin()}
 timeUp(){if(this.set)this.begin()}
 next(){if(this.idx>=this.turns.length)return this.api.end();this.cur=this.turns[this.idx];this.w=0;this.pick();this.ready=true;this.api.stopCountdown();this.api.refresh()}
 pick(){this.word=MIME[this.api.used('mime',1,MIME.length)[0]];this.wi++}
 onInput(p:string,d:any){
  if(this.set){if(p!==this.api.host())return;const a=d?.a;
   if(a==='deal'){this.deal(this.n);return this.api.refresh()}
   if(Number.isInteger(d.teams)&&d.teams>=2&&d.teams<=this.maxTeams()){this.deal(d.teams);return this.api.refresh()}
   if(MSECS.includes(d.secs)){this.secs=d.secs;return this.api.refresh()}
   if(MROUNDS.includes(d.rounds)){this.rounds=d.rounds;return this.api.refresh()}
   if(d.move){const f=this.teams.find((t:any)=>t.members.includes(d.move));if(!f||f.members.length<2)return;f.members=f.members.filter((x:string)=>x!==d.move);this.teams[(f.id+1)%this.teams.length].members.push(d.move);return this.api.refresh()}
   if(a==='start')return this.begin();return}
  const c=this.cur;if(!c)return;const mime=p===c.m.id,mate=c.t.members.includes(p);
  if(mime&&this.ready&&d.a==='go'){this.ready=false;this.api.countdown(this.secs*1000,()=>{this.idx++;this.next()});return this.api.refresh()}
  if(this.ready)return;
  // Rätt räknas en gång per ord, oavsett om det är den som mimar eller någon i laget som trycker.
  if(d.a==='ok'+this.wi&&(mime||mate)){this.w++;c.t.w++;this.api.sfx('correct');c.t.members.forEach((m:any)=>this.api.award(m,400));this.pick();return this.api.refresh()}
  if(d.a==='pass'&&mime){this.pick();this.api.refresh()}}
 phone(p:string){if(this.set){if(p!==this.api.host())return{k:'wait',msg:'Spelledaren ställer in tid, rundor och lag',big:'🎭'};const pl=this.api.players();
   return{k:'mimeset',key:'set',n:this.n,max:this.maxTeams(),secs:this.secs,rounds:this.rounds,teams:this.teams.map((t:any)=>({id:t.id,name:t.name,color:t.color,members:t.members.map((id:string)=>{const m=pl.find((x:any)=>x.id===id);return{id,name:(m?.bot?'🤖 ':'')+(m?.name||'?')}})}))}}
  const c=this.cur,me=p===c?.m.id;if(me)return this.ready?{k:'actions',key:'rd'+this.idx,title:'Din tur att mima',body:`Du har ${this.secs} sekunder. Visa inte ordet för någon.`,btns:[{id:'go',label:'Starta'}]}:{k:'actions',key:'w'+this.wi,title:this.word,body:'Mima utan ljud. Tryck Rätt när ditt lag säger ordet.',btns:[{id:'ok'+this.wi,label:'Rätt'},{id:'pass',label:'Pass'}]};
  if(c?.t.members.includes(p))return this.ready?{k:'wait',msg:`${c.m.name} mimar snart. Gissa högt!`,big:'🎭'}:{k:'actions',key:'g'+this.wi,title:'Gissa högt!',body:`Tryck när ${c.m.name} säger att ni har rätt.`,btns:[{id:'ok'+this.wi,label:'✅ Rätt!'}]};
  return{k:'wait',msg:'Tyst, motståndare',big:'🤫'}}}
const MimeTv=({g}:any)=>{const pl=g.api.players();const nm=(id:string)=>pl.find((x:any)=>x.id===id);
 if(g.set)return <Stage kicker="Charader" title="Spelledaren ställer in spelet"><div className="mteams">{g.teams.map((t:any)=><div key={t.id} className="mteam" style={{borderColor:t.color}}><b style={{color:t.color}}>{t.name}</b><div>{t.members.map((id:string)=>{const m=nm(id);return <span key={id}>{m?.avatar} {m?.name}</span>})}</div></div>)}</div><p className="sub">{g.secs} sekunder per tur · {g.rounds} {g.rounds===1?'runda':'rundor'}</p></Stage>;
 const c=g.cur;return <Stage kicker={`Charader · Runda ${(c?.r||0)+1} av ${g.rounds} · ${c?.t.name}`} title={g.ready?`${c?.m.avatar} ${c?.m.name} mimar snart`:`${c?.m.avatar} ${c?.m.name} mimar`}><div className="bignum" key={g.w}>{g.w} rätt</div><div className="mscore">{g.teams.map((t:any)=><span key={t.id} className={t.id===c?.t.id?'on':''} style={{borderColor:t.color,color:t.color}}>{t.name}: {t.w}</span>)}</div></Stage>};
class Stop extends RB{qms=30000;revealMs=6500;rows:any[]=[];onInput(p:string,d:any){if(typeof d?.a==='number'&&isFinite(d.a))super.onInput(p,d)}setup(){this.items=[10,7.5,13].map(t=>({t}))}
 ask(p:string){return{k:'stopwatch',prompt:`Stoppa på exakt ${this.cur.t} sekunder`,target:this.cur.t,sel:this.sel(p)}}
 score(){this.rows=Object.entries(this.ans).map(([id,a]:any)=>({id,v:a.v,d:Math.abs(a.v-this.cur.t)})).sort((a,b)=>a.d-b.d);this.rows.forEach((r,i)=>{r.p=r.d<.02?1500:[1000,600,300][i]||0;this.api.award(r.id,r.p)})}
 result(p:string){const r=this.rows.find(x=>x.id===p);return{k:'wait',msg:r?`${r.v.toFixed(2)} s`:'Ingen tid',sub:r?`${r.d.toFixed(2)} s från målet`:'',key:'r'+this.idx}}}
const StopTv=({g,show}:any)=><Stage kicker={`Stoppa klockan ${g.idx+1}/3`} title={`${g.cur.t.toFixed(2).replace('.',',')} sekunder`}>{g.phase==='q'?<><p className="lead">Tryck Start och Stopp på telefonen. Klockan är dold.</p><Answered g={g} show={show}/></>:<div className="rows">{g.rows.map((r:any,i:number)=>{const p=nameOf(show,r.id);return <div key={r.id} style={{animationDelay:i*.2+'s'}}><b>{i+1}</b><Av p={p}/> {p?.name}<em>{r.v.toFixed(2)} s</em><i>{r.p?'+'+r.p:''}</i></div>})}</div>}</Stage>;
class Selfie extends RB{qms=35000;revealMs=7000;stage='snap';pics:any={};order:any[]=[];c:any={};
 setup(){this.items=this.api.used('sf',3,SELFIE.length).map((i:number)=>SELFIE[i])}begin(){this.stage='snap';this.pics={};this.c={};this.qms=35000}
 ask(p:string){return this.stage==='snap'?{k:'camera',key:'c'+this.idx,prompt:this.cur,sel:p in this.ans}:{k:'choice',key:'v'+this.idx,prompt:'Rösta på bästa bilden',opts:this.order.filter(x=>x!==p).map(x=>({id:x,label:this.api.players().find((q:any)=>q.id===x)?.name})),sel:this.ans[p]?.v}}
 onInput(p:string,d:any){if(this.stage==='snap'&&typeof d.a==='string'&&d.a.length<200000)this.pics[p]=d.a;super.onInput(p,d)}
 close(){if(this.phase!=='q')return;if(this.stage==='snap'){this.order=shuffle(Object.keys(this.pics));if(this.order.length<2){super.close();return}this.stage='vote';this.ans={};this.t0=this.api.now();this.api.countdown(25000,()=>this.close());this.api.refresh();return}super.close()}
 score(){Object.entries(this.pics).slice(0,3).forEach(([id,src]:any)=>this.api.keep(src,this.cur));Object.values(this.ans).forEach((a:any)=>{if(this.pics[a.v]){this.c[a.v]=(this.c[a.v]||0)+1;this.api.award(a.v,400);this.api.stat(a.v,'votes',1)}})}}
const SelfieTv=({g,show}:any)=>g.stage==='snap'?<Stage kicker={`Selfieuppdraget ${g.idx+1}/3`} title={g.cur}><Answered g={g} show={show}/></Stage>:<div className="pics"><h2>{g.cur}</h2><div style={(()=>{const n=g.order.length,cols=n<=2?n:n<=4?2:n<=6?3:4,rows=Math.ceil(n/cols);return{'--r':rows,gridTemplateColumns:`repeat(${cols},minmax(0,auto))`,gridTemplateRows:`repeat(${rows},minmax(0,1fr))`} as any})()}>{g.order.map((id:string,i:number)=>{const p=nameOf(show,id);return <figure key={id} style={{animationDelay:i*.15+'s'}}><img src={g.pics[id]} alt=""/><figcaption><Av p={p}/> {p?.name}{g.phase==='reveal'?` · ${g.c[id]||0} röster`:''}</figcaption></figure>})}</div></div>;
export const SOCIALG=[
{id:'draw',title:'Pictionary',tag:'Konstnärer utan talang',how:'En ritar på telefonen. Resten gissar först.',cat:'Socialt',icon:'🎨',mins:7,make:(a:any)=>new Draw(a),Tv:DrawTv,min:3,humans:2},
{id:'bluff',title:'Rappakalja',tag:'Luras och avslöja',how:'Skriv falska svar och hitta sanningen.',cat:'Socialt',icon:'🤥',mins:7,make:(a:any)=>new Bluff(a),Tv:BluffTv,min:3},
{id:'who',title:'Vem av oss?',tag:'Gruppen dömer',how:'Rösta på den i gruppen som passar bäst. Poäng om du röstar med majoriteten.',cat:'Socialt',icon:'👉',mins:4,make:(a:any)=>new Who(a),Tv:WhoTv,min:3},
{id:'like',title:'Tänk likadant',tag:'Tänk som de andra',how:'Skriv ett svar. Poäng om andra skriver samma.',cat:'Socialt',icon:'🧩',mins:5,make:(a:any)=>new Like(a),Tv:LikeTv,min:3},
{id:'spy',title:'Spyfall',tag:'Vem vet inte ordet?',how:'Alla utom en får samma hemliga plats. Avslöja spionen.',cat:'Socialt',icon:'🕵️',mins:7,make:(a:any)=>new Spy(a),Tv:SpyTv,min:3,humans:2},
{id:'mime',title:'Charader',tag:'Utan ett ljud',how:'En mimar, laget gissar. Spelledaren väljer tid, rundor och lag.',cat:'Socialt',icon:'🎭',mins:6,make:(a:any)=>new Mime(a),Tv:MimeTv,min:4,humans:2,even:true},
{id:'stop',title:'Stoppa klockan',tag:'Exakt tidskänsla',how:'Stoppa utan att se klockan.',cat:'Tajming',icon:'⏱️',mins:3,make:(a:any)=>new Stop(a),Tv:StopTv},
{id:'selfie',title:'Selfieuppdraget',tag:'Rösta fram bästa bilden',how:'Ta en bild efter uppdraget. Alla röstar.',cat:'Kamera',icon:'📸',mins:5,needs:'camera',make:(a:any)=>new Selfie(a),Tv:SelfieTv,min:3},
];
