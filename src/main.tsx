import React,{lazy,Suspense} from 'react';import {createRoot} from 'react-dom/client';import '@fontsource/bowlby-one';import '@fontsource/dm-sans/400.css';import '@fontsource/dm-sans/600.css';import '@fontsource/dm-sans/800.css';import '@fontsource/dm-mono/500.css';import './styles.css';import {startLite} from './lite';import {Guard} from './ui/guard';
const Tv=lazy(()=>import('./Tv').then(m=>({default:m.Tv})));const Phone=lazy(()=>import('./Phone').then(m=>({default:m.Phone})));const Home=lazy(()=>import('./Home').then(m=>({default:m.Home})));
const q=new URLSearchParams(location.search);const code=(q.get('r')||q.get('rum')||'').toUpperCase();const isTv=location.pathname.startsWith('/tv');
if(isTv)startLite();
// Efter en ny version kan en öppen flik be om gamla filer. Då räcker det med att ladda om, rummet återställs.
window.addEventListener('vite:preloadError',(e:any)=>{e.preventDefault?.();let last=0;try{last=+(sessionStorage.getItem('ks-rl')||0);sessionStorage.setItem('ks-rl',String(Date.now()))}catch{}if(Date.now()-last>30000)location.reload()});
window.addEventListener('unhandledrejection',e=>console.warn('ohanterat',e.reason));
createRoot(document.getElementById('root')!).render(<Guard fallback={<div className="crash"><h1 className="logo">Kvälls<br/>showen</h1><button className="big" onClick={()=>location.reload()}>Starta om sidan</button></div>}><Suspense fallback={<div className="boot"><i/></div>}>{isTv?<Tv/>:code?<Phone code={code}/>:<Home/>}</Suspense></Guard>);
