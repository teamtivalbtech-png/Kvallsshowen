// Stress: skräpdata, spelare som försvinner, hoppa vidare och lagläge i varje spel.
import {createRequire} from 'module';const {chromium}=createRequire('/')('playwright');import fs from 'fs';
const base='http://localhost:4173',FAST=process.env.FAST||8;const b=await chromium.launch();const c=await b.newContext({viewport:{width:1920,height:1080}});const tv=await c.newPage();const errs=[];
tv.on('pageerror',e=>errs.push('PAGE '+e.message));tv.on('console',m=>{if(m.type()==='error'&&!/Failed to load|ERR_|404|youtube|doubleclick|ytimg|CORS|google|compute-pressure|Permissions policy/.test(m.text()))errs.push('CON '+m.text().slice(0,140))});
await tv.goto(base+`/tv?local=1&fast=${FAST}`);await tv.waitForFunction(()=>window.__show);const code=await tv.evaluate(()=>__show.code);
const p=await c.newPage();p.on('pageerror',e=>errs.push('PHONE '+e.message));await p.goto(base+`/?r=${code}&local=1&n=Anna`);await tv.waitForFunction(()=>__show.players.length>=1);
for(let i=1;i<+(process.env.NP||1);i++){const q=await c.newPage();q.on('pageerror',e=>errs.push('PHONE '+e.message));await q.goto(base+`/?r=${code}&local=1&n=Spelare${i}`)}
await tv.waitForFunction(n=>__show.players.length>=n,+(process.env.NP||1));
const ids=process.argv[2]?process.argv[2].split(','):JSON.parse(fs.readFileSync('/tmp/gids.json'));
const team=process.env.TEAM==='1';
for(const id of ids){if(id==='allin')continue;const n=errs.length;
 const r=await tv.evaluate(async({id,team})=>{const s=__show,sleep=m=>new Promise(r=>setTimeout(r,m));s.toLobby();for(let k=s.players.length;k<5;k++)s.addBot();if(team){s.mode='team';s.teamCount=2;s.assignTeams()}else{s.mode='solo'}s.startSingle(id);let g=0;while(s.stage!=='game'&&g++<80){await sleep(100);if(s.stage==='intro'&&g>5)s.next()}
 const bad=[];const junk=[{}, {a:null},{a:undefined},{a:-1},{a:999999},{a:NaN},{a:''},{a:'x'.repeat(5000)},{a:[]},{a:[1,2,3,99]},{a:{}},{a:true},{a:'buzz'},{a:'rec',pcm:'!!!'},{a:'rec',pcm:'A'.repeat(3000)},{a:'skip'},{x:1,y:2},{n:1},{a:0},{a:1},null];
 const ids=()=>s.players.map(p=>p.id);
 for(let c=0;c<6&&s.stage==='game';c++){const inst=s.inst;if(!inst)break;for(const d of junk){for(const pid of [...ids(),'ghost']){try{if(d&&typeof d==='object')inst.onInput?.(pid,d)}catch(e){bad.push('in '+JSON.stringify(d)?.slice(0,30)+' '+e.message)}try{inst.onStream?.(pid,d??{})}catch(e){bad.push('st '+e.message)}try{inst.phone(pid)}catch(e){bad.push('ph '+e.message)}}}
  if(c===2){const bot=s.players.find(p=>p.bot);if(bot){bot.connected=false;try{inst.onLeave?.(bot.id)}catch(e){bad.push('leave '+e.message)}}}
  if(c===3){const h=s.players.find(p=>!p.bot);try{inst.onLeave?.(h.id)}catch(e){bad.push('leaveh '+e.message)}}
  await sleep(250)}
 const st=s.stage;let w=0;while(s.stage!=='lobby'&&w++<40){if(s.stage==='game'||s.stage==='result'||s.stage==='intro')s.next();await sleep(100)}
 return{st,end:s.stage,bad:[...new Set(bad)].slice(0,4)}},{id,team}).catch(e=>({crash:e.message.slice(0,200)}));
 await tv.waitForTimeout(150);const bad=r.crash||r.bad?.length||errs.length>n||r.end!=='lobby';console.log(bad?'BUG':'ok ',id,JSON.stringify(r).slice(0,260),errs.slice(n,n+3).join(' | ').slice(0,260))}
console.log('klart',errs.length);await b.close();
