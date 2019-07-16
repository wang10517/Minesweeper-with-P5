
class Cell {
  constructor(x,y,width){
    this.physicalX = x*width;
    this.physicalY = y*width;
    this.width = width
    this.x = x;
    this.y = y; 
    this.revealed = false; 
    this.isMine = Math.random(1) < 0.3;
    this.mineNeighbors = 0;
    this.neighbors = [];
  }

  gameOver(win){
    if ( win) {
      alert('Congradulation, you win !');
      remove()
    }else {
      alert('Sorry, you bumped into a mine');
      remove()
    }
  }

  reveal(){
    if(this.isMine){
      stroke(0);
      fill(127);
      circle(this.physicalX + this.width/2 ,this.physicalY +  this.width/2, this.width/4);
      this.gameOver(false);

    }else{
      stroke(0);
      fill(127);
      rect(this.physicalX, this.physicalY, this.width, this.width);
      if(this.mineNeighbors > 0) {
          fill(0);
          textAlign(CENTER);
          textSize(20);
          text(this.mineNeighbors.toString(), this.physicalX + this.width/2 ,this.physicalY +  this.width*3/5) ;     
      }else{
        this.neighbors.forEach( (n) => {
          if(! n.revealed){
            n.revealed = true; 
          }
        });
      }
    }
  }

  draw() {
    noFill()
    rect(this.physicalX,this.physicalY,this.width,this.width);
    if (this.revealed) {
      this.reveal();
    }
  }



  countNeighbors(){
    if(this.isMine){
       this.mineNeighbors = -1;
       return
    }

    this.neighbors.forEach((n) => this.mineNeighbors = this.mineNeighbors + n.isMine );

  }

  contains(x, y) {
    if (x >  this.physicalX &&
         x < (this.physicalX + this.width) &&
          y >  this.physicalY && 
          y < (this.physicalY + this.width)){
        return true;
  }

  return false; 

}

}


