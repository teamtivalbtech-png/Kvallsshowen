import fs from 'fs';import {feature,mesh} from 'topojson-client';import {geoPath,geoTransform} from 'd3-geo';
const w=JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json'));const W=2000,H=W*145/360;
const t=geoTransform({point(x,y){this.stream.point((x+180)/360*W,(85-y)/145*H)}});const p=geoPath(t);
const land=p(feature(w,w.objects.land)),b=p(mesh(w,w.objects.countries,(a,c)=>a!==c));const r=s=>s.replace(/(\d+\.\d)\d+/g,'$1');
fs.writeFileSync('public/art/world.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H.toFixed(0)}"><rect width="100%" height="100%" fill="#16506e"/><path d="${r(land)}" fill="#e9dcb7"/><path d="${r(b)}" fill="none" stroke="#8a7a5e" stroke-width=".6"/></svg>`);console.log(fs.statSync('public/art/world.svg').size);
