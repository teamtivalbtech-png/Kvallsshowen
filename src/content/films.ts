// Filmster: kända filmer och deras premiärår (första biopremiären). titel|år|emoji
const F=`Titanic|1997|🚢
Avatar|2009|🌿
The Matrix|1999|🕶️
Jurassic Park|1993|🦖
Stjärnornas krig|1977|⭐
Tillbaka till framtiden|1985|⏰
E.T.|1982|👽
Hajen|1975|🦈
Gudfadern|1972|🌹
Pulp Fiction|1994|🍔
Forrest Gump|1994|🏃
Lejonkungen (tecknad)|1994|🦁
Toy Story|1995|🤠
Shrek|2001|🟢
Hitta Nemo|2003|🐠
Frost|2013|❄️
Harry Potter och de vises sten|2001|⚡
Sagan om ringen: Härskarringen|2001|💍
Pirates of the Caribbean: Svarta Pärlans förbannelse|2003|🏴‍☠️
The Dark Knight|2008|🦇
Inception|2010|🌀
Interstellar|2014|🪐
The Avengers|2012|🛡️
Avengers: Endgame|2019|🧤
Iron Man|2008|🤖
Black Panther|2018|🐾
Joker|2019|🃏
Barbie|2023|💖
Oppenheimer|2023|💥
Dune (med Timothée Chalamet)|2021|🏜️
Top Gun|1986|✈️
Top Gun: Maverick|2022|🛩️
Mamma Mia!|2008|🎤
Grease|1978|🚗
Dirty Dancing|1987|💃
Pretty Woman|1990|👠
Ensam hemma|1990|🏠
Gladiator|2000|⚔️
Braveheart|1995|🏴
Rocky|1976|🥊
Terminator 2|1991|🤖
Alien|1979|👾
Die Hard|1988|🔫
Ghostbusters (originalet)|1984|👻
Jakten på den försvunna skatten|1981|🤠
Fight Club|1999|🧼
Seven|1995|📦
The Shining|1980|🪓
Psycho (Hitchcock)|1960|🚿
Casablanca|1942|🎹
Trollkarlen från Oz|1939|👠
Snövit och de sju dvärgarna|1937|🍎
Aladdin (tecknad)|1992|🧞
Skönheten och odjuret (tecknad)|1991|🌹
Den lilla sjöjungfrun (tecknad)|1989|🧜
Mulan (tecknad)|1998|🐉
Monsters, Inc.|2001|👹
Upp|2009|🎈
Coco|2017|💀
Insidan ut|2015|😊
Bilar|2006|🏎️
Råttatouille|2007|🐀
WALL-E|2008|🌱
Madagaskar|2005|🦓
Ice Age|2002|🐿️
Dumma mej|2010|🍌
Kung Fu Panda|2008|🐼
Spider-Man|2002|🕷️
Batman Begins|2005|🦇
The Hunger Games|2012|🏹
Twilight|2008|🧛
The Fast and the Furious|2001|🏁
Mean Girls|2004|💅
Superbad|2007|🍺
Baksmällan|2009|🐯
Notting Hill|1999|📚
Love Actually|2003|🎄
La La Land|2016|🎹
The Greatest Showman|2017|🎪
Bohemian Rhapsody|2018|👑
Parasit|2019|🪨
Get Out|2017|☕
It|2017|🎈
The Wolf of Wall Street|2013|💰
Django Unchained|2012|🤠
Kill Bill: Vol. 1|2003|🗡️
Inglourious Basterds|2009|🎬
The Social Network|2010|💻
Slumdog Millionaire|2008|💵
Gravity|2013|🛰️
Mad Max: Fury Road|2015|🔥
John Wick|2014|🐶
Deadpool|2016|🗯️
Guardians of the Galaxy|2014|🌌
Djävulen bär Prada|2006|👜
Legally Blonde|2001|💗
Clueless|1995|🛍️
Scream|1996|📞
Sjätte sinnet|1999|👁️
Rädda menige Ryan|1998|🪖
Schindlers list|1993|🕯️
När lammen tystnar|1991|🦋
Gremlins|1984|🐾
Ghost|1990|🏺
Men in Black|1997|🕶️
Independence Day|1996|🛸
Armageddon|1998|☄️
Pearl Harbor|2001|⚓
Dagboken|2004|📓
Avatar: The Way of Water|2022|🌊
Frost 2|2019|❄️
Encanto|2021|🦋
Vaiana|2016|🌊
Zootropolis|2016|🦊
Spider-Man: No Way Home|2021|🕸️
Wicked|2024|🧙
Insidan ut 2|2024|😰
Everything Everywhere All at Once|2022|🥯
Jumanji|1995|🎲
Space Jam|1996|🏀
Matilda|1996|📚
Mrs. Doubtfire|1993|👵
Midsommar|2019|🌼
Fucking Åmål|1998|🏫
Jalla! Jalla!|2000|🌯
Tillsammans|2000|☮️
Så som i himmelen|2004|🎶
Låt den rätte komma in|2008|🩸
Män som hatar kvinnor|2009|🐉
Snabba Cash|2010|💸
En man som heter Ove|2015|👴
Hundraåringen som klev ut genom fönstret och försvann|2013|🪟
Solsidan|2017|☀️
Sällskapsresan|1980|🌴
Varning för Jönssonligan|1981|💣
Ronja Rövardotter|1984|🌲
Mitt liv som hund|1985|🐕
Bröderna Lejonhjärta|1977|🦁
Emil i Lönneberga|1971|🧢
Kopps|2003|🚓
Smala Sussie|2003|🚬
Triangle of Sadness|2022|🛥️
The Square|2017|🔲`;
export const FILMS=F.split('\n').map(l=>{const[t,y,e]=l.split('|');return{t,a:'',y:+y,e}});
