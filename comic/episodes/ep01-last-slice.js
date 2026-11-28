// Episode 1: "The Last Slice" — two roommates, one slice of pizza, one sneaky pigeon. No words.
const DUR=28.2;
const THUMB_T=12.9;
const CUES=[[0.25,'ding'],[0.5,'whoosh'],[1.6,'sting'],[2.7,'creep'],[3.6,'tick'],[3.7,'alert'],
 [4.75,'alert'],[5.4,'whoosh'],[5.9,'whistle'],[7.1,'question'],[7.8,'suspense'],
 [8.9,'stretch'],[9.55,'pop'],[9.75,'clack'],[10.1,'boing'],[10.4,'alert'],
 [12.2,'whoosh'],[12.75,'pow'],[12.85,'slideup'],[14.3,'boing'],[14.55,'flap'],[14.85,'zip'],[15.0,'bonk'],[15.05,'slidedown'],[15.7,'thud'],
 [15.9,'tweet'],[17.2,'chomp'],[17.65,'chomp'],[18.1,'chomp'],[18.6,'chomp'],[20.8,'whoosh'],[21.6,'bonk'],
 [22.0,'laugh'],[23.9,'snap'],[24.5,'pop'],[24.7,'chomp'],[25.2,'chomp'],[25.7,'flap'],[26.0,'sting'],[26.3,'alert'],[26.5,'sadtrombone']];
const MUSIC={bpm:124,mood:'bouncy',duck:[[12.7,16],[26.0,28.2]]};
const BUN={body:'#ff8a3d',w:300,h:290,legLen:60,hat:'cap',hatColor:'#2f6bff',cheeks:true,armLen:95,shoe:'#3a2a1e'};
const STR={body:'#2ec4b6',w:200,h:440,legLen:85,hat:'tuft',stache:true,stacheColor:'#5b3b22',armLen:105,shoe:'#6b2d5c'};
const TABLE_Y=1170;
function bg(t){
 // wall
 const g=ctx.createLinearGradient(0,0,0,TABLE_Y);g.addColorStop(0,'#ffe8b5');g.addColorStop(1,'#ffd18a');ctx.fillStyle=g;ctx.fillRect(-400,-400,W+800,TABLE_Y+400);
 ctx.fillStyle='rgba(255,255,255,.25)';for(let x=-400;x<W+400;x+=90)ctx.fillRect(x,-400,40,TABLE_Y+400);
 // window
 rrect(640,180,330,380,20,'#8fd8ff');ctx.save();ctx.beginPath();ctx.roundRect(640,180,330,380,20);ctx.clip();
 ell(880,260,60,60,'#fff27a',null);for(let i=0;i<3;i++){const cx=((t*25+i*170)%560)+560;ell(cx,330+i*60,70,26,'#fff',null);ell(cx+40,320+i*60,50,26,'#fff',null)}ctx.restore();
 rrect(640,180,330,380,20,null);line([805,180,805,560]);line([640,370,970,370]);rrect(620,550,370,30,10,'#c98a4b');
 // framed picture (a pizza portrait, of course)
 rrect(90,240,250,200,10,'#fff7e6');rrect(90,240,250,200,10,null,'#8b5a2b',22);ctx.save();ctx.translate(215,345);ctx.rotate(.15);pizza(.9);ctx.restore();
 // shelf
 rrect(40,640,360,26,8,'#a0632f');line([90,666,120,720,150,666],OUT,8);line([290,666,320,720,350,666],OUT,8);
 ell(330,600,32,40,'#62c370');rrect(306,605,48,40,8,'#d9653b');
 // floor
 ctx.fillStyle='#7b4b2a';ctx.fillRect(-400,TABLE_Y,W+800,1200);
 for(let r=0;r<12;r++)for(let c=-4;c<14;c++){if((r+c)%2)continue;ctx.fillStyle='#8a5733';
  const y0=TABLE_Y+40+r*70;ctx.fillRect(c*110+(r%2)*0,y0,110,70)}
}
function table(){rrect(120,TABLE_Y-30,840,44,14,'#e2513d');rrect(150,TABLE_Y+14,780,260,10,'#f6f2e9');
 ctx.save();ctx.beginPath();ctx.rect(150,TABLE_Y+14,780,260);ctx.clip();for(let x=150;x<930;x+=60){ctx.fillStyle='rgba(226,81,61,.35)';ctx.fillRect(x,TABLE_Y+14,30,260)}ctx.restore();
 rrect(150,TABLE_Y+14,780,260,10,null);ctx.beginPath();for(let x=150;x<=930;x+=52){ctx.arc(x+26,TABLE_Y+274,26,0,PI)}path('#f6f2e9');
 line([200,TABLE_Y+300,200,TABLE_Y+430],OUT,18);line([880,TABLE_Y+300,880,TABLE_Y+430],OUT,18)}
