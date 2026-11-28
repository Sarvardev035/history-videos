// Episode 2: "Midnight Fridge" — secret-world reveal. A tiny kid sneaks to the fridge at night and finds the food throwing a neon party.
const DUR=23.6, THUMB_T=9.2;
const BEAT=0.48;
const CUES=[[0.3,'tiptoe'],[1.4,'tiptoe'],[2.5,'tiptoe'],[3.6,'heartbeat'],[4.4,'heartbeat'],[5.0,'creak'],[5.5,'drop'],[6.0,'alert'],
 [12.0,'click'],[12.02,'scratch'],[12.4,'sting'],[13.2,'question'],[14.4,'pop'],[15.5,'door'],[16.2,'tiptoe'],[17.5,'tiptoe'],[18.2,'click'],
 [19.9,'pop'],[20.6,'whoosh'],[20.9,'door'],[22.0,'suspense'],[22.5,'tick']];
for(let t=5.5;t<12;t+=BEAT){CUES.push([t,'kick'],[t+BEAT/2,'hat']);if(Math.round((t-5.5)/BEAT)%2)CUES.push([t,'clap']);else CUES.push([t,'bass'])}
for(let t=18.9;t<22;t+=BEAT)CUES.push([t,'kick']);
CUES.sort((a,b)=>a[0]-b[0]);
const MUSIC={bpm:125,duck:[[0,23.6,0]]};
const PIP={body:'#7bd94a',w:170,h:160,legLen:45,armLen:62,hat:'beanie',hatColor:'#5865f2',cheeks:true,shoe:'#ffffff'};
const MAMA={body:'#9b5de5',w:430,h:560,legLen:70,armLen:140,hat:'bow',hatColor:'#ff70a6',brows:true,shoe:'#3a1e4a'};
const FLOOR=1500,FX=500,FW=460,FY=420,FH=1080; // fridge box
function beatPh(t){return ((t-5.5)/BEAT)%1}
function bounce(t,amp){return t>5.5&&t<12||t>20.9?Math.abs(Math.sin(PI*(t-5.5)/BEAT))*amp:0}
function egg(x,y,t,i,frozen){const b=frozen?0:bounce(t+i*.1,24);ctx.save();ctx.translate(x,y-b);ctx.rotate(frozen?0:Math.sin(t*6.5+i)*.12);
 ell(0,-50,38,50,'#fffaf0');ell(-14,-58,9,11,OUT,null);ell(14,-58,9,11,OUT,null);
 // sunglasses
 const slip=frozen&&i===1?key(t,[[14.4,0],[14.6,16,'bounce']]):0;rrect(-34,-70+slip,30,18,6,'#111');rrect(4,-70+slip,30,18,6,'#111');line([-4,-63+slip,4,-63+slip],'#111',5);
 ctx.beginPath();ctx.arc(0,-38,12,.15*PI,.85*PI);path(null,OUT,6);ctx.restore()}
function cheese(x,y,t,frozen){const b=frozen?0:bounce(t,10);ctx.save();ctx.translate(x,y-b);
 ctx.beginPath();ctx.moveTo(-90,0);ctx.lineTo(90,0);ctx.lineTo(90,-90);ctx.closePath();path('#ffd23f');ell(40,-30,10,10,'#e8b41f',null);ell(70,-60,7,7,'#e8b41f',null);
 ell(40,-62,9,9,'#fff',OUT,4);ell(66,-66,9,9,'#fff',OUT,4);ell(42,-62,4,4,OUT,null);ell(68,-66,4,4,OUT,null);
 // headphones
 ctx.beginPath();ctx.arc(55,-60,44,PI*1.05,PI*1.95);path(null,'#222',9);ell(12,-56,10,16,'#ff3c8e',OUT,4);ell(98,-56,10,16,'#ff3c8e',OUT,4);ctx.restore();
 // turntable
 rrect(x-140,y,160,40,8,'#333');ctx.save();ctx.translate(x-60,y+4);ctx.scale(1,.3);ell(0,0,55,55,'#111','#555',4);ell(0,0,14,14,'#ff3c8e',null);ctx.restore();
 if(!frozen){ctx.save();ctx.translate(x-60,y);ctx.rotate(Math.sin(t*8)*.4);line([0,0,30,-30],'#7bd94a',8);ctx.restore()}}
