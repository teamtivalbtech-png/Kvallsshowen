# Beställning till Kvällsshowen: röster och en bild

Lägg in allt i repot `teamtivalbtech-png/Kvallsshowen` på grenen `main`.

## Röster
Röst: ElevenLabs, modell `elevenlabs_v4_turbo`, röstpreset Callum (`858499d9-fef5-40e1-bc29-b4dc661dc283`), standardinställningar via Higgsfield. Svenska, men spelnamnen sägs på originalspråket.

Gör en mp3 per rad. Spara som `public/voice/<filnamn>.mp3`. Lägg också till filnamnet utan .mp3 i listan `src/content/voice.json`, annars används filen inte. Ändra inte texten, inte ens ett tecken. Filnamnet räknas fram ur exakt den texten.

| Filnamn | Text |
|---|---|
| rfdqyk.mp3 | Vem valde låten! Alla väljer en låt i hemlighet. Låtarna spelas, och ni gissar vem som valde vilken. |
| 1mbx1na.mp3 | DJ-duellen! Två spelare väljer varsin låt till ett tema. Båda spelas, och publiken röstar fram vinnaren. |
| 1c80dm7.mp3 | Topp eller flopp! Två jättehits spelas. Gissa vilken som har flest strömmar på Spotify. |
| 1bxzg1g.mp3 | Filmster! Placera filmen rätt i tiden efter premiärår och bli först till målet. Spelas i 2 till 6 lag. |

## Bild
Spara som jpg i `public/art/`, 1920×1080, under 500 kB. Ingen text i bilden, inga riktiga personer, inga varumärken. Stil: lyxig svensk tv-gameshow, lila och guld, filmisk ljussättning. Tv:n lägger en mörk ton över, så bilden får gärna vara tydlig. Den är redan inkopplad och syns direkt när den ligger på plats.

| Fil | Prompt |
|---|---|
| filmster.jpg | Giant glowing timeline of film reels and clapperboards across a purple TV stage, golden spotlights, old cinema projector beams, popcorn atmosphere, wide empty center, cinematic, no people, no text |
