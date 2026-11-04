import json,time,urllib.request,urllib.parse,re,os
P=[("Visby","Visby ringmur Gotland city wall",57.64,18.29),("Kiruna","Kiruna town Sweden",67.86,20.23),("Abisko","Abisko national park",68.35,18.83),("Gamla stan","Gamla stan Stockholm street",59.32,18.07),("Liseberg","Liseberg Gothenburg",57.70,11.99),("Göteborgs hamn","Gothenburg harbour Barken Viking",57.71,11.97),("Lund","Lund Cathedral",55.70,13.19),("Ystad","Ystad Sweden town",55.43,13.82),("Falun","Falu gruva copper mine",60.60,15.61),("Mora","Siljan lake Dalarna",60.95,14.75),("Höga kusten","High Coast Sweden bridge",62.80,17.92),("Sälen","Salen ski Sweden",61.16,13.27),("Tromsø","Tromso Norway city",69.65,18.96),("Bergen","Bryggen Bergen Norway",60.40,5.32),("Köpenhamn","Nyhavn Copenhagen",55.68,12.59),("Helsingfors","Helsinki Cathedral",60.17,24.95),("Reykjavik","Hallgrimskirkja Reykjavik",64.14,-21.93),("Amsterdam","Amsterdam canal houses",52.37,4.89),("Paris","Louvre Paris",48.86,2.34),("Barcelona","Park Guell Barcelona",41.41,2.15),("Lissabon","Lisbon tram Alfama",38.71,-9.13),("Venedig","Venice Grand Canal",45.44,12.33),("Santorini","Oia Santorini",36.46,25.38),("Dubrovnik","Dubrovnik old town",42.64,18.11),("Prag","Charles Bridge Prague",50.09,14.41),("Istanbul","Hagia Sophia Istanbul",41.01,28.98),("Marrakech","Jemaa el-Fnaa Marrakech",31.63,-7.99),("Kairo","Cairo skyline Nile",30.05,31.24),("Kapstaden","Table Mountain Cape Town",-33.96,18.40),("Zanzibar","Zanzibar beach Stone Town",-6.16,39.19),("Dubai","Dubai Marina skyline",25.08,55.14),("Mumbai","Gateway of India Mumbai",18.92,72.83),("Bangkok","Wat Arun Bangkok",13.74,100.49),("Phuket","Phi Phi Thailand beach",7.74,98.77),("Bali","Tegallalang rice terrace Bali",-8.43,115.28),("Tokyo","Shibuya crossing Tokyo",35.66,139.70),("Kyoto","Fushimi Inari Kyoto",34.97,135.77),("Hongkong","Victoria Harbour Hong Kong",22.29,114.17),("Sydney","Bondi Beach Sydney",-33.89,151.27),("Uluru","Uluru Australia",-25.34,131.04),("Auckland","Auckland skyline",-36.85,174.76),("Honolulu","Waikiki Honolulu",21.28,-157.83),("Los Angeles","Hollywood sign",34.13,-118.32),("Las Vegas","Las Vegas Strip",36.11,-115.17),("Grand Canyon","Grand Canyon",36.1,-112.1),("New York","Times Square New York",40.76,-73.99),("Niagara","Niagara Falls",43.08,-79.07),("Havanna","Havana Cuba street",23.13,-82.38),("Cancún","Chichen Itza",20.68,-88.57),("Rio de Janeiro","Rio de Janeiro Sugarloaf",-22.95,-43.16),("Buenos Aires","Buenos Aires Obelisco",-34.60,-58.38)]
out=json.load(open('src/content/geo.json')) if os.path.exists('src/content/geo.json') else [];have={o['name'] for o in out};os.makedirs('public/geo',exist_ok=True)
def get(u):
    r=urllib.request.Request(u,headers={'User-Agent':'KvallsshowenBuilder/1.0 (party game)'});return urllib.request.urlopen(r,timeout=30).read()
for i,(n,q,la,lo) in enumerate(P):
    if n in have: continue
    u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(dict(action='query',format='json',generator='search',gsrnamespace=6,gsrsearch=q+' filetype:bitmap',gsrlimit=8,prop='imageinfo',iiprop='url|extmetadata|size|mime',iiurlwidth=1280))
    d=None
    for a in range(4):
        try: d=json.loads(get(u));break
        except Exception: time.sleep(6+a*6)
    if not d: print('fail',n,flush=True);continue
    ok=False
    for p in sorted(d.get('query',{}).get('pages',{}).values(),key=lambda p:p.get('index',99)):
        ii=p.get('imageinfo',[{}])[0];m=ii.get('extmetadata',{});l=m.get('LicenseShortName',{}).get('value','')
        if ii.get('mime')!='image/jpeg' or ii.get('width',0)<1000 or ii.get('width',0)<ii.get('height',1): continue
        if not re.search(r'CC BY|CC0|Public domain',l,re.I) or 'NC' in l or 'ND' in l: continue
        try:
            fn=f'{i:02d}.jpg';open('public/geo/'+fn,'wb').write(get(ii['thumburl']))
            a=re.sub('<[^>]+>','',m.get('Artist',{}).get('value','okänd')).strip()[:70]
            out.append(dict(file=fn,name=n,lat=la,lng=lo,license=l,author=a));print('ok',n,flush=True);ok=True;break
        except Exception: time.sleep(4)
    time.sleep(2.2);json.dump(out,open('src/content/geo.json','w'),ensure_ascii=False)
print(len(out))
