//Unfortunately javascript's built-in functions only support UCS-2 (16-Bit encodings), which becomes a problem when a user uses chars from astral planes

const ContainerDiv = document.getElementById("TableContainer");

const limit = 65536;


//======== Table gen functionality ========//

function GenerateTable(){
  var t0 = performance.now();
  
  var CharacterTable = document.createElement("table");
  
  for(var a = 0;a < limit;a += 16){
    var newRow = document.createElement("tr");
    for(var b = 0;b < 16;b ++){
      //newRow.innerHTML += "<td>"+String.fromCharCode(a+b)+"</td>";
      var newBox = document.createElement("td");
      //newBox.innerHTML = String.fromCharCode(a+b)+"<br>U+"+(a+b).toString(16);
      newBox.innerHTML = String.fromCharCode(a+b);
      newRow.appendChild(newBox);
    }
    CharacterTable.appendChild(newRow);
  }
  
  ContainerDiv.innerHTML = "";
  ContainerDiv.appendChild(CharacterTable);
  
  console.log(performance.now() - t0,"ms");
}

function GenerateTableDelayed(){
  
  var CharacterTable = document.createElement("table");
  ContainerDiv.innerHTML = "";
  ContainerDiv.appendChild(CharacterTable);
  
  function GenRange(lower,upper){
    for(var a = lower;a < upper;a += 16){
      var newRow = document.createElement("tr");
      for(var b = 0;b < 16;b ++){
        //newRow.innerHTML += "<td>"+String.fromCharCode(a+b)+"</td>";
        var newBox = document.createElement("td");
        //newBox.innerHTML = String.fromCharCode(a+b)+"<br>U+"+(a+b).toString(16);
        newBox.innerHTML = String.fromCharCode(a+b);
        newRow.appendChild(newBox);
      }
      CharacterTable.appendChild(newRow);
    }
  }
  
  var n = 0
  
  function RecursiveDelayGen(){
    //GenRange(n,n+256);
    //n += 256;
    GenRange(n,n+4096);
    n += 4096;
    if(n < limit){
      setTimeout(RecursiveDelayGen,10);
    }
  }
  
  RecursiveDelayGen();
}

function GenerateTableWithEncodings(){
  var t0 = performance.now();
  
  var CharacterTable = document.createElement("table");
  
  for(var a = 0;a < limit;a += 16){
    var newRow = document.createElement("tr");
    for(var b = 0;b < 16;b ++){
      //newRow.innerHTML += "<td>"+String.fromCharCode(a+b)+"</td>";
      var newBox = document.createElement("td");
      newBox.innerHTML = String.fromCharCode(a+b)+"<br><span class=\"smaller\">0x"+("0000"+(a+b).toString(16)).substr(-4)+"</span>";
      newRow.appendChild(newBox);
    }
    CharacterTable.appendChild(newRow);
  }
  
  ContainerDiv.innerHTML = "";
  ContainerDiv.appendChild(CharacterTable);
  
  console.log(performance.now() - t0,"ms");
}

function GenerateTableSMP(){
  var t0 = performance.now();
  
  var CharacterTable = document.createElement("table");
  
  for(var a = 0;a < limit;a += 16){
    var newRow = document.createElement("tr");
    for(var b = 0;b < 16;b ++){
      //newRow.innerHTML += "<td>"+String.fromCharCode(a+b)+"</td>";
      var newBox = document.createElement("td");
      //newBox.innerHTML = String.fromCharCode(a+b)+"<br>U+"+(a+b).toString(16);
      newBox.innerHTML = String.fromCodePoint(a+b+65536);
      newRow.appendChild(newBox);
    }
    CharacterTable.appendChild(newRow);
  }
  
  ContainerDiv.innerHTML = "";
  ContainerDiv.appendChild(CharacterTable);
  
  console.log(performance.now() - t0,"ms");
}


//======== Textbox functionality ========//

const TextboxUTF8Code = document.getElementById("TextboxUTF8Code");
const TextboxHexCode = document.getElementById("TextboxHexCode");
const TextboxDecCode = document.getElementById("TextboxDecCode");
const TextboxChar = document.getElementById("TextboxChar");

function UTF8CodeUpdated(){
  if(typeof(String.fromCodePoint) == "function"){
    try{
      var symbol = decodeURIComponent(TextboxUTF8Code.value.replace(/ /g,"").replace(/0x/g,"%"));
      //Update the Hex code textbox
      if((TextboxChar.value || String.fromCharCode(0)).codePointAt(0) > 65535){
        TextboxHexCode.value = "0x"+("00000000"+(symbol || String.fromCharCode(0)).codePointAt(0).toString(16)).substr(-8);
      }else{
        TextboxHexCode.value = "0x"+("0000"+(symbol || String.fromCharCode(0)).codePointAt(0).toString(16)).substr(-4);
      }
      //Update the Dec code textbox
      TextboxDecCode.value = (symbol || String.fromCharCode(0)).codePointAt(0).toString();
      //Update the Char textbox
      TextboxChar.value = symbol;
    }catch(e){
      console.warn("Invalid UTF-8 sequence");
    }
  }else{
    try{
      var symbol = decodeURIComponent(TextboxUTF8Code.value.replace(/ /g,"").replace(/0x/g,"%"));
      //Update the Hex code textbox
      TextboxHexCode.value = "0x"+("0000"+(symbol || String.fromCharCode(0)).charCodeAt(0).toString(16)).substr(-4);
      //Update the Dec code textbox
      TextboxDecCode.value = (symbol || String.fromCharCode(0)).charCodeAt(0).toString();
      //Update the Char textbox
      TextboxChar.value = symbol;
    }catch(e){
      console.warn("Invalid UTF-8 sequence");
    }
  }
}