let slicePos=null; // where the free slice is
function scene(t){
 // ---- camera ----
 const cam={x:key(t,[[0,540],[1.2,540],[1.6,540],[2.0,540],[2.6,540],[12.6,540],[13.2,540],[16,540]]),
  y:key(t,[[0,1120],[1.2,960],[1.6,960],[2.0,940],[2.5,960],[12.9,960],[13.6,760,'out'],[14.4,700],[15.4,820],[16.2,1100],[26.0,1100],[26.6,1150]]),
  z:key(t,[[0,2.3],[1.2,1,'back'],[1.6,1],[1.9,1.45,'out'],[2.5,1.45],[2.7,1],[12.6,1],[13.6,1.05],[16.2,1],[25.9,1],[26.5,1.2,'out']]),
  shake:t>12.75&&t<13.1?28:t>15.7&&t<16.0?22:t>3.65&&t<3.85?8:t>26.0&&t<26.4?10:0};
 withCam(cam,t,()=>{
  bg(t);
  // ---------- Bun pose ----------
  const bp={x:300,y:1300,look:[0,.4],mouth:'smile',armL:-70,armR:-70,brow:'none',blink:(t%3.3<.12)?1:0};
  const sp={x:780,y:1300,look:[0,.4],mouth:'smile',armL:-70,armR:-70,brow:'none',blink:((t+1.3)%3.7<.12)?1:0};
  // B1 establish + stare
  if(t>1.55&&t<2.6){bp.look=[1,-.2];sp.look=[-1,0];bp.brow=sp.brow='angry';bp.mouth=sp.mouth='flat';bp.eyes=sp.eyes='squint'}
  // B2 reach together
  if(t>=2.6&&t<4.6){const r=key(t,[[2.6,0],[3.6,1,'in'],[4.1,1],[4.5,0]]);bp.armR=key(t,[[2.6,-70],[3.6,-8.5]]);bp.reachR=20*r;
   sp.armL=key(t,[[2.6,-70],[3.6,-34]]);sp.reachL=83*r;bp.look=[.6,.5];sp.look=[-.6,.5];bp.mouth=sp.mouth='flat';
   if(t>3.6){bp.look=[1,-.2];sp.look=[-1,0];bp.eyes=sp.eyes='big';bp.mouth=sp.mouth='o'}
   if(t>4.1){bp.armR=-70;sp.armL=-70}}
  // B3 distraction trick
  let sliceOnPlate=t<5.6;let bunHoldR=false,bunHoldL=false,strHoldL=false;
  if(t>=4.6&&t<8.4){bp.armL=key(t,[[4.6,-70],[4.8,25,'back']]);bp.mouth='o';bp.eyes='big';bp.look=[-1,-.3];bp.brow='up';
   if(t>5.0)sp.look=[-1,-.4],sp.mouth='o',sp.rot=key(t,[[5,0],[5.3,-6]]);
   if(t>5.35){bp.armR=key(t,[[5.35,-70],[5.5,-8.5,'out'],[5.6,-8.5],[5.85,-100,'in']]);bp.reachR=key(t,[[5.35,0],[5.5,20],[5.6,20],[5.85,0]]);bp.look=[.6,.5];bunHoldR=t>5.55;bp.mouth='grin'}
   if(t>5.9){bp.armL=-100;bp.mouth='whistle';bp.look=[.3,-1];bp.eyes='normal';bp.brow='up';bp.rot=Math.sin(t*5)*3}
   if(t>7.0){sp.rot=key(t,[[7,-6],[7.15,0]]);sp.look=[-.4,.6];sp.eyes='big';sp.mouth='flat'}
   if(t>7.7){sp.look=[-1,0];sp.eyes='squint';sp.brow='angry';sp.mouth='frown'}}
  // B4 the super-stretch steal
  if(t>=8.4&&t<11.5){bunHoldL=t<9.55;bp.armR=-70;bp.armL=key(t,[[8.4,-100],[8.7,40,'out']]);bp.look=[-1,-.3];bp.eyes='normal';
   bp.mouth=t<9.7?'wide':t<10.1?'chomp':'o';bp.brow='none';
   sp.eyes='squint';sp.brow='angry';sp.look=[-1,0];sp.mouth=t>9.6?'grin':'flat';
   sp.armL=key(t,[[8.8,-70],[9.5,-3],[10.2,-30]]);sp.reachL=key(t,[[8.8,0],[9.5,491,'out'],[9.6,491],[10.2,40,'in'],[11.5,40]]);sp.bendL=key(t,[[8.8,0],[9.5,-260],[10.2,-30]]);
   strHoldL=t>=9.55;
   if(t>10.1){bp.look=[-1,.2];bp.eyes='big';bp.lift=key(t,[[10.35,0],[10.5,60,'out'],[10.75,0,'bounce']]);bp.mouth='o'}
   if(t>10.8){bp.look=[1,0];bp.brow='angry';bp.eyes='squint';bp.mouth='frown'}}
  // B5 eat attempt + tackle
  let flying=null;
  if(t>=11.5&&t<14.2){sp.armL=key(t,[[11.5,-30],[12.0,45]]);sp.reachL=40;sp.mouth=t<12.75?'wide':'o';sp.blink=t<12.6&&t>11.9?1:0;strHoldL=t<12.75;sp.look=[-.5,-.5];
   bp.brow='angry';bp.eyes='squint';bp.mouth='frown';
   bp.sy=key(t,[[11.9,1],[12.15,.75],[12.3,1.15,'out'],[12.6,1]]);bp.sx=2-bp.sy;
   bp.x=key(t,[[12.2,300],[12.72,600,'in'],[12.8,600],[13.4,300,'out']]);bp.lift=key(t,[[12.2,0],[12.5,220,'out'],[12.72,180,'in'],[12.8,180],[13.4,0,'bounce']]);bp.rot=key(t,[[12.2,0],[12.6,35],[12.8,35],[13.4,0]]);
   bp.armR=key(t,[[12.2,-70],[12.5,20]]);
   if(t>12.75){sp.rot=key(t,[[12.75,0],[12.9,18,'out'],[13.6,0,'elastic']]);sp.eyes='big';sp.look=[0,-1];sp.armL=50;bp.look=[0,-1];bp.mouth='o';bp.eyes='big';bp.brow='none'}
   if(t>13.4){sp.mouth='o';bp.armR=-70}}
  // free slice flight
  if(t>=12.75&&t<14.85){const p=prog(t,12.75,14.0);slicePos=[key(t,[[12.75,660],[14.0,540]]),key(t,[[12.75,860],[14.0,330,'out'],[14.6,320],[14.85,330]]),t*9]}else slicePos=null;
  // B6 jump, pigeon steal, mid-air bonk, fall in front of table
  let front=false;let birdPos=null,birdHold=false,birdFly=true,birdFlip=false;
  if(t>=14.2&&t<16.2){const pre=key(t,[[14.2,1],[14.4,.8],[14.55,1.1]]);bp.sy=sp.sy=pre;bp.sx=sp.sx=2-pre;
   bp.look=sp.look=[0,-1];bp.mouth=sp.mouth='wide';bp.armL=bp.armR=sp.armL=sp.armR=70;
   bp.x=key(t,[[14.5,300],[15.0,430,'out'],[15.75,360]]);sp.x=key(t,[[14.5,780],[15.0,650,'out'],[15.75,700]]);
   bp.lift=key(t,[[14.5,0],[15.0,560,'out'],[15.05,560],[15.75,-400,'in']]);sp.lift=key(t,[[14.5,0],[15.0,420,'out'],[15.05,420],[15.75,-400,'in']]);
   if(t>15.05)front=true;if(t>15.0){bp.eyes=sp.eyes='x';bp.mouth=sp.mouth='o';bp.rot=key(t,[[15,0],[15.75,-25]]);sp.rot=key(t,[[15,0],[15.75,25]]);bp.armL=bp.armR=sp.armL=sp.armR=60}
   if(t>15.75){front=true;bp.y=sp.y=1700;bp.lift=sp.lift=0;const sq=key(t,[[15.75,.6],[16.2,1,'elastic']]);bp.sy=sp.sy=sq;bp.sx=sp.sx=2-sq;bp.eyes=sp.eyes='spiral';bp.rot=sp.rot=0;bp.armL=bp.armR=sp.armL=sp.armR=-70;bp.mouth=sp.mouth='o'}}
  if(t>=14.5){const bx=key(t,[[14.5,1350],[14.85,560,'in'],[15.6,230,'out'],[15.9,230]]),by=key(t,[[14.5,250],[14.85,330],[15.6,560,'in'],[15.9,595]]);
   birdPos=[bx,by];birdHold=t>14.85;birdFly=t<15.8;birdFlip=t>15.0}
  if(t>=16.2){front=true;bp.y=sp.y=1700;bp.x=360;sp.x=700;bp.eyes=sp.eyes=t<18.6?'spiral':'normal';bp.mouth=sp.mouth=t<18.6?'o':'frown';
   if(t>18.6){bp.look=[-.8,-1];sp.look=[-1,-1];bp.brow=sp.brow='sad'}}
  // B7/B8 pigeon eats, drops crust on Stretch, Bun laughs
  let crustPos=null,birdSmug=false,bitten=Math.floor(prog(t,17.1,18.8)*4);
  if(t>=16.0)birdSmug=true;
  if(t>=20.6&&t<21.6){crustPos=[key(t,[[20.6,320],[21.6,700]]),key(t,[[20.6,560],[20.9,470,'out'],[21.6,1168,'in']]),t*10]}
  if(t>=21.6&&t<23.9){crustPos=[700,1168,0.2];sp.eyes='squint';sp.mouth='frown';sp.brow='angry';sp.look=[-1,0];sp.sy=key(t,[[21.6,.85],[22,1,'elastic']]);sp.sx=2-sp.sy;
   if(t>22.0){bp.mouth='laugh';bp.eyes='squint';bp.brow='up';bp.armL=key(t,[[22,-70],[22.2,0]]);bp.armR=20;bp.reachR=40;bp.rot=Math.sin(t*25)*6;bp.lift=Math.abs(Math.sin(t*12))*20;bp.look=[1,0]}}
  // B9 share + the gang arrives
  let crustHalves=false;
  if(t>=23.9){sp.armL=key(t,[[23.9,10],[24.5,0]]);sp.reachL=key(t,[[23.9,20],[24.3,60],[24.6,10]]);sp.armR=10;crustHalves=true;sp.brow='none';sp.eyes='normal';sp.mouth=t<24.5?'flat':'smile';sp.look=[-1,0];
   bp.mouth=t<24.3?'o':'smile';bp.eyes=t<24.3?'big':'normal';bp.brow='none';bp.look=[1,0];bp.armR=key(t,[[24,-70],[24.4,0]]);bp.reachR=key(t,[[24,0],[24.4,30]]);bp.armL=-70}
  if(t>=24.6&&t<26.0){bp.mouth=sp.mouth='chomp';bp.eyes=sp.eyes='squint';bp.armR=sp.armL=40;bp.reachR=sp.reachL=0}
  if(t>=26.0){bp.eyes=sp.eyes='big';bp.mouth=sp.mouth='o';bp.look=[.2,-1];sp.look=[-.2,-1];bp.armR=sp.armL=40;bp.reachR=sp.reachL=0;bp.x=key(t,[[26.1,360],[26.5,410,'back']]);sp.x=key(t,[[26.1,700],[26.5,660,'back']]);
   bp.rot=Math.sin(t*50)*2;sp.rot=Math.sin(t*50+1)*2}
  // ---- draw back layer ----
  const half=()=>crust(.5);
  if(!front){drawChar(BUN,{...bp,holdR:bunHoldR?()=>pizza(.7):null,holdL:bunHoldL?()=>pizza(.7):null},t);
   drawChar(STR,{...sp,holdL:strHoldL?()=>pizza(.7):null},t)}
  table();
  ell(540,TABLE_Y-30,120,26,'#fff',OUT,7);ell(540,TABLE_Y-32,90,16,'#eef3f7',null);
  if(sliceOnPlate){ctx.save();ctx.translate(540,TABLE_Y-80);ctx.rotate(-.1);pizza(.85);ctx.restore();
   if(t<2.6){sparkle(470,TABLE_Y-150,.7+.3*Math.sin(t*8),t);sparkle(615,TABLE_Y-120,.5+.3*Math.sin(t*8+2),t);ctx.save();ctx.globalAlpha=.25+.15*Math.sin(t*6);ell(540,TABLE_Y-80,150,110,'#fff6a0',null);ctx.restore()}}
  if(slicePos){ctx.save();ctx.translate(slicePos[0],slicePos[1]);ctx.rotate(slicePos[2]);pizza(.8);ctx.restore();if(t<13.6)speedLines(slicePos[0],slicePos[1]+60,0,0,0,t)}
  // the gang of pigeons on the table edge at the end
  if(t>=25.7){for(let i=0;i<5;i++){const tx=180+i*180,land=key(t,[[25.7+i*.08,-300],[26.0+i*.08,TABLE_Y-70,'out']]);bird(tx,land,.9,t*30*(land<TABLE_Y-80?1:0),{fly:land<TABLE_Y-80,flip:i<2,lookX:i<2?1:-1})}}
  if(front){drawChar(BUN,{...bp,holdR:crustHalves&&t>24.4?half:null},t);
   drawChar(STR,{...sp,holdL:crustHalves&&t<24.6?()=>crust(.8):crustHalves?half:null,holdR:crustHalves&&t>=24.6&&t<24.45?half:null},t)}
  if(crustPos){ctx.save();ctx.translate(crustPos[0],crustPos[1]);ctx.rotate(crustPos[2]);crust(.8);ctx.restore()}
  // bird
  if(birdPos&&t<25.7){bird(birdPos[0],birdPos[1],.95,t*28*(birdFly?1:0)+(birdFly?0:-.4),{fly:birdFly,flip:!birdFlip?true:false,smug:birdSmug&&!birdFly,lookX:1,
   hold:birdHold&&t<20.6?()=>{ctx.save();ctx.rotate(.6);t<17.1?pizza(.55):(()=>{if(bitten<4){ctx.save();ctx.scale(1,1);pizza(.55,1);ctx.restore()}})();if(bitten>=3)crust(.55);ctx.restore()}:null});
   if(t>17.1&&t<19){for(let i=0;i<5;i++){const ct=(t*2+i*.37)%1;ell(300+i*12,600+ct*560,6,6,'#d98b3a',OUT,3)}}}
  // ---- marks & effects ----
  if(t>3.7&&t<4.4){mark(300,820,key(t,[[3.7,0],[3.85,1.1,'back']]),'!');mark(780,620,key(t,[[3.7,0],[3.85,1.1,'back']]),'!')}
  if(t>4.75&&t<5.4)mark(250,800,key(t,[[4.75,0],[4.9,1,'back']]),'!');
  if(t>5.0&&t<5.5)speedLines(120,950,-1,200,8,t);
  if(t>7.1&&t<7.7)mark(840,620,key(t,[[7.1,0],[7.25,1,'back']]),'?','#ffd23f');
  if(t>5.9&&t<7.0){for(let i=0;i<2;i++){const ph=(t*1.2+i*.5)%1;ctx.save();ctx.globalAlpha=1-ph;ctx.font='900 70px Arial';ctx.fillStyle='#2f6bff';ctx.fillText('♪',360+ph*80+i*20,960-ph*160);ctx.restore()}}
  if(t>10.4&&t<11.2)mark(300,780,key(t,[[10.4,0],[10.55,1.2,'back']]),'!');
  if(t>10.8&&t<11.5){ctx.save();ctx.globalAlpha=.8;line([240,860,280,840],OUT,10);ctx.restore()}
  if(t>12.72&&t<13.05)burst(640,930,key(t,[[12.72,.4],[12.85,1.3,'out']]));
  if(t>12.2&&t<12.72)speedLines(bp.x-60,1100-bp.lift,1,240,9,t);
  if(t>14.5&&t<14.9&&birdPos)speedLines(birdPos[0]+80,birdPos[1],-1,260,8,t,'#fff');
  if(t>15.0&&t<15.3)burst(540,700,key(t,[[15,.3],[15.1,.9,'out']]),'#fff','#ffd23f');
  if(t>15.75&&t<16.0){ctx.save();ctx.globalAlpha=.6;ell(360,1700,160,30,'#d9b38c',null);ell(700,1700,140,30,'#d9b38c',null);ctx.restore()}
  if(t>15.9&&t<18.6){dizzy(360,1260,t);dizzy(700,1080,t+1)}
  if(t>21.6&&t<22.0)burst(700,1050,.45,'#fff','#ffd23f');
  if(t>22.1&&t<23.9)sweat(820,1180,1);
  if(t>24.8&&t<26)heart(540,1130-((t-24.8)*120),.9+.1*Math.sin(t*10));
  if(t>26.25)sweat(300,1330,1),sweat(780,1150,1),mark(540,1000,key(t,[[26.25,0],[26.4,1.2,'back']]),'!');
 });
 vignette(.28);
 if(t<0.25){ctx.fillStyle=`rgba(255,255,255,${1-t/0.25})`;ctx.fillRect(0,0,W,H)}
 if(t>12.72&&t<12.82){ctx.fillStyle='rgba(255,255,255,.7)';ctx.fillRect(0,0,W,H)}
 if(t>26.6)iris(prog(t,26.6,27.6,),560,1150-(1150-960)*0+0);
}
