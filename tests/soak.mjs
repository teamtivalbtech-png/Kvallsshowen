// Kör alla spel om och om igen på tv:n och kontrollerar att minne, element och lyssnare inte växer.
import {createRequire} from 'module';import fs from 'fs';const {chromium}=createRequire('/')('playwright');
const b=await chromium.launch();const c=await b.newContext({viewport:{width:1920,height:1080}});const tv=await c.newPage();const errs=[];tv.on('pageerror',e=>errs.push(e.message));
await tv.goto('http://localhost:4173/tv?local=1&fast=8&lite=1');await tv.waitForFunction(()=>window.__show);
await tv.evaluate(()=>{const s=__show;for(let i=0;i<6;i++)s.onRoom({t:'hello',pid:'hum'+i,name:'Hum'+i,avatar:'🦊',photo:'data:image/gif;base64,R0lGODlhAQABAAAAACw='});setInterval(()=>s.players.forEach(p=>p.seen=Date.now()),500)});
const cdp=await c.newCDPSession(tv);await cdp.send('Performance.enable');await cdp.send('HeapProfiler.enable');
const met=async()=>{await cdp.send('HeapProfiler.collectGarbage');await tv.waitForTimeout(300);const {metrics:m}=await cdp.send('Performance.getMetrics');const g=k=>m.find(x=>x.name===k)?.value;return{heap:+(g('JSHeapUsedSize')/1e6).toFixed(1),nodes:g('Nodes'),listeners:g('JSEventListeners'),docs:g('Documents')}};
const ids=(process.env.IDS?.split(','))||JSON.parse(fs.readFileSync('/tmp/gids.json')).filter(i=>!['maffia','lat'].includes(i));const R=+(process.env.ROUNDS||3);
for(let r=0;r<R;r++){for(const id of ids){await tv.evaluate(i=>{const s=__show;s.toLobby();s.startSingle(i);if(s.stage==='intro')s.next()},id);await tv.waitForTimeout(1200);await tv.evaluate(()=>{const s=__show;if(s.stage==='game')s.endGame();s.toLobby()})}console.log(r,JSON.stringify(await met()))}
await b.close();console.log('fel',errs.slice(0,5));
