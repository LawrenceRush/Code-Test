//global vars
var startBtn = document.getElementById("start-quiz-btn");
var enterBtn = document.getElementById("nameEnter");
var scoreSpan = document.getElementById("score-span");
var playAgain = document.getElementById("play-again");
var index = 0;
var answer;
var questionNumber = 0;
var counter = 0;
var totalTime = 120;
var interval;
var highScores = [];
var currentScore = 0;
var name;
var x;
var y;
var fInterval ;
var eInterval;
//set up
var local = localStorage.getItem("highscores");
var feedbackCounter = 0;


highScores = JSON.parse(local);

hideFeedback();
hideQuestion();
hideAllDone();
hidehighScore();

//timer ending quiz



//functions
function hideChallenge() {
    var challengePage = document.getElementById("challenge-page");
    if (challengePage.style.display === "none") {
        challengePage.style.display = "block";
    } else {
        challengePage.style.display = "none";
    }
}

function hideQuestion() {
    var questionPage = document.getElementById("question-page");
    if (questionPage.style.display === "none") {
        questionPage.style.display = "block";
    } else {
        questionPage.style.display = "none";
    }
}

function hideAllDone() {
    var allDonePage = document.getElementById("all-done-page");
    if (allDonePage.style.display === "none") {
        allDonePage.style.display = "block";
    } else {
        allDonePage.style.display = "none";
    }
    
}

function hidehighScore() {
    var highScorePage = document.getElementById("high-score-page");
    if (highScorePage.style.display === "none") {
        highScorePage.style.display = "block";
    } else {
        highScorePage.style.display = "none";
    }
}

function hideFeedback() {
    var feedback = document.getElementById("feedback");
    
        feedback.style.display = "none";
    }
function showFeedback(){
    var feedback = document.getElementById("feedback");
    feedback.style.display = "block";
}

function engagePositiveFeedback(){
    var feedback = document.getElementById("right/wrong");
    feedback.textContent = ("Right")
    showFeedback();
    fInterval= setInterval(feedInterval, 1000)
    
    
}

function engageNegativeFeedback(){
    var feedback = document.getElementById("right/wrong");
    feedback.textContent = ("Wrong")
    showFeedback();
    fInterval = setInterval(feedInterval, 1000)
    
    
}

function feedInterval (){
    console.log("success")
    hideFeedback();
    feedbackCounter++;
    if (feedbackCounter > 1) {
        clearInterval(fInterval)
    }
   
}

function renderQuestion(){
             

   if (questionNumber < 4){
    index = Math.floor(Math.random() * questions.length)
   
   var question = document.getElementById("question-display"),
   choices = document.getElementById("multiple-choices");
   question.textContent = questions[index]["title"];
   answer = questions[index]["answer"];
   randomArr = generateRandomArr();
   for (var i = 0; i < 4; i ++){
        var li = document.createElement("li");
        li.textContent = questions[index]["choices"][randomArr[i]];
        li.className = "answerLi"
        choices.appendChild(li);
   
    }

   questions.splice(index, 1)
   questionNumber++;
   
}else {
    currentScore = totalTime - counter;
    
    //timer();
    displayScore();
    clearInterval(interval);
    hideAllDone();
    


}

}
function generateRandomArr(){
    var arr = [0,1,2,3],
    random = [];
    for (var i = 0; i < 4; i++){
        var randomIndex = Math.floor(Math.random() * arr.length);
        random.push(arr[randomIndex]);
        arr.splice(randomIndex, 1);
    }

    return random;
}

function timer (){
    
    if (counter < totalTime) {
    counter++;
    var timeDisplay = document.getElementById("timeDisplay");
        x = (Math.floor((totalTime - counter) / 60));
        y = ((totalTime - counter) % 60)  
    timeDisplay.textContent = (Math.floor((totalTime - counter) / 60)) + ":" + ('0' + ((totalTime - counter) % 60)).slice(-2) ;
    } else {
        hideQuestion();
        hideAllDone();
        clearInterval(interval);
    }
}

function setTimer (){
     interval = setInterval(timer, 1000);

}

function displayScore (){
    
    scoreSpan.textContent = currentScore;
}

function renderHighScore () {
 var highScoreDisplay = document.getElementById("high-scores");
for (var score in highScores) {
    var li = document.createElement("li")
    li.textContent = (highScores[score]["name"] + ": " + highScores[score]["score"] )
    
    highScoreDisplay.appendChild(li);
}
}


// *event listeners*

//startbutton
startBtn.addEventListener("click", function (){
hideChallenge();
hideQuestion();
renderQuestion();
setTimer();
});

playAgain.addEventListener("click", function() {
    location.reload();
})

enterBtn.addEventListener("click", function (){
    name = document.getElementById("name").value
    var obj = {
        "name": name,
        "score": currentScore
    }
    
    
    highScores.push(obj);  
    hideAllDone();
    hidehighScore();
    renderHighScore();
    localStorage.setItem('highscores', JSON.stringify(highScores));

})

document.addEventListener("click", function(event){
    
    if (event.target.className == "answerLi"){
        var question = document.getElementById("question-display")
        question.textContent = "";
        var choices = document.getElementById("multiple-choices");
        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }
        

        if (event.target.textContent == answer) {
            console.log("you got it right!")
           
            engagePositiveFeedback();
            renderQuestion();
        } else {
            console.log("you got it wrong!")
            counter = counter + 15;
            engageNegativeFeedback();
            renderQuestion();
        }

    }


    
});




//questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Which loop helps to iterate through arrays?",
        choices: ["for", "for in", "while", "if"],
        answer: "for"
    },
    {
        title: "Which language is most commonly used for version control?",
        choices: ["git", "javascript", "css", "html"],
        answer: "git"
    },
    {
        title: "Which is the data type of the following: 'false' ?",
        choices: ["string", "integer", "float", "boolean"],
        answer: "string"
    }
    
    ///etc.
];


