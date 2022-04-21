// var flor, flor_ing;
var flor_inv;
var jump;

var trex ,trex_running;
var cloud, cloud_ing;
var bg,bg_ing;
var star, star_ing;

//objetos

var placa,placa_ing;
var bone,bone_ing;
var bone2,bone_ing2;
var bone3,bone_ing3;
var bone4,bone_ing4;

var Deadbush,Deadbush_ing;
var Arvore,Arvore_ing;

var obstacle;
var obstacle_1; 
var obstacle_2; 
var obstacle_3; 
var obstacle_4; 
var obstacle_5;   
var obstacle_6;

var score;
var rand;

var play = 1;
var end = 0
var gameState = play;

var reset,reset_ing;
var gameover,gameover_ing;

var group_star;
var group_cloud;

var morri;
//var fundo;



function preload(){

  trex_running = loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png");
  //flor_ing = loadImage ("ground2.png");
  cloud_ing = loadImage ("cloud.png");
  jump = loadAnimation ("Jump (1).png","Jump (2).png","Jump (3).png","Jump (4).png","Jump (5).png","Jump (6).png","Jump (7).png","Jump (8).png","Jump (9).png","Jump (10).png",);
  bg_ing = loadImage ("BG.png");
  star_ing = loadImage ("estrelas.gif");

  // objetos
  
  bone_ing = loadImage ("Bone (1).png");
  bone_ing2 = loadImage ("Bone (2).png");
  bone_ing3 = loadImage ("Bone (3).png");
  bone_ing4 = loadImage ("Skeleton.png");

  placa_ing = loadImage ("Sign.png");
  Deadbush_ing = loadImage ("DeadBush.png");
  Arvore_ing = loadImage ("Tree.png");

  // Inimigos
  obstacle_1 = loadImage ("obstacle1.png");
  obstacle_2 = loadImage ("obstacle2.png");
  obstacle_3 = loadImage ("obstacle3.png");
  obstacle_4 = loadImage ("obstacle4.png");
  obstacle_5 = loadImage ("obstacle5.png")
  obstacle_6 = loadImage ("obstacle6.png");

  // fimd de jogo
  reset_ing = loadImage ("RESTART.png");
  gameover_ing = loadImage ("gameOver.png");

  morri = loadSound ("morri_1.mp3");
  fundo = loadSound ("fundo");
}

function setup(){
  createCanvas(600,200);

  bg = createSprite (300,100);
  bg.addImage (bg_ing);
  bg.scale = 0.3;

  Deadbush = createSprite (200,180);
  Deadbush.addImage (Deadbush_ing);
  Deadbush.scale = 0.5;

  bone = createSprite (430,163);
  bone.addImage (bone_ing);
  bone.scale = 0.4;

  bone2 = createSprite (290,150);
  bone2.addImage (bone_ing2);
  bone2.scale = 0.4;

  bone3 = createSprite (320,130);
  bone3.addImage (bone_ing3);
  bone3.scale = 0.3;

  bone4 = createSprite (370,192);
  bone4.addImage (bone_ing4);
  bone4.scale = 0.3;

  Arvore = createSprite (500,192);
  Arvore.addImage (Arvore_ing);
  Arvore.scale = 0.3;
  

  placa = createSprite (100,180);
  placa.addImage (placa_ing);
  placa.scale = 0.4;
  
  //sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.09;
  
  //flor = createSprite (300,180,600,10);
  //flor.addImage (flor_ing);
  //flor.velocityX = -2;

  flor_inv = createSprite (300,200,600,10);
  flor_inv.visible = false;

  gameover = createSprite (width/2,width/2);
  gameover.visible = false;

  reset = createSprite (width/2,width/2 + 20);
  reset.visible = false;

  group_cloud = createGroup ();
  group_star = createGroup ();

  //fundo.paly ();
}

function draw(){
  background ("black");

  if (gameState == play){

    gameover.visible = false;
    reset.visible = false;

    if (keyDown("space") && trex.y >= 160){

      trex.addAnimation ("Pulo", jump);
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.8;
    trex.collide (flor_inv);

     if (flor_inv.x < 0){
      flor_inv.x = flor_inv.width/2;
    }
    
    score = 0;
    score = score + Math.round (frameCount/1);

    fill ("White");
    text ("Distancia Percorrida: " + score + " Metros", 25, 23);

    spawnInimigo ();
    spawnStar ();
    spawnCloud ();
  }

  if (trex.isTouching(obstacle)) {
    gameState = end;
    morri.play ();
  }

  if (gameState == end){

    reset.visible = true;
    gameover.visible = true;

    //------------------------------
    obstacle.lifetime = -1;
    star.lifetime = -1;
    cloud.lifetime = -1;

    if (mousePressedOver (reset)){
      reiniciar ();
    }
  }
  drawSprites();
}

function spawnCloud (){

  if (frameCount %100 == 0){ 
  cloud = createSprite (486,10);
  cloud.addImage (cloud_ing);
  cloud.scale = 0.4;
  cloud.velocityX = -3;
  cloud.lifetime = 200; 
  cloud.y = Math.round (random (10,50)); 
  group_cloud.add (cloud);
  } 

}

function spawnStar (){

  if (frameCount %60 == 0){  
    star = createSprite (574,10);
    star.addAnimation ("estrela", star_ing);
    star.scale = 0.5;
    star.velocityX = -2;
    star.lifetime = 400;
    star.y = Math.round (random (10,100));
    group_star.add(star);
  }
  
}

function spawnInimigo (){

  rand = Math.round (random (1,6));

  if (frameCount % Math.round (random  (60,200) ) == 0) {
    obstacle = createSprite (540,170,20,50);  
    obstacle.scale = 0.4;

    switch (rand){

      //arrumar a escala dos objetos
      
      case 1: obstacle.addImage(obstacle_1)
      break;

      case 2: obstacle.addImage(obstacle_2)
      break;

      case 3: obstacle.addImage(obstacle_3)
      break;

      case 4: obstacle.addImage(obstacle_4)
      break;

      case 5: obstacle.addImage(obstacle_5)
      break;

      case 6: obstacle.addImage(obstacle_6)
      break;
      default: break;
    }

    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
  }

  if (score % 250 == 0){

    obstacle.velocityX = obstacle.velocityX - 3;

  }
}

function reiniciar (){
  gameState = play;

  group_cloud.destroyEach ();
  group_star.destroyEach ();
  obstacle.destroy ();
  
  score = 0;
}


