const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What Nakshatra does the Sun occupy?",
    choice1: "Ketu",
    choice2: "Venus",
    choice3: "Sun",
    choice4: "Moon",
    answer: 3
    },
    { 
    question: "What Nakshatra does the Moon occupy?",
    choice1: "Ketu",
    choice2: "Venus",
    choice3: "Sun",
    choice4: "Moon",
    answer: 3
    },
    {  
    question: "What Nakshatra does Mars occupy?",   
    choice1: "Ketu",
    choice2: "Venus",
    choice3: "Sun",
    choice4: "Moon",
    answer: 4
    },
];

//constants 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        locakStorage.setItem("mostRecentScore", score);
       

        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    
    availableQuestions.splice(questionIndex, 1);
    
    acceptingAnswers = true;
    };

    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            if (!acceptingAnswers) return;
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];
            const classToApply = 
                selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }

                selectedChoice.parentElement.classList.add(classToApply);
                setTimeout(() => {
                    selectedChoice.parentElement.classList.remove(classToApply);
                    getNewQuestion();
                }, 1000);
             });
        });
    incrementScore = num => {
        score += num;
        scoreText.innerText = score;
    };
startGame();