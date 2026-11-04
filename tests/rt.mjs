import {createRequire} from 'module';const {chromium}=createRequire('/')('playwright');
const b=await chromium.launch({proxy:{server:process.env.HTTPS_PROXY||process.env.https_proxy,bypass:'localhost'}});const c=await b.newContext();
const tv=await c.newPage();const log=[];tv.on('websocket',w=>{log.push('ws '+w.url().slice(0,60));w.on('close',()=>log.push('closed'));w.on('socketerror',e=>log.push('err '+e))});tv.on('console',m=>{if(m.type()==='error')log.push(m.text().slice(0,160))});
await tv.goto('http://localhost:4173/tv');await tv.waitForFunction(()=>window.__show);const code=await tv.evaluate(()=>window.__show.code);console.log('code',code);
const t0=Date.now();const ph=[];for(const n of ['Anna','Bo','Cia']){const p=await c.newPage();await p.goto(`http://localhost:4173/?r=${code}&n=${n}`);ph.push(p)}
try{await tv.waitForFunction(()=>window.__show.players.length===3,null,{timeout:25000});console.log('alla inne',Date.now()-t0,'ms');
await tv.evaluate(()=>{window.__show.startSingle('fast');window.__show.next()});await ph[1].waitForSelector('.op',{timeout:8000});const t1=Date.now();await ph[1].click('.op');await tv.waitForFunction(()=>Object.keys(window.__show.inst.ans).length===1,null,{timeout:8000});console.log('svar nådde tv',Date.now()-t1,'ms');
await ph[1].waitForTimeout(500);await ph[2].reload();await ph[2].waitForSelector('.op',{timeout:10000});console.log('återanslutning ok')}catch(e){console.log('FEL',e.message.slice(0,200))}
console.log(log.slice(0,8).join('\n'));await b.close();
