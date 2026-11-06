// fråga|rätt|fel|fel|fel  – fler kategorier till Kategorikampen.
const R:Record<string,string>={
'Musikhistoria':`Vilket land kommer gruppen ABBA från?|Sverige|Norge|Danmark|Finland
Vilket år vann ABBA Eurovision med Waterloo?|1974|1969|1979|1984
Vem kallas The King of Pop?|Michael Jackson|Elvis Presley|Prince|Freddie Mercury
Vilket band hade sångaren Freddie Mercury?|Queen|Genesis|Kiss|The Who
Vilket band gav ut albumet Abbey Road?|The Beatles|The Rolling Stones|Pink Floyd|The Doors
Vilken stad kommer The Beatles från?|Liverpool|London|Manchester|Birmingham
Hur många strängar har en vanlig gitarr?|6|4|5|8
Hur många tangenter har ett vanligt piano?|88|76|66|100
Vem komponerade Månskenssonaten?|Beethoven|Mozart|Bach|Chopin
Vilket band hade sångaren Kurt Cobain?|Nirvana|Pearl Jam|Soundgarden|Green Day
Vem sjöng Like a Virgin?|Madonna|Cyndi Lauper|Whitney Houston|Cher
Vilken svensk artist hette Tim Bergling?|Avicii|Basshunter|Alesso|Axwell
Vilket instrument spelade Louis Armstrong främst?|Trumpet|Saxofon|Trombon|Piano`,
'Geografi':`Vad heter världens högsta berg?|Mount Everest|K2|Kilimanjaro|Mont Blanc
Vad heter världens största land till ytan?|Ryssland|Kanada|Kina|USA
Vilken är världens största ocean?|Stilla havet|Atlanten|Indiska oceanen|Norra ishavet
Vad är Australiens huvudstad?|Canberra|Sydney|Melbourne|Perth
Vad är Kanadas huvudstad?|Ottawa|Toronto|Montreal|Vancouver
Vad är Turkiets huvudstad?|Ankara|Istanbul|Izmir|Antalya
Vad är Schweiz huvudstad?|Bern|Zürich|Genève|Basel
Vilken världsdel är Egypten i?|Afrika|Asien|Europa|Oceanien
Vilket land har formen av en stövel?|Italien|Grekland|Spanien|Portugal
Vilken flod rinner genom Paris?|Seine|Rhen|Loire|Donau
Vilken flod rinner genom London?|Themsen|Severn|Seine|Mersey
I vilket land ligger Machu Picchu?|Peru|Mexiko|Chile|Bolivia
Vad heter världens största heta öken?|Sahara|Gobi|Kalahari|Atacama`,
'Språk & ord':`Vad betyder det latinska carpe diem?|Fånga dagen|Lev länge|Tänk efter|Gud är stor
Hur många bokstäver har det svenska alfabetet?|29|26|28|30
Vilket språk talas i Brasilien?|Portugisiska|Spanska|Brasilianska|Italienska
Vilket är det officiella språket i Egypten?|Arabiska|Egyptiska|Engelska|Franska
Vad kallas ett ord som stavas likadant baklänges?|Palindrom|Synonym|Anagram|Akronym
Vad kallas ord som betyder ungefär samma sak?|Synonymer|Antonymer|Homonymer|Anagram
Vad kallas motsatsord?|Antonymer|Synonymer|Palindromer|Metaforer
Vad betyder engelska ordet butterfly?|Fjäril|Smörgås|Fluga|Humla
Vilken ordklass är ordet springa?|Verb|Substantiv|Adjektiv|Adverb
Vilken ordklass är ordet vacker?|Adjektiv|Verb|Substantiv|Preposition
Vad betyder franska merci?|Tack|Hej|Snälla|Förlåt
Vad betyder spanska gracias?|Tack|Hej då|God morgon|Varsågod
Vad heter Finlands andra officiella språk?|Svenska|Ryska|Samiska|Norska`,
'Bilar & teknik':`Vilket land kommer Volvo från?|Sverige|Tyskland|Norge|Japan
Vilket land kommer Toyota från?|Japan|Sydkorea|Kina|USA
Vilket land kommer Ferrari från?|Italien|Tyskland|Frankrike|Spanien
Vilket land kommer Skoda från?|Tjeckien|Polen|Ungern|Slovakien
Vem grundade Microsoft tillsammans med Paul Allen?|Bill Gates|Steve Jobs|Elon Musk|Larry Page
Vem var med och grundade Apple?|Steve Jobs|Bill Gates|Jeff Bezos|Mark Zuckerberg
Vad står www för?|World Wide Web|World Web Wire|Wide Web World|Web World Wide
Vad står USB för?|Universal Serial Bus|United System Board|Universal System Bus|Unified Serial Board
Vilket år kom den första iPhonen?|2007|2004|2010|2012
Vilket bränsle går en elbil på?|El|Bensin|Diesel|Etanol
Vad kallas datorns tillfälliga arbetsminne?|RAM|ROM|CPU|USB
Vilket språk använder man mest för att bygga hemsidors struktur?|HTML|Python|Excel|Java`,
'Konst & böcker':`Vem målade Mona Lisa?|Leonardo da Vinci|Michelangelo|Picasso|Rembrandt
Vem målade Stjärnklar natt?|Vincent van Gogh|Claude Monet|Edvard Munch|Salvador Dalí
Vem målade Skriet?|Edvard Munch|Vincent van Gogh|Pablo Picasso|Gustav Klimt
Var hänger Mona Lisa?|Louvren|Prado|Uffizierna|British Museum
Vem skrev Harry Potter?|J.K. Rowling|Stephenie Meyer|Roald Dahl|J.R.R. Tolkien
Vem skrev Sagan om ringen?|J.R.R. Tolkien|C.S. Lewis|George R.R. Martin|Terry Pratchett
Vem skrev Pippi Långstrump?|Astrid Lindgren|Elsa Beskow|Tove Jansson|Selma Lagerlöf
Vem skapade Mumintrollen?|Tove Jansson|Astrid Lindgren|Sven Nordqvist|Elsa Beskow
Vem skrev Män som hatar kvinnor?|Stieg Larsson|Henning Mankell|Camilla Läckberg|Jan Guillou
Vem skapade kommissarie Wallander?|Henning Mankell|Stieg Larsson|Håkan Nesser|Leif GW Persson
Vem skrev Romeo och Julia?|William Shakespeare|Charles Dickens|Oscar Wilde|Jane Austen
Vem skrev Hundraåringen som klev ut genom fönstret och försvann?|Jonas Jonasson|Fredrik Backman|Jens Lapidus|Alex Schulman
Vem skrev En man som heter Ove?|Fredrik Backman|Jonas Jonasson|Jonas Gardell|Stieg Larsson`,
'Kroppen & hälsa':`Hur många ben har en vuxen människa ungefär?|206|106|306|412
Vilket är kroppens största organ?|Huden|Levern|Lungorna|Hjärnan
Hur många kammare har människans hjärta?|4|2|3|6
Vilken blodgrupp kallas universalgivare?|O negativ|AB positiv|A positiv|B negativ
Vilket vitamin bildas i huden av solljus?|D-vitamin|C-vitamin|A-vitamin|B12
Vilken del av kroppen drabbas av karies?|Tänderna|Huden|Lederna|Ögonen
Var i kroppen finns stigbygeln?|Örat|Foten|Knäet|Näsan
Vad kallas läkare som är specialist på barn?|Pediatriker|Ortoped|Kardiolog|Neurolog
Vad kallas läkare som är specialist på hjärtat?|Kardiolog|Neurolog|Urolog|Dermatolog
Vad kallas läkare som är specialist på huden?|Dermatolog|Kardiolog|Ortoped|Gynekolog
Vilket organ renar blodet och bildar urin?|Njurarna|Mjälten|Magsäcken|Bukspottkörteln
Hur många tänder har en vuxen med visdomständer?|32|28|30|36
Vad heter kroppens längsta ben?|Lårbenet|Skenbenet|Överarmsbenet|Ryggraden
Vilken gas andas vi in för att överleva?|Syre|Kväve|Koldioxid|Helium`,
'Mytologi & religion':`Vem är åskguden i nordisk mytologi?|Tor|Oden|Loke|Frej
Vem är den högste guden i nordisk mytologi?|Oden|Tor|Balder|Tyr
Vad heter Tors hammare?|Mjölner|Gungner|Draupner|Excalibur
Vad heter världsträdet i nordisk mytologi?|Yggdrasil|Asgård|Midgård|Valhall
Vem är den högste guden i grekisk mytologi?|Zeus|Poseidon|Hades|Apollon
Vem är havets gud i grekisk mytologi?|Poseidon|Zeus|Ares|Hermes
Vad hette kärleksgudinnan i grekisk mytologi?|Afrodite|Athena|Hera|Artemis
Vilken stad är islams heligaste?|Mecka|Medina|Jerusalem|Bagdad
Vad heter judendomens heliga skrift?|Toran|Koranen|Vedaskrifterna|Bibeln
Vad heter islams heliga skrift?|Koranen|Toran|Bibeln|Talmud
I vilken religion firas Diwali?|Hinduism|Buddhism|Islam|Kristendom
Vem grundade buddhismen?|Siddharta Gautama|Muhammed|Konfucius|Krishna
Hur många lärjungar hade Jesus enligt Bibeln?|12|7|10|40`,
'Pengar & jobb':`Vilken valuta används i Japan?|Yen|Yuan|Won|Ringgit
Vilken valuta används i Storbritannien?|Pund|Euro|Dollar|Krona
Vilken valuta används i Schweiz?|Schweizerfranc|Euro|Pund|Krona
Vad heter Sveriges centralbank?|Riksbanken|Nordea|Finansinspektionen|Skatteverket
Vilken myndighet tar emot din deklaration?|Skatteverket|Kronofogden|Försäkringskassan|CSN
Vad står moms för?|Mervärdesskatt|Momentan skatt|Moderat skatt|Marknadsskatt
Vad heter myndigheten som driver in obetalda skulder?|Kronofogden|Skatteverket|Polisen|Tullverket
Vilken myndighet betalar ut studiemedel?|CSN|Skatteverket|Arbetsförmedlingen|Försäkringskassan
Vilken person finns på den svenska 200-kronorssedeln?|Ingmar Bergman|Astrid Lindgren|Greta Garbo|Evert Taube
Vilken person finns på den svenska 20-kronorssedeln?|Astrid Lindgren|Selma Lagerlöf|Greta Garbo|Birgit Nilsson
Vem grundade IKEA?|Ingvar Kamprad|Erling Persson|Stefan Persson|Marcus Wallenberg
Vilket företag grundade Erling Persson?|H&M|IKEA|ICA|Volvo
Vad kallas det när priser stiger över tid?|Inflation|Deflation|Recession|Devalvering`};
export const QUIZ4=Object.entries(R).flatMap(([c,s])=>s.split('\n').map(l=>{const[q,a,...w]=l.split('|');return{cat:c,q,a,w}}));
export const CATS4=Object.keys(R);
