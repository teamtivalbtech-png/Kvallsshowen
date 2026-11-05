// Innehåll till Maffian: rum, spår, roller och Sixtens berättelser.
export const ROOMS=[{id:'studio',name:'Studion',icon:'🎬'},{id:'loge',name:'Logen',icon:'💄'},{id:'bar',name:'Baren',icon:'🍸'},{id:'kok',name:'Köket',icon:'🍳'},{id:'kontroll',name:'Kontrollrummet',icon:'🎛️'},{id:'tak',name:'Taket',icon:'🌙'}];
export const roomName=(id:string)=>ROOMS.find(r=>r.id===id)?.name||id;
export const TRAITS:any[]=[
{k:'drink',label:'Dricker',v:{Kaffe:'en halvdrucken kaffekopp','Öl':'en tom ölburk',Vin:'ett vinglas med läppstift',Läsk:'en klibbig läskburk'}},
{k:'habit',label:'Ovana',v:{Snus:'en snusdosa',Tuggummi:'ett tuggummi under bordet',Cigg:'en nyss släckt fimp',Nagelbitare:'avbitna nagelbitar'}},
{k:'shoe',label:'Skor',v:{Sneakers:'ett sneakersavtryck',Kängor:'ett avtryck efter kängor',Klackar:'märken efter höga klackar',Foppatofflor:'en borttappad foppatoffel'}},
];
export const ROLES:any={
maffia:{name:'Maffian',side:'maffia',icon:'🔪',short:'Tar ut en person varje natt.',desc:'Ni känner varandra. Varje natt väljer ni ett offer. En av er smyger dit, så andra kan märka att personen lämnade sitt rum. Ljug om var ni var. Ni vinner när ni är lika många som resten.'},
gudfar:{name:'Gudfadern',side:'maffia',icon:'🎩',short:'Maffians president. Polisen ser dig som oskyldig.',desc:'Du tillhör maffian, men polisens undersökning visar att du är oskyldig. Varje natt väljer ni ett offer. Ljug om var ni var. Ni vinner när ni är lika många som resten.'},
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
// Regelbok och instruktioner.
export const RULES=[
{i:'🎭',t:'Målet',d:['Några av er är maffian. Ingen vet vilka, utom maffian själv.','Staden vinner om all maffia åker ut, eller om 3 liberala lagar går igenom.','Maffian vinner om de blir lika många som resten, om 4 fascistiska lagar går igenom, eller om Gudfadern blir kansler efter 2 fascistiska lagar.']},
{i:'🔒',t:'Din roll är hemlig',d:['Håll på knappen på telefonen för att se din roll. Släpp, så försvinner den.','Visa aldrig telefonen för någon.','Regelboken finns alltid på telefonen.']},
{i:'🔁',t:'En dag i taget',d:['Varje dag har fem delar, och raden högst upp visar var ni är.','Natt, Morgon, Regering, Diskussion och Röstning.','Spelet börjar om tills någon vinner.']},
{i:'🌙',t:'Natt och morgon',d:['På natten väljer du ett rum och ser vilka andra som är där. Sedan gör alla sitt hemliga jobb.','Maffian tar en person. På morgonen får ni veta vem, och ett spår hittas.','Spåret visar en vana, till exempel snus. Alla vanor syns för alla, så spåret pekar ut flera personer.']},
{i:'📡',t:'Regeringen',d:['En president väljer en kansler. Alla röstar öppet Ja eller Nej.','Presidenten slänger ett av tre kort, och kanslern spelar ett av två.','Leken har fler fascistiska än liberala kort, så även en oskyldig person kan tvingas spela fascistiskt.','Båda berättar sedan vad de fick. Stämmer inte historierna ljuger någon.']},
{i:'⚖️',t:'Diskussion och röstning',d:['Säg var du var i natt. Ditt alibi syns på tv:n, och du får ljuga.','Jämför vad ni såg, och vem som sagt vad.','Sedan röstar ni fram vem som åtalas, lyssnar på försvaret och röstar ut en person.','Dör du blir du spöke. Var tyst och gissa vem som är maffia.']},
];
export const HELP:any={
rules:'Lyssna på genomgången. Regelboken finns alltid på ❓.',
length:'Programpresidenten väljer hur länge ni ska diskutera.',
cards:'Håll på knappen och läs din roll i lugn och ro.',
room:'Välj rummet du är i i natt. Du ser vilka fler som är där.',
act:'Gör ditt nattjobb. Alla trycker, så ingen avslöjas.',
dawn:'Lyssna. Programpresidenten går vidare när ni är klara.',
gnom:'Presidenten väljer en kansler. Säg gärna vad ni tycker högt.',
gvote:'Rösta Ja om du litar på paret. Rösten syns öppet.',
gres:'Titta vem som röstade vad. Programpresidenten går vidare.',
gdraw:'Presidenten slänger ett kort. Övriga väntar.',
gplay:'Kanslern spelar ett kort.',
gclaim:'President och kansler berättar vad de fick. Stämmer det?',
gpower:'Presidenten använder sin makt.',
talk:'Säg ditt alibi på telefonen. Prata och jämför. Tryck Redo när ni vill rösta.',
nom:'Rösta på vem som ska åtalas.',
defend:'Den åtalade har ordet. Lyssna och ställ frågor.',
vote:'Rösta om vem som ska ut.',
verdict:'Domen visas. Programpresidenten går vidare.',
end:'Nu ser ni vad som egentligen hände.',
};
export const PART:any={room:'Natt',act:'Natt',dawn:'Morgon',gnom:'Regering',gvote:'Regering',gres:'Regering',gdraw:'Regering',gplay:'Regering',gclaim:'Regering',gpower:'Regering',talk:'Diskussion',nom:'Röstning',defend:'Röstning',vote:'Röstning',verdict:'Röstning'};
export const PARTS=['Natt','Morgon','Regering','Diskussion','Röstning'];
export const ANN:any={room:{i:'🌙',t:'Natten faller',d:'Välj rum, och gör sedan ditt hemliga jobb.'},gnom:{i:'📡',t:'Dags för regeringsval',d:'Presidenten väljer kansler, och alla röstar öppet.'},talk:{i:'🗣️',t:'Diskussion',d:'Säg var du var. Vem ljuger?'},nom:{i:'⚖️',t:'Dags att rösta',d:'Vem ska åtalas?'}};
export const TIPS:any={maffia:'Tips: Säg att du tvingades spela fascistiskt. Lägg misstankar på någon annan tidigt.',gudfar:'Tips: Bygg förtroende. Blir du kansler efter 2 fascistiska lagar vinner ni direkt.',polis:'Tips: Vänta med att avslöja dig. Hamnar du i fara, berätta vad du vet.',lakare:'Tips: Skydda den som verkar veta mest.',journalist:'Tips: Kolla rummet där någon säger sig ha varit.',vakt:'Tips: Bevaka den som verkar säker. Du ser om den smyger ut.',narr:'Tips: Var misstänkt men inte för mycket.',gast:'Tips: Fråga folk var de var och skriv upp vad som inte stämmer.'};
