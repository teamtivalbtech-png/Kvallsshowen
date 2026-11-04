// Botar spelar via samma telefonvy som människor, så varje spel fungerar utan särskild kod.
const R=Math.random,TXT=['Pizza','Kaffe','Hemligt','Banan','Kaninen','Ingen aning','Något med ost','Mormors recept','Vatten','Ikea'];
const FAKE=['En gammal fransk fisksoppa','Ett slags tysk hatt','Det uppfanns i Skåne','En sorts sydamerikansk fågel','Ett medeltida straff','Rädsla för skor'];
export const BOTN=['Bot-Britta','Bot-Bengt','Bot-Birgitta','Bot-Börje','Bot-Berit','Bot-Bosse','Bot-Bibbi','Bot-Bruno','Bot-Bella','Bot-Benny','Bot-Blenda'];const BOTA=['🤖','🦾','🛸','🧠','👾','🔋','📡','⚙️','💾','🕹️','🔧'];
export const botInfo=(i:number)=>({name:BOTN[i],avatar:BOTA[i]});
const st=new Map<string,any>();export const resetBots=()=>st.clear();
function hint(g:any){return [g.right,g.cur?.a,g.cur?.name,g.t?.a,g.q?.a,g.qs?.[g.idx]?.a].find(v=>typeof v==='string')}
function selfie(){const c=document.createElement('canvas');c.width=c.height=300;const x=c.getContext('2d')!;x.fillStyle=`hsl(${R()*360|0} 70% 60%)`;x.fillRect(0,0,300,300);x.font='170px serif';x.textAlign='center';x.textBaseline='middle';x.fillText(['🤖','🦾','😎','🤳'][R()*4|0],150,155);return c.toDataURL('image/jpeg',.6)}
export function botAct(g:any,id:string,now:number,fast:number){
  if(g.botTick?.(id,now))return;const pv=g.phone(id);if(!pv)return;const k=pv.k;
  if(k==='tap'){if(!st.get(id+'t')||now>st.get(id+'t')){st.set(id+'t',now+150/fast);g.onStream?.(id,{n:1+(R()*2|0)})}return}
  const sig=JSON.stringify(pv);let s=st.get(id);if(!s||s.sig!==sig){s={sig,at:now+(1200+R()*5000)/fast,done:false};st.set(id,s)}
  if(s.done||now<s.at)return;s.done=true;const send=(a:any,x:any={})=>g.onInput?.(id,{a,...x});
  if(k==='choice'){if(pv.sel!=null)return;const o=pv.opts.filter((x:any)=>!x.off).map((x:any,i:number)=>x.id??i);const h=hint(g);send(h&&o.includes(h)&&R()<.55?h:o[R()*o.length|0])}
  else if(k==='actions'){const b=pv.btns.map((x:any)=>x.id);if(b.includes('vote'))return;if(typeof b[0]==='number'){if(g.bid<900&&R()<.6)send(b[0]);return}send(b[R()*b.length|0])}
  else if(k==='text'){if(pv.sel)return;send(g.stage==='write'?FAKE[R()*FAKE.length|0]:TXT[R()*TXT.length|0])}
  else if(k==='guess'){if(R()<.2&&g.word)send(g.word)}
  else if(k==='number'){if(pv.sel!=null)return;const t=g.target?.()??100;send(Math.max(1,Math.round(t*(.65+R()*.6))))}
  else if(k==='slider'){if(pv.sel!=null)return;send(g.cur?.y?Math.min(pv.max,Math.max(pv.min,g.cur.y+Math.round((R()-.5)*14))):Math.round((pv.min+(pv.max-pv.min)*R())/pv.step)*pv.step)}
  else if(k==='order'){if(pv.sel)return;const r=[...(g.cur?.right||pv.items.map((x:any)=>x.id))];if(R()<.6){const i=R()*3|0;[r[i],r[i+1]]=[r[i+1],r[i]]}send(r)}
  else if(k==='buzzer'){if(!pv.off&&R()<.4)send('buzz',{t:now})}
  else if(k==='stopwatch'){if(pv.sel==null)send(pv.target+(R()-.5)*1.6)}
  else if(k==='camera'){if(!pv.sel)send(selfie())}
  else if(k==='fleet'){if(pv.ready===false)send('ready');else if(pv.canShoot){const e=pv.grid.map((c:string,i:number)=>c==='e'?i:-1).filter((i:number)=>i>=0);send(e[R()*e.length|0])}}
}
