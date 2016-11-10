// Square_Game game.js

function change_state(id, level){
  // Square clicked
  var sId = id;
  $('#' + sId.toString()).toggleClass('active');

  // Top Left Corner
  if (id == 0){
    $('#1').toggleClass('active');
    $('#' + level.toString()).toggleClass('active');
  }

  // Top Right Corner
  else if (id == level - 1) {
    sId = level - 2;
    $('#' + sId.toString()).toggleClass('active');
    sId = level * 2 - 1;
    $('#' + sId.toString()).toggleClass('active');
  }

  // Bottom Left Corner
  else if (id == level * (level - 1)) {
    sId = level * (level - 2);
    $('#' + sId.toString()).toggleClass('active');
    sId = level * (level - 1) + 1;
    $('#' + sId.toString()).toggleClass('active');
  }

  // Bottom Right Corner
  else if (id == level * level - 1) {
    sId = level * (level - 1) - 1;
    $('#' + sId.toString()).toggleClass('active');
    sId = level * level - 2;
    $('#' + sId.toString()).toggleClass('active');
  }

  // Top & Bottom Sides
  else if (((id > 0) && (id < level - 1)) || ((id > (level * (level - 1))) && (id < level*level))) {
    sId = parseInt(id) + 1;
    $('#' + sId.toString()).toggleClass('active');
    sId = parseInt(id) - 1;
    $('#' + sId.toString()).toggleClass('active');

    if (((id > 0) && (id < level - 1))) {
      sId = parseInt(id) + level;
      $('#' + sId.toString()).toggleClass('active');
    }
    else {
      sId = parseInt(id) - level;
      $('#' + sId.toString()).toggleClass('active');
    }
  }

  // Left & Right Sides
  else if ((id % level == 0)  || ((parseInt(id) + 1) % level == 0)) {
    sId = parseInt(id) + level;
    $('#' + sId.toString()).toggleClass('active');
    sId = parseInt(id) - level;
    $('#' + sId.toString()).toggleClass('active');

    if ((id % level == 0)) {
      sId = parseInt(id) + 1;
      $('#' + sId.toString()).toggleClass('active');
    }
    else {
      sId = parseInt(id) - 1;
      $('#' + sId.toString()).toggleClass('active');
    }
  }

  // Inside Squares
  else {
    sId = parseInt(id) + 1;
    $('#' + sId.toString()).toggleClass('active');
    sId = parseInt(id) - 1;
    $('#' + sId.toString()).toggleClass('active');
    sId = parseInt(id) + level;
    $('#' + sId.toString()).toggleClass('active');
    sId = parseInt(id) - level;
    $('#' + sId.toString()).toggleClass('active');
  }
}

function check_GameOver(num){
  var counter = 0;

  for (var i = 0; i < num * num; i++) {
    var cl = $("#"+i.toString()).attr('class');
    if (cl == "box active") counter += 1;
  }

  if (counter == num*num) return true;
  else return false;
}

var gameOver = false;
var level = 2;

var main = function(){

  $('.level-text').text("Level " + (level - 1).toString());

  var game_board = new GridBoard(level, level, 550, 550)
  game_board.make_board();
  game_board.make_boxes();
  $('.board').fadeIn('slow');

  $('.box').click(function() {
    var $s_id = $(this).attr('id');

    change_state($s_id, level);

    gameOver = check_GameOver(level);
    if (gameOver){
      $('.board').fadeOut('slow');
      $('.over').fadeIn('slow');
    }
  });
}

$(document).ready(function(){
  main();

  $('.btn').click(function() {
    if ($(this).attr('class') == 'btn b-right') level++;

    gameOver = false;
    $('.over').fadeOut('slow');
    $('.board').remove();
    main();
  });
});
