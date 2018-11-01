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
    void setup() {
      size(200, 200);
      background(100);
      stroke(255);
      ellipse(50, 50, 25, 25);
      println("hello web!");
    }
  </script>
</html>
