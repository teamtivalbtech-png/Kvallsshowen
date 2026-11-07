// Hämtar en trailer för en film via iTunes, så att tv:n kan visa ett riktigt filmklipp i Filmster.
const norm=(s:string)=>(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\(.*?\)/g,'').replace(/[^a-z0-9]/g,'');
export default async function handler(req:any,res:any){
  const t=String(req.query.t||'').slice(0,90),y=+req.query.y||0;if(!t)return res.status(400).end();
  const T=norm(t);let url:string|null=null,poster='';const dbg:any[]=[];
  for(const c of ['US','SE','GB']){if(url)break;
    try{const r=await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(t)}&media=movie&limit=25&country=${c}`);if(!r.ok){dbg.push({c,st:r.status});continue}const j:any=await r.json();if(req.query.dbg)dbg.push({c,n:j.resultCount,r:(j.results||[]).slice(0,5).map((x:any)=>[x.kind,x.trackName,x.releaseDate,!!x.previewUrl])});
      const a=(j.results||[]).filter((x:any)=>x.previewUrl&&x.kind==='feature-movie');
      const yr=(x:any)=>Math.abs(new Date(x.releaseDate).getFullYear()-y);const nm=(x:any)=>{const n=norm(x.trackName);return n===T?0:n.startsWith(T)||T.startsWith(n)?1:n.includes(T)?2:9};
      const m=a.filter((x:any)=>nm(x)<9&&(!y||yr(x)<=1)).sort((p:any,q:any)=>nm(p)-nm(q)||yr(p)-yr(q))[0];
      if(m){url=m.previewUrl;poster=(m.artworkUrl100||'').replace('100x100','600x600')}}catch(e:any){dbg.push({c,e:String(e)})}}
  res.setHeader('cache-control','public, s-maxage=86400');res.status(url?200:404).json(req.query.dbg?{url,poster,dbg}:{url,poster});
}
