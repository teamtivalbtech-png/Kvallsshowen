// Riktig uppkoppling: telefon och tv tappar nätet mitt i spelet, sidan laddas om, flik göms.
import {createRequire} from 'module';const {chromium}=createRequire('/')('playwright');const B=process.env.BASE||'http://localhost:4174';
const b=await chromium.launch({proxy:{server:process.env.HTTPS_PROXY||process.env.https_proxy,bypass:'localhost'}});let bad=0;const ok=(n,v,x='')=>{console.log(v?'ok ':'FEL',n,x);if(!v)bad++};
const tc=await b.newContext({viewport:{width:1280,height:720}});const tv=await tc.newPage();const errs=[];tv.on('pageerror',e=>errs.push('tv '+e.message));await tv.goto(B+'/tv');await tv.waitForTimeout(1500);await tv.click('.gate h1',{force:true});await tv.waitForFunction(()=>window.__show);const code=await tv.evaluate(()=>__show.code);
const ca=await b.newContext({viewport:{width:390,height:800}}),cb=await b.newContext({viewport:{width:390,height:800}});const A=await ca.newPage(),Bb=await cb.newPage();for(const p of [A,Bb])p.on('pageerror',e=>errs.push('tel '+e.message));await A.goto(B+`/?r=${code}&n=Anna`);await Bb.goto(B+`/?r=${code}&n=Bo`);
await tv.waitForFunction(()=>__show.players.filter(p=>p.connected).length>=2,null,{timeout:20000});ok('två telefoner inne',true);
await tv.evaluate(()=>{__show.startSingle('fast');__show.next()});await A.waitForSelector('.op',{timeout:15000});ok('fråga på telefonen',true);
// telefonen tappar nätet
await ca.setOffline(true);await tv.waitForTimeout(6000);await ca.setOffline(false);await A.evaluate(()=>{document.dispatchEvent(new Event('visibilitychange'));window.dispatchEvent(new Event('online'))});
const t0=Date.now();const back=await tv.waitForFunction(()=>__show.players[0].connected&&Date.now()-__show.players[0].seen<3000,null,{timeout:20000}).then(()=>1,()=>0);ok('telefonen kommer tillbaka',back,(Date.now()-t0)+' ms');
await A.waitForSelector('.op',{timeout:30000}).catch(()=>{});const q0=await tv.evaluate(()=>__show.inst?.ans);await A.click('.op',{timeout:8000}).catch(()=>{});await tv.waitForFunction(()=>{const a=__show.inst?.ans;return a&&Object.keys(a).length>=1||__show.inst?.phase!=='q'},null,{timeout:12000}).then(()=>ok('svar efter avbrott går fram',true),()=>ok('svar efter avbrott går fram',false));
// tv:n tappar nätet
await tc.setOffline(true);await tv.waitForTimeout(7000);const ban=await tv.evaluate(()=>!!document.querySelector('.netbad'));await tc.setOffline(false);await tv.evaluate(()=>{window.dispatchEvent(new Event('online'))});const t1=Date.now();await tv.waitForFunction(()=>!document.querySelector('.netbad'),null,{timeout:25000}).catch(()=>{});console.log('tv-banner visades',ban,'borta efter',Date.now()-t1);
const seen=await tv.waitForFunction(()=>__show.players.every(p=>p.connected&&Date.now()-p.seen<4000),null,{timeout:25000}).then(()=>1,()=>0);ok('alla tillbaka efter tv-avbrott',seen);
// tv:n laddas om mitt i
await tv.reload();await tv.waitForTimeout(1500);await tv.click('.gate h1',{force:true}).catch(()=>{});await tv.waitForFunction(()=>window.__show);const c2=await tv.evaluate(()=>__show.code);ok('samma rum efter omladdning',c2===code);await tv.waitForFunction(()=>__show.players.filter(p=>p.connected).length>=2,null,{timeout:20000}).then(()=>ok('telefonerna hittar tillbaka',true),()=>ok('telefonerna hittar tillbaka',false));
// fel rumskod
const X=await cb.newPage();await X.goto(B+'/?r=QQQQ&n=Sen');await X.waitForTimeout(10500);ok('fel kod ger besked',await X.evaluate(()=>/svarar inte/.test(document.body.innerText)));
await b.close();console.log('fel',errs,'antal',bad);
