import React from 'react';import {createRoot} from 'react-dom/client';import '@fontsource/bowlby-one';import '@fontsource/dm-sans/400.css';import '@fontsource/dm-sans/600.css';import '@fontsource/dm-sans/800.css';import '@fontsource/dm-mono/500.css';import './styles.css';import {Tv} from './Tv';import {Phone} from './Phone';import {Home} from './Home';
const q=new URLSearchParams(location.search);const code=(q.get('r')||q.get('rum')||'').toUpperCase();
createRoot(document.getElementById('root')!).render(location.pathname.startsWith('/tv')?<Tv/>:code?<Phone code={code}/>:<Home/>);
