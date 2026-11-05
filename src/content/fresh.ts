// Innehåll till Reklamkampen, Tidsresan, Citatkampen och Baklängesrösten.
export const ADS=[['GHES6m-6F3Q','Volvo'],['nT9AITewj1w','Old Spice'],['X13N-Bx17Oc','Coca-Cola'],['5syJjBQ_k6o','Snickers'],['NNerJzj1kjU','Cadbury'],['PFeLffetqrY','Evian'],['MOXQo7nURs0','Ikea'],['OWgXXyL3vEI','Budweiser'],['2zfqw8nhUwA','Apple'],['834gDrY2Hd8','Nike'],['6wAFG9OD-G0','Ica'],['Plp-NMSm5V4','Ica'],['GKy3LDn3F2U','Kalles kaviar'],['SOPPYENlpqY','Kalles kaviar'],['RGCyh2WZMo0','Comviq'],['Y1MEmKHzGHM','Comviq'],['Pmg-yL7eRgk','Tele2'],['O3j-3Yx0Dc0','Tele2'],['D8DghWBBBe0','Marabou'],['AsjTZ1hviRE','Marabou'],['YjLHy6ps6jY','Qstar'],['AzQon8OLwwg','Nivea'],['mjmdWZhPnWc','SEB']].map(([id,b])=>({id,b}));
export const BRANDS=['Volvo','Saab','Old Spice','Axe','Coca-Cola','Pepsi','Snickers','Daim','Cadbury','Marabou','Evian','Loka','Ikea','Jysk','Budweiser','Heineken','Apple','Microsoft','Nike','Adidas','Ica','Coop','Willys','Kalles kaviar','Abba','Comviq','Tele2','Telia','Telenor','Qstar','OKQ8','Nivea','Dove','SEB','Swedbank','Handelsbanken'];
const E=`1995|Sverige går med i EU|Windows 95 släpps|Toy Story har premiär
1996|Nintendo 64 släpps|Fåret Dolly föds|Sommar-OS hålls i Atlanta
1997|Prinsessan Diana dör|Första Harry Potter-boken kommer|Filmen Titanic har premiär
1998|Google grundas|Frankrike vinner fotbolls-VM på hemmaplan|Världen pratar om millenniebuggen
1999|Euron införs som bokföringsvaluta|The Matrix har premiär|Napster startar
2000|Öresundsbron öppnar|Sommar-OS hålls i Sydney|Gladiator har premiär
2001|Wikipedia startar|Xbox släpps|Shrek har premiär
2002|Eurosedlarna börjar användas|Fotbolls-VM i Japan och Sydkorea|Första Spider-Man-filmen med Tobey Maguire
2003|Sverige röstar nej till euron|Skype lanseras|Pirates of the Caribbean har premiär
2004|Facebook grundas|Tsunamin i Indiska oceanen|Sommar-OS hålls i Aten
2005|Youtube grundas|Klarna grundas|Xbox 360 släpps
2006|Twitter lanseras|Wii släpps|Fotbolls-VM hålls i Tyskland
2007|Första iPhonen släpps|Sista Harry Potter-boken kommer|Filmen Superbad har premiär
2008|Spotify lanseras|Barack Obama väljs till president|Sommar-OS hålls i Peking
2009|Whatsapp lanseras|Michael Jackson dör|Avatar har premiär
2010|Instagram lanseras|Kronprinsessan Victoria gifter sig|Vuvuzelor under fotbolls-VM i Sydafrika
2011|Snapchat lanseras|Avicii släpper Levels|Game of Thrones har premiär
2012|Loreen vinner Eurovision med Euphoria|Gangnam Style tar över världen|Sommar-OS hålls i London
2013|GTA V släpps|Frost har premiär|Avicii släpper Wake Me Up
2014|Tyskland krossar Brasilien med 7–1 i fotbolls-VM|Ice Bucket Challenge sprids|Flappy Bird blir en hit
2015|Måns Zelmerlöw vinner Eurovision|Star Wars: The Force Awakens har premiär|Netflix startar sitt svenska år ett, Stranger Things är ännu inte släppt
2016|Pokémon Go släpps|Storbritannien röstar för Brexit|Stranger Things har premiär
2017|Nintendo Switch släpps|Fortnite släpps|Despacito är överallt
2018|Greta Thunberg börjar skolstrejka|Frankrike vinner fotbolls-VM i Ryssland|Avicii dör
2019|Avengers: Endgame har premiär|Notre-Dame brinner|Disney+ startar
2020|Coronapandemin stänger världen|Sommar-OS skjuts upp|Among Us blir en hit
2021|Squid Game tar över Netflix|Fartyget Ever Given blockerar Suezkanalen|Magdalena Andersson blir statsminister
2022|Chatgpt lanseras|Drottning Elizabeth II dör|Argentina vinner fotbolls-VM
2023|Loreen vinner Eurovision igen|Finland går med i Nato|Barbie och Oppenheimer har premiär samma dag
2024|Sverige går med i Nato|Sommar-OS hålls i Paris|Armand Duplantis tar OS-guld i Paris`.replace('Netflix startar sitt svenska år ett, Stranger Things är ännu inte släppt','Hoverboards blir årets pryl');
export const ERAS=E.split('\n').map(l=>{const[y,...h]=l.split('|');return{y:+y,h}});
const Q=`Jag är din far.|Star Wars
Du ska inte passera!|Sagan om ringen
Spring, Forrest, spring!|Forrest Gump
Livet är som en ask choklad.|Forrest Gump
Jag kommer tillbaka.|Terminator
Vi kommer att behöva en större båt.|Hajen
Han ska få ett erbjudande han inte kan tacka nej till.|Gudfadern
Må kraften vara med dig.|Star Wars
Jag är världens konung!|Titanic
Jag ser döda människor.|Sjätte sinnet
Varför så allvarlig?|The Dark Knight
På onsdagar har vi rosa.|Mean Girls
Ingen sätter Baby i ett hörn.|Dirty Dancing
Du är en trollkarl, Harry.|Harry Potter
Simma bara vidare.|Hitta Nemo
Till oändligheten och vidare!|Toy Story
Min dyrbara.|Sagan om ringen
Jag är Groot.|Guardians of the Galaxy
Jag är Iron Man.|Iron Man
Jag har en plan.|Jönssonligan
Akta liftstolpen, Stig!|Sällskapsresan
Håll käften, lilla skitgubbe!|Torsk på Tallinn
Inget är så festligt som fläskfilé med ananas på!|Torsk på Tallinn
Pivot!|Vänner
Suit up!|How I Met Your Mother
Jag är den som knackar.|Breaking Bad
Vintern är på väg.|Game of Thrones
Håll dörren!|Game of Thrones
Du vet ingenting, Jon Snow.|Game of Thrones
D'oh!|Simpsons
Bazinga!|The Big Bang Theory
That's what she said.|The Office
Cool, cool, cool, cool.|Brooklyn Nine-Nine
Wubba lubba dub dub!|Rick and Morty
Säg mitt namn.|Breaking Bad
Är ni inte underhållna?|Gladiator
Houston, vi har ett problem.|Apollo 13
Här är Johnny!|The Shining
Hasta la vista, baby.|Terminator
Maktgalna sossar med dålig smak.|Sällskapsresan
Det finns poliser, sen finns Benny the cop!|Kopps
Fucking shit alltså.|Kopps
Det här, Rudolf Andersson, får du göra om.|Sunes jul
Polis, polis, potatismos.|Beck
Är du mör än, Knubbis?|Pippi Långstrump
Det har jag aldrig provat förut, så det klarar jag helt säkert.|Pippi Långstrump
Annars är man ingen människa utan bara en liten lort.|Bröderna Lejonhjärta
Det är en världslig sak.|Karlsson på taket
Är man väldigt stark måste man också vara väldigt snäll.|Bamse
Bond. James Bond.|James Bond
Yippee-ki-yay!|Die Hard
Jag flyger, Jack!|Titanic
Du klarar inte av sanningen!|A Few Good Men
Visa mig pengarna!|Jerry Maguire
Säg hej till min lilla vän!|Scarface
Första regeln om Fight Club: man pratar inte om Fight Club.|Fight Club
Det här är Sparta!|300
Vad är Matrix?|The Matrix
Vem ska du ringa? Ghostbusters!|Ghostbusters
Hakuna matata.|Lejonkungen
Slå dig fri!|Frost
Det här är mitt träsk!|Shrek
Jag kommer att hitta dig, och jag kommer att döda dig.|Taken
Inget är viktigare än familjen.|Fast & Furious
Mitt namn är Inigo Montoya.|The Princess Bride
Jag har en känsla av att vi inte är i Kansas längre.|Trollkarlen från Oz
How you doin'?|Vänner
Vi var på paus!|Vänner
Legendariskt!|How I Met Your Mother
Eat my shorts!|Simpsons
De dödade Kenny!|South Park
Giggity!|Family Guy
Jesse, vi måste laga mat.|Breaking Bad
Bättre att ringa Saul!|Better Call Saul
Bears, beets, Battlestar Galactica.|The Office
Alla ljuger.|House
Hodor.|Game of Thrones
Lannisters betalar alltid sina skulder.|Game of Thrones
Det här är vägen.|The Mandalorian
Jag är Batman.|Batman
Med stor makt kommer stort ansvar.|Spider-Man
Wakanda för evigt!|Black Panther
Jag älskar dig 3000.|Avengers: Endgame
Ingen rör Hodor.|Game of Thrones`.split('\n').filter(l=>!l.startsWith('Ingen rör Hodor'));
export const QUOTES=Q.map(l=>{const[q,a]=l.split('|');return{q,a}});
export const QTITLES=[...new Set(QUOTES.map(x=>x.a)),'Solsidan','Rocky','Pulp Fiction','Shrek','Kopps','The Matrix','Jurassic Park','Peaky Blinders','Stranger Things','Ensam hemma'];
export const PHRASES=['Jag har glömt min pinkod','Vem åt upp min kebab','Mamma ringer igen','Det var inte jag som fes','Jag älskar Ullared','Kan du swisha mig','Bussen gick för tio minuter sedan','Min katt är min chef','Jag dansar bäst på krogen','Det doftar fredagsmys','Jag har ätit för mycket tacos','Snälla låt mig sova','Vem har tagit min laddare','Jag är inte full jag är glad','Hallå det här är Sixten','Var är fjärrkontrollen','Jag kan flyga på måndagar','Min farmor spelar Fortnite','Korven är slut på Ikea','Jag är allergisk mot måndagar','Du har spenat mellan tänderna','Vi ses på Systemet','Jag köpte en till elsparkcykel','Banan banan banan'];
