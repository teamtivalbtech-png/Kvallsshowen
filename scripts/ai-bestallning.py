# Skapar scripts/ai-bestallning.md med repliker som saknar röst.
import re,json,glob
def h(s):
    x=5381
    for c in s:
        x=((x*33)&0xffffffff)^ord(c)
    d='0123456789abcdefghijklmnopqrstuvwxyz';o=''
    while x:o=d[x%36]+o;x//=36
    return o
v=set(json.load(open('src/content/voice.json')))
lines=[]
for f in glob.glob('src/games/*.tsx'):
    t=open(f).read()
    for m in re.finditer(r"\{id:'(\w+)',title:(?:'([^']+)'|\"([^\"]+)\"),tag:'[^']*',how:'([^']+)'",t):
        n=m.group(2) or m.group(3);tt=re.sub(r'[!?]+$','',n)+'!';lines.append(f"{tt} {m.group(4)}")
c=open('src/content/maffia.ts').read()
for m in re.finditer(r"^\{i:'.*?d:\[(.*)\]\},$",c,re.M):lines.append(' '.join(re.findall(r"'([^']*)'",m.group(1))))
lines+=re.findall(r"t:'((?:Dags|Diskussion)[^']*)'",c)
seen=[]
for l in lines:
    if l not in seen and h(l) not in v:seen.append(l)
out=['''# Beställning till Kvällsshowen: nya röster

Spelen har fått sina riktiga namn, så de här replikerna behöver spelas in på nytt. Lägg in dem i repot `teamtivalbtech-png/Kvallsshowen` på grenen `main`.

Röst: ElevenLabs, modell `elevenlabs_v4_turbo`, röstpreset Callum (`858499d9-fef5-40e1-bc29-b4dc661dc283`), standardinställningar via Higgsfield. Svenska, men spelnamnen sägs på originalspråket.

Gör en mp3 per rad. Spara som `public/voice/<filnamn>.mp3`. Lägg också till filnamnet utan .mp3 i listan `src/content/voice.json`, annars används filen inte. Ändra inte texten, inte ens ett tecken. Filnamnet räknas fram ur exakt den texten.

| Filnamn | Text |
|---|---|''']
for l in seen:out.append(f"| {h(l)}.mp3 | {l} |")
open('scripts/ai-bestallning.md','w').write('\n'.join(out)+'\n');print(len(seen))
