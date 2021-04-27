/*var string="Kalindi"
console.log(string)
var number=6
console.log(number)
var boolean=true
console.log(boolean)
var object=null
console.log(object)
var object1
console.log(object1)

var array1=[1,2,4,7]
console.log(array1[2])

var array2=["string",3,true,array1];
console.log(array2[3][3])

array2.push(3);
console.log(array2)

array2.pop()
console.log(array2)
*/

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint= Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg;
var platform;
var sling;
var gameState=0;
var score=0;

function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
    getTime();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    
    ground = new Ground(600,height,1200,20)

    platform= new Ground(150,305,300,170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    sling= new SlingShot(bird.body,{x:200,y:50});
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    Engine.update(engine);

    textSize(35);
    fill("white");
    text("Score: "+score,900,50);

    box1.display();
    box2.display();
    ground.display();
    platform.display();
    pig1.display();
    pig1.Score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.Score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    sling.display();

}

function mouseDragged(){
    if(gameState==0){
    Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})
    }
}

function mouseReleased(){
    sling.fly();
    gameState=1;
}

function keyPressed(){
    if(keyCode===32){
        Matter.Body.setPosition(bird.body,{x:200,y:50})
        sling.attach(bird.body);
        gameState=0;
        bird.trajectory=[]
        bird.visibility=255;
    }
}

async function getTime(){
    var response=await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var responseJson=await response.json();
    var dateTime=responseJson.datetime;
    var hour=dateTime.slice(11,13);
    if(hour>=07 && hour<=15){
        bg="sprites/bg.png"
    }
    else{
        bg="sprites/bg2.jpg"
    }
    backgroundImg=loadImage(bg);
}