// Letar upp en trailer på YouTube för en film. Används bara för att ta fram listan i content/films.ts.
export default async function handler(req:any,res:any){
  const t=String(req.query.t||'').slice(0,90),y=+req.query.y||0;if(!t)return res.status(400).end();
  const out:any[]=[];
  try{const r=await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(req.query.raw?t:`${t} ${y||''} official trailer`)}&hl=sv&gl=SE`,{headers:{'accept-language':'en-US,en;q=0.9','user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'}});
    const h=await r.text();const m=h.match(/var ytInitialData = (\{.*?\});<\/script>/s);
    if(m){const j=JSON.parse(m[1]);const walk=(o:any)=>{if(!o||typeof o!=='object'||out.length>=10)return;if(o.videoRenderer){const v=o.videoRenderer;out.push({id:v.videoId,ti:v.title?.runs?.[0]?.text,ch:v.ownerText?.runs?.[0]?.text,len:v.lengthText?.simpleText});return}for(const k in o)walk(o[k])};walk(j)}else out.push({err:'no data',st:r.status,len:h.length})}catch(e:any){out.push({err:String(e)})}
  await Promise.all(out.filter(x=>x.id).map(async x=>{try{const r=await fetch(`https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${x.id}`);x.emb=r.status}catch{x.emb=0}}));
  res.setHeader('cache-control','no-store');res.status(200).json(out);
}
