# PROCESSING SKETCH TEST
<html>
  <head>
    <meta charset="utf-8">
    <title>Processing Sketch</title>
    <style>
      html, head, body {
        position: fixed;
      }
    </style>
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js"></script><//script>
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
