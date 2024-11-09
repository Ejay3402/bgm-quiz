//variables

const question_head = document.getElementById(`question-head`);
const ans_opt = document.querySelectorAll(`.ans-opt`);


//questions 

let questions = [];

//get questions

fetch('./questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion(currentQuestionIndex);
        //startQuiz();
    })
    .catch(error => console.log(`can't load questions reload page or contact the developer`, error));


let currentQuestionIndex = -1;
let stuffQuestions = questions.sort(() => Math.random() - .5);
let selectedAnswers = "";
let answeredQuestions = [];

/* const startQuiz = () => {
    if (questions.length >= 0) {
        loadQuestion(currentQuestionIndex);
    } else {
        console.log(`can't load up questions`);
    }
}; */ 

//loadQuestions

const loadQuestion = (index) => {
    deselectedAnswer();
    currentQuestionIndex = index;
    
    console.log(questionData);
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
    if (currentQuestionIndex.length < 0) {
        alert('pick a question');
        return;
    }

    deselectedAnswer();
    selectedAnswers = answer;
    console.log(answer);

    
    
};