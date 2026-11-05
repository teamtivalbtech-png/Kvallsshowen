// Innehåll till Hellre än, Topplistan, Falska nyheten, Rösten bakom, En mening och Hur slutar det?
const lines=(s:string)=>s.trim().split('\n').map(x=>x.trim()).filter(Boolean);
export const RATHER=lines(`
Alltid vara 10 minuter sen|Alltid vara 30 minuter för tidig
Aldrig mer dricka kaffe|Aldrig mer dricka alkohol
Bara äta tacos resten av livet|Aldrig mer äta tacos
Läsa dina vänners chattar|Låta dem läsa dina
Sjunga allt du säger i en vecka|Bara viska i en månad
Bo utan internet i ett år|Bo utan varmvatten i ett år
Ha din pappa på din svensexa|Ha din mamma på din möhippa
Visa din skärmtid för alla|Visa din sökhistorik för en
Svara på alla mejl i 1 dag|Ha 100 000 olästa mejl för alltid
Vinna 1 miljon nu|Få 10 000 kronor i månaden i 15 år
Bo i Stockholm utan pengar|Bo på Gotland med massor av pengar
Aldrig mer åka på semester|Aldrig mer ha en helg
Ha ett jobb du älskar med dålig lön|Ha ett jobb du hatar med toppenlön
Tappa telefonen i toaletten|Tappa plånboken på krogen
Gå på dejt med din chef|Gå på dejt med din ex
Alltid ha en sten i skon|Alltid ha lite för kort täcke
Festa med Zlatan|Fika med drottning Silvia
Alltid säga sanningen|Alltid ljuga om småsaker
Bara få lyssna på Mello|Bara få lyssna på dansband
Ha en egen kock|Ha en egen städare
Glömma alla lösenord|Glömma alla födelsedagar
Sova i tält hela sommaren|Sova på soffan hos svärföräldrarna hela sommaren
Kunna flyga men bara en meter upp|Bli osynlig men bara när ingen tittar
Få veta när du dör|Få veta hur du dör
Aldrig mer se en film|Aldrig mer höra en låt
Ha ett husdjur som kan prata|Kunna prata alla språk
Vinna Melodifestivalen|Vinna Robinson
Bo granne med din mamma|Bo granne med din ex
Köra Volvo 240 resten av livet|Åka buss resten av livet
Dricka en shot surströmmingslag|Äta en sked kaffesump
Ligga på stranden i två veckor|Stå på skidor i två veckor
Betala alla räkningar i kontanter|Aldrig få se ditt saldo
Alltid vara lite hungrig|Alltid vara lite för mätt
Ha alltid dåligt hår|Ha alltid dålig andedräkt
Vara kändis i en dag|Vara rik i hemlighet
Aldrig mer åka Ikea|Aldrig mer åka Systembolaget
Bära kostym varje dag|Bära mjukisar till alla fester
Bli uppringd av din chef på semestern|Ringa din chef på fyllan
Gå på en konsert med Carola|Gå på en konsert med Rammstein
Bara äta kall mat|Bara dricka varm dryck
Bo i ett hus utan dörrar|Bo i ett hus utan fönster
Läsa upp din dagbok på ett bröllop|Hålla tal på din exs bröllop
Sluta svära för alltid|Sluta använda emojis för alltid
Vara bäst på något ingen bryr sig om|Vara medioker på något alla älskar
Fastna i hissen med din svärmor|Fastna i hissen med din ex
Ha en spegel som säger sanningen|Ha en våg som ljuger snällt
Slippa diska resten av livet|Slippa tvätta resten av livet
Bara få gå på krogen på måndagar|Aldrig få gå på krogen efter klockan 22
Bli känd som den fulla på julfesten|Bli känd som den som grät på julfesten
Vara 10 år yngre|Vara 10 miljoner rikare
`).map(l=>l.split('|'));
export const FEUD=lines(`
Vad gör en svensk först på semestern?|Går till Systembolaget:28|Packar upp:20|Lägger sig på stranden:18|Letar efter en pizzeria:14|Klagar på vädret:12|Ringer jobbet:8|X:Skriver en bok|X:Säljer bilen
Vad säger man till en kollega på måndag morgon?|Hur var helgen?:34|God morgon:22|Fan vad trött jag är:16|Finns det kaffe?:13|Har du sett mejlet?:9|Snart fredag:6|X:Grattis på namnsdagen|X:Får jag låna din bil?
Vad hittar man alltid i en svensk frys?|Köttbullar:26|Isglass:21|Fiskpinnar:18|Ärtor:15|Bär från i somras:12|Något ingen vet vad det är:8|X:Kaviar|X:Sill från 1998
Vad köper man på Ikea fast man inte behöver det?|Värmeljus:30|Påsar:22|Köttbullar:17|Kuddar:13|Krukor:10|Pennor:8|X:En cykel|X:Whisky
Vad gör man när man vaknar bakfull?|Dricker vatten:30|Kollar telefonen:24|Äter pizza:16|Ångrar sig:13|Somnar om:11|Skriver till kompisen:6|X:Går på gym|X:Städar garaget
Vilket är det vanligaste grälet hemma?|Disken:31|Vem som glömde handla:21|Vad ni ska äta:18|Tvätten:13|Telefonen vid middagsbordet:10|Pengarna:7|X:Solsystemet|X:Vem som äger stolen
Vad tar man med på en picknick?|Filt:29|Mackor:24|Vin:17|Kaffe:13|Jordgubbar:10|Myggmedel:7|X:Grill och soffa|X:Dammsugare
Vad gör svenskar på midsommar?|Äter sill:30|Dansar små grodorna:24|Dricker snaps:19|Hoppas på sol:13|Binder blomsterkrans:8|Ramlar i en buske:6|X:Åker skidor|X:Tänder ljus i Lucia-tåg
Vad är det pinsammaste på en fest?|Att somna:26|Att spy:23|Att skicka fel sms:18|Att ragga på fel person:15|Att sjunga för högt:11|Att glömma namn:7|X:Att ta av sig skorna|X:Att dricka vatten
Vad glömmer man när man packar?|Laddaren:33|Tandborsten:24|Solkräm:15|Kalsonger:13|Pass:9|Mediciner:6|X:Skrivbordet|X:Hunden
Vad säger man när man kommer för sent?|Det var köer:32|Bussen var sen:23|Barnen:16|Jag försov mig:13|Telefonen dog:10|Jag är här nu:6|X:Jag blev kidnappad|X:Min fisk dog
Vad gör man på Tinder-dejten?|Fikar:30|Tar en öl:27|Äter middag:17|Promenerar:12|Pratar om sitt ex:8|Tittar på klockan:6|X:Träffar föräldrarna|X:Skriver testamente
Vad finns i bilens handskfack?|Servetter:27|Gamla kvitton:24|Solglasögon:18|Ficklampa:12|Tuggummi:11|Bilens papper:8|X:En fisk|X:Handskar
Vad klagar svenskar mest på?|Vädret:40|SJ:20|Priserna:15|Grannen:11|Elräkningen:8|Bussen:6|X:Sveriges kungahus|X:Fågelsång
Vad gör man i soffan på fredag?|Äter tacos:34|Tittar på serie:26|Somnar:16|Äter chips:12|Scrollar på telefonen:8|Bråkar om vad ni ska se:4|X:Stryker skjortor|X:Gör bokslut
Vad tar slut först på festen?|Ölen:32|Chipsen:24|Isen:16|Glasen:12|Grannens tålamod:10|Toapappret:6|X:Soffan|X:Elektriciteten
Vad gör man i kön på Systembolaget?|Kollar telefonen:30|Räknar pengar:18|Ser vad andra köper:20|Ångrar sitt val:13|Letar legitimation:12|Hoppas att ingen ser en:7|X:Sjunger|X:Lägger pussel
Vad är svårast att göra på fyllan?|Gå rakt:29|Skriva sms:23|Låsa upp dörren:18|Vara tyst:14|Hitta hem:10|Äta snyggt:6|X:Andas|X:Stå still i kö
Vad vill man ha i julklapp men får aldrig?|Pengar:30|Resa:22|Ny telefon:18|Ledighet:14|Egen bil:10|Tystnad:6|X:Strumpor|X:En pyjamas till
Varför säger man nej till en inbjudan?|Jag är trött:32|Jag jobbar:20|Barnen:17|Jag är sjuk:13|Inga pengar:12|Jag orkar inte folk:6|X:Månen står fel|X:Jag ska kamma katten
Vad gör man när någon sjunger dåligt på karaoke?|Skrattar:30|Filmar:24|Sjunger med:18|Klappar ändå:14|Går till baren:9|Ställer sig på scenen:5|X:Ringer polisen|X:Betalar notan
Vad hittar man under soffan?|Damm:31|Mynt:21|Fjärrkontrollen:18|Chips:15|En strumpa:10|Laddare:5|X:En hel pizza|X:Bilnycklar från 1995
Vad är värst att glömma på ett bröllop?|Ringarna:36|Talet:22|Partnerns namn:16|Blommorna:10|Presenten:10|Fotografen:6|X:Parkeringsbiljetten|X:Sina solglasögon
Vad gör man i hissen?|Tittar på telefonen:32|Tittar i spegeln:24|Tittar på siffrorna:18|Låtsas inte om andra:13|Andas in:8|Trycker på knappen igen:5|X:Äter soppa|X:Dansar folkdans
Vad säger man när man inte hörde vad någon sa?|Va?:33|Förlåt?:24|Ja ja:17|Precis:12|Haha:9|Exakt:5|X:Grattis|X:Hejdå
Vad gör du först när du kommer hem från jobbet?|Tar av skorna:30|Lägger mig på soffan:24|Öppnar kylen:18|Byter om:13|Scrollar:10|Tar en öl:5|X:Skottar taket|X:Klipper gräset i mörkret
Vad köper man på bensinstationen?|Korv:30|Kaffe:24|Godis:18|Spolarvätska:12|Energidryck:10|Bensin:6|X:Julgran|X:Soffa
Vad tar längst tid på morgonen?|Att vakna:30|Duschen:22|Att välja kläder:18|Håret:14|Kaffet:10|Hitta nycklarna:6|X:Lunchen|X:Deklarationen
Vad gör man när Wi-Fi slutar funka?|Startar om routern:40|Svär:22|Ringer operatören:12|Kollar med grannen:10|Går ut och går:9|Läser en bok:7|X:Bygger en ny router|X:Flyttar
`).map(l=>{const[q,...r]=l.split('|');const board=r.filter(x=>!x.startsWith('X:')).map(x=>{const i=x.lastIndexOf(':');return{t:x.slice(0,i),p:+x.slice(i+1)}});const dec=r.filter(x=>x.startsWith('X:')).map(x=>x.slice(2));return{q,board:board.sort((a,b)=>b.p-a.p),dec}});
export const TRUE_NEWS=lines(`
Full älg fastnade i ett äppelträd på Särö|Hände i september 2011. Räddningstjänsten fick såga ner den.
Svensk man försökte bygga kärnreaktor i sitt kök|Ängelholm 2011. Han frågade själv myndigheten om det var lagligt.
Svensk man överlevde två månader i en snöad bil|Hittades norr om Umeå i februari 2012.
Svensk politiker ville ge kommunalanställda en betald timme för sex|Övertorneå 2017. Förslaget röstades ner.
Fildelning godkändes som religion i Sverige|Kopimistsamfundet registrerades som trossamfund 2012.
Göteborg söker någon som får lön livet ut utan arbetsuppgifter|Konstverket Eternal Employment vid Korsvägen.
Sverige gav vem som helst ett telefonnummer för att prata med en slumpad svensk|The Swedish Number, 2016.
Flygbolag förbjöd surströmming ombord|British Airways och Air France ville inte ha burkarna 2006.
Ikea drog in köttbullar på grund av hästkött|Skedde 2013 efter tester i Tjeckien.
Svensk kyrka flyttades fem kilometer på ett långtradarsläp|Kiruna kyrka, augusti 2025.
Svenska föräldrar försökte döpa sitt barn till Brfxxccxxmnpcccclllmmnprxvclmnckssqlbb11116|Protest mot namnlagen 1996. Det gick inte.
Sovjetisk ubåt strandade utanför Karlskrona|U 137, 1981.
Misstänkt rysk spionval dök upp utanför Bohuslän|Belugavalen Hvaldimir, 2023.
Svenskt företag opererar in chip i sina anställda|Epicenter i Stockholm. Frivilligt, med en dörrnyckel i handen.
Zlatan-staty i Malmö fick fötterna avsågade|Hände 2020 och statyn flyttades.
Vasaskeppet sjönk på sin första resa|1628, efter bara 1 300 meter.
Sverige bytte körfält en söndagsmorgon|Dagen H, 3 september 1967.
Gävlebocken har bränts ner fler än 30 gånger|Den har stått där sedan 1966.
Svenskar fick ha hela landets Twitterkonto en vecka var|Kontot @sweden, 2011–2018.
Sverige lade ut hela landet på Airbnb|Allemansrätten som reklam, 2017.
Japanskt tågbolag bad om ursäkt för att tåget gick 20 sekunder för tidigt|Tsukuba Express, 2017.
Australien förlorade ett krig mot emuer|Emukriget 1932.
Nya Zeeland betalade en officiell trollkarl|Christchurchs trollkarl fick lön i över 20 år.
Lönnsirap för miljoner stals från Kanadas nationella reserv|Quebec 2012.
Hund valdes till borgmästare i en amerikansk ort|Rabbit Hash, Kentucky.
Spanien byggde en ubåt som blev för tung|S-80 vägde över 70 ton för mycket, 2013.
Frankrike köpte tåg som var för breda för perrongerna|Avslöjades 2014.
Pepsi fick en hel sovjetisk flotta i betalning|1989, som betalning för läsk.
Vatikanen har bankomat på latin|Sant, den finns kvar.
Holländska kungen flög i hemlighet som styrman på KLM|Avslöjades 2017.
Zebror dirigerar trafiken i Bolivias huvudstad|Utklädda ungdomar i La Paz.
Man åt upp ett helt flygplan|Monsieur Mangetout, Michel Lotito.
I Schweiz är det förbjudet att ha bara ett marsvin|De är sociala djur, så djurskyddslagen kräver sällskap.
Nederländerna stänger fängelser för att det saknas fångar|Flera har gjorts om till bostäder.
En katt var hedersborgmästare i en stad i Alaska i nästan 20 år|Stubbs i Talkeetna.
Svenskt ishotell smälter bort varje vår|Icehotel i Jukkasjärvi.
Man sålde Eiffeltornet som skrot|Bedragaren Victor Lustig, 1925.
`).map(l=>{const[t,n]=l.split('|');return{t,n}});
export const FAKE_NEWS=lines(`
Systembolaget öppnar drive-in för snöskotrar i Luleå
Kommun i Småland inför parkeringsavgift för barnvagnar
SJ inför tyst vagn där det är förbjudet att andas högt
Älg utsedd till hedersmedborgare i Västerås
Ikea återkallar soffa för att den var för bekväm
Svensk kommun anställer officiell kramsamordnare
Ny lag: Tacos på fredag blir svenskt kulturarv
Halland byter namn till Hallon efter folkomröstning
Sverige ansöker om att bli en del av Norge på sommaren
Riksdagen röstar om nationell tupplur klockan 14
Svensk man vann lotteriet men tappade lotten i surströmmingsburk
Skatteverket börjar ta emot deklaration via emojis
Kaffe på recept i ny satsning i Region Skåne
Stockholm bygger en tunnelbana för hundar
Göteborg förbjuder paraplyer för att spara på vinden
Gotland blir egen nation under Almedalen
Svenska forskare lär kossor att öppna grindar med appar
Malmö inför bankomat som ger tips på pizzabeställning
Ny svensk valuta föreslås: Kanelbullen
Kvinna i Umeå har bott på ett Ikea-lager i tre år
Bilist fick böter för att ha kört för trevligt
Norrland får egen sommartid från och med nästa år
Danmark säljer Bornholm till Sverige för en krona
Polisen tar in fiskmåsar som vittnen i korvstöld
Svensk bonde har lärt sina höns att räkna till tio
Kungen bjuder in hela Sverige på middag i Globen
Finland kräver tillbaka bastun från Sverige
Tandläkare i Lund fakturerade en häst
Sverige byter nationaldag till tacofredag
Sommaren flyttas till mars i försök i Kiruna
`);
export const LINEBANK=lines(`
Kan du skicka smöret?
Jag har glömt min pinkod.
Bussen var försenad.
Det är din tur att diska.
Vi måste prata om katten.
Jag tar en kopp kaffe, tack.
Det här är min sista öl.
Har du hört det här förut?
Jag har aldrig varit i Eskilstuna.
Du har något mellan tänderna.
Var har du lagt fjärrkontrollen?
Jag vill byta tillbaka den här stolen.
Det regnar visst igen.
Får jag ett kvitto?
Vem har ätit min yoghurt?
Skorna ska stå på hyllan.
Jag älskar när det är rea.
Jag är inte arg, bara besviken.
Middagen står på bordet.
Någon har stulit min cykel.
Ska vi ta en fika?
Jag gillar din nya frisyr.
Kommer det här att stå på provet?
Det här kan du inte äta.
Tänk på att stänga dörren.
Vi ses på måndag.
Det var inte jag som åt tacon.
Ta av dig mössan inomhus.
Jag ska bara kolla en grej.
Hörs jag nu?
`);
export const MOODS=['Dramatisk filmtrailer','Gråter av lycka','Riktigt arg','Viskande och hemlig','Full på krogen','Operasångare','Skräckfilm','Nyhetsuppläsare','Djupt förälskad','Sportkommentator i mål','Snäll barnprogramsledare','Väldigt sömnig','Skånsk dialekt','Robot','Rik och dryg','Krigshjälte med sista orden','Livrädd','Politiker som undviker frågan','Reklamröst','Rappare','Tonåring som hatar allt','Ond skurk','Trött småbarnsförälder','Dansk'];
export const ONE=lines(`
Ett gäng går i månader för att slänga ett smycke i en vulkan.|Sagan om ringen
En kvinna ligger på en dörr i kallt vatten fast det borde funnits plats för två.|Titanic
En fiskpappa korsar havet för att hitta sin son.|Hitta Nemo
Ett barn lämnas hemma över jul och misshandlar två inbrottstjuvar.|Ensam hemma
En vaktmästare blir galen i snön och jagar familjen med yxa.|The Shining
Folk betalar dyrt för att titta på dinosaurier, och det går som man kan tro.|Jurassic Park
En kemilärare får cancer och börjar tillverka droger.|Breaking Bad
Sex vänner sitter på samma café i tio år.|Vänner
En ensam ogre vill bara vara ifred i sitt träsk.|Shrek
En lejonprins skyller på sig själv, flyr, äter insekter och kommer tillbaka.|Lejonkungen
En snäll man råkar vara med om allt viktigt i USA:s historia.|Forrest Gump
En man åker charter till Gran Canaria för att komma över sin flygrädsla.|Sällskapsresan
En man kommer ut ur fängelset och har genast en plan.|Jönssonligan
Två tjejer i en liten svensk stad blir kära, trots allt.|Fucking Åmål
Poliser i en liten ort hittar på brott för att stationen inte ska stängas.|Kopps
Ett par flyttar till Saltsjöbaden och hamnar bland grannar med stora bilar.|Solsidan
En ekonomistudent hamnar i Stockholms undre värld för pengarnas skull.|Snabba cash
Två bröder hamnar efter döden i ett land med draken Katla.|Bröderna Lejonhjärta
En flicka växer upp bland rövare och blir vän med sonen i rivalgänget.|Ronja Rövardotter
En busig pojke i Småland hamnar ständigt i snickerboden.|Emil i Lönneberga
En man med propeller på ryggen bor på ett tak.|Karlsson på taket
En pappersförsäljare tror att han är världens bästa chef.|The Office
En man lever samma dag om och om igen.|Måndag hela veckan
Ungdomar på 80-talet möter ett monster från en parallell värld.|Stranger Things
Familjer slåss om en stol av svärd, och nästan alla dör.|Game of Thrones
En syster råkar frysa ett helt land och sjunger om det.|Frost
En docka får existentiell kris och åker till verkligheten.|Barbie
En miljardär klär ut sig till fladdermus och slåss.|Batman
En rik familj bråkar om vem som ska ta över mediebolaget.|Succession
Ett gäng i Birmingham döljer rakblad i kepsarna.|Peaky Blinders
Hajar äter folk vid stranden, men borgmästaren vägrar stänga.|Hajen
Fattiga människor spelar barnlekar om livet för pengar.|Squid Game
En hackare får välja mellan ett rött och ett blått piller.|The Matrix
En tonåring reser bakåt i tiden och hans mamma blir kär i honom.|Tillbaka till framtiden
En pojke får veta att han är trollkarl på sin elvaårsdag.|Harry Potter
En leksakscowboy blir avundsjuk på en ny rymdfigur.|Toy Story
En råtta lagar mat på en restaurang i Paris.|Råttatouille
En astronaut strandar på Mars och odlar potatis.|The Martian
En man blir strandsatt på en ö och blir bästis med en volleyboll.|Cast Away
En polis går barfota genom en skyskrapa på julafton.|Die Hard
Några turister åker på midsommarfirande i Hälsingland, och det slutar illa.|Midsommar
En fattig familj lurar sig in som anställda hos en rik familj.|Parasit
Rika turister på lyxhotell på Hawaii, och någon lämnar i en kista.|The White Lotus
En stjärnkock tar över sin brors smörgåsställe i Chicago.|The Bear
En polis i Stockholm löser mord, i över 25 år.|Beck
Bönder letar kärleken inför hela Sverige.|Bonde söker fru
Sverige samlas framför tv:n för att bråka om musik på lördagar.|Melodifestivalen
Två lag gissar vart ett tåg är på väg.|På spåret
Snygga singlar bor på lyxhotell och sviker varandra.|Paradise Hotel
Folk på en öde ö röstar ut varandra.|Robinson
Kända personer dansar, oftast ganska dåligt.|Let's Dance
En spion med ett nummer dricker Martini.|James Bond
Tolv män i en jury ska bli överens.|12 edsvurna män
Vänner åker till Las Vegas och minns inte vad som hände.|Baksmällan
`).map(l=>{const[q,a]=l.split('|');return{q,a}});
export const ENDS=lines(`
Titanic|Jack dör i vattnet och Rose överlever|Båda räddas av en livbåt|Rose dör och Jack överlever|Fartyget når New York
Sjätte sinnet|Psykologen har varit död hela tiden|Pojken var påhittad|Psykologen är mördaren|Pojken var spöket
Fight Club|Berättaren och Tyler är samma person|Tyler blir president|Berättaren blir polis|Marla är Tyler
Rymdimperiet slår tillbaka|Darth Vader säger att han är Lukes pappa|Luke dödar Vader|Leia blir kejsare|Han Solo går över till Imperiet
Seven|Lådan innehåller huvudet på polisens fru|Mördaren flyr till Kanada|Polisen blir själv mördaren|Lådan är tom
Shrek|Fiona förblir troll och gifter sig med Shrek|Shrek blir människa|Fiona gifter sig med Lord Farquaad|Åsnan blir kung
Thelma och Louise|De kör över kanten i Grand Canyon|De flyr till Mexiko|De grips av polisen|De öppnar en bar
De misstänkta|Den oansenliga Verbal är Keyser Söze|Polisen är Keyser Söze|Keyser Söze är död|Allt var en dröm
Sagan om konungens återkomst|Gollum faller med ringen ner i vulkanen|Frodo blir kung|Sauron tar ringen|Ringen slängs i havet
Breaking Bad|Walt dör i ett labb efter att ha räddat Jesse|Walt flyr till Alaska|Jesse dödar Walt|Walt överlever och blir frisk
Game of Thrones|Bran blir kung|Jon blir kung|Daenerys blir drottning|Tyrion blir kung
Vänner|Rachel går av planet och blir ihop med Ross|Ross gifter sig med Emily|Rachel flyttar till Paris|Joey gifter sig med Rachel
The Sopranos|Bilden blir plötsligt svart|Tony skjuts på öppen scen|Tony vittnar mot maffian|Tony flyttar till Florida
Inception|Snurran snurrar när filmen klipper|Cobb vaknar i en cell|Allt var hustruns dröm|Barnen försvinner
Apornas planet|Han hittar Frihetsgudinnan och förstår att det är jorden|Han flyger hem|Aporna blir hans vänner|Han gifter sig med en apa
Terminator 2|Terminatorn sänks ner i smält stål|John blir robot|Sarah dör|T-1000 vinner
Lejonkungen|Simba besegrar Scar och blir kung|Scar blir kung|Mufasa kommer tillbaka|Simba stannar i djungeln
Tillbaka till framtiden|Marty kommer hem till en bättre familj|Marty stannar i 50-talet|Doc dör|Marty försvinner
Avengers: Endgame|Tony Stark knäpper med fingrarna och dör|Thor dödar alla|Thanos vinner|Hulken blir president
Squid Game|Gi-hun vinner men vänder om vid flygplatsen|Sae-byeok vinner|Alla överlever|Vakterna vinner
Hajen|Polischefen spränger hajen med en gastub|Hajen simmar iväg|Hajen äter polischefen|De fångar den levande
Rocky|Rocky går alla ronder men förlorar på poäng|Rocky vinner på knockout|Rocky ger upp|Apollo går inte upp
Bröderna Lejonhjärta|Bröderna hoppar ner i ravinen till Nangilima|De åker hem|Draken vinner|Tengil blir vän med dem
Ronja Rövardotter|De två rövarbanden går ihop|Birk dör|Ronja blir polis|Mattis flyttar
Ensam hemma|Mamman kommer hem på julmorgonen|Pojken åker till Paris|Tjuvarna vinner|Grannen adopterar honom
Frost|Annas kärlek till sin syster tinar isen|Hans blir kung|Elsa flyttar för alltid|Olaf smälter
Gladiator|Maximus dödar kejsaren och dör själv|Han blir kejsare|Han flyr till Spanien|Han förlorar och blir slav
Braveheart|Wallace avrättas och ropar Frihet|Han blir kung|Han flyr till Irland|Han får fred
Casablanca|Rick låter Ilsa flyga iväg med sin man|Rick åker med Ilsa|Ilsa stannar|Rick grips
Hunger Games|Katniss och Peeta hotar äta bären och båda vinner|Peeta dör|Rue vinner|Katniss dör
Get Out|Chris flyr och vännen hämtar honom|Chris blir hypnotiserad för alltid|Familjen vinner|Chris gifter sig
Gone Girl|Amy kommer hem och Nick stannar med henne|Nick döms till döden|Amy blir mördad|Nick flyr
Forrest Gump|Forrest sätter sin son på skolbussen|Forrest blir president|Forrest springer för evigt|Jenny blir frisk
`).map(l=>{const[t,a,...w]=l.split('|');return{t,a,w}});