function jelly(x,y,t,frozen){const w=frozen?0:Math.sin(t*14)*.12;ctx.save();ctx.translate(x,y);ctx.scale(1+w,1-w);
 ctx.beginPath();ctx.moveTo(-60,0);ctx.lineTo(-48,-90);ctx.quadraticCurveTo(0,-110,48,-90);ctx.lineTo(60,0);ctx.closePath();path('rgba(255,60,90,.85)');
 ell(-18,-55,8,10,OUT,null);ell(18,-55,8,10,OUT,null);ctx.beginPath();ctx.arc(0,-38,14,.1*PI,.9*PI);path(null,OUT,6);ell(-25,-80,10,6,'rgba(255,255,255,.6)',null);ctx.restore()}
function broccoli(x,y,t,frozen){const a=frozen?40:Math.sin(t*PI/BEAT)*60;ctx.save();ctx.translate(x,y-bounce(t,14));
 rrect(-18,-80,36,80,10,'#8bc34a');for(const[bx,by,r]of[[-30,-100,32],[0,-120,36],[30,-100,32],[0,-90,30]])ell(bx,by,r,r,'#3f9c35');
 ell(-12,-50,6,7,OUT,null);ell(12,-50,6,7,OUT,null);line([-18,-40,-55,-40-a],'#8bc34a',10);line([18,-40,55,-40-(frozen?40:-a+60)],'#8bc34a',10);ctx.restore()}
function fridgeInterior(t,frozen){
 const g=ctx.createLinearGradient(FX,FY,FX,FY+FH);const party=!frozen&&(t<12||t>20.9);
 g.addColorStop(0,party?'#2a0845':'#eaf6ff');g.addColorStop(1,party?'#091a4a':'#cfe8f7');ctx.fillStyle=g;ctx.fillRect(FX,FY,FW,FH);
 if(party){// beams + disco ball
  ctx.save();ctx.beginPath();ctx.rect(FX,FY,FW,FH);ctx.clip();ctx.globalCompositeOperation='lighter';
  for(let i=0;i<4;i++){const a=Math.sin(t*1.7+i*1.6)*.7+PI/2;const col=['rgba(255,40,180,.35)','rgba(40,220,255,.35)','rgba(140,255,60,.3)','rgba(255,220,40,.3)'][i];
   ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(FX+FW/2,FY+40);ctx.lineTo(FX+FW/2+Math.cos(a-.12)*1200,FY+40+Math.sin(a-.12)*1200);ctx.lineTo(FX+FW/2+Math.cos(a+.12)*1200,FY+40+Math.sin(a+.12)*1200);ctx.closePath();ctx.fill()}
  for(let i=0;i<30;i++){ctx.fillStyle=`hsla(${(i*47+t*200)%360},100%,70%,.7)`;ctx.beginPath();ctx.arc(FX+rnd(i)*FW+Math.sin(t*2+i)*20,FY+rnd(i+50)*FH,5,0,2*PI);ctx.fill()}
  ctx.restore();ell(FX+FW/2,FY+50,30,30,'#ccd');for(let i=0;i<6;i++)ell(FX+FW/2-15+(i%3)*15,FY+40+Math.floor(i/3)*18,5,5,`hsl(${(i*60+t*300)%360},90%,75%)`,null);
  line([FX+FW/2,FY,FX+FW/2,FY+20],OUT,4)}
 else{ctx.save();ctx.globalAlpha=.6;ell(FX+FW/2,FY+40,80,14,'#fff',null);ctx.restore()}
 // shelves
 for(const sy of[FY+380,FY+700])rrect(FX+10,sy,FW-20,16,4,'rgba(200,230,255,.7)','#88a',4);
 egg(FX+90,FY+380,t,0,frozen);egg(FX+190,FY+380,t,1,frozen);egg(FX+290,FY+380,t,2,frozen);
 cheese(FX+330,FY+700,t,frozen);jelly(FX+120,FY+700,t,frozen);broccoli(FX+230,FY+FH-30,t,frozen);
 ctx.save();ctx.translate(FX+370,FY+FH-30);rrect(-40,-120,80,120,10,'#f4f4f4');rrect(-40,-120,80,30,6,'#4ea8de');ctx.restore();
 rrect(FX,FY,FW,FH,24,null,OUT,12)}
