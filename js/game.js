const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull =document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is Computer Software?", 
        choice1: "Software is a set of instruction given to the computer",
        choice2: "Software is a set of instrcution given to the computer to make it function",
        choice3: "It is an electronic device",
        choice4: "It is a PC ",
        answer: 2
    }, 
    {
        question: "UNIX is used where?", 
        choice1: "Disk ",
        choice2: "Joystick",
        choice3: "Mainframe Computer",
        choice4: "CD",
        answer: 3
    }, 
    {
        question: "What is ICT?", 
        choice1: "Information Technology",
        choice2: "Information Communication",
        choice3: "Info Communicate",
        choice4: "Information Communication and Technology",
        answer: 4
    }, 
    {
        question: "What is UPS?", 
        choice1: "UPS",
        choice2: "Uninterrupted Power Supply",
        choice3: "Info Communicate",
        choice4: "Power Supply",
        answer: 2
    }, 
    {
        question: "What is the Meaning of CPU", 
        choice1: "Central Processing Unit",
        choice2: "Processing Unit",
        choice3: "Unit",
        choice4: "Monitoring Unit",
        answer: 1
    }, 
    {
        question: "Wires used for connecting various components of computer together is called ", 
        choice1: "Central Processing Unit",
        choice2: "Processing Unit",
        choice3: "Unit",
        choice4: "Computer Cables",
        answer: 4
    }, 
    {
        question: "A computer network cable is called ", 
        choice1: "Interanet",
        choice2: "Router",
        choice3: "Ethernet",
        choice4: "DSTV",
        answer: 3
    }, 
    {
        question: "What manages, manintains and controls computer?", 
        choice1: "UI",
        choice2: "Utility Software",
        choice3: "CPU",
        choice4: "Monitoring Unit",
        answer: 2
    }, 
    {
        question: "Windows 2000 or Window NT is used where?", 
        choice1: "Central Processing Unit",
        choice2: "System",
        choice3: "Minicomputer",
        choice4: "Microcomputer",
        answer: 4
    }, 
    {
        question: "What is the full meaning DOS", 
        choice1: "Disk Operating System",
        choice2: "Done Open the System",
        choice3: "Do open the system",
        choice4: "Desktop Operating System ",
        answer: 1
    }, 
];

//CONSTANTS
const CORRECT_BONUS = 2;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >=MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //go to the end page 
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
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

        //const classToApply = 'incorrect';
        //if (selectedAnswer == currentQuestion.answer) {
           // classToApply = 'correct';
        //}

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'; 

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
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

