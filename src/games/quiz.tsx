import React from 'react';import {Av,RB,shuffle,pts,Stage,Answered,Opts,nameOf} from './base';import {QUIZ,CATS,HARD} from '../content/quiz';import {NOS} from '../content/nostalgi';import {TF,TIMELINE,CLOSEST,PRICES} from '../content/more';
const pick=(api:any,k:string,arr:any[],n:number)=>api.used(k,n,arr.length).map((i:number)=>arr[i]);
const mc=(q:any)=>({...q,o:shuffle([q.a,...q.w])});
class Fast extends RB{qms=15000;revealMs=5000;setup(){const c=this.api.custom();this.items=shuffle([...c,...pick(this.api,'quiz',QUIZ,10-c.length)]).map(mc)}
 ask(p:string){return{k:'choice',prompt:this.cur.cat,opts:this.cur.o.map((o:string)=>({id:o,label:o})),sel:this.sel(p)}}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(a?.v===this.cur.a)this.api.award(p.id,pts(a.t,this.qms))})}
 result(p:string){const a=this.ans[p];return{k:'wait',msg:a?.v===this.cur.a?'Rätt!':'Fel',big:a?.v===this.cur.a?'✅':'❌',sub:`Rätt svar: ${this.cur.a}`,key:'r'+this.idx}}}
class Nostalgi extends Fast{setup(){this.items=this.api.used('nos',12,NOS.length).map((i:number)=>mc(NOS[i]))}}
const FastTv=({g,show}:any)=>{const q=g.cur;if(!q)return null;return <Stage kicker={`${q.cat} · ${g.idx+1}/${g.items.length}`} title={q.q}><Opts list={q.o} right={g.phase==='reveal'?q.a:null}/><Answered g={g} show={show}/></Stage>};
class Big extends RB{qms=20000;revealMs=5000;step=0;catV:any={};cat='';onInput(p:string,d:any){if(this.voting&&!this.cats.includes(d?.a))return;super.onInput(p,d)}setup(){this.items=[0,1,2,3,4,5,6,7,8].map(i=>({i}))}
 voting=true;cats:string[]=[];
 begin(){if(this.idx%3===0){this.voting=true;this.cats=shuffle(CATS).slice(0,3);this.qms=10000;this.t=null}else this.loadQ()}
 t:any=null;loadQ(){this.voting=false;this.qms=20000;this.t=mc(QUIZ[this.api.used('quiz',1,QUIZ.length,(i:number)=>QUIZ[i].cat===this.cat)[0]])}
 get qq(){return this.t}
 ask(p:string){return this.voting?{k:'choice',prompt:'Välj kategori',opts:this.cats.map(c=>({id:c,label:c})),sel:this.sel(p)}:{k:'choice',prompt:'Dubbla med snabbhet',opts:this.t.o.map((o:string)=>({id:o,label:o})),sel:this.sel(p)}}
 close(){if(this.phase!=='q')return;if(this.voting){const c:any={};Object.values(this.ans).forEach((a:any)=>c[a.v]=(c[a.v]||0)+1);this.cat=Object.keys(c).sort((a,b)=>c[b]-c[a])[0]||this.cats[0];this.ans={};this.t0=this.api.now();this.loadQ();this.api.countdown(this.qms,()=>this.close());this.api.refresh();return}super.close()}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(a?.v===this.t.a)this.api.award(p.id,pts(a.t,this.qms,1500))})}
 result(p:string){const ok=this.ans[p]?.v===this.t.a;return{k:'wait',msg:ok?'Rätt!':'Fel',big:ok?'✅':'❌',sub:`Rätt svar: ${this.t.a}`,key:'r'+this.idx}}}
