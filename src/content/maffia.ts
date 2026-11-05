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
// Regelbok och instruktioner.
export const RULES=[
{i:'🎭',t:'Målet',d:['Ni är gäster på Kvällsshowen, men några av er är maffian.','Staden vinner om all maffia åker ut eller om 5 ärliga sändningar går igenom.','Maffian vinner om de blir lika många som resten, om 6 fuskade sändningar går igenom, eller om Gudfadern blir producent när minst 3 fuskade har gått igenom.']},
{i:'🔒',t:'Din roll är hemlig',d:['Håll på knappen på telefonen för att se din roll.','Släpp knappen så försvinner den. Visa aldrig telefonen för någon.','Maffian vet vilka som hör ihop. Alla andra vet ingenting.']},
{i:'🌙',t:'Natten',d:['Alla väljer ett rum. Du ser vilka andra som är i ditt rum.','Sedan gör alla sitt jobb i hemlighet. Även vanliga gäster trycker, så ingen avslöjas av att de pillar på telefonen.','Maffian väljer ett offer och en av dem smyger dit. Den som var i samma rum kan märka att personen gick.']},
{i:'🌅',t:'Morgonen',d:['Sixten berättar vem som dog och var. Den dödes roll visas.','Ett spår hittas på brottsplatsen, till exempel en snusdosa. Alla har en offentlig profil med vanor, så spåret pekar ut flera personer.','Maffian kan plantera falska spår. Lita inte blint på dem.','Sedan undersöker du brottsplatsen eller gästboken. Det du hittar ser bara du.']},
{i:'📡',t:'Sändningen',d:['Varje dag sker två sändningar. Sändningsledaren väljer en producent.','Alla röstar Ja eller Nej, öppet. Hur du röstar syns på tv:n och kan användas mot dig.','Tre misslyckade val i rad, och översta kortet spelas automatiskt.','Den som nyss var ledare eller producent kan inte väljas igen direkt.']},
{i:'🃏',t:'Korten',d:['Ledaren drar 3 kort, slänger 1 i hemlighet och ger 2 till producenten.','Producenten spelar 1 kort. Det hamnar på tavlan.','Leken har 6 ärliga och 11 fuskade kort, så även en ärlig person kan tvingas spela fusk.','Därför får båda sedan berätta vad de fick. Stämmer inte historierna ljuger någon.']},
{i:'⚡',t:'Makten',d:['Fuskade kort ger sändningsledaren extra makt.','Efter 2 fuskade får ledaren granska en spelares sida.','Efter 3 väljer ledaren nästa ledare.','Efter 4 och 5 avskedar ledaren en spelare, som åker ut direkt.']},
{i:'🗣️',t:'Diskussionen',d:['Säg var du var i natt. Ditt alibi syns på tv:n och du får ljuga.','Jämför vad ni såg. Vem påstår sig ha varit i ett rum där ingen såg dem?','Vem röstade Ja till ett styre som spelade fusk? Vem säger emot sig själv?','Använd telefonens anteckningar. Bara du ser dem.']},
{i:'⚖️',t:'Åtalet',d:['Efter andra sändningen röstar ni om vem som ska åtalas.','De med flest röster får försvara sig, och sedan röstar alla om vem som åker ut.','Personens roll visas. Sedan kommer natten igen.']},
{i:'👻',t:'Om du dör',d:['Du är ute, men du får vara kvar som spöke.','Var helt tyst. Du får inte hjälpa någon.','Gissa vem som är maffia på telefonen. Rätt gissning ger poäng i slutet.']},
];
export const HELP:any={
rules:'Lyssna på genomgången. Regelboken finns alltid på ❓-knappen.',
length:'Programledaren väljer hur länge ni ska diskutera varje dag.',
cards:'Håll på knappen och läs din roll i lugn och ro. Visa ingen.',
room:'Välj rummet du är i i natt. Du kommer att se vilka fler som är där.',
act:'Gör ditt nattjobb. Alla trycker, så ingen avslöjas.',
dawn:'Lyssna. Skriv upp spåret i huvudet och kolla dina anteckningar.',
search:'Välj vad du undersöker. Det du hittar ser bara du.',
gnom:'Sändningsledaren väljer en producent. Säg gärna vad ni tycker högt.',
gvote:'Rösta Ja om du litar på paret. Rösten syns öppet på tv:n.',
gres:'Titta vem som röstade vad. Det kommer att spela roll.',
gdraw:'Ledaren slänger ett av tre kort. Övriga väntar.',
gplay:'Producenten spelar ett av två kort.',
gclaim:'Ledare och producent berättar vad de fick. Stämmer det? Bråka!',
gpower:'Ledaren använder sin makt.',
talk:'Säg ditt alibi på telefonen, prata och jämför. Tryck Redo när ni vill rösta.',
nom:'Rösta på vem som ska åtalas. De med flest röster får försvara sig.',
defend:'Den åtalade har ordet. Lyssna och ställ frågor.',
vote:'Sista chansen. Rösta om vem som ska ut.',
verdict:'Domen visas nu.',
end:'Nu ser ni vad som egentligen hände.',
};
export const TIPS:any={maffia:'Tips: Rösta ibland mot din egen sida och säg att du tvingades spela fusk. Lägg misstankar på någon annan tidigt.',gudfar:'Tips: Bygg förtroende med ärliga kort. Blir du producent efter 3 fuskade vinner ni direkt.',polis:'Tips: Vänta med att avslöja dig. Hamnar du i fara, berätta vad du vet.',lakare:'Tips: Skydda den som verkar veta mest, men inte samma person två nätter i rad.',journalist:'Tips: Kolla rummet där någon säger sig ha varit. Du kan avslöja en lögn direkt.',vakt:'Tips: Bevaka den som verkar säker på sig själv. Du ser om den smyger ut.',narr:'Tips: Var misstänkt men inte för mycket. Bete dig konstigt och förneka svagt.',gast:'Tips: Var aktiv. Fråga folk var de var och skriv upp vad som inte stämmer.'};
