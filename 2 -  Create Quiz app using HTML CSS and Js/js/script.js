const questions = [
    {
        question: "قرآن مجید کی کل آیات کی تعداد کتنی ہے؟",
        answers:[
            {text: "8888", correct: false},
            {text: "7777", correct: false},
            {text: "6666", correct: true},
            {text: "5555",  correct: false},
        ]
    },
    {
        question: "قرآن مجید کی دلہن کس سورۃ کو کہتے ہیں؟",
        answers:[
            {text: "سورۃ الرحمن۔.", correct: true},
            {text: "سورۃ توبہ", correct: false},
            {text: "سورۃ یسین۔", correct: false},
            {text: "سورۃ النمل۔",  correct: false},
        ]
    },
    {
        question: "قرآن مجید کی کون سی سورۃ میں دو مرتبہ بسم اللہ آئی ہے؟",
        answers:[
            {text: "سورۃ النمل۔", correct: true},
            {text: "سورۃ الرحمن۔", correct: false},
            {text: "سورۃ یسین۔", correct: false},
            {text: "سورۃ البقرہ۔",  correct: false},
        ]
    },
    {
        question: "قرآن مجید کی کل کتنی منزلیں ہیں؟",
        answers: [
            {text: "5", correct: false},
            {text: "4", correct: false},
            {text: "6",  correct: false},
            {text: "7", correct: true},
        ]
    },
    {
        question: "حضرت محمدﷺ کا پسندیدہ شہر کونسا تھا؟",
        answers: [
            {text: "عراق", correct: false},
            {text: "طائف", correct: false},
            {text: "مکہ", correct: true},
            {text: "مدینہ",  correct: false},
        ]
    },
    {
        question: "انسان کے مقابلے میں جنات کی تعداد کتنی گنا ہے ؟",
        answers: [
            {text: "آٹھ گنا", correct: false},
            {text: "نو گنا", correct: true},
            {text: "سات گنا", correct: false},
            {text: "ان میں سے کوئی نہیں",  correct: false},
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0; // Reset current question index
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "You scored " + score + "/" + questions.length;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