const BigTv=({g,show}:any)=>g.voting?<Stage kicker="Stora frågesporten" title="Vilket ämne vill ni ha?"><Opts list={g.cats}/><Answered g={g} show={show}/></Stage>:g.t&&<Stage kicker={`${g.cat} · fråga ${g.idx+1}/9`} title={g.t.q}><Opts list={g.t.o} right={g.phase==='reveal'?g.t.a:null}/><Answered g={g} show={show}/></Stage>;
class Ladder{phase='q';idx=0;st:any={};deadline=0;LVL=[100,200,400,800,1600,3200,6400,12800];qs:any[]=[];t0=0;
 constructor(public api:any){}
 start(){this.api.music('tense');this.qs=pick(this.api,'quiz',QUIZ,this.LVL.length+1).map(mc);this.api.online().forEach((p:any)=>this.st[p.id]={alive:true,bank:0,pot:0});this.round()}
 round(){this.phase='q';this.ans={};this.t0=this.api.now();this.api.countdown(14000,()=>this.reveal());this.api.refresh()}
 ans:any={};
 alive(){return this.api.online().filter((p:any)=>this.st[p.id]?.alive)}
 onInput(p:string,d:any){const s=this.st[p];if(!s)return;if(this.phase==='q'&&s.alive&&!(p in this.ans)){this.ans[p]=d.a;if(this.alive().every((x:any)=>x.id in this.ans))this.reveal()}else if(this.phase==='bank'&&s.alive&&!s.dec){s.dec=d.a;if(d.a==='bank'){s.bank+=s.pot;s.pot=0;s.alive=false;this.api.sfx('correct')}if(this.alive().every((x:any)=>this.st[x.id].dec))this.step()}this.api.refresh()}
 reveal(){const q=this.qs[this.idx];this.api.stopCountdown();this.phase='rev';this.alive().forEach((p:any)=>{const s=this.st[p.id];if(this.ans[p.id]===q.a){s.pot=this.LVL[this.idx]}else{s.pot=0;s.alive=false}s.dec=null});this.api.sfx('reveal');this.api.refresh();this.api.after(3500,()=>{if(!this.alive().length||this.idx>=this.LVL.length-1)return this.finish();this.phase='bank';this.api.countdown(9000,()=>this.step());this.api.refresh()})}
 step(){this.api.stopCountdown();this.alive().forEach((p:any)=>{if(!this.st[p.id].dec)this.st[p.id].dec='go'});this.idx++;this.round()}
 finish(){Object.entries(this.st).forEach(([id,s]:any)=>this.api.award(id,s.bank+s.pot));this.api.end()}
 onLeave(){if(this.phase==='q'&&this.alive().length&&this.alive().every((x:any)=>x.id in this.ans))this.reveal()}
 phone(p:string){const s=this.st[p],q=this.qs[this.idx];if(!s)return{k:'wait',msg:'Du tittar på denna'};if(!s.alive&&this.phase!=='rev')return{k:'wait',msg:s.bank?`Säkrat ${s.bank}`:'Du föll av stegen',big:s.bank?'💰':'🪜'};
  if(this.phase==='q')return{k:'choice',key:'l'+this.idx,prompt:`Steg ${this.idx+1}: ${this.LVL[this.idx]} poäng`,opts:q.o.map((o:string)=>({id:o,label:o})),sel:this.ans[p]};
  if(this.phase==='bank')return s.dec?{k:'wait',msg:'Väntar'}:{k:'actions',key:'b'+this.idx,title:`${s.pot} i potten`,body:'Fel svar sedan kostar allt osäkrat.',btns:[{id:'bank',label:'Säkra'},{id:'go',label:'Fortsätt'}]};
  return{k:'wait',msg:this.ans[p]===q.a?'Rätt!':'Fel',sub:`Rätt svar: ${q.a}`}}}
