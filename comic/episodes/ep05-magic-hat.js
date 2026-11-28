// Episode 5: "The Magic Hat" — backfire. A magician keeps pulling the wrong things out of his hat, until the hat pulls HIM in.
const DUR=23.4, THUMB_T=14.2;
const CUES=[[0.1,'crowd'],[0.6,'clap'],[1.0,'magic'],[1.9,'tick'],[2.1,'magic'],[2.6,'boing'],[2.8,'clack'],[3.4,'question'],[3.9,'whoosh'],
 [4.6,'magic'],[5.1,'boing'],[5.6,'wobble'],[6.5,'whoosh'],[7.3,'magic'],[7.8,'cluck'],[8.2,'bonk'],[8.5,'bonk'],[8.8,'bonk'],[9.1,'cluck'],[9.4,'whoosh'],
 [10.4,'grunt'],[11.2,'tick'],[11.4,'tick'],[11.6,'magic'],[11.7,'pow'],[12.6,'strain'],[13.6,'sting'],[14.3,'pop'],[14.6,'slidedown'],[15.2,'gulp'],
 [16.6,'wobble'],[17.6,'pop'],[17.7,'boing'],[18.3,'crowd'],[18.4,'clap'],[19.4,'magic'],[19.9,'pop'],[20.2,'question'],[20.7,'crowd'],[20.8,'clap'],[21.4,'ding']];
const MUSIC={bpm:110,duck:[[12.4,17.4,.25]]};
const ZIBO={body:'#7b61ff',w:240,h:300,legLen:70,armLen:95,hat:'none',stache:true,stacheColor:'#1b1b24',shoe:'#111',brows:true};
const FLOOR=1500,HX=620,HY=1350; // hat sits on a table, opening at HY-150
function stage(t){
 ctx.fillStyle='#2a0d14';ctx.fillRect(-500,-500,W+1000,FLOOR+500);
 // curtains
 for(let i=-4;i<15;i++){const x=i*90;const g=ctx.createLinearGradient(x,0,x+90,0);g.addColorStop(0,'#7a0c1e');g.addColorStop(.5,'#c1121f');g.addColorStop(1,'#7a0c1e');ctx.fillStyle=g;ctx.fillRect(x,-500,90,FLOOR+500)}
 ctx.beginPath();ctx.moveTo(-500,-500);ctx.lineTo(W+500,-500);ctx.lineTo(W+500,260);for(let x=W+500;x>-500;x-=120)ctx.quadraticCurveTo(x-60,360,x-120,260);ctx.closePath();path('#9d0208');
 for(let x=-500;x<W+500;x+=120)ell(x,262,10,10,'#ffd23f',OUT,4);
 // stage floor
 ctx.fillStyle='#8d5524';ctx.fillRect(-500,FLOOR,W+1000,700);ctx.fillStyle='rgba(0,0,0,.15)';for(let x=-500;x<W+500;x+=110)ctx.fillRect(x,FLOOR,6,700);rrect(-500,FLOOR-10,W+1000,26,0,'#6f4518',OUT,6);
 // spotlight
 ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(520,1400,40,520,1400,520);g.addColorStop(0,'rgba(255,240,180,.35)');g.addColorStop(1,'rgba(255,240,180,0)');ctx.fillStyle=g;
 ctx.beginPath();ctx.moveTo(420,-100);ctx.lineTo(620,-100);ctx.lineTo(950,FLOOR+60);ctx.lineTo(90,FLOOR+60);ctx.closePath();ctx.fill();ctx.restore();
 // little table
 rrect(HX-120,HY,240,30,8,'#3a3a5a');line([HX,HY+30,HX,FLOOR],OUT,16);rrect(HX-70,FLOOR-20,140,24,8,'#3a3a5a')}
function hatBack(){ell(HX,HY-150,82,20,'#0b0b12',OUT,6)}
function hatFront(wob=0){ctx.save();ctx.translate(HX,HY);ctx.rotate(wob);rrect(-80,-150,160,150,10,'#22223b');rrect(-80,-52,160,26,0,'#e63946',OUT,6);rrect(-115,-10,230,22,11,'#22223b');ctx.restore()}
function wand(){ctx.save();ctx.rotate(-.7);rrect(-6,-110,12,110,4,'#111',OUT,4);rrect(-7,-120,14,26,4,'#fff',OUT,4);ctx.restore()}
function fish(flop){ctx.save();ctx.rotate(Math.sin(flop)*.4);ell(0,-50,34,60,'#4cc9f0');ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-30,40);ctx.lineTo(30,40);ctx.closePath();path('#4895ef');ell(-10,-80,8,8,'#fff',OUT,3);ell(-10,-80,3,3,OUT,null);ctx.restore()}
function sock(){ctx.save();ctx.beginPath();ctx.moveTo(-20,0);ctx.lineTo(-20,-90);ctx.lineTo(20,-90);ctx.lineTo(20,-20);ctx.quadraticCurveTo(70,-20,70,10);ctx.quadraticCurveTo(70,30,0,30);ctx.quadraticCurveTo(-20,30,-20,0);path('#f1faee');
 rrect(-20,-90,40,16,0,'#e63946',OUT,4);ctx.globalAlpha=.7;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(-30+i*30,-110);ctx.bezierCurveTo(-45+i*30,-140,-15+i*30,-150,-30+i*30,-180);path(null,'#70e000',6)}ctx.restore()}
