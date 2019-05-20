//var Triggers = [document.getElementById("Trig1").checked,document.getElementById("Trig2").checked,document.getElementById("Trig3").checked,document.getElementById("Trig4").checked,document.getElementById("Trig5").checked];

//var pjs = document.getElementById("pjs");
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
    "int WIDTH = 400;int HEIGHT = 400;"+
    "float[] XPositions = new float[Amount];float[] YPositions = new float[Amount];float[] Directions = new float[Amount];"+
    "void settings(){size(WIDTH,HEIGHT);smooth();}"+
    "void setup(){size(400,400);frameRate(100);smooth();"+
    "for(int n = 0;n < Amount;n += 1){XPositions[n] = random(0,WIDTH);YPositions[n] = random(0,HEIGHT);if(RandomDirection){Directions[n] = random(0,TWO_PI);}else{Directions[n] = TWO_PI/Amount*n;}}}}"+
    "int Amount = 100"+document.getElementById("AMOUNT").value+";int Size = 10"+document.getElementById("SIZE").value+";float Speed = 0.5;boolean RandomDirection = true;"+
    "float coordsToRadians(float x, float y){if(x >= 0 && y >= 0){return atan(x/y);}else if(x >= 0 && y < 0){return PI+atan(x/y);}else if(x < 0 && y < 0){return PI+atan(x/y);}else if(x < 0 && y >= 0){return TWO_PI+atan(x/y);}else{return 0/0;}}"+
    "float coordsToAngle(float x1, float y1, float x2, float y2){return (coordsToRadians(x1-x2,-y1+y2)+PI)%TWO_PI;}"+
    ""+
    "void draw(){\n"+
    "background(50);noStroke();fill(200);"+
    "ellipse(20,20,20,20);"+
    "for(int tick = 0;tick < 1;tick += 1){for(int n = 0;n < Amount;n += 1){"+
    "XPositions[n] = XPositions[n]+sin(Directions[n])*Speed;YPositions[n] = YPositions[n]+cos(Directions[n])*Speed;"+
    "for(int n2 = 0;n2 < Amount;n2 += 1){if(n != n2 && dist(XPositions[n],YPositions[n],XPositions[n2],YPositions[n2]) < Size){"+
    "float CollisionAngle = coordsToAngle(XPositions[n],YPositions[n],XPositions[n2],YPositions[n2]);Directions[n] = CollisionAngle;Directions[n2] = CollisionAngle+PI;"+
    "}}"+
    "if(XPositions[n] < Size/2){Directions[n] = HALF_PI+PI+(HALF_PI-Directions[n]);XPositions[n] = Size/2;}"+
    "if(XPositions[n] > width-Size/2){Directions[n] = HALF_PI+TWO_PI+((HALF_PI+PI)-Directions[n]);XPositions[n] = width-Size/2;}"+
    "if(YPositions[n] < Size/2){Directions[n] = PI+PI+(PI-Directions[n]);YPositions[n] = Size/2;}"+
    "if(YPositions[n] > height-Size/2){Directions[n] = PI+TWO_PI+((PI+PI)-Directions[n]);YPositions[n] = height-Size/2;}"+
    "}}"+
    "for(int n = 0;n < Amount;n += 1){ellipse(XPositions[n],YPositions[n],Size,Size);}"+
    "}"+
    "\n"+"textAlign(RIGHT,TOP);textFont(createFont(\"serif\",20));textSize(20);fill(200,200,200);text(\"FPS: \"+floor(frameRate),width-10,10);"+
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