const LadderTv=({g,show}:any)=>{const q=g.qs[g.idx];return <div className="lad"><div className="rungs">{[...g.LVL].reverse().map((v:number,i:number)=>{const n=g.LVL.length-1-i;return <div key={v} className={n===g.idx?'on':n<g.idx?'past':''}><b>{n+1}</b>{v}{n===g.idx&&<span>{show.players.filter((p:any)=>g.st[p.id]?.alive).length} kvar</span>}</div>})}</div><div>{q&&<Stage kicker={g.phase==='bank'?'Säkra eller fortsätt?':'Stegen'} title={q.q}><Opts list={q.o} right={g.phase==='q'?null:q.a}/></Stage>}<div className="ansrow">{show.players.map((p:any)=>{const s=g.st[p.id];return <span key={p.id} className={s?.alive?'in':'off'} style={{borderColor:p.color}}><Av p={p}/><small>{s?.bank||''}</small></span>})}</div></div></div>};
class Timeline extends RB{qms=35000;revealMs=7000;ok(a:any){return Array.isArray(a)}setup(){const n=this.api.used('tl',20,TIMELINE.length).map((i:number)=>TIMELINE[i]);this.items=[0,1,2,3,4].map(i=>n.slice(i*4,i*4+4)).map(s=>({ev:s,right:[...s].sort((a,b)=>a.y-b.y).map(e=>e.id)}))}
 ask(p:string){return{k:'order',prompt:'Äldst överst',items:shuffle(this.cur.ev).map((e:any)=>({id:e.id,label:e.t})),sel:this.sel(p)}}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id]?.v;if(!a)return;let s=0;const yr=(id:number)=>this.cur.ev.find((e:any)=>e.id===id)?.y;a.forEach((id:number,i:number)=>{if(yr(this.cur.right[i])===yr(id))s+=250});if(s===1000)s+=500;p&&this.api.award(p.id,s);this.ans[p.id].s=s})}
 result(p:string){return{k:'wait',msg:`${this.ans[p]?.s||0} poäng`,big:'🕰️',key:'r'+this.idx}}}
const TimelineTv=({g,show}:any)=><Stage kicker={`Timeline ${g.idx+1}/${g.items.length}`} title={g.phase==='q'?'Sätt händelserna i rätt ordning':'Rätt ordning'}><div className="tl">{(g.phase==='q'?g.cur.ev:[...g.cur.ev].sort((a:any,b:any)=>a.y-b.y)).map((e:any)=><div key={e.id}><b>{g.phase==='q'?'?':e.y}</b><span>{e.t}</span></div>)}</div><Answered g={g} show={show}/></Stage>;
class Num extends RB{qms=25000;revealMs=7000;rows:any[]=[];
 setup(){this.items=pick(this.api,'cl',CLOSEST,8)}unit(){return this.cur.u}target(){return this.cur.a}prompt(){return this.cur.q}
 ask(p:string){return{k:'number',prompt:this.prompt(),unit:this.unit(),sel:this.sel(p)}}
 rank(){const T=this.target();return Object.entries(this.ans).map(([id,a]:any)=>({id,v:a.v,d:Math.abs(a.v-T)})).sort((a,b)=>a.d-b.d)}
 score(){this.rows=this.rank();const P=[1000,600,300];this.rows.forEach((r,i)=>{const pt=r.d===0?1500:P[i]||0;this.api.award(r.id,pt);r.p=pt})}
 result(p:string){const r=this.rows.find(x=>x.id===p);return{k:'wait',msg:r?`+${r.p}`:'Inget svar',sub:`Svar: ${this.target().toLocaleString('sv-SE')} ${this.unit()}`,key:'r'+this.idx}}}
