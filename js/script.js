var make_squares = function(container_class, square_class, num_of_squares){
  var $width = $(container_class).width();
  var $height = $(container_class).height();

  var s_width = $width/num_of_squares;
  var s_height = $width/num_of_squares;
  var new_style = "<style>."+square_class+" {width:"+s_width.toString()+"px; height:"+s_height.toString()+"px;}</style>";

  $(new_style).appendTo( "head" );

  for (var i = 0; i < num_of_squares*num_of_squares; i++){
    var div_to_add = "<div class='" + square_class + "' id='" + i.toString() + "'></div>";
    $(container_class).append(div_to_add);
  }
}
var change_state = function(id, level){
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
var check_GameOver = function(num){
  var counter = 0;

  for (var i = 0; i < num * num; i++) {
    var cl = $("#"+i.toString()).attr('class');
    if (cl == "square active") counter += 1;
  }

  console.log(counter);
  console.log(num*num - 1);

  if (counter == num*num) return true;
  else return false;
}

var gameOver = false;
var qs = prompt("Level:");
var level = parseInt(qs) + 1;

var main = function(){

  $('.level-text').text("Level " + (level - 1).toString());

  make_squares('.panel', 'square', level);
  $('.panel').fadeIn('slow');

  $('.square').click(function() {
    var $s_id = $(this).attr('id');

    change_state($s_id, level);

    gameOver = check_GameOver(level);
    if (gameOver){
      $('.panel').fadeOut('slow');
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
    $('.square').remove();
    main();
  });
});
