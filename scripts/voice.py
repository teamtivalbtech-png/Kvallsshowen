# Spelar in programledarens fasta repliker med den öppna svenska Piper-rösten (CC0-dataset).
import re,json,subprocess,glob,os,sys
def h(s):
    x=5381
    for c in s: x=(((x*33)&0xffffffff)^ord(c))&0xffffffff
    d='0123456789abcdefghijklmnopqrstuvwxyz';r=''
    while x: r=d[x%36]+r;x//=36
    return r or '0'
L=[]
src=open('src/host.ts').read()
for m in re.finditer(r"'([^'\n]{6,})'",src[src.index('export const LINES'):]): L.append(m.group(1))
L+= [f'På plats {p}!' for p in range(1,13)]
for f in glob.glob('src/games/*.tsx'):
    for m in re.finditer(r"title:'([^']+)',tag:'[^']*',how:'([^']+)'",open(f).read()): L.append(f'{m.group(1)}! {m.group(2)}')
L=sorted(set(L));os.makedirs('public/voice',exist_ok=True);print(len(L))
for t in L:
    k=h(t);w=f'/tmp/tts/{k}.wav'
    if not os.path.exists(f'public/voice/{k}.mp3'):
        subprocess.run([sys.executable,'-m','piper','-m','/tmp/tts/sv.onnx','-f',w,'--length-scale','0.92'],input=t.encode(),capture_output=True,check=True)
        subprocess.run(['ffmpeg','-y','-loglevel','error','-i',w,'-ac','1','-b:a','64k',f'public/voice/{k}.mp3'],check=True)
json.dump([h(t) for t in L],open('src/content/voice.json','w'))
