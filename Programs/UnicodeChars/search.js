//======== Search functionality ========//

const SearchBox = document.getElementById("SearchBox");
const SearchTable = document.getElementById("SarchResultTable");

//First character set is search terms, following set is the array of resulting chars
const CharMatches = [
  [["a"],["À","Á","Â","Ã","Ä","Å","Æ","à","á","â","ã","ä","å","æ","Ā","ā","Ă","ă","Ą","ą"]],
  //[["b"],[]],
  [["c"],["Ç","ç","Ć","ć","Ĉ","ĉ","Ċ","ċ","Č","č"]],
  [["d"],["Đ","đ","Ð (Eth)","þ (Eth)"]],
  [["e"],["È","É","Ê","Ë","è","é","ê","ë","Ē","ē","Ĕ","ĕ","Ė","ė","Ę","ę","Ě","ě"]],
  //[["f"],[]],
  [["g"],["Ĝ","ĝ","Ğ","ğ","Ġ","ġ","Ģ","ģ"]],
  [["h"],["Ĥ","ĥ","Ħ","ħ"]],
  [["i"],["Ì","Í","Î","Ï","ì","í","î","ï","Ĩ","ĩ","Ī","ī","Ĭ","ĭ","Į","į","İ","ı","Ĳ","ĳ"]],
  [["j"],["Ĳ","ĳ","Ĵ","ĵ"]],
  [["k"],["Ķ","ķ","ĸ"]],
  [["l"],["Ĺ","ĺ","Ļ","ļ","Ľ","ľ","Ŀ","ŀ","Ł","ł"]],
  //[["m"],[]],
  [["n"],["Ñ","ñ","Ń","ń","Ņ","ņ","Ň","ň","ŉ","Ŋ","ŋ"]],
  [["o"],["Ò","Ó","Ô","Õ","Ö","Ø","ò","ó","ô","õ","ö","ø","Ō","ō","Ŏ","ŏ","Ő","ő","Œ","œ"]],
  //[["p"],[]],
  //[["q"],[]],
  [["r"],["Ŕ","ŕ","Ŗ","ŗ","Ř","ř"]],
  [["s"],["ß","Ś","ś","Ŝ","ŝ","Ş","ş","Š","š","ſ"]],
  [["t"],["Ţ","ţ","Ť","ť","Ŧ","ŧ"]],
  [["u"],["Ù","Ú","Û","Ü","ù","ú","û","ü","Ũ","ũ","Ū","ū","Ŭ","ŭ","Ů","ů","Ű","ű","Ų","ų"]],
  //[["v"],[]],
  [["w","wynn"],["Ŵ","ŵ","ƿ","Ƿ"]],
  [["w","wau"],["Ϝ","ϝ","ϛ"]],
  [["x"],[""]],
  [["y"],["Ý","ý","Ÿ","ÿ","Ŷ","ŷ"]],
  [["z"],["Ź","ź","Ż","ż","Ž","ž"]],
  //[["0"],[]],
  //[["1"],[]],
  //[["2"],[]],
  //[["3"],[]],
  //[["4"],[]],
  //[["5"],[]],
  //[["6"],[]],
  //[["7"],[]],
  //[["8"],[]],
  //[["9"],[]],
  [["th","eth"],["Ð","ð","Þ","þ"]],
  [["trademark","tm"],["™","®"]],
  [["copyright","c"],["©"]],
  [["registered","r"],["®"]],
  [["interrobang","!","?","question","exclamation"],["‽","⁈","⁉","⁇","‼","¿","¡"]],
  [["tab"],["Tab - (	) - 0x0009"]],
  [["dot"],["⋅","· (Interpunct)","• (Bullet)","∙ (Bullet alt)"]],
  [["dot product"],["⋅"]],
  [["interpunct"],["·"]],
  [["bullet"],["•","∙"]],
  
  [["greek alphabet"],["Α","α","Β","β","Γ","γ","Δ","δ","Ε","ε","Ζ","ζ","Η","η","Θ","θ","Ι","ι","Κ","κ","Λ","λ","Μ","μ","Ν","ν","Ξ","ξ","Ο","ο","Π","π","Ρ","ρ","Σ","σ","ς","Τ","τ","Υ","υ","Φ","φ","Χ","χ","Ψ","ψ","Ω","ω"]],
  [["alpha"],["Α","α"]],
  [["beta"],["Β","β"]],
  [["gamma"],["Γ","γ"]],
  [["delta"],["Δ","δ"]],
  [["epsilon"],["Ε","ε"]],
  [["zeta"],["Ζ","ζ"]],
  [["eta"],["Η","η"]],
  [["theta"],["Θ","θ"]],
  [["iota"],["Ι","ι"]],
  [["kappa"],["Κ","κ"]],
  [["lambda"],["Λ","λ"]],
  [["mu"],["Μ","μ"]],
  [["nu"],["Ν","ν"]],
  [["xi"],["Ξ","ξ"]],
  [["omicron"],["Ο","ο"]],
  [["pi"],["Π","π"]],
  [["rho"],["Ρ","ρ"]],
  [["sigma"],["Σ","σ","ς"]],
  [["tau"],["Τ","τ"]],
  [["upsilon"],["Υ","υ"]],
  [["phi"],["Φ","φ"]],
  [["chi"],["Χ","χ"]],
  [["psi"],["Ψ","ψ"]],
  [["omega"],["Ω","ω"]],
  [["digamma"],["Ϝ","ϝ","ϛ"]],
  
  [["roman numerals"],["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ","Ⅼ","Ⅽ","Ⅾ","Ⅿ","ⅰ","ⅱ","ⅲ","ⅳ","ⅴ","ⅵ","ⅶ","ⅷ","ⅸ","ⅹ","ⅺ","ⅻ","ⅼ","ⅽ","ⅾ","ⅿ","ↀ","ↁ","ↂ","Ↄ","ↄ","ↅ","ↆ","ↇ","ↈ"]],
  
  [["multiplication","multiply","times","*","product"],["×","⋅"]],
  [["division","divide","/"],["÷"]],
  [["degrees"],["°"]],
  [["plus minus","plus-minus"],["±"]],
  [["infinity"],["∞"]],
  [["union"],["∪"]],
  [["intersection"],["∩"]],
  [["subset"],["⊂","⊄","⊆","⊈","∈","∉"]],
  [["superset"],["⊃","⊅","⊇","⊉","∋","∌"]],
  [["number sets"],["∅","ℙ","ℕ","ℤ","ℚ","ℝ","ℂ","ℍ","∪","∩","⊂","⊃","⊄","⊅","⊆","⊇","⊈","⊉","∈","∋","∉","∌"]],
  [["prime numbers"],["ℙ"]],
  [["integers"],["ℤ"]],
  [["natural numbers"],["ℕ"]],
  [["real numbers"],["ℝ"]],
  [["complex numbers","imaginary numbers"],["ℂ","ⅈ"]],
  [["quaternions","imaginary numbers","complex numbers"],["ℍ","ⅉ"]],
  [["rational numbers"],["ℚ"]],
  [["proportional"],["∝"]],
  [["integral"],["∫"]],
  [["therefore"],["∴"]],
  [["because"],["∵"]],
  [["nearly equal","=","~"],["≈"]],
  [["not equal","="],["≠"]],
  [["less than or equal","smaller than or equal","<","="],["≤"]],
  [["greater than or equal","larger than or equal",">","="],["≥"]],
  [["square root","sqrt","cube root"],["√","∛","∜"]],
  [["ceiling","round"],["⌈","⌉"]],
  [["floor","round"],["⌊","⌋"]],
  [["xor","exclusive or"],["⊕"]],
  [["tensor product"],["⊗"]],
  [["partial derivative"],["∂"]],
  [["prime"],[String.fromCharCode(8242),String.fromCharCode(8243),String.fromCharCode(8244),String.fromCharCode(8279)]],
  [["foot","feet"],[String.fromCharCode(8242)]],
  [["inches"],[String.fromCharCode(8243)]],
  
  [["music","accidental","flat"],["♭"]],
  [["music","accidental","natural"],["♮"]],
  [["music","accidental","sharp"],["♯"]],
  [["music","treble clef"],["𝄞"]],
  [["music","treble clef"],["𝄢"]],
  
  [["arrows","->","<-"],["←","↑","→","↓","↔","↕"]],
  [["dice","die face"],["⚀","⚁","⚂","⚃","⚄","⚅"]],
  [["chess piece"],["♔","♕","♖","♗","♘","♙","♚","♛","♜","♝","♞","♟"]],
  [["recycle"],["♲","♳","♴","♵","♶","♷","♸","♹","♺","♻","♼","♽"]],
  
  [["superscript"],["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹","⁺","⁻","⁼","⁽","⁾","ⁱ","⁲","⁳","º","ª"]],
  [["subscript"],["₀","₁","₂","₃","₄","₅","₆","₇","₈","₉","₊","₋","₌","₍","₎"]],
];

function SearchForChar(){
  var searchString = SearchBox.value;
  
  SearchTable.innerHTML = "";
  
  if(searchString != ""){
    var matchesList = [];
    
    for(var a = 0;a < CharMatches.length;a ++){
      for(var b = 0;b < CharMatches[a][0].length;b ++){
        if(CharMatches[a][0][b].includes(searchString.toLowerCase())){
          for(var c = 0;c < CharMatches[a][1].length;c ++){
            //Prevent the same result being added to the list multiple times:
            var repeat = false;
            for(var d = 0;d < matchesList.length;d ++){
              if(CharMatches[a][1][c] == matchesList[d]){
                repeat = true;
                d = matchesList.length;
              }
            }
            if(!repeat){
              matchesList.push(CharMatches[a][1][c]);
            }
          }
        }
      }
    }
    
    for(var a = 0;a < matchesList.length;a += 4){
      var newRow = document.createElement("tr");
      for(var b = 0;b < 4;b ++){
        var newBox = document.createElement("td");
        newBox.innerHTML = matchesList[a+b] || "";
        newRow.appendChild(newBox);
      }
      SearchTable.appendChild(newRow);
    }
  }
}
