// All musik och alla ljudeffekter syntetiseras i webbläsaren, så inga rättigheter behövs.
class Snd{
  ctx:AudioContext|null=null;master:GainNode|null=null;cur:string|null=null;timer:any=0;step=0;next=0;on=false;want:string|null=null;
  mg:GainNode|null=null;ducked=false;level=1;token=0;
  ramp(v:number,s:number){if(!this.mg||!this.ctx)return;this.fading=Date.now()+s*1000+200;const g=this.mg.gain,t=this.ctx.currentTime;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(v,t+s)}
  duck(on:boolean){this.ducked=on;if(this.cur)this.ramp(on?.25:.9,.35)}
  unlock(){if(!this.ctx){this.ctx=new (window.AudioContext||(window as any).webkitAudioContext)();this.master=this.ctx.createGain();this.master.gain.value=.5;const c=this.ctx.createDynamicsCompressor();this.master.connect(c);c.connect(this.ctx.destination);this.mg=this.ctx.createGain();this.mg.gain.value=0;this.mg.connect(this.master)}this.ctx.resume();this.on=true;if(this.want)this.music(this.want);if(!this.guard)this.guard=setInterval(()=>this.heal(),1500)}
  guard:any=0;fading=0;
  /** Tv-apparater kan pausa ljudmotorn när en video spelar. Väck den och fortsätt musiken. */
  heal(){const c=this.ctx;if(!c)return;if(c.state!=='running'){c.resume().catch(()=>{});return}if(this.cur&&this.bar[this.cur]){if(this.next<c.currentTime-1)this.next=c.currentTime+.05;const want=this.ducked?.25:.9;if(this.mg&&Math.abs(this.mg.gain.value-want)>.05&&Date.now()>this.fading)this.ramp(want,1.2)}}
  tone(f:number,t:number,d:number,type:OscillatorType='sine',v=.2,dest?:AudioNode){if(!this.ctx)return;const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0008,t+d);o.connect(g);g.connect(dest||this.master!);o.start(t);o.stop(t+d+.02)}
  noise(t:number,d:number,v=.15,hp=2000,dest?:AudioNode){if(!this.ctx)return;const n=this.ctx.sampleRate*d|0,b=this.ctx.createBuffer(1,n,this.ctx.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);const s=this.ctx.createBufferSource();s.buffer=b;const f=this.ctx.createBiquadFilter();f.type='highpass';f.frequency.value=hp;const g=this.ctx.createGain();g.gain.value=v;s.connect(f);f.connect(g);g.connect(dest||this.master!);s.start(t)}
  sfx(n:string){if(!this.ctx)return;const t=this.ctx.currentTime;const seq=(a:number[],s=.09,ty:OscillatorType='triangle',v=.22)=>a.forEach((f,i)=>this.tone(f,t+i*s,s*2.2,ty,v));
    const M:any={join:()=>seq([523,784],.07),tick:()=>this.tone(1100,t,.05,'square',.06),correct:()=>seq([523,659,784,1047]),wrong:()=>seq([233,175],.16,'sawtooth',.16),buzz:()=>this.tone(140,t,.35,'sawtooth',.3),
      stinger:()=>{seq([392,523,659,880],.11,'sawtooth',.14);this.noise(t+.4,.5,.1)},fanfare:()=>{seq([523,523,523,698,880,1047],.13,'sawtooth',.14);this.noise(t+.7,.8,.1)},reveal:()=>seq([659,880,1319],.08),
      roll:()=>{for(let i=0;i<46;i++)this.noise(t+i*.06,.05,.05+i*.003,900)},boom:()=>{this.tone(70,t,1,'sine',.5);this.noise(t,.7,.25,300)},megaboom:()=>{[48,62,36].forEach((f,i)=>this.tone(f,t+i*.05,2.4,i?'sawtooth':'sine',.5));this.noise(t,1.8,.5,120);this.noise(t+.04,.45,.5,900);this.noise(t+.5,2.2,.14,2400);for(let i=0;i<7;i++)this.noise(t+.9+i*.28,.2,.08,3000)},fuse:()=>this.noise(t,.05,.05,6000),shot:()=>{this.noise(t,.18,.35,700);this.tone(90,t,.14,'square',.2)},quack:()=>seq([430,330],.07,'sawtooth',.13),splash:()=>this.noise(t,.3,.14,1500),hit:()=>this.tone(180,t,.1,'square',.2),drop:()=>this.tone(120,t,.18,'triangle',.3)};
    M[n]?.()}
  bar:Record<string,any>={lobby:{bpm:112,ch:[[220,261,329],[174,220,261],[130,164,196],[196,246,293]],bass:[55,43.6,32.7,49]},tense:{bpm:92,ch:[[220,261,311],[207,261,311]],bass:[55,51.9]},action:{bpm:138,ch:[[196,233,293],[174,207,261],[155,196,233],[174,220,261]],bass:[49,43.6,38.9,43.6]},reveal:{bpm:76,ch:[[261,329,392],[220,261,329],[174,220,261],[196,246,293]],bass:[65.4,55,43.6,49]}};
  music(n:string|null){this.want=n;if(n===this.cur)return;const old=this.timer,was=this.cur,tk=++this.token;this.cur=null;
    const start=()=>{if(tk!==this.token)return;clearInterval(this.timer);this.timer=0;this.cur=n;if(!n||!this.ctx||!this.bar[n])return;this.step=0;this.next=this.ctx.currentTime+.05;this.ramp(this.ducked?.25:.9,1.4);const dest=this.mg!;
      this.timer=setInterval(()=>{const b=this.bar[n],c=this.ctx!;const s=60/b.bpm/4;while(this.next<c.currentTime+.25){const i=this.step%16,bi=(this.step>>4)%b.ch.length,t=this.next;
        if(i%4===0)this.tone(i%8?b.bass[bi]*1.5:b.bass[bi],t,.3,'triangle',.3,dest);if(i%8===0)b.ch[bi].forEach((f:number)=>this.tone(f,t,.5,'sine',.045,dest));if([3,6,11,14].includes(i))this.tone(b.ch[bi][(i>>1)%3]*2,t,.12,'triangle',.05,dest);if(i%2===0)this.noise(t,.03,.025,7000,dest);if(i%8===4)this.noise(t,.1,.05,1200,dest);this.next+=s;this.step++}},60)};
    if(was&&old){this.ramp(0,1);setTimeout(start,1050)}else start()}
}
export const snd=new Snd();