function HexCodeUpdated(){
  if(typeof(String.fromCodePoint) == "function"){
    //Update the UTF-8 code textbox
    TextboxUTF8Code.value = encodeURIComponent(String.fromCodePoint(parseInt((TextboxHexCode.value || "0"),16))).replace(/%/g," 0x").substr(1);
    //Update the Dec code textbox
    TextboxDecCode.value = parseInt((TextboxHexCode.value || "0"),16).toString();
    //Update the Char textbox
    TextboxChar.value = String.fromCodePoint(parseInt((TextboxHexCode.value || "0"),16));
  }else{
    //Update the UTF-8 code textbox
    TextboxUTF8Code.value = encodeURIComponent(String.fromCharCode(parseInt((TextboxHexCode.value || "0"),16))).replace(/%/g," 0x").substr(1);
    //Update the Dec code textbox
    TextboxDecCode.value = parseInt((TextboxHexCode.value || "0"),16).toString();
    //Update the Char textbox
    TextboxChar.value = String.fromCharCode(parseInt((TextboxHexCode.value || "0"),16));
  }
}

function DecCodeUpdated(){
  if(typeof(String.fromCodePoint) == "function"){
    //Update the UTF-8 code textbox
    TextboxUTF8Code.value = encodeURIComponent(String.fromCodePoint(parseInt((TextboxDecCode.value || "0"),10))).replace(/%/g," 0x").substr(1);
    //Update the Hex code textbox
    if(parseInt((TextboxDecCode.value || "0"),10) > 65535){
      TextboxHexCode.value = "0x"+("00000000"+parseInt((TextboxDecCode.value || "0"),10).toString(16)).substr(-8);
    }else{
      TextboxHexCode.value = "0x"+("0000"+parseInt((TextboxDecCode.value || "0"),10).toString(16)).substr(-4);
    }
    //Update the Char textbox
    TextboxChar.value = String.fromCodePoint(parseInt((TextboxDecCode.value || "0"),10));
  }else{
    //Update the UTF-8 code textbox
    TextboxUTF8Code.value = encodeURIComponent(String.fromCharCode(parseInt((TextboxDecCode.value || "0"),10))).replace(/%/g," 0x").substr(1);
    //Update the Hex code textbox
    TextboxHexCode.value = "0x"+("0000"+parseInt((TextboxDecCode.value || "0"),10).toString(16)).substr(-4);
    //Update the Char textbox
    TextboxChar.value = String.fromCharCode(parseInt((TextboxDecCode.value || "0"),10));
  }
}

function CharUpdated(){
  if(typeof("".codePointAt) == "function"){
    //Update the UTF-8 code textbox
    TextboxUTF8Code.value = encodeURIComponent(TextboxChar.value).replace(/%/g," 0x").substr(1);
    //Update the Hex code textbox
    if((TextboxChar.value || String.fromCharCode(0)).codePointAt(0) > 65535){
      TextboxHexCode.value = "0x"+("00000000"+(TextboxChar.value || String.fromCharCode(0)).codePointAt(0).toString(16)).substr(-8);
    }else{
      TextboxHexCode.value = "0x"+("0000"+(TextboxChar.value || String.fromCharCode(0)).codePointAt(0).toString(16)).substr(-4);
    }
    //Update the Dec code textbox
    TextboxDecCode.value = (TextboxChar.value || String.fromCharCode(0)).codePointAt(0).toString();
  }else{
    //Update the UTF-8 code textbox
    TextboxUTF8Code.value = encodeURIComponent(TextboxChar.value).replace(/%/g," 0x").substr(1);
    //Update the Hex code textbox
    TextboxHexCode.value = "0x"+("0000"+(TextboxChar.value || String.fromCharCode(0)).charCodeAt(0).toString(16)).substr(-4);
    //Update the Dec code textbox
    TextboxDecCode.value = (TextboxChar.value || String.fromCharCode(0)).charCodeAt(0).toString();
  }
}

function CopyTextboxChar(){
  navigator.clipboard.writeText(document.getElementById("TextboxChar").value).then(
    function(){
      //console.log("Successfully wrote to clipboard");
    },
    function(){
      //console.log("Failed to write to clipboard");
      var characterText = document.querySelector("#TextboxChar");
      characterText.select();
      characterText.setSelectionRange(0,99999);
      document.execCommand("copy");
    }
  );
  
  //iOS:
  if(['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)){
    console.log("iOS copy method");
    var range = document.createRange();
    range.selectNodeContents(document.getElementById("TextboxChar"));
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
  }
}



//Testing code for printing/generating the 𝄞 (Treble Clef) unicode character (which is outside of the first unicode plane - BMP)
//console.log("𝄞"); //What should be printed
//console.log("&#x1D11E"); //HTML only
//console.log(String.fromCharCode(119070)); //Doesn't work
//console.log("\uD834\uDD1E"); //Prints the correct character
//console.log(String.fromCharCode(55348)+String.fromCharCode(56606)); //Prints the correct character
//console.log(String.fromCodePoint(119070)); //It works!
//console.log(typeof(String.fromCodePoint));
//console.log(typeof("".codePointAt));
