// fråga|rätt|fel|fel|fel  – rader per kategori. Allt utgår från vad en svensk vuxen rimligen känner till.
const R:Record<string,string>={
'Sverige':`Vilket år blev Sverige medlem i EU?|1995|1991|1999|2003
Vad heter Sveriges största sjö?|Vänern|Vättern|Mälaren|Storsjön
Vilken stad kallas Lilla London?|Göteborg|Malmö|Norrköping|Karlskrona
Vilket landskap är Sveriges största till ytan?|Lappland|Jämtland|Dalarna|Norrbotten
Vad heter Sveriges högsta berg?|Kebnekaise|Sarektjåkkå|Helags|Åreskutan
Vilket år gick Sverige över till högertrafik?|1967|1955|1972|1961
Vad heter Sveriges nationalfågel?|Koltrast|Svan|Örn|Grågås
Vilken stad ligger vid Göta älvs mynning?|Göteborg|Trollhättan|Karlstad|Uddevalla
Vilket år invigdes Öresundsbron?|2000|1996|2004|1992
Vilken kung är far till kronprinsessan Victoria?|Carl XVI Gustaf|Gustaf VI Adolf|Karl XII|Oscar II
Vilken sjö ligger Jönköping vid?|Vättern|Vänern|Hjälmaren|Siljan
Vilken ö är Sveriges största?|Gotland|Öland|Orust|Tjörn
Hur många landskap har Sverige?|25|21|30|18
Vilket företag grundades av Ingvar Kamprad?|Ikea|Clas Ohlson|Jysk|Biltema
Vad heter Stockholms gamla stadsdel på Stadsholmen?|Gamla stan|Södermalm|Djurgården|Kungsholmen
Vilket svenskt företag grundades i Västerås 1947 av Erling Persson?|H&M|Lindex|KappAhl|Gina Tricot
Var ligger Liseberg?|Göteborg|Stockholm|Malmö|Uppsala
Vilket år sköts statsminister Olof Palme?|1986|1982|1990|1979
Vilken drottning abdikerade 1654?|Kristina|Silvia|Margareta|Ulrika Eleonora`,
'Mat & dryck':`Vilken sprit är basen i en Negroni tillsammans med Campari och vermut?|Gin|Rom|Tequila|Vodka
Vilket land kommer Rioja från?|Spanien|Italien|Portugal|Frankrike
Vad består en Dry Martini huvudsakligen av?|Gin och torr vermut|Vodka och Cointreau|Rom och lime|Whisky och socker
Vilket land kommer champagne från?|Frankrike|Italien|Spanien|Tyskland
Vad heter det italienska bubbel som ofta görs på Glera-druvan?|Prosecco|Cava|Crémant|Sekt
Vilken ingrediens ger pesto genovese sin gröna färg?|Basilika|Spenat|Persilja|Ruccola
Vad är huvudingrediensen i guacamole?|Avokado|Ärtor|Lime|Gurka
Vilken fisk används traditionellt i gravlax?|Lax|Sill|Torsk|Sik
Vilken krydda ger saffransbullen dess gula färg?|Saffran|Gurkmeja|Paprika|Curry
Vilken dag äter vi traditionellt våfflor i Sverige?|25 mars|1 maj|13 december|6 juni
Vad består en Bloody Mary av förutom vodka?|Tomatjuice|Apelsinjuice|Tranbärsjuice|Tonic
Vad heter Mexikos nationalsprit från blå agave?|Tequila|Pisco|Cachaça|Grappa
Vilken månad börjar kräftpremiären traditionellt?|Augusti|Juni|Juli|September
Vilken fisk ingår i surströmming?|Strömming|Sill från Skagerrak|Makrill|Abborre
Vilken är den högsta lagringsklassen för Rioja?|Gran Reserva|Crianza|Joven|Cosecha
Vilken nöt används i marsipan?|Mandel|Hasselnöt|Valnöt|Pistage
Vilken druva är huvuddruvan i Chablis?|Chardonnay|Riesling|Sauvignon blanc|Pinot gris
Vilket land uppfann gin and tonic-kulturen genom sin kolonialtid i Indien?|Storbritannien|Nederländerna|Portugal|Frankrike
Vilken sås ingår i en klassisk Eggs Benedict?|Hollandaise|Béarnaise|Aioli|Remoulad
Vilken ost finns i en klassisk Caprese?|Mozzarella|Parmesan|Fetaost|Halloumi`,
'Film & tv':`Vem spelar Jack i Titanic?|Leonardo DiCaprio|Brad Pitt|Matt Damon|Johnny Depp
Vad heter skurken i Sagan om ringen?|Sauron|Voldemort|Vader|Joffrey
Vilken serie utspelar sig i Westeros?|Game of Thrones|The Witcher|Vikings|The Crown
Vilken film regisserade Ruben Östlund som vann Guldpalmen 2017?|The Square|Force Majeure|Triangle of Sadness|Play
Vilken skådespelare spelar Lisbeth Salander i de svenska Millennium-filmerna?|Noomi Rapace|Alicia Vikander|Rebecca Ferguson|Malin Åkerman
Vad heter huvudkaraktären i Breaking Bad?|Walter White|Jesse Pinkman|Saul Goodman|Hank Schrader
Vilket år hade första Harry Potter-filmen premiär?|2001|1997|2004|1999
I vilket land utspelar sig Parasite?|Sydkorea|Japan|Kina|Thailand
Vad heter den svenska filmen om pensionären Ove?|En man som heter Ove|Hundraåringen|Så som i himmelen|Jägarna
Vem spelade Bond i Skyfall?|Daniel Craig|Pierce Brosnan|Sean Connery|Roger Moore
Vilken serie handlar om familjen Roy?|Succession|Billions|The Crown|Dallas
Vem regisserade Pulp Fiction?|Quentin Tarantino|Martin Scorsese|Steven Soderbergh|Coen-bröderna
Vad heter vännernas kafé i Vänner?|Central Perk|The Brew|Monk's|MacLaren's
Vilken skådespelare är son till Stellan Skarsgård och spelade Pennywise?|Bill Skarsgård|Alexander Skarsgård|Gustaf Skarsgård|Valter Skarsgård
Vilken film fick Oscar för bästa film för 1997 års filmer?|Titanic|L.A. Confidential|Good Will Hunting|As Good as It Gets`,
'Sport':`Vilket land vann första fotbolls-VM 1930?|Uruguay|Brasilien|Argentina|Italien
Hur många spelare har ett hockeylag på isen i spel (med målvakt)?|6|5|7|4
Vilken svensk tennisspelare vann Wimbledon fem gånger i rad?|Björn Borg|Stefan Edberg|Mats Wilander|Robin Söderling
Vilken stad var värd för sommar-OS 1912?|Stockholm|London|Paris|Berlin
Hur långt är ett maratonlopp?|42,195 km|40 km|45 km|41,195 km
Vilket lopp går mellan Sälen och Mora?|Vasaloppet|Birkebeinerrennet|Engadin|Tjejvasan
Hur många hål har en normal golfrunda?|18|9|12|21
Vilken svensk sprang över 6 meter i stavhopp och heter Armand?|Duplantis|Thörnblad|Bergström|Holm
Vad heter Zlatan i efternamn?|Ibrahimović|Ivanović|Isaković|Imamović
Vilken stad har laget Färjestad?|Karlstad|Örebro|Luleå|Linköping
Vilket land har vunnit flest fotbolls-VM för herrar?|Brasilien|Tyskland|Italien|Argentina
Vad heter Sveriges landslagsspelare som kallas Kosse?|Kosovare Asllani|Caroline Seger|Lotta Schelin|Nilla Fischer
I vilken sport tävlar man om Stanley Cup?|Ishockey|Basket|Baseboll|Amerikansk fotboll
Hur många poäng ger en straffkast i basket?|1|2|3|0
Vilken nation vann ishockey-OS 2006 i Turin?|Sverige|Finland|Kanada|Ryssland
Vilket år hölls VM i fotboll i Sverige?|1958|1962|1974|1950
Vad kallas tre mål av samma spelare i en match?|Hattrick|Birdie|Grand slam|Strike
Vad heter det stora cykelloppet i Frankrike?|Tour de France|Giro|Vuelta|Paris-Nice
Vilken sport utövade Peter Forsberg?|Ishockey|Bandy|Fotboll|Handboll
Vad heter Sveriges längsta älv som rinner genom Dalarna?|Dalälven|Klarälven|Umeälven|Torne älv`,
'Vetenskap':`Vilket grundämne har kemiskt tecken Au?|Guld|Silver|Aluminium|Argon
Vilken planet kallas den röda planeten?|Mars|Venus|Jupiter|Merkurius
Vem uppfann dynamiten?|Alfred Nobel|Anders Celsius|Carl von Linné|Thomas Edison
Vad mäter Richterskalan?|Jordbävningar|Vind|Ljudstyrka|Radioaktivitet
Hur många ben har en vuxen människa ungefär?|206|180|256|300
Vilket är kroppens största organ?|Huden|Levern|Lungorna|Tarmen
Vad är vattnets kemiska formel?|H2O|CO2|O2|NaCl
Vilken svensk gav namn åt temperaturskalan?|Anders Celsius|Carl von Linné|Jöns Jacob Berzelius|Alfred Nobel
Vilken planet är störst i vårt solsystem?|Jupiter|Saturnus|Neptunus|Uranus
Vad står DNA för?|Deoxiribonukleinsyra|Dubbel nukleär antikropp|Dynamisk nervaktivitet|Dioxinnitratsyra
Vilket är det hårdaste naturliga materialet?|Diamant|Titan|Stål|Kvarts
Hur många kromosomer har en människa normalt?|46|23|48|44
Vilket djur är världens största?|Blåval|Afrikansk elefant|Valhaj|Kaskelot
Vad heter galaxen vi bor i?|Vintergatan|Andromeda|Karlavagnen|Orion
Vilken gas andas växter in?|Koldioxid|Syre|Kväve|Helium
Hur många hjärtan har en bläckfisk?|3|1|2|5
Vilken vitamin bildas med hjälp av solljus i huden?|D|C|A|B12
Vilket grundämne är vanligast i universum?|Väte|Syre|Helium|Kol
Vilken del av hjärnan skadas ofta först vid Alzheimers?|Hippocampus|Lillhjärnan|Hjärnstammen|Synbarken`,
'Vuxenliv':`Hur många månader brukar ett bolån ha i bindningstid om det kallas "3-månaders"?|3|12|36|6
Vad står moms för?|Mervärdesskatt|Momentan skatt|Moderat statlig skatt|Månadsskatt
Vad heter myndigheten du deklarerar till?|Skatteverket|Kronofogden|Försäkringskassan|Finansinspektionen
Vilken månad är sista deklarationsdagen normalt?|Maj|Mars|Juni|April
Vilken app dominerar svenskars betalningar mellan privatpersoner?|Swish|Klarna|Vipps|PayPal
Vad kallas en äldre man som försörjer en yngre partner?|Sugardaddy|Cougar|Boomer|Himbo
Vad kallas en äldre kvinna som dejtar yngre män?|Cougar|Sugarbaby|Karen|Boomer
Vad betyder "ghosting"?|Någon försvinner utan förklaring|Man dejtar två samtidigt|Man flyttar ihop snabbt|Man raderar sin profil
Vad betyder att någon är "red flag" i dejtingsammanhang?|En varningssignal|En stark flörtsignal|Att personen är kommunist|En person med rött hår
Vilken ålder krävs för att handla på Systembolaget?|20|18|21|25
Vad heter en cocktail med rom, lime, mynta och socker?|Mojito|Daiquiri|Cosmopolitan|Sidecar
Vad brukar svenskar kalla mellandagarna-shoppingen?|Mellandagsrea|Black Friday|Cyber Monday|Julrea-veckan`,
};
export const QUIZ=Object.entries(R).flatMap(([c,s])=>s.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{cat:c,q,a,w}}));
export const CATS=Object.keys(R);
// Allt eller inget: svårare frågor för finalen
export const HARD=`Vilket år grundades Stockholm enligt första skriftliga källan?|1252|1103|1397|1523
Vilket grundämne har atomnummer 79?|Guld|Kvicksilver|Platina|Bly
Vilket land har flest tidszoner sett till hela sitt territorium?|Frankrike|Ryssland|USA|Kina
Vem skrev romanen Röda rummet?|August Strindberg|Selma Lagerlöf|Hjalmar Söderberg|Vilhelm Moberg
Vilket år vann Sverige sin första Eurovision?|1974|1984|1991|1999
Vad heter världens längsta flod enligt de flesta källor?|Nilen|Amazonas|Yangtze|Mississippi
Hur många ledamöter har Sveriges riksdag?|349|310|365|290
Vilket år föll Berlinmuren?|1989|1991|1987|1985
Vad heter Norges huvudstad på 1800-talet innan namnet Oslo?|Kristiania|Bergen|Trondheim|Nidaros
Vilket år landade Apollo 11 på månen?|1969|1967|1971|1965
Vem målade Stjärnenatten?|Vincent van Gogh|Claude Monet|Edvard Munch|Paul Gauguin
Vilket är det minsta landet i världen?|Vatikanstaten|Monaco|San Marino|Nauru`.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{q,a,w}});

