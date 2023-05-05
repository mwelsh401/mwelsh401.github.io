var buttonColor = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

$(document).keydown(function(){
    
    if (level === 0){
    nextSequence();
    $("h1").text("Level 1");
} else {};


})

function nextSequence(){
    userClickedPattern= [];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
}

$(".btn").click(function(event){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    

})


function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed").delay(100).queue(function(){
        $(this).removeClass("pressed").dequeue();
    });
   
}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

     
      if (userClickedPattern.length === gamePattern.length){

      
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over").delay(200).queue(function(){
            $(this).removeClass("game-over").dequeue()});
        $("#level-title").text("Game Over, Press Any Key to Restart");    
      console.log("wrong");
      startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern=[];
}

