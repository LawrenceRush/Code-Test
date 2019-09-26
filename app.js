//global vars
var startBtn = document.getElementById("start-quiz-btn");
var index = 0;


//set up
hideQuestion();
hideAllDone();
hidehighScore();
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

function renderQuestion(){
   index = Math.floor(Math.random() * questions.length)
   
   var question = document.getElementById("question-display"),
   choices = document.getElementById("multiple-choices");
   question.textContent = questions[index]["title"];
   randomArr = generateRandomArr();
   for (var i = 0; i < 4; i ++){
        var li = document.createElement("li");
        li.textContent = questions[index]["choices"][randomArr[i]];
        li.className = "answerLi"
        choices.appendChild(li);
   }

   questions.splice(index,1)
   
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

// function checkAnwser(event){
    
// }



// event listeners
startBtn.addEventListener("click", function (){
hideChallenge();
hideQuestion();
renderQuestion();
});

document.addEventListener("click", function(event){
    
    if (event.target.className == "answerLi"){
       
        

        if (event.target.textContent == questions[index]["answer"]) {
            console.log("you got it right!")
            var question = document.getElementById("question-display") 
            question.textContent= "";
            var  choices = document.getElementById("multiple-choices");
            while (choices.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            renderQuestion();
        } else {
            console.log("you got it wrong!")

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
        title: "Which loop helps to iterate through arrays.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Which language is most commonly used for version control.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Which is the data type of the following: 'false' ?",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    
    ///etc.
];


