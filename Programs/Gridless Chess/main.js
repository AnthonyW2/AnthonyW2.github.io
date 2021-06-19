

//Configurables
const pieceCollideRadius = 0.5;

//DOM references
const boardContainer = document.getElementById("game-board-container");
const boardSVG = document.getElementById("board-svg");

//Board size (in pixels)
const boardSize = parseInt(boardSVG.clientWidth);

//The size of one grid space (in pixels)
const gridSize = boardSize/8;

const pieceNames = [
  "Stationary", // 0
  "King",       // 1
  "Queen",      // 2
  "Bishop",     // 3
  "Knight",     // 4
  "Rook",       // 5
  "Pawn",       // 6
];

const pieceIconPaths = [
  [ // White pieces
    "Resources/Pieces/64px/StationaryW.png",
    "Resources/Pieces/64px/KingW.png",
    "Resources/Pieces/64px/QueenW.png",
    "Resources/Pieces/64px/BishopW.png",
    "Resources/Pieces/64px/KnightW.png",
    "Resources/Pieces/64px/RookW.png",
    "Resources/Pieces/64px/PawnW.png"
  ],
  [ // Black pieces
    "Resources/Pieces/64px/StationaryB.png",
    "Resources/Pieces/64px/KingB.png",
    "Resources/Pieces/64px/QueenB.png",
    "Resources/Pieces/64px/BishopB.png",
    "Resources/Pieces/64px/KnightB.png",
    "Resources/Pieces/64px/RookB.png",
    "Resources/Pieces/64px/PawnB.png"
  ]
];

const sqrt2 = Math.sqrt(2);
const sqrt5 = Math.sqrt(5);




//Global variable stores references to all piece objects
var pieces = [];

var playerTurn = 0;



class Piece{
  constructor(id, type, color, x, y, DOMElement){
    
    this.id = id;
    this.type = type;
    this.color = color;
    this.x = x;
    this.y = y;
    
    this.moveAmount = 0;
    
    this.DOMElement = DOMElement;
    this.DOMElement.addEventListener("click", this.select);
    
  }
  
  //Called when a pices is left-clicked
  select(){
    var pieceObj = pieces[parseInt(this.getAttribute("pieceID"))];
    
    if(playerTurn == pieceObj.color){
      var moves = pieceObj.getMoves();
      
      displayMoves(moves, pieceObj);
    }
    
  }
  
