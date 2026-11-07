// Topp eller flopp: Spotifys mest strömmade låtar, miljarder strömmar enligt Wikipedia (List of Spotify streaming records) den 6 september 2026.
// s = sökartist för ljudklippet, a = artist som visas.
export const STREAMS_AT='september 2026';
const S=`Blinding Lights|The Weeknd|5.578
Shape of You|Ed Sheeran|5.083
Sweater Weather|The Neighbourhood|4.857
Starboy|The Weeknd|4.740
As It Was|Harry Styles|4.610
One Dance|Drake|4.451
Sunflower|Post Malone|4.440
Someone You Loved|Lewis Capaldi|4.428
Perfect|Ed Sheeran|4.100
Stay|The Kid LAROI|4.065
I Wanna Be Yours|Arctic Monkeys|3.982
Birds of a Feather|Billie Eilish|3.963
Die With A Smile|Lady Gaga|3.962
Yellow|Coldplay|3.960
Believer|Imagine Dragons|3.953
Heat Waves|Glass Animals|3.918
The Night We Met|Lord Huron|3.915
Riptide|Vance Joy|3.893
Lovely|Billie Eilish|3.869
Closer|The Chainsmokers|3.868
Something Just Like This|The Chainsmokers|3.763
Every Breath You Take|The Police|3.734
Say You Won't Let Go|James Arthur|3.688
Another Love|Tom Odell|3.685
Iris|The Goo Goo Dolls|3.680
Counting Stars|OneRepublic|3.633
Take Me to Church|Hozier|3.579
Photograph|Ed Sheeran|3.541
Dance Monkey|Tones and I|3.506
Viva La Vida|Coldplay|3.505
Can't Hold Us|Macklemore & Ryan Lewis|3.491
Cruel Summer|Taylor Swift|3.477
Locked Out of Heaven|Bruno Mars|3.466
Just the Way You Are|Bruno Mars|3.460
Mr. Brightside|The Killers|3.452
Rockstar|Post Malone|3.447
Señorita|Shawn Mendes|3.412
Die For You|The Weeknd|3.405
Watermelon Sugar|Harry Styles|3.390
That's What I Like|Bruno Mars|3.381
Love Yourself|Justin Bieber|3.352
In the End|Linkin Park|3.351
Don't Start Now|Dua Lipa|3.315
When I Was Your Man|Bruno Mars|3.284
Bohemian Rhapsody|Queen|3.263
Circles|Post Malone|3.261
Wake Me Up|Avicii|3.223
Without Me|Eminem|3.219
Billie Jean|Michael Jackson|3.215
Goosebumps|Travis Scott|3.213
Thinking Out Loud|Ed Sheeran|3.211
Let Me Love You|DJ Snake|3.210
Lucid Dreams|Juice WRLD|3.197
All of Me|John Legend|3.178
Espresso|Sabrina Carpenter|3.169
God's Plan|Drake|3.167
Shallow|Lady Gaga|3.164
All The Stars|Kendrick Lamar|3.158
Stressed Out|Twenty One Pilots|3.157
The Hills|The Weeknd|3.146
Beautiful Things|Benson Boone|3.141
Demons|Imagine Dragons|3.132
Do I Wanna Know?|Arctic Monkeys|3.116
Creep|Radiohead|3.111
Thunder|Imagine Dragons|3.104
See You Again|Tyler, The Creator|3.099
Treat You Better|Shawn Mendes|3.099
Seven|Jung Kook|3.075
Smells Like Teen Spirit|Nirvana|3.072
Sorry|Justin Bieber|3.065
Unforgettable|French Montana|3.059
Wonderwall|Oasis|3.047
No Role Modelz|J. Cole|3.029
505|Arctic Monkeys|3.014
Lose Yourself|Eminem|3.010
The Scientist|Coldplay|2.986
HUMBLE.|Kendrick Lamar|2.984
Flowers|Miley Cyrus|2.975
Don't Stop Believin'|Journey|2.974
There's Nothing Holdin' Me Back|Shawn Mendes|2.973
Bad Guy|Billie Eilish|2.972
Drivers License|Olivia Rodrigo|2.944
Dreams|Fleetwood Mac|2.924
End of Beginning|Djo|2.919
7 Rings|Ariana Grande|2.916
Take On Me|a-ha|2.909
Numb|Linkin Park|2.898
Let Her Go|Passenger|2.893
Kill Bill|SZA|2.885
Sweet Child O' Mine|Guns N' Roses|2.869
Payphone|Maroon 5|2.842
Save Your Tears|The Weeknd|2.831
Cold Heart|Elton John|2.805
Lean On|Major Lazer|2.793
One Kiss|Calvin Harris|2.781
Uptown Funk|Mark Ronson|2.777
Don't Stop Me Now|Queen|2.758
Danza Kuduro|Don Omar|2.748
Africa|Toto|2.747`;
export const STREAMS=S.split('\n').map(l=>{const[t,a,b]=l.split('|');return{t,a,b:+b}});
