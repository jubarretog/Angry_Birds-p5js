// Constants
const {Engine, World, Bodies, Body, Constraint, Mouse, MouseConstraint, Events} = Matter;

// Variables
let engine, world, mc, gameState = "home",isHovering = false, paused = false,
ground,wall,slingShot,
bird, birdCounter= 15, pig, pigs=[],pigCounter= 4, boxes = [],
birdImg = [], pigImg = [], boxImg, groundImg;


// Load images, font and music
function preload(){
  //Home
  homeImg = loadImage("assets/home.png");
  logoImg = loadImage("assets/logo.png");
  playImg = loadImage("assets/play.png");
  
  //Pause
  pauseImg = loadImage("assets/pause-btn.png");
  goHomeImg = loadImage("assets/home-btn.png");
  
  // Birds
  birdImg = [
    loadImage("assets/red.png"),
    loadImage("assets/chuck.png"),
    loadImage("assets/bomb.png")
  ];
  
  // Pigs
  pigImg = [
    loadImage("assets/pig.png"),
    loadImage("assets/corporal-pig.png"),
    loadImage("assets/king-pig.png")
  ];
  
  // Boxes
  boxImg = loadImage("assets/box.png");
  barImg = loadImage("assets/bar.png");
  
  //Sligshot
  slingImg = loadImage("assets/sling.webp");
  
  //Background
  backgroundImg = loadImage("assets/background.png");
  
  //Ground
  groundImg = loadImage("assets/ground.png");
  
  //Font
  angryFont = loadFont("assets/angrybirds-regular.ttf");
  
  // Music and sfx
  homeMusic = loadSound('assets/song.mp3');
  levelMusic = loadSound('assets/level.mp3');
  playSound = loadSound('assets/start.mp3');
  
  //Lose
  loseImg = loadImage('assets/lose.webp');
  loseMusic = loadSound('assets/lose.mp3');
  
  //Clear
  clearImg = loadImage('assets/cleared.png');
  clearMusic = loadSound('assets/clear.mp3');
}


