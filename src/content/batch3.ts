// Andra fördubblingen.
const L=(s:string)=>s.trim().split('\n').map(x=>x.split('|'));
export const TF3=L(`Sverige har fler öar än något annat land|1
Danmark har en kung|1
Mount Everest ligger i Afrika|0
Det finns inga vilda ormar på Irland|1
Kanada är större än USA till ytan|1
Katter har fler ben i kroppen än människor|1
Giraffer har sju halskotor|1
Hajar har ett skelett av brosk|1
Harry Potter-böckerna är skrivna av en amerikan|0
Spanien vann fotbolls-VM 2026|1
Kalle Anka har sänts på julafton i svensk tv sedan 1960|1
Sverige körde på vänster sida av vägen fram till 1967|1
Ikea grundades i Småland|1
Zlatan Ibrahimović är född i Göteborg|0
Spotify är ett norskt företag|0
Bananer växer på träd|0
En oktopus har tre hjärtan|1
Schweiz är medlem i EU|0
Norge är medlem i EU|0
Island är medlem i EU|0
Polen gränsar till Tyskland|1
Finland gick med i Nato före Sverige|1
Öland är större än Gotland|0
Kiruna ligger norr om polcirkeln|1
Alfred Nobel uppfann dynamiten|1
Nobels fredspris delas ut i Oslo|1
Greta Thunberg är från Norge|0
ABBA vann Eurovision 1974|1
Loreen har vunnit Eurovision två gånger|1
Måns Zelmerlöw vann Eurovision 2015|1
Swedish House Mafia består av fyra personer|0
Pac-Man kommer från Japan|1
Tetris skapades i Sovjetunionen|1
Angry Birds kommer från Finland|1
Battlefield utvecklas av en svensk studio|1
Pokémon kommer från USA|0
Hajar är däggdjur|0
Valar är däggdjur|1
Fladdermöss är blinda|0
Strutsar gömmer huvudet i sanden när de blir rädda|0
Katter kan inte känna sötma|1
Människan har 206 ben i kroppen som vuxen|1
En blixt är varmare än solens yta|1
Venus är varmare än Merkurius|1
En dag på Venus är längre än ett år på Venus|1
Solen är en stjärna|1
Ljudet färdas snabbare än ljuset|0
Vatten kokar vid lägre temperatur högt upp på berg|1
Pluto räknas som en planet idag|0
Vikingarna hade horn på hjälmarna i strid|0
Einstein fick Nobelpriset för relativitetsteorin|0
Sverige var neutralt under andra världskriget|1
Tyskland vann fotbolls-VM 2014|1
Frankrike vann fotbolls-VM 2018|1
Argentina vann fotbolls-VM 2022|1
Sverige tog brons i fotbolls-VM 1994|1
Peter Forsberg har spelat i NHL|1
Björn Borg vann Wimbledon fem år i rad|1
Tomater är botaniskt sett bär|1
Tungan har särskilda zoner för olika smaker|0
Man använder bara tio procent av hjärnan|0
Kor har fyra magavdelningar|1`).map(([q,a])=>({q,a:a==='1'}));
export const TL3=L(`Apple grundas|1976
Microsoft grundas|1975
Ikea grundas|1943
H&M grundas|1947
Amazon grundas|1994
Lego grundas|1932
Wikipedia startar|2001
Twitter lanseras|2006
WhatsApp lanseras|2009
Tinder lanseras|2012
Uber grundas|2009
Windows 95 släpps|1995
Nintendo 64 släpps|1996
Game Boy släpps|1989
Xbox släpps|2001
Wii släpps|2006
Nintendo Switch släpps|2017
Fortnite släpps|2017
GTA V släpps|2013
Första Harry Potter-boken ges ut|1997
Filmen Titanic har premiär|1997
Filmen Avatar har premiär|2009
Toy Story har premiär|1995
Första Star Wars-filmen har premiär|1977
Lejonkungen har premiär|1994
The Avengers har premiär|2012
Shrek har premiär|2001
Hajen har premiär|1975
Tillbaka till framtiden har premiär|1985
E.T. har premiär|1982
Första månlandningen|1969
Kennedy mördas|1963
Eurosedlarna införs|2002
Öresundsbron öppnar|2000
Tsunamin i Indiska oceanen|2004
Barack Obama blir president|2009
Högertrafik införs i Sverige|1967
Loreen vinner Eurovision med Euphoria|2012
Levels av Avicii släpps|2011
Sverige går med i Nato|2024
Finland går med i Nato|2023
Rysslands fullskaliga invasion av Ukraina|2022
Drottning Elizabeth II dör|2022
Prinsessan Diana dör|1997
Michael Jackson dör|2009
Elvis Presley dör|1977
John Lennon mördas|1980
Woodstock-festivalen|1969
Franska revolutionen bryter ut|1789
USA:s självständighetsförklaring|1776
Columbus når Amerika|1492
Stockholms blodbad|1520
Första Nobelprisen delas ut|1901
Första Vasaloppet|1922
Första moderna olympiska spelen|1896
Greta Thunberg börjar skolstrejka|2018
ChatGPT lanseras|2022`).map(([t,y],i)=>({id:i+300,t,y:+y}));
export const CL3=L(`Hur många dagar har ett skottår?|366|dagar
Hur många nordiska länder finns det?|5|länder
Hur många spelare har ett basketlag på planen?|5|spelare
Hur många grader är en rät vinkel?|90|grader
Hur många kategorier har Nobelpriset?|6|kategorier
Hur många minuter varar en fotbollsmatch?|90|minuter
Hur många länder är med i EU?|27|länder
Hur många delstater har USA?|50|delstater
Hur högt är Eiffeltornet?|330|meter
Hur högt är Mount Everest?|8849|meter
Hur lång är en maraton i meter?|42195|meter
Hur lång är Vasaloppet?|90|km
Hur många rutor har ett schackbräde?|64|rutor
Hur många kilometer per sekund färdas ljuset ungefär?|300000|km/s
Hur många minuter har ett dygn?|1440|minuter
Hur många sekunder har en timme?|3600|sekunder
Hur många timmar har en vecka?|168|timmar
Hur många medlemmar har BTS?|7|medlemmar
Hur många lag spelar i NHL?|32|lag
Hur många ledamöter har riksdagen?|349|ledamöter
Hur många ringar har OS-symbolen?|5|ringar
Hur många tänder har en vuxen med visdomständer?|32|tänder
Hur djup är Marianergraven ungefär?|11000|meter
Hur hög är Burj Khalifa?|828|meter
Hur hög är Turning Torso?|190|meter
Hur hög är Frihetsgudinnan inklusive sockel?|93|meter
Hur långt är det till månen i genomsnitt?|384400|km
Vilket år blev Carl XVI Gustaf kung?|1973|
Vilket år föddes Zlatan Ibrahimović?|1981|
Vilket år föddes Avicii?|1989|
Vilket år bildades ABBA?|1972|
Hur många gånger har Sverige vunnit Eurovision?|7|gånger
Hur många VM-guld har Brasiliens herrar i fotboll?|5|guld
Hur många Oscars vann filmen Titanic?|11|Oscars
Hur lång är Göta kanal?|190|km
Hur många kommuner har Sverige?|290|kommuner
Hur många länder finns i FN?|193|länder
Hur många gånger har Tyskland vunnit herr-VM i fotboll?|4|gånger`).map(([q,a,u])=>({q,a:+a,u}));
export const FIB3=L(`Vad heter huvudstaden i Eswatini?|Mbabane
Vad heter huvudstaden i Moçambique?|Maputo
Vad heter plastbiten i änden på ett skosnöre?|Aglett
Vad kallas gropen ovanför överläppen?|Philtrum
Vad kallas rädslan för talet 13?|Triskaidekafobi
Vad kallas rädslan för att jordnötssmör fastnar i gommen?|Arachibutyrofobi
Vad heter doften av regn på torr mark?|Petrikor
Vad heter ljudet när magen kurrar?|Borborygmi
Vad heter området mellan ögonbrynen?|Glabella
Vad heter metallburen över en champagnekork?|Muselet
Vad kallas en samlare av ölunderlägg?|Tegestolog
Vad kallas en samlare av vykort?|Deltiolog
Vad kallas en flock kråkor på engelska?|A murder
Vad kallas en flock ugglor på engelska?|A parliament
Vad kallas en flock flamingor på engelska?|A flamboyance
Vad hette Google först?|BackRub
Vad hette Pepsi först?|Brad's Drink
Vad hette Super Mario i första spelet?|Jumpman
Vad hette Amazon först?|Cadabra
Vad hette H&M först?|Hennes
Vad heter huvudstaden i Burkina Faso?|Ouagadougou
Vad heter huvudstaden i Bhutan?|Thimphu
Vad heter huvudstaden i Palau?|Ngerulmud
Vad heter Lady Gaga på riktigt?|Stefani Germanotta
Vad heter Bruno Mars på riktigt?|Peter Hernandez
Vad heter Sting på riktigt?|Gordon Sumner
Vad heter Bono på riktigt?|Paul Hewson
Vad hette Elton John när han föddes?|Reginald Dwight
Vad heter Vin Diesel på riktigt?|Mark Sinclair
Vad heter Drake på riktigt?|Aubrey Graham
Vad heter Snoop Dogg på riktigt?|Calvin Broadus
Vad heter Hulk Hogan på riktigt?|Terry Bollea
Vad heter tecknet # på fackspråk?|Oktotorp
Vad kallas rädslan för att knappar ska röra vid en?|Koumpounofobi
Vad heter huvudstaden i Kiribati?|Tarawa
Vad heter huvudstaden i Burundi?|Gitega
Vad heter huvudstaden i Sri Lanka officiellt?|Sri Jayawardenepura Kotte`).map(([q,a])=>({q,a}));
export const PR3=L(`🥤|Burk Coca-Cola i kiosk|25
🍫|Marabou mjölkchoklad 200 g|42
🍬|Hekto lösgodis|17
🥛|En liter mellanmjölk|16
☕|500 g bryggkaffe|85
🧀|Ett kilo Herrgårdsost|130
🥔|Ett kilo potatis|14
🍝|500 g spaghetti|19
🌭|Korv med bröd på stan|35
🥙|Kebabtallrik|129
🍟|Hamburgermeny på Max|119
📺|Netflix standard per månad|149
🎵|Spotify Premium per månad|129
🏋️|Gymkort per månad|399
🎢|Åkband på Gröna Lund|419
🎫|Festivalbiljett för hela festivalen|2500
🚕|Fast taxipris Arlanda–Stockholm city|650
🚌|Enkelbiljett SL|43
⛽|En liter bensin|15
🧥|Canada Goose-jacka|10000
👟|Nike Air Force 1|1300
👕|Enkel t-shirt på H&M|99
🍳|Frukostbuffé på hotell|195
🦷|Vanlig tandläkarundersökning|1000
🚙|Körkort allt inräknat|25000
🏖️|Charterresa till Thailand för två|30000
💻|Ny MacBook Air|13990
🧦|Par Happy Socks|109
🍺|Sexpack folköl|70
🥂|Flaska Prosecco på Systemet|99`).map(([e,n,p])=>({e,n,p:+p}));
export const HARD3=`Vilket grundämne har beteckningen W?|Volfram|Vanadin|Xenon|Titan
Vilken svensk kemist upptäckte syret oberoende av andra?|Carl Wilhelm Scheele|Anders Celsius|Jöns Jacob Berzelius|Alfred Nobel
Vem skrev Doktor Glas?|Hjalmar Söderberg|August Strindberg|Pär Lagerkvist|Vilhelm Moberg
Vilket år dog Karl XII?|1718|1709|1721|1697
I vilken fred förlorade Sverige Finland 1809?|Freden i Fredrikshamn|Freden i Roskilde|Freden i Nystad|Freden i Kiel
Vilket är Afrikas folkrikaste land?|Nigeria|Etiopien|Egypten|Kongo-Kinshasa
Vad heter Mongoliets huvudstad?|Ulan Bator|Astana|Bisjkek|Tasjkent
Vilken planet har månen Triton?|Neptunus|Uranus|Saturnus|Jupiter
Vem målade Midvinterblot?|Carl Larsson|Anders Zorn|Bruno Liljefors|Ernst Josephson
Vilken svensk blev 1909 första kvinna att få Nobelpriset i litteratur?|Selma Lagerlöf|Nelly Sachs|Karin Boye|Moa Martinson
Vad är kvadratroten ur 1764?|42|38|44|46
Vilket år fick svenska kvinnor för första gången rösta i ett riksdagsval?|1921|1919|1909|1931`;
export const NOS3=`Vilken färg har Bolibompa-draken?|Grön|Röd|Blå|Gul
Vad heter Pingus lillasyster?|Pinga|Robby|Punki|Pino
Vilket land kommer Lazy Town från?|Island|Norge|Danmark|Finland
Vad heter hjälten i Lazy Town?|Sportacus|Robbie|Pixel|Stingy
Vad heter näbbdjuret i Phineas och Ferb?|Perry|Pelle|Pablo|Pontus
Vad heter Phineas och Ferbs storasyster?|Candace|Stacy|Vanessa|Isabella
Vad heter den galne doktorn i Phineas och Ferb?|Doofenshmirtz|Evil|Drakken|Krang
Vad heter Svampbobs snigel?|Gary|Larry|Sandy|Bert
Vad heter Svampbobs chef?|Mr. Krabs|Squidward|Plankton|Patrick
Vad heter staden Svampbob bor i?|Bikini Bottom|Coral City|Atlantica|Springfield
Vilken Pokémon pratar i Team Rocket?|Meowth|Pikachu|Wobbuffet|Koffing
Vilken av dessa är INTE en startpokémon i Pokémon Röd och Blå?|Pidgey|Bulbasaur|Charmander|Squirtle
Vilket kort är Seto Kaibas signatur i Yu-Gi-Oh?|Blue-Eyes White Dragon|Dark Magician|Exodia|Red-Eyes Black Dragon
Vilket land kommer Tamagotchi från?|Japan|USA|Kina|Sydkorea
Vad kallades de runda samlarbrickorna på skolgården på 90-talet?|Pogs|Chips|Tazos|Bakugan
Vad heter hundspelet på Nintendo DS?|Nintendogs|Dogz|Puppy Pals|Petz World
Vad heter figurerna man skapar på Wii?|Mii|Wiimote|Yoshi|Sim
Vad heter språket i The Sims?|Simlish|Sim-speak|Sims Lingo|Plumbob
Vilket fuskord gav pengar i första The Sims?|Rosebud|Motherlode|Hesoyam|Iddqd
Vad kallas huvudpersonen i GTA San Andreas?|CJ|Niko|Tommy|Franklin
Vilket land kommer MovieStarPlanet från?|Danmark|Sverige|Norge|Finland
Vilket land kommer Stardoll från?|Sverige|USA|Danmark|Tyskland
Vad hette sajten där svenska tonåringar la upp dagens bild?|Bilddagboken|Flickr|Lunarstorm|Myspace
Vad kallades funktionen som skakade MSN-fönstret?|Knuff|Puff|Skak|Väck
Vad var Anna i Basshunters Boten Anna?|En bot i en chatt|En båt|En flickvän|En hund
Vad hette den irriterande ringsignalgrodan?|Crazy Frog|Mad Toad|Funky Frog|Ringa Linga
Vad hette tjänsten som sålde ringsignaler i tv-reklam?|Jamba|Ringo|Tonez|Mobilizer
Vilket land kommer Cascada från?|Tyskland|Sverige|Nederländerna|Belgien
Vad heter Demi Lovatos rollfigur i Camp Rock?|Mitchie|Tess|Caitlyn|Peggy
Vilken skola går man på i Zoey 101?|Pacific Coast Academy|Bayside High|East High|Ridgemont
Vad heter lillasystern i Drake & Josh?|Megan|Mindy|Carly|Sam
Vad heter klockan i Ben 10?|Omnitrix|Chronotron|Alien Band|Ultramatrix
Vad heter huvudpersonen i Winx Club?|Bloom|Stella|Flora|Musa
Vad heter Rons nakenråtta i Kim Possible?|Rufus|Rex|Rocky|Remy
Vilken Teletubbie är lila?|Tinky Winky|Dipsy|Laa-Laa|Po
Vad heter Bamses sköldpaddskompis?|Skalman|Lille Skutt|Vargen|Krösus Sork
Vad heter Bamses honung?|Dunderhonung|Styrkehonung|Kraftsirap|Bamsebär
Vad heter Bamses fru?|Brummelisa|Teddy|Nalle-Maja|Lisa
Vilken julkalender från 1996 handlar om spöken på ett slott?|Mysteriet på Greveholm|Superhjältejul|Håkan Bråkan & Josef|Hotell Gyllene Knorren
I vilken stad bor LasseMaja?|Valleby|Vänersborg|Lönneberga|Bullerbyn
Vem tog över Allsång på Skansen efter Lasse Berghagen?|Anders Lundin|Måns Zelmerlöw|Sanna Nielsen|Petra Marklund
Vem kallades Loket i Bingolotto?|Leif Olsson|Lennart Swahn|Lasse Holm|Pekka Heino
Vilken Idol-vinnare sjöng Release Me?|Agnes|Marie Picasso|Erik Grönwall|Amanda Fondell
I vilken grupp slog Danny Saucedo igenom?|E.M.D.|Friends|Vacation|Play
Med vilken låt vann Eric Saade Melodifestivalen 2011?|Popular|Masquerade|Manboy|Sting
Vem sjöng Busy Doin' Nothing i Melodifestivalen 2014?|Ace Wilder|Molly Sandén|Sanna Nielsen|Eric Saade
Vad heter ormspelet på gamla Nokia?|Snake|Pac-Man|Worm|Tetris
Vilket företag gjorde Walkman-mobilerna?|Sony Ericsson|Nokia|Motorola|Samsung
Vilket mobilmärke gjorde Razr?|Motorola|Nokia|Sony Ericsson|Siemens
Vad hette gemet som hjälpte till i Word?|Clippy|Paperclip|Wordy|Bonzi
Vad hette flipperspelet på Windows XP?|Space Cadet|Pinball Wizard|Ball Blazer|Galaxy Pinball
Vad heter bakgrundsbilden med grön kulle på Windows XP?|Bliss|Serenity|Hill|Autumn
Vad heter Harry Potters uggla på svenska?|Hedvig|Errol|Crookshanks|Pigwidgeon
Vad heter Bert-böckernas Bert i efternamn?|Ljung|Svensson|Andersson|Holm
Vad heter Berts bästa kompis i böckerna?|Åke|Lill-Erik|Klimpen|Torleif
Vilken smak har Piggelin?|Päron|Äpple|Lime|Melon
Vilket spel till PS2 spelade man med mikrofon?|SingStar|Buzz!|EyeToy|Guitar Hero
Vilket PS2-spel var ett frågesportspel med knappar?|Buzz!|SingStar|EyeToy|Just Dance
Vad hette kameran man rörde sig framför på PS2?|EyeToy|Kinect|PlayStation Eye|Wii Remote
Vilken färg har draken Spyro?|Lila|Grön|Röd|Blå
Vad är Crash Bandicoot för djur?|Pungdjur|Räv|Igelkott|Tvättbjörn
Vad stod man på i Dance Dance Revolution?|Dansmatta|Balansbräda|Skateboard|Studsmatta`;
export const QUIZ3:any[]=[...`Vem regisserade Titanic?|James Cameron|Steven Spielberg|Ridley Scott|Peter Jackson
Vem regisserade Hajen?|Steven Spielberg|George Lucas|James Cameron|Martin Scorsese
Vem spelade Jack i Titanic?|Leonardo DiCaprio|Brad Pitt|Matt Damon|Johnny Depp
Vem spelade Iron Man i Marvel-filmerna?|Robert Downey Jr.|Chris Evans|Chris Hemsworth|Mark Ruffalo
Vem spelade Jokern i The Dark Knight?|Heath Ledger|Joaquin Phoenix|Jared Leto|Jack Nicholson
Vem spelade Neo i The Matrix?|Keanu Reeves|Tom Cruise|Will Smith|Brad Pitt
Vem bär ringen till Domedagsberget i Sagan om ringen?|Frodo|Aragorn|Legolas|Gandalf
Vilket elevhem tillhör Harry Potter?|Gryffindor|Slytherin|Hufflepuff|Ravenclaw
Vad heter lejonungen i Lejonkungen?|Simba|Nala|Mufasa|Scar
Vad heter snögubben i Frost?|Olof|Sven|Kristoff|Hans
Vad heter renen i Frost?|Sven|Olof|Rudolf|Hans
Vad heter cowboyen i Toy Story?|Woody|Buzz|Andy|Rex
Vilken serie utspelar sig i staden Hawkins?|Stranger Things|Dark|Riverdale|Wednesday
Vad heter kaffehuset i Vänner?|Central Perk|Starbucks|MacLaren's|Monk's
I vilken stad utspelar sig Breaking Bad?|Albuquerque|Las Vegas|Phoenix|El Paso
Vad kallar sig Walter White som knarkkung?|Heisenberg|Gus|Saul|Tuco
Vilket land kommer Squid Game från?|Sydkorea|Japan|Kina|Thailand
Vilket land kommer serien Dark från?|Tyskland|Danmark|Norge|Österrike
Vad heter pappersföretaget i The Office?|Dunder Mifflin|Sabre|Wernham Hogg|Initech
Vad heter Homer Simpsons fru?|Marge|Lisa|Patty|Selma
I vilken serie finns Sheldon Cooper?|The Big Bang Theory|Vänner|How I Met Your Mother|Scrubs
Vilken svensk spelade Ivan Drago i Rocky IV?|Dolph Lundgren|Stellan Skarsgård|Mikael Persbrandt|Peter Stormare
Vem spelade Lisbeth Salander i de svenska filmerna?|Noomi Rapace|Alicia Vikander|Rebecca Ferguson|Malin Åkerman
Vilken svenska fick en Oscar för The Danish Girl?|Alicia Vikander|Noomi Rapace|Rebecca Ferguson|Ingrid Bergman
Vem skrev Millennium-böckerna?|Stieg Larsson|Henning Mankell|Jens Lapidus|Camilla Läckberg
Vem skrev Sagan om ringen?|J.R.R. Tolkien|C.S. Lewis|George R.R. Martin|J.K. Rowling
Vem skrev Hungerspelen?|Suzanne Collins|Stephenie Meyer|Veronica Roth|J.K. Rowling`.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{cat:"Film & TV",q,a,w}}),...`Vilket land kommer BTS från?|Sydkorea|Japan|Kina|Thailand
I vilket band sjöng Freddie Mercury?|Queen|The Who|Led Zeppelin|Aerosmith
I vilket band sjöng Kurt Cobain?|Nirvana|Pearl Jam|Soundgarden|Foo Fighters
Vilket band gjorde Wonderwall?|Oasis|Blur|Coldplay|Radiohead
I vilket band sjöng Chester Bennington?|Linkin Park|Limp Bizkit|Papa Roach|Green Day
Vem kallas Queen of Pop?|Madonna|Beyoncé|Britney Spears|Lady Gaga
Vem kallas King of Pop?|Michael Jackson|Elvis Presley|Prince|Justin Timberlake
Vilket Michael Jackson-album är världens mest sålda?|Thriller|Bad|Dangerous|Off the Wall
Vem sjöng Bad Guy?|Billie Eilish|Dua Lipa|Lorde|Olivia Rodrigo
Vem sjöng Blinding Lights?|The Weeknd|Drake|Bruno Mars|Post Malone
Vem sjöng Umbrella?|Rihanna|Beyoncé|Ciara|Nelly Furtado
Vem sjöng Never Gonna Give You Up?|Rick Astley|George Michael|Phil Collins|Bryan Adams
Vilken svensk grupp gjorde The Sign?|Ace of Base|Roxette|Rednex|Army of Lovers
Vilken svensk grupp gjorde The Final Countdown?|Europe|Roxette|The Hives|Ghost
Vilken svensk grupp gjorde It Must Have Been Love?|Roxette|Ace of Base|Europe|Cardigans
Vilken svensk grupp gjorde Hate to Say I Told You So?|The Hives|Mando Diao|Kent|The Sounds
Vem sjöng Sommaren är kort?|Tomas Ledin|Per Gessle|Lasse Berghagen|Björn Skifs
Vem sjöng Vara vänner?|Jakob Hellman|Håkan Hellström|Ulf Lundell|Thomas Di Leva`.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{cat:"Musik",q,a,w}}),...`Vilket land har vunnit flest herr-VM i fotboll?|Brasilien|Tyskland|Italien|Argentina
I vilken klubb spelade Zlatan mellan 2012 och 2016?|Paris Saint-Germain|Manchester United|Inter|Milan
Vilket land kommer Cristiano Ronaldo från?|Portugal|Spanien|Brasilien|Italien
Vilket land kommer Erling Haaland från?|Norge|Danmark|Sverige|Island
Vad heter Liverpools hemmaarena?|Anfield|Old Trafford|Goodison Park|Stamford Bridge
Vad heter Manchester Uniteds hemmaarena?|Old Trafford|Anfield|Etihad|Emirates
Vad heter Real Madrids hemmaarena?|Santiago Bernabéu|Camp Nou|Mestalla|San Siro
Med vilket NHL-lag vann Peter Forsberg Stanley Cup?|Colorado Avalanche|Detroit Red Wings|Philadelphia Flyers|New York Rangers
I vilken gren tävlar Armand Duplantis?|Stavhopp|Höjdhopp|Längdhopp|Tresteg
I vilken sport tävlar Sarah Sjöström?|Simning|Friidrott|Skidor|Cykel
I vilken sport tävlade Charlotte Kalla?|Längdskidor|Skidskytte|Alpint|Backhoppning
I vilken sport var Ingemar Stenmark stjärna?|Alpint|Längdskidor|Backhoppning|Skidskytte
I vilken sport var Annika Sörenstam världsetta?|Golf|Tennis|Bordtennis|Bowling
Hur lång är en olympisk simbassäng?|50 meter|25 meter|100 meter|75 meter
I vilken stad spelas Wimbledon?|London|Paris|New York|Melbourne
Var hölls sommar-OS 2024?|Paris|Tokyo|Los Angeles|London
Var hölls sommar-OS 2016?|Rio de Janeiro|London|Peking|Tokyo
Var hölls herrarnas fotbolls-VM 2018?|Ryssland|Brasilien|Qatar|Sydafrika
Var hölls herrarnas fotbolls-VM 2014?|Brasilien|Tyskland|Ryssland|Sydafrika
Vilket land kommer F1-föraren Max Verstappen från?|Nederländerna|Belgien|Tyskland|Österrike`.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{cat:"Sport",q,a,w}}),...`Från vilket land kommer sushi?|Japan|Kina|Sydkorea|Thailand
Från vilket land kommer tacos?|Mexiko|Spanien|Peru|USA
Från vilket land kommer paella?|Spanien|Italien|Portugal|Mexiko
Från vilket land kommer kimchi?|Sydkorea|Japan|Kina|Vietnam
Från vilket land kommer gyros?|Grekland|Turkiet|Italien|Libanon
Vad är huvudingrediensen i hummus?|Kikärtor|Linser|Sesamfrön|Bönor
Vad görs tofu av?|Sojabönor|Ris|Kikärtor|Mandel
Vad är surströmming?|Jäst fisk|Rökt fisk|Inlagd ost|Gravad lax
Vilken ört ger bearnaisesås sin smak?|Dragon|Dill|Persilja|Timjan
Vilket land kommer pilsnern från?|Tjeckien|Tyskland|Belgien|Irland
Vilken sprit är basen i en mojito?|Rom|Vodka|Gin|Tequila
Vilken sprit är basen i en margarita?|Tequila|Rom|Gin|Vodka
Vilken sprit är basen i en cosmopolitan?|Vodka|Rom|Gin|Tequila
Vilket mousserande vin används i en Aperol Spritz?|Prosecco|Champagne|Cava|Crémant
Vilken sprit är basen i en negroni?|Gin|Vodka|Rom|Whisky
Vilken sprit är basen i en caipirinha?|Cachaça|Tequila|Gin|Vodka`.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{cat:"Mat & dryck",q,a,w}}),...`Vad betyder H2O?|Vatten|Väte|Salt|Syre
Vilken kemisk beteckning har guld?|Au|Ag|Gd|Go
Vilken kemisk beteckning har järn?|Fe|Ir|Jn|In
Vilken kemisk beteckning har silver?|Ag|Si|Au|Sr
Vilken kemisk beteckning har natrium?|Na|N|Nt|So
Vilken gas finns det mest av i luften?|Kväve|Syre|Koldioxid|Väte
Vilket är människans största organ?|Huden|Levern|Lungorna|Hjärnan
Vad mäts i ampere?|Elektrisk ström|Spänning|Effekt|Motstånd
Vad mäts i hertz?|Frekvens|Effekt|Tryck|Ljusstyrka
Vem upptäckte penicillinet?|Alexander Fleming|Louis Pasteur|Marie Curie|Robert Koch
Vem får äran för telefonens patent 1876?|Alexander Graham Bell|Thomas Edison|Nikola Tesla|Lars Magnus Ericsson
Vem är mest känd för relativitetsteorin?|Albert Einstein|Isaac Newton|Niels Bohr|Stephen Hawking`.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{cat:"Vetenskap",q,a,w}}),...`Vem grundade Microsoft tillsammans med Paul Allen?|Bill Gates|Steve Jobs|Larry Page|Jeff Bezos
Vem grundade Amazon?|Jeff Bezos|Elon Musk|Bill Gates|Larry Ellison
Vem grundade Facebook?|Mark Zuckerberg|Jack Dorsey|Evan Spiegel|Larry Page
Vem är Spotifys svenske grundare?|Daniel Ek|Sebastian Siemiatkowski|Niklas Zennström|Markus Persson
Vem är Klarnas mest kända grundare?|Sebastian Siemiatkowski|Daniel Ek|Niklas Zennström|Erling Persson
Vem grundade H&M?|Erling Persson|Ingvar Kamprad|Stefan Persson|Ruben Rausing
Vem skapade Minecraft?|Markus Persson|Daniel Ek|Gabe Newell|John Carmack`.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{cat:"F\u00f6retag & internet",q,a,w}}),...`Vad heter hjälten i The Legend of Zelda?|Link|Zelda|Ganon|Epona
Vilket land kommer The Witcher-spelen från?|Polen|Ryssland|Tjeckien|Tyskland
Vilken svensk spelstudio gör Battlefield?|DICE|Mojang|King|Paradox
Vilken svensk studio gjorde Minecraft?|Mojang|DICE|King|Avalanche
Vad heter FIFA-spelen sedan 2023?|EA Sports FC|FIFA World|Football Pro|eFootball
Vad kallas förrädaren i Among Us?|Impostor|Crewmate|Traitor|Sus
Vilket företag gör Fortnite?|Epic Games|Valve|Riot Games|Activision
Vilket företag gör League of Legends?|Riot Games|Blizzard|Valve|Epic Games
Vad spelar man med i Rocket League?|Bilar|Raketer|Flygplan|Robotar`.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{cat:"Spel",q,a,w}}),...`Hur många strängar har en vanlig gitarr?|6|4|5|7
Hur många strängar har en fiol?|4|3|5|6
Vilket instrument är Jimi Hendrix känd för?|Gitarr|Trummor|Bas|Piano
Vilken färg får man av blått och gult?|Grönt|Lila|Orange|Brunt
Vilken färg får man av rött och blått?|Lila|Grönt|Orange|Rosa
Hur många sidor har en hexagon?|6|5|7|8
Hur många grader är vinkelsumman i en triangel?|180|90|360|270
Vad är 15 procent av 200?|30|15|20|45
Vad är 7 gånger 8?|56|54|48|64
Vilket är det minsta primtalet?|2|1|3|5
Vad heter en figur med åtta sidor?|Oktagon|Hexagon|Pentagon|Dekagon
Vilket språk talas i Brasilien?|Portugisiska|Spanska|Brasilianska|Italienska
Vilket är det största språket i Österrike?|Tyska|Österrikiska|Ungerska|Italienska
Vilket är det officiella språket i Egypten?|Arabiska|Egyptiska|Engelska|Franska
Hur många bokstäver har det svenska alfabetet?|29|26|28|30
Vilket stjärntecken har någon född 24 december?|Stenbocken|Skytten|Vattumannen|Fiskarna
Hur många nollor har en miljard?|9|6|8|12
I vilket väderstreck går solen upp?|Öst|Väst|Nord|Syd
Vad kallas en korsning mellan labrador och pudel?|Labradoodle|Cockapoo|Puggle|Goldendoodle
Från vilket land kommer hundrasen chihuahua?|Mexiko|Spanien|Peru|Kina
Från vilket land kommer hundrasen shiba?|Japan|Kina|Sydkorea|Thailand
Vilken ras är Lassie?|Collie|Schäfer|Golden retriever|Beagle
Vilken ras är Scooby-Doo?|Grand danois|Beagle|Bulldogg|Schäfer
Vilken ras är Snobben?|Beagle|Tax|Terrier|Pudel
Vad heter Asterix bäste vän?|Obelix|Idéfix|Getafix|Kakofonix
Vad heter Kalle Ankas flickvän?|Kajsa Anka|Mimmi Pigg|Klarabella|Mårten Gås
Vad heter Kalle Ankas rika farbror?|Joakim von Anka|Alexander Lukas|Oppfinnarjocke|Björnligan
Vad heter Musse Piggs hund?|Pluto|Långben|Max|Fido
Vad heter Tintins hund?|Milou|Haddock|Snobben|Pluto
Vad heter Gustafs ägare?|Jon|Odie|Nermal|Liz
Vad heter Batmans stad?|Gotham|Metropolis|Star City|Central City
Vad heter Supermans stad?|Metropolis|Gotham|Star City|Smallville
Vad heter Spider-Man på riktigt?|Peter Parker|Clark Kent|Bruce Wayne|Tony Stark
Vad heter Batman på riktigt?|Bruce Wayne|Clark Kent|Peter Parker|Barry Allen`.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{cat:'Blandat',q,a,w}})];
