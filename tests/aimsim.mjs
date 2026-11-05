// Simulerar brusiga markörer: nya beräkningen ska ge lugnare och träffsäkrare sikte med en markör.
import {createRequire} from 'module';const {chromium}=createRequire('/')('playwright');const b=await chromium.launch();const c=await b.newContext();const p=await c.newPage();await p.goto('http://localhost:4173/?r=ABCD&local=1&n=A');await p.waitForTimeout(1500);
const r=await p.evaluate(async()=>{const a=await Promise.all([...document.scripts].map(x=>x.src)).catch(()=>0);return typeof window.__locate});console.log('modul',r);
await b.close();process.exit(0)
