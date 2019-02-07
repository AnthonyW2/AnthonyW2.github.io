var pjs = document.getElementById("pjs");
var code = document.getElementById("code").contentWindow.document;
function COMPILE(){
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
    "int LAG = 2;float blockSize = round(1024/30);"+
    "void wall(float x,float y,float endX,float endY){rect(x,y,endX,endY);};"+
    "void platform(float x,float y,float endX){rect(x,y,endX,2);};"+
    "void ladder(float x, float y, int size){rect(x,y,2,size*blockSize);rect(x+blockSize-2,y,2,size*blockSize);for(int a = 0;a < size*blockSize;a += 14){rect(x,y+a,blockSize,3);}};"+
    "void draw(){\n"+
    pjs.value+
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
}
compile();
COMPILE();
