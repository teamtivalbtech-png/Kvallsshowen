const L=(s:string)=>s.trim().split('\n').map(x=>x.split('|'));
export const TF=L(`Sverige har över 200 000 öar|1
Bananer är botaniskt sett bär|1
Hjärtat hos en blåval kan väga över 100 kg|1
Kameler lagrar vatten i sina pucklar|0
Honung kan hålla sig ätbar i tusentals år|1
Stora kinesiska muren syns tydligt med blotta ögat från månen|0
Guldfiskar har bara tre sekunders minne|0
En människa fiser i genomsnitt över tio gånger om dagen|1
Vikingar bar hjälmar med horn i strid|0
Sjöstjärnor saknar hjärna|1
Fåglar är dinosauriernas ättlingar|1
Blixten slår aldrig ner två gånger på samma plats|0
Australien är bredare än månen|1
Bläckfiskar har blått blod|1
Vi använder bara 10 procent av hjärnan|0
Skottland har enhörningen som nationaldjur|1
Kaffe är gjort på bönor som egentligen är kärnor från ett bär|1
Napoleon var ovanligt kort för sin tid|0
Svenska Dagbladet grundades 1884|1
Astrid Lindgren föddes i Vimmerby|1
Ikea är ett akronym som innehåller grundarens initialer|1
Alkohol värmer kroppen på riktigt|0
Tungan är kroppens starkaste muskel|0
Pizza Hawaii kommer från Hawaii|0
Rött vin blir rött tack vare skalen|1
Man blir fortare full av champagne än av stilla vin med samma alkoholhalt|1
Gäss användes för att vakta romerska borgar|1
Tandkräm uppfanns innan tandborsten fanns i dagens form|1
En kackerlacka kan leva flera dagar utan huvud|1
Det är olagligt att köra bil i Stockholm på söndagar|0
Björnar går i dvala hela vintern utan att vakna alls|0
Dalahästen var från början en leksak|1
Snigeln har tusentals tänder|1
Coca-Cola innehöll från början kokain|1
Lördagsgodis är ett begrepp från 1950-talets svenska kampanjer mot karies|1`).map(([q,a])=>({q,a:a==='1'}));
export const TIMELINE=L(`Vasaskeppet sjunker|1628
Gustav Vasa blir kung|1523
Sverige inför allmän rösträtt för kvinnor i val|1921
Berlinmuren faller|1989
Titanic sjunker|1912
Första man på månen|1969
Andra världskrigets slut|1945
Estonia förliser|1994
Abba vinner Eurovision|1974
Facebook lanseras|2004
Första iPhone släpps|2007
Spotify lanseras|2008
Skype lanseras|2003
Sverige blir Nato-medlem|2024
Corona klassas som pandemi|2020
Swish lanseras|2012
Mona Lisa målas ungefär|1503
Amerikanska självständighetsförklaringen|1776
Franska revolutionen|1789
Första Nobelpriset delas ut|1901
Tjernobylolyckan|1986
Tvillingtornen attackeras|2001
Brexit-omröstningen|2016
Första Ikea-butiken i Älmhult|1958
Högertrafik i Sverige|1967
Volvo grundas|1927
Filmen Psycho har premiär|1960
Tetris släpps|1984
Google grundas|1998
Kronprinsessan Victorias bröllop|2010
Pippi Långstrump ges ut|1945
Första Melodifestivalen|1959
Euron blir kontanter|2002
Olof Palme mördas|1986
Tv-sändningar i färg i Sverige|1970
Sverige går med i EU|1995`).map(([t,y],i)=>({id:i,t,y:+y}));
export const CLOSEST=L(`Hur många meter hög är Kebnekaises sydtopp ungefär (2020-talet)?|2095|m
Hur långt är det i luftlinje Stockholm–Göteborg ungefär?|395|km
Hur många invånare har Sverige (miljoner, avrundat till hela)?|11|miljoner
Hur många meter högt är Eiffeltornet?|330|m
Vad är Mount Everests höjd?|8849|m
Hur många länder finns i EU?|27|länder
Hur lång är Öresundsbron?|7845|m
Hur många medlemsländer har FN?|193|länder
Hur många år hade Carl XVI Gustaf varit kung 2023?|50|år
Hur många sjöar större än en hektar finns i Sverige ungefär?|95000|sjöar
Hur många kilometer är jordens omkrets ungefär?|40075|km
Hur många öar har Stockholms skärgård ungefär?|30000|öar
Vad är kokpunkten för vatten i Fahrenheit?|212|°F
Hur många tangenter har ett piano?|88|st
Hur många kort har en vanlig kortlek utan jokrar?|52|st
Hur många meter simmar man i Vansbrosimningens långa klass?|3000|m
Hur djupt är Vättern som djupast?|128|m
Hur många Nobelpris delas ut varje år inklusive ekonomipriset?|6|st
Hur många år var Björn Borg när han vann sin sista Wimbledon?|24|år
Hur många kalorier har en halv liter stark stor öl ungefär?|250|kcal
Hur många personer får plats i Friends Arena vid fotboll?|50000|pers
Hur många ledamöter har EU-parlamentet ungefär?|720|st
Hur många toaletter finns i Vita huset ungefär?|35|st
Hur många kilometer lång är Vasaloppet?|90|km
Hur många år blev Astrid Lindgren?|94|år
Hur många grader lutar jordaxeln?|23|grader
Hur högt är Kaknästornet ungefär?|155|m
Hur många minuter tar en fotbollsmatch utan tillägg?|90|min`).map(([q,a,u])=>({q,a:+a,u}));
export const PRICES=L(`🍺|Stor stark på krogen i Stockholm|95
🍕|Vesuvio på kvarterspizzerian|120
☕|Latte på kaffekedja|59
🍌|Ett kilo bananer|25
🧈|Normalsmör 500 g|55
🥚|12 ägg|42
🍷|Flaska vin i mellanprisklass på Systemet|129
🍾|Flaska Moët på Systemet|499
📱|Ny iPhone baspris|10990
🎮|Spelkonsol PlayStation 5|5990
🚲|Elcykel av enklare modell|15000
🪑|Billy-bokhylla på Ikea|599
🛋️|Tresitssoffa mellanklass|9000
🚗|Ny Volvo XC40 baspris|475000
🏠|Medelpris svensk villa|3300000
🎟️|Biljett till bio|165
🚆|Enkel SJ-biljett Stockholm–Göteborg i sista minuten|1100
🍔|Big Mac-meny|125
🧻|Toalettpapper 8-pack|55
🥩|Ryggbiff per kilo|450
🦞|Hummer på krogen|895
🍣|Lunchsushi|135
✂️|Klippning hos frisör|550
💍|Enkel guldring|6000
🧴|Parfym 50 ml|1100
🛫|Weekendflyg till London|1500
🎧|AirPods Pro|2790
🍦|Daimstrut på GB|42
📺|55-tums tv|7990
🛒|Veckohandling för två|1600`).map(([e,n,p])=>({e,n,p:+p}));
export const SONGS=L(`Dancing Queen|ABBA|1976
Waterloo|ABBA|1974
Mamma Mia|ABBA|1975
The Winner Takes It All|ABBA|1980
Gimme! Gimme! Gimme!|ABBA|1979
The Final Countdown|Europe|1986
It Must Have Been Love|Roxette|1990
The Look|Roxette|1989
Joyride|Roxette|1991
The Sign|Ace of Base|1993
All That She Wants|Ace of Base|1992
Lovefool|The Cardigans|1996
Hang On Now|Kajagoogoo|1983
Kärleken är|Jill Johnson|2003
Du måste finnas|Helen Sjöholm|1995
Vem vet|Lisa Ekdahl|1994
Sommaren är kort|Tomas Ledin|1982
Sommartider|Gyllene Tider|1982
När vi två blir en|Gyllene Tider|1980
Flickorna på TV2|Gyllene Tider|1981
Hem till Norden|Lasse Stefanz|2006
Håll om mig|Nanne Grönvall|2005
Hero|Charlotte Perrelli|2008
Fångad av en stormvind|Carola|1991
Främling|Carola|1983
Euphoria|Loreen|2012
Tattoo|Loreen|2023
Heroes|Måns Zelmerlöw|2015
Dancing on My Own|Robyn|2010
With Every Heartbeat|Robyn|2007
Wake Me Up|Avicii|2013
Levels|Avicii|2011
Hey Brother|Avicii|2013
Don't You Worry Child|Swedish House Mafia|2012
Hot N Cold|Katy Perry|2008
I Follow Rivers|Lykke Li|2011
Young Folks|Peter Bjorn and John|2006
Hate to Say I Told You So|The Hives|2000
Du är min man|Helen Sjöholm|1995
Ingenting|Kent|2005
Socker|Kent|2002
Musik non stop|Kent|2000
Håkan Hellström Känn ingen sorg för mig Göteborg|Håkan Hellström|2000
Du kan gå din egen väg|Thorleifs|1978
Ängel|Magnus Uggla|1993
Jag vill ha en egen måne|Magnus Uggla|1975
Mamma Pappa Barn|Thomas Di Leva|1991
Marcus Rosenberg|Lars Winnerbäck|2004
Hugo|Laleh|2011
Some Die Young|Laleh|2012
Billie Jean|Michael Jackson|1983
Thriller|Michael Jackson|1982
Beat It|Michael Jackson|1983
Like a Prayer|Madonna|1989
Like a Virgin|Madonna|1984
Bohemian Rhapsody|Queen|1975
Don't Stop Me Now|Queen|1979
Sweet Child O' Mine|Guns N' Roses|1987
Livin' on a Prayer|Bon Jovi|1986
Africa|Toto|1982
Take on Me|a-ha|1985
Wonderwall|Oasis|1995
Smells Like Teen Spirit|Nirvana|1991
Mr. Brightside|The Killers|2004
Seven Nation Army|The White Stripes|2003
Rolling in the Deep|Adele|2010
Someone Like You|Adele|2011
Shape of You|Ed Sheeran|2017
Crazy in Love|Beyoncé|2003
Umbrella|Rihanna|2007
Toxic|Britney Spears|2003
...Baby One More Time|Britney Spears|1998
Wannabe|Spice Girls|1996
I Want It That Way|Backstreet Boys|1999
Blinding Lights|The Weeknd|2019
Bad Guy|Billie Eilish|2019
Uptown Funk|Mark Ronson|2014
Get Lucky|Daft Punk|2013
Happy|Pharrell Williams|2013
Hey Ya!|OutKast|2003
Hips Don't Lie|Shakira|2006
Poker Face|Lady Gaga|2008
Bad Romance|Lady Gaga|2009
Yesterday|The Beatles|1965
Hey Jude|The Beatles|1968
Let It Be|The Beatles|1970
Satisfaction|The Rolling Stones|1965
Imagine|John Lennon|1971
Hotel California|Eagles|1976
Stayin' Alive|Bee Gees|1977
I Will Survive|Gloria Gaynor|1978
Y.M.C.A.|Village People|1978
Sweet Dreams (Are Made of This)|Eurythmics|1983
Every Breath You Take|The Police|1983
With or Without You|U2|1987
Nothing Compares 2 U|Sinéad O'Connor|1990
Zombie|The Cranberries|1994
Ironic|Alanis Morissette|1995
Believe|Cher|1998
Livin' la Vida Loca|Ricky Martin|1999
Lose Yourself|Eminem|2002
In da Club|50 Cent|2003
Yeah!|Usher|2004
Viva la Vida|Coldplay|2008
Rolling Stone|Lykke Li|2008
Despacito|Luis Fonsi|2017
Shallow|Lady Gaga|2018
Levitating|Dua Lipa|2020
As It Was|Harry Styles|2022
Flowers|Miley Cyrus|2023
Espresso|Sabrina Carpenter|2024`).filter(s=>!/Kajagoogoo|Rolling Stone\b|Hot N Cold|Håkan Hellström Känn|Marcus Rosenberg|Du kan gå|Du är min man|Jag vill ha en egen måne|Hem till Norden|Mamma Pappa Barn/.test(s.join('|'))).map(([t,a,y])=>({t,a,y:+y}));
export const WORDS=`baksmälla,första dejten,bastu,kräftskiva,flyttkartong,fredagsmys,grillkväll,ex-pojkvän,tinderdejt,skilsmässa,midsommarstång,snapsvisa,tandläkare,körkort,pensionär,gymkort,karaoke,dansgolv,fyllekäk,taxikö,sommarstuga,bilköp,bolån,svärmor,solsemester,hotellfrukost,brandlarm,loppis,Ikea-besök,midlifecrisis,dubbelsäng,hårförlust,vinprovning,polisbil,matlåda,sommarjobb,ölmage,cykelolycka,vattensäng,fågelholk,fotbollshuligan,brandman,gravöl,bröllopstal,tomteskägg,kärleksbrev,simhopp,mössa,robotdammsugare,vinterkräksjuka,kajak,toalettköa,smörgåstårta,älgjakt,påskkärring,lucia,parkeringsbot,afterwork,lönehelg,flygrädsla,trädkoja,fiskekort,hängmatta,snöskottning,glassbil,jordgubbstårta,badbrygga,matlagningskurs,rödvinsfläck,stuprör,sovsäck,ostbricka,tvättstuga,hyresvärd,fönsterputsare`.split(',');
export const FIB=L(`Vad kallas skräcken för att ha lång ord i munnen?|Hippopotomonstrosesquippedaliofobi
Vad heter det officiella vetenskapliga namnet på den svenska älgen?|Alces alces
Vad kallar man en grupp ugglor på engelska?|A parliament
Vad betyder det grekiska ordet "symposion" ordagrant?|Att dricka tillsammans
Vad heter den lilla plasthylsan i änden av ett skosnöre?|Aglett
Vilket svenskt ord har antagits på engelska och betyder rättsombud?|Ombudsman
Vad heter rädslan för att inte ha mobilen?|Nomofobi
Vad är "petrikor"?|Lukten efter regn på torr mark
Vad kallas en tjuv som stjäl från kyrkor?|Kyrkröveri-dömd sacrilegist
Vad heter det korta rum som finns mellan ögonbrynen?|Glabella
Vad heter det rosa badmaskineriets uppfinnare? Vad heter personen som håller upp kortet i boxning?|Ring girl
Vad kallas de små bubblorna i champagne på fransk fackspråk?|Perlage
Vad kallas skräcken för clowner?|Koulrofobi
Vad heter den djupaste platsen i världshaven?|Challengerdjupet
Vad heter den gnistrande lukten i åskväder?|Ozon
Vad är "tsundoku" på japanska?|Köpa böcker utan att läsa dem
Vad är "kummerspeck" på tyska?|Hullet man får av tröstätande
Vad är "drapetomani"?|Att vilja rymma hemifrån
Vad heter känslan av att gå in i ett rum och glömma varför?|Dörröppningseffekten
Vad kallas Liechtensteins nationalsång-melodi delvis lånad från?|God Save the King
Vad är "vinklubb"-ordet för att smaka vin utan att svälja?|Spotta
Vad är "ultracrepidarian"?|Någon som tycker till om allt utan kunskap
Vad betyder Volvo på latin?|Jag rullar
Vad kommer ordet "smörgås" från ursprungligen?|Smörklumpar som liknade gäss
Vad betyder det svenska ordet "tretår"?|Andra påtåren kaffe
Vad heter fobin för att ens knän ska kollapsa?|Genufobi`).filter(x=>!/rosa badmaskin|Kyrkröveri|Liechtenstein|vinklubb|fobin för att ens/.test(x[0])).map(([q,a])=>({q,a}));
export const WHO=`Vem skulle mest troligt missa flyget?|Vem skickar fyllesms oftast?|Vem blir först gripen?|Vem har googlat sig själv senast?|Vem har sämst kläder på fest?|Vem blir mest full på en kräftskiva?|Vem skulle överleva en zombieapokalyps längst?|Vem somnar först på efterfesten?|Vem skulle kunna starta en sekt?|Vem är bäst på att ljuga för chefen?|Vem har mest skärmtid?|Vem kommer aldrig i tid?|Vem glömmer alltid födelsedagar?|Vem är mest sannolikt med i dokusåpa om fem år?|Vem köper mest dumma saker på nätet?|Vem skulle bli rik först?|Vem har flest hemliga konton?|Vem dansar sämst?|Vem bryter ihop mest vid en brädspelsförlust?|Vem är mest benägen att ringa sitt ex?|Vem skulle bli bäst programledare?|Vem äter flest pizzor ensam?|Vem har mest kvar på sitt Klarna-konto?|Vem somnar oftast på bio?|Vem blir mest tagen av en bilreklam?|Vem kan absolut inte hålla en hemlighet?|Vem spenderar mest på Systemet?|Vem har snott en grej från ett hotell?|Vem skulle ta med katten på dejt?|Vem har sagt "jag älskar dig" av misstag?|Vem kommer sjunga på bröllopet utan att bli tillfrågad?|Vem hade klarat Robinson längst?|Vem skulle sälja sin bästa vän för en miljon?|Vem har dolda skulder till sina vänner?|Vem fuskar mest i spel?|Vem blir tjurigast utan mat?|Vem gråter under filmer?|Vem har svårast att säga förlåt?|Vem är mest rädd för spindlar?|Vem skriver längst sms?`.split('|');
export const LIKE=`Något man gör i smyg på jobbet|Ett typiskt svenskt sommarljud|Något du hittar i en svensk frys|En dålig ursäkt för att komma sent|Något som luktar gott|En sak du aldrig lånar ut|Något man säger på en dålig dejt|En maträtt man lagar när man är bakfull|Världens tråkigaste hobby|Ett bra namn på en katt|En svensk kändis alla känner till|Något som alltid är dyrt på flygplats|Det första man gör efter jobbet|Ett ställe du inte vill bli inlåst|En sak som finns i varenda garage|Något man ångrar dagen efter|Den värsta presenten att få|En film alla har sett|En klassisk svensk godisbit|Något som hör till en kräftskiva|Något man bara gör på semestern|En app alla har|Något folk ljuger om på dejtingappar|En stad man drar till på svensexa|En låt alla kan texten till|Något man köper på Ikea utan att behöva det|Ett svenskt bilmärke|Något som är overrated|Något man kan köpa på Systemet för en fest|Ett yrke du aldrig skulle kunna ha|En sak som finns i varje handväska|Det sista man gör innan man somnar|Något man gör första gången i ett hotellrum|Ett ställe man förlorar sin mobil|Ett ord man säger för mycket|En ursäkt för att lämna festen|En typisk grillrätt|Något du bara gör när du är ensam hemma|En kropp­sdel man ogärna visar|Ett gott pålägg`.split('|').map(s=>s.replace('­',''));
export const SPY=`Systembolaget,Ikea,Liseberg,Gekås Ullared,Arlanda,Gym,Tandläkaren,Bastu,Kyrkbröllop,Kräftskiva,Studentflak,Hockeyarena,Midsommarfest,Finlandsbåten,Dejt,Skidbacke,Fängelse,Sjukhus,Rymdstation,Kryssning,Bibliotek,Hemlig bar,Konferenshotell,Campingplats,Eurovision,Biograf,Julbord,Riksdagen,Tinder,Grillfest,Stripklubb,Polisstation`.split(',');
export const MIME=`baksmälla,sniffa ost,simma crawl,första dejten,raka benen,tinderswipe,köra Ikea-matlåda,flygvärdinna,svära på tyska,bli jagad av gäss,fiska kräftor,diska,dansa tango,sumobrottare,bröllopstal,bli dumpad via sms,bartender,skida utför,brandman,toalettbesök utan papper,klättra på klippa,ta en selfie,bli stungen av bi,ge en massage,personlig tränare,bjuda upp på krogen,hitta nycklarna,tvätta håret,elefant,tandläkare,spela luftgitarr,sprutlackera,rocka karaoke,hoppa bungyjump,ta på strumpbyxor,svensexa,möhippa,pensionsfest,yogalärare,midsommardans,bil som inte startar,läcka i taket,snubbla i en backe,äta spaghetti,flyga drake,räkna pengar,ta för mycket chili,bada isvak`.split(',');
export const SELFIE=`Se ut som du just blivit dumpad|Din bästa domarblick|Se ut som någon som precis hittat en tusenlapp|Din minst säljande dejtingprofilbild|Spela bakfull på en jobbintervju|Se ut som en valaffisch|Din bästa skådespelargråt|Se ut som du försöker dölja en fis|Du är Sveriges nya statsminister|Din blick när någon tar sista pizzabiten|Föreställ en tysk turist i Ullared|Din bästa modellpose|Se ut som om du fått fel paket|Din blick när någon sätter ananas på din pizza|Se romantiskt in i kameran|Din reaktion på ett sms från ditt ex|Spela arg italienare|Föreställ dig som 90-åring|Bästa dubbelhakan|Din blick när chefen säger "vi behöver prata"|Spela sjömannen som sett något|Du har precis vunnit Melodifestivalen|Den värsta passfotot någonsin|Se ut som om du spelar poker med rysk maffia|Du är influerare och säljer te`.split('|');
export const BOXES=[['Guldklocka',1800],['Tom låda',0],['Vinflaska från 1982',1300],['En gammal tv-fjärrkontroll',20],['Bitcoin-nyckel',2500],['Skrapelott',300],['Svärmors porslin',100],['Äkta Zorn-etsning',2200],['Kvitto från Ullared',10],['Diamantörhängen',2000],['Förbannad docka',-400],['Hyresskuld',-800],['Skattekrav',-1000],['Klassisk Volvo-nyckel',1500],['Sommarstugenyckel',2800],['Gymkort som går ut idag',50],['Oöppnad Nintendo från 1985',1700],['Burk surströmming',150],['Signerad Zlatan-tröja',900],['Ex:ets breven',-200],['Guldtacka',3000],['Kassettband med Gyllene Tider',250],['Tio liter glögg',120],['Parkeringsböter',-300]];
export const SCENES=[
 {t:'Katten på bordet',icons:['🐱','🍷'],a:'Glaset välter ner på mattan',w:['Katten dricker upp vinet','Glaset flyger iväg som en raket','Katten tar selfie'],kind:'push'},
 {t:'Domino i vardagsrummet',icons:['🧍','🚪'],a:'Sista brickan slår igen dörren',w:['Allt stannar halvvägs','Brickorna börjar dansa','Dörren öppnas av sig själv'],kind:'dom'},
 {t:'Grillen flammar upp',icons:['🔥','🍖'],a:'Köttet blir kolsvart',w:['Grannen applåderar','Köttet flyger till månen','Grillen slocknar'],kind:'fire'},
 {t:'Fiskaren drar i linan',icons:['🎣','🥾'],a:'Han drar upp en gammal stövel',w:['Han fångar en jättefisk','Han fångar en bil','Linan går av och han faller i'],kind:'fish'},
 {t:'Ballongen och kaktusen',icons:['🎈','🌵'],a:'Ballongen smäller',w:['Ballongen studsar upp','Kaktusen blommar','Ballongen sväljer kaktusen'],kind:'pop'},
 {t:'Älgen på vägen',icons:['🫎','🚗'],a:'Bilen tvärstannar och älgen går vidare',w:['Älgen sätter sig i baksätet','Bilen hoppar över älgen','Älgen blir omkörd'],kind:'moose'},
 {t:'Gubben och bananskalet',icons:['🧓','🍌'],a:'Han halkar',w:['Han äter skalet','Han kliver över','Han hittar en hund'],kind:'slip'},
 {t:'Toast i brödrost',icons:['🍞','🔥'],a:'Macka hoppar upp bränd',w:['Rosten exploderar','Mackan försvinner','Mackan blir en duva'],kind:'toast'},
];
export const MEL:any=[{n:'Grattis på födelsedagen',s:[[60,1],[60,1],[62,2],[60,2],[65,2],[64,4],[60,1],[60,1],[62,2],[60,2],[67,2],[65,4]]},{n:'Bä bä vita lamm',s:[[60,2],[60,2],[67,2],[67,2],[69,2],[69,2],[67,4],[65,2],[65,2],[64,2],[64,2],[62,2],[62,2],[60,4]]},{n:'Gubben Noak',s:[[60,2],[60,2],[60,2],[64,2],[62,2],[62,2],[62,2],[65,2],[64,2],[64,2],[62,2],[62,2],[60,4]]},{n:'Broder Jakob',s:[[60,2],[62,2],[64,2],[60,2],[60,2],[62,2],[64,2],[60,2],[64,2],[65,2],[67,4],[64,2],[65,2],[67,4]]}].slice(0);
