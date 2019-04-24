//1 April 2019 : April Fools!
//1/3/2019

void setup() {
   size(1024,1024);
   frameRate(60);
   
   EarthImg = loadImage("https://Anthony-Wilson-Programming.github.io/Pages/ScienceTalentSearch/Earth.png");
   MoonImg  = loadImage("https://Anthony-Wilson-Programming.github.io/Pages/ScienceTalentSearch/Moon.png");
}

//Constants
int EarthSize = 6371000;//Metres
int MoonSize  = 1737100;//Metres
int MoonDistance = 384400000;//Metres

//Changing variables
float Scale = 0.0000008;//Scale of the rendering

float MoonOrbitAngle = 0;//Angle of the moon relative to the earth

float MS = 0;//Milliseconds as floating-point-value
int MousePV = 0;//Frames since mouse pressed
int MouseRV = 0;//Frames since mouse released

int SCENE = 0;// 0 - Menu | 1 - Game
int SUBSCENE = 0;
boolean ButtonOpen = true;//Buffer to avoid double pressing buttons
boolean CursorOpen = true;//Buffer to eliminate cursor flicker when less than 60 fps
boolean PAUSED = false;//Controls whether or not the pause menu is overlayed

//Images
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
void BackButton(int scene, int subscene){
  noStroke();
  textAlign(CENTER,CENTER);
  textFont(createFont("Courier",20));
  textSize(15);
  
  fill(180);
  if(mouseX > 10 && mouseX < 90 && mouseY > 10 && mouseY < 30){
    cursor(HAND);
    CursorOpen = false;
    fill(140);
    if(mousePressed){
      fill(100);
    }
    if(MouseRV == 1){
      SCENE = scene;
      SUBSCENE = subscene;
    }
  }
  rect(10,10,80,20);
  
  fill(255);
  text("< Back",50,20);
}

void draw() {
   if(CursorOpen){
      cursor(CROSS);
   }
   CursorOpen = true;
   
   MS = float(millis());//Keep track of milliseconds as a floating-point value for easier division/multiplication later
   MousePV = (mousePressed)?(MousePV + 1):(0);
   MouseRV = (mousePressed)?(0):(MouseRV + 1);
   
   textAlign(CENTER,CENTER);
   textFont(createFont("Courier",20));
   textSize(20);
   
   if(SCENE == 0){
      background(50);
      noStroke();
      
      
      MoonOrbitAngle += 0.01;
      translate(width/2,height/2-100);
      
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
      
      translate(-width/2,-height/2+100);
      
      //'Play' button
      fill(180);
      if(mouseX > width/2-200 && mouseX < width/2-100 && mouseY > height/2-20 && mouseY < height/2+20){
         cursor(HAND);
         CursorOpen = false;
         fill(140);
         if(mousePressed){
            fill(100);
         }
         if(MouseRV == 1){
            SCENE = 1;
         }
      }
      rect(width/2-200,height/2-20,100,40);
      
      //'How to play' button
      fill(180);
      if(mouseX > width/2+100 && mouseX < width/2+200 && mouseY > height/2-20 && mouseY < height/2+20){
         cursor(HAND);
         CursorOpen = false;
         fill(140);
         if(mousePressed){
            fill(100);
         }
         if(MouseRV == 1){ 
            SCENE = 2;
         }
      }
      rect(width/2+100,height/2-20,100,40);
      
      //'Exit' button
      fill(180);
      if(mouseX > 10 && mouseX < 90 && mouseY > 10 && mouseY < 30){
         cursor(HAND);
         CursorOpen = false;
         fill(140);
         if(mousePressed){
            fill(100);
         }
         if(MouseRV == 1){
            exit();//Closes the game, 1 of _ lines that does this
         }
      }
      rect(10,10,80,20);
      
      fill(255);
      textAlign(CENTER,CENTER);
      textFont(createFont("Courier",20));
      textSize(20);
      text("Play",width/2-150,height/2);
      text("How To",width/2+150,height/2);
      text("Exit",50,20);
      
   }else if(SCENE == 1){
      background(50);
      noStroke();
      
      MoonOrbitAngle += 0.01;
      
      translate(width/2,height/2);
      if(Scale <= 0){
         scale(0.0002);
         
         fill(0,100,255);
         ellipse(0,EarthSize/3,EarthSize/2,EarthSize/2);//Earth
         imageMode(CENTER);
         image(EarthImg,0,EarthSize/3,EarthSize*0.58,EarthSize*0.58);
         fill(200);
         ellipse(sin(-MoonOrbitAngle)*(EarthSize+MoonDistance),cos(-MoonOrbitAngle)*(EarthSize+MoonDistance+MoonSize),MoonSize/2,MoonSize/2);//Moon
         ellipse(0,-MoonSize,MoonSize/2,MoonSize/2);//Moon
         image(MoonImg,0,-MoonSize,MoonSize*0.8,MoonSize*0.6);
         
      }else{
      }
      
      resetMatrix();
      
   }else{
      text("Error",width/2,height/2);
   }
   
   fill(200);
   textAlign(RIGHT,TOP);
   textSize(15);
   text(frameRate,width-20,20);
   text(Scale+"",width-20,40);
}

void mousePressed(){
   if(SCENE == 1){
      Scale = 0;
   }
}
