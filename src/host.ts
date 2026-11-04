import {snd} from './audio';
// Programledaren Sixten: Googles röst när den finns, annars webbläsarens svenska röst.
export const hostState={text:'',talking:false,sub:new Set<()=>void>()};
const emit=()=>hostState.sub.forEach(f=>f());
let au:HTMLAudioElement|null=null,cloud=true,token=0;
const pick=(a:string[])=>a[Math.random()*a.length|0];
function done(n:number){if(n!==token)return;hostState.talking=false;emit();snd.duck(false);setTimeout(()=>{if(n===token&&!hostState.talking){hostState.text='';emit()}},1800)}
function browser(text:string,n:number){try{const s=window.speechSynthesis;if(!s){setTimeout(()=>done(n),text.length*60);return}s.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='sv-SE';const v=s.getVoices().find(v=>v.lang.toLowerCase().startsWith('sv'));if(v)u.voice=v;u.rate=1.05;u.pitch=1.05;u.onend=()=>done(n);u.onerror=()=>done(n);s.speak(u);setTimeout(()=>{if(n===token&&hostState.talking)done(n)},text.length*110+2500)}catch{done(n)}}
export function say(text:string){if(new URLSearchParams(location.search).has('fast'))return;const n=++token;hostState.text=text;hostState.talking=true;emit();snd.duck(true);try{au?.pause();window.speechSynthesis?.cancel()}catch{}
  if(!cloud||location.search.includes('local'))return browser(text,n);
  au=new Audio('/api/tts?t='+encodeURIComponent(text));let moved=false;const fall=()=>{if(moved||n!==token)return;moved=true;browser(text,n)};
  const to=setTimeout(fall,7000);au.oncanplay=()=>{clearTimeout(to);if(n!==token||moved)return;moved=true;au!.play().catch(()=>{moved=false;fall()})};au.onended=()=>done(n);
  au.onerror=()=>{clearTimeout(to);fetch('/api/tts?t=x').then(r=>{if(r.status===503)cloud=false}).catch(()=>{});fall()}}
export const LINES={
  welcome:()=>pick(['Välkomna till Kvällsshowen! Jag heter Sixten, och i kväll ska vi ta reda på vem som är smartast, snabbast och minst pinsam.','God kväll och välkomna! Skanna koden, ta något gott i glaset och gör er redo.']),
  join:()=>pick(['Ny spelare! Modigt.','Välkommen in, det finns gott om plats för förlorare.','Där kom det en till. Bra!']),
  intro:(t:string,h:string)=>`${t}! ${h}`,
  right:()=>pick(['Snyggt jobbat!','Det där satt.','Imponerande, nästan misstänkt.','Vad gör ni egentligen på dagarna?']),
  wrong:()=>pick(['Oj. Det där blev pinsamt.','Vi låtsas att det aldrig hände.','Det var modigt. Fel, men modigt.','Skyll på vinet.']),
  win:(n:string,g:string)=>pick([`${g} är avgjort, och ${n} tar hem det!`,`Stora applåder för ${n}, som vann ${g}.`]),
  secret:()=>'Ställningen förblir hemlig. Ingen vet vem som leder, inte ens jag.',
  final:()=>'Nu är det dags. Sanningens ögonblick. Vem går hem som kvällens vinnare?',
  place:(n:string,p:number)=>`På plats ${p}: ${n}!`,
  last:()=>'Och kvällens vinnare är',
  champ:(n:string)=>`${n}! Grattis! Tack för i kväll, och kör försiktigt hem.`,
};
