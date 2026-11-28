// Episode 3: "Balloon Gains" — backfire. A skinny guy can't lift the barbell, cheats with balloons, floats away; the show-off gets the plates.
const DUR=23.2, THUMB_T=11.4;
const CUES=[[0.2,'whoosh'],[0.9,'ding2'],[1.8,'grunt'],[2.2,'strain'],[3.4,'strain'],[4.6,'boing'],[5.1,'thud'],[5.9,'question'],[6.5,'ding'],
 [7.4,'pop'],[7.6,'inflate'],[8.3,'inflate'],[9.0,'inflate'],[10.0,'whoosh'],[10.4,'magic'],[11.0,'gulp'],[11.5,'bonk'],[11.7,'alert'],
 [13.2,'slideup'],[13.8,'crowd'],[14.3,'laugh'],[16.6,'click'],[17.0,'slidedown'],[17.75,'pow'],[18.3,'slidedown'],[18.9,'bonk'],[19.0,'slideup'],
 [19.4,'thud'],[20.6,'wobble'],[21.4,'pop'],[21.7,'sadtrombone']];
const MUSIC={bpm:132,duck:[[1.8,5.2,.35],[13.2,15.5,.4],[17.0,23.2,.3]]};
const TWIG={body:'#f7a1c4',w:150,h:380,legLen:90,armLen:100,hat:'band',hatColor:'#e63946',shoe:'#ffffff'};
const BRICK={body:'#3d8bfd',w:340,h:350,legLen:70,armLen:110,hat:'cap',hatColor:'#222222',brows:true,shoe:'#222'};
const FLOOR=1550;
function gym(t){
 ctx.fillStyle='#e9ecef';ctx.fillRect(-500,-1500,W+1000,FLOOR+1500);
 ctx.fillStyle='#dee2e6';for(let y=-1500;y<FLOOR;y+=80)ctx.fillRect(-500,y,W+1000,4);
 // ceiling lights high up (seen when the camera follows the float)
 for(const x of[200,880]){rrect(x-90,-700,180,30,10,'#adb5bd');ctx.save();ctx.globalAlpha=.25;ell(x,-640,160,60,'#fff9db',null);ctx.restore()}
 rrect(-500,-760,W+1000,40,0,'#868e96');
 // mirror
 rrect(80,420,520,560,14,'#cfe8ff');ctx.save();ctx.globalAlpha=.5;line([140,460,260,900],'#fff',24);line([300,460,380,700],'#fff',14);ctx.restore();rrect(80,420,520,560,14,null,'#adb5bd',16);
 // poster: flexing arm icon (no words)
 rrect(700,380,280,360,10,'#ffd23f');ctx.save();ctx.translate(840,560);ell(-30,30,60,46,'#f4a261');ell(40,-30,50,60,'#f4a261');ell(10,-90,34,34,'#f4a261');ctx.restore();
 // dumbbell rack
 rrect(690,1180,320,26,8,'#495057');for(let i=0;i<4;i++){ell(730+i*75,1160,24,24,'#343a40');}
 ctx.fillStyle='#5c677d';ctx.fillRect(-500,FLOOR,W+1000,900);ctx.fillStyle='#4a5568';for(let x=-500;x<W+500;x+=160)ctx.fillRect(x,FLOOR,80,900);
 rrect(60,FLOOR-10,720,30,10,'#2b2d42')}
function plate(x,y,r){ell(x,y,r*.32,r,'#212529',OUT,7);ell(x,y,r*.22,r*.7,'#343a40',null);ell(x,y,8,14,'#adb5bd',OUT,4)}
function barbell(cx,cy,platesL,platesR,t){line([cx-230,cy,cx+230,cy],'#adb5bd',16);line([cx-230,cy,cx+230,cy],OUT,4);
 if(platesL)plate(cx-170,cy,110);if(platesR)plate(cx+170,cy,110)}
