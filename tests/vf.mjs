import {createRequire} from 'module';const {chromium}=createRequire('/')('playwright');
const base='http://localhost:4173';const b=await chromium.launch();const c=await b.newContext({viewport:{width:1920,height:1080}});
const tv=await c.newPage();const errs=[];tv.on('pageerror',e=>errs.push(e.message));
await tv.route('**/clips/*',r=>r.fulfill({path:'/tmp/w/t.webm',contentType:'video/webm'}));
await tv.goto(base+'/tv?local=1');await tv.waitForFunction(()=>window.__show);const code=await tv.evaluate(()=>__show.code);
const p=await c.newPage();await p.goto(base+`/?r=${code}&local=1&n=Anna`);await tv.waitForFunction(()=>__show.players.length>=1);await tv.mouse.click(5,5);
await tv.waitForTimeout(1500);
await tv.evaluate(()=>{__show.startSingle('next')});
for(let i=0;i<60;i++){await tv.waitForTimeout(1000);const s=await tv.evaluate(()=>{const g=__show.inst,v=document.querySelector('video.clipv');return{st:__show.stage,ph:g?.phase,c:g?.cur?.id,r:g?.ready,fb:g?.fallback,t:v&&+v.currentTime.toFixed(1),p:v?.paused,m:v?.muted,vol:v?.volume,by:!!document.querySelector('.vby')}});if(i%2==0||s.r)console.log(JSON.stringify(s));if(s.ph==='reveal'&&i>5&&s.c?.startsWith('f-')){await tv.waitForTimeout(2500);await tv.screenshot({path:'/tmp/w/vf.jpg',type:'jpeg',quality:60});console.log('reveal',await tv.evaluate(()=>{const v=document.querySelector('video.clipv');return{t:v?.currentTime,p:v?.paused}}));break}
if(s.st==='game'&&!s.c?.startsWith('f-')&&i>3){await tv.evaluate(()=>{});}}
console.log(errs.slice(0,3));await b.close();
