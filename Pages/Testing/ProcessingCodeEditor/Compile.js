function compile() {
  var html = ""
  var pjs = document.getElementById("pjs");
  var code = document.getElementById("code").contentWindow.document;

  document.body.onkeyup = function() {
    code.open();
    code.writeln(
      html +
      "<script type=\"text/processing\">" +
      pjs.value +
      "</script>"
    );
    code.close();
  };
}

compile();