function kitchen(t){
 ctx.fillStyle='#3c5a8a';ctx.fillRect(-500,-500,W+1000,FLOOR+500);
 ctx.fillStyle='rgba(255,255,255,.06)';for(let y=-400;y<FLOOR;y+=60)for(let x=-500;x<W+500;x+=60)ctx.fillRect(x+(y/60%2)*30,y,28,28);
 // window with moon
 rrect(80,250,300,340,16,'#0d1b3d');ell(290,340,46,46,'#fff7c2',null);ell(275,330,46,46,'#0d1b3d',null);for(let i=0;i<6;i++)sparkle(120+rnd(i)*240,280+rnd(i+9)*260,.18,t*.3+i);
 rrect(80,250,300,340,16,null);line([230,250,230,590]);line([80,420,380,420]);
 // counter left
 rrect(-200,1150,560,350,10,'#d9a066');rrect(-220,1120,600,40,10,'#b0784a');rrect(40,1200,120,240,8,null,'#8a5a32',6);
 ctx.fillStyle='#6d4a8c';ctx.fillRect(-500,FLOOR,W+1000,800);ctx.fillStyle='rgba(255,255,255,.07)';for(let x=-500;x<W+500;x+=120)ctx.fillRect(x,FLOOR,60,800);
 // fridge body
 rrect(FX-20,FY-30,FW+40,FH+60,30,'#e8eef5');ell(FX+FW/2,FLOOR+20,FW*.6,20,'rgba(0,0,0,.25)',null)}
function fridgeDoor(t,open){ // open 0 closed -> 1 fully open (hinge on the right)
 const w=FW*(1-open*1.25);const x=FX+FW-Math.max(w,-FW*.25)-(w<0?0:0);
 if(open>=.8)return rrect(FX+FW,FY,FW*.3,FH,20,'#d4dde8',OUT,10);
 const ww=Math.abs(w);const x0=w>=0?FX+FW-ww:FX+FW;
 rrect(x0,FY,ww,FH,20,w>=0?'#f2f6fa':'#d4dde8');if(w>=0){rrect(x0+30,FY+420,16,240,8,'#9aa',OUT,5);
  // magnets
  if(ww>200){ell(x0+ww*.6,FY+200,30,30,'#ff5a5f');rrect(x0+ww*.4,FY+780,90,70,8,'#fff');line([x0+ww*.4+15,FY+810,x0+ww*.4+70,FY+800],'#4ea8de',6)}}}
