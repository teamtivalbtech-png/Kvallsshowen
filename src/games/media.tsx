import React from 'react';import {RB,shuffle,Stage,Answered,Opts,pts,nameOf} from './base';import {SONGS,SCENES} from '../content/more';import credits from '../content/imageCredits.json';import {playSong,stopSong,resumeSong} from './songs';
const fourTitles=(s:any)=>shuffle([s.t,...shuffle(SONGS.filter(x=>x.t!==s.t)).slice(0,3).map(x=>x.t)]);
const fourArtists=(s:any)=>shuffle([s.a,...shuffle([...new Set(SONGS.map(x=>x.a))].filter(a=>a!==s.a)).slice(0,3)]);
const Vis=({ok}:any)=><div className={'eq '+(ok===false?'mute':'')}>{Array.from({length:18},(_, i)=><i key={i} style={{animationDelay:-i*.17+'s'}}/>)}{ok===false&&<p>Ljudet nådde inte fram. Svara ändå eller hoppa vidare.</p>}</div>;
class Song extends RB{qms=22000;revealMs=6000;mood='';audio:any=null;part=0;p2=[]as any[];
 setup(){this.items=this.api.used('song',8,SONGS.length).map((i:number)=>({...SONGS[i],ts:null}));}
 begin(){const s=this.cur;s.ts=fourTitles(s);s.as=fourArtists(s);this.part=0;this.audio=null;playSong(s).then(ok=>{this.audio=ok;this.api.refresh()})}
 start(){this.setup();this.nextRound()}
 ask(p:string){const s=this.cur,a=this.ans[p];if(!a?.t2&&a?.title==null)return{k:'choice',key:'t'+this.idx,prompt:'Vilken låt?',opts:s.ts.map((o:string)=>({id:o,label:o}))};return{k:'choice',key:'a'+this.idx,prompt:'Vilken artist?',opts:s.as.map((o:string)=>({id:o,label:o})),sel:a.artist}}
 onInput(p:string,d:any){if(this.phase!=='q')return;const a=this.ans[p]||(this.ans[p]={t:this.api.now()-this.t0,v:null,title:null,artist:null});if(a.title==null)a.title=d.a;else if(a.artist==null)a.artist=d.a;a.done=a.title!=null&&a.artist!=null;this.api.sfx('tick');if(this.answerers().every(x=>this.ans[x.id]?.done))this.close();this.api.refresh()}
 sel(){return null}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(!a)return;let s=0;if(a.title===this.cur.t)s+=pts(a.t,this.qms,700);if(a.artist===this.cur.a)s+=500;this.api.award(p.id,s);a.s=s})}
 close(){super.close()}
 result(p:string){return{k:'wait',msg:`+${this.ans[p]?.s||0}`,big:'🎵',sub:`${this.cur.t} · ${this.cur.a}`,key:'r'+this.idx}}
 nextRound(){stopSongLater(this);super.nextRound()}}
function stopSongLater(g:any){stopSong()}
const Reveal=({s})=> <div className="songrev"><b>{s.t}</b><span>{s.a} · {s.y}</span></div>;
const SongTv=({g,show}:any)=>{const s=g.cur;return <Stage kicker={`Låtkampen ${g.idx+1}/${g.items.length}`} title={g.phase==='q'?'Vilken låt är det?':''}>{g.phase==='q'?<Vis ok={g.audio}/>:<Reveal s={s}/>}<Answered g={g} show={show}/></Stage>};
class Year extends RB{qms=22000;revealMs=6500;mood='';setup(){this.items=this.api.used('song2',8,SONGS.length).map((i:number)=>SONGS[i])}
 audio:any=null;begin(){this.audio=null;playSong(this.cur).then(ok=>{this.audio=ok;this.api.refresh()})}start(){this.setup();this.nextRound()}
 ask(p:string){return{k:'slider',prompt:`${this.cur.t} · ${this.cur.a}`,min:1960,max:2026,step:1,unit:'',val:1995,sel:this.sel(p)}}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(!a)return;const d=Math.abs(a.v-this.cur.y);const s=d===0?1000:d<=1?700:d<=3?450:d<=6?200:0;this.api.award(p.id,s);a.s=s;a.d=d})}
 result(p:string){return{k:'wait',msg:`+${this.ans[p]?.s||0}`,big:'📅',sub:`Rätt år: ${this.cur.y}`,key:'r'+this.idx}}
 nextRound(){stopSong();super.nextRound()}}
