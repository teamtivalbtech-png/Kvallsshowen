import {snd} from './audio';import {songDuck} from './games/songs';import voices from './content/voice.json';
// Programledaren Sixten. Fasta repliker är inspelade, övriga tas från Googles röst och i sista hand webbläsaren.
export const hostState={text:'',talking:false,level:0,sub:new Set<()=>void>()};
const emit=()=>hostState.sub.forEach(f=>f());
export const hash=(s:string)=>{let h=5381;for(let i=0;i<s.length;i++)h=(h*33^s.charCodeAt(i))>>>0;return h.toString(36)};
const have=new Set<string>(voices as string[]);
let token=0,an:AnalyserNode|null=null,buf:any=null,raf=0;
const VOL=.5;const au=typeof Audio!=='undefined'?new Audio():null as any;if(au)au.volume=VOL;
const pick=(a:string[])=>a[Math.random()*a.length|0];
function wire(){if(an||!snd.ctx)return;try{const s=snd.ctx.createMediaElementSource(au);an=snd.ctx.createAnalyser();an.fftSize=512;buf=new Uint8Array(an.fftSize);const g=snd.ctx.createGain();g.gain.value=VOL;s.connect(an);an.connect(g);g.connect(snd.ctx.destination);au.volume=1}catch{}}
function meter(){cancelAnimationFrame(raf);const l=()=>{if(!hostState.talking){hostState.level=0;return}if(an&&buf&&!au.paused){an.getByteTimeDomainData(buf);let m=0;for(const v of buf)m=Math.max(m,Math.abs(v-128));hostState.level=Math.min(1,m/45)}else hostState.level=.35+.45*Math.abs(Math.sin(performance.now()/95));raf=requestAnimationFrame(l)};l()}
function done(n:number){if(n!==token)return;hostState.talking=false;emit();snd.duck(false);songDuck(false);setTimeout(()=>{if(n===token&&!hostState.talking){hostState.text='';emit()}},1800)}
function browser(text:string,n:number){try{const s=window.speechSynthesis;if(!s)return void setTimeout(()=>done(n),text.length*70);s.cancel();setTimeout(()=>{if(n!==token)return;const u=new SpeechSynthesisUtterance(text);u.lang='sv-SE';const v=s.getVoices().find(v=>v.lang.toLowerCase().startsWith('sv'));if(v)u.voice=v;u.rate=1;u.volume=VOL;u.onend=()=>done(n);u.onerror=()=>done(n);s.speak(u)},60);setTimeout(()=>{if(n===token&&hostState.talking)done(n)},text.length*80+1500)}catch{done(n)}}
function file(src:string,text:string,n:number,next:()=>void){let moved=false;const go=()=>{if(moved||n!==token)return;moved=true;next()};const to=setTimeout(go,src.startsWith('/voice')?2500:7000);au.oncanplay=()=>{clearTimeout(to);if(n!==token||moved)return;moved=true;wire();au.play().catch(()=>{moved=false;go()})};au.onended=()=>done(n);au.onerror=()=>{clearTimeout(to);go()};au.src=src;au.load()}
export function unlockVoice(){try{au.src='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';au.play().catch(()=>{});const s=window.speechSynthesis;if(s){const u=new SpeechSynthesisUtterance(' ');u.volume=0;s.speak(u)}}catch{}}
/** text visas i pratbubblan. spoken är det som läses upp; utan namn kan det spelas in i förväg. */
export function say(text:string,spoken=text){if(new URLSearchParams(location.search).has('fast'))return;const n=++token;hostState.text=text;hostState.talking=true;emit();meter();snd.duck(true);songDuck(true);try{au?.pause();window.speechSynthesis?.cancel()}catch{}
  if(have.has(hash(spoken)))file(`/voice/${hash(spoken)}.mp3`,spoken,n,()=>browser(spoken,n));else file('/api/tts?t='+encodeURIComponent(text),text,n,()=>browser(spoken,n))}
export const LINES={
  welcome:()=>pick(['Välkomna till Kvällsshowen! Jag heter Sixten, och i kväll ska vi ta reda på vem som är smartast, snabbast och minst pinsam.','God kväll och välkomna! Skanna koden, ta något gott i glaset och gör er redo.']),
  join:()=>pick(['Ny spelare! Modigt.','Välkommen in, det finns gott om plats för förlorare.','Där kom det en till. Bra!']),
  bots:()=>'Ni är lite för få, så jag har kallat in mina robotvänner.',
  intro:(t:string,h:string)=>`${t}! ${h}`,
  right:()=>pick(['Snyggt jobbat!','Det där satt.','Imponerande, nästan misstänkt.','Vad gör ni egentligen på dagarna?']),
  wrong:()=>pick(['Oj. Det där blev pinsamt.','Vi låtsas att det aldrig hände.','Det var modigt. Fel, men modigt.','Skyll på vinet.']),
  winSp:()=>pick(['Spelet är avgjort! Stora applåder för vinnaren.','Där satt den! Vi har en vinnare.']),
  secret:()=>'Ställningen förblir hemlig. Ingen vet vem som leder, inte ens jag.',
  final:()=>'Nu är det dags. Sanningens ögonblick. Vem går hem som kvällens vinnare?',
  place:(p:number)=>`På plats ${p}!`,
  last:()=>'Och kvällens vinnare är',
  champ:()=>'Grattis! Tack för i kväll, och kör försiktigt hem.',
};
