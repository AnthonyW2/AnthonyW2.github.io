var Triggers = [document.getElementById("Trig1").checked,document.getElementById("Trig2").checked,document.getElementById("Trig3").checked,document.getElementById("Trig4").checked,document.getElementById("Trig5").checked];

var pjs = document.getElementById("pjs");
var code = document.getElementById("code").contentWindow.document;
function COMPILE(){
  Triggers = [document.getElementById("Trig1").checked,document.getElementById("Trig2").checked,document.getElementById("Trig3").checked,document.getElementById("Trig4").checked,document.getElementById("Trig5").checked];
  code.open();
  code.writeln(
    "<!DOCTYPE html>"+
    "<html>"+
    "<head>"+
    "<meta charset=\"utf-8\">"+
    "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js\"></script>"+
    "</head>"+
    "<body>"+
    "<script type=\"text/processing\" data-processing-target=\"processing-canvas\">"+
    "void setup(){size(1024,704);frameRate(100);}"+
    "int LAG = "+document.getElementById("LAG").value+";float blockSize = round(1024/30);boolean[] triggers = {"+Triggers[0]+","+Triggers[1]+","+Triggers[2]+","+Triggers[3]+","+Triggers[4]+"};"+
    "float coordsToRadians(float x, float y){if(x >= 0 && y >= 0){return atan(x/y);}else if(x >= 0 && y < 0){return PI+atan(x/y);}else if(x < 0 && y < 0){return PI+atan(x/y);}else if(x < 0 && y >= 0){return TWO_PI+atan(x/y);}else{return 0/0;}}"+
    "float coordsToAngleRads(float x1, float y1, float x2, float y2){return (coordsToRadians(x1-x2,-y1+y2)+PI)%TWO_PI;}"+
    "float radiansToCoords(float x1, float y1, float Angle, float distance, float axis){float angle = Angle-HALF_PI;if(Angle < 0){angle = -HALF_PI;}float x = x1 + cos(angle) * distance;float y = y1 + sin(angle) * distance;if(axis == 0){return x;}else{return y;}}"+
    "float[] enemyPath(float[][] positions, int Step, float Speed){float[] Outputs = {positions[0][0],positions[0][1]};int TP = 1;float xAdd = 0;float yAdd = 0;float retargetCooldown = 0;for(int Frame = 0;Frame < Step;Frame += 1){float AngleInRads = coordsToAngleRads(Outputs[0], Outputs[1], positions[TP][0], positions[TP][1]);xAdd = radiansToCoords(0,0,AngleInRads,Speed,0);yAdd = radiansToCoords(0,0,AngleInRads,Speed,1);Outputs[0] += xAdd;Outputs[1] += yAdd;if(dist(Outputs[0], Outputs[1], positions[TP][0], positions[TP][1]) < 1.5 && retargetCooldown == 0){TP = (TP+1)%positions.length;retargetCooldown = 3;}if(retargetCooldown > 0){retargetCooldown -= 1;}}return Outputs;}"+
    "void wall(float x,float y,float endX,float endY){rect(x,y,endX,endY);};"+
    "void platform(float x,float y,float endX){rect(x,y,endX,2);};"+
    "void ladder(float x, float y, int size){rect(x,y,2,size*blockSize);rect(x+blockSize-2,y,2,size*blockSize);for(int a = 0;a < size*blockSize;a += 14){rect(x,y+a,blockSize,3);}};"+
    "void vine(float[][] positions){for(int a = 0;a < positions.length;a += 1){rect(blockSize*positions[a][0],blockSize*positions[a][1],blockSize,blockSize);}};"+
    "void electricity(float x,float y,float Width,float thickness,float intensity){float[] linePos = new float[ceil(Width/thickness)];for(int a = 0;a < linePos.length;a += 1){linePos[a] = random(0,intensity);}for(int a = 0;a < Width;a += thickness){if(a/thickness < linePos.length-1){line(x+a,y+linePos[floor(a/thickness)],x+a+thickness,y+linePos[floor(a/thickness)+1]);}if(a/thickness == linePos.length-1){line(x+a,y+linePos[floor(a/thickness)],x+a+thickness,y+linePos[0]);}}};void electricity2(float x,float y,float Height,float thickness,float intensity){float[] linePos = new float[ceil(Height/thickness)];for(int a = 0;a < linePos.length;a += 1){linePos[a] = random(0,intensity);}for(int a = 0;a < Height;a += thickness){if(a/thickness < linePos.length-1){line(x+linePos[floor(a/thickness)],y+a,x+linePos[floor(a/thickness)+1],y+a+thickness);}if(a/thickness == linePos.length-1){line(x+linePos[floor(a/thickness)],y+a,x+linePos[0],y+a+thickness);}}};void electricArc(float x,float y,float endX,float endY,String direction){if(LAG == 0){noStroke();rect(x,y,x+endX-x,y+endY-y);}else if(LAG == 1){if(direction == \"H\"){for(int a = 0;a < endY;a += blockSize){electricity(x,y+a,endX,10,blockSize);}}else{for(int a = 0;a < endX;a += blockSize){electricity2(x+a,y,endY,10,blockSize);}}}else{if(direction == \"H\"){for(int a = 0;a < endY;a += blockSize){electricity(x,y+a,endX,5,blockSize);}}else{for(int a = 0;a < endX;a += blockSize){electricity2(x+a,y,endY,5,blockSize);}}}};"+
    "void spike(float[][] positions){for(int a = 0;a < positions.length;a += 1){if(positions[a][2] == 0){triangle(blockSize*(positions[a][0]+0.5),blockSize*positions[a][1],blockSize*(positions[a][0]+1),blockSize*(positions[a][1]+1),blockSize*positions[a][0],blockSize*(positions[a][1]+1));}else if(positions[a][2] == 1){triangle(blockSize*(positions[a][0]+1),blockSize*(positions[a][1]+0.5),blockSize*positions[a][0],blockSize*(positions[a][1]+1),blockSize*positions[a][0],blockSize*positions[a][1]);}else if(positions[a][2] == 2){triangle(blockSize*(positions[a][0]+0.5),blockSize*(positions[a][1]+1),blockSize*(positions[a][0]+1),blockSize*positions[a][1],blockSize*positions[a][0],blockSize*positions[a][1]);}else{triangle(blockSize*positions[a][0],blockSize*(positions[a][1]+0.5),blockSize*(positions[a][0]+1),blockSize*(positions[a][1]+1),blockSize*(positions[a][0]+1),blockSize*positions[a][1]);}}};"+
    "void groundBug(float x,float y){if(LAG == 0){rect(x,y,blockSize,blockSize);}else if(LAG == 1){rect(x,y,blockSize,blockSize);}else{rect(x,y,blockSize,blockSize);}};"+
    "void flyingBug(float x,float y){if(LAG == 0){rect(x,y,blockSize,blockSize);}else if(LAG == 1){rect(x,y,blockSize,blockSize);}else{rect(x,y,blockSize,blockSize);}};"+
    "void collectable(float x, float y, int n){fill(255,255,0);rect(x,y,blockSize,blockSize);textAlign(CENTER,CENTER);textSize(30);fill(0);text(n,x+blockSize/2,y+blockSize/2);};"+
    "void finish(float x,float y){if(LAG == 0){rect(x,y,blockSize,blockSize);}else if(LAG == 1){rect(x,y,blockSize,blockSize);}else{for(int a = 0;a < 5;a += 1){triangle(x+random(0,blockSize),y+random(0,blockSize),x+random(0,blockSize),y+random(0,blockSize),x+random(0,blockSize),y+random(0,blockSize));}}};"+
    "void trigger(float x, float y, int n){pushStyle();fill(255,255,0);rect(x,y,blockSize,blockSize);if(triggers[n]){fill(0,200,0);}else{fill(255,100,0);}textAlign(CENTER,CENTER);textSize(30);text(n,x+blockSize/2,y+blockSize/2);popStyle();}"+
    "void draw(){\n"+
    pjs.value+
    "\ntextAlign(RIGHT,TOP);textSize(20);textFont(createFont("serif",20));fill(200);text("FPS: "+floor(frameRate),width-10,10);"+
    "\n};"+
    "</script>"+
    "<canvas id=\"processing-canvas\"> </canvas>"+
    "</body>"+
    "</html>"
  );
  code.close();
};

function compile(){
  document.body.onkeyup = function() {
    COMPILE();
  };
};

compile();
COMPILE();
