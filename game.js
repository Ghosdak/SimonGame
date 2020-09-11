var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  var keycode = event.keyCode;
  if (keycode == '97') {
    started = true;
    nextSequence();
  }
});

$(".btn").click(function() {
  if (started) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  }
})

function nextSequence() {
  userClickedPattern= [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentlevel){
  if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
  console.log("YES");
  if(gamePattern.length === userClickedPattern.length){
    setTimeout(function(){
      nextSequence();
    }, 100);
  }
}
  else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200)
  $("h1").text("Game Over, Press A Key to Restart")
  starOver();
}
}

function starOver(){
  level= 0;
  gamePattern = [];
  started = false;
}
