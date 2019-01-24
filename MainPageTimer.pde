interface JavaScript {
  void getProcessingTime(int H, int M, int S, String MS);
}

void bindJavascript(JavaScript js) {
  javascript = js;
}

JavaScript javascript;

PFont Serif = loadFont("Georgia");

void setup(){
  size(250,75);
  //size(1,1);
  frameRate(1000);
}

void draw(){
  background(255);
  fill(0,100,0);
  noStroke();
  textAlign(LEFT,TOP);
  textFont(Serif,40);
  textSize(40);
  
  text(floor(millis()/1000/60/60)+":"+floor(millis()/1000/60)%60+":"+floor(millis()/1000)%60+"." +floor(millis()/100)%10+""+floor(millis()/10)%10+""+floor(millis()/1)%10,0,0);
  
  if(javascript!=null){
    javascript.getProcessingTime(floor(millis()/1000/60/60), floor(millis()/1000/60)%60, floor(millis()/1000)%60, floor(millis()/100)%10+""+floor(millis()/10)%10+""+floor(millis()/1)%10);
  }
}
