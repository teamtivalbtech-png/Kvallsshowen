// Rättvis blandning. Math.random()-.5 i sort gynnar det som ligger först i listan.
const r=()=>{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]};
export const rs=()=>{const m=new Map<any,number>();const k=(x:any)=>{if(!m.has(x))m.set(x,r());return m.get(x)!};return (a:any,b:any)=>k(a)-k(b)};
