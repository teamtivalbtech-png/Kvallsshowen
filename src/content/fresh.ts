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
const Q=`No, I am your father.|Star Wars
May the Force be with you.|Star Wars
You shall not pass!|Sagan om ringen
My precious.|Sagan om ringen
Run, Forrest, run!|Forrest Gump
My mama always said life was like a box of chocolates.|Forrest Gump
I'll be back.|Terminator
Hasta la vista, baby.|Terminator 2
You're gonna need a bigger boat.|Hajen
I'm gonna make him an offer he can't refuse.|Gudfadern
I'm the king of the world!|Titanic
I'm flying, Jack!|Titanic
I see dead people.|Sjätte sinnet
Why so serious?|The Dark Knight
On Wednesdays we wear pink.|Mean Girls
Nobody puts Baby in a corner.|Dirty Dancing
You're a wizard, Harry.|Harry Potter
Just keep swimming.|Hitta Nemo
To infinity and beyond!|Toy Story
I am Groot.|Guardians of the Galaxy
I am Iron Man.|Iron Man
Are you not entertained?|Gladiator
Houston, we have a problem.|Apollo 13
Here's Johnny!|The Shining
Bond. James Bond.|James Bond
Yippee-ki-yay, motherfucker!|Die Hard
You can't handle the truth!|A Few Good Men
Show me the money!|Jerry Maguire
Say hello to my little friend!|Scarface
The first rule of Fight Club is: you do not talk about Fight Club.|Fight Club
This is Sparta!|300
What is the Matrix?|The Matrix
Hakuna matata.|Lejonkungen
What are you doing in my swamp?|Shrek
I will find you, and I will kill you.|Taken
I don't have friends. I got family.|Fast & Furious
Hello. My name is Inigo Montoya.|The Princess Bride
Toto, I've a feeling we're not in Kansas anymore.|Trollkarlen från Oz
I'm Batman.|Batman
With great power comes great responsibility.|Spider-Man
Wakanda forever!|Black Panther
I love you 3000.|Avengers: Endgame
Pivot!|Vänner
How you doin'?|Vänner
We were on a break!|Vänner
Suit up!|How I Met Your Mother
I am the one who knocks.|Breaking Bad
Say my name.|Breaking Bad
Jesse, we have to cook.|Breaking Bad
Better call Saul!|Better Call Saul
Winter is coming.|Game of Thrones
Hold the door!|Game of Thrones
You know nothing, Jon Snow.|Game of Thrones
A Lannister always pays his debts.|Game of Thrones
Hodor.|Game of Thrones
D'oh!|Simpsons
Eat my shorts!|Simpsons
Bazinga!|The Big Bang Theory
That's what she said.|The Office
Bears. Beets. Battlestar Galactica.|The Office
Cool, cool, cool.|Brooklyn Nine-Nine
Wubba lubba dub dub!|Rick and Morty
Oh my God! They killed Kenny!|South Park
Giggity!|Family Guy
Everybody lies.|House
This is the way.|The Mandalorian
Lugn, bara lugn.|Karlsson på taket
Det stör inte en stor ande.|Karlsson på taket
Det är en världslig sak.|Karlsson på taket
Du och jag, Alfred.|Emil i Lönneberga
Jag har en plan.|Jönssonligan
Det har jag aldrig provat förut, så det klarar jag helt säkert.|Pippi Långstrump
Det är någonting man måste göra, annars är man ingen människa utan bara en liten lort.|Bröderna Lejonhjärta`.split('\n');
export const QUOTES=Q.map(l=>{const[q,a]=l.split('|');return{q,a}});
export const QTITLES=[...new Set([...QUOTES.map(x=>x.a),'Solsidan','Rocky','Pulp Fiction','Kopps','Jurassic Park','Peaky Blinders','Stranger Things','Ensam hemma','Torsk på Tallinn','Sällskapsresan'])];
export const PHRASES=['Jag har glömt min pinkod','Vem åt upp min kebab','Mamma ringer igen','Det var inte jag som fes','Jag älskar Ullared','Kan du swisha mig','Bussen gick för tio minuter sedan','Min katt är min chef','Jag dansar bäst på krogen','Det doftar fredagsmys','Jag har ätit för mycket tacos','Snälla låt mig sova','Vem har tagit min laddare','Jag är inte full jag är glad','Hallå det här är Sixten','Var är fjärrkontrollen','Jag kan flyga på måndagar','Min farmor spelar Fortnite','Korven är slut på Ikea','Jag är allergisk mot måndagar','Du har spenat mellan tänderna','Vi ses på Systemet','Jag köpte en till elsparkcykel','Banan banan banan'];
