/* Safety net: node tools/check.js [--update-art]   (needs playwright: NODE_PATH=$(npm root -g)) */
const fs=require('fs'),crypto=require('crypto'),path=require('path');
const {chromium}=require('playwright');
const F=path.join(__dirname,'..','index.html'),SHA=path.join(__dirname,'art.sha.json');
let fails=0,warns=0;const ok=m=>console.log('  ok   '+m),bad=m=>{fails++;console.log('  FAIL '+m)},wn=m=>{warns++;console.log('  warn '+m)};
(async()=>{
const t=fs.readFileSync(F,'utf8');
console.log('1. embedded art & sound');
const re=/data:(image|audio)\/([a-z0-9+.-]+);base64,([A-Za-z0-9+\/=]+)/g;let m,n=0,badn=0;const hs=[];
const magic={png:b=>b[0]==0x89&&b[1]==0x50,webp:b=>b.slice(0,4).toString()=='RIFF'&&b.slice(8,12).toString()=='WEBP',jpeg:b=>b[0]==0xff&&b[1]==0xd8,jpg:b=>b[0]==0xff&&b[1]==0xd8,gif:b=>b.slice(0,3).toString()=='GIF',mpeg:b=>b.slice(0,3).toString()=='ID3'||(b[0]==0xff&&(b[1]&0xe0)==0xe0),mp3:b=>b.slice(0,3).toString()=='ID3'||(b[0]==0xff&&(b[1]&0xe0)==0xe0)};
while((m=re.exec(t))){n++;const b=Buffer.from(m[3],'base64');const k=magic[m[2]];if(b.length<20||(k&&!k(b))){badn++;if(badn<6)bad('bad header: '+m[1]+'/'+m[2]+' at '+m.index)}hs.push(crypto.createHash('sha1').update(m[3]).digest('hex').slice(0,12))}
badn?bad(badn+' of '+n+' broken'):ok(n+' files decode with valid headers');
const cur=hs.join(',');let old=null;try{old=JSON.parse(fs.readFileSync(SHA,'utf8'))}catch(e){}
if(process.argv.includes('--update-art')||!old){fs.writeFileSync(SHA,JSON.stringify({n:hs.length,h:hs}));ok('art fingerprint saved ('+hs.length+')')}
else{const os=new Set(old.h),ns=new Set(hs);const ch=[...os].filter(x=>!ns.has(x)).length,ad=[...ns].filter(x=>!os.has(x)).length;
 if(ch)bad(ch+' existing art/sound files CHANGED or removed (new: '+ad+'). If intended run with --update-art');else ok('no existing art changed'+(ad?' ('+ad+' new added; run --update-art to record)':''))}
console.log('2. page, rules, resolutions');
const b=await chromium.launch(),p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+F);await p.waitForTimeout(4000);
errs.length?bad('script errors: '+errs.slice(0,3).join(' | ')):ok('loads, no script errors');
const R=await p.evaluate(()=>{const o={ms:[],ev:[],lv:[],unc:0,up:[]};
for(let i=0;i<W.length;i++){const w=W[i];if(!w||w.gone&&!w.bo)continue;if(w.shots>1&&w.dr&&w.dr[0]!=w.dr[1]){if(Math.round(w.dr[0]*w.shots)==Math.round(w.dr[1]*w.shots))o.ms.push(i+" "+w.n)}
 if(!w.nou&&!w.drone&&!w.hook&&!w.chrg&&w.cost!=null&&!LVMASK["w"+i])o.lv.push("w"+i+" "+w.n);
 if(w.uses==null&&!w.nou&&!w.drone&&w.shots!=null)o.unc++}
for(const k in EVO){const [kk,i]=k.split(":");if(!K[kk][i]||!K[kk][EVO[k]])o.ev.push(k)}
return o});
R.ms.length?bad('multi-shot range collapses when rounded: '+R.ms.slice(0,8).join(', ')):ok('multi-shot damage ranges survive rounding');
{const tpf=new Set(((t.match(/const TPF="([^"]*)"/)||[])[1]||'').split(',')),all=[...new Set([...t.replace(/[A-Za-z0-9+\/=]{120,}/g,'B').matchAll(/if\(!S\.(\w+)\)\{S\.\1=1/g)].map(x=>x[1]))],miss=all.filter(f=>!tpf.has(f));
 miss.length?bad('one-time grant flags missing from TPF (a new test profile would receive them): '+miss.join(', ')):ok('test profile skips all '+all.length+' owner auto-grants')}
R.ev.length?bad('EVO entries point at missing items: '+R.ev.join(', ')):ok('evolution table valid');
R.lv.length?wn(R.lv.length+' guns without colour-change mask (e.g. '+R.lv.slice(0,4).join(', ')+')'):ok('all guns have colour-change art');
for(const [w,h] of [[1280,720],[1366,768],[1440,900],[1600,900],[1920,1080],[2560,1440]]){await p.setViewportSize({width:w,height:h});
 const r=await p.evaluate(async()=>{const o=[];const sz=()=>{const d=document.documentElement;return d.scrollWidth>innerWidth+1||d.scrollHeight>innerHeight+1};
 for(const v of["work","camp","store","menu","prof"]){try{show(v)}catch(e){o.push(v+" threw "+e.message);continue}await new Promise(r=>setTimeout(r,250));if(sz())o.push(v+" page overflows")}
 try{show("work");const it=[];for(const i of S.own.w)for(const c of XS("w",i))it.push([i,c]);const tg=it.find(([i,c])=>!eqAny(c.u)&&RI("w",i)==2);if(tg){tg[1].x=MAXP[2]-100;FZ={k:"w",i:tg[0],u:tg[1].u,ix:{},cat:"top"};fzRender();const f=it.find(([i,c])=>c.u!==tg[1].u&&fzOK("w",i,c.u));if(f)fzPick("w:"+f[0]+":"+f[1].u);await new Promise(r=>setTimeout(r,300));const m=document.querySelector("#fzm");if(m&&m.scrollHeight>m.clientHeight+1)o.push("upgrade panel scrolls/clips");FZ=null;fzRender()}}catch(e){o.push("fuse threw "+e.message)}
 show("hangar");return o});
 r.length?bad(w+'x'+h+': '+r.join('; ')):ok(w+'x'+h+' no overflow (Workshop, map, shop, menu, profile, upgrade)')}
await b.close();
console.log('\n'+(fails?'FAILED ('+fails+' problems)':'PASSED')+(warns?', '+warns+' warnings':''));process.exit(fails?1:0)})();
