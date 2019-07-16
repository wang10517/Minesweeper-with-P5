
var board = [] ; 
var boardWidth = 20;
var img ;
function setup() {
  createCanvas(1001, 1001);
  img = loadImage('./flag.png');
  board =  initializeBoard(boardWidth, 1000);
  updateInfo(boardWidth);
}


function initializeBoard(cellNumber, edgeLength) {
  let board = Array(cellNumber).fill(0).map((arr) => Array(cellNumber))

  let width = floor(edgeLength/cellNumber)

  for(let i = 0 ; i < cellNumber ; i ++){
    for (let j = 0 ; j < cellNumber ; j++){
        board[i][j] = new Cell(i, j, width)
    }
  }

  return board

}

function updateInfo(cellNumber) {
	for(let i = 0 ; i < cellNumber ; i ++){
	    for (let j = 0 ; j < cellNumber ; j++){
	    	board[i][j].neighbors = getNeighbors(board[i][j], board);
	    	board[i][j].countNeighbors();
	    }
	  }
}

 function getNeighbors(cell , board) {
    let results = [] 

    for(let i = -1 ; i < 2 ; i++){
      for(let j = -1 ; j < 2 ; j++){
          let checkX = cell.x + i;
          let checkY = cell.y + j;
          if (!( checkX < 0 || checkX >= boardWidth || checkY < 0 || checkY >= boardWidth ) ){
              if(i != 0 || j != 0 ){
                results.push(board[checkX][checkY]);
              }
          } 
      }
    }
    return results; 
  }

function mousePressed() {

	for (let i = 0; i < boardWidth; i++) {
	    for (let j = 0; j < boardWidth; j++) {

    		if (board[i][j].contains(mouseX, mouseY)) {
    			if (mouseButton == LEFT) {
		        	board[i][j].revealed = true;
    			}else if (mouseButton == RIGHT) {
    				let cell = board[i][j];
    				image(img, cell.physicalX + cell.width/2, cell.physicalY + cell.width/2)
    			}
		      }
		  
	    }
	  }
	
}

function updateCanvas() {
	for(let i = 0 ; i < boardWidth ; i ++){
	    for (let j = 0 ; j < boardWidth ; j++){
	    	let cur_cell = board[i][j]
	    	cur_cell.draw();
	    	if ( cur_cell.revealed) {
	    		cur_cell.reveal();
	    	}
	    }
	  }
}


function draw() {
	updateCanvas();
}
