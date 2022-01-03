var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppBlue1Img,oppBlue2Img;
var oppDBlue1Img,oppDBlue2Img;
var oppPink1Img,oppPink2Img;
var gameOverImg,cycleBell;

var blueCG, dblueCG,pinkCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance = 0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");

  oppBlue1Img = loadAnimation("opponent1.png","opponent2.png");
  oppBlue2Img = loadAnimation("opponent3.png");

  oppDBlue1Img = loadAnimation("opponent4.png","opponent5.png");
  oppDBlue2Img = loadAnimation("opponent6.png");

  oppPink1Img = loadAnimation("opponent7.png","opponent8.png");
  oppPink2Img = loadAnimation("opponent9.png");

  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(1200,300);
  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy cycling
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilCycling",mainRacerImg1);
mainCyclist.scale=0.07;
mainCyclist.setCollider("rectangle",0,0,40,40);

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  

blueCG = new Group();
dblueCG = new Group();
pinkCG = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(22);
  fill(255);
  text("Distance: "+ distance,900,30);

  if(gameState===PLAY){
    
    distance = distance + Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2*distance/150);
   
    mainCyclist.y = World.mouseY;
   
    edges= createEdgeSprites();
    mainCyclist .collide(edges);
  }

  // to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  //  to play cycle bell
  if(keyDown("b")) {
    cycleBell.play();
  }


 var select_opponent = Math.round(random(1,3));

 if(World.frameCount % 150 == 0) {
   if(select_opponent == 1){
     bluecyclists();
   }
   else if(select_oppoent == 2) {
     dbluecyclists();
   }
   else {
     pinkcyclists();
   }
 }

 if(blueCG.isTouching(mainCyclist)){
   gameState = END;
   player1.velocityY = 0;
   player1.addAnimation("opponentPlayer1",oppBlue2Img);
 }

 if(dblueCG.isTouching(mainCyclist)) {
   gameState = END;
   player2.velocityY = 0;
   player2.addAnimation("opponentPlayer2",oppDBlue2Img);
 }

 if(pinkCG.isTouching(mainCyclist)) {
   gameState = END;
   player3.velocityY = 0;
   player3.addAnimation("opponentPlayer3",oppPink2Img);  
  }
  
 else if(gameState === END){
    gameOver.visible = true;

    textSize(20);
    fill(255);
    text("Press Spacebar to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilCycling",mainRacerImg2);

    blueCG.setVelocityXEach(0);
    blueCG.setLifetimeEach(-1);

    dblueCG.setVelocityXEach(0);
    dblueCG.setLifetimeEach(-1);

    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);

    if(keyDown("space")) {
      reset();
    }
  }
  
  function bluecyclists(){
    player1 =createSprite(1100,Math.round(random(50, 250)));
    player1.scale =0.35;
    player1.velocityX = -(6 + 2*distance/150);
    player1.addAnimation("opponentPlayer1",oppBlue1Img);
    player1.setLifetime = 170;
    blueCG.add(player1);
  }

  function dbluecyclists(){
    player2 = createSprite(1100,Math.round(random(50,250)));
    player2.scale = 0.35;
    player2.velocityX = -(6 + 2*distance/150);
    player2.addAnimation("opponentPlayer2",oppDBlue1Img);
    player2.setLifetime = 170;
    dblueCG.add(player2);
  }

  function pinkcyclists() {
    player3 = createSprite(1100,Math.round(random(50,250)));
    player3.scale = 0.35;
    player3.setVelocityX = -(6 + 2*distance/150);
    player3.addAnimation("opponentPlayer3",oppPink1Img);
    player3.setLifetime = 170;
    pinkCG.add(player3);
  }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    
    blueCG.destroyEach();
    dblueCG.destroyEach();
    pinkCG.destroyEach();
    
    distance = 0;
 }
 }
