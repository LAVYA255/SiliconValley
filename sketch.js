var PLAY=1;
var END=0;
var bg , bgimg, busimg, bus,book, bookimg;
var gameState=PLAY;
var boyimg;
var ground;
var stoneimg;
var pencilimg;
var score=0;
var obstaclesgrp;
var goimg, go;
var cloud1img, cloud2img, cloud3img;
var cloudsgrp;
var gosound;
var jump;
var restartimg;
var restart;

function preload(){
bgimg=loadImage("background.jpg");
busimg=loadImage("bus.png");
boyimg=loadImage("boy.png");
bookimg=loadImage("book.png");
stoneimg=loadImage("Stone.png");
pencilimg=loadImage("Pencil.png")
goimg= loadImage("Gameover.jpg")
cloud1img=loadImage("cloud1.png");
cloud2img=loadImage("cloud2.png");
cloud3img=loadImage("cloud3.png");

gosound=loadSound("gosound.wav");
jump=loadSound("jump.wav");
restartimg=loadImage("restart.png")
}
function setup() {
  createCanvas(1600,1050);
 

obstaclesgrp= createGroup();
cloudsgrp=createGroup();
ground=createSprite(800,1000,1500,10);


bus=createSprite(200,900,50,50);
bus.addImage(busimg); 
bus.scale=0.4;
 boy= createSprite(1460,900,50,50);
 boy.addImage(boyimg);
boy.scale=0.6;
boy.setCollider("circle",0,0,140);

go=createSprite(800,525,width/2,height/2);
go.addImage(goimg);
go.scale=2.65;

restart=createSprite(width-1550,height-970)
restart.addImage(restartimg);
restart.scale=0.2;

}
function reset(){

obstaclesgrp.destroyEach();

cloudsgrp.destroyEach();

score=0;

go.visible= false;

restart.visible=true;

gameState=PLAY;
}

function spawnObs(){
 
  var u= Math.round(random(140,240))
  
  if(frameCount%u===7){
  
var obstacles=createSprite(200,900,10,10);
//obstacles.debug=true;
obstacles.velocityX=(7 + score/50);
var r=Math.round(random(1,3));
switch(r){
  case 1:obstacles.addImage(bookimg);
  
  break;

  case 2:obstacles.addImage(stoneimg);
  obstacles.setCollider("circle",0,0,85); 
 
  break; 
 
  case 3:obstacles.addImage(pencilimg);

  break;

  default:break;

  
}


obstacles.scale=0.2;
obstacles.lifetime=400;
obstaclesgrp.add(obstacles);

obstacles.depth=go.depth;
go.depth=go.depth+1;
}

}

function spawnClouds(){

  if(frameCount%90===0){
  
var cloud=createSprite(100,100,10,10);
cloud.y=Math.round(random(50,200));
cloud.velocityX=5;
var a=Math.round(random(1,3));
switch(a){
  case 1:cloud.addImage(cloud1img);
  
  break;

  case 2:cloud.addImage(cloud2img);
   
  break; 
 
  case 3:cloud.addImage(cloud3img);
  break;

  default:break;

  
}


cloud.scale=0.2;
cloud.lifetime=400;
cloudsgrp.add(cloud);
cloud.depth=go.depth;
go.depth=go.depth+2;

cloud.depth=restart.depth;
restart.depth=restart.depth+1;

}

}


function draw() {

 background(bgimg);


fill("black")
 textSize(40);
  text("Score:"+score,1400,50);


 
if(gameState===PLAY){
  score=score+Math.round(getFrameRate()/60);
  go.visible=false;
  if(boy.y>900){
    if(keyDown('SPACE')){
   boy.velocityY=-25;
   jump.play();
   }
    
  }
  boy.velocityY=boy.velocityY+0.8
 boy.collide(ground);
 ground.visible=false;
  if(obstaclesgrp.isTouching(boy)){
 gameState=END;
gosound.play();
  }
  spawnObs();
  spawnClouds();
}else if(gameState===END){

  boy.velocityY=0;
 obstaclesgrp.setLifetimeEach(-1);
obstaclesgrp.setVelocityXEach(0);

cloudsgrp.setVelocityXEach(0);
cloudsgrp.setLifetimeEach(-1);
go.visible=true;
go.depth=restart.depth


restart.depth=restart.depth+1
restart.visible=true;
ground.visible=false;
}
if(mousePressedOver(restart)){
  reset();
}



  drawSprites();

}