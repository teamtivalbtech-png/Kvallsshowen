// Klipp är officiella trailers från YouTube. start/stop är sekunder.
import {SCENES} from './scenes';
export const REELS:any[]=[
 {id:'o141_2Mj844',a:'Snabba Cash',w:['Kopps','Easy Money 2','Beck','Wallander','Hassel'],fq:'Vem spelar huvudrollen JW?',fa:'Joel Kinnaman',fw:['Alexander Skarsgård','Peter Stormare','Rolf Lassgård']},
 {id:'oHjC_sKhW_I',a:'Solsidan',w:['Hundraåringen','Bonusfamiljen','Fjällen','Kronprinsessan','Sune'],fq:'Var utspelar sig Solsidan?',fa:'Saltsjöbaden',fw:['Lidingö','Djursholm','Båstad']},
 {id:'VyHV0BRtdxo',a:'Harry Potter',w:['Sagan om ringen','Narnia','Percy Jackson','Eragon','Spiderwick'],fq:'Vilket elevhem hamnar Harry i?',fa:'Gryffindor',fw:['Slytherin','Ravenclaw','Hufflepuff']},
 {id:'dYGYhgSCrVA',a:'Shrek',w:['Madagaskar','Ice Age','Kung Fu Panda','Trolls','Monsters Inc.'],fq:'Vad heter prinsessan i Shrek?',fa:'Fiona',fw:['Aurora','Lorelei','Anna']},
 {id:'fFLrRlPBg0A',a:'Twilight',w:['Hunger Games','Vampire Diaries','Divergent','Maze Runner','Beautiful Creatures'],fq:'I vilken stad utspelar sig Twilight?',fa:'Forks',fw:['Mystic Falls','Sunnydale','Riverdale']},
 {id:'8RBNHdG35WY',a:'Mamma Mia!',w:['Grease','La La Land','Hairspray','Chicago','Pitch Perfect'],fq:'Vilken grupps låtar sjungs i filmen?',fa:'ABBA',fw:['Roxette','Boney M','Ace of Base']},
 {id:'Ai-uTB3mYhM',a:'En man som heter Ove',w:['Så som i himmelen','Äppelkriget','Svinalängorna','Jägarna','Hundraåringen'],fq:'Vem spelar Ove?',fa:'Rolf Lassgård',fw:['Mikael Persbrandt','Peter Haber','Stellan Skarsgård']},
 {id:'pjiJ1cL3Uss',a:'Hundraåringen',w:['En man som heter Ove','Kopps','Solsidan','Jönssonligan','Sällskapsresan'],fq:'Vem spelar hundraåringen?',fa:'Robert Gustafsson',fw:['Johan Rheborg','Henrik Dorsin','Peter Dalle']},
 {id:'mnd7sFt5c3A',a:'Stranger Things',w:['Dark','The OA','Wednesday','Riverdale','The Umbrella Academy'],fq:'Vad älskar Eleven att äta?',fa:'Eggo-våfflor',fw:['Pizza','Pannkakor','Kanelbullar']},
 {id:'VaOt6tXyf2Y',a:'Breaking Bad',w:['Better Call Saul','Ozark','Narcos','The Wire','Fargo'],fq:'Vad jobbade Walter White med från början?',fa:'Kemilärare',fw:['Läkare','Polis','Advokat']},
 {id:'Kiz8svSUs10',a:'Titanic',w:['Pearl Harbor','The Notebook','Romeo + Juliet','Poseidon','Atonement'],fq:'Vad heter Kate Winslets rollfigur?',fa:'Rose',fw:['Anna','Jane','Emma']},
 {id:'P4fHItoefTk',a:'Frost',w:['Trassel','Modig','Vaiana','Encanto','Isdrottningen'],fq:'Vad heter Elsas syster?',fa:'Anna',fw:['Ariel','Belle','Moana']},
 {id:'w4b40URwStw',a:'Game of Thrones',w:['The Witcher','Vikings','The Last Kingdom','Rom','Sagan om ringen'],fq:'Var utspelar sig det mesta av serien?',fa:'Westeros',fw:['Narnia','Mordor','Azeroth']},
 {id:'0Z1XpfbuZOA',a:'Pirates of the Caribbean',w:['Master and Commander','Hook','Skattkammarplaneten','Black Sails','The Mummy'],fq:'Vad heter Johnny Depps rollfigur?',fa:'Jack Sparrow',fw:['Will Turner','Hector Barbossa','Davy Jones']},
 {id:'CxwTLktovTU',a:'Toy Story',w:['Monsters Inc.','Hitta Nemo','Bilar','Antz','Ett småkryps liv'],fq:'Vad heter pojken som äger leksakerna i första filmen?',fa:'Andy',fw:['Sid','Bonnie','Billy']},
 {id:'lFzVJEksoDY',a:'Lejonkungen',w:['Djungelboken','Bambi','Tarzan','Madagaskar','Brother Bear'],fq:'Vad heter Simbas elaka farbror?',fa:'Scar',fw:['Mufasa','Zazu','Timon']},
 {id:'r6IrEPCplxQ',a:'Bonusfamiljen',w:['Solsidan','Fjällen','Vår tid är nu','Älska mig','Rebecka Martinsson'],fq:'Vilken kanal gjorde serien?',fa:'SVT',fw:['TV4','Netflix','Viaplay']},
 {id:'aJFdePDqKrY',a:'Kopps',w:['Jönssonligan','Hassel','Beck','Snabba Cash','Fyra nyanser av brunt'],fq:'I vilken påhittad ort utspelar sig filmen?',fa:'Högboda',fw:['Hassela','Valleby','Lönneberga']},
 {id:'grNWo3dmzyE',a:'High School Musical',w:['Camp Rock','Hairspray','Glee','Pitch Perfect','Step Up'],fq:'Vad heter Zac Efrons rollfigur?',fa:'Troy',fw:['Ryan','Chad','Jason']},
 {id:'PbA63a7H0bo',a:'Hungerspelen',w:['Divergent','Maze Runner','Twilight','Battle Royale','The Giver'],fq:'Vad heter huvudpersonen?',fa:'Katniss',fw:['Peeta','Primrose','Tris']},
 {id:'TcMBFSGVi1c',a:'Avengers: Endgame',w:['Justice League','Iron Man','Thor','Guardians of the Galaxy','Doctor Strange'],fq:'Vem är huvudskurken?',fa:'Thanos',fw:['Loki','Ultron','Red Skull']},
 {id:'unRfqHQFl9o',a:'Squid Game',w:['Alice in Borderland','The Hunger Games','Money Heist','All of Us Are Dead','Kingdom'],fq:'Vilket land kommer serien från?',fa:'Sydkorea',fw:['Japan','Kina','Thailand']},
...SCENES];
import {EMOJI2} from './extra2';
const E=`🧙⚡🦉|Harry Potter|Sagan om ringen|Narnia|Merlin
👹💚🏰|Shrek|Hulken|Grinchen|Trolls
🧊👸⛄|Frost|Snövit|Modig|Vaiana
🦁👑🌅|Lejonkungen|Madagaskar|Tarzan|Djungelboken
🐠🔍🌊|Hitta Nemo|Lilla sjöjungfrun|Hajen|Moana
🚢💔🧊|Titanic|Pearl Harbor|Poseidon|Kapten Phillips
🕷️🧑🏙️|Spider-Man|Batman|Antman|Venom
🦇🌃🃏|The Dark Knight|Spider-Man|Superman|Iron Man
🏴‍☠️⚓💀|Pirates of the Caribbean|Peter Pan|Treasure Island|Kapten Sabeltand
🧛🌲💍|Twilight|Dracula|Vampire Diaries|Underworld
🏹🔥👧|Hunger Games|Modig|Divergent|Robin Hood
💍🌋🧝|Sagan om ringen|Narnia|Hobbit-spelet|Avatar
👨‍👩‍👧🌊🐳|Vaiana|Moby Dick|Free Willy|Hitta Doris
👻🔫🚫|Ghostbusters|Men in Black|Casper|Scooby-Doo
👽🚲🌕|E.T.|Interstellar|Men in Black|Alien
🦖🏝️🚙|Jurassic Park|King Kong|Ice Age|Godzilla
🧸🤠🚀|Toy Story|Cars|Monsters Inc.|Up
🐀👨‍🍳🍲|Råttatouille|Shrek|Stuart Little|Chef
🏠🎈👴|Up|Coco|Cars|Toy Story
👸💤🍎|Snövit|Törnrosa|Askungen|Frost
💊🕶️💻|The Matrix|Inception|Tron|Blade Runner
🥊🐯🎶|Rocky|Creed|Karate Kid|Fight Club
🃏💰🎰|Ocean's Eleven|Casino Royale|Rain Man|Hangover
🐝👔☎️|Bee Movie|Antz|Flushed Away|Madagaskar
👧🔴🧦|Pippi Långstrump|Ronja Rövardotter|Emil i Lönneberga|Madicken
👦🪵🔨|Emil i Lönneberga|Pippi Långstrump|Bert|Sune
🐻🍯💪|Bamse|Nalle Puh|Paddington|Baloo
🧓🚪🪟|Hundraåringen|En man som heter Ove|Solsidan|Sune
🏡⛵🍷|Solsidan|Bonusfamiljen|Beck|Hipphipp
🧪🚐💵|Breaking Bad|Ozark|Narcos|Dexter
🔴🟢🦑|Squid Game|Stranger Things|Alice in Borderland|Black Mirror
👑🇬🇧🐕|The Crown|Downton Abbey|Bridgerton|Victoria
🐉👑❄️|Game of Thrones|The Witcher|Vikings|Merlin
☕🛋️👫|Vänner|How I Met Your Mother|New Girl|Seinfeld
📎🏢😐|The Office|Silicon Valley|Parks and Rec|Suits
🧽🍍🌊|Svampbob Fyrkant|Hitta Nemo|Kalle Anka|Moana
🔵⚡🐭|Pokémon|Digimon|Tom och Jerry|Musse Pigg`;
export const EMOJI=[...E.split('\n').map(l=>{const[e,a,...w]=l.split('|');return{emoji:e,a,w}}),...EMOJI2];
