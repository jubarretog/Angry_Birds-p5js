class Box {
  constructor(x,y,w,h,img,options={}){
    this.body = Bodies.rectangle(
      x+w/2,y+h/2,w,h,);
    this.w = w;
    this.h = h;
    this.body.gameObject = this;
    this.body.label = "Box";
    this.img = img;
    this.health = 2;
    World.add(world, this.body);
  }
  
  show(){
    push();
    translate(this.body.position.x,this.body.position.y);
    rotate(this.body.angle);
    
    imageMode(CENTER);
    image(this.img,0,0,this.w,this.h)
    pop();
  }
  
  takeDamage(){
    this.life -= 1;
    if (this.life <= 0) {
      World.remove(world, this.body);
    }
  }
}


class Ground {
  constructor(x,y,w,h,img,options={isStatic:true}){
    this.body = Bodies.rectangle(
      x+w/2,y+h/2,w,h,options);
    this.w = w;
    this.h = h;
    this.body.gameObject = this;
    this.body.label = "Ground";
    this.img = img;
    World.add(world, this.body);
  }
  
  show(){
    push();
    translate(this.body.position.x,this.body.position.y);
    rotate(this.body.angle);
    
    imageMode(CENTER);
    image(this.img,0,0,this.w,this.h)
    pop();
  }
}


class Bird {
  constructor(x,y,r,mass,img) {
    this.body = Bodies.circle(
      x, y, r, {
      restitution: 1,
      collisionFilter: {
        category: 2
      }
      });
    this.body.gameObject = this;
    this.body.label = "Bird";
    this.img = img;
    this.health = 3;
    Body.setMass(this.body, mass/2);
    World.add(world, this.body);
  }
  
  show(){
    push();
    imageMode(CENTER);
    translate(this.body.position.x,
      this.body.position.y);
    rotate(this.body.angle);
    image(this.img, 0, 0,
      2*this.body.circleRadius,
      2*this.body.circleRadius);
    pop();
  }
  
  takeDamage(){
    this.life -= 1;
    if (this.life <= 0) {
      World.remove(world, this.body);
    }
  }
}


class SlingShot {
  constructor(bird,img) {
    this.sling = Constraint.create({
      pointA: {
        x: bird.body.position.x,
        y: bird.body.position.y
      },
      bodyB: bird.body,
      stiffness: 0.03,
      length: 5
    });
    this.img = img;
    this.maxPullDistance = 60;
    World.add(world, this.sling);
  }
  
  show() {
    if (this.sling.bodyB) {    
      line(this.sling.pointA.x,
        this.sling.pointA.y,
        this.sling.bodyB.position.x,
        this.sling.bodyB.position.y
      );
    }
    image(this.img,60,height-120,40,100);}
  
  update() {
    if (this.sling.bodyB) {
      let pointA = this.sling.pointA;
      let birdPos = this.sling.bodyB.position;
      let distance = dist(pointA.x, pointA.y, birdPos.x, birdPos.y);
      if (distance > this.maxPullDistance) {
        let angle = atan2(birdPos.y - pointA.y, birdPos.x - pointA.x);
        let limitedX = pointA.x + cos(angle) * this.maxPullDistance;
        let limitedY = pointA.y + sin(angle) * this.maxPullDistance;
        Body.setPosition(this.sling.bodyB, { x: limitedX, y: limitedY });
      }
    }
  }
  
  fly(mc){
    if(this.sling.bodyB &&
       mc.mouse.button === -1 &&
       this.sling.bodyB.position.x > 
       this.sling.pointA.x + 10) {
       this.sling.bodyB.collisionFilter.category = 1
       this.sling.bodyB = null;
    }
  }
  
  attach(bird) {
    this.sling.bodyB = bird.body;
  }
}


class Pig {
  constructor(x,y,r,mass,img) {
    this.body = Bodies.circle(
      x, y, r, {
      restitution: 0.3,
      friction: 1.0,
      density:0.8,
      collisionFilter: {
        category: 2
      }
      });
    this.body.gameObject = this;
    this.body.label = "Pig";
    this.health = 1;
    this.img = img;
    Body.setMass(this.body, mass);
    World.add(world, this.body);
  }
  
  show(){
    push();
    imageMode(CENTER);
    translate(this.body.position.x,this.body.position.y);
    rotate(this.body.angle);
    image(this.img, 0, 0, 2*this.body.circleRadius, 2*this.body.circleRadius);
    pop();
  }
  
  takeDamage(){
    this.life -= 1;
    if (this.life <= 0) {
      World.remove(world, this.body);
    }
  }
}