import React from 'react';import {RB,Stage,Answered,Av,nameOf} from './base';import {SONGS} from '../content/more';import {STREAMS,STREAMS_AT} from '../content/streams';import {playSong,stopSong} from './songs';import {Vis} from './media';
// Tre musikspel: Vem valde låten?, DJ-duellen och Topp eller flopp.
const fy=<T,>(a:T[])=>{const o=[...a];for(let i=o.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[o[i],o[j]]=[o[j],o[i]]}return o};
const pickOf=(d:any)=>{const q=d?.song;if(!q||typeof q.t!=='string'||typeof q.a!=='string')return null;const s=(SONGS as any[]).find(x=>x.t===q.t&&x.a===q.a);return s?{t:s.t,a:s.a,y:s.y}:null};
const anySong=()=>{const s:any=SONGS[Math.random()*SONGS.length|0];return{t:s.t,a:s.a,y:s.y}};
const bil=(b:number)=>b.toFixed(2).replace('.',',')+' miljarder';

// — Vem valde låten? —
const THEMES=['Låten som är du','Din förfestlåt','Låten du skäms lite över att du älskar','Din bästa karaokelåt','Låten du vill ha på din begravning','Låten som får dig att dansa direkt','Låten du skulle spela på ditt bröllop','Din låt i bilen på sommaren'];
class Who{s:any=null;k=0;constructor(public api:any){}
 get ans(){const s=this.s;return s?.step==='pick'?s.picks:s?.votes||{}}
 start(){this.api.music('');this.s={step:'pick',theme:THEMES[Math.random()*THEMES.length|0],picks:{},order:[],i:-1,votes:{},hit:[]};this.api.countdown(90000,()=>this.play());this.bots();this.api.refresh()}
 humans(){return this.api.online()}
 play(){const s=this.s;if(s.step!=='pick')return;this.api.stopCountdown();s.order=fy(Object.keys(s.picks));if(s.order.length<2){stopSong();return this.api.end()}this.next()}
 next(){const s=this.s;s.i++;if(s.i>=s.order.length){stopSong(3000);return this.api.end()}s.votes={};s.hit=[];s.step='play';s.t0=Date.now();const song=s.picks[s.order[s.i]];playSong(song).then((ok:boolean)=>{if(this.s.picks[this.s.order[this.s.i]]===song){song.audio=ok;this.api.refresh()}});this.api.countdown(30000,()=>this.show());this.bots();this.api.refresh()}
 voters(){const s=this.s,p=s.order[s.i];return this.api.online().filter((x:any)=>x.id!==p)}
 show(){const s=this.s;if(s.step!=='play')return;this.api.stopCountdown();s.step='show';const p=s.order[s.i];s.hit=Object.keys(s.votes).filter(v=>s.votes[v]===p);for(const v of s.hit)this.api.award(v,100);this.api.award(p,50*s.hit.length);this.api.sfx('reveal');this.api.after(7500,()=>this.next());this.api.refresh()}
 check(){const s=this.s;if(s.step==='pick'&&this.api.online().every((p:any)=>s.picks[p.id]))this.soon(()=>this.play());if(s.step==='play'&&this.voters().every((p:any)=>s.votes[p.id]))this.soon(()=>this.show(),Math.max(1500,10000-(Date.now()-s.t0)))}
 soon(f:()=>void,ms=1500){const k=++this.k;this.api.after(ms,()=>{if(k===this.k)f()})}
 onInput(id:string,d:any){const s=this.s;if(s.step==='pick'){const q=pickOf(d);if(!q||s.picks[id])return;if(Object.values(s.picks).some((x:any)=>x.t===q.t&&x.a===q.a))return;s.picks[id]=q;this.api.sfx('tick');this.api.refresh();return this.check()}
  if(s.step==='play'){const p=s.order[s.i];if(id===p||s.votes[id]||typeof d?.a!=='string'||d.a===id||!s.order.includes(d.a))return;s.votes[id]=d.a;this.api.sfx('tick');this.api.refresh();return this.check()}}
 onLeave(){this.check()}
 bots(){const s=this.s;for(const p of this.api.online().filter((x:any)=>x.bot)){if(s.step==='pick')this.api.after(1500+Math.random()*5000,()=>{let q=anySong(),n=0;while(Object.values(this.s.picks).some((x:any)=>x.t===q.t)&&n++<9)q=anySong();this.onInput(p.id,{song:q})});if(s.step==='play'&&p.id!==s.order[s.i]){const i=s.i;this.api.after(4000+Math.random()*6000,()=>{if(this.s.i!==i)return;const o=this.s.order.filter((x:string)=>x!==p.id);this.onInput(p.id,{a:o[Math.random()*o.length|0]})})}}}
 phone(id:string){const s=this.s;if(s.step==='pick'){const q=s.picks[id];return q?{k:'wait',key:'pd',msg:'Låten är vald',sub:`${q.t} · ${q.a}. Håll det hemligt!`,big:'🤫'}:{k:'songpick',key:'pick',prompt:s.theme,note:'Välj i hemlighet. De andra ska gissa att det var du.',taken:Object.values(s.picks).map((x:any)=>x.t+'|'+x.a)}}
  const p=s.order[s.i],q=s.picks[p];if(s.step==='play'){if(id===p)return{k:'wait',key:'mine'+s.i,msg:'Det här är din låt!',sub:'Håll pokerfejs. Du kan inte rösta nu.',big:'😶'};if(s.votes[id])return{k:'wait',key:'v'+s.i,msg:'Röst lagd',sub:'Vänta på de andra',big:'🗳️'};return{k:'choice',key:'c'+s.i,prompt:`Vem valde ${q.t}?`,opts:s.order.filter((x:string)=>x!==id).map((x:string)=>({id:x,label:this.api.players().find((y:any)=>y.id===x)?.name||'?'})),grid:1}}
  const pl=this.api.players().find((y:any)=>y.id===p);if(id===p)return{k:'wait',key:'s'+s.i,msg:s.hit.length?`${s.hit.length} gissade rätt`:'Ingen gissade på dig',sub:`+${50*s.hit.length} poäng`,big:'🎧'};const ok=s.votes[id]===p;return{k:'wait',key:'s'+s.i,msg:ok?'+100 Rätt!':`Fel, det var ${pl?.name}`,big:ok?'✅':'❌'}}
}
const WhoTv=({g,show}:any)=>{const s=g.s;if(!s)return null;if(s.step==='pick')return <Stage kicker="Vem valde låten?" title={s.theme}><p className="lead">Välj en låt i hemlighet på telefonen. Sedan spelas alla låtar, och ni gissar vem som valde vilken.</p><Answered g={g} show={show}/></Stage>;
 const p=s.order[s.i],q=s.picks[p],pl=nameOf(show,p);return <Stage kicker={`Vem valde låten? ${s.i+1}/${s.order.length}`} title={s.step==='play'?'Vem valde den här?':`${pl?.name} valde låten!`}>{s.step==='play'?<><Vis ok={q.audio}/><h2 className="sub">{q.t}</h2><p className="lead">{q.a}</p><Answered g={g} show={show}/></>:<div className="whorev"><div className="whobig" key={p}><Av p={pl}/><b>{pl?.name}</b></div><h2 className="sub">{q.t} · {q.a}</h2><p className="lead">{s.hit.length?<>Rätt gissat: {s.hit.map((v:string)=>nameOf(show,v)?.name).join(', ')}</>:'Ingen gissade rätt!'}</p></div>}</Stage>};