function chicken(x,y,s,t,flip){ctx.save();ctx.translate(x,y);ctx.scale(s*(flip?-1:1),s);ell(0,0,60,50,'#fff');ell(40,-50,30,30,'#fff');ctx.beginPath();ctx.moveTo(62,-52);ctx.lineTo(88,-44);ctx.lineTo(62,-36);ctx.closePath();path('#ffb703',OUT,5);
 ell(36,-82,12,12,'#e63946',OUT,4);ell(50,-80,10,10,'#e63946',OUT,4);ell(46,-56,7,7,OUT,null);line([34,-68,56,-62],OUT,6);ell(-20,-6,30,22+Math.sin(t*30)*8,'#f1f1f1',OUT,5);line([-10,48,-14,72],'#ffb703',7);line([14,48,18,72],'#ffb703',7);ctx.restore()}
function glove(x,y,s,grab){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rrect(-60,40,120,90,20,'#f8f9fa');for(let i=0;i<4;i++){const fx=-60+i*40;const fl=grab?50:110;rrect(fx,-fl+40,36,fl,18,'#f8f9fa')}ell(-80,40,32,50,'#f8f9fa',OUT,7,-.5);
 for(let i=0;i<3;i++)line([-30+i*30,100,-30+i*30,124],OUT,5);ctx.restore()}
function bunny(x,y,s,t,stache){ctx.save();ctx.translate(x,y);ctx.scale(s,s);for(const sd of[-1,1]){ctx.save();ctx.rotate(sd*.2+Math.sin(t*4+sd)*.06);ell(sd*28,-170,22,70,'#fff');ell(sd*28,-165,10,50,'#ffc8dd',null);ctx.restore()}
 ell(0,-70,75,70,'#fff');ell(-26,-86,12,14,OUT,null);ell(26,-86,12,14,OUT,null);ell(-22,-90,4,4,'#fff',null);ell(30,-90,4,4,'#fff',null);ell(0,-60,10,8,'#ff8fab',OUT,4);
 if(stache){ctx.beginPath();ctx.moveTo(0,-50);ctx.bezierCurveTo(-25,-66,-60,-46,-64,-56);ctx.bezierCurveTo(-48,-30,-18,-36,0,-44);ctx.bezierCurveTo(18,-36,48,-30,64,-56);ctx.bezierCurveTo(60,-46,25,-66,0,-50);path('#1b1b24',OUT,4)}
 else{ctx.beginPath();ctx.arc(0,-48,14,.15*PI,.85*PI);path(null,OUT,5)}ctx.restore()}
function audience(t,mood){for(let i=0;i<7;i++){const x=60+i*165,b=mood==='cheer'?Math.abs(Math.sin(t*10+i))*30:Math.sin(t*2+i)*4;ell(x,1920-60-b,95,110,'#140a12','#000',4);
 if(mood==='cheer'){line([x-60,1880-b,x-90,1760-b-Math.abs(Math.sin(t*14+i))*30],'#140a12',22);line([x+60,1880-b,x+90,1760-b-Math.abs(Math.sin(t*14+i+1))*30],'#140a12',22)}}}
