// Riktigt test mot en adress med riktig Supabase, riktiga låtar och falsk mikrofon.
import {createRequire} from 'module';const {chromium}=createRequire('/')('playwright');
const B=process.argv[2]||'https://kvallsshowen.vercel.app';const b=await chromium.launch({proxy:{server:process.env.HTTPS_PROXY||process.env.https_proxy},args:['--autoplay-policy=no-user-gesture-required','--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream']});
const c=await b.newContext({viewport:{width:1920,height:1080},permissions:['microphone','camera']});const tv=await c.newPage();const errs=[];tv.on('pageerror',e=>errs.push('TV '+e.message));await tv.goto(B+'/tv');await tv.click('.gate');await tv.waitForFunction(()=>window.__show);const code=await tv.evaluate(()=>__show.code);
const ps=[];for(const n of ['Anna','Bo','Cia']){const c2=await b.newContext({viewport:{width:390,height:844},permissions:['microphone','camera']});const p=await c2.newPage();p.on('pageerror',e=>errs.push(n+' '+e.message));await p.goto(`${B}/?r=${code}&n=${n}`);ps.push(p)}
await tv.waitForFunction(()=>__show.players.filter(p=>p.connected).length>=3,null,{timeout:25000});console.log('tre telefoner inne');
const st=()=>tv.evaluate(()=>{const g=__show.inst;return{st:__show.stage,ph:g?.phase,stage:g?.stage,audio:g?.audio,buf:!!g?.buf,pcm:g?.pcm?.length,ans:Object.keys(g?.ans||{}).length,ctx:window.__snd?.ctx?.state}});
const start=async id=>{await tv.evaluate(i=>{__show.toLobby();__show.startSingle(i)},id);await tv.waitForFunction(()=>__show.stage==='intro');await tv.waitForTimeout(800);await tv.evaluate(()=>__show.next());await tv.waitForFunction(()=>__show.stage==='game')};
await start('rev');await tv.waitForFunction(()=>__show.inst?.audio!==null&&__show.inst?.audio!==undefined,null,{timeout:25000}).catch(()=>{});console.log('rev',JSON.stringify(await st()));
for(const p of ps){const o=p.locator('.op').first();if(await o.count())await o.click({timeout:4000}).catch(()=>{})}await tv.waitForTimeout(2500);console.log('rev svar',JSON.stringify(await st()));
await start('song');await tv.waitForTimeout(6000);console.log('song',JSON.stringify(await st()));
await start('era');await tv.waitForTimeout(5000);console.log('era',JSON.stringify(await st()));
await start('back');await tv.waitForTimeout(1500);let sp=null;for(const p of ps)if(await p.locator('.recb').count())sp=p;console.log('talare',!!sp);if(sp){await sp.locator('.recb').click({force:true});await tv.waitForFunction(()=>__show.inst?.stage==='guess'||__show.inst?.phase==='reveal',null,{timeout:15000}).catch(()=>console.log('ingen inspelning kom fram'));console.log('back',JSON.stringify(await st()))}
await tv.evaluate(()=>__show.toLobby());console.log('fel',errs.slice(0,6));await b.close();process.exit(0)