const Rows=({g,show,u}:any)=><div className="rows">{g.rows.slice(0,6).map((r:any,i:number)=>{const p=nameOf(show,r.id);return <div key={r.id} style={{animationDelay:i*.2+'s'}}><b>{i+1}</b><Av p={p}/> {p?.name}<em>{Number(r.v).toLocaleString('sv-SE')} {u}</em><i>{r.p?'+'+r.p:r.over?'över!':''}</i></div>})}</div>;
const NumTv=({g,show}:any)=><Stage kicker={`Närmast vinner ${g.idx+1}/${g.items.length}`} title={g.prompt()}>{g.phase==='q'?<Answered g={g} show={show}/>:<><div className="bignum">{g.target().toLocaleString('sv-SE')} {g.unit()}</div><Rows g={g} show={show} u={g.unit()}/></>}</Stage>;
class Price extends Num{setup(){this.items=pick(this.api,'pr',PRICES,8)}unit(){return'kr'}target(){return this.cur.p}prompt(){return this.cur.n}
 rank(){const T=this.target();return Object.entries(this.ans).map(([id,a]:any)=>({id,v:a.v,d:a.v>T?1e12+a.v:T-a.v,over:a.v>T})).sort((a,b)=>a.d-b.d)}
 score(){this.rows=this.rank();const P=[1000,600,300];let i=0;this.rows.forEach(r=>{const pt=r.over?0:(P[i++]||0);this.api.award(r.id,pt);r.p=pt})}}
const PriceTv=({g,show}:any)=><Stage kicker={`Rätt pris ${g.idx+1}/${g.items.length} · närmast utan att gå över`} title={g.cur.n}><div className="emoji">{g.cur.e}</div>{g.phase==='q'?<Answered g={g} show={show}/>:<><div className="bignum">cirka {g.cur.p.toLocaleString('sv-SE')} kr</div><Rows g={g} show={show} u="kr"/></>}</Stage>;
class TFG extends RB{qms=14000;revealMs=4500;bank:any={};stage='bet';ok(a:any){return /^[tf](50|100)$/.test(String(a))}
 setup(){this.items=pick(this.api,'tf',TF,10);this.api.players().forEach(p=>this.bank[p.id]=1000)}
 ask(p:string){const s=this.sel(p);return{k:'choice',grid:1,prompt:`Satsa. Du har ${this.bank[p]||1000}`,opts:[{id:'t100',label:'Sant · allt'},{id:'f100',label:'Falskt · allt'},{id:'t50',label:'Sant · hälften'},{id:'f50',label:'Falskt · hälften'}],sel:s}}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id]?.v;if(!a)return;const pct=+a.slice(1)/100,wager=Math.round((this.bank[p.id]||0)*pct),ok=(a[0]==='t')===this.cur.a;this.bank[p.id]=Math.max(100,(this.bank[p.id]||0)+(ok?wager:-wager));this.ans[p.id].ok=ok});if(this.idx===this.items.length-1)this.api.players().forEach(p=>this.api.award(p.id,this.bank[p.id]))}
 result(p:string){return{k:'wait',msg:this.ans[p]?.ok?'Rätt!':'Fel',big:this.cur.a?'👍':'👎',sub:`Du har ${this.bank[p]}`,key:'r'+this.idx}}}
const TFTv=({g,show}:any)=><Stage kicker={`Sant eller falskt ${g.idx+1}/${g.items.length}`} title={g.cur.q}>{g.phase==='reveal'&&<div className={'tf '+(g.cur.a?'t':'f')}>{g.cur.a?'SANT':'FALSKT'}</div>}<div className="ansrow">{show.players.map((p:any)=><span key={p.id} className={p.id in g.ans?'in':''} style={{borderColor:p.color}}><Av p={p}/><small>{g.bank[p.id]}</small></span>)}</div></Stage>;
class AllIn extends RB{qms=30000;revealMs=8000;bets:any={};bet=true;base=(p:string)=>this.api.total(p)||1000;
 setup(){this.items=[{}];this.qms=25000;this.mood='reveal';this.q=mc(HARD[this.api.used('hard',1,HARD.length)[0]])}
 q:any=null;
 ask(p:string){return this.bet?{k:'slider',prompt:'Hur stor andel av dina poäng satsar du? Ingen ser ditt val.',min:0,max:100,step:5,unit:'%',val:50,sel:this.sel(p),btn:'Satsa'}:{k:'choice',prompt:'Sista frågan',opts:this.q.o.map((o:string)=>({id:o,label:o})),sel:this.sel(p)}}
 close(){if(this.phase!=='q')return;if(this.bet){this.bets=Object.fromEntries(Object.entries(this.ans).map(([k,v]:any)=>[k,v.v]));this.ans={};this.bet=false;this.t0=this.api.now();this.api.countdown(20000,()=>this.close());this.api.refresh();return}super.close()}
 score(){this.api.players().forEach(p=>{const pct=(this.bets[p.id]||0)/100,w=Math.round(this.base(p.id)*pct),ok=this.ans[p.id]?.v===this.q.a;this.api.award(p.id,ok?w:-w)})}
 result(p:string){return{k:'wait',msg:'Avgjort',sub:'Sanningen kommer strax',key:'r'}}}
