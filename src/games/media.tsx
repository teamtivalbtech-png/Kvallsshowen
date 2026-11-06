import React,{useEffect,useRef} from 'react';import {GeoReveal} from '../ui/map';import {RB,shuffle,Stage,Answered,Opts,pts,nameOf} from './base';import geo from '../content/geo.json';import {REELS,EMOJI} from '../content/reel';import {SONGS} from '../content/more';import credits from '../content/imageCredits.json';import {playSong,stopSong,resumeSong} from './songs';import {hostState} from '../host';import {snd} from '../audio';
const near=(s:any,o:any)=>Math.abs(o.y-s.y)<9;
export const fourTitles=(s:any,n=4)=>{const same=shuffle(SONGS.filter(x=>x.t!==s.t&&near(s,x))).map(x=>x.t);return shuffle([s.t,...[...new Set([...same,...shuffle(SONGS).map(x=>x.t)])].filter(t=>t!==s.t).slice(0,n-1)])};
export const fourArtists=(s:any,n=4)=>{const near2=shuffle(SONGS.filter(x=>x.a!==s.a&&near(s,x))).map(x=>x.a);return shuffle([s.a,...[...new Set([...near2,...shuffle(SONGS).map(x=>x.a)])].filter(a=>a!==s.a).slice(0,n-1)])};
export const Vis=({ok}:any)=><div className={'eq '+(ok===false?'mute':'')}>{Array.from({length:18},(_, i)=><i key={i} style={{animationDelay:-i*.17+'s'}}/>)}{ok===false&&<p>Ljudet nådde inte fram. Svara ändå eller hoppa vidare.</p>}</div>;
class Song extends RB{qms=22000;revealMs=6000;mood='';audio:any=null;part=0;p2=[]as any[];
 setup(){this.items=this.api.used('song',8,SONGS.length).map((i:number)=>({...SONGS[i],ts:null}));}
 begin(){const s=this.cur;s.ts=fourTitles(s,6);s.as=fourArtists(s,6);this.part=0;this.audio=null;playSong(s).then(ok=>{this.audio=ok;this.api.refresh()})}
 start(){this.setup();this.nextRound()}
 ask(p:string){const s=this.cur,a=this.ans[p];if(!a?.t2&&a?.title==null)return{k:'choice',key:'t'+this.idx,prompt:'Vilken låt?',grid:1,opts:s.ts.map((o:string)=>({id:o,label:o}))};return{k:'choice',key:'a'+this.idx,prompt:'Vilken artist?',grid:1,opts:s.as.map((o:string)=>({id:o,label:o})),sel:a.artist}}
 onInput(p:string,d:any){if(this.phase!=='q')return;const a=this.ans[p]||(this.ans[p]={t:this.api.now()-this.t0,v:null,title:null,artist:null});if(a.title==null)a.title=d.a;else if(a.artist==null)a.artist=d.a;a.done=a.title!=null&&a.artist!=null;this.api.sfx('tick');if(this.answerers().every(x=>this.ans[x.id]?.done))this.close();this.api.refresh()}
 sel(){return null}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(!a)return;let s=0;if(a.title===this.cur.t)s+=pts(a.t,this.qms,700);if(a.artist===this.cur.a)s+=500;this.api.award(p.id,s);a.s=s})}
 close(){super.close()}
 result(p:string){return{k:'wait',msg:`+${this.ans[p]?.s||0}`,big:'🎵',sub:`${this.cur.t} · ${this.cur.a}`,key:'r'+this.idx}}
 nextRound(){stopSongLater(this);super.nextRound()}}
