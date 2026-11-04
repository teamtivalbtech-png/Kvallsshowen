import asyncio,sys,json,random
from playwright.async_api import async_playwright
from PIL import Image,ImageFilter
import numpy as np
def coef(src,dst):
    A=[];B=[]
    for (x,y),(u,v) in zip(dst,src):
        A+= [[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]];B+=[u,v]
    return np.linalg.solve(np.array(A,float),np.array(B,float))
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();c=await b.new_context(viewport={'width':1920,'height':1080});tv=await c.new_page()
        await tv.goto('http://localhost:4173/tv?local=1');await tv.wait_for_function('window.__show')
        code=await tv.evaluate('__show.code')
        ph=[]
        for n in ['A','B']:
            q=await c.new_page();await q.goto(f'http://localhost:4173/?r={code}&local=1&n={n}');ph.append(q)
        await tv.wait_for_function('__show.players.length==2')
        await tv.evaluate("__show.startSingle('duck');__show.next()");await tv.wait_for_timeout(1800)
        await tv.screenshot(path='/tmp/shots/duck-real.png')
        sq=await tv.evaluate("(()=>{const r=[...document.querySelectorAll('.dsq')].map(e=>{const b=e.getBoundingClientRect();return[b.x,b.y,b.width,b.height]});return r})()")
        print('paneler',sq)
        im=Image.open('/tmp/shots/duck-real.png').convert('RGB')
        res=[]
        for t,(s,base) in enumerate([(0,101),(1,111)]*4):
            x0,y0,W,H=sq[s]
            # kamera 2.5 m från tv: paneln täcker 45–65 % av bildhöjden, lutad
            scale=random.uniform(.5,.75)*480/H
            cx,cy=random.uniform(250,390),random.uniform(190,290)
            ang=random.uniform(-.25,.25);sk=random.uniform(-.12,.12)
            def pt(u,v):
                dx=(u-.5)*W*scale;dy=(v-.5)*H*scale;persp=1+sk*(u-.5)
                return (cx+(dx*np.cos(ang)-dy*np.sin(ang))*persp,cy+(dx*np.sin(ang)+dy*np.cos(ang))*persp)
            dst=[pt(0,0),pt(1,0),pt(1,1),pt(0,1)]
            src=[(x0,y0),(x0+W,y0),(x0+W,y0+H),(x0,y0+H)]
            k=coef(src,dst)
            cam=im.transform((640,480),Image.PERSPECTIVE,tuple(k),Image.BILINEAR).filter(ImageFilter.GaussianBlur(.7))
            # brus och skärmljus
            a=np.array(cam).astype(float)*random.uniform(.7,1)+np.random.normal(0,6,(480,640,3));cam=Image.fromarray(a.clip(0,255).astype('uint8'))
            # sann riktpunkt: invers homografi
            H1=np.linalg.inv(np.array(list(k)+[1.0]).reshape(3,3)@np.eye(3)) if False else None
            kk=np.array(list(k)+[1.0]).reshape(3,3);v=kk@np.array([320,240,1.0]);tx,ty=(v[0]/v[2]-x0)/W,(v[1]/v[2]-y0)/H
            cam.save('/tmp/shots/cam.jpg',quality=80)
            import base64;d='data:image/jpeg;base64,'+base64.b64encode(open('/tmp/shots/cam.jpg','rb').read()).decode()
            r=await tv.evaluate("""async ([d,base])=>{const i=new Image();i.src=d;await i.decode();const c=document.createElement('canvas');c.width=640;c.height=480;const x=c.getContext('2d');x.drawImage(i,0,0);const det=new AR.Detector({dictionaryName:'ARUCO',maxHammingDistance:2});const t=performance.now();const m=det.detect(x.getImageData(0,0,640,480));const ms=performance.now()-t;return {r:__locate(m,base,320,240),ms,ids:m.map(q=>q.id)}}""",[d,base])
            e=None if not r['r'] else float(np.hypot(r['r']['x']-tx,r['r']['y']-ty));res.append(e);print(t,'mål',round(tx,3),round(ty,3),'fick',r['r'] and (round(r['r']['x'],3),round(r['r']['y'],3)),'fel',e and round(e,3),'ms',round(r['ms']),r['ids'],'skala',round(scale,2))
        await b.close();ok=[e for e in res if e is not None];print('låst',len(ok),'/',len(res),'medelfel',sum(ok)/max(1,len(ok)))
asyncio.run(main())
