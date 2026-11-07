# Beställning till Kvällsshowen: nya röster

Spelen har fått sina riktiga namn, så de här replikerna behöver spelas in på nytt. Lägg in dem i repot `teamtivalbtech-png/Kvallsshowen` på grenen `main`.

Röst: ElevenLabs, modell `elevenlabs_v4_turbo`, röstpreset Callum (`858499d9-fef5-40e1-bc29-b4dc661dc283`), standardinställningar via Higgsfield. Svenska, men spelnamnen sägs på originalspråket.

Gör en mp3 per rad. Spara som `public/voice/<filnamn>.mp3`. Lägg också till filnamnet utan .mp3 i listan `src/content/voice.json`, annars används filen inte. Ändra inte texten, inte ens ett tecken. Filnamnet räknas fram ur exakt den texten.

| Filnamn | Text |
|---|---|
| mfos2q.mp3 | Charader! En mimar, laget gissar. Spelledaren väljer tid, rundor och lag. |