function stopSongLater(g:any){stopSong()}
export const Reveal=({s})=> <div className="songrev"><b>{s.t}</b><span>{s.a} · {s.y}</span></div>;
const SongTv=({g,show}:any)=>{const s=g.cur;return <Stage kicker={`Låtkampen ${g.idx+1}/${g.items.length}`} title={g.phase==='q'?'Vilken låt är det?':''}>{g.phase==='q'?<Vis ok={g.audio}/>:<Reveal s={s}/>}<Answered g={g} show={show}/></Stage>};
class Year extends RB{qms=22000;revealMs=6500;mood='';setup(){this.items=this.api.used('song',8,SONGS.length).map((i:number)=>SONGS[i])}
 audio:any=null;begin(){this.audio=null;playSong(this.cur).then(ok=>{this.audio=ok;this.api.refresh()})}start(){this.setup();this.nextRound()}
 ask(p:string){return{k:'slider',prompt:`${this.cur.t} · ${this.cur.a}`,min:1960,max:2026,step:1,unit:'',val:1995,sel:this.sel(p)}}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(!a)return;const d=Math.abs(a.v-this.cur.y);const s=d===0?1000:d<=1?700:d<=3?450:d<=6?200:0;this.api.award(p.id,s);a.s=s;a.d=d})}
 result(p:string){return{k:'wait',msg:`+${this.ans[p]?.s||0}`,big:'📅',sub:`Rätt år: ${this.cur.y}`,key:'r'+this.idx}}
 nextRound(){stopSong();super.nextRound()}}
const YearTv=({g,show}:any)=><Stage kicker={`Årtalet ${g.idx+1}/${g.items.length}`} title={g.phase==='q'?'Vilket år kom låten?':g.cur.y}>{g.phase==='q'?<><Vis ok={g.audio}/><h2 className="sub">{g.cur.t}</h2><p className="lead">{g.cur.a}</p></>:<Reveal s={g.cur}/>}<Answered g={g} show={show}/></Stage>;
class Intro extends RB{qms=30000;revealMs=5500;mood='';locked:Record<string,1>={};by:string|null=null;opts:string[]=[];buzz:any[]=[];audio:any=null;
 setup(){this.items=this.api.used('song',8,SONGS.length).map((i:number)=>SONGS[i])}start(){this.setup();this.nextRound()}
 begin(){this.locked={};this.by=null;this.buzz=[];this.opts=fourTitles(this.cur,6);this.audio=null;playSong(this.cur).then(o=>{this.audio=o;this.api.refresh()})}
 onInput(p:string,d:any){if(this.phase!=='q')return;if(d.a==='buzz'){if(this.by||this.locked[p])return;this.buzz.push({p,t:d.t||Date.now()});if(this.buzz.length===1)this.api.after(180,()=>this.grant())}else if(p===this.by){if(d.a===this.cur.t){this.api.award(p,1000);this.api.sfx('correct');this.close()}else{this.api.award(p,-300);this.api.sfx('wrong');this.locked[p]=1;this.by=null;this.buzz=[];resumeSong();if(this.api.online().every(x=>this.locked[x.id]))this.close()}}this.api.refresh()}
 grant(){if(this.phase!=='q'||this.by||!this.buzz.length)return;this.by=this.buzz.sort((a,b)=>a.t-b.t)[0].p;stopSong();this.api.sfx('buzz')}
 score(){}ask(p:string){if(this.by===p)return{k:'choice',key:'c'+this.idx,prompt:'Du summade! Vilken låt?',grid:1,opts:this.opts.map(o=>({id:o,label:o}))};return{k:'buzzer',key:'z'+this.idx,off:!!this.by||!!this.locked[p],label:this.locked[p]?'Låst':this.by?'Väntar':'SUMMER'}}
 result(){return{k:'wait',msg:this.cur.t,sub:this.cur.a,big:'🔔',key:'r'+this.idx}}nextRound(){stopSong();super.nextRound()}}
