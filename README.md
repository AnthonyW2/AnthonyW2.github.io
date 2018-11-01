# PROCESSING SKETCH TEST
<html>
  <head>
    <meta charset="utf-8">
    <title>Processing Sketch</title>
  </head>
  <body>
    <script src="processing-1.0.0.min.js"></script>
    //<canvas data-processing-sources="hello-web.pde"></canvas>
  </body>
  <script>
    void setup(){
      frameRate(100);
      size(400,400);
    }
    draw(){
      background(255,0,0);
      stroke(0,255,0);
      fill(0,0,255);
      ellipse(200,200,20,20);
    }
  </script>
</html>
