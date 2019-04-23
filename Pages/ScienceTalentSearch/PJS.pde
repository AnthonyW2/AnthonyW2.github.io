//1 April 2019 : April Fools!
//1/3/2019

void setup() {
   size(1024,704);
   frameRate(60);
   
   EarthImg = loadImage("Earth.png");
   MoonImg  = loadImage("Moon.png");
}

int EarthSize = 6371000;//Metres
int MoonSize  = 1737100;//Metres
int MoonDistance = 384400000;//Metres

float Scale = 0.0000008;

float MoonOrbitAngle = 0;

PImage EarthImg;
PImage MoonImg;

float coordsToRadians(float x, float y){
   if(x >= 0 && y >= 0){
      return atan(x/y);
   }else if(x >= 0 && y < 0){
      return PI+atan(x/y);
   }else if(x < 0 && y < 0){
      return PI+atan(x/y);
   }else if(x < 0 && y >= 0){
      return TWO_PI+atan(x/y);
   }else{
      return 0/0;
   }
}
float coordsToAngle(float x1, float y1, float x2, float y2){
   return (coordsToRadians(x1-x2,-y1+y2)+PI)%TWO_PI;
}

void draw() {
   background(50);
   noStroke();
   
   MoonOrbitAngle += 0.01;
   
   translate(width/2,height/2);
   if(Scale <= 0){
      scale(0.0002);
      
      fill(0,100,255);
      ellipse(0,EarthSize/3,EarthSize/2,EarthSize/2);//Earth
      imageMode(CENTER);
      rotate(HALF_PI);
      image(EarthImg,EarthSize/3,0,EarthSize*0.58,EarthSize*0.58);
      rotate(-HALF_PI);
      fill(200);
      ellipse(sin(-MoonOrbitAngle)*(EarthSize+MoonDistance),cos(-MoonOrbitAngle)*(EarthSize+MoonDistance+MoonSize),MoonSize/2,MoonSize/2);//Moon
      ellipse(0,-MoonSize,MoonSize/2,MoonSize/2);//Moon
      image(MoonImg,0,-MoonSize,MoonSize*0.8,MoonSize*0.6);
      
   }else{
      scale(Scale);
      
      fill(0,100,255);
      ellipse(0,0,EarthSize/2,EarthSize/2);//Earth
      
      fill(200);
      ellipse(sin(-MoonOrbitAngle)*(EarthSize+MoonDistance),cos(-MoonOrbitAngle)*(EarthSize+MoonDistance+MoonSize),MoonSize/2,MoonSize/2);//Moon
      
      scale(1/Scale);
      
      fill(230);
      textAlign(LEFT,CENTER);
      textSize(20);
      text("Earth, "+(EarthSize/500)+"km in diameter",50,0);
      text("Moon, "+(MoonSize/500)+"km in diameter",sin(-MoonOrbitAngle)*(310),cos(-MoonOrbitAngle)*(310)-20);
   }
   
   resetMatrix();
   
   fill(200);
   textAlign(LEFT,TOP);
   textSize(15);
   text(frameRate,20,20);
   text(Scale+"",20,40);
}

void mousePressed(){
   Scale = 0;
}
