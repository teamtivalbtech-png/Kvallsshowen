// Innehåll till Maffian: rum, spår, roller och Sixtens berättelser.
export const ROOMS=[{id:'studio',name:'Studion',icon:'🎬'},{id:'loge',name:'Logen',icon:'💄'},{id:'bar',name:'Baren',icon:'🍸'},{id:'kok',name:'Köket',icon:'🍳'},{id:'kontroll',name:'Kontrollrummet',icon:'🎛️'},{id:'tak',name:'Taket',icon:'🌙'}];
export const roomName=(id:string)=>ROOMS.find(r=>r.id===id)?.name||id;
export const TRAITS:any[]=[
{k:'drink',label:'Dricker',v:{Kaffe:'en halvdrucken kaffekopp','Öl':'en tom ölburk',Vin:'ett vinglas med läppstift',Läsk:'en klibbig läskburk'}},
{k:'habit',label:'Ovana',v:{Snus:'en snusdosa',Tuggummi:'ett tuggummi under bordet',Cigg:'en nyss släckt fimp',Nagelbitare:'avbitna nagelbitar'}},
{k:'shoe',label:'Skor',v:{Sneakers:'ett sneakersavtryck',Kängor:'ett avtryck efter kängor',Klackar:'märken efter höga klackar',Foppatofflor:'en borttappad foppatoffel'}},
{k:'smell',label:'Doft',v:{Citrus:'en stark doft av citrus',Vanilj:'en söt doft av vanilj',Tallbarr:'en doft av tallbarr',Kebab:'en tydlig doft av kebab'}},
{k:'item',label:'Bär',v:{Keps:'en kvarglömd keps',Glasögon:'ett par glasögon',Armbandsur:'ett trasigt armbandsur',Halsduk:'en lång halsduk'}},
{k:'snack',label:'Äter',v:{Ostbågar:'smulor av ostbågar',Polkagris:'en bit polkagris',Kanelbulle:'smulor av kanelbulle',Salmiak:'en salmiakpastill'}},
];
export const ROLES:any={
maffia:{name:'Maffian',side:'maffia',icon:'🔪',short:'Tar ut en person varje natt.',desc:'Ni känner varandra. Varje natt väljer ni ett offer. En av er smyger dit, så andra kan märka att personen lämnade sitt rum. Ljug om var ni var. Ni vinner när ni är lika många som resten.'},
gudfar:{name:'Gudfadern',side:'maffia',icon:'🎩',short:'Maffians ledare. Polisen ser dig som oskyldig.',desc:'Du tillhör maffian, men polisens undersökning visar att du är oskyldig. Varje natt väljer ni ett offer. Ljug om var ni var. Ni vinner när ni är lika många som resten.'},
polis:{name:'Polisen',side:'stad',icon:'🕵️',short:'Undersöker en person varje natt.',desc:'Varje natt undersöker du en person och får veta om den är maffia. Gudfadern går inte att avslöja. Berättar du vad du vet blir du nästa mål. Hitta maffian för att vinna.'},
lakare:{name:'Läkaren',side:'stad',icon:'🩺',short:'Skyddar en person varje natt.',desc:'Varje natt skyddar du en person. Blir den attackerad så överlever den. Du får inte skydda samma person två nätter i rad. Hitta maffian för att vinna.'},
journalist:{name:'Journalisten',side:'stad',icon:'📰',short:'Ser vilka som var i ett rum.',desc:'Varje natt väljer du ett rum och får veta exakt vilka som var där. Då kan du avslöja lögner om alibin. Hitta maffian för att vinna.'},
vakt:{name:'Nattvakten',side:'stad',icon:'🔦',short:'Bevakar en person varje natt.',desc:'Varje natt bevakar du en person. Du får veta om personen lämnade sitt rum och om någon kom till den. Hitta maffian för att vinna.'},
narr:{name:'Narren',side:'narr',icon:'🃏',short:'Vill bli utröstad.',desc:'Du vinner själv om gruppen röstar ut dig. Spela misstänkt, men inte för tydligt. Blir du dödad på natten har du förlorat.'},
gast:{name:'Gästen',side:'stad',icon:'🥂',short:'Vanlig gäst som håller ögonen öppna.',desc:'Du har ingen specialförmåga, men varje natt håller du ögonen på en person och kan se vad den gör. Hitta maffian för att vinna.'},
};
export const rolesFor=(n:number)=>{const r=['polis','lakare'];const maf=n>=11?['gudfar','maffia','maffia']:n>=8?['gudfar','maffia']:['maffia'];r.push(...maf);if(n>=6)r.push('journalist');if(n>=7)r.push('narr');if(n>=8)r.push('vakt');while(r.length<n)r.push('gast');return r.slice(0,n)};
export const DEATHS=[
'{v} hittades i {r} med ansiktet i en skål potatissallad.',
'{v} hittades i {r}. Mikrofonsladden låg runt halsen, och det var inte en olycka.',
'{v} hittades i {r} med en champagnekork i pannan.',
'I {r} låg {v} under en strålkastare som lossnat från taket. Skruvarna var uppskruvade.',
'{v} hittades i {r}, nerbäddad i en rulle gaffatejp.',
'{v} hittades i {r} med sminket fortfarande på. Ingen som lever ser ut så där.',
'I {r} satt {v} helt stilla. Det var inte tv-stelhet.',
'{v} hittades i {r} med publikskylten APPLÅD runt halsen.',
'{v} låg i {r} med en förgiftad kanelbulle i handen.',
'{v} hittades i {r}. Sista inlägget på telefonen var ett hjärta, sedan ingenting.',
'{v} hittades i {r} under en hög med programledarkostymer.',
'Städaren skrek till i {r}. Där låg {v}, omgiven av konfetti.',
'{v} hittades i {r} med ett kort i fickan: Tack för att du tittade.',
'{v} låg i {r}, tyst för första gången på hela kvällen.',
];
export const SAVED=['Något hände i {r} i natt. Någon attackerades men överlevde. Läkaren hann fram i tid.','Ett skrik hördes från {r}, men alla vaknade i morse. Någon hade tur.','I {r} ligger en välta stol och det luktar sjukhus. Någon räddades i sista sekunden.'];
export const QUIET=['Natten var lugn. Alla vaknade.'];
export const NIGHTS=['Natten faller över studion.','Lamporna släcks. Någon i det här rummet ljuger.','Kamerorna är av. Nu börjar den riktiga showen.','Ingen går hem i kväll. Ingen får heller lämna byggnaden.','Tyst i studion. Något rör sig i korridoren.'];
