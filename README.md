<html>
  <head>
    <meta charset="utf-8">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js"></script>
    <title>Github Page</title>
    <style>
      body {position: absolute;}
      h1 {color: #006400; font-weight: bold; font-size: 150%;}
      h2 {color: #006400; font-size: 120%;}
      p {color: #000000;}
      a {text-decoration: underline;}
    </style>
  </head>
  <body>
    <h1>Welcome to my Github Page!</h1>
    <br>
    <h2>LINKS:</h2>
    <a href="https://github.com/Anthony-Wilson-Programming/Anthony-Wilson-Programming.github.io">See the Repository</a>
    <br>
    <a href="https://www.khanacademy.org/profile/Awilsonprogramming/projects">My Khan Academy Programs</a>
    <br>
    <a href="https://anthony-wilson-programming.github.io/CPS/">CPS Meter</a>
    <br>
    <a href="https://anthony-wilson-programming.github.io/Terrain_Gen/">Terrain Gen</a>
    <br>
    <a href="https://anthony-wilson-programming.github.io/Video/">Video Testing</a>
    <br>
    <br>
    <br>
    <h2>You have wasted this amount of time on this page:</h2>
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
        
        text(floor(millis()/1000/60/60)+":"+floor(millis()/1000/60)%60+":"+floor(millis()/1000)%60+"."+millis()%1000,50,height/2);
      }
    </script>
    <canvas id="processing-canvas"> </canvas>
    <br>
    <br>
  </body>
</html>
