// ======================================
// Quiz Rendering Engine
// ======================================

let currentQuestionIndex = 0;
let currentTopic = "arrays";

function renderQuiz(topic) {

    currentTopic = topic;

    const container = document.getElementById("quiz-container");

    if (!container) return;

    const questions = quizData[topic];

    const question = questions[currentQuestionIndex];

    let html = `<h3>${question.question}</h3>`;

    question.options.forEach((option, index) => {

        html += `
        <div class="quiz-option" data-index="${index}">
            ${option}
        </div>
        `;

    });

    container.innerHTML = html;

}

document.getElementById("next-question-btn")?.addEventListener("click", () => {

    const questions = quizData[currentTopic];

    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {

        currentQuestionIndex = 0;

    }

    renderQuiz(currentTopic);

});

document.addEventListener("DOMContentLoaded", () => {

    renderQuiz("arrays");

});