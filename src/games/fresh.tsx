import React from 'react';import {hasVoice} from '../host';import {RB,shuffle,Stage,Answered,Opts,pts,nameOf} from './base';import {Next,NextTv,Vis,Reveal,fourTitles} from './media';import {SONGS} from '../content/more';import {ADS,BRANDS,ERAS,QUOTES,QTITLES,PHRASES} from '../content/fresh';import {loadSong,reversed,playBuf,stopBuf,pcmBuffer,bufTok} from './rev';import {playSong,stopSong} from './songs';import {snd} from '../audio';
// Baklängeslåten: låten går baklänges och saktar in, så den blir lättare att känna igen.
class Rev extends RB{qms=26000;revealMs=8000;mood='';quiet=true;audio:any=null;o:string[]=[];buf:any=null;tries=0;
 setup(){this.items=this.api.used('song',6,SONGS.length).map((i:number)=>SONGS[i])}start(){this.setup();this.nextRound()}
 begin(){const s=this.cur;this.o=fourTitles(s,6);this.audio=null;this.buf=null;this.tries=0;this.load()}
 load(){const i=this.idx,s=this.cur,k=bufTok();loadSong(s).then(b=>{if(k!==bufTok()||i!==this.idx||this.phase!=='q')return;if(!b){if(this.tries++<2){this.items[i]=SONGS[Math.random()*SONGS.length|0];this.o=fourTitles(this.cur,6);this.api.refresh();this.load()}else{this.audio=false;this.api.refresh()}return}this.buf=b;this.audio=true;const f=Math.min(8,Math.max(0,b.duration-14));playBuf(reversed(b,f,12),{loop:true,rate:1.3,rate2:.8,ms:this.qms-2000,vol:.75});this.api.refresh()})}
 ask(p:string){return{k:'choice',key:'t'+this.idx,prompt:'Vilken låt är det?',grid:1,opts:this.o.map(o=>({id:o,label:o})),sel:this.sel(p)}}
 close(){if(this.phase!=='q')return;super.close();if(this.buf)playBuf(this.buf,{from:Math.min(8,Math.max(0,this.buf.duration-14)),dur:8,vol:.75})}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(a?.v===this.cur.t){const s=pts(a.t,this.qms);this.api.award(p.id,s);a.s=s}})}
 result(p:string){const ok=this.ans[p]?.v===this.cur.t;return{k:'wait',msg:ok?`+${this.ans[p].s}`:'Fel',big:ok?'⏪':'😵',sub:`${this.cur.t} · ${this.cur.a}`,key:'r'+this.idx}}
 nextRound(){stopBuf();super.nextRound()}
 onLeave(){super.onLeave()}}
const RevTv=({g,show}:any)=><Stage kicker={`Baklängeslåten ${g.idx+1}/${g.items.length}`} title={g.phase==='q'?'Låten går baklänges':''}>{g.phase==='q'?<><div className={'disc '+(g.audio?'on':'')}><i/></div>{g.audio===false&&<p className="lead">Ljudet nådde inte fram. Gissa ändå!</p>}</>:<Reveal s={g.cur}/>}<Answered g={g} show={show}/></Stage>;
// Reklamkampen: reklamfilm i tio sekunder, gissa märket.
class Ads extends Next{kick='Reklamkampen';spare:any[]=[];get pr(){return 'Vilket märke är det?'}
 item(r:any){const w=shuffle(BRANDS.filter(b=>b!==r.b)).slice(0,3);return{id:r.id,start:0,stop:8,after:5,t:'Vilket märke?',a:r.b,w}}
 setup(){const a=this.api.used('ads',8,ADS.length).map((i:number)=>ADS[i]);this.items=a.slice(0,5).map((r:any)=>this.item(r));this.spare=a.slice(5)}
 badClip(){const r=this.spare.shift();if(!r)return false;this.items[this.idx]=this.item(r);this.begin();this.api.refresh();return true}
 result(p:string){const ok=this.ans[p]?.v===this.cur.a;return{k:'wait',msg:ok?'Rätt!':'Fel',big:ok?'📺':'😵',sub:this.cur.a,key:'r'+this.idx}}}
