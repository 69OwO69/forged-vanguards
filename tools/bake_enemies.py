#!/usr/bin/env python3
"""Bake exported enemy designs into the game: reads the builder's Export JSON and writes it into index.html as CAMPD.
Also saves the designs to tools/campaign-enemies.json (the source of truth; merged, never replaced by a partial export).
Usage: python3 tools/bake_enemies.py exported.json"""
import sys,os,json,re
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
new=json.load(open(sys.argv[1])); new=new.get('designs',new)
src=os.path.join(root,'tools','campaign-enemies.json')
cur=json.load(open(src)) if os.path.exists(src) else {}
cur.update(new)
json.dump(cur,open(src,'w'),indent=1,sort_keys=True)
p=os.path.join(root,'index.html');s=open(p,encoding='utf-8').read()
a=s.index('const CAMPD=');e=s.index(';',a)
s=s[:a]+'const CAMPD='+json.dumps(cur,separators=(',',':'))+s[e:]
open(p,'w',encoding='utf-8').write(s);print(len(cur),'designs baked')