const YearTv=({g,show}:any)=><Stage kicker={`Årtalet ${g.idx+1}/${g.items.length}`} title={g.phase==='q'?'Vilket år kom låten?':g.cur.y}>{g.phase==='q'?<><Vis ok={g.audio}/><h2 className="sub">{g.cur.t}</h2><p className="lead">{g.cur.a}</p></>:<Reveal s={g.cur}/>}<Answered g={g} show={show}/></Stage>;
class Intro extends RB{qms=30000;revealMs=5500;mood='';locked:Record<string,1>={};by:string|null=null;opts:string[]=[];buzz:any[]=[];audio:any=null;
 setup(){this.items=this.api.used('song3',8,SONGS.length).map((i:number)=>SONGS[i])}start(){this.setup();this.nextRound()}
 begin(){this.locked={};this.by=null;this.buzz=[];this.opts=fourTitles(this.cur);this.audio=null;playSong(this.cur).then(o=>{this.audio=o;this.api.refresh()})}
 onInput(p:string,d:any){if(this.phase!=='q')return;if(d.a==='buzz'){if(this.by||this.locked[p])return;this.buzz.push({p,t:d.t||Date.now()});if(this.buzz.length===1)this.api.after(180,()=>this.grant())}else if(p===this.by){if(d.a===this.cur.t){this.api.award(p,1000);this.api.sfx('correct');this.close()}else{this.api.award(p,-300);this.api.sfx('wrong');this.locked[p]=1;this.by=null;this.buzz=[];resumeSong();if(this.api.online().every(x=>this.locked[x.id]))this.close()}}this.api.refresh()}
 grant(){if(this.phase!=='q'||this.by||!this.buzz.length)return;this.by=this.buzz.sort((a,b)=>a.t-b.t)[0].p;stopSong();this.api.sfx('buzz')}
 score(){}ask(p:string){if(this.by===p)return{k:'choice',key:'c'+this.idx,prompt:'Du summade! Vilken låt?',opts:this.opts.map(o=>({id:o,label:o}))};return{k:'buzzer',key:'z'+this.idx,off:!!this.by||!!this.locked[p],label:this.locked[p]?'Låst':this.by?'Väntar':'SUMMER'}}
 result(){return{k:'wait',msg:this.cur.t,sub:this.cur.a,big:'🔔',key:'r'+this.idx}}nextRound(){stopSong();super.nextRound()}}
const IntroTv=({g,show}:any)=>{const b=g.by&&nameOf(show,g.by);return <Stage kicker={`Introduellen ${g.idx+1}/${g.items.length}`} title={g.phase==='reveal'?'':b?`${b.avatar} ${b.name} summade!`:'Tryck först när du känner igen låten'}>{g.phase==='q'&&(b?<Opts list={g.opts}/>:<Vis ok={g.audio}/>)}{g.phase==='reveal'&&<Reveal s={g.cur}/>}</Stage>};
class MK extends RB{qms=18000;revealMs=5000;mood='';part=0;audio:any=null;
 setup(){this.items=this.api.used('song4',18,SONGS.length).slice(0,6).flatMap((i:number)=>[0,1,2].map(k=>({...SONGS[i],k})))}start(){this.setup();this.nextRound()}
 begin(){const s=this.cur;this.audio=this.audio;s.o=s.k===0?fourArtists(s):s.k===1?fourTitles(s):shuffle([s.y,s.y-4+(Math.random()*3|0),s.y+3,s.y-9]).map(String);if(s.k===0){this.audio=null;playSong(s).then(o=>{this.audio=o;this.api.refresh()})}}
 get right(){const s=this.cur;return s.k===0?s.a:s.k===1?s.t:String(s.y)}
 ask(p:string){return{k:'choice',prompt:['Artist?','Låt?','År?'][this.cur.k],opts:this.cur.o.map((o:string)=>({id:o,label:o})),sel:this.sel(p)}}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(a?.v===this.right)this.api.award(p.id,pts(a.t,this.qms,600))});if(this.cur.k===2)stopSong()}
 result(p:string){const ok=this.ans[p]?.v===this.right;return{k:'wait',msg:ok?'Rätt!':'Fel',big:ok?'✅':'❌',sub:this.right,key:'r'+this.idx}}}
