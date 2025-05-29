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

let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

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
        id: "2",
        question: "In which year the first man land on the moon?",
        options: ["1956", "1972", "1969", "1999"],
        correct: "1969",
    },
];

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", () => {
    questionCount++;
    if (questionCount === quizArray.length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = `Your score is ${scoreCount} out of ${questionCount}`;
    } else {
        countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Questions`;
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
});

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count === 0) {
            clearInterval(countdown);
            nextBtn.click();  // Auto move to next question on timeout
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach(card => card.classList.add("hide"));
    quizCards[questionCount].classList.remove("hide");
    countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Questions`;
};

function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5); // shuffle questions
    quizContainer.innerHTML = ""; // Clear previous questions

    for (let q of quizArray) {
        q.options.sort(() => Math.random() - 0.5); // shuffle options

        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = q.question;
        div.appendChild(question_DIV);

        q.options.forEach(option => {
            let button = document.createElement("button");
            button.classList.add("option-div");
            button.innerText = option;
            button.onclick = () => checker(button);
            div.appendChild(button);
        });

        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach(el => {
            if (el.innerText === quizArray[questionCount].correct) {
                el.classList.add("correct");
            }
        });
    }
    clearInterval(countdown);
    options.forEach(el => el.disabled = true);
}

function initial() {
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    quizCreator();
    quizDisplay(questionCount);
    timerDisplay();
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
