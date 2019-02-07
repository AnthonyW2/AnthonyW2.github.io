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
    "void vine(float[][] positions){rect(0,0,2,2);};"+
    "void electricity(float x,float y,float Width,float thickness,float intensity){float[] linePos = new float[ceil(Width/thickness)];for(int a = 0;a < linePos.length;a += 1){linePos[a] = random(0,intensity);}for(int a = 0;a < Width;a += thickness){if(a/thickness < linePos.length-1){line(x+a,y+linePos[floor(a/thickness)],x+a+thickness,y+linePos[floor(a/thickness)+1]);}if(a/thickness == linePos.length-1){line(x+a,y+linePos[floor(a/thickness)],x+a+thickness,y+linePos[0]);}}};void electricity2(float x,float y,float Height,float thickness,float intensity){float[] linePos = new float[ceil(Height/thickness)];for(int a = 0;a < linePos.length;a += 1){linePos[a] = random(0,intensity);}for(int a = 0;a < Height;a += thickness){if(a/thickness < linePos.length-1){line(x+linePos[floor(a/thickness)],y+a,x+linePos[floor(a/thickness)+1],y+a+thickness);}if(a/thickness == linePos.length-1){line(x+linePos[floor(a/thickness)],y+a,x+linePos[0],y+a+thickness);}}};void electricArc(float x,float y,float endX,float endY,String direction){if(LAG == 0){noStroke();rect(x,y,x+endX-x,y+endY-y);}else if(LAG == 1){if(direction == \"H\"){for(int a = 0;a < endY;a += blockSize){electricity(x,y+a,endX,10,blockSize);}}else{for(int a = 0;a < endX;a += blockSize){electricity2(x+a,y,endY,10,blockSize);}}}else{if(direction == \"H\"){for(int a = 0;a < endY;a += blockSize){electricity(x,y+a,endX,5,blockSize);}}else{for(int a = 0;a < endX;a += blockSize){electricity2(x+a,y,endY,5,blockSize);}}}};"+
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
