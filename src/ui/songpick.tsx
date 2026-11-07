import React,{useEffect,useMemo,useState} from 'react';
// Välj en låt ur katalogen. Listan hämtas först när vyn visas, så telefonen inte laddar den i onödan.
let LIST:any[]|null=null;
const norm=(x:string)=>x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
export function SongPick({prompt,note,taken=[],send}:any){
  const[l,setL]=useState<any[]|null>(LIST);const[q,setQ]=useState('');const[sent,setSent]=useState(false);
  useEffect(()=>{if(!LIST)import('../content/more').then(m=>{LIST=[...m.SONGS].sort((a:any,b:any)=>a.t.localeCompare(b.t,'sv'));setL(LIST)}).catch(()=>{})},[]);
  const tips=useMemo(()=>l?[...l].sort(()=>Math.random()-.5).slice(0,24):[],[l]);
  const hits=useMemo(()=>{if(!l)return[];const n=norm(q);if(n.length<2)return tips;const w=n.split(' ');return l.filter((s:any)=>{const h=norm(s.t+' '+s.a);return w.every(x=>h.includes(x))}).slice(0,40)},[l,q,tips]);
  if(!l)return <div className="center"><div className="spin"/></div>;
  return <div className="spick"><h3>{prompt}</h3>{note&&<p className="note">{note}</p>}<input className="tx" placeholder="Sök låt eller artist" value={q} onChange={e=>setQ(e.target.value)}/><p className="note">{q.trim().length<2?'Förslag. Sök för att hitta fler bland '+l.length+' låtar.':hits.length?`${hits.length===40?'40+':hits.length} träffar`:'Inga träffar. Prova ett annat ord.'}</p>
    <div className="slist">{hits.map((s:any)=><button key={s.t+'|'+s.a} disabled={sent||taken.includes(s.t+'|'+s.a)} onClick={()=>{setSent(true);navigator.vibrate?.(15);send({song:{t:s.t,a:s.a}});setTimeout(()=>setSent(false),2500)}}><b>{s.t}</b><span>{taken.includes(s.t+'|'+s.a)?'Redan vald av någon annan':`${s.a} · ${s.y}`}</span></button>)}</div></div>;
}
