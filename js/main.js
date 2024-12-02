
//variables

const question_head = document.getElementById(`question-head`);
const ans_opt = document.querySelectorAll(`.ans-opt`);


//questions 

let questions = [];

//get questions

fetch('.questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        questions.sort(() => Math.random() - .5);
        startQuiz();
    })
    .catch(error => question_head.textContent = `can't load questions reload page or contact the developer`);


let currentQuestionIndex =  -1;
let selectedAnswers = "";
let answeredQuestions = [];


const startQuiz = () => {
    if (currentQuestionIndex >= 0) {
        loadQuestion(currentQuestionIndex);
    } else {
        console.log(`Pick any question from 1 - 100`);
        question_head.textContent = `Pick any question from 1 - 100`;
    }
}; 

//loadQuestions

const loadQuestion = (index) => {
    deselectedAnswer();
    currentQuestionIndex = index;
    let questionData = questions[index];
    let questionHead = `Question ${index + 1} : ${ questionData.question}`;
    question_head.textContent = questionHead;
   
   //answers
   ans_opt.forEach(btn => {
    let optionA = questionData.answers[btn.id];
    btn.textContent = optionA;
    btn.classList.remove('incorrct', 'correct');
    btn.disabled = false;
    btn.style.background = "";
    btn.style.transform = "";
   });
}

//deselectedAnswer

const deselectedAnswer = () => {
    selectedAnswers = ""
    ans_opt.forEach(btn => {
        btn.classList.remove('selected');
        btn.style.background = "";   
        btn.style.transform = "";   
    })
};

//selectAnswer

const selectAnswer = (answer, i) => {
    if (currentQuestionIndex < 0) {
        alert('pick a question');
        return;
    }

    deselectedAnswer();
    selectedAnswers = answer;
    
    const selectedBtn = document.getElementById(answer);

    //correct answers
    const correctAnswer = questions[currentQuestionIndex].correct;
    const currectBtn = document.getElementById(correctAnswer);

        if (selectedAnswers === correctAnswer) {
            selectedBtn.classList.add('correct');
        } else {
            selectedBtn.classList.add('incorrct');
            currectBtn.classList.add('correct');
        }
    
    //question-option

    const currectQuestionOption = document.querySelectorAll(`.question-option button`)[currentQuestionIndex];

    if (!answeredQuestions.includes(currentQuestionIndex)) {
        if (selectedAnswers === correctAnswer) {
            answeredQuestions.push(currentQuestionIndex);
            currectQuestionOption.classList.add('disable');
            currectQuestionOption.disabled = true;
            ans_opt.forEach(btn => btn.disabled = true);
        } else {
            currectQuestionOption.classList.add('disable');
            currectQuestionOption.disabled = true;
            ans_opt.forEach(btn => btn.disabled = true);
        }
    }
    
    
};