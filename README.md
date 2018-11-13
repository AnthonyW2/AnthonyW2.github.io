# Github Page
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
    <p>Welcome to my Github Page!</p>
    <br>
    <p>LINKS:</p>
    <a href="https://anthony-wilson-programming.github.io/CPS/">https://anthony-wilson-programming.github.io/CPS/</a>CPS Meter
    <a href="https://anthony-wilson-programming.github.io/Terrain_Gen/">https://anthony-wilson-programming.github.io/Terrain_Gen/</a>3D Terrain Gen
    <br>
    <br>
    <p>Milliseconds you've spent on this page:</p>
    <script type="text/processing" data-processing-target="processing-canvas">
      void setup(){
        size(1000,200);
        frameRate(1000);
      }
      
      void draw(){
        background(100);
        fill(200);
        noStroke();
        textAlign(CENTER,CENTER);
        textSize(50);
        
        text(millis(),width/2,height/2);
      }
    </script>
    <canvas id="processing-canvas"> </canvas>
    <br>
    <br>
    <br>
  </body>
</html>
