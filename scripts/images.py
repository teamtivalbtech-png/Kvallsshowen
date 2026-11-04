import json,time,urllib.request,urllib.parse,re,sys,os
S=[("Eiffeltornet","Eiffel Tower Paris"),("Colosseum","Colosseum Rome exterior"),("Taj Mahal","Taj Mahal"),("Frihetsgudinnan","Statue of Liberty New York"),("Big Ben","Big Ben Westminster London"),("Vasaskeppet","Vasa ship museum Stockholm"),("Turning Torso","Turning Torso Malmo"),("Öresundsbron","Oresund Bridge"),("Globen","Ericsson Globe Stockholm"),("Golden Gate-bron","Golden Gate Bridge"),("Sagrada Família","Sagrada Familia Barcelona"),("Pyramiderna i Giza","Giza pyramids"),("Kinesiska muren","Great Wall of China"),("Operahuset i Sydney","Sydney Opera House"),("Lutande tornet i Pisa","Leaning Tower of Pisa"),("Machu Picchu","Machu Picchu"),("Stonehenge","Stonehenge"),("Brandenburger Tor","Brandenburg Gate"),("Akropolis","Acropolis Athens"),("Burj Khalifa","Burj Khalifa"),("Ananas","pineapple fruit closeup"),("Jordgubbe","strawberry fruit closeup"),("Kiwi","kiwi fruit cut"),("Kaffebönor","coffee beans closeup"),("Tändsticka","burning match"),("Dragkedja","zipper closeup"),("Tangentbord","computer keyboard closeup"),("Fotboll","football soccer ball"),("Dalahäst","Dala horse"),("Älg","moose Alces alces"),("Igelkott","hedgehog Erinaceus"),("Flamingo","flamingo bird"),("Kameleont","chameleon lizard"),("Sköldpadda","sea turtle"),("Papegoja","macaw parrot"),("Bi","honey bee closeup flower"),("Snöflinga","snowflake macro"),("Solros","sunflower closeup"),("Kaktus","saguaro cactus"),("Vinglas","red wine glass"),("Champagne","champagne glass bubbles"),("Hummer","lobster crustacean"),("Sushi","sushi plate"),("Pizza","pizza margherita"),("Ost","cheese wheel"),("Gitarr","acoustic guitar closeup"),("Piano","piano keys"),("Saxofon","saxophone closeup"),("Kassettband","audio cassette tape"),("Rubiks kub","Rubik's cube")]
out=json.load(open('src/content/imageCredits.json')) if os.path.exists('src/content/imageCredits.json') else [];have={o['name'] for o in out};os.makedirs('public/img',exist_ok=True)
def get(u):
    r=urllib.request.Request(u,headers={'User-Agent':'KvallsshowenBuilder/1.0 (party game)'})
    return urllib.request.urlopen(r,timeout=30).read()
for i,(sv,q) in enumerate(S):
    if sv in have: continue
    u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(dict(action='query',format='json',generator='search',gsrnamespace=6,gsrsearch=q+' filetype:bitmap',gsrlimit=8,prop='imageinfo',iiprop='url|extmetadata|size|mime',iiurlwidth=1280))
    d=None
    for a in range(5):
        try: d=json.loads(get(u));break
        except Exception as e: time.sleep(6+a*6)
    if not d: print('fail',sv,flush=True);continue
    pages=sorted(d.get('query',{}).get('pages',{}).values(),key=lambda p:p.get('index',99));ok=False
    for p in pages:
        ii=p.get('imageinfo',[{}])[0];m=ii.get('extmetadata',{});l=m.get('LicenseShortName',{}).get('value','')
        if ii.get('mime')!='image/jpeg' or ii.get('width',0)<1000 or ii.get('width',0)<ii.get('height',1): continue
        if not re.search(r'CC BY|CC0|Public domain',l,re.I) or 'NC' in l or 'ND' in l: continue
        try:
            b=get(ii['thumburl']);fn=f'{i:02d}.jpg';open('public/img/'+fn,'wb').write(b)
            a=re.sub('<[^>]+>','',m.get('Artist',{}).get('value','okänd')).strip()[:80]
            out.append(dict(file=fn,name=sv,license=l,author=a,source=ii['descriptionurl']));print('ok',sv,len(b),l,flush=True);ok=True;break
        except Exception as e: time.sleep(5)
    if not ok: print('none',sv,flush=True)
    time.sleep(2.5)
    json.dump(out,open('src/content/imageCredits.json','w'),ensure_ascii=False)
print(len(out))
