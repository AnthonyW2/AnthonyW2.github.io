# PROCESSING SKETCH TEST
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js"></script>
    <title>Processing Sketch</title>
    <style>
      html, head, body {
        position: absolute;
      }
    </style>
  </head>
  <body>
    <br>
    <br>
    <p>Colour:</p>
    <script type="text/processing" data-processing-target="processing-canvas">

void setup() {
   frameRate(10);
   size(1000,500, P3D);
}


int pixelSize = 10;
int amount = 50;
float noiseScale = 0.02;

void draw() {
   colorMode(RGB);
   smooth();
   noStroke();
   //lights();
   background(0);
   colorMode(HSB);
   float cameraY = height/2.0;
   float fov = 200/float(width) * PI/2;
   float cameraZ = cameraY / tan(fov / 2.0);
   float aspect = float(width)/float(height);
   perspective(fov*5, aspect, cameraZ/10.0, cameraZ*10.0);
   
   translate(width/2, height/2, 0);
   rotateX(-PI/6 + -mouseY/float(height) * PI);
   rotateZ(PI/3 + mouseX/float(width) * PI);
   //rotateY(frameCount/100);
   //box(500,500,10);
   translate(amount*-pixelSize/2,amount*-pixelSize/2,-5);
   for(int a = 0;a < amount;a += 1){
      for(int b = 0;b < amount;b += 1){
         translate(a*pixelSize,b*pixelSize,0);
         fill((noise((-frameCount+a)*noiseScale,(-frameCount+b)*noiseScale)*255*-3+255*2+200)%255,255,150);
         box(pixelSize,pixelSize,(noise((-frameCount+a)*noiseScale,(-frameCount+b)*noiseScale)*500));
         translate(a*-pixelSize,b*-pixelSize,0);
      }
   }
   //resetMatrix();
}

    </script>
    <canvas id="processing-canvas"> </canvas>
    <br>
    <br>
    <p>Now Grey Scale:</p>
    <script type="text/processing" data-processing-target="processing-canvas2">

void setup() {
   frameRate(10);
   size(1000,500, P3D);
}


int pixelSize = 10;
int amount = 50;
float noiseScale = 0.02;

void draw() {
   smooth();
   noStroke();
   //lights();
   background(0);
   fill(200);
   float cameraY = height/2.0;
   float fov = 200/float(width) * PI/2;
   float cameraZ = cameraY / tan(fov / 2.0);
   float aspect = float(width)/float(height);
   perspective(fov*5, aspect, cameraZ/10.0, cameraZ*10.0);
   
   translate(width/2, height/2, 0);
   rotateX(-PI/6 + -mouseY/float(height) * PI);
   rotateZ(PI/3 + mouseX/float(width) * PI);
   //rotateY(frameCount/100);
   //box(500,500,10);
   translate(amount*-pixelSize/2,amount*-pixelSize/2,-5);
   for(int a = 0;a < amount;a += 1){
      for(int b = 0;b < amount;b += 1){
         translate(a*pixelSize,b*pixelSize,0);
         fill((noise((-frameCount+a)*noiseScale,(-frameCount+b)*noiseScale)*255*2+130)%255);
         box(pixelSize,pixelSize,(noise((-frameCount+a)*noiseScale,(-frameCount+b)*noiseScale)*500));
         translate(a*-pixelSize,b*-pixelSize,0);
      }
   }
   resetMatrix();
}

    </script>
    <canvas id="processing-canvas2"> </canvas>
    
    <br>
    <br>
    <p>Which do you like better?</p>
    <form>
      <input type="radio" name="opinion" value="Colour" /> Colour
      <br>
      <input type="radio" name="opinion" value="Grey-Scale" /> Grey-Scale
      <br>
      <input type="radio" name="opinion" value="Both equally" /> Both Equally
      <br>
      <input type="submit" value="Submit" />
    </form>
    <br>
    <br>
    <p>*DISCLAIMER: This info doesn't go anywhere yet</p>
    
    <br>
    <br>
    <br>
    <br>
    <p>FPS & CPS:</p>
    <script type="text/processing" data-processing-target="cps-meter">
void setup() {
   size(400, 400);
   frameRate(1000);
   textSize(20);
   textAlign(CENTER,CENTER);
   fill(200);
   noStroke();
}

int peakCPS = 1;

int CPF = 100;
int tickCount = 0;

int sampleTime = 500;
int lastTime = millis();
int lastFrame = frameCount;
int cps = 1;


void draw() {
   background(100);
   
   for (int tick = 0; tick < CPF; tick += 1) {
      
      int now = millis();
      int elapsed = now-lastTime;
      if(elapsed > sampleTime){
         cps = 1000 * (tickCount - lastFrame) / elapsed;
         lastTime = now;
         lastFrame = tickCount;
      }
      
      tickCount += 1;
   }
   
   if(frameRate > 200){
      CPF += 1;
   }
   if(frameRate > 150){
      CPF += 1;
   }
   if(frameRate > 100){
      CPF += 1;
   }
   if(frameRate > 50){
      CPF += 1;
   }
   
   if(cps > peakCPS){
      peakCPS = cps;
   }
   
   text("Calculations Per Frame: "+CPF,200,100);
   text("Frames Per Second: "+floor(frameRate),200,150);
   text("Calculations Per Second: "+floor(cps),200,200);
   text("Highest CPS: "+floor(peakCPS),200,250);
   
}
    </script>
    <canvas id="cps-meter"> </canvas>
  </body>
</html>
