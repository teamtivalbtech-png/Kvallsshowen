// Ladda om tv:n och telefoner mitt i spel, och kolla att allt kommer tillbaka.
import {createRequire} from 'module';const {chromium}=createRequire('/')('playwright');
const base='http://localhost:4173',b=await chromium.launch(),c=await b.newContext({viewport:{width:1280,height:720}});const errs=[];const tv=await c.newPage();
const watch=(pg,n)=>{pg.on('pageerror',e=>errs.push(n+' '+e.message))};watch(tv,'TV');await tv.goto(base+'/tv?local=1&fast=8');await tv.waitForFunction(()=>window.__show);const code=await tv.evaluate(()=>__show.code);
const ph=[];for(let i=0;i<3;i++){const p=await c.newPage();watch(p,'P'+i);await p.setViewportSize({width:390,height:800});await p.goto(base+`/?r=${code}&local=1&n=Spelare${i}`);ph.push(p)}await tv.waitForFunction(()=>__show.players.length>=3);
const state=()=>tv.evaluate(()=>({code:__show.code,st:__show.stage,n:__show.players.length,on:__show.players.filter(p=>p.connected).length,q:__show.queue?.length,qi:__show.qi,tot:Object.keys(__show.total||{}).length}));
const txt=p=>p.evaluate(()=>document.querySelector('.body')?.innerText.slice(0,40).replace(/\n/g,' ')||document.body.innerText.slice(0,40));
for(const id of ['fast','draw','back','rev','bluff','duck','geo','quote','ships']){
 await tv.evaluate(i=>{const s=__show;s.toLobby();s.startSingle(i)},id);await tv.waitForTimeout(500);await tv.evaluate(()=>{if(__show.stage==='intro')__show.next()});await tv.waitForTimeout(1200);const before=await state();
 // telefon laddar om mitt i spelet
 await ph[1].reload();await ph[1].waitForTimeout(1500);const t1=await txt(ph[1]);const after1=await state();
 // tv laddar om mitt i spelet
 await tv.reload();await tv.waitForFunction(()=>window.__show);await tv.waitForTimeout(2500);const after2=await state();const t2=await txt(ph[0]);
 console.log(id,JSON.stringify({before:before.st,p:t1,after:after2.st,on:after2.on,code:after2.code===code,ph:t2}));
 if(after2.code!==code||after2.on<3)errs.push(id+' tappade spelare '+JSON.stringify(after2));}
// starta en hel kväll, ladda om tv:n, kolla att kvällen lever
await tv.evaluate(()=>{const s=__show;s.toLobby();s.startMatch(['fast','tf','quote'])});await tv.waitForTimeout(600);await tv.evaluate(()=>{if(__show.stage==='intro')__show.next()});await tv.waitForTimeout(1000);const m1=await state();await tv.reload();await tv.waitForFunction(()=>window.__show);await tv.waitForTimeout(2500);console.log('kväll',JSON.stringify(m1),JSON.stringify(await state()));
// tv:n laddar om medan alla telefoner är borta en stund: kvällen får inte hoppa över spel
await tv.evaluate(()=>{if(__show.stage==='intro')__show.next()});await tv.waitForTimeout(800);for(const p of ph)await p.goto('about:blank');await tv.reload();await tv.waitForFunction(()=>window.__show);await tv.waitForTimeout(7000);const m2=await state();for(let i=0;i<3;i++)await ph[i].goto(base+`/?r=${code}&local=1&n=Spelare${i}`);await tv.waitForTimeout(4000);const m3=await state();console.log('borta',JSON.stringify(m2),JSON.stringify(m3));if(m2.st==='reveal'||m3.st==='reveal'||m3.qi!==m1.qi||m3.on<3)errs.push('kvällen försvann '+JSON.stringify(m3));
console.log('fel',errs.length,errs.slice(0,8));await b.close();process.exit(0)
