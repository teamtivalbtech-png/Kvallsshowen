import {createRequire} from 'module';import fs from 'fs';const {chromium}=createRequire('/')('playwright');
const base='http://localhost:4173';const only=process.argv[2]&&process.argv[2]!=='all'?process.argv[2].split(','):null;const FAST=+process.argv[3]||10;
const b=await chromium.launch();const c=await b.newContext({viewport:{width:1920,height:1080}});
const errs=[];const tv=await c.newPage();tv.on('pageerror',e=>errs.push('TV '+e.message));tv.on('console',m=>{if(m.type()==='error'&&!/Failed to load|ERR_|404|itunes/.test(m.text()))errs.push('TVc '+m.text())});
await tv.goto(base+`/tv?local=1&fast=${FAST}`);await tv.waitForFunction(()=>window.__show);const code=await tv.evaluate(()=>window.__show.code);
const ph=[];for(const n of ['Anna','Bo','Cia','Dan']){const p=await c.newPage();await p.setViewportSize({width:390,height:800});p.on('pageerror',e=>errs.push(n+' '+e.message));await p.goto(base+`/?r=${code}&local=1&n=${n}`);ph.push(p)}
await tv.waitForFunction(()=>window.__show.players.length===4,null,{timeout:15000});
const bot=()=>{if(window.__bot)return;window.__bot=setInterval(()=>{try{const q=s=>document.querySelector(s);const a=[...document.querySelectorAll('.op:not(:disabled)')];if(a.length){a[Math.random()*a.length|0].click();return}
 const pd=e=>e&&e.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:1,pointerType:'touch'}));
 const t=q('input.tx');if(t){const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;set.call(t,'svar'+(Math.random()*3|0));t.dispatchEvent(new Event('input',{bubbles:true}));setTimeout(()=>q('.big')?.click(),30);return}
 for(const s of ['.buzzer','.tapper','.fire'])if(q(s)){pd(q(s));return}
 const pads=[...document.querySelectorAll('.pads button')];if(pads.length){pd(pads[Math.random()*pads.length|0]);return}
 if(q('.pad button')){q('.pad button').click();setTimeout(()=>q('.pad .ok')?.click(),30);return}
 const bs=[...document.querySelectorAll('.bs button:not(:disabled)')];if(bs.length){bs[Math.random()*bs.length|0].click();return}
 if(q('.lr .ok')){q('.lr .ok').click();return}
 const wg=[...document.querySelectorAll('.wgrid button')];if(wg.length){[0,1,2].forEach(i=>wg[i].click());setTimeout(()=>q('.lr .ok')?.click(),40);return}
 if(q('.big:not(.sticky)'))q('.big:not(.sticky)').click();else q('.ordl')&&q('.big')?.click()}catch(e){console.log(e)}},350)};
for(const p of ph)await p.evaluate(bot);
const res={};const ids=await tv.evaluate(()=>window.__gids=null);
const list=only||JSON.parse(fs.readFileSync('/tmp/gids.json'));
fs.mkdirSync('/tmp/shots',{recursive:true});
for(const id of list){const n0=errs.length;const t0=Date.now();await tv.evaluate(i=>{window.__show.toLobby();window.__show.startSingle(i);window.__show.next()},id);
 await tv.waitForTimeout(2500);await tv.screenshot({path:`/tmp/shots/${id}.jpg`,quality:60,type:'jpeg'});await ph[0].screenshot({path:`/tmp/shots/${id}-p.jpg`,quality:60,type:'jpeg'});
 let ok=false;try{await tv.waitForFunction(()=>window.__show.stage==='result',null,{timeout:150000});ok=true}catch{}
 const sc=await tv.evaluate(()=>window.__show.lastRes?.rows?.map(r=>r.pts)||[]);const stage=await tv.evaluate(()=>window.__show.stage+' '+(window.__show.error||''));
 res[id]={ok,secs:Math.round((Date.now()-t0)/1000),sc,errs:errs.slice(n0).slice(0,3),stage};console.log(id,JSON.stringify(res[id]),'\n');if(!ok)await tv.evaluate(()=>window.__show.endGame())}
await b.close();const bad=Object.entries(res).filter(([,v])=>!v.ok||v.errs.length);console.log('FAIL',bad.map(x=>x[0]));
