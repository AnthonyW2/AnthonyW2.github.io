PImage newImage;

void setup(){
  size(800,800);
  frameRate(1000);
}

void draw(){
  background(50);
  noStroke();
  fill(200);
  noSmooth();
  textSize(20);
  textAlign(CENTER,CENTER);
  
  text("This .pde is stored in the current directory as well", 200,20);
  
  
}
