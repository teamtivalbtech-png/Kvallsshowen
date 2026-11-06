// Skickar trasig indata till alla spel, tappar spelare mitt i och letar efter krascher och trasig text.
import {createRequire} from 'module';import fs from 'fs';const {chromium}=createRequire('/')('playwright');
const FAST=+(process.env.FAST||10),SECS=+(process.env.SECS||9);const only=process.argv[2]?process.argv[2].split(','):null;
const b=await chromium.launch();const c=await b.newContext({viewport:{width:1920,height:1080}});const tv=await c.newPage();const errs=[];
tv.on('pageerror',e=>errs.push('PE '+e.message+' '+(e.stack||'').split('\n').slice(1,3).join(' ')));tv.on('console',m=>{if(m.type()==='error'&&!/Failed to load|ERR_|404|itunes|net::/.test(m.text()))errs.push('CE '+m.text().slice(0,300))});
await tv.goto(`http://localhost:4173/tv?local=1&fast=${FAST}&lite=2`);await tv.waitForFunction(()=>window.__show);
await tv.evaluate(()=>{const s=__show;for(let i=0;i<6;i++)s.onRoom({t:'hello',pid:'hum'+i,name:'Hum'+i,avatar:'🦊'});window.__seen=setInterval(()=>{s.players.forEach(p=>{if(!p.gone)p.seen=Date.now()})},300);
 const J=[{}, {a:null},{a:123},{a:[]},{a:{}},{a:'x'},{a:'buzz'},{a:'shoot'},{a:'ok'},{a:'pass'},{a:'vote',v:'nobody'},{v:'x'},{v:null},{v:-1},{v:1e9},{v:[]},{v:{}},{id:'nope'},{p:'nope'},{t:'x'},{x:NaN,y:'a'},{k:[]},{sel:[99,98]},{i:999},{n:-5},{c:'zz'},{cards:[1,2]},{text:''},{text:'<b>hej</b>'},{text:'x'.repeat(5000)},{q:0},{a:'ok',q:-1},{pick:9},{w:null}];
 window.__junk=()=>{const g=s.inst;if(!g||s.stage!=='game')return;const ps=s.players;const p=ps[Math.random()*ps.length|0];const d=J[Math.random()*J.length|0];
  try{g.onInput?.(p.id,d)}catch(e){console.error('INPUT '+s.def.id+' '+JSON.stringify(d).slice(0,60)+' '+e.message+' '+(e.stack||'').split('\n')[1])}
  try{g.onStream?.(p.id,d)}catch(e){console.error('STREAM '+s.def.id+' '+e.message+' '+(e.stack||'').split('\n')[1])}
  // ett giltigt val från vyn, så att spelet går framåt
  try{const v=g.phone(p.id);const o=v?.opts;if(o?.length&&Math.random()<.7){const x=o[Math.random()*o.length|0];g.onInput?.(p.id,{a:x.id??x,v:x.id??x,q:v.q,n:v.n})}}catch(e){console.error('PHONE '+s.def.id+' '+e.message+' '+(e.stack||'').split('\n')[1])}
  if(Math.random()<.01){const q=ps.filter(x=>!x.bot)[Math.random()*6|0];if(q){q.gone=1;q.seen=0;setTimeout(()=>{q.gone=0;q.seen=Date.now()},1500)}}
  for(const q of ps)try{const t=JSON.stringify(s.view(q.id));if(/NaN/.test(t.replace(/"[^"]*Nan[^"]*"/g,'')))console.error('VIEWNAN '+s.def.id+' '+t.slice(0,200))}catch(e){console.error('VIEW '+s.def.id+' '+e.message)}
 };window.__jt=setInterval(()=>{try{__junk()}catch(e){console.error('J '+e.message)}},25)});
const list=only||JSON.parse(fs.readFileSync('/tmp/gids.json'));const bad={};
for(const id of list){const n0=errs.length;await tv.evaluate(i=>{const s=__show;s.toLobby();s.startSingle(i);if(s.stage==='intro')s.next()},id);
 const st=await tv.evaluate(()=>__show.stage);if(st==='lobby'){console.log(id,'hoppas över');continue}
 const t0=Date.now();let txt='';while(Date.now()-t0<SECS*1000){await tv.waitForTimeout(600);const r=await tv.evaluate(()=>{const s=__show;const t=document.querySelector('.tv')?.innerText||'';const raw=Object.values(s.rawS).filter(x=>!Number.isFinite(x)).length;return{st:s.stage,t:(t.match(/.{0,40}(undefined|NaN|\[object|null\b).{0,30}/)||[''])[0],raw,kids:document.querySelector('.game')?.childElementCount??-1}});if(r.t)txt=r.t;if(r.raw)errs.push('RAW '+id);if(r.st==='game'&&r.kids===0)errs.push('TOM '+id);if(r.st!=='game')break}
 await tv.evaluate(()=>{const s=__show;if(s.stage==='game')s.endGame()});if(txt)errs.push('TEXT '+id+': '+txt);const e=[...new Set(errs.slice(n0))];if(e.length){bad[id]=e;console.log(id,e.length,e.slice(0,4))}else console.log(id,'ok')}
await b.close();console.log('KLART',Object.keys(bad).length,Object.keys(bad));
