// ======================================
// Quiz Rendering Engine
// ======================================

let currentQuestionIndex = 0;
let currentTopic = "arrays";
let score = 0;


// ======================================
// RENDER QUIZ
// ======================================

function renderQuiz(topic){

currentTopic = topic;

const container = document.getElementById("quiz-container");

if(!container) return;

const questions = quizData[topic];

const question = questions[currentQuestionIndex];

let html = `<h3>${question.question}</h3>`;

question.options.forEach((option,index)=>{

html += `
<div class="quiz-option" data-index="${index}">
${option}
</div>
`;

});

container.innerHTML = html;


// attach click events
document.querySelectorAll(".quiz-option").forEach(option=>{

option.addEventListener("click",handleAnswer);

});

}


// ======================================
// HANDLE ANSWER
// ======================================

function handleAnswer(event){

const selectedIndex = parseInt(event.target.getAttribute("data-index"));

const question = quizData[currentTopic][currentQuestionIndex];

const feedback = document.getElementById("quiz-feedback");

if(selectedIndex === question.answer){

score++;

feedback.textContent = "✔ Correct!";
feedback.className = "correct";

}else{

feedback.textContent = "✖ Wrong answer";
feedback.className = "wrong";

}

updateScore();

}


// ======================================
// UPDATE SCORE
// ======================================

function updateScore(){

const scoreDisplay = document.getElementById("quiz-score");

scoreDisplay.textContent = "Score: " + score;

}


// ======================================
// NEXT QUESTION
// ======================================

document.getElementById("next-question-btn")?.addEventListener("click",()=>{

const questions = quizData[currentTopic];

currentQuestionIndex++;

if(currentQuestionIndex >= questions.length){

currentQuestionIndex = 0;

}

document.getElementById("quiz-feedback").textContent = "";

renderQuiz(currentTopic);

});


// ======================================
// INITIAL LOAD
// ======================================

document.addEventListener("DOMContentLoaded",()=>{

renderQuiz("arrays");

});