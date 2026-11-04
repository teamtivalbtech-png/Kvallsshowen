import fs from 'fs';import {feature,mesh} from 'topojson-client';import {geoPath,geoEquirectangular} from 'd3-geo';
const w=JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json'));const W=3000,H=Math.round(W*145/360);
const pr=geoEquirectangular().scale(W/(2*Math.PI)).translate([W/2,85/145*H]);const p=geoPath(pr);
const land=p(feature(w,w.objects.land)),b=p(mesh(w,w.objects.countries,(a,c)=>a!==c));
fs.writeFileSync('/tmp/world.svg',`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="100%" height="100%" fill="#16506e"/><path d="${land}" fill="#e9dcb7"/><path d="${b}" fill="none" stroke="#8a7a5e" stroke-width=".8"/></svg>`);
