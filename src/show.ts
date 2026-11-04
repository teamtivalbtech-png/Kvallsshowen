import {openPipe,Pipe} from './net';import {Player,Inst,GameDef,Api} from './types';import {GAMES,byId} from './games';import {snd} from './audio';
const TEAM=[{name:'Lag Guld',color:'#ffc23d'},{name:'Lag Korall',color:'#ff5d5d'},{name:'Lag Is',color:'#4fd1ff'},{name:'Lag Lime',color:'#a6e84a'}];
const COL=['#ffc23d','#ff5d5d','#4fd1ff','#a6e84a','#ff8bd2','#b794ff','#ff9b42','#3ee6b8','#f2f2f2','#7da2ff','#e6e04d','#d07bff'];
const KEY='ks-host-v1';const FAST=+(new URLSearchParams(location.search).get('fast')||1);const rnd=(s:string)=>Array.from({length:4},()=>s[Math.random()*s.length|0]).join('');
export class Show{
  code='';ver=0;subs=new Set<()=>void>();players:Player[]=[];stage:'lobby'|'intro'|'game'|'result'|'reveal'='lobby';mode:'solo'|'team'='solo';teamCount=2;
  total:Record<string,number>={};rawS:Record<string,number>={};def:GameDef|null=null;inst:Inst|null=null;queue:string[]=[];qi=0;match=false;history:any[]=[];
  dl=0;dlFn:any=null;timers:any[]=[];room:Pipe|null=null;pipes=new Map<string,{p:Pipe,last:string,seq:number,ids:Set<number>,lastSend:number}>();lastRes:any=null;loop:any=0;lastTick=0;dirty=false;usedPools:Record<string,number[]>={};revealStep=-1;error='';
  constructor(){
    let s:any=null;try{s=JSON.parse(localStorage.getItem(KEY)||'null')}catch{}
    if(s&&Date.now()-s.at<6*3600e3){this.code=s.code;this.players=s.players.map((p:Player)=>({...p,connected:false}));this.mode=s.mode;this.teamCount=s.teamCount;this.total=s.total;this.queue=s.queue;this.qi=s.qi;this.match=s.match;this.history=s.history;this.usedPools=s.used||{}}
    else this.code=rnd('ABCDEFGHJKLMNPQRSTUVWXYZ');
    this.room=openPipe('r:'+this.code,m=>this.onRoom(m));
    this.players.forEach(p=>this.pipe(p.id));
    this.lastTick=performance.now();
    this.loop=setInterval(()=>this.frame(),33);
    if(this.match&&this.queue.length&&this.qi<this.queue.length)setTimeout(()=>this.intro(this.queue[this.qi]),1200);
  }
  save(){try{localStorage.setItem(KEY,JSON.stringify({at:Date.now(),code:this.code,players:this.players,mode:this.mode,teamCount:this.teamCount,total:this.total,queue:this.queue,qi:this.qi,match:this.match,history:this.history,used:this.usedPools}))}catch{}}
  bump(){this.ver++;this.subs.forEach(f=>f());this.dirty=true}
  sub=(f:()=>void)=>{this.subs.add(f);return()=>{this.subs.delete(f)}};
  frame(){
    const n=performance.now(),dt=Math.min(.1,(n-this.lastTick)/1000)*FAST;this.lastTick=n;const w=Date.now();
    this.players.forEach(p=>{const c=w-p.seen<9000;if(c!==p.connected){p.connected=c;if(!c)this.inst?.onLeave?.(p.id);this.bump()}});
    if(this.dl&&w>=this.dl){const f=this.dlFn;this.dl=0;this.dlFn=null;try{f?.()}catch(e){this.fail(e)}this.bump()}
    if(this.stage==='game'&&this.inst?.tick)try{this.inst.tick(dt)}catch(e){this.fail(e)}
    if(this.dirty){this.dirty=false;this.pushAll(false)}
    this.pipes.forEach((x,id)=>{if(w-x.lastSend>2500)this.push(id,true)});
  }
  fail(e:any){console.error(e);this.error=String(e);this.bump();this.endGame()}
  pipe(id:string){
    if(this.pipes.has(id))return this.pipes.get(id)!;
    const x={p:null as any,last:'',seq:0,ids:new Set<number>(),lastSend:0};
    x.p=openPipe(`p:${this.code}:${id}`,m=>this.onPlayer(id,m),ok=>{if(ok)this.push(id,true)});this.pipes.set(id,x);return x;
  }
  onRoom(m:any){
    if(m.t!=='hello')return;
    let p=this.players.find(x=>x.id===m.pid);
    if(!p){
      if(this.players.length>=12)return;
      const taken=new Set(this.players.map(x=>x.color));
      p={id:m.pid,name:String(m.name||'Spelare').slice(0,14),avatar:m.avatar||'🙂',color:COL.find(c=>!taken.has(c))||COL[0],team:0,connected:true,seen:Date.now()};
      this.players.push(p);this.assignTeams();snd.sfx('join');
    }else if(m.name){p.name=String(m.name).slice(0,14);p.avatar=m.avatar||p.avatar}
    p.seen=Date.now();p.connected=true;this.pipe(p.id);this.save();this.bump();this.push(p.id,true);
  }
  assignTeams(){this.players.forEach((p,i)=>p.team=i%this.teamCount)}
  onPlayer(id:string,m:any){
    const p=this.players.find(x=>x.id===id);if(!p)return;p.seen=Date.now();const x=this.pipes.get(id)!;
    if(m.t==='ping'){x.p.send({t:'pong',c:m.c,h:Date.now()});return}
    if(m.t==='s'){if(this.stage==='game')try{this.inst?.onStream?.(id,m.d)}catch(e){console.error(e)}return}
    if(m.t==='in'){
      x.p.send({t:'ack',id:m.id});if(x.ids.has(m.id))return;x.ids.add(m.id);if(x.ids.size>300)x.ids=new Set([...x.ids].slice(-100));
      const d=m.d;
      if(d?.vip!==undefined){if(id===this.vip()?.id)this.vipCmd(d);return}
      if(this.stage==='game')try{this.inst?.onInput?.(id,d)}catch(e){console.error(e)}
      this.dirty=true;
    }
  }
  vip(){return this.players.find(p=>p.connected)}
  vipCmd(d:any){
    if(d.vip==='mode'){this.mode=d.v;this.assignTeams()}
    if(d.vip==='teams'){this.teamCount=d.v;this.assignTeams()}
    if(d.vip==='swap'){const p=this.players.find(x=>x.id===d.p);if(p)p.team=(p.team+1)%this.teamCount}
    if(d.vip==='single')this.startSingle(d.v);
    if(d.vip==='match')this.startMatch(d.v);
    if(d.vip==='skip')this.next();
    if(d.vip==='lobby')this.toLobby();
    this.save();this.bump();
  }
  next(){
    if(this.stage==='intro')this.beginGame();else if(this.stage==='game')this.endGame();else if(this.stage==='result')this.afterResult();else if(this.stage==='reveal'){this.revealStep++;this.bump()}
  }
  startSingle(id:string){this.match=false;this.queue=[id];this.qi=0;this.intro(id)}
  startMatch(ids:string[]){
    this.match=true;this.total={};this.history=[];this.players.forEach(p=>this.total[p.id]=0);
    this.queue=[...ids.filter(i=>i!=='allin'),'allin'];this.qi=0;this.save();this.intro(this.queue[0]);
  }
  intro(id:string){
    this.clear();const d=byId(id);this.def=d;this.stage='intro';this.inst=null;snd.music(null);snd.sfx('stinger');
    const n=this.players.filter(p=>p.connected).length;
    if(n<(d.min||2)){this.lastRes={skip:`${d.title} kräver minst ${d.min||2} spelare`};if(this.match){this.qi++;if(this.qi<this.queue.length)return this.intro(this.queue[this.qi]);return this.reveal()}}
    this.setCd(this.match?14000:20000,()=>this.beginGame());this.bump();
  }
  beginGame(){
    if(!this.def)return;this.clear();this.rawS={};this.players.forEach(p=>this.rawS[p.id]=0);this.stage='game';
    try{this.inst=this.def.make(this.api());this.inst.start()}catch(e){this.fail(e)}this.bump();
  }
  endGame(){
    if(this.stage!=='game'&&this.stage!=='intro')return;this.clear();snd.music(null);const d=this.def!;const final=d.id==='allin'&&this.match;
    const mx=Math.max(1,...Object.values(this.rawS));const rows=this.players.map(p=>{const pts=final?(this.rawS[p.id]||0):Math.round(Math.max(0,this.rawS[p.id]||0)/mx*1000);return{p,pts}}).sort((a,b)=>b.pts-a.pts);
    rows.forEach(r=>this.total[r.p.id]=Math.max(0,(this.total[r.p.id]||0)+r.pts));
    if(this.match&&!final)this.history.push({game:d.title,winner:rows[0]?.p.name,avatar:rows[0]?.p.avatar,pts:rows[0]?.pts});
    this.lastRes={rows:rows.map(r=>({id:r.p.id,name:r.p.name,avatar:r.p.avatar,color:r.p.color,pts:r.pts}))};this.stage='result';this.inst=null;snd.sfx('fanfare');this.qi++;this.save();
    this.setCd(this.match?10000:600000,()=>this.afterResult());this.bump();
  }
  afterResult(){if(this.match&&this.qi<this.queue.length)this.intro(this.queue[this.qi]);else if(this.match)this.reveal();else this.toLobby()}
  reveal(){this.clear();this.stage='reveal';this.revealStep=-1;this.match=false;this.queue=[];this.save();this.bump()}
  toLobby(){this.clear();this.stage='lobby';this.inst=null;this.def=null;this.match=false;this.queue=[];snd.music('lobby');this.save();this.bump()}
  clear(){this.timers.forEach(t=>{clearTimeout(t);clearInterval(t)});this.timers=[];this.dl=0;this.dlFn=null}
  setCd(ms:number,f:()=>void){this.dl=Date.now()+ms/FAST;this.dlFn=f}
  safe(f:()=>void){return()=>{try{f();this.bump()}catch(e){this.fail(e)}}}
  api():Api{const s=this;return{
    players:()=>s.players,online:()=>s.players.filter(p=>p.connected),refresh:()=>s.bump(),award:(p,n)=>{s.rawS[p]=(s.rawS[p]||0)+n},raw:p=>s.rawS[p]||0,
    after:(ms,f)=>{s.timers.push(setTimeout(s.safe(f),ms/FAST))},every:(ms,f)=>{s.timers.push(setInterval(s.safe(f),ms/FAST))},clearTimers:()=>s.clear(),
    countdown:(ms,f)=>s.setCd(ms,f),deadline:()=>s.dl,stopCountdown:()=>{s.dl=0;s.dlFn=null},now:()=>Date.now(),sfx:n=>snd.sfx(n),music:n=>snd.music(n),end:()=>s.endGame(),
    mode:()=>s.mode,teams:()=>s.teamList(),isFinal:()=>s.match,total:p=>s.total[p]||0,
    used(k,n,pool){let u=s.usedPools[k]||[];const free=[...Array(pool).keys()].filter(i=>!u.includes(i));let list=free.sort(()=>Math.random()-.5).slice(0,n);if(list.length<n){u=[];list=[...list,...[...Array(pool).keys()].filter(i=>!list.includes(i)).sort(()=>Math.random()-.5).slice(0,n-list.length)]}s.usedPools[k]=[...u,...list];return list},
  }}
  teamList(){return Array.from({length:this.teamCount},(_,i)=>({id:i,...TEAM[i],members:this.players.filter(p=>p.team===i)})).filter(t=>t.members.length)}
  finalRows(){
    if(this.mode==='team')return this.teamList().map(t=>({id:'t'+t.id,name:t.name,avatar:t.members.map(m=>m.avatar).join(''),color:t.color,pts:Math.round(t.members.reduce((a,m)=>a+(this.total[m.id]||0),0)/t.members.length)})).sort((a,b)=>b.pts-a.pts);
    return this.players.map(p=>({id:p.id,name:p.name,avatar:p.avatar,color:p.color,pts:this.total[p.id]||0})).sort((a,b)=>b.pts-a.pts);
  }
  view(id:string){
    const p=this.players.find(x=>x.id===id);if(!p)return null;const v=this.vip();const isV=v?.id===id;
    let pv:any;
    if(this.stage==='lobby')pv=isV?{k:'vipLobby',mode:this.mode,teams:this.teamCount,n:this.players.length,list:this.players.map(x=>({id:x.id,name:x.name,avatar:x.avatar,team:x.team}))}:{k:'wait',msg:'Du är med!',sub:`${v?.name||'Första spelaren'} väljer spel`};
    else if(this.stage==='intro')pv={k:'intro',title:this.def?.title,how:this.def?.how,needs:this.def?.needs};
    else if(this.stage==='game'&&this.inst)try{pv=this.inst.phone(id)}catch(e){console.error(e);pv={k:'wait',msg:'Ett ögonblick'}}
    else if(this.stage==='result')pv={k:'wait',msg:this.match?'Delresultat':'Resultat',sub:(()=>{const r=this.lastRes?.rows?.find((x:any)=>x.id===id);return r?`${r.pts} poäng i ${this.def?.title}`:''})()};
    else pv={k:'wait',msg:'Titta på tv:n',sub:'Sanningens ögonblick'};
    const team=this.mode==='team'?TEAM[p.team]:null;
    return{stage:this.stage,me:{name:p.name,avatar:p.avatar,color:team?.color||p.color,team:team?.name},vip:isV,dl:this.dl,pv,rate:Math.min(12,Math.floor(70/Math.max(1,this.players.length))),canSkip:isV&&this.stage!=='lobby'};
  }
  push(id:string,force:boolean){
    const x=this.pipes.get(id);if(!x)return;const v=this.view(id);if(!v)return;const s=JSON.stringify(v);
    if(!force&&s===x.last)return;x.last=s;x.seq++;x.lastSend=Date.now();x.p.send({t:'v',seq:x.seq,v});
  }
  pushAll(f:boolean){this.pipes.forEach((_,id)=>this.push(id,f))}
  resetShow(){try{localStorage.removeItem(KEY)}catch{};location.reload()}
}
export const allGames=GAMES;