// — DJ-duellen —
const DJT=['Bästa låten på en förfest','Låten som räddar ett dött dansgolv','Bästa låten att sjunga högt i bilen','Värsta låten att spela på en begravning','Bästa låten på en första dejt','Låten som får mormor att dansa','Bästa träningslåten','Bästa låten klockan tre på natten','Bästa låten till en bröllopsdans','Bästa låten att göra slut till','Låten som alla kan texten till','Bästa låten för en solig dag på stranden'];
class Dj{s:any=null;k=0;constructor(public api:any){}
 get ans(){const s=this.s;return s?.step==='vote'?s.votes:Object.fromEntries((s?.duel||[]).filter((x:string,i:number)=>s.picks[i]).map((x:string)=>[x,1]))}
 start(){this.api.music('');const o=fy(this.api.online().map((p:any)=>p.id));const pairs:string[][]=[];for(let i=0;i<o.length&&pairs.length<6;i+=2)pairs.push([o[i] as string,(o[i+1]??(o[i]===o[0]?o[1]:o[0])) as string]);this.s={pairs,themes:fy(DJT).slice(0,pairs.length),r:-1,step:'pick',duel:[],picks:[null,null],votes:{},win:null,cnt:[0,0],wins:{}};this.round()}
 round(){const s=this.s;s.r++;if(s.r>=s.pairs.length){stopSong(3000);return this.api.end()}s.duel=s.pairs[s.r];s.picks=[null,null];s.votes={};s.win=null;s.cnt=[0,0];s.step='pick';this.api.countdown(60000,()=>this.play());this.bots();this.api.refresh()}
 play(){const s=this.s;if(s.step!=='pick')return;this.api.stopCountdown();s.picks=s.picks.map((x:any)=>x||anySong());this.side(0)}
 side(i:number){const s=this.s,r=s.r;s.step=i?'playB':'playA';const q=s.picks[i];playSong(q).then((ok:boolean)=>{if(this.s.picks[i]===q){q.audio=ok;this.api.refresh()}});this.api.countdown(17000,()=>{if(this.s.r!==r)return;if(i===0)this.side(1);else this.vote()});this.api.refresh()}
 vote(){const s=this.s;s.step='vote';this.api.countdown(20000,()=>this.show());this.bots();this.api.refresh();this.check()}
 voters(){const s=this.s;return this.api.online().filter((p:any)=>!s.duel.includes(p.id))}
 show(){const s=this.s;if(s.step!=='vote')return;this.api.stopCountdown();s.step='show';const c=[0,0];for(const v of Object.values(s.votes))c[v as number]++;s.cnt=c;s.win=c[0]===c[1]?-1:c[0]>c[1]?0:1;if(s.win<0)s.duel.forEach((p:string)=>this.api.award(p,150));else{const w=s.duel[s.win];this.api.award(w,300);s.wins[w]=(s.wins[w]||0)+1;for(const[v,x] of Object.entries(s.votes))if(x===s.win)this.api.award(v,50)}this.api.sfx(s.win<0?'reveal':'fanfare');this.api.after(8000,()=>this.round());this.api.refresh()}
 check(){const s=this.s;if(s.step==='pick'&&s.picks[0]&&s.picks[1])this.soon(()=>this.play());if(s.step==='vote'&&this.voters().every((p:any)=>s.votes[p.id]!=null))this.soon(()=>this.show())}
 soon(f:()=>void){const k=++this.k;this.api.after(1500,()=>{if(k===this.k)f()})}
 onInput(id:string,d:any){const s=this.s;const me=s.duel.indexOf(id);if(s.step==='pick'&&me>=0&&!s.picks[me]){if(s.duel[0]===s.duel[1])return;const q=pickOf(d);if(!q)return;s.picks[me]=q;this.api.sfx('tick');this.api.refresh();return this.check()}
  if(s.step==='vote'&&me<0&&s.votes[id]==null&&(d?.a===0||d?.a===1)){s.votes[id]=d.a;this.api.sfx('tick');this.api.refresh();return this.check()}}
 onLeave(){this.check()}
 bots(){const s=this.s,r=s.r;for(const p of this.api.online().filter((x:any)=>x.bot)){const me=s.duel.indexOf(p.id);if(s.step==='pick'&&me>=0)this.api.after(2000+Math.random()*5000,()=>{if(this.s.r===r)this.onInput(p.id,{song:anySong()})});if(s.step==='vote'&&me<0)this.api.after(1500+Math.random()*5000,()=>{if(this.s.r===r)this.onInput(p.id,{a:Math.random()*2|0})})}}
 phone(id:string){const s=this.s,me=s.duel.indexOf(id),th=s.themes[s.r],nm=(x:string)=>this.api.players().find((y:any)=>y.id===x)?.name||'?';
  if(s.step==='pick'){if(me>=0)return s.picks[me]?{k:'wait',key:'pd'+s.r,msg:'Låten är vald',sub:`${s.picks[me].t}. Väntar på ${nm(s.duel[1-me])}`,big:'🎧'}:{k:'songpick',key:'pick'+s.r,prompt:th,note:`Du möter ${nm(s.duel[1-me])}. Välj låten som passar bäst.`};return{k:'wait',key:'w'+s.r,msg:`${nm(s.duel[0])} mot ${nm(s.duel[1])}`,sub:`Tema: ${th}. De väljer låtar nu.`,big:'🎛️'}}
  if(s.step==='playA'||s.step==='playB')return{k:'wait',key:s.step+s.r,msg:'Lyssna',sub:`Tema: ${th}`,big:'🔊'};
  if(s.step==='vote'){if(me>=0)return{k:'wait',key:'vm'+s.r,msg:'Publiken röstar',sub:'Håll tummarna',big:'🤞'};if(s.votes[id]!=null)return{k:'wait',key:'vd'+s.r,msg:'Röst lagd',big:'🗳️'};return{k:'choice',key:'v'+s.r,prompt:th,opts:[0,1].map(i=>({id:i,label:`${s.picks[i].t} · ${nm(s.duel[i])}`})),grid:1}}
  const won=s.win>=0&&s.duel[s.win]===id;return{k:'wait',key:'s'+s.r,msg:s.win<0?'Oavgjort!':won?'Du vann duellen!':`${nm(s.duel[s.win])} vann`,sub:`${s.cnt[0]} mot ${s.cnt[1]} röster`,big:won?'🏆':s.win<0?'🤝':'🎧'}}
}
const DjTv=({g,show}:any)=>{const s=g.s;if(!s||!s.duel.length)return null;const th=s.themes[s.r],pl=s.duel.map((x:string)=>nameOf(show,x));
 return <Stage kicker={`DJ-duellen ${s.r+1}/${s.pairs.length}`} title={th}><div className="djduel">{[0,1].map(i=>{const q=s.picks[i],on=(s.step==='playA'&&i===0)||(s.step==='playB'&&i===1),hid=s.step==='pick';return <div key={i} className={'djside c'+i+(on?' on':'')+(s.step==='show'&&s.win===i?' win':'')+(s.step==='show'&&s.win===1-i?' lose':'')}><Av p={pl[i]}/><b>{pl[i]?.name}</b>{hid?<p>{q?'Låten är vald ✓':'Väljer låt…'}</p>:<><h3>{q?.t}</h3><p>{q?.a}</p></>}{on&&<Vis ok={q?.audio}/>}{s.step==='show'&&<em>{s.cnt[i]} {s.cnt[i]===1?'röst':'röster'}</em>}</div>})}<i className="djvs">VS</i></div>{s.step==='vote'&&<p className="lead">Publiken röstar på telefonen</p>}{s.step==='show'&&<h2 className="sub">{s.win<0?'Oavgjort!':`${pl[s.win]?.name} vinner duellen!`}</h2>}{(s.step==='vote'||s.step==='pick')&&<Answered g={g} show={show}/>}</Stage>};

