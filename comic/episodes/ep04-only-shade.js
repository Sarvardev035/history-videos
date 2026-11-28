// Episode 4: "The Only Shade" — rivalry on the hottest day. One thin lamp-post shadow, two sweaty strangers, and a sun that plays games.
const DUR=24.4, THUMB_T=3.4;
const CUES=[[0.2,'sizzle'],[1.2,'sizzle'],[2.2,'alert'],[2.4,'whoosh'],[2.75,'squeeze'],[3.6,'bonk'],[4.2,'boing'],[4.6,'sizzle'],[5.3,'pop'],
 [6.3,'pop'],[7.4,'whoosh'],[7.7,'pop'],[8.6,'gulp'],[9.2,'gulp'],[9.8,'sizzle'],[10.6,'wobble'],[11.4,'wind'],[12.0,'slideup'],[12.8,'laugh'],
 [14.6,'whoosh'],[15.0,'tiptoe'],[15.9,'whoosh'],[16.2,'tiptoe'],[17.0,'whoosh'],[17.25,'tiptoe'],[17.9,'laugh'],[19.0,'thunder'],[19.4,'rain'],[21.0,'rain'],
 [20.6,'slidedown'],[21.5,'pop'],[22.3,'ding2'],[23.0,'magic']];
const MUSIC={bpm:116,duck:[[11.3,12.8,.4],[19.0,21.4,.3]]};
const MELO={body:'#ffcc33',w:280,h:220,legLen:55,armLen:85,hat:'none',cheeks:true,shoe:'#7a4a12'};
const CHILI={body:'#ef476f',w:190,h:330,legLen:75,armLen:100,hat:'top',hatColor:'#118a5c',brows:true,shoe:'#222'};
const FLOOR=1500;
// replace unknown sfx name used above
CUES.forEach(c=>{if(c[1]==='squeeze')c[1]='stretch'});
function umbrella(x,y,r,col,open=1){ctx.save();ctx.translate(x,y);line([0,0,0,r*1.3],OUT,10);ctx.beginPath();ctx.arc(-12,r*1.3,12,0,PI);path(null,OUT,8);
 ctx.scale(open,1);ctx.beginPath();ctx.moveTo(-r,0);ctx.quadraticCurveTo(-r,-r*.9,0,-r*.9);ctx.quadraticCurveTo(r,-r*.9,r,0);
 for(let i=0;i<4;i++){const a=r-i*r/2;ctx.quadraticCurveTo(a-r/4,-r*.18,a-r/2,0)}ctx.closePath();path(col);
 ctx.save();ctx.clip();for(let i=-2;i<=2;i+=2){ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.moveTo(0,-r*.9);ctx.lineTo(i*r/2.6-r/8,0);ctx.lineTo(i*r/2.6+r/8,0);ctx.fill()}ctx.restore();ctx.restore()}
function sunChar(x,y,t,mood){ctx.save();ctx.translate(x,y);ctx.rotate(t*.3);for(let i=0;i<12;i++){ctx.save();ctx.rotate(i*PI/6);ctx.beginPath();ctx.moveTo(-22,150);ctx.lineTo(0,210+Math.sin(t*6+i)*12);ctx.lineTo(22,150);path('#ffb703',OUT,6);ctx.restore()}ctx.restore();
 ell(x,y,140,140,'#ffd60a',OUT,8);ell(x-48,y-20,22,26,'#fff',OUT,5);ell(x+48,y-20,22,26,'#fff',OUT,5);ell(x-44,y-16,10,10,OUT,null);ell(x+52,y-16,10,10,OUT,null);
 if(mood==='grin'){ctx.beginPath();ctx.arc(x,y+20,60,.1*PI,.9*PI);path('#7a1f1f',OUT,7);line([x-80,y-62,x-20,y-50],OUT,9);line([x+20,y-50,x+80,y-62],OUT,9)}
 else if(mood==='pout'){ctx.beginPath();ctx.arc(x,y+80,40,1.2*PI,1.8*PI);path(null,OUT,8)}
 else{ctx.beginPath();ctx.arc(x,y+20,50,.15*PI,.85*PI);path(null,OUT,8)}
 ctx.save();ctx.globalAlpha=.3;ell(x-90,y+40,22,12,'#ff6b6b',null);ell(x+90,y+40,22,12,'#ff6b6b',null);ctx.restore()}
