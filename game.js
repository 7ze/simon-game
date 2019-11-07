// set of buttons
const buttonColours = ["red", "blue", "green", "yellow"];
// records the game pattern
let gamePattern = [];
// records the user pattern
let userClickedPattern = [];
// records the status of game, i.e. if the game has started or not
let gameStarted = false;
// records game level
let level = 0;

$(document).on("keydown", function() {
  // check if the game has started or not
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

//function to create random numbers
function nextSequence() {
  $("#level-title").text("level " + level);
  level++;

  userClickedPattern = [];

  let randomNumber = parseInt(Math.random() * 4);

  // choosing the next button
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // animation
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(250)
    .fadeIn(150);

  // playing sound
  playSound(randomChosenColour);
}

$(".btn").on("click", function() {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);

  // playing sound
  playSound(userChosenColour);

  // click animation
  animatePress(userChosenColour);

  // check answer
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(curentLevel) {
  console.log("User pattern : " + userClickedPattern);
  console.log("Game pattern : " + gamePattern);
  if (userClickedPattern[curentLevel] === gamePattern[curentLevel]) {
    console.log("success");
    console.log("level - " + level + " Current level-" + curentLevel);
    if (curentLevel === level - 1) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } 
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gameStarted = false;
  gamePattern = [];
}

function playSound(name) {
  // function to play sounds corresponding to each button
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
