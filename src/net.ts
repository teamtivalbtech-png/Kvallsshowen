import {RealtimeClient} from '@supabase/realtime-js';
import {SUPABASE_URL,SUPABASE_KEY} from './config';
const q=new URLSearchParams(location.search);
export const LOCAL=q.has('local');
let rt:RealtimeClient|null=null;
function client(){
  if(!rt){rt=new RealtimeClient(SUPABASE_URL.replace('https','wss')+'/realtime/v1',{params:{apikey:SUPABASE_KEY,eventsPerSecond:80},heartbeatIntervalMs:12000} as any);rt.connect();}
  return rt;
}
export interface Pipe{send(m:any):boolean;close():void;ready():boolean}
/** Självläkande kanal: återansluter med backoff och tappar aldrig lyssnaren. */
export function openPipe(name:string,on:(m:any)=>void,status?:(ok:boolean)=>void):Pipe{
  if(LOCAL){
    const b=new BroadcastChannel('ks:'+name);b.onmessage=e=>on(e.data);setTimeout(()=>status?.(true),5);
    return{send:m=>{b.postMessage(m);return true},close:()=>b.close(),ready:()=>true};
  }
  let ch:any=null,ok=false,closed=false,retry=0,timer:any=0;
  const up=()=>{
    if(closed)return;const c=client();
    ch=c.channel(name,{config:{broadcast:{self:false,ack:false}}});
    ch.on('broadcast',{event:'m'},(p:any)=>on(p.payload));
    const mine=ch;
    ch.subscribe((s:string)=>{
      if(mine!==ch)return;
      if(s==='SUBSCRIBED'){ok=true;retry=0;status?.(true)}
      else if(s==='CHANNEL_ERROR'||s==='TIMED_OUT'||s==='CLOSED'){
        ok=false;status?.(false);if(closed)return;
        clearTimeout(timer);timer=setTimeout(()=>{try{c.removeChannel(mine)}catch{};up()},Math.min(4000,400*2**retry++));
      }
    });
  };
  up();
  return{send:m=>{if(!ok)return false;ch.send({type:'broadcast',event:'m',payload:m});return true},
    close:()=>{closed=true;clearTimeout(timer);try{client().removeChannel(ch)}catch{}},ready:()=>ok};
}
export function wake(){ if(!LOCAL&&rt&&!rt.isConnected())rt.connect(); }
