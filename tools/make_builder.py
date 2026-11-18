#!/usr/bin/env python3
"""Make the owner-only Enemy Builder: index.html + tools/enemy-builder.js.html -> enemy-builder.html (never shipped to players).
Usage: python3 tools/make_builder.py [out]   (default /mnt/user-data/outputs/enemy-builder.html)"""
import sys,os
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out=sys.argv[1] if len(sys.argv)>1 else '/mnt/user-data/outputs/enemy-builder.html'
s=open(os.path.join(root,'index.html'),encoding='utf-8').read()
b=open(os.path.join(root,'tools','enemy-builder.js.html'),encoding='utf-8').read()
# the builder opens straight away in this copy and has no Settings button
b=b.replace('if(location.hash=="#builder")','if(true)')
i=s.rindex('</body>');open(out,'w',encoding='utf-8').write(s[:i]+b+s[i:]);print('wrote',out)
