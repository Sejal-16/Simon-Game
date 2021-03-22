

var buttonColors = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var flag = 0;
//initial function to trigger when key is pressed.
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("level" + level);
        nextSequence();
        started = true;
        
    }
    
    
    
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    //console.log(userClickedPattern);
    //console.log(gamePattern);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){
    userClickedPattern = [];
    //console.log(userClickedPattern);
    level++;
    $("#level-title").text("level  " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);

}

function checkAnswer(currentLevel){
     //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        flag = 1;
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
           $("body").removeClass("game-over");
    
        } , 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
  
      }
      

}

function playSound(name){
    var snd = new Audio("sounds/"+name+".mp3");
    snd.play();


}

function animatePress(CurrentColor){
    var button = $("." + CurrentColor)
    button.addClass("pressed");
    setTimeout(function(){
        button.removeClass("pressed");

    } , 100)

};

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }
  