  //Define the possible movement area through the use of SVG elements
  getMoves(){
    var moves = [];
    
    switch(this.type){
      case 0:
        //No moves
        return [];
        break;
      case 1:
        //King
        var moveObj = {};
        moveObj.type = "full-circle";
        moveObj.radius = sqrt2;
        moveObj.x = this.x;
        moveObj.y = this.y;
        
        moves.push(moveObj);
        break;
      case 2:
        //Queen
        var moveObj = {};
        moveObj.type = "line";
        moveObj.x1 = this.x;
        moveObj.x2 = this.x;
        moveObj.y1 = 0;
        moveObj.y2 = 8;
        
        moves.push(moveObj);
        
        moveObj = {};
        moveObj.type = "line";
        moveObj.x1 = 0;
        moveObj.x2 = 8;
        moveObj.y1 = this.y;
        moveObj.y2 = this.y;
        
        moves.push(moveObj);
        
        moveObj = {};
        moveObj.type = "line";
        moveObj.x1 = 0;
        moveObj.x2 = 8;
        moveObj.y1 = this.y-this.x;
        moveObj.y2 = moveObj.y1+8;
        
        moves.push(moveObj);
        
        moveObj = {};
        moveObj.type = "line";
        moveObj.x1 = 0;
        moveObj.x2 = 8;
        moveObj.y1 = this.y+this.x;
        moveObj.y2 = moveObj.y1-8;
        
        moves.push(moveObj);
        
        break;
      case 3:
        //Bishop
        var moveObj = {};
        moveObj.type = "line";
        moveObj.x1 = 0;
        moveObj.x2 = 8;
        moveObj.y1 = this.y-this.x;
        moveObj.y2 = moveObj.y1+8;
        
        moves.push(moveObj);
        
        moveObj = {};
        moveObj.type = "line";
        moveObj.x1 = 0;
        moveObj.x2 = 8;
        moveObj.y1 = this.y+this.x;
        moveObj.y2 = moveObj.y1-8;
        
        moves.push(moveObj);
        
        break;
      case 4:
        //Knight
        var moveObj = {};
        moveObj.type = "empty-circle";
        moveObj.radius = sqrt5;
        moveObj.x = this.x;
        moveObj.y = this.y;
        
        moves.push(moveObj);
        
        break;
      case 5:
        //Rook
        var moveObj = {};
        moveObj.type = "line";
        moveObj.x1 = this.x;
        moveObj.x2 = this.x;
        moveObj.y1 = 0;
        moveObj.y2 = 8;
        
        moves.push(moveObj);
        
        moveObj = {};
        moveObj.type = "line";
        moveObj.x1 = 0;
        moveObj.x2 = 8;
        moveObj.y1 = this.y;
        moveObj.y2 = this.y;
        
        moves.push(moveObj);
        
        break;
      case 6:
        //Pawn
        var moveObj = {};
        moveObj.type = "line";
        moveObj.x1 = this.x;
        moveObj.x2 = this.x;
        moveObj.y1 = this.y;
        var length = (this.moveAmount == 0 ? 2 : 1);
        if(this.color == 0){
          length = -length;
        }
        moveObj.y2 = this.y+length;
        
        moves.push(moveObj);
        
        
        break;
      default:
        console.error("Invalid Piece Type");
    }
    
    return moves;
  }
  
  //Move the piece to a new position
  move(x, y){
    
    this.x = x;
    this.y = y;
    
    this.moveAmount ++;
    
    this.DOMElement.style.left = (gridSize*this.x - gridSize/2) + "px";
    this.DOMElement.style.top = (gridSize*this.y - gridSize/2) + "px";
    
    displayMoves();
    
    playerTurn = (this.color+1)%2;
    
  }
}

//
function displayMoves(moves = [], piece = {}){
  
  boardSVG.innerHTML = "";
  
  for(var m = 0;m < moves.length;m ++){
    switch(moves[m].type){
      case "full-circle":
        var newCircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        newCircle.setAttribute("cx", gridSize*moves[m].x);
        newCircle.setAttribute("cy", gridSize*moves[m].y);
        newCircle.setAttribute("r", moves[m].radius*gridSize);
        newCircle.style.fill = "#20a0207f";
        
        newCircle.setAttribute("pieceID", piece.id);
        
        newCircle.addEventListener("click", function(event){
          
          var pieceObj = pieces[parseInt(event.target.getAttribute("pieceID"))];
          var radius = parseInt(event.target.getAttribute("r"));
          
          var relX = event.pageX - boardContainer.offsetLeft-2;
          var relY = event.pageY - boardContainer.offsetTop-2;
          
          pieceObj.move(
            relX/gridSize,
            relY/gridSize
          );
          
        });
        
        boardSVG.appendChild(newCircle);
        break;
      case "empty-circle":
        var newCircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        newCircle.setAttribute("cx", gridSize*moves[m].x);
        newCircle.setAttribute("cy", gridSize*moves[m].y);
        newCircle.setAttribute("r", moves[m].radius*gridSize);
        newCircle.style.fill = "#00000000";
        newCircle.setAttribute("stroke-width", 6);
        newCircle.style.stroke = "#20a0207f";
        newCircle.classList.add("emptyCircle");
        
        newCircle.setAttribute("pieceID", piece.id);
        
        newCircle.addEventListener("click", function(event){
          
          var pieceObj = pieces[parseInt(event.target.getAttribute("pieceID"))];
          var radius = parseInt(event.target.getAttribute("r"));
          
          var relX = event.pageX - boardContainer.offsetLeft-2;
          var relY = event.pageY - boardContainer.offsetTop-2;
          
          pieceObj.move(
            relX/gridSize,
            relY/gridSize
          );
          
        });
        
        boardSVG.appendChild(newCircle);
        break;
      case "line":
        var newLine = document.createElementNS("http://www.w3.org/2000/svg","line");
        newLine.setAttribute("x1", gridSize*moves[m].x1);
        newLine.setAttribute("y1", gridSize*moves[m].y1);
        newLine.setAttribute("x2", gridSize*moves[m].x2);
        newLine.setAttribute("y2", gridSize*moves[m].y2);
        newLine.setAttribute("stroke-width", 8);
        newLine.style.stroke = "#20a0207f";
        
        newLine.setAttribute("pieceID", piece.id);
        
        newLine.addEventListener("click", function(event){
          
          var pieceObj = pieces[parseInt(event.target.getAttribute("pieceID"))];
          
          var relX = event.pageX - boardContainer.offsetLeft-2;
          var relY = event.pageY - boardContainer.offsetTop-2;
          
          pieceObj.move(
            relX/gridSize,
            relY/gridSize
          );
          
        });
        
        boardSVG.appendChild(newLine);
        break;
      default:
        console.error("Invalid Move Type");
    }
  }
  
}