// — Topp eller flopp —
class Topp extends RB{qms=36000;revealMs=7500;mood='';play=0;
 setup(){const ix=this.api.used('stream',30,STREAMS.length);const L=ix.map((i:number)=>STREAMS[i]),out:any[]=[],used=new Set<number>();for(let i=0;i<L.length&&out.length<8;i++){if(used.has(i))continue;for(let j=i+1;j<L.length;j++){if(used.has(j)||Math.abs(L[i].b-L[j].b)<.25)continue;used.add(i);used.add(j);out.push(Math.random()<.5?[L[i],L[j]]:[L[j],L[i]]);break}}this.items=out}
 begin(){const i=this.idx,[A,B]=this.cur;this.play=0;A.audio=B.audio=undefined;playSong(A).then((ok:boolean)=>{A.audio=ok;this.api.refresh()});this.api.after(13000,()=>{if(this.idx!==i||this.phase!=='q')return;this.play=1;playSong(B).then((ok:boolean)=>{B.audio=ok;this.api.refresh()});this.api.refresh()})}
 right(){const[A,B]=this.cur;return A.b>B.b?0:1}
 ask(p:string){const[A,B]=this.cur;return{k:'choice',prompt:'Vilken har flest strömmar på Spotify?',opts:[{id:0,label:`${A.t} · ${A.a}`},{id:1,label:`${B.t} · ${B.a}`}],sel:this.sel(p),grid:1}}
 ok(a:any){return a===0||a===1}
 score(){const r=this.right();this.api.players().forEach((p:any)=>{const a=this.ans[p.id];if(a&&a.v===r){this.api.award(p.id,500);a.s=500}})}
 result(p:string){const a=this.ans[p],[A,B]=this.cur,w=this.cur[this.right()];return{k:'wait',key:'r'+this.idx,msg:a?.s?'+500 Rätt!':a?'Fel!':'Inget svar',sub:`${w.t}: ${bil(w.b)}`,big:a?.s?'✅':'❌'}}
}
const ToppTv=({g,show}:any)=>{const pair=g.cur;if(!pair)return null;const rev=g.phase==='reveal',r=g.right();return <Stage kicker={`Topp eller flopp ${g.idx+1}/${g.items.length}`} title={rev?`${pair[r].t} vinner!`:'Vilken har flest strömmar på Spotify?'}><div className="djduel">{pair.map((q:any,i:number)=><div key={i} className={'djside c'+i+(!rev&&g.play===i?' on':'')+(rev?(i===r?' win':' lose'):'')}><h3>{q.t}</h3><p>{q.a}</p>{!rev&&g.play===i&&<Vis ok={q.audio}/>}{rev&&<em>{bil(q.b)}</em>}</div>)}<i className="djvs">VS</i></div>{rev&&<p className="note">Enligt Spotify, {STREAMS_AT}</p>}<Answered g={g} show={show}/></Stage>};

export const MUSIK2G=[
 {id:'whosong',title:'Vem valde låten?',tag:'Gissa vems låt det är',how:'Alla väljer en låt i hemlighet. Låtarna spelas, och ni gissar vem som valde vilken.',cat:'Musik',icon:'🎧',min:3,max:12,mins:10,make:(a:any)=>new Who(a),Tv:WhoTv},
 {id:'djduel',title:'DJ-duellen',tag:'Bästa låten vinner',how:'Två spelare väljer varsin låt till ett tema. Båda spelas, och publiken röstar fram vinnaren.',cat:'Musik',icon:'🎛️',min:3,max:12,mins:12,make:(a:any)=>new Dj(a),Tv:DjTv},
 {id:'topp',title:'Topp eller flopp',tag:'Vilken strömmas mest?',how:'Två jättehits spelas. Gissa vilken som har flest strömmar på Spotify.',cat:'Musik',icon:'📈',mins:6,make:(a:any)=>new Topp(a),Tv:ToppTv},
];
