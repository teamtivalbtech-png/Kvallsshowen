// Håller Supabase vaken. Gratisprojekt pausas efter en vecka utan databasfrågor, och spelet använder bara realtidskanaler.
// Vercel anropar den här en gång per dygn (se crons i vercel.json). Nyckeln är den publika som redan finns i appen.
const URL='https://ubbuxifxoxgdbzgcvcvy.supabase.co',KEY='sb_publishable_RHnG0AeR35JK93-zm4w6qg_NMAQ6xc4';
export default async function handler(_req:any,res:any){
  const h={apikey:KEY,authorization:'Bearer '+KEY};const out:any={};
  for(const [k,p] of [['lagring','/storage/v1/bucket']]){try{const r=await fetch(URL+p,{headers:h});out[k]=r.status}catch(e:any){out[k]=String(e)}}
  res.setHeader('cache-control','no-store');res.status(200).json({ok:out.lagring===200,...out,tid:new Date().toISOString()});
}