function scene(t){
 const floatLift=key(t,[[13.0,0],[16.6,520,'io'],[17.0,520],[19.0,560],[19.6,1600,'in']]);
 const cam={x:540,y:key(t,[[0,1150],[0.9,1100],[13,1100],[15.5,820],[16.8,760],[17.4,1050,'out'],[23,1050]]),z:key(t,[[0,1.6],[0.8,1,'back'],[10,1],[10.6,1.15,'out'],[12.8,1.15],[13.4,1],[17.4,1],[21.5,1],[21.9,1.25]]),
  shake:t>17.75&&t<18.1?26:t>18.9&&t<19.1?16:t>5.1&&t<5.3?12:t>2.2&&t<4.5?3:0};
 withCam(cam,t,()=>{
  gym(t);
  // ---- Twig ----
  const tp={x:420,y:FLOOR,mouth:'smile',look:[1,0],armL:-70,armR:-70,eyes:'normal'};
  let barX=420,barY=FLOOR-110,pL=true,pR=true;let twigBody=TWIG.body;
  if(t<1.6){tp.armL=key(t,[[0.3,-70],[0.8,40]]);tp.armR=key(t,[[0.3,-70],[0.8,40]]);tp.mouth='grin';tp.eyes='squint';tp.sy=1+Math.sin(t*4)*.03}
  else if(t<4.8){tp.armL=tp.armR=-68;tp.reachL=tp.reachR=51;tp.eyes=t>2.2?'squint':'normal';tp.mouth=t>2.2?'flat':'smile';tp.brow='angry';
   tp.sy=t>3.3?1+Math.abs(Math.sin(t*3))*.25:1;tp.sx=2-tp.sy*.9;tp.rot=t>2.2?Math.sin(t*40)*2:0;
   twigBody=t>2.2?'#f7'+(Math.max(80,161-(t-2.2)*40)|0).toString(16).padStart(2,'0')+(Math.max(90,196-(t-2.2)*40)|0).toString(16).padStart(2,'0'):TWIG.body}
  else if(t<7.4){const fall=prog(t,4.6,5.1);tp.lift=key(t,[[4.6,0],[4.85,60,'out'],[5.1,-40,'in'],[5.5,-40]]);tp.rot=key(t,[[4.6,0],[5.1,-20]]);
   tp.sy=t>5.1?.8:1;tp.eyes=t<6.4?'spiral':'big';tp.mouth=t<6.4?'o':'grin';tp.armL=-50;tp.armR=t>6.4?70:-50;tp.look=[0,-1];tp.brow=t>6.4?'up':'none'}
  else if(t<10.0){tp.armL=tp.armR=-68;tp.reachL=tp.reachR=51;tp.mouth='grin';tp.eyes='squint';tp.look=[0,.5]}
  else if(t<13.0){const up=prog(t,10,10.5);tp.armL=tp.armR=key(t,[[10,-68],[10.5,80,'back']]);tp.reachL=tp.reachR=key(t,[[10,51],[10.5,130,'out']]);
   barY=key(t,[[10,FLOOR-110],[10.5,1074,'back']]);tp.mouth='grin';tp.eyes='squint';tp.lift=0;tp.brow='up';
   if(t>11.0){tp.armR=key(t,[[11,80],[11.3,10]]);tp.reachR=key(t,[[11,130],[11.3,0]]);tp.armL=88;tp.reachL=key(t,[[11,130],[11.3,60]])/1;barX=key(t,[[11,420],[11.3,385]]);barY=key(t,[[11,1074],[11.3,1010]])}
   if(t>11.3){tp.rot=Math.sin(t*10)*3}}
  else{tp.armL=88;tp.reachL=60;barX=385;barY=1010;tp.armR=key(t,[[13,10],[13.4,70]]);tp.reachR=0;tp.lift=floatLift;tp.mouth=t<13.4?'grin':t<17?'o':'grin';tp.eyes=t<13.4?'squint':t<17?'big':'squint';
   tp.walk=t>13.4&&t<17?t*3:null;tp.look=[0,1];barY-=floatLift;if(t>17)tp.brow='up';tp.rot=Math.sin(t*2)*6}
  pL=!(t>16.6);pR=!(t>18.3);
  const showBal=t>7.6;
  // balloons tied to the bar
  if(showBal){const cols=['#ff595e','#ffca3a','#8ac926','#1982c4','#6a4c93','#ff924c'];const n=Math.min(6,2*(1+Math.floor((t-7.6)/.7)));
   for(let i=0;i<n;i++){const side=i%2?1:-1,k=Math.floor(i/2);const ax=barX+side*215,ay=barY;const inf=prog(t,7.6+k*.7,7.9+k*.7);
    if(inf>0){ctx.save();const bx=ax+side*(k-1)*60,by=ay-260-k*50;ctx.translate(bx,by);ctx.scale(inf,inf);ctx.translate(-bx,-by);balloon(bx,by,ax,ay,cols[i],t,i);ctx.restore()}}}
  drawChar({...TWIG,body:twigBody},tp,t);
  barbell(barX,barY,pL,pR,t);
  // ---- Brick ----
  const bp={x:830,y:FLOOR,mouth:'smile',look:[-1,0],armL:-70,armR:30,reachR:-40,eyes:'squint',brow:'up'};
  const tinyDB=()=>{rrect(-26,-6,52,12,4,'#adb5bd',OUT,4);ell(-26,0,10,16,'#212529',OUT,4);ell(26,0,10,16,'#212529',OUT,4)};
  let holdDB=true;
  if(t<10.2){bp.armR=key(t,[[0,30],[0.5,60],[1,30],[1.5,60],[2,30],[2.5,60],[3,30],[3.5,60],[4,30]]);if(t>2.4&&t<5){bp.mouth='o';bp.eyes='squint'}if(t>5){bp.mouth='laugh';bp.look=[-1,.4]}if(t>6.2){bp.mouth='smile'}}
  else if(t<13){bp.eyes='big';bp.mouth='wide';bp.brow='none';bp.look=[-1,-.6];if(t>11.0){holdDB=false;}
   if(t>11.5){bp.lift=Math.abs(Math.sin((t-11.5)*9))*50;bp.mouth='o';bp.eyes='squint';bp.armL=-20;bp.armR=-20;bp.rot=Math.sin(t*9)*8}}
  else if(t<17.7){holdDB=false;bp.mouth='laugh';bp.eyes='squint';bp.armL=20;bp.armR=-10;bp.reachR=0;bp.rot=Math.sin(t*22)*6;bp.lift=Math.abs(Math.sin(t*11))*16;bp.look=[-.6,-1];
   if(t>17.0){bp.mouth='o';bp.eyes='big';bp.look=[-.4,-1];bp.rot=0;bp.lift=0;bp.armL=bp.armR=60}}
  else{holdDB=false;bp.sy=key(t,[[17.75,.3],[18.0,.4,'elastic'],[18.9,.28],[19.1,.32]]);bp.sx=2-bp.sy*.6;bp.eyes='spiral';bp.mouth='o';bp.armL=bp.armR=-10;bp.brow='none'}
  drawChar(BRICK,{...bp,holdR:holdDB?tinyDB:null},t);
  if(!holdDB&&t>11.0&&t<17.7){ctx.save();ctx.translate(key(t,[[11,950],[11.5,880]]),key(t,[[11,1360],[11.5,FLOOR-14,'in']]));tinyDB();ctx.restore()}
  // falling plates
  if(t>16.6){const px=key(t,[[16.6,barX-170],[17.75,800]]),py=key(t,[[16.6,barY],[17.75,FLOOR-130,'in']]);ctx.save();ctx.translate(px,py);ctx.rotate(t>17.75?PI/2:(t-16.6)*8);plate(0,0,110);ctx.restore()}
  if(t>18.3){const px=key(t,[[18.3,barX+170],[18.9,860]]),py=key(t,[[18.3,barY],[18.9,FLOOR-200,'in']]);ctx.save();ctx.translate(px,py);ctx.rotate(t>18.9?PI/2:(t-18.3)*9);plate(0,0,110);ctx.restore()}
  // a lone balloon drifts down and pops on Brick
  if(t>19.6&&t<21.4){balloon(key(t,[[19.6,620],[21.4,840]]),key(t,[[19.6,700],[21.4,1250,'io']]),key(t,[[19.6,620],[21.4,840]]),key(t,[[19.6,830],[21.4,1380,'io']]),'#ff595e',t,9)}
  if(t>21.4&&t<21.7)burst(840,1260,.35,'#fff','#ff595e');
  // effects
  if(t>0.9&&t<1.6)sparkle(500,1270,.7,t);
  if(t>2.4&&t<4.6){sweat(480,1090,1);sweat(340,1120,.8)}
  if(t>5.2&&t<6.4)dizzy(420,1260,t);
  if(t>5.9&&t<6.4)mark(520,1010,key(t,[[5.9,0],[6.05,1,'back']]),'?','#ffd23f');
  if(t>6.5&&t<7.5)bulb(420,960,key(t,[[6.5,0],[6.7,1,'back']]),t);
  if(t>11.7&&t<12.5)mark(830,1020,key(t,[[11.7,0],[11.85,1.2,'back']]),'!');
  if(t>13.2&&t<16.5)speedLines(420,1160-floatLift,0,0,0,t);
  if(t>17.75&&t<18.05)burst(820,1360,.8);
  if(t>19.4)dizzy(830,1420,t,90);
 });
 vignette(.28);
 if(t<0.2){ctx.fillStyle=`rgba(255,255,255,${1-t/0.2})`;ctx.fillRect(0,0,W,H)}
 if(t>21.9)iris(prog(t,21.9,22.8),540,1300);
}