// Logic
function setup() {
  // Music
  levelMusic.stop();
  homeMusic.loop();
  
  // World and controls
  const canvas = createCanvas(640, 480);
  engine = Engine.create();
  world = engine.world;
  
  //Collisions
  Events.on(engine, "collisionStart", handleCollision);
  
  //Mouse
  const mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mc = MouseConstraint.create(
    engine, {
      mouse: mouse,
      collisionFilter: {
        mask: 2
      }
    });
  World.add(world, mc);
  
  //Ground and wall
  wall = new Ground(width, 0, 20,height,groundImg);
  ground = new Ground(0, height-20, width, 20,groundImg);
  
  // Structures
  let box1 = new Box(width-55,height - 50,30, 30, boxImg)
  boxes.push(box1);
  
  let box2 = new Box(width-120,height - 50,30, 30, boxImg)
  boxes.push(box2);
  
  let box3 = new Box(width-185,height-50,30, 30, boxImg)
  boxes.push(box3);
  
  let box4 = new Box(width-270-10,height - 50,30, 30, boxImg)
  boxes.push(box4);
  
  let box5 = new Box(width-270-10,height-80,30, 30, boxImg)
  boxes.push(box5);
  
  let box6 = new Box(width-270-10,height-110,30, 30, boxImg)
  boxes.push(box6);
  
  let box7 = new Box(width /2-20,height-50,30, 30, boxImg)
  boxes.push(box7);
  
   let box8 = new Box(width /2-20,height-80,30, 30, boxImg)
  boxes.push(box8);
  
   let box9 = new Box(width /2-80,height-50,30, 30, boxImg)
  boxes.push(box9);
  
  let box10 = new Box(width-135,height/2-40,35, 35, boxImg)
  boxes.push(box10);
  
  let box11 = new Box(width-135,height/2-75,35, 35, boxImg)
  boxes.push(box11);
  
  let bar1 = new Box(width-190,height-60,180,10, barImg);
  boxes.push(bar1)
  
  let bar2 = new Box(width-220,height-150,100,30, barImg);
  boxes.push(bar2)
  Body.setAngle(bar2.body, radians(-90));
  
  let bar3 = new Box(width-90,height-150,100,30, barImg);
  boxes.push(bar3)
  Body.setAngle(bar3.body, radians(-90));
  
  let bar4 = new Box(width-190,height-200,200,10, barImg);
  boxes.push(bar4)
  
  let bar5 = new Box(width-260,height-120,130,10, barImg);
  boxes.push(bar5)
  Body.setAngle(bar5.body, radians(-80))
  let bar6 = new Box(width-70,height-120,130,10, barImg);
  boxes.push(bar6)
  Body.setAngle(bar6.body, radians(80))
  
  let bar7 = new Box(width-205,height-220,70,25, barImg);
  boxes.push(bar7)
  Body.setAngle(bar7.body, radians(-90));
  
  let bar8 = new Box(width-70,height-218,70,25, barImg);
  boxes.push(bar8)
  Body.setAngle(bar8.body, radians(-90));
  
  let bar9 = new Box(width-175,height-218,60,10, barImg);
  boxes.push(bar9)
  Body.setAngle(bar9.body, radians(-60));
  
  let bar10 = new Box(width-100,height-220,60,10, barImg);
  boxes.push(bar10)
  Body.setAngle(bar10.body, radians(60));
  
  let bar11 = new Box(width-190,height/2-20,200,10, barImg);
  boxes.push(bar11)
  let bar12 = new Box(width-230,height/2-20,200,10, barImg);
  boxes.push(bar12)
  let bar13 = new Box(width-190,height/2-20,200,10, barImg);
  boxes.push(bar13)
  
  let bar14 = new Box(width-60,180,70,10, barImg);
  boxes.push(bar14)
  Body.setAngle(bar14.body, radians(-50));
  
  let bar15 = new Box(width-195,height-280,70,20, barImg);
  boxes.push(bar15)
  Body.setAngle(bar15.body, radians(-90));
  
  let bar16 = new Box(width-100,height-280,70,20, barImg);
  boxes.push(bar16)
  Body.setAngle(bar16.body, radians(-90));
  
  let bar17 = new Box(width-190,140,150,10, barImg);
  boxes.push(bar17)
  
  let bar18 = new Box(width-160,95,70,10, barImg);
  boxes.push(bar18)
  Body.setAngle(bar18.body, radians(-60));
  
  let bar19 = new Box(width-130,95,70,10, barImg);
  boxes.push(bar19)
  Body.setAngle(bar19.body, radians(60));
  
  // let bar20 = new Box(width-100,60,150,10, barImg);
  // boxes.push(bar20)
  
  // Birds, pigs and slingshot
  bird = new Bird(80, 375, 15, 2,birdImg[0]);
  
  let pig1 = new Pig(width-110, height-65, 15, 2,pigImg[1]);
  pigs.push(pig1)
  
  let pig2 = new Pig(width-265, height-100, 13, 2,pigImg[0]);
  pigs.push(pig2)
  
  let pig3 = new Pig(width-110, height/2+45, 15, 2,pigImg[1]);
  pigs.push(pig3)
  
  let pig4 = new Pig(width-110, 140, 15, 2,pigImg[2]);
  pigs.push(pig4)
  
  slingShot = new SlingShot(bird,slingImg);
}


// Handle colissions
function handleCollision(event) {
  const pairs = event.pairs;

  for (let pair of pairs) {
    const { bodyA, bodyB } = pair;
    if (bodyA && bodyA.gameObject && bodyB && bodyB.gameObject) {
      if (isBird(bodyA) && isPig(bodyB)) {
        damagePig(bodyB);
        damageBird(bodyA);
      } else if (isBird(bodyB) && isPig(bodyA)) {
        damagePig(bodyA);
        damageBird(bodyB);
      }

      if (isBird(bodyA) && isBox(bodyB)) {
        damageBox(bodyB);
        damageBird(bodyA);
      } else if (isBird(bodyB) && isBox(bodyA)) {
        damageBox(bodyA);
        damageBird(bodyB);
      }
      
      if (isBird(bodyA) && isGround(bodyB)) {
        damageBird(bodyA);
      } else if (isBird(bodyB) && isGround(bodyA)) {
        damageBird(bodyB);
      }
      
    }
  }
}

// Check type of object
function isBird(body) {
  return body.label === "Bird";
}

function isPig(body) {
  return body.label === "Pig";
}

function isBox(body) {
  return body.label === "Box";
}

function isGround(body) {
  return body.label === "Ground";
}


// Lower health
function damagePig(pigBody) {
  const pig = pigBody.gameObject;
  pig.health -= 1;
  pigCounter -=1

  if (pig.health <= 0) {
    World.remove(world, pig.body);
    pig.body = null;
  }
}

