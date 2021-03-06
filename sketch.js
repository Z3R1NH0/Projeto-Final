// Obrigado pela ajuda <3
// a musica n ta dando upload, o arquivo e muito pesado.
// n tinha nem reparado nessas coisas obrigado S2
// arrumei os problemas, mas n sei pq o obstaculo ta nascendo um em cima do outro, e pq tem um sprite ali no meio do nada. Ficou ruim mas tentei colocar oq a gente aprendeu.











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

var score = 0;
var rand;

var play = 1;
var end = 0
var gameState = play;

var reset,reset_ing;
var gameover,gameover_ing;

var group_star;
var group_cloud;
var grupo_inimigos;

var morri;
var dead;
//var fundo;



function preload(){

  trex_running = loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png");
  //flor_ing = loadImage ("ground2.png");
  cloud_ing = loadImage ("cloud.png");
  jump = loadAnimation ("Jump (1).png","Jump (2).png","Jump (3).png","Jump (4).png","Jump (5).png","Jump (6).png","Jump (7).png","Jump (8).png","Jump (9).png","Jump (10).png",);
  bg_ing = loadImage ("BG.png");
  star_ing = loadImage ("estrelas.gif");
  dead = loadAnimation ("Dead (1).png","Dead (2).png","Dead (3).png","Dead (4).png","Dead (5).png","Dead (6).png","Dead (7).png","Dead (8).png","Dead (9).png","Dead (10).png",)

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
  //fundo = loadSound ("fundo");
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
  trex.addAnimation("trex", trex_running);
  trex.scale = 0.09;
  
  //flor = createSprite (300,180,600,10);
  //flor.addImage (flor_ing);
  //flor.velocityX = -2;

  flor_inv = createSprite (300,200,600,10);
  flor_inv.visible = false;

  gameover = createSprite (300,100);
  gameover.addImage(gameover_ing);
  gameover.visible = false;

  reset = createSprite (300,140);
  reset.addImage(reset_ing);
  reset.visible = false;

  group_cloud = createGroup ();
  group_star = createGroup ();
  grupo_inimigos = createGroup ();

  //fundo.paly ();
}

function draw(){
  background ("black");

  console.log (trex.y);
  
  trex.collide (flor_inv);

  if (gameState == play){

    gameover.visible = false;
    reset.visible = false;

    if (keyDown("space") && trex.y >= 163){

      trex.changeAnimation ("trex", jump);
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.5;

     if (flor_inv.x < 0){
      flor_inv.x = flor_inv.width/2;
    }
    
    score = score + Math.round (frameCount/1);
    fill ("White");
    text ("Distancia Percorrida: " + score + " Metros", 25, 23);

    spawnInimigo ();
    spawnStar ();
    spawnCloud ();
  }

  if (trex.isTouching(grupo_inimigos)) {
    gameState = end;

    group_cloud.destroyEach ();
    group_star.destroyEach ();
    grupo_inimigos.destroyEach ();

    trex.changeAnimation ("trex",dead);

    morri.play ();
  }

  if (gameState == end){

    reset.visible = true;
    gameover.visible = true;

    //------------------------------
    grupo_inimigos.lifetime = -1;
    group_cloud.lifetime = -1;
    group_star.lifetime = -1;

    if (mousePressedOver (reset)){
      reiniciar ();
    }
  }
  drawSprites();
}

function spawnCloud (){
  cloud = createSprite (610,10);
  
  if (frameCount %100 == 0){ 
  cloud.addImage (cloud_ing);
  cloud.scale = 0.4;
  cloud.velocityX = -3;
  cloud.y = Math.round (random (10,50));  
  cloud.lifetime = 230; 
  
  } 
}

function spawnStar (){
  star = createSprite (620,10);
  group_star.add(star);
  
  if (frameCount %60 == 0){  
    star.addAnimation ("estrela", star_ing);
    star.scale = 0.5;
    star.velocityX = -2;
    star.y = Math.round (random (10,100)); 
    star.lifetime = 430;
    
  }
}

function spawnInimigo (){

  rand = Math.round (random (1,6));
  
  obstacle = createSprite (610,180,20,50);  
  grupo_inimigos.add(obstacle);
  
  if (frameCount % Math.round (random  (60,200) ) == 0) {
    switch (rand){

      //arrumar a escala dos objetos
      
      case 1: obstacle.addImage(obstacle_1);
      break;

      case 2: obstacle.addImage(obstacle_2);
      break;

      case 3: obstacle.addImage(obstacle_3);
      break;

      case 4: obstacle.addImage(obstacle_4);
      break;

      case 5: obstacle.addImage(obstacle_5);
      break;

      case 6: obstacle.addImage(obstacle_6);
      break;
      default: break;
    }

    obstacle.velocityX = -3;
    obstacle.scale = 0.4;
    obstacle.lifetime = 220;
  }

  if (score % 250 == 0){

    obstacle.velocityX = obstacle.velocityX - 3;

  }
}

function reiniciar (){
  gameState = play;

  group_cloud.destroyEach ();
  group_star.destroyEach ();
  grupo_inimigos.destroyEach ();
  
  score = 0;
}