const AllInTv=({g,show}:any)=>g.bet?<Stage kicker="Finalen" title="Allt eller inget"><p className="lead">Satsa i hemlighet. Rätt svar ökar din poäng, fel svar kostar din insats.</p><Answered g={g} show={show}/></Stage>:<Stage kicker="Sista frågan" title={g.q.q}><Opts list={g.q.o} right={g.phase==='reveal'?g.q.a:null}/><Answered g={g} show={show}/></Stage>;
export const QUIZG=[
{id:'fast',title:'Snabbast vinner',tag:'Frågesport där varje sekund kostar',how:'Svara rätt så snabbt du kan. Tio frågor.',cat:'Kunskap',icon:'⚡',mins:5,make:(a:any)=>new Fast(a),Tv:FastTv},
{id:'nos',title:'Nostalgikampen',tag:'För dig född runt år 2000',how:'Minns du Club Penguin, MSN och High School Musical? Tolv frågor om uppväxten.',cat:'Kunskap',icon:'📼',mins:5,make:(a:any)=>new Nostalgi(a),Tv:FastTv},
{id:'ladder',title:'Stegen',tag:'Säkra eller satsa vidare',how:'Poängen dubblas för varje steg. Säkra när du vill, men ett fel kostar allt osäkrat.',cat:'Kunskap',icon:'🪜',mins:6,make:(a:any)=>new Ladder(a),Tv:LadderTv},
{id:'timeline',title:'Timeline',tag:'Vad hände först?',how:'Sortera händelserna från äldst till nyast.',cat:'Kunskap',icon:'🕰️',mins:5,make:(a:any)=>new Timeline(a),Tv:TimelineTv},
{id:'closest',title:'Närmast vinner',tag:'Ingen vet, alla gissar',how:'Skriv en siffra. Närmast får flest poäng.',cat:'Kunskap',icon:'🎯',mins:5,make:(a:any)=>new Num(a),Tv:NumTv},
{id:'price',title:'Rätt pris',tag:'Närmast utan att gå över',how:'Gissa priset, men går du över får du noll.',cat:'Kunskap',icon:'🏷️',mins:5,make:(a:any)=>new Price(a),Tv:PriceTv},
{id:'tf',title:'Sant eller falskt',tag:'Satsa på din magkänsla',how:'Satsa hälften eller allt på varje påstående.',cat:'Kunskap',icon:'⚖️',mins:4,make:(a:any)=>new TFG(a),Tv:TFTv},
{id:'big',title:'Stora frågesporten',tag:'Ni väljer ämnena',how:'Rösta på kategori och svara på tre frågor per kategori.',cat:'Klassiker',icon:'🧠',mins:7,make:(a:any)=>new Big(a),Tv:BigTv},
{id:'allin',title:'Allt eller inget',tag:'Finalen',how:'Satsa i hemlighet en del av dina poäng på en sista svår fråga.',cat:'Final',icon:'🎲',mins:2,make:(a:any)=>new AllIn(a),Tv:AllInTv},
];
