// Get all the elements from the page we need for the quiz
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

// Keep track of current question, score, and timer
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

// List of questions for the quiz
const quizArray = [
    {
        id: "0",
        question: "Which is the most widely spoken language in the world?",
        options: ["Spanish", "Mandarin", "English", "German"],
        correct: "Mandarin",
    },
    {
        id: "1",
        question: "Which is the only continent in the world without a desert?",
        options: ["North America", "Asia", "Africa", "Europe"],
        correct: "Europe",
    },
  {
        id: "0",
        question: "In which year the first man land on the moon?",
        options: ["1956", "1972", "1969", "1999"],
        correct: "1969",
    },
    // More questions...
];

// Restart button: start quiz again from the beginning
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

// Next button: go to the next question or show final score
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        questionCount += 1;
        if (questionCount == quizArray.length) {
            // No more questions, show score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            // Show next question
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

// Timer for each question
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

// Show the current question and hide others
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

// Create all the questions and options
function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5); // shuffle questions
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5); // shuffle options

        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
}

// Check if the selected answer is correct
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

// Reset everything to start a new quiz
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// When user clicks start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

// Show start screen when page loads
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};

