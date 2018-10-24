# Anthony Wilson's Github Page
<?php
// the message
$msg = "First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("someone@example.com","My subject",$msg);
?>
<html>
  <head>
    <meta charset="utf-8">
    <title>Stop logging!</title>
    <style>
      body{
        margin: 0px;
        background: #000000;
        color: #ffffff;
      }
    </style>
  </head>
  <body>
    <canvas id="display"></canvas>
  </body>
  <script>
    //alert("Hello user!");
    var input = prompt("Type something here");
    document.write("YOU TYPED: "+input);
  </script>
</html>
