// *****************************************************************************
//
// GridBoard.js
// Author: Fernando Leira
//
// *****************************************************************************

class GridBoard {
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  make_board(){
    var board = document.createElement('div');
    var board_width = this.width + 2 * this.x;
    var board_height = this.height + 2 * this.y;

    board.className = "board";
    Object.assign(board.style, {
      width: board_width.toString() + "px",
      height: board_height.toString() + "px",
      margin: (board_height/2 * -1).toString() + "px " + (board_width/2 * -1).toString() + "px",
    });

    document.body.appendChild(board);
  }

  make_boxes() {
    var board = document.getElementsByClassName("board")[0];
    var box;
    var box_id;
    var box_width = this.width / this.x;
    var box_height = this.height / this.y;

    for (var l = 0; l < this.y; l++){
      for (var i = 0; i < this.x; i++){
        box = document.createElement('div');
        box_id = l * this.y + i;

        box.id = box_id.toString();
        box.className = "box";
        Object.assign(box.style, {
          width: box_width.toString() + "px",
          height: box_height.toString() + "px",
        });

        board.appendChild(box);
      }
    }

  }

}
