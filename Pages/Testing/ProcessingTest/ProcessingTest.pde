void setup(){
  size(400,400);
  frameRate(60);
}

void draw(){
  background(50);
  noStroke();
  fill(200);
  noSmooth();
  textSize(20);
  textAlign(CENTER,CENTER);
  
  text("This .pde is stored in the current directory", 200,150);
  text(frameRate,200,250);
}
