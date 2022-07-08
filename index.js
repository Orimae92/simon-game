var level = 1;
var start = false;
var clickPermission = true;
var colorList = ["green", "red", "yellow", "blue"];
var orderColor = [];
var orderColorLength;
var index = 0;
var defeat = false;

$(document).keydown(function() {
  if (!start) {
    start = true;
    $("h1").text("Level " + level);
    boxRandomFlashes();
    defeat = false;
  }
});

$(".btn").click(function() {
  var box = $(this);
  if (start&&clickPermission) {
    clickPermission = false;
    if (index < orderColorLength) {
      if (box.attr("id") === orderColor[index]) {                               //Correct order
        box.addClass("pressed");
        setTimeout(function(){
          box.removeClass("pressed");
        },100);
        var audio = new Audio("sounds/"+orderColor[index]+".mp3");
        audio.play();
        index++;
        if(index===orderColorLength){
          setTimeout(function(){
            level++;
            boxRandomFlashes();
            $("h1").text("Level " + level);
          },1000);
          index = 0;
        }
        else{
          clickPermission = true;
        }
      }
      else {
        wrongChoice(box);                                                       //Incorrect order
      }
    }

  }
  if(defeat&&clickPermission){
    wrongChoice(box);                                                           //Incorrect order
  }
})

function boxRandomFlashes() {
  var index = Math.floor(Math.random() * 4);
  var idColor = colorList[index];
  $("#" + idColor).hide().fadeIn();
  var audio = new Audio("sounds/" + idColor + ".mp3");
  audio.play();
  orderColor.push(idColor);
  orderColorLength = orderColor.length;
  clickPermission = true;
}

function wrongChoice(square){
  square.toggleClass(square.attr("id"));
  square.toggleClass("red");
  setTimeout(function(){
    square.toggleClass("red");
    square.toggleClass(square.attr("id"));
  },100);
  var audio = new Audio("sounds/"+orderColor[index]+".mp3");
  audio.play();                                                                    //Incorrect order
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  start = false;
  level = 1;
  orderColor = [];
  index = 0;
  defeat = true;
  clickPermission = true;
}
