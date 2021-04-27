class Bird{
  constructor(x,y){
    var options = {
      'restitution':0.8,
      'friction':1.0,
      'density':1.0,
      'mass':15000,
  }
  this.smoke_image=loadImage("sprites/smoke.png");
  this.body = Bodies.rectangle(x, y,50,50,options);
  this.width = 50;
  this.height = 50;
  this.visibility=255;
  World.add(world, this.body);
    this.image = loadImage("sprites/bird.png");
    this.trajectory=[];
  }

  display(){
    var angle = this.body.angle;
    if(this.body.position.x>200 && this.body.velocity.x>8){
    var position=[this.body.position.x,this.body.position.y];
    this.trajectory.push(position);
    }

    for(var i=0;i<this.trajectory.length;i++){
      push();
      tint(255,this.visibility)
      this.visibility-=0.1;
      image(this.smoke_image,this.trajectory[i][0],this.trajectory[i][1])
      pop();
    }

    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
