const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var balls = []
var boats  = []

function preload() {
 bgI = loadImage("assets/background.gif")

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(0, height - 10, width * 4, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(150,150,100,50,-PI/4)
  

}

function draw() {
  background(bgI);
  Engine.update(engine);

  ground.display();
  cannon.display()
  tower.display();
  showboats()
  for(var i = 0 ; i < balls.length; i++){
    if(balls[i]){
balls[i].display()
if(balls[i].body.position.x > width || balls[i].body.position.y > height-110){
  World.remove(world,balls[i].body)
  delete balls[i]
}
} 
for( var j = 0 ; j < boats.length ; j++){
  if(balls[i]!==undefined && boats[j]!==undefined){
    if(Matter.SAT.collides(balls[i].body,boats[j].body).collided){
      World.remove(world,boats[j].body)
      delete boats[j]
      World.remove(world,balls[i].body)
      delete balls[i]
    }
  }
}
}
  
}
function keyPressed(){
  if(keyCode == DOWN_ARROW){
    ball = new Cannonball(cannon.x+25,cannon.y-31)
    balls.push(ball)
  }
}

function keyReleased(){
  if(keyCode == DOWN_ARROW){
    balls[balls.length -1].fire()
  }
}

function showboats(){
  if(boats.length > 0){
    if(boats[boats.length - 1] === undefined ||boats[boats.length-1].body.position.x < width -200){
      boat = new Boat(width,height -100,170,170)
    boats.push(boat)
    }
    for(var i = 0; i < boats.length; i++ ){
      if(boats[i]){
      boats[i].display()
    Matter.Body.setVelocity(boats[i].body,{x:-1,y:0})
    }
  }
  } else{
    boat = new Boat(width,height -100,170,170)
    boats.push(boat)
  }
}
