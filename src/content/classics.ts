// Innehåll till Kodnamn, Våglängden, Viskleken, Påhittat, Tre rundor, Alias och Bluffritaren.
const w=(s:string)=>s.trim().split(/\s+/);
export const KODORD=w(`Äpple Bank Bro Buss Båt Björn Bok Boll Borg Bur Dans Dator Docka Drake Dröm Elefant Fest Film Fisk Fjäder Flagga Fluga Fot Fågel Färg Gitarr Glas Grill Guld Hammare Hatt Hav Hjul Hjärta Hund Hus Häst Ilska Is Jacka Jord Jul Kaffe Kaka Kamera Kanin Katt Kniv Kung Kyrka Lampa Lastbil Lejon Luft Lås Maskin Mask Mat Mjölk Måne Mus Nyckel Nål Ost Papper Penna Pirat Pizza Planet Polis Prins Radio Regn Ring Robot Rymd Sand Sax Skog Sko Skola Skugga Sköldpadda Slott Smör Snö Sol Spegel Spindel Stad Stjärna Stol Storm Sträng Strand Sväng Svärd Säng Tak Tand Tid Tiger Tomte Tåg Ugn Vatten Vind Vin Våg Ö Öga Öl`);
export const SPECTRA=[['Kallt','Varmt'],['Dåligt','Bra'],['Tråkigt','Roligt'],['Billigt','Dyrt'],['Vanligt','Ovanligt'],['Mjukt','Hårt'],['Överskattat','Underskattat'],['Fult','Snyggt'],['Lätt','Svårt'],['Nyttigt','Onyttigt'],['Barnsligt','Vuxet'],['Lågt','Högt'],['Sött','Salt'],['Tyst','Högljutt'],['Farligt','Ofarligt'],['Gammalt','Nytt'],['Svenskt','Inte svenskt alls'],['Fin kultur','Låg kultur'],['Liten kändis','Stor kändis'],['Dålig dejt','Bra dejt'],['Dålig film','Bra film'],['Dålig semester','Bra semester'],['Enkelt jobb','Slitsamt jobb'],['Pinsamt','Coolt'],['Dålig pizza','Bra pizza'],['Korkad idé','Genial idé'],['Hemlighet','Allmänt känt'],['Sovmorgon','Tidigt uppe'],['Dåligt husdjur','Bra husdjur'],['Fest','Lugn hemmakväll'],['Liten skuld','Stor skuld'],['Dålig superkraft','Bra superkraft'],['Stadsbo','Lantis'],['Svår låt','Lätt låt'],['Kort film','Lång film'],['Ful bil','Snygg bil'],['Dålig gåva','Bra gåva'],['Hälsosamt','Livsfarligt'],['Äckligt','Gott'],['Mesigt','Modigt']];
export const VISKSTART=['En älg säljer dammsugare','Mormor på rullskridskor','Kungen köper kebab','En ledsen robot','Tomten på gymmet','En pirat i tvättstugan','Två hundar i kostym','En orm spelar gitarr','En dinosaurie på Ikea','En snögubbe på stranden'];
export const FIB2=(`Vad är Skottlands nationaldjur?|Enhörningen
Vad kallas plastbiten i änden på ett skosnöre?|Aglet
Vilken färg hade morötter innan orange blev vanligt?|Lila
Vad uppfanns först, faxen eller telefonen?|Faxen
Vad är enligt botaniken ett bär: bananen eller jordgubben?|Bananen
Vad sålde Nintendo från början?|Spelkort
Vad tillverkade Nokia från början?|Papper
Vad tillverkade Lamborghini innan sportbilarna?|Traktorer
Vad var Kleenex från början tänkt som?|Gasmaskfilter
Vad skulle Musse Pigg först heta?|Mortimer
Vilket djur har fingeravtryck som liknar människans?|Koalan
Var sitter en räkas hjärta?|I huvudet
Vad kallas fördjupningen mellan ögonbrynen?|Glabella
Vad heter doften efter regn?|Petrichor
Vilket land har en flagga som inte är rektangulär?|Nepal
Vilken färg har en isbjörns hud?|Svart
Vilken färg har flamingor när de föds?|Grå
Vad sålde Ikea från början?|Pennor
Vilken färg har en hummers blod?|Blått
Vad kallas korsningen mellan ett hanlejon och en tigerhona?|Liger
Vad kallas rädslan för långa ord?|Hippopotomonstrosesquippedaliofobi
Vilket djur har tre hjärtan?|Bläckfisken
Vad kallas det när ett ord tappar sin betydelse av upprepning?|Semantisk mättnad
Vad är enligt uppskattningar det mest stulna livsmedlet i världen?|Ost
Vilken melodi har Liechtensteins nationalsång?|God Save the King`).split('\n').map(l=>{const[q,a]=l.split('|');return{q,a}});
export const TRE=w(`Zlatan Kungen Sixten Greta_Thunberg ABBA Björn_Borg Pippi_Långstrump Astrid_Lindgren Kalle_Anka Musse_Pigg Harry_Potter Batman Spindelmannen Elsa Shrek Ronaldo Messi Beyoncé Madonna Taylor_Swift Michael_Jackson Elvis Einstein Napoleon Julius_Caesar Kleopatra Jultomten Påskharen Barbie Mario Pikachu Sherlock_Holmes James_Bond Darth_Vader Yoda Gollum Hulken Gordon_Ramsay Mr_Bean Ernst_Kirchsteiger Carola Loreen Avicii Ingvar_Kamprad Lasse_Åberg Gunde_Svan Pernilla_Wahlgren Filip_och_Fredrik Tintin Bamse Karlsson_på_taket Emil Ronja Robin_Hood Dracula Frankenstein Mona_Lisa Bob_Marley Lady_Gaga Rihanna`).map(x=>x.replace(/_/g,' '));
export const ALIAS=w(`Paraply Cykel Toalett Kylskåp Tandborste Bastu Midsommar Snöskottning Glasögon Fotboll Hockey Tvättmaskin Soffa Pizza Kebab Taco Korv Kanelbulle Kaffe Godis Lördag Skola Lärare Polis Brandman Doktor Tandläkare Frisör Kock Pilot Flygplan Tåg Tunnelbana Båt Ubåt Raket Månen Solen Stjärna Regnbåge Åska Snö Hagel Dimma Skog Sjö Hav Berg Öken Djungel Giraff Elefant Lejon Pingvin Ko Gris Häst Älg Björn Varg Hund Katt Hamster Orm Spindel Mygga Bi Fjäril Banan Äpple Apelsin Jordgubbe Potatis Tomat Lök Vitlök Mjölk Smör Ost Ägg Bröd Salt Peppar Socker Kniv Gaffel Sked Tallrik Glas Mugg Ugn Spis Mikrovågsugn Dammsugare Sopor Nyckel Dörr Fönster Tak Golv Trappa Hiss Säng Kudde Täcke Lampa Spegel Tv Mobil Dator Hörlurar Kamera Gitarr Piano Trummor Fiol Sångare Konsert Teater Bio Museum Bibliotek Bok Tidning Penna Sax Tejp Lim Hammare Spik Skruv Såg Stege Bil Lastbil Motorcykel Moped Traktor Kyrka Slott Bank Affär Apotek Systembolaget Ikea Sommarstuga Grill Tält Sovsäck Ryggsäck Resväska Pass Strand Solkräm Baddräkt Skidor Skridskor Pulka Snögubbe Jultomte Julgran Påskägg Bröllop Begravning Födelsedag Tårta Ballong Present Semester Kärlek Dröm Skratt Hicka Nysning`);
export const LIAR:any={Mat:w('Pizza Hamburgare Banan Glass Korv Sushi Taco Pannkaka'),Djur:w('Elefant Giraff Bläckfisk Haj Snigel Fladdermus Krokodil Struts'),Yrken:w('Polis Tandläkare Pirat Astronaut Clown Kock Brandman Domare'),Saker:w('Paraply Toalett Cykel Gitarr Stege Mikrofon Kylskåp Tält'),Platser:w('Strand Skola Kyrka Sjukhus Fängelse Flygplats Slott Bastu'),Fritid:w('Fiske Skidåkning Bowling Golf Dans Karaoke Bio Yoga')};
