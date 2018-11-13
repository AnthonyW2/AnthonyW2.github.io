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
    <br>
    <br>
    <p>Welcome to my Github Page!</p>
    <br>
    <br>
    <p>LINKS:</p>
    <br>
    <a href="https://anthony-wilson-programming.github.io/CPS/">https://anthony-wilson-programming.github.io/CPS/</a>
    <script type="text/processing" data-processing-target="processing-canvas">
      void setup(){
        size(1000,500);
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
    <br>
    <br>
    <br>
  </body>
</html>
