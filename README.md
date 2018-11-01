# PROCESSING SKETCH TEST
<html>
  <head>
    <meta charset="utf-8">
    <title>Processing Sketch</title>
  </head>
  <body>
    <script src="processing-1.3.6.min.js"></script>
    <script type="text/processing" data-processing-target="processing-canvas">
      void setup() {
        size(200, 200);
        background(100);
        stroke(255);
        ellipse(50, 50, 25, 25);
        println('hello web!');
      }
    </script>
    <canvas id="processing-canvas"> </canvas>
  </body>
</html>
