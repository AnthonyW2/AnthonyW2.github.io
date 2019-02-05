var pjs = document.getElementById("pjs");
var code = document.getElementById("code").contentWindow.document;
function COMPILE(){
  code.open();
  code.writeln(
    "<!DOCTYPE html>"+
    "<html>"+
    "<head>"+
    "<meta charset=\"utf-8\">"+
    "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js\"></script>"+
    "</head>"+
    "<body>"+
    "<script type=\"text/processing\" data-processing-target=\"processing-canvas\">"+
    pjs.value+
    "</script>"+
    "<canvas id=\"processing-canvas\"> </canvas>"+
    "</body>"+
    "</html>"
  );
  code.close();
};

function compile(){
  document.body.onkeyup = function() {
    COMPILE();
  };
}
compile();
COMPILE();