const IntroTv=({g,show}:any)=>{const b=g.by&&nameOf(show,g.by);return <Stage kicker={`Introduellen ${g.idx+1}/${g.items.length}`} title={g.phase==='reveal'?'':b?`${b.avatar} ${b.name} summade!`:'Tryck först när du känner igen låten'}>{g.phase==='q'&&(b?<p className="lead">Svarar på telefonen…</p>:<Vis ok={g.audio}/>)}{g.phase==='reveal'&&<Reveal s={g.cur}/>}</Stage>};
class MK extends RB{qms=18000;revealMs=5000;mood='';part=0;audio:any=null;
 setup(){this.items=this.api.used('song',6,SONGS.length).flatMap((i:number)=>[0,1,2].map(k=>({...SONGS[i],k})))}start(){this.setup();this.nextRound()}
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
// Kända klipp spelas från YouTube, fryser vid "stop" och fortsätter efter svaren. Finjustera tiderna här.
const CLIPS=[
 {id:'93hq0YU3Gqk',t:'Pandaungen',start:0,stop:8,after:8,a:'Ungen nyser så högt att mamman hoppar till',w:['Mamman knuffar ner ungen','Ungen ramlar av stenen','Mamman ger ungen bambu']},
 {id:'0Bmhjf0rKe8',t:'Kattungen som kittlas',start:0,stop:3,after:8,a:'Den sträcker upp tassarna som vid ett rån',w:['Den biter i fingret','Den springer iväg','Den somnar direkt']},
 {id:'4hpEnLtqUDg',t:'Soldaten som dansar ensam',start:4,stop:13,after:10,a:'Plötsligt dansar alla helt vilt',w:['Befälet kommer in och stoppar allt','Alla går och lägger sig','Han ramlar och slår sig']},
 {id:'NbdNP0TYlbg',t:'Hunden i parken',start:0,stop:3,after:10,a:'Hunden jagar en hel hjorthjord och ägaren skriker förtvivlat',w:['Hunden lägger sig snällt','Hjortarna jagar hunden','Hunden hoppar i en damm']},
 {id:'Cqd1Gvq-RBY',t:'Killen framför webbkameran',start:0,stop:2,after:8,a:'Han mimar och dansar vilt på stolen',w:['Han somnar','Hans mamma kommer in','Datorn kraschar']},
 {id:'_OBlgSz8sSM',t:'Charlie bit my finger',start:2,stop:11,after:9,a:'Charlie biter brodern hårt i fingret',w:['Bebisen börjar sjunga','Pappan tar över kameran','Brodern tappar bebisen']},
 {id:'txqiwrbYGrs',t:'David efter tandläkaren',start:9,stop:18,after:10,a:'David undrar om det här är på riktigt',w:['Han somnar direkt','Han hoppar ur bilen','Han börjar gråta av skratt']},
 {id:'OQSNhk5ICTI',t:'Double Rainbow',start:7,stop:16,after:9,a:'Han blir helt överväldigad av lycka',w:['Han börjar bygga ett tält','En björn dyker upp','Han lägger av att filma']},
 {id:'dQw4w9WgXcQ',t:'Klippet alla blivit lurade av',start:6,stop:14,after:8,a:'Rick sjunger att han aldrig ska ge dig upp',w:['Han tar av sig rocken','Han ramlar','Polisen kommer']},
 {id:'LU8DDYz68kM',t:'Battle at Kruger',start:240,stop:250,after:10,a:'Bufflarna kommer tillbaka och jagar bort lejonen',w:['En elefant räddar kalven','Turisterna ingriper','Lejonen flyr över floden']},
 {id:'jxzD_XU6N74',t:'Ola vid stugan i Hälsingland',start:0,stop:6,after:9,a:'En björn rusar fram ur buskarna',w:['Han hittar en älg','Grannen kommer och skäller','Han ramlar i bäcken']},
 {id:'gRrqzIYS-44',t:'Kaj badar',start:0,stop:6,after:9,a:'Kaj simmar ur bild och Eva ropar efter honom',w:['Kaj dyker och kommer aldrig upp','Eva ramlar i sjön','En båt kör förbi']},
 {id:'ZIbLMBodWfw',t:'Peter Forsberg, OS-finalen 1994',start:0,stop:4,after:9,a:'Han fintar med ena handen och sätter pucken',w:['Han skjuter över målet','Målvakten räddar','Han tappar pucken']},
 {id:'RM_5tJncHww',t:'Zlatan mot England 2012',start:0,stop:5,after:9,a:'Han cykelsparkar in bollen från 30 meter',w:['Han nickar i ledstången','Målvakten plockar enkelt bollen','Domaren blåser av']},
 {id:'J---aiyznGQ',t:'Keyboard Cat',start:0,stop:3,after:7,a:'Katten börjar spela keyboard',w:['Katten somnar','Katten hoppar ner','Ägaren tar katten']},
];
let ytLoad:Promise<void>|null=null;const yt=()=>ytLoad||=new Promise(ok=>{(window as any).onYouTubeIframeAPIReady=()=>ok();const s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';s.onerror=()=>{};document.head.appendChild(s)});
export class Next extends RB{qms=120000;get pr(){return 'Vad händer sen?'}kick='Vad händer sen?';revealMs=9000;o:string[]=[];ready=false;fallback=false;
 setup(){this.items=this.api.used('clip',4,CLIPS.length).map((i:number)=>CLIPS[i])}
 begin(){const c=this.cur;if(c.id&&!c.adj){c.adj=1;let o=0;try{o=+(localStorage.getItem('ks-clip-'+c.id)||0)}catch{};c.stop=Math.max(2,c.stop+o);c.start=Math.max(0,c.stop-10)}this.ready=false;this.fallback=false;this.revealMs=(c.after+1)*1000;this.o=shuffle([c.a,...c.w]);const i=this.idx;this.api.after(Math.max(9000,(c.stop-c.start)*1000+7000),()=>{if(this.idx===i&&!this.ready){this.fallback=true;this.open()}})}
 open(){if(this.ready)return;this.ready=true;this.t0=this.api.now();this.api.countdown(12000,()=>this.close());this.api.refresh()}
 onInput(p:string,d:any){if(this.phase==='reveal'&&(d.a==='tidigare'||d.a==='senare')&&this.cur.id){const k='ks-clip-'+this.cur.id;let o=0;try{o=+(localStorage.getItem(k)||0)+(d.a==='tidigare'?-3:3);localStorage.setItem(k,String(o))}catch{};this.api.sfx('tick');return}if(this.ready)super.onInput(p,d)}
 ask(p:string){return this.ready?{k:'choice',prompt:this.pr,opts:this.o.map(o=>({id:o,label:o})),sel:this.sel(p)}:{k:'wait',msg:'Titta på tv:n',sub:'Klippet stannar snart',big:'📺',key:'v'+this.idx}}
 score(){this.api.players().forEach(p=>{const a=this.ans[p.id];if(a?.v===this.cur.a)this.api.award(p.id,pts(a.t,12000))})}
 result(p:string){const m=this.ans[p]?.v===this.cur.a?'Rätt!':'Fel';return this.cur.id&&!this.cur.emoji?{k:'actions',key:'r'+this.idx,title:m,body:`${this.cur.a}. Pausade klippet för sent eller tidigt?`,btns:[{id:'tidigare',label:'Pausa 3 s tidigare'},{id:'senare',label:'Pausa 3 s senare'}]}:{k:'wait',msg:m,sub:this.cur.a,key:'r'+this.idx}}}
const Y:any={p:null,box:null,sound:false,cb:null};
class Reel extends Next{spare:any[]=[];kick='Klippkampen';get pr(){return this.cur.t}
 item(r:any){const s=r.s??22;return{id:r.id,start:s,stop:s+10,after:3,t:'Vilken film eller serie?',a:r.a,w:shuffle(r.w).slice(0,5)}}
 // Går ett klipp inte att spela tas ett reservklipp i stället.
 badClip(){const r=this.spare.shift();if(!r)return false;this.items[this.idx]=this.item(r);this.items[this.idx+1]={text:1,t:r.fq,a:r.fa,w:r.fw};this.begin();this.api.refresh();return true}
 setup(){const seen=new Set();const all=this.api.used('reel',7,REELS.length).map((i:number)=>REELS[i]).filter((r:any)=>!seen.has(r.a)&&seen.add(r.a));const rs=all.slice(0,3);this.spare=all.slice(3);const es=this.api.used('emoji',4,EMOJI.length).map((i:number)=>EMOJI[i]);const it:any[]=[];rs.forEach((r:any,i:number)=>{it.push(this.item(r));it.push({text:1,t:r.fq,a:r.fa,w:r.fw});if(es[i])it.push({emoji:es[i].emoji,t:'Gissa från emojis',a:es[i].a,w:es[i].w})});this.items=it}
 begin(){const c=this.cur;if(c.id)return super.begin();this.fallback=false;this.ready=false;this.revealMs=4500;this.o=shuffle([c.a,...c.w]);this.open()}}
function ytPlayer(){return new Promise<any>(ok=>{if(Y.p)return ok(Y.p);Y.box=document.createElement('div');Y.box.className='ytbox';const d=document.createElement('div');Y.box.appendChild(d);const cv=document.createElement('div');cv.className='ytcover';cv.innerHTML='<i></i>';Y.box.appendChild(cv);(document.querySelector('.tv')||document.body).appendChild(Y.box);const P=new ((window as any).YT.Player)(d,{width:'100%',height:'100%',host:'https://www.youtube-nocookie.com',playerVars:{autoplay:0,controls:0,rel:0,modestbranding:1,playsinline:1,iv_load_policy:3,disablekb:1,fs:0,origin:location.origin},events:{onReady:(e:any)=>{Y.p=e.target;ok(Y.p)},onStateChange:(e:any)=>Y.cb?.(e.data),onError:()=>Y.err?.()}});try{P.getIframe?.().setAttribute('allow','autoplay; encrypted-media; picture-in-picture')}catch{}})}
const SILENT='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
const V:any={el:null,on:false};
// Körs i tv:ns startklick. Då får spelaren rätt att spela med ljud resten av kvällen.
/** Lägger YouTube-rutan osynligt över startknappen, så att klicket landar inne i spelaren och ger den rätt att spela ljud. */
export function armGate(el:HTMLElement,pass:()=>void){let done=false,live=true;const off=()=>{window.removeEventListener('blur',blur)};const fin=()=>{if(done||!live)return;done=true;off();pass()};const blur=()=>{setTimeout(()=>{if(document.activeElement?.tagName==='IFRAME')fin()},0)};window.addEventListener('blur',blur);
 yt().then(ytPlayer).then((p:any)=>{if(!live||done)return;const r=el.getBoundingClientRect();Object.assign(Y.box.style,{display:'block',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});Y.box.classList.add('gatehit');p.setVolume(1);p.cueVideoById({videoId:CLIPS[0].id});Y.cb=(s:number)=>{if(s===1||s===3)fin()}}).catch(()=>{});
 return()=>{live=false;off();Y.cb=null;try{Y.p?.stopVideo?.();Y.p?.setVolume?.(70);if(Y.box){Y.box.classList.remove('gatehit');Y.box.style.display='none'}window.focus()}catch{}}}
export function unlockClips(){Y.sound=true;if(!V.el){const e=document.createElement('video');e.playsInline=true;e.setAttribute('playsinline','');e.preload='auto';e.className='clipv';V.el=e}try{V.el.muted=false;V.el.src=SILENT;const r=V.el.play();r?.then?.(()=>{V.on=true;V.el.pause()}).catch(()=>{})}catch{}yt().then(ytPlayer).catch(()=>{})}
function Vf({g}:any){const box=useRef<HTMLDivElement>(null),c=g.cur;const[on,setOn]=React.useState(false);const[muted,setM]=React.useState(false);
 useEffect(()=>{if(!V.el)unlockClips();const e:HTMLVideoElement=V.el;let t:any,live=true;box.current?.appendChild(e);e.src=c.file;e.currentTime=c.start||0;e.muted=false;e.volume=.7;
  const go=()=>{const r=e.play();r?.catch?.(()=>{if(!live)return;e.muted=true;setM(true);e.play().catch(()=>{g.fallback=true;g.open()})})};
  e.onerror=()=>{if(live){g.fallback=true;g.open()}};e.onplaying=()=>setOn(true);e.oncanplay=()=>{e.oncanplay=null;go()};e.load();e.currentTime=c.start||0;
  t=setInterval(()=>{e.volume=hostState.talking?.21:.7;if(!g.ready&&e.currentTime>=c.stop){e.pause();g.open()}},60);
  return()=>{live=false;clearInterval(t);e.oncanplay=e.onplaying=e.onerror=null;e.pause();e.remove()}},[c.file]);
 useEffect(()=>{snd.music('lobby');snd.duck(true);return()=>snd.duck(false)},[]);
 useEffect(()=>{if(g.phase==='reveal')V.el?.play().catch(()=>{})},[g.phase]);
 useEffect(()=>{if(!muted)return;const f=()=>{V.el.muted=false;setM(false);V.el.play().catch(()=>{})};window.addEventListener('pointerdown',f);window.addEventListener('keydown',f);return()=>{window.removeEventListener('pointerdown',f);window.removeEventListener('keydown',f)}},[muted]);
 return <><div className="yt" ref={box}/>{muted&&<div className="big vsound">🔊 Tryck för ljud</div>}{!on&&!g.ready&&<div className="vload">Laddar klippet…</div>}</>}
function Yt({g}:any){const box=useRef<HTMLDivElement>(null),c=g.cur;const[on,setOn]=React.useState(false);const[muted,setM]=React.useState(false);
 useEffect(()=>{let t:any,live=true,tried=1,t0=Date.now();Y.err=()=>{if(g.badClip?.())return;g.fallback=true;g.open()};const place=()=>{if(!Y.box||!box.current)return;const r=box.current.getBoundingClientRect();Object.assign(Y.box.style,{display:'block',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'})};
  yt().then(ytPlayer).then((p:any)=>{if(!live)return;place();const silent=(on:boolean)=>{setM(on);Y.box?.classList.toggle('tap',on)};let checking=false;
   let gave=false;const check=()=>{if(checking||gave||!live)return;if(!p.isMuted?.())return silent(false);checking=true;p.unMute();setTimeout(()=>{checking=false;if(!live)return;if(p.isMuted?.()||p.getPlayerState?.()===2){gave=true;p.mute();if(!g.ready)p.playVideo();silent(true)}else silent(false)},700)};
   Y.cb=(s:number)=>{setOn(s===1);if(s===0&&!g.ready){g.open();return}if(s===1)check();else if(s===2&&!g.ready&&tried===1&&!checking){if(Y.box?.classList.contains('tap')){gave=false;p.unMute();p.playVideo();silent(false)}else{tried=2;p.mute();silent(true);p.playVideo()}}};Y.v=0;p.unMute();p.setVolume(0);p.loadVideoById({videoId:c.id,startSeconds:c.start});
   let clipT0=0,nudged=false;t=setInterval(()=>{place();{const near=!g.ready&&clipT0>0&&c.stop-(p.getCurrentTime?.()||0)<.7,want=near?0:hostState.talking?21:70;Y.v=Y.v==null?want:Y.v+Math.max(-7,Math.min(7,want-Y.v));p.setVolume?.(Math.round(Y.v))}const ps=p.getPlayerState?.();
    // Skärmen täcks tills klippet verkligen rullar: YouTube visar annars titeln, alltså svaret, medan det laddar.
    if(ps===1&&(p.getCurrentTime?.()||0)>=c.start+.3)Y.box?.classList.add('live');else if(ps!==3)Y.box?.classList.remove('live');if(!clipT0&&!g.ready&&Date.now()-t0>16000){clearInterval(t);Y.err?.();return}
    if(tried===1&&!clipT0&&ps!==1&&ps!==3){const w=Date.now()-t0;if(w>3500&&!nudged){nudged=true;p.playVideo()}if(w>9000){tried=2;p.mute();silent(true);p.playVideo()}}if(!clipT0&&p.getPlayerState?.()===1)clipT0=Date.now();if(!g.ready&&(p.getCurrentTime()>=c.stop||(clipT0&&Date.now()-clipT0>10000))){tried=3;p.pauseVideo();g.open()}},120)});
  return()=>{live=false;clearInterval(t);Y.cb=null;try{Y.p?.pauseVideo();if(Y.box){Y.box.style.display='none';Y.box.classList.remove('tap','live')}}catch{}}},[c.id]);
 useEffect(()=>{snd.music('lobby');if(!muted)snd.duck(true);return()=>snd.duck(false)},[muted]);
 useEffect(()=>{if(g.phase==='reveal')try{Y.p?.playVideo()}catch{}},[g.phase]);
 const sound=()=>{try{Y.sound=true;Y.p.unMute();Y.p.setVolume(70);Y.p.playVideo();setM(false)}catch{}};
 useEffect(()=>{if(!muted)return;window.addEventListener('pointerdown',sound);window.addEventListener('keydown',sound);return()=>{window.removeEventListener('pointerdown',sound);window.removeEventListener('keydown',sound)}},[muted]);
 return <><div className="yt" ref={box}/>{muted&&<div className="big vsound">🔊 Tryck på videon för ljud</div>}{!on&&!g.ready&&<div className="vload">Laddar klippet…</div>}</>}
export const NextTv=({g,show}:any)=>{const c=g.cur;if(c.text||c.emoji)return <Stage kicker={`Klippkampen ${g.idx+1}/${g.items.length}`} title={c.t}>{c.emoji&&<div className="emoji e3">{c.emoji}</div>}<Opts list={g.o} right={g.phase==='reveal'?c.a:null}/><Answered g={g} show={show}/></Stage>;return <div className="nx"><div className="vid" key={g.idx}>{g.fallback?<div className="vfb">Videon kunde inte spelas</div>:c.file?<Vf g={g}/>:<Yt g={g}/>}{g.ready&&g.phase==='q'&&<div className="frz on">{g.pr}</div>}{c.by&&<small className="vby">Klipp: {c.by}</small>}</div><Stage kicker={`${g.kick} ${g.idx+1}/${g.items.length}`} title={c.t}>{g.ready?<Opts list={g.o} right={g.phase==='reveal'?c.a:null}/>:<p className="lead">Titta noga. Klippet stannar snart.</p>}<Answered g={g} show={show}/></Stage></div>};
const km=(a:number,b:number,c:number,d:number)=>{const r=Math.PI/180,x=Math.sin((c-a)*r/2)**2+Math.cos(a*r)*Math.cos(c*r)*Math.sin((d-b)*r/2)**2;return 12742*Math.asin(Math.sqrt(x))};
const mx=(lng:number)=>(lng+180)/360*100,my=(lat:number)=>(85-lat)/145*100;
const LM:any={'Neuschwanstein':[47.557,10.75],'Empire State Building':[40.748,-73.986],'Niagarafallen':[43.08,-79.07],'Tower Bridge':[51.505,-0.075],'Basilkatedralen':[55.753,37.623],'Petra':[30.32,35.45],'Angkor Wat':[13.41,103.87],'Chichén Itzá':[20.68,-88.57],'Eiffeltornet':[48.858,2.294],'Colosseum':[41.89,12.49],'Taj Mahal':[27.175,78.042],'Big Ben':[51.5,-0.12],'Öresundsbron':[55.57,12.85],'Globen':[59.29,18.08],'Sagrada Família':[41.4,2.17],'Pyramiderna i Giza':[29.98,31.13],'Kinesiska muren':[40.43,116.57],'Operahuset i Sydney':[-33.86,151.21],'Machu Picchu':[-13.16,-72.55],'Stonehenge':[51.18,-1.83],'Akropolis':[37.97,23.73],'Burj Khalifa':[25.2,55.27],'Frihetsgudinnan':[40.69,-74.04],'Golden Gate-bron':[37.82,-122.48],'Brandenburger Tor':[52.52,13.38]};
const PLACES=[...(geo as any[]).map(x=>({...x,src:'/geo/'+x.file})),...(credits as any[]).filter(c=>LM[c.name]).map(c=>({...c,src:'/img/'+c.file,lat:LM[c.name][0],lng:LM[c.name][1]}))];
class Geo extends RB{qms=35000;revealMs=9000;rows:any[]=[];ok(a:any){return Array.isArray(a)&&isFinite(a[0])&&isFinite(a[1])&&a[0]!==null&&a[1]!==null}setup(){this.items=this.api.used('geo',6,PLACES.length).map((i:number)=>PLACES[i])}
 ask(p:string){return{k:'geo',prompt:'Var är bilden tagen?',sel:this.sel(p)}}
 score(){const c=this.cur;this.rows=Object.entries(this.ans).map(([id,a]:any)=>({id,lat:a.v[0],lng:a.v[1],d:Math.round(km(a.v[0],a.v[1],c.lat,c.lng))})).sort((x,y)=>x.d-y.d);this.rows.forEach(r=>{r.p=Math.round(1000*Math.exp(-r.d/1800));this.api.award(r.id,r.p)})}
 result(p:string){const r=this.rows.find(x=>x.id===p);return{k:'wait',msg:this.cur.name,sub:r?`${r.d.toLocaleString('sv-SE')} km fel · +${r.p}`:'Ingen gissning',big:'📍',key:'r'+this.idx}}}
const GeoTv=({g,show}:any)=>{const c=g.cur;if(g.phase==='q')return <div className="geo"><img key={c.src} src={c.src} alt=""/><div className="geoh"><span>GeoGuessr {g.idx+1}/{g.items.length}</span><Answered g={g} show={show}/></div></div>;return <div className="geomap"><GeoReveal c={c} rows={g.rows} show={show}/><div className="geor"><h2>{c.name}</h2><small>Foto: {c.author} · {c.license}</small><div className="rows">{g.rows.slice(0,6).map((r:any,i:number)=>{const p=nameOf(show,r.id);return <div key={r.id} style={{animationDelay:i*.15+'s'}}><b>{i+1}</b>{p?.name}<em>{r.d.toLocaleString('sv-SE')} km</em><i>+{r.p}</i></div>})}</div></div></div>};
export const MEDIAG=[
{id:'song',title:'Låtkampen',tag:'Låt och artist',how:'Lyssna på tv:n. Välj låt och sedan artist.',cat:'Musik',icon:'🎵',mins:5,make:(a:any)=>new Song(a),Tv:SongTv},
{id:'year',title:'Årtalet',tag:'Vilket år kom låten?',how:'Du får låten. Gissa året med reglaget.',cat:'Musik',icon:'📅',mins:5,make:(a:any)=>new Year(a),Tv:YearTv},
{id:'intro',title:'Introduellen',tag:'Tryck först',how:'Tryck på summern när du känner igen låten. Fel svar låser dig och kostar poäng.',cat:'Musik',icon:'🔔',mins:5,make:(a:any)=>new Intro(a),Tv:IntroTv},
{id:'mk',title:'Musikkampen',tag:'Artist, låt och år',how:'Tre snabba frågor på varje låt.',cat:'Klassiker',icon:'🎶',mins:6,make:(a:any)=>new MK(a),Tv:MKTv},
{id:'reel',title:'Klippkampen',tag:'Film och serier',how:'Se ett kort klipp eller gissa filmen från emojis. Sedan kommer följdfrågor.',cat:'Bild',icon:'🎬',mins:6,make:(a:any)=>new Reel(a),Tv:NextTv},
{id:'geo',title:'GeoGuessr',tag:'Var i världen?',how:'Du ser en bild på tv:n. Sätt en nål på kartan i telefonen. Närmast får flest poäng.',cat:'Bild',icon:'🌍',mins:5,make:(a:any)=>new Geo(a),Tv:GeoTv},
{id:'zoom',title:'Zooma ut',tag:'Från närbild till helhet',how:'Bilden zoomas ut. Svara tidigt för mest poäng.',cat:'Bild',icon:'🔍',mins:4,make:(a:any)=>new Zoom(a),Tv:ZoomTv},
{id:'next',title:'Vad händer sen?',tag:'Klippet fryser',how:'Ett kort klipp stannar. Gissa vad som händer sen.',cat:'Bild',icon:'⏸️',mins:4,make:(a:any)=>new Next(a),Tv:NextTv},
];