function street(t,sunX){
 const g=ctx.createLinearGradient(0,-300,0,FLOOR);g.addColorStop(0,'#ff9e40');g.addColorStop(1,'#ffe5a3');ctx.fillStyle=g;ctx.fillRect(-500,-500,W+1000,FLOOR+500);
 // far buildings
 for(let i=0;i<7;i++){const bx=-200+i*220,bh=300+rnd(i+3)*260;rrect(bx,FLOOR-bh-200,180,bh+200,8,i%2?'#f4a261':'#e9c46a',OUT,6);
  for(let r=0;r<3;r++)for(let c=0;c<2;c++)rrect(bx+30+c*75,FLOOR-bh-160+r*90,45,55,6,'#fff3c4',OUT,4)}
 // heat waves
 ctx.save();ctx.globalAlpha=.25;for(let i=0;i<6;i++){ctx.beginPath();const y0=500+i*130;for(let x=-100;x<W+100;x+=20)ctx.lineTo(x,y0+Math.sin(x*.02+t*5+i)*12);path(null,'#fff',5)}ctx.restore();
 ctx.fillStyle='#bfa58a';ctx.fillRect(-500,FLOOR,W+1000,900);ctx.fillStyle='#a88f76';for(let x=-500;x<W+500;x+=180)ctx.fillRect(x,FLOOR,8,900);rrect(-500,FLOOR-8,W+1000,24,0,'#8d7660',OUT,6)}