function damageBox(boxBody) {
  const box = boxBody.gameObject;
  box.health -= 1;
  if (box.health <= 0) {
    World.remove(world, box.body);
    box.body = null;
  }
}

function damageBird(birdBody) {
  const bird = birdBody.gameObject;
  bird.health -= 1;
  if (bird.health <= 0) {
    World.remove(world, bird.body);
    bird.body = null;
  }
}

function resetGame() {
  location.reload();
}

// Drawing
function draw() {
  // Draw the correct stage
  if (gameState === "home") {
    drawHome();
  } else if (gameState === "level") {
    drawLevel();
  }else if (gameState === "cleared") {
    drawCleared();
  }else if (gameState === "lose") {
    drawLose();
  }
}

// Draw home page
function drawHome() {
  tint(230,230,230,255);
  background(homeImg);
  image(logoImg,width/2-140,20,280,100);
  
  // Check if the user clicked the play button
    let buttonX = width/2-50;
    let buttonY = height-80;
    let buttonWidth = 100;
    let buttonHeight = 60;

    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      isHovering = true;
      buttonWidth += 20; // Add 20px to width
      buttonHeight += 12; // Add 12px to height
      buttonX -= 10; // Adjust X to keep it centered
      buttonY -= 6; // Adjust Y to keep it centered
    } else {
    isHovering = false;
    tint(255,255,255,255);
  }
    image(playImg,buttonX,buttonY,buttonWidth,buttonHeight);
}

// Draw Level
function drawLevel() {
  background(backgroundImg);
  Engine.update(engine);
  slingShot.fly(mc);
  
  if (pigCounter === 0) {
    gameState = "cleared";
    levelMusic.stop();
    clearMusic.play();
    clear();
  }else if (birdCounter <= 0) {
    gameState = "lose";
    levelMusic.stop();
    loseMusic.play();
    clear();
  }
  
  ground.show();
  wall.show();
  
  for(const box of boxes) {
    if (box.body) { // Check if the body exists
      box.show();
    }
  }
  slingShot.update();
  slingShot.show();
  if (bird.body) { // Check if the body exists
      bird.show();
    }
  for(const pig of pigs) {
    if (pig.body) { // Check if the body exists
      pig.show();
    }
  }
  
      
  // Check if the user clicked the home button
  let buttonX = width-60;
  let buttonY = 10;
  let buttonWidth =50;
  let buttonHeight = 50;

  if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
    isHovering = true;
    buttonWidth += 10; // Add 20px to width
    buttonHeight += 6; // Add 12px to height
    buttonX -= 5; // Adjust X to keep it centered
    buttonY -= 3; // Adjust Y to keep it centered
  } else {
    isHovering2 = false;
    tint(255,255,255,255);
  }
image(goHomeImg,buttonX,buttonY,buttonWidth,buttonHeight);
  
  // Use of birds
  textFont(angryFont);
  textSize(24);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Use space to spawn the next bird", width / 2, 20);
  
  // Remaining birds
  textFont(angryFont);
  textSize(18);
  fill(255,0,0);
  textAlign(CENTER, CENTER);
  text("Remaining birds: " + birdCounter, 80, 50);
  
  if(paused){
    image(pauseImg, width / 2-30, height / 2-30,70,70);
  }
  
}
  
function drawCleared(){
  background(clearImg);
  setTimeout(resetGame, 5000);
}

function drawLose(){
  background(loseImg);
  setTimeout(resetGame, 5000);
}

// Keys and buttons
function keyPressed(){
  // Spawn bird
  if (key == ' ') {
    const index = floor(random(0, birdImg.length));
    bird = new Bird(80, 375, 15, 2, birdImg[index]);
    slingShot.attach(bird);
    birdCounter -= 1;
  }
  
  // Pause game
  if (keyCode === ESCAPE || key == 'p' || key == 'P'){
    // Check if in game
    if (gameState == "level"){
      paused = !paused;
      if (paused) {
        levelMusic.pause()
        noLoop(); // Stop
      } else {
        levelMusic.play()
        loop(); // Continue
      }
    }
  }
}

function mousePressed() {
  //Homepage play button
  if (gameState === "home" && isHovering) {
      gameState = "level";
      playSound.play();
      homeMusic.stop();
      levelMusic.loop();
      isHovering = false;
  }
  //Level home button
  if (gameState === "level" && isHovering) {
      gameState = "home";
      levelMusic.stop();
      homeMusic.loop();
      isHovering = false;
  }
}