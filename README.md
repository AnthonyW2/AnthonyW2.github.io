# Anthony Wilson's Github Page
<?php
// the message
$msg = "First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("awilsonprogramming@gmail.com","My subject",$msg);
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
    <h2>Send e-mail to awilsonprogramming@gmail.com:</h2>

<form action="mailto:awilsonprogramming@gmail.com" method="post" enctype="text/plain">
Name:<br>
<input type="text" name="name"><br>
E-mail:<br>
<input type="text" name="mail"><br>
Comment:<br>
<input type="text" name="comment" size="50"><br><br>
<input type="submit" value="Send">
<input type="reset" value="Reset">
</form>
  </body>
  <script>
    //alert("Hello user!");
    var input = prompt("Type something here");
    document.write("You typed: "+input);
  </script>
</html>