function scene(t){
 const cam={x:key(t,[[0,540],[3.2,540],[5.2,700],[5.6,700],[6.4,600],[12,600],[12.2,540],[18,540],[19,640],[20.9,620],[22,620],[22.6,260]]),
  y:key(t,[[0,1000],[3.2,1000],[5.2,980],[5.6,980],[6.4,1000],[12,1000],[12.2,980],[18,980],[19,1000],[22,1000],[22.6,980]]),
  z:key(t,[[0,1.05],[3.2,1.0],[5.2,1.7,'in'],[5.5,1.7],[5.8,1.08,'out'],[12,1.08],[12.2,1],[18,1],[19,1.25],[20.9,1.2],[22,1.1],[22.6,1.8]]),
  shake:t>5.5&&t<5.9?24:t>5.9&&t<12?(beatPh(t)<.15?6:0):t>12&&t<12.3?14:t>20.9&&t<21.2?16:0};
 const lightOn=t>=12&&t<18.2;const open=key(t,[[5.4,0],[5.6,1,'out'],[15.4,1],[15.6,0,'in'],[19.9,0],[20.2,.35,'out'],[20.7,.35],[20.95,0,'in']]);
 const frozen=t>=12&&t<20.9;
 withCam(cam,t,()=>{
  kitchen(t);
  if(open>0.01)fridgeInterior(t,frozen);
  // pip pose
  const pp={x:key(t,[[0,-120],[3.4,380,'lin'],[6,380],[7.4,420],[16,420],[18,-80,'lin'],[19.6,-80],[20.6,700,'in'],[21,700]]),y:FLOOR,mouth:'smile',look:[1,0],armL:-70,armR:-70};
  if(t<3.4){pp.walk=t*1.6;pp.lift=Math.abs(Math.sin(t*PI*1.6))*16;pp.armL=-20;pp.armR=-20;pp.mouth='whistle';pp.eyes='squint';pp.look=[1,-.2]}
  else if(t<5.5){pp.armR=key(t,[[3.4,-70],[4.6,15]]);pp.reachR=key(t,[[3.4,0],[4.6,30]]);pp.mouth='flat';pp.look=[1,0];pp.eyes='normal'}
  else if(t<7.4){pp.eyes='big';pp.mouth='wide';pp.sy=key(t,[[5.5,1],[5.7,1.25,'out'],[6,1]]);pp.sx=2-pp.sy;pp.lift=key(t,[[5.5,0],[5.7,50,'out'],[6.0,0,'bounce']]);pp.armL=pp.armR=50}
  else if(t<12){const ph=(t-5.5)/BEAT;pp.mouth='grin';pp.eyes='squint';pp.lift=Math.abs(Math.sin(PI*ph))*40;pp.armL=Math.floor(ph)%2?80:-20;pp.armR=Math.floor(ph)%2?-20:80;pp.rot=Math.sin(PI*ph)*10;pp.sy=1-Math.abs(Math.sin(PI*ph))*.08}
  else if(t<15.8){pp.armL=80;pp.armR=-20;pp.lift=12;pp.rot=8;pp.mouth='o';pp.eyes='big';pp.look=[-1,0];
   if(t>14.0){pp.armL=key(t,[[14,80],[14.6,-70]]);pp.armR=key(t,[[14,-20],[14.6,-70]]);pp.rot=key(t,[[14,8],[14.6,0]]);pp.lift=key(t,[[14,12],[14.6,0]]);pp.mouth='smile';pp.look=[-1,-.4]}}
  else if(t<18.2){pp.walk=(t-15.8)*1.4;pp.flip=true;pp.mouth='frown';pp.brow='sad';pp.eyes='normal';pp.look=[1,.5];pp.armL=pp.armR=-80}
  else if(t<20.6){pp.flip=false;pp.mouth='grin';pp.eyes='squint';pp.look=[1,0]}
  else{pp.lift=key(t,[[20.2,0],[20.5,120,'out'],[20.9,40]]);pp.rot=30;pp.mouth='grin'}
  // mama
  const mx=key(t,[[12,-420],[12.5,120,'out'],[13.6,120],[14.2,200],[16,200],[18.0,200],[18.2,-500,'in']]);
  const mp={x:mx,y:FLOOR,eyes:'squint',brow:'angry',mouth:'frown',look:[1,0],armL:-70,armR:-70};
  if(t>13.2&&t<14.0){mp.look=[Math.sin((t-13.2)*8)>0?1:-.2,0]}
  if(t>15.3&&t<15.8){mp.armR=key(t,[[15.3,-70],[15.45,0]]);mp.reachR=key(t,[[15.3,0],[15.45,180],[15.6,0]])}
  if(t>15.8&&t<18){mp.armL=30;mp.reachL=40;mp.look=[-1,0];mp.mouth='flat'}
  if(t>=12&&t<18.2)drawChar(MAMA,mp,t);
  if(t<20.95||t>=21.6)drawChar(PIP,pp,t);
  fridgeDoor(t,open);
  // egg arm waving from the crack
  if(t>19.9&&t<20.8){const a=Math.sin(t*14)*25;line([FX+FW-30,1000,FX+FW-110,960+a],'#fffaf0',22);line([FX+FW-30,1000,FX+FW-110,960+a],OUT,4);ell(FX+FW-115,958+a,18,18,'#fffaf0')}
  // light leaking from the door seam (mystery)
  if((t>2.5&&t<5.5)||(t>18.6&&t<19.9)||(t>20.95&&t<22.4)){const pulse=.4+.4*Math.abs(Math.sin(t*PI/BEAT));ctx.save();ctx.globalCompositeOperation='lighter';
   const c=`hsla(${(t*120)%360},100%,60%,${pulse})`;line([FX+FW-4,FY+30,FX+FW-4,FY+FH-30],c,14);
   for(let i=0;i<3;i++){ctx.globalAlpha=pulse*.25;ell(FX+FW,FY+300+i*300,70,140,c,null)}ctx.restore();
   if(t>18.9&&t<19.9||t>20.95){const bulge=Math.abs(Math.sin(t*PI/BEAT))*10;ctx.save();ctx.globalAlpha=.8;line([FX+FW+20+bulge,FY+200,FX+FW+40+bulge,FY+240],OUT,6);line([FX+FW+20+bulge,FY+800,FX+FW+40+bulge,FY+760],OUT,6);ctx.restore()}}
  // mama shadow eyes at the end
 });
 // darkness overlay (night) unless the light is on
 if(!lightOn){ctx.save();ctx.fillStyle='rgba(8,14,45,.55)';ctx.fillRect(0,0,W,H);
  if(open>0.3&&!frozen){ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(W*.62,H*.5,50,W*.62,H*.5,900);g.addColorStop(0,`hsla(${(t*90)%360},100%,60%,.35)`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
  ctx.restore()}
 if(t>=12&&t<12.12){ctx.fillStyle='rgba(255,255,255,.8)';ctx.fillRect(0,0,W,H)}
 if(t>=18.2&&t<18.3){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(0,0,W,H)}
 // effects in screen space
 if(t>6.0&&t<6.8)mark(330,700,key(t,[[6,0],[6.15,1.2,'back']]),'!');
 if(t>12.4&&t<13.2){mark(560,620,key(t,[[12.4,0],[12.55,1.2,'back']]),'!');sweat(470,780,1)}
 if(t>13.2&&t<14.0)mark(130,560,key(t,[[13.2,0],[13.35,1,'back']]),'?','#ffd23f');
 if(t>16&&t<18.2)sweat(300,1000,.8);
 if(t>19.0&&t<19.8)mark(330,720,key(t,[[19,0],[19.15,1,'back']]),'♪','#7bd94a');
 if(t>21.9){// mama's eyes in the dark doorway
  const bl=(t%1.4<.12)?.15:1;ctx.save();ell(220,920,34,34*bl,'#fff',OUT,6);ell(310,920,34,34*bl,'#fff',OUT,6);if(bl>.5){ell(232,926,12,12,OUT,null);ell(322,926,12,12,OUT,null)};line([180,870,250,885],OUT,10);line([280,885,350,870],OUT,10);ctx.restore()}
 if(t>22.6)iris(prog(t,22.6,23.4),265,920);
 vignette(.3);
 if(t<0.3){ctx.fillStyle=`rgba(0,0,0,${1-t/0.3})`;ctx.fillRect(0,0,W,H)}
}
