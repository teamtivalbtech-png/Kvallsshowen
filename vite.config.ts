import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import legacy from '@vitejs/plugin-legacy';
/** Delar upp argument på toppnivå i en css-funktion. */
function args(s:string){const o:string[]=[];let d=0,c='';for(const k of s){if(k==='(')d++;if(k===')')d--;if(k===','&&!d){o.push(c.trim());c=''}else c+=k}o.push(c.trim());return o}
/** Byter clamp()/min()/max() mot ett enkelt värde, för webbläsare som saknar dem. */
function flatten(v:string){for(let g=0;g<20;g++){const m=/(?<![\w-])(clamp|min|max)\(/.exec(v);if(!m)return v;let i=m.index+m[0].length,d=1;while(i<v.length&&d){if(v[i]==='(')d++;if(v[i]===')')d--;i++}const a=args(v.slice(m.index+m[0].length,i-1));v=v.slice(0,m.index)+(m[1]==='clamp'?a[1]:m[1]==='max'?a[a.length-1]:a[0])+v.slice(i)}return v}
/** Lägger till reservvärden i den färdiga css-filen: äldre tv-webbläsare och iPhone saknar clamp() och gap i flex. */
function fallbacks(css:string){
  css=css.replace(/([;{])([a-z-]+):([^;{}]*(?<![\w-])(?:clamp|min|max)\([^;{}]*)/g,(all,p,prop,val)=>prop.startsWith('--')?all:`${p}${prop}:${flatten(val)};${prop}:${val}`);
  const extra:string[]=[];
  for(const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)){const sel=m[1].trim(),b=';'+m[2]+';';if(sel.startsWith('@')||!/;display:(inline-)?flex;/.test(b))continue;const g=/;gap:([^;]+);/.exec(b);if(!g)continue;const[r,c=r]=g[1].trim().split(/\s+/);const col=/;flex-direction:column/.test(b),wrap=/;flex-wrap:wrap/.test(b);const list=sel.split(',').map(x=>x.trim());
    if(wrap)extra.push(`${list.map(x=>`html.nogap ${x}>*`).join(',')}{margin:${r==='0'?0:`calc(${r}/2)`} ${c==='0'?0:`calc(${c}/2)`}}`);
    else extra.push(`${list.map(x=>`html.nogap ${x}>*+*`).join(',')}{${col?`margin-top:${r}`:`margin-left:${c}`}}`)}
  return css+extra.join('');
}
export default defineConfig({
  define:{__BUILD__:JSON.stringify(String(Date.now()))},
  plugins:[react(),legacy({targets:['chrome>=53','safari>=11','firefox>=60','edge>=79'],modernTargets:['chrome>=64','safari>=12','firefox>=67','edge>=79'],modernPolyfills:true}),
    {name:'css-reserv',enforce:'post',generateBundle(_,b){for(const k in b){const a:any=b[k];if(a.type==='asset'&&k.endsWith('.css'))a.source=fallbacks(String(a.source))}}}],
  build:{chunkSizeWarningLimit:3000,cssTarget:['chrome61','safari11']},
});