function shadeX(sunX){return 540+(540-sunX)*.55}
function scene(t){
 const sunX=key(t,[[0,780],[14.6,780],[14.9,300,'back'],[15.9,300],[16.2,820,'back'],[17.0,820],[17.25,300,'back'],[18.8,300],[19.4,540]]);
 const sx=shadeX(sunX);
 const cam={x:540,y:key(t,[[0,800],[1.4,960,'out'],[24.4,960]]),z:key(t,[[0,1.4],[1.4,1,'out'],[2.6,1],[3.0,1.35,'out'],[4.0,1.35],[4.4,1],[22.2,1],[22.8,1.2]]),
  shake:t>3.6&&t<3.8?14:t>19.0&&t<19.5?18:0};
 const camY=cam.y;
 withCam(cam,t,()=>{
  street(t,sunX);
  const cloudy=t>19.0;
  sunChar(sunX,300,t,t>14.4&&t<19?'grin':t>21.5?'pout':'smile');
  // lamp post + its thin shade band
  ctx.save();ctx.globalAlpha=cloudy?0.08:.28;ctx.fillStyle='#1b1b3a';ctx.fillRect(sx-50,620,100,FLOOR-620);ctx.restore();
  rrect(525,560,30,FLOOR-560,6,'#4a4e69');ctx.beginPath();ctx.moveTo(540,570);ctx.quadraticCurveTo(540,460,640,470);path(null,OUT,26);ctx.beginPath();ctx.moveTo(540,570);ctx.quadraticCurveTo(540,460,640,470);path(null,'#4a4e69',14);
  ell(660,490,40,24,'#fff3b0',OUT,6);rrect(500,FLOOR-40,80,40,8,'#4a4e69');
  // ---- Melo ----
  const mp={x:key(t,[[0,-150],[2.2,200,'out'],[2.4,200],[2.75,sx-22,'in'],[4.2,sx-22],[19.0,sx-22]]),y:FLOOR,mouth:'wide',eyes:'squint',look:[1,0],armL:-60,armR:-60,brow:'sad'};
  if(t<2.2){mp.walk=t*1.5;mp.lift=Math.abs(Math.sin(t*PI*1.5))*12}
  if(t>2.2&&t<2.75){mp.eyes='big';mp.mouth='o';mp.brow='up';mp.look=[1,0]}
  if(t>=2.75&&t<4.2){mp.sx=.48;mp.sy=1.15;mp.mouth='flat';mp.eyes='squint';mp.brow='angry';mp.look=[1,0];if(t>3.55&&t<3.75)mp.rot=-8}
  if(t>=4.2&&t<11.4){mp.sx=key(t,[[4.2,.48],[4.5,.6]]);mp.sy=1.1;mp.mouth='smile';mp.eyes='squint';mp.brow='none';mp.look=[1,0];
   if(t>5.3){mp.mouth='o';mp.eyes='big';mp.look=[1,0]}if(t>6.3){mp.mouth='grin';mp.eyes='squint';mp.brow='up'}
   if(t>7.7){mp.mouth='frown';mp.brow='sad';mp.eyes='normal';mp.look=[1,0];mp.sx=1;mp.sy=1;mp.x=key(t,[[7.7,sx-22],[8.0,sx-160,'back']])}
   if(t>9.6){const m=prog(t,9.6,11.0);mp.sy=1-m*.45;mp.sx=1+m*.5;mp.mouth='wide';mp.eyes='spiral';mp.x=sx-160}}
  if(t>=11.4&&t<14.4){mp.x=sx-160;mp.sy=.55;mp.sx=1.45;mp.eyes='big';mp.mouth='o';mp.look=[1,-1];if(t>12.8){mp.mouth='laugh';mp.eyes='squint';mp.rot=Math.sin(t*25)*5}
   if(t>13.6){mp.x=key(t,[[13.6,sx-160],[14.0,sx,'out']]);mp.sy=key(t,[[13.6,.55],[14.0,1.1,'back']]);mp.sx=key(t,[[13.6,1.45],[14.0,1]]);mp.mouth='smile';mp.eyes='squint';mp.rot=0}}
  if(t>=14.4&&t<19.0){mp.x=sx+key(t,[[14.6,0],[14.9,-480],[15.0,-480],[15.5,0,'out'],[15.9,0],[16.2,450],[16.3,450],[16.8,0,'out'],[17.0,0],[17.25,-460],[17.35,-460],[17.7,0,'out']]);
   mp.mouth=Math.abs(mp.x-sx)>60?'wide':'smile';mp.eyes=Math.abs(mp.x-sx)>60?'big':'squint';mp.walk=Math.abs(mp.x-sx)>60?t*6:null;mp.look=[sunX<540?1:-1,0];
   if(t>17.8){mp.mouth='frown';mp.brow='angry';mp.look=[0,-1];mp.eyes='squint'}}
  if(t>=19.0){mp.x=sx;mp.eyes='squint';mp.mouth='frown';mp.brow='sad';mp.look=[0,-1];mp.sy=1;mp.sx=1;if(t>21.6){mp.x=key(t,[[21.6,sx],[22.0,sx-60]]);mp.look=[1,-.3];mp.mouth='smile';mp.brow='none';mp.eyes='normal'}}
  // ---- Chili ----
  const cp={x:key(t,[[0,1250],[2.2,880,'out'],[2.4,880],[2.75,sx+22,'in'],[4.2,sx+22],[4.5,sx+260,'back'],[11.4,sx+260]]),y:FLOOR,mouth:'wide',eyes:'squint',look:[-1,0],armL:-60,armR:-60,brow:'sad'};
  let umb=null;
  if(t<2.2){cp.walk=t*1.5+.5;cp.lift=Math.abs(Math.sin(t*PI*1.5+1))*12}
  if(t>2.2&&t<2.75){cp.eyes='big';cp.mouth='o';cp.brow='up'}
  if(t>=2.75&&t<4.2){cp.sx=.45;cp.sy=1.1;cp.mouth='flat';cp.eyes='squint';cp.brow='angry';cp.look=[-1,0];if(t>3.55&&t<3.75)cp.rot=8}
  if(t>=4.2&&t<5.3){cp.rot=key(t,[[4.2,20],[4.6,0]]);cp.mouth='wide';cp.eyes='x';cp.brow='none'}
  if(t>=5.3&&t<11.4){cp.mouth='smile';cp.eyes='squint';cp.brow='up';cp.armL=40;cp.reachL=0;
   const r=t<6.3?70:t<7.4?70:key(t,[[7.4,70],[7.7,300,'back']]);const open=t<5.3?0:key(t,[[5.3,.1],[5.5,1,'back']]);
   umb=[cp.x-70,FLOOR-75-330-120-(r>100?150:0),r,t<7.4?'#06d6a0':'#118ab2',open];
   if(t>6.3&&t<7.4){cp.mouth='o';cp.eyes='big';cp.brow='none'}
   if(t>7.7){cp.mouth='smile';cp.eyes='squint';cp.armR=30;cp.reachR=-30}
   if(t>11.0){cp.eyes='big';cp.mouth='o'}}
  if(t>=11.4&&t<20.6){cp.lift=key(t,[[11.4,0],[11.8,60,'in'],[13.6,1500,'in']]);cp.x=key(t,[[11.4,sx+260],[13.6,1300,'in'],[20.0,1300],[20.6,sx+240]]);cp.rot=Math.sin(t*4)*10;cp.armL=80;cp.reachL=0;cp.mouth='wide';cp.eyes='big';cp.look=[0,1];
   umb=[cp.x-35,FLOOR-75-330-cp.lift-230,300,'#118ab2',1];if(t>=20.0){cp.lift=key(t,[[20.0,900],[21.5,0,'out']]);cp.x=key(t,[[20,1300],[21.5,sx+120,'out']]);umb=[cp.x-35,FLOOR-75-330-cp.lift-230,300,'#118ab2',1];cp.mouth='smile';cp.eyes='normal'}}
  if(t>=21.5){cp.x=sx+120;cp.lift=0;cp.rot=0;cp.armL=80;cp.reachL=0;cp.mouth='smile';cp.eyes='squint';cp.look=[-1,0];umb=[sx+120-35,FLOOR-75-330-230,300,'#118ab2',1];if(t>22.3){cp.mouth='grin'}}
  if(umb&&t<11.4&&umb[2]>100){ctx.save();ctx.globalAlpha=.2;ell(umb[0],FLOOR+10,umb[2],30,'#000',null);ctx.restore()}
  // puddle when melting
  if(t>9.8&&t<14.0){ctx.save();ctx.globalAlpha=.85;ell(sx-160,FLOOR+6,190*prog(t,9.8,11),26,'#ffcc33',OUT,5);ctx.restore()}
  drawChar(MELO,mp,t);drawChar(CHILI,cp,t);
  if(umb)umbrella(...umb);
  // drink straw
  if(t>8.4&&t<11.0){ctx.save();ctx.translate(cp.x+75,FLOOR-330);rrect(-22,-10,44,70,8,'#8ecae6');line([0,-10,-10,-70],'#e63946',8);ctx.restore()}
  // the rain cloud that follows Melo
  if(t>19.0){const cx=key(t,[[19.0,-300],[19.4,sx,'out'],[21.6,sx],[22.0,sx-60]]),cy=520;
   ell(cx-90,cy,110,70,'#6c757d');ell(cx+60,cy-20,120,85,'#6c757d');ell(cx+150,cy+10,80,60,'#6c757d');ell(cx,cy+30,170,50,'#6c757d');
   if(t<21.6){ctx.save();ctx.strokeStyle='#4cc9f0';ctx.lineWidth=6;for(let i=0;i<24;i++){const rx=cx-170+rnd(i)*340,ry=cy+60+((t*1400+i*97)%(FLOOR-cy-60));ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(rx-6,ry+40);ctx.stroke()}ctx.restore()}
   if(t>19.0&&t<19.4)burst(cx+40,cy-80,.4,'#fff','#ffd23f')}
  // marks/effects
  if(t<2.4){sweat(key(t,[[0,-150],[2.2,200,'out']])+130,FLOOR-280,1);sweat(key(t,[[0,1250],[2.2,880,'out']])-110,FLOOR-430,1)}
  if(t>2.2&&t<2.7){mark(200,FLOOR-400,1,'!');mark(880,FLOOR-560,1,'!')}
  if(t>3.55&&t<3.8)burst(sx,FLOOR-300,.35,'#fff','#ffd23f');
  if(t>4.4&&t<5.3){for(let i=0;i<3;i++){ctx.save();ctx.globalAlpha=.6;const ph=(t*1.5+i*.33)%1;ell(sx+230+i*30,FLOOR-430-ph*200,20+ph*20,20+ph*20,'#ddd',null);ctx.restore()}}
  if(t>9.8&&t<11.4){for(let i=0;i<3;i++){ctx.save();ctx.globalAlpha=.6;const ph=(t*1.5+i*.33)%1;ell(sx-200+i*40,FLOOR-260-ph*200,20+ph*20,20+ph*20,'#ddd',null);ctx.restore()}}
  if(t>12.8&&t<13.6)sweat(sx-60,FLOOR-170,1);
  if(t>22.3&&t<24){heart(sx+40,FLOOR-650-(t-22.3)*60,.9)}
 });
 // hot tint
 ctx.save();ctx.globalAlpha=t>19.0&&t<21.6?.15:.08;ctx.fillStyle=t>19.0&&t<21.6?'#244':'#ff7b00';ctx.fillRect(0,0,W,H);ctx.restore();
 vignette(.25);
 if(t<0.2){ctx.fillStyle=`rgba(255,255,255,${1-t/0.2})`;ctx.fillRect(0,0,W,H)}
 if(t>23.4)iris(prog(t,23.4,24.2),540,1100);
}