// Tidsresan: ledtrådar och en låt från samma år.
class Era extends RB{qms=30000;revealMs=7000;mood='';hint=1;song:any=null;audio:any=null;
 setup(){this.items=this.api.used('era',6,ERAS.length).map((i:number)=>ERAS[i])}start(){this.setup();this.nextRound()}
 begin(){const y=this.cur.y,i=this.idx;this.hint=1;const c=SONGS.filter((s:any)=>s.y===y);this.song=c.length?c[Math.random()*c.length|0]:null;this.audio=null;if(this.song)playSong(this.song).then(o=>{this.audio=o;this.api.refresh()});this.api.after(7000,()=>{if(this.idx===i&&this.phase==='q'){this.hint=2;this.api.sfx('tick');this.api.refresh()}});this.api.after(14000,()=>{if(this.idx===i&&this.phase==='q'){this.hint=3;this.api.sfx('tick');this.api.refresh()}})}
 ask(p:string){return{k:'slider',key:'s'+this.idx,prompt:'Vilket år är vi i?',min:1990,max:2026,step:1,unit:'',val:2008,sel:this.sel(p)}}
 score(){this.hint=3;this.api.players().forEach(p=>{const a=this.ans[p.id];if(!a)return;const d=Math.abs(a.v-this.cur.y);const s=d===0?1000:d===1?700:d<=3?400:d<=5?150:0;this.api.award(p.id,s);a.s=s})}
 result(p:string){return{k:'wait',msg:`+${this.ans[p]?.s||0}`,big:'🕰️',sub:`Rätt år: ${this.cur.y}`,key:'r'+this.idx}}
 nextRound(){stopSong();super.nextRound()}}
const EraTv=({g,show}:any)=><Stage kicker={`Tidsresan ${g.idx+1}/${g.items.length}`} title={g.phase==='q'?'Vilket år är vi i?':''}>{g.phase==='reveal'&&<div className="eray" key={g.cur.y}>{String(g.cur.y).split('').map((c,i)=><b key={i} style={{animationDelay:i*.12+'s'}}>{c}</b>)}</div>}<div className="hints">{g.cur.h.slice(0,g.hint).map((h:string,i:number)=><div className="hint" key={h}><b>{i+1}</b><span>{h}</span></div>)}</div>{g.song&&(g.phase==='reveal'?<p className="lead">🎵 {g.song.t} · {g.song.a}</p>:<div className="eqs"><Vis ok={g.audio}/></div>)}<Answered g={g} show={show}/></Stage>;
// Citatkampen: Sixten läser en känd replik.
class Quote extends RB{qms=20000;revealMs=5000;mood='tense';o:string[]=[];
 setup(){this.items=this.api.used('quote',8,QUOTES.length).map((i:number)=>QUOTES[i])}
 begin(){const q=this.cur;this.o=shuffle([q.a,...shuffle(QTITLES.filter(t=>t!==q.a)).slice(0,3)]);if(hasVoice(q.q))this.api.say(q.q)}
 ask(p:string){return{k:'choice',key:'q'+this.idx,prompt:'Var kommer repliken ifrån?',opts:this.o.map(o=>({id:o,label:o})),sel:this.sel(p)}}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(a?.v===this.cur.a)this.api.award(p.id,pts(a.t,this.qms))})}
 result(p:string){const ok=this.ans[p]?.v===this.cur.a;return{k:'wait',msg:ok?'Rätt!':'Fel',big:ok?'🎬':'😵',sub:this.cur.a,key:'r'+this.idx}}}
