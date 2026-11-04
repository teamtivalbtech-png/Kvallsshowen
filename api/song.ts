// Hämtar ett 30-sekundersklipp via servern så att tv:ns webbläsare slipper blockeras.
const norm=(s:string)=>(s||'').toLowerCase().replace(/\(.*?\)/g,'').replace(/[^a-z0-9åäö]/g,'');
const pick=(a:any[],artist:string,title:string)=>{const A=artist.toLowerCase().slice(0,4),T=norm(title).slice(0,6),by=(x:any)=>(x.artistName||x.artist?.name||'').toLowerCase().includes(A),tt=(x:any)=>norm(x.trackName||x.title).startsWith(T);return a.find(x=>by(x)&&tt(x))||a.find(tt)||null};
export default async function handler(req:any,res:any){
  const t=String(req.query.t||'').slice(0,80),a=String(req.query.a||'').slice(0,60);if(!t)return res.status(400).end();
  const q=encodeURIComponent(`${a} ${t}`);let url:string|null=null,src='';
  try{const r=await fetch(`https://api.deezer.com/search?q=${q}&limit=15`);if(r.ok){const j:any=await r.json();const m=pick((j.data||[]).filter((x:any)=>x.preview),a,t);if(m){url=m.preview;src='deezer'}}}catch{}
  if(!url)try{const r=await fetch(`https://itunes.apple.com/search?term=${q}&media=music&entity=song&limit=15&country=SE`);if(r.ok){const j:any=await r.json();const m=pick((j.results||[]).filter((x:any)=>x.previewUrl),a,t);if(m){url=m.previewUrl;src='itunes'}}}catch{}
  res.setHeader('cache-control','public, s-maxage=1800');res.status(url?200:404).json({url,src});
}
