// Programledarens röst: Googles Gemini TTS. Svaret cachas i Vercels CDN så varje replik bara genereras en gång.
const MODEL='gemini-3.1-flash-tts-preview',VOICE='Puck';
function wav(pcm:Buffer){const h=Buffer.alloc(44);h.write('RIFF',0);h.writeUInt32LE(36+pcm.length,4);h.write('WAVEfmt ',8);h.writeUInt32LE(16,16);h.writeUInt16LE(1,20);h.writeUInt16LE(1,22);h.writeUInt32LE(24000,24);h.writeUInt32LE(48000,28);h.writeUInt16LE(2,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(pcm.length,40);return Buffer.concat([h,pcm])}
export default async function handler(req:any,res:any){
  const key=process.env.GEMINI_API_KEY,t=String(req.query.t||'').slice(0,240);
  const host=String(req.headers.host||''),ref=String(req.headers.referer||'');
  if(!key)return res.status(503).json({error:'no key'});
  if(!t||(ref&&!ref.includes(host)))return res.status(400).end();
  try{const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':key},body:JSON.stringify({contents:[{parts:[{text:`Läs följande på svenska med rikssvenskt uttal, som en rolig, energisk och lite överdriven svensk gameshow-programledare på 70-talet, med glimten i ögat: ${t}`}]}],generationConfig:{responseModalities:['AUDIO'],speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:VOICE}}}}})});
    if(!r.ok)return res.status(r.status===429?429:502).json({error:'tts'});
    const j:any=await r.json(),d=j.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;if(!d)return res.status(502).json({error:'empty'});
    res.setHeader('content-type','audio/wav');res.setHeader('cache-control','public, max-age=86400, s-maxage=31536000, immutable');res.status(200).send(wav(Buffer.from(d,'base64')));
  }catch{res.status(502).json({error:'fail'})}
}