const QuoteTv=({g,show}:any)=><Stage kicker={`Citatkampen ${g.idx+1}/${g.items.length}`} title=""><blockquote className="quote" key={g.idx}>{g.cur.q.split(' ').map((w:string,i:number)=><span key={i} style={{animationDelay:i*.14+'s'}}>{w} </span>)}</blockquote><Opts g={g} list={g.o} right={g.phase==='reveal'?g.cur.a:null}/><Answered g={g} show={show}/></Stage>;
// Baklängesrösten: en spelare spelar in en mening, tv:n spelar den baklänges.
class Back extends RB{qms=25000;revealMs=7000;mood='';quiet=true;start(){this.setup();this.nextRound()}stage='rec';pcm:string|null=null;o:string[]=[];
 setup(){const hs=shuffle(this.api.players().filter((p:any)=>!p.bot));const n=Math.min(4,Math.max(2,hs.length));const ph=this.api.used('bk',n,PHRASES.length).map((i:number)=>PHRASES[i]);this.items=ph.map((t:string,i:number)=>({sp:hs[i%hs.length]?.id,t}))}
 answerers(){return this.stage==='rec'?this.api.online().filter(x=>x.id===this.cur.sp):this.api.online().filter(x=>x.id!==this.cur.sp)}
 begin(){this.stage='rec';this.pcm=null;this.o=shuffle([this.cur.t,...shuffle(PHRASES.filter(x=>x!==this.cur.t)).slice(0,3)])}
 play(rev:boolean){if(!this.pcm||!snd.ctx)return;let b:any=null;try{b=pcmBuffer(this.pcm,rev)}catch(e){console.warn(e);return}playBuf(b,{loop:rev,vol:1,rate:1})}
 ask(p:string){const sp=nameOf({players:this.api.players()},this.cur.sp);if(this.stage==='rec')return p===this.cur.sp?{k:'rec',key:'r'+this.idx,prompt:`Säg högt: ”${this.cur.t}”`,ms:3500}:{k:'wait',msg:`${sp?.name||'Någon'} spelar in`,big:'🎙️',key:'w'+this.idx};return p===this.cur.sp?{k:'wait',msg:'De andra gissar',big:'🤫',key:'g'+this.idx}:{k:'choice',key:'c'+this.idx,prompt:'Vad sa personen?',grid:1,opts:this.o.map(o=>({id:o,label:o})),sel:this.sel(p)}}
 onInput(p:string,d:any){if(this.phase!=='q')return;if(this.stage==='rec'){if(p!==this.cur.sp)return;if(d.a==='skip')return this.skip();if(d.a==='rec'&&typeof d.pcm==='string'&&d.pcm.length>2000&&d.pcm.length<120000){this.pcm=d.pcm;this.stage='guess';this.ans={};this.t0=this.api.now();this.api.sfx('reveal');this.api.stopCountdown();this.api.countdown(20000,()=>this.close());this.play(true);if(!this.answerers().length)this.close();this.api.refresh()}return}if(p===this.cur.sp)return;super.onInput(p,d)}
 skip(){if(this.phase!=='q')return;this.phase='reveal';this.pcm=null;this.api.stopCountdown();this.api.after(1200,()=>this.nextRound());this.api.refresh()}
 close(){if(this.phase!=='q')return;if(this.stage==='rec')return this.skip();super.close();this.play(false)}
 score(){let right=0;this.api.players().forEach(p=>{const a=this.ans[p.id];if(a?.v===this.cur.t){this.api.award(p.id,pts(a.t,20000));right++}});if(right)this.api.award(this.cur.sp,right*300)}
 onLeave(p?:string){if(this.phase==='q'&&this.stage==='rec'&&p===this.cur?.sp)return this.skip();if(this.stage==='guess')super.onLeave()}
 result(p:string){const ok=this.ans[p]?.v===this.cur.t;return{k:'wait',msg:p===this.cur.sp?'Bra jobbat!':ok?'Rätt!':'Fel',big:'🎙️',sub:this.cur.t,key:'e'+this.idx}}
 nextRound(){stopBuf();super.nextRound()}}
const BackTv=({g,show}:any)=>{const sp=nameOf(show,g.cur.sp);return <Stage kicker={`Baklängesrösten ${g.idx+1}/${g.items.length}`} title={g.stage==='rec'?`${sp?.name||'Någon'} spelar in…`:g.phase==='q'?'Vad säger personen?':''}>{g.stage==='rec'?(g.phase==='q'?<div className="micpulse">🎙️</div>:<p className="lead">Ingen inspelning, vi går vidare.</p>):g.phase==='q'?<><div className="disc on"><i/></div><Opts g={g} list={g.o}/></>:<><div className="songrev"><b>”{g.cur.t}”</b><span>Så här lät det på rätt håll</span></div><Opts g={g} list={g.o} right={g.cur.t}/></>}<Answered g={g} show={show}/></Stage>};
export const FRESHG=[
{id:'rev',title:'Baklängeslåten',tag:'Låtar som går bakåt',how:'Låten spelas baklänges och går långsammare och långsammare. Gissa låten så snabbt du kan.',cat:'Musik',icon:'⏪',mins:4,make:(a:any)=>new Rev(a),Tv:RevTv},
{id:'ads',title:'Reklamkampen',tag:'Gissa märket',how:'Se reklamfilmen. Vilket märke är det?',cat:'Bild',icon:'📺',mins:4,make:(a:any)=>new Ads(a),Tv:NextTv},
{id:'era',title:'Tidsresan',tag:'Vilket år är vi i?',how:'Ledtrådarna och låten är från samma år. Gissa året med reglaget.',cat:'Quiz',icon:'🕰️',mins:4,make:(a:any)=>new Era(a),Tv:EraTv},
{id:'quote',title:'Citatkampen',tag:'Kända repliker',how:'Här kommer en känd replik. Vilken film eller serie är den från?',cat:'Quiz',icon:'🎬',mins:3,make:(a:any)=>new Quote(a),Tv:QuoteTv},
{id:'back',title:'Baklängesrösten',tag:'Spela in och gissa',how:'En spelare säger en mening i telefonen. Tv:n spelar den baklänges. De andra gissar vad som sades.',cat:'Party',icon:'🎙️',min:2,humans:1,mins:4,needs:'mic',make:(a:any)=>new Back(a),Tv:BackTv},
];