function scene(t){
 const cam={x:key(t,[[0,540],[12.4,540],[13.4,600],[16,600],[16.4,540]]),y:key(t,[[0,1300],[1.2,1220,'out'],[12.4,1220],[13.4,1150],[16,1150],[16.4,1220]]),
  z:key(t,[[0,1.8],[1.2,1.3,'out'],[12.4,1.3],[13.4,1.2],[16,1.2],[16.4,1.3],[21.2,1.3],[21.6,1.55]]),shake:t>11.7&&t<11.95?16:t>14.3&&t<15.4?10:t>8.2&&t<9.0?5:0};
 const hatWob=(t>16.2&&t<17.6)?Math.sin(t*30)*.08:(t>12.6&&t<13.6)?Math.sin(t*40)*.05:0;
 withCam(cam,t,()=>{
  stage(t);
  hatBack();
  // ---- magician ----
  const zp={x:380,y:FLOOR,mouth:'smile',eyes:'normal',look:[1,0],armL:30,armR:-70,brow:'up'};
  let item=null;// item in right hand
  if(t<1.6){zp.rot=key(t,[[0.3,0],[0.6,25],[1.0,0]]);zp.eyes='squint';zp.mouth='grin';zp.armL=key(t,[[0,30],[0.6,-30],[1.0,30]])}
  // pull cycle helper: [tap, reach, out, look, toss]
  function pull(t0,thing){if(t<t0||t>=t0+2.9)return;const k=t-t0;
   zp.armL=key(k,[[0,30],[.15,10],[.3,30]]);zp.armR=key(k,[[.3,-70],[.5,-2],[.6,-2],[.9,45,'back'],[2.3,45],[2.55,80],[2.7,-70]]);zp.reachR=key(k,[[.3,0],[.5,30],[.6,30],[.9,60]]);
   zp.look=[1,-.3];zp.mouth=k<.9?'smile':'o';zp.eyes=k<.9?'squint':'big';if(k>1.3){zp.brow='angry';zp.mouth='frown';zp.eyes='squint';zp.look=[1,-1]}
   if(k>.6&&k<2.5)item=thing}
  pull(1.6,'fish');pull(4.3,'sock');
  if(t>=7.0&&t<10.0){const k=t-7;zp.armR=key(k,[[0,-70],[.2,-2],[.3,-2],[.6,45,'back'],[1.0,45],[1.2,-70]]);zp.reachR=key(k,[[0,0],[.2,30],[.6,60]]);zp.armL=k<1?30:70;
   zp.mouth=k<.6?'smile':'wide';zp.eyes=k<.6?'squint':'big';zp.look=[0,-1];if(k>1.1){zp.eyes='x';zp.mouth='wide';zp.rot=Math.sin(t*20)*4;zp.armR=70}}
  if(t>=10.0&&t<12.4){zp.brow='angry';zp.eyes='squint';zp.mouth='frown';zp.look=[1,0];zp.armR=key(t,[[10,-70],[10.4,40],[10.8,-70]]);zp.armL=key(t,[[11,30],[11.2,0],[11.3,30],[11.4,0],[11.5,30],[11.65,-10]]);zp.sy=key(t,[[10.2,1],[10.4,1.1],[10.8,1]])}
  if(t>=12.4&&t<14.3){zp.armR=key(t,[[12.4,-70],[12.6,-15]]);zp.reachR=key(t,[[12.4,0],[12.6,70]]);zp.rot=key(t,[[12.4,0],[12.6,12]]);zp.mouth='flat';zp.eyes='squint';zp.brow='angry';zp.lift=0;
   if(t>12.6&&t<13.6)zp.x=380+Math.sin(t*30)*6;if(t>13.6){zp.eyes='big';zp.mouth='wide';zp.brow='up';zp.look=[1,-1];zp.rot=-6}}
  let inHat=false;
  if(t>=14.3&&t<15.4){const p=prog(t,14.4,15.2);zp.x=380+(HX-380)*ease.in(p);zp.lift=key(t,[[14.4,0],[14.7,320,'out'],[15.2,40,'in']]);zp.sx=zp.sy=1-.75*ease.in(prog(t,14.8,15.2));zp.eyes='big';zp.mouth='wide';zp.armL=zp.armR=70;zp.rot=Math.sin(t*25)*12;inHat=t>14.85}
  const drawZ=t<15.25||t>=19.9;
  if(t>=19.9){zp.x=HX+10;zp.lift=key(t,[[19.9,0],[20.2,260,'out']]);zp.sx=zp.sy=.42;zp.eyes='big';zp.mouth='o';zp.armL=zp.armR=-80;zp.look=[0,0];if(t>20.5){zp.eyes='squint';zp.mouth='smile';zp.armL=zp.armR=60}}
  const holdR=item==='fish'?()=>fish(t*20):item==='sock'?()=>sock():item==='chicken'?()=>chicken(0,-60,.8,t):null;
  if(t>=7.6&&t<8.0)item='chicken';
  const zz={...zp,holdL:wand,holdR:item==='fish'?()=>fish(t*20):item==='sock'?sock:item==='chicken'?()=>chicken(0,-40,.8,t):null};
  if(drawZ&&!(t>=19.9)&&!inHat)drawChar(ZIBO,zz,t);
  if(inHat){ctx.save();ctx.beginPath();ctx.rect(-500,-500,W+1000,HY-150+500);ctx.clip();drawChar(ZIBO,zz,t);ctx.restore()}
  // tossed things
  if(t>3.9&&t<4.6){ctx.save();ctx.translate(key(t,[[3.9,560],[4.6,-150]]),key(t,[[3.9,1030],[4.2,760,'out'],[4.6,1100,'in']]));ctx.rotate(t*12);fish(0);ctx.restore()}
  if(t>6.6&&t<7.3){ctx.save();ctx.translate(key(t,[[6.6,560],[7.3,-150]]),key(t,[[6.6,1030],[6.9,760,'out'],[7.3,1100,'in']]));ctx.rotate(t*12);sock();ctx.restore()}
  // chicken attacks
  if(t>=8.0&&t<10.0){const cx=key(t,[[8.0,470],[9.1,470],[9.4,300],[10,-200]]),cy=key(t,[[8,1010],[8.2,990],[8.4,1010],[8.6,990],[8.8,1010],[9.1,1000],[9.4,FLOOR-70,'in']]);chicken(cx,cy,.85,t,t>9.1)}
  // the bunny
  if(t>=17.6){const by=key(t,[[17.6,HY-80],[17.85,HY-180,'back']]),bounce=t>18.2?Math.abs(Math.sin(t*6))*10:0;
   if(t>=19.9){ctx.save();bunny(HX-130,by+60,1,t,true);ctx.restore()}else bunny(HX,by-bounce,1,t,true);
   if(t>18.3&&t<19.2){ctx.save();ctx.translate(HX,by);ctx.rotate(key(t,[[18.3,0],[18.6,.4],[19,0]]));ctx.restore()}}
  // tiny magician held up by the bunny
  if(t>=19.9)drawChar(ZIBO,{...zp,x:HX+60},t);
  hatFront(hatWob);
  // the giant glove
  if(t>13.4&&t<15.3){const gy=key(t,[[13.4,HY-150],[13.9,HY-560,'back'],[14.3,HY-560],[14.45,HY-470],[15.2,HY-150,'in']]);ctx.save();ctx.beginPath();ctx.rect(-500,-500,W+1000,HY-150+500);ctx.clip();
   rrect(HX-50,gy+100,100,HY-150-gy,10,'#22223b');glove(HX,gy,1.1,t>14.3);ctx.restore()}
  // sparkles + marks
  for(const tt of[1.0,2.1,4.6,7.3,11.6,19.4])if(t>tt&&t<tt+.6){for(let i=0;i<5;i++)sparkle(HX-80+rnd(i+tt*10)*160,HY-200-rnd(i+3)*150-(t-tt)*80,.6,t)}
  if(t>11.6&&t<12.0)burst(HX,HY-170,.6,'#ffd23f','#7b61ff');
  if(t>3.3&&t<3.9)mark(380,950,key(t,[[3.3,0],[3.45,1,'back']]),'?','#ffd23f');
  if(t>5.6&&t<6.5){ctx.save();ctx.globalAlpha=.8;line([300,1100,420,1110],'#70e000',8);ctx.restore();sweat(500,1020,1)}
  if(t>8.2&&t<9.0)dizzy(380,1060,t,80);
  if(t>13.6&&t<14.3)mark(380,880,key(t,[[13.6,0],[13.75,1.2,'back']]),'!');
  if(t>16.6&&t<17.5)mark(HX,950,key(t,[[16.6,0],[16.75,1,'back']]),'?','#ffd23f');
  if(t>18.3&&t<19.4)for(let i=0;i<4;i++)sparkle(HX-200+i*130,950+Math.sin(t*5+i)*40,.7,t);
  if(t>20.2&&t<20.7)mark(HX+60,1040,key(t,[[20.2,0],[20.35,.7,'back']]),'?','#ffd23f');
 });
 audience(t,(t>0&&t<1.2)||(t>18.3&&t<19.3)||t>20.7?'cheer':'calm');
 if(t>16.4&&t<17.5){ctx.save();for(let i=0;i<3;i++)mark(220+i*330,1680,.6,'?','#ffd23f');ctx.restore()}
 vignette(.45);
 if(t<0.25){ctx.fillStyle=`rgba(0,0,0,${1-t/0.25})`;ctx.fillRect(0,0,W,H)}
 if(t>11.6&&t<11.7){ctx.fillStyle='rgba(255,255,255,.7)';ctx.fillRect(0,0,W,H)}
 if(t>22.0)iris(prog(t,22.0,22.9),660,900);
}
