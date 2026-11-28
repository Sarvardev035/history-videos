// node render.js <episode.js> <out.mp4> <audio.wav>      -> full video (30 fps)
// node render.js <episode.js> preview <dir> 1.0,2.5,...   -> PNG frames for checking
// node render.js <episode.js> meta                         -> prints {DUR,CUES,MUSIC,THUMB_T} JSON
const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');const path=require('path');
(async()=>{
 const [ep,mode,a3,a4]=process.argv.slice(2);
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
 await p.goto('file://'+path.join(__dirname,'comic.html'));
 await p.addScriptTag({content:fs.readFileSync(ep,'utf8')+'\nwindow.DUR=DUR;window.CUES=CUES;window.MUSIC=typeof MUSIC!=="undefined"?MUSIC:{};window.THUMB_T=typeof THUMB_T!=="undefined"?THUMB_T:DUR/2;'});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 if(mode==='meta'){console.log(JSON.stringify(await p.evaluate(()=>({DUR,CUES,MUSIC,THUMB_T}))));}
 else if(mode==='preview'){fs.mkdirSync(a3,{recursive:true});for(const t of a4.split(',').map(Number)){await p.evaluate(t=>render(t),t);await p.screenshot({path:`${a3}/f_${t.toFixed(2)}.png`})}}
 else if(mode==='thumb'){const T=await p.evaluate(()=>THUMB_T);await p.evaluate(t=>render(t),T);await p.screenshot({path:a3,type:'jpeg',quality:92})}
 else{const out=mode,audio=a3;const DUR=await p.evaluate(()=>DUR);const fps=30,N=Math.round(DUR*fps);
  const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate',''+fps,'-i','-','-i',audio,'-c:v','libx264','-vf','format=yuv420p','-profile:v','high','-g','60','-crf','21','-preset','medium','-maxrate','6M','-bufsize','12M','-r',''+fps,'-c:a','aac','-b:a','160k','-ar','48000','-ac','2','-shortest','-movflags','+faststart',out],{stdio:['pipe','ignore','inherit']});
  for(let i=0;i<N;i++){await p.evaluate(t=>render(t),i/fps);const buf=await p.screenshot({type:'jpeg',quality:93});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%150==0)console.error(`frame ${i}/${N}`)}
  ff.stdin.end();await new Promise(r=>ff.on('close',r));}
 if(errs.length)console.error('PAGE ERRORS:',errs.slice(0,5));
 await b.close();})();
