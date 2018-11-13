<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js"></script>
    <title>Github Page</title>
    <style>
      body {
        position: absolute;
        color: #006400
      }
    </style>
  </head>
  <body>
    <p>Welcome to my Github Page!</p><style>
    <style>
      body {
        position: absolute;
        color: #000
      }
    </style>
    <br>
    <p>LINKS:</p>
    <a href="https://github.com/Anthony-Wilson-Programming/Anthony-Wilson-Programming.github.io">See the Repository</a>
    <br>
    <a href="https://www.khanacademy.org/profile/Awilsonprogramming/projects">My Khan Academy Programs</a>
    <br>
    <a href="https://anthony-wilson-programming.github.io/CPS/">CPS Meter</a>
    <br>
    <a href="https://anthony-wilson-programming.github.io/Terrain_Gen/">Terrain Gen</a>
    <br>
    <br>
    <br>
    <p>You have wasted this amout of time on this page:</p>
    <script type="text/processing" data-processing-target="processing-canvas">
      void setup(){
        size(1000,150);
        frameRate(1000);
      }
      
      void draw(){
        background(100);
        fill(200);
        noStroke();
        textAlign(LEFT,CENTER);
        textSize(50);
        
        text(floor(millis()/1000/60/60)+":"+floor(millis()/1000/60)+":"+floor(millis()/1000)+"."+(millis()-floor(millis()/1000)*1000),50,height/2);
      }
    </script>
    <canvas id="processing-canvas"> </canvas>
    <br>
    <br>
    <br>
  </body>
</html>
