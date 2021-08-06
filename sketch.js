var car1,car1Image;
var car2,car2Image;
var scooter,scooterImage;
var truck,truckImage;
var car1Group,car2Group,scooterGroup,truckGroup;
var road,roadImage;
var player,playerImage;
var score ,coins;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameover,gameoverImage;
var restart,restartImage;
var left_Img ,right_Img;
var left ,right;
var stone_Img;
var overSound;
var coin_Img;
var line1 ,line2;

function preload(){
  playerImage=loadImage("ford.png");
  roadImage=loadImage("Road.jpg");
  car1Image=loadImage("car1.png");
  car2Image=loadImage("car2.png");
  scooterImage=loadImage("scooter.png");
  truckImage=loadImage("truck.png");
  gameoverImage=loadImage("gameover.png");
  restartImage=loadImage("restart.png");
  left_Img=loadImage("left.png");
  right_Img=loadImage("right.png");
  stone_Img=loadImage("stone.png");
  overSound=loadSound("gameOver.mp3")
  coin_Img=loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png")
}

function setup() {
  createCanvas(600,600);
  
  road=createSprite(285,300,550,600);
  road.addImage(roadImage);
  road.scale=4.52;
  
  left=createSprite(30,580);
  left.addImage(left_Img);
  left.scale=0.5;

  right=createSprite(520,580);
  right.addImage(right_Img);
  right.scale=0.5;
  
  player=createSprite(270,520,30,30);
  player.addImage(playerImage);
  player.scale=0.28;
  player.setCollider('rectangle',10,0,200,500)
  player.debug =false;

  gameover=createSprite(270,300,30,30)
  gameover.addImage(gameoverImage);
  gameover.scale=0.6;
  
  restart=createSprite(270,400,30,8)
  restart.addImage(restartImage);
  restart.scale=0.2;

  line1=createSprite(2,300,2,600);
  line2=createSprite(600,300,2,600);
  line1.visible=false;
  line2.visible=false;

  car1Group= new Group();
  car2Group= new Group();
  scooterGroup=new Group();
  truckGroup=new Group();
  stonesGroup=new Group();
  coinsGroup=new Group();

  score=0;
  coins=0;

}


function draw() {
 background("lightgreen");
  
  if(gameState===PLAY){
  
  road.velocityY=7;
  
  score = score + Math.round(getFrameRate()/30);
  console.log(frameCount)
  
  if (road.y > 650){
      road.y = road.height/2;
    }
  
  if(keyDown("right_arrow") || mousePressedOver(right)){
    player.x= player.x+8;
  }
  
  if(keyDown("left") || mousePressedOver(left)){
     player.x= player.x-8;
  }

  player.collide(line1);
  player.collide(line2); 
  
  spawncar1();
  spawncar2();
  spawnscooter();
  spawntruck();
  spawnstone();
  spawncoins();

  if(player.isTouching(coinsGroup)){
    coins = coins+2;
    coinsGroup.destroyEach();
  }

  if(car1Group.isTouching(car2Group)){
    car2Group.destroyEach();
  }
  
  if(car1Group.isTouching(truckGroup)){
    car1Group.destroyEach();
  }
  
  if(car1Group.isTouching(scooterGroup)){
    scooterGroup.destroyEach();
  }
   if(car2Group.isTouching(scooterGroup)){
    car2Group.destroyEach();
  }
   if(car2Group.isTouching(truckGroup)){
    truckGroup.destroyEach();
  }
  if(truckGroup.isTouching(scooterGroup)){
    scooterGroup.destroyEach();
  }
  if(stonesGroup.isTouching(truckGroup)){
    stonesGroup.destroyEach();
  }
  
  if(player.isTouching(car1Group)||player.isTouching(car2Group)||
       player.isTouching(scooterGroup)||player.isTouching(truckGroup)|| player.isTouching(stonesGroup)){
      gameState=END;
      overSound.play();
    }
    
  gameover.visible=false;
  restart.visible=false;
  }
  
  if(gameState===END){
     road.velocityY=0;
    car1Group.destroyEach();
    car2Group.destroyEach();
    scooterGroup.destroyEach();
    truckGroup.destroyEach();
    stonesGroup.destroyEach();
    coinsGroup.destroyEach();
    player.visible=false;
    gameover.visible=true;
    restart.visible=true;
    
    if(mousePressedOver(restart) || keyDown("SPACE")) {
      reset();
    }

  }
  
  
  drawSprites();
  
  fill("black");
  textFont("Cooper black")
  textSize(20);
  text("Score: "+ score, 400,50);
  text("Coins: "+ coins, 10,50);
}

function reset(){
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  player.visible=true;
  score=0;
  coins=0;
}

function spawncar1(){
  
  if(frameCount%250===0){
 var car1=createSprite(100,-100,30,30);
 car1.setCollider('rectangle',0,0,240,500)
 car1.debug =false; 
    car1.addImage(car1Image);
    car1.scale=0.3;
    car1.velocityY=(4 + 3*score/200);
    car1.x=Math.round(random(40,300));
    car1.lifetime=300;
    car1Group.add(car1);
   
  
  }
  
  
}

function spawncar2(){
  
  if(frameCount%160===0){
 var car2=createSprite(100,-100,30,30);
    car2.addImage(car2Image);
  car2.setCollider('rectangle',0,0,240,500)
  car2.debug =false;
    car2.scale=0.3;
    car2.velocityY=(5 + 3*score/200);
    car2.x=Math.round(random(250,500));
     car2.lifetime=300;
    car2Group.add(car2);
   }
  }


function spawnscooter(){
  
  if(frameCount%350===0){
 var scooter=createSprite(100,-100,30,30);
  scooter.setCollider('rectangle',0,0,160,500)
  scooter.debug =false;
    scooter.addImage(scooterImage);
    scooter.scale=0.2;
    scooter.velocityY=(4 + 3*score/200);
    scooter.x=Math.round(random(40,330));
     scooter.lifetime=300;
    scooterGroup.add(scooter);
   
  
  }
}


function spawntruck(){
if(frameCount%400===0){
 var truck=createSprite(100,-100,30,30);
  truck.setCollider('rectangle',-22,0,200,500)
  truck.debug =false;
    truck.addImage(truckImage);
    truck.scale=0.4;
    truck.velocityY=(5 + 3*score/200);
    truck.x=Math.round(random(50,500));
     truck.lifetime=300;
    truckGroup.add(truck);
   }
  }

  function spawnstone(){
    if(frameCount%100===0){
     var stone=createSprite(300,-100,30,30);
      stone.setCollider('circle',0,0,80)
      stone.debug =false;
        stone.addImage(stone_Img);
        stone.scale=0.4;
        stone.velocityY=(5 + 3*score/200);
        stone.x=Math.round(random(50,500));
        stone.lifetime=300;
        stonesGroup.add(stone);
       }
      }

 function spawncoins(){
 if(frameCount%100===0){
 var coin=createSprite(100,-100,30,30);
 coin.setCollider('circle',0,0,20)
 coin.debug =false;
 coin.addAnimation("coin",coin_Img);
 coin.scale=0.05;
 coin.velocityY=5
 coin.x=Math.round(random(100,550));
 coin.lifetime=300;
 coinsGroup.add(coin);
 }
  }      