function init(){
  
  //Define the starting layout
  var startingPieces = [
    //{Type, color, x, y}
    [5, 0, 0.5, 7.5],
    [4, 0, 1.5, 7.5],
    [3, 0, 2.5, 7.5],
    [2, 0, 3.5, 7.5],
    [1, 0, 4.5, 7.5],
    [3, 0, 5.5, 7.5],
    [4, 0, 6.5, 7.5],
    [5, 0, 7.5, 7.5],
    [6, 0, 0.5, 6.5],
    [6, 0, 1.5, 6.5],
    [6, 0, 2.5, 6.5],
    [6, 0, 3.5, 6.5],
    [6, 0, 4.5, 6.5],
    [6, 0, 5.5, 6.5],
    [6, 0, 6.5, 6.5],
    [6, 0, 7.5, 6.5],
    
    [5, 1, 0.5, 0.5],
    [4, 1, 1.5, 0.5],
    [3, 1, 2.5, 0.5],
    [2, 1, 3.5, 0.5],
    [1, 1, 4.5, 0.5],
    [3, 1, 5.5, 0.5],
    [4, 1, 6.5, 0.5],
    [5, 1, 7.5, 0.5],
    [6, 1, 0.5, 1.5],
    [6, 1, 1.5, 1.5],
    [6, 1, 2.5, 1.5],
    [6, 1, 3.5, 1.5],
    [6, 1, 4.5, 1.5],
    [6, 1, 5.5, 1.5],
    [6, 1, 6.5, 1.5],
    [6, 1, 7.5, 1.5]
  ];
  
  //Add the pieces to the board for the initial layout
  for(var a = 0;a < startingPieces.length;a ++){
    
    var newImg = document.createElement("IMG");
    newImg.src = pieceIconPaths[ startingPieces[a][1] ][ startingPieces[a][0] ];
    newImg.width = gridSize;
    newImg.height = gridSize;
    newImg.style.left = (gridSize*startingPieces[a][2] - gridSize/2) + "px";
    newImg.style.top = (gridSize*startingPieces[a][3] - gridSize/2) + "px";
    
    newImg.setAttribute("pieceID", a);
    
    boardContainer.appendChild(newImg);
    
    pieces[a] = new Piece(a, startingPieces[a][0], startingPieces[a][1], startingPieces[a][2], startingPieces[a][3], newImg);
  }
  
  //Press escape to de-select a piece
  document.addEventListener("keyup", function(event){
    if(event.keyCode == 27){
      displayMoves();
    }
  });
  
}