const MKTv=({g,show}:any)=>{const s=g.cur;return <Stage kicker={`Musikkampen · låt ${Math.floor(g.idx/3)+1}/6`} title={['Vem är artisten?','Vad heter låten?','Vilket år?'][s.k]}>{g.phase==='q'&&<Vis ok={g.audio}/>}<Opts list={s.o} right={g.phase==='reveal'?g.right:null}/><Answered g={g} show={show}/></Stage>};
class Zoom extends RB{qms=24000;revealMs=5000;setup(){const c=credits as any[];this.items=this.api.used('img',8,c.length).map((i:number)=>c[i]);}
 o:string[]=[];begin(){const c=credits as any[];this.o=shuffle([this.cur.name,...shuffle(c.filter(x=>x.name!==this.cur.name)).slice(0,3).map(x=>x.name)])}
 ask(p:string){return{k:'choice',prompt:'Vad är det?',opts:this.o.map(o=>({id:o,label:o})),sel:this.sel(p)}}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(a?.v===this.cur.name)this.api.award(p.id,pts(a.t,this.qms))})}
 result(p:string){const ok=this.ans[p]?.v===this.cur.name;return{k:'wait',msg:ok?'Rätt!':'Fel',sub:this.cur.name,big:ok?'🔍':'😵',key:'r'+this.idx}}}
const ZoomTv=({g,show}:any)=>{const im=g.cur;const ox=im?((im.file.charCodeAt(1)*37)%60+20):50;return <div className="zoom"><div className="zw"><img key={im.file} src={'/img/'+im.file} alt="" className={g.phase==='q'?'zin':'zout'} style={{transformOrigin:`${ox}% ${100-ox}%`,animationDuration:g.qms+'ms'}}/>{g.phase==='reveal'&&<div className="cap">{im.name}<small>{im.author} · {im.license}</small></div>}</div><div className="zs"><div className="kick">Zooma ut {g.idx+1}/{g.items.length}</div><Opts list={g.o} right={g.phase==='reveal'?im.name:null}/><Answered g={g} show={show}/></div></div>};
class Next extends RB{qms=20000;revealMs=7000;o:string[]=[];setup(){this.items=this.api.used('sc',Math.min(6,SCENES.length),SCENES.length).map((i:number)=>SCENES[i])}begin(){this.o=shuffle([this.cur.a,...this.cur.w])}
 ask(p:string){return{k:'choice',prompt:'Vad händer sen?',opts:this.o.map(o=>({id:o,label:o})),sel:this.sel(p)}}score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(a?.v===this.cur.a)this.api.award(p.id,pts(a.t,this.qms))})}
 result(p:string){return{k:'wait',msg:this.ans[p]?.v===this.cur.a?'Rätt!':'Fel',sub:this.cur.a,key:'r'+this.idx}}}
const NextTv=({g,show}:any)=>{const s=g.cur;return <div className="nx"><div className={'scene '+(g.phase==='q'?'freeze':'go')} key={g.idx}><span className="a">{s.icons[0]}</span><span className="b">{s.icons[1]}</span><div className="frz">PAUS</div></div><Stage kicker={`Vad händer sen? ${g.idx+1}/${g.items.length}`} title={s.t}><Opts list={g.o} right={g.phase==='reveal'?s.a:null}/><Answered g={g} show={show}/></Stage></div>};
export const MEDIAG=[
{id:'song',title:'Låtkampen',tag:'Låt och artist',how:'Lyssna på tv:n. Välj låt och sedan artist.',cat:'Musik',icon:'🎵',mins:5,make:(a:any)=>new Song(a),Tv:SongTv},
{id:'year',title:'Årtalet',tag:'Vilket år kom låten?',how:'Du får låten. Gissa året med reglaget.',cat:'Musik',icon:'📅',mins:5,make:(a:any)=>new Year(a),Tv:YearTv},
{id:'intro',title:'Introduellen',tag:'Tryck först',how:'Tryck på summern när du känner igen låten. Fel svar låser dig och kostar poäng.',cat:'Musik',icon:'🔔',mins:5,make:(a:any)=>new Intro(a),Tv:IntroTv},
{id:'mk',title:'Musikkampen',tag:'Artist, låt och år',how:'Tre snabba frågor på varje låt.',cat:'Klassiker',icon:'🎶',mins:6,make:(a:any)=>new MK(a),Tv:MKTv},
{id:'zoom',title:'Zooma ut',tag:'Från närbild till helhet',how:'Bilden zoomas ut. Svara tidigt för mest poäng.',cat:'Bild',icon:'🔍',mins:4,make:(a:any)=>new Zoom(a),Tv:ZoomTv},
{id:'next',title:'Vad händer sen?',tag:'Scenen fryser',how:'En animerad scen stannar. Gissa fortsättningen.',cat:'Bild',icon:'⏸️',mins:4,make:(a:any)=>new Next(a),Tv:NextTv},
];
