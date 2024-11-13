
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
        questions.sort(() => Math.random() - .5);
        console.log(questions);
        startQuiz();
    })
    .catch(error => console.log(`can't load questions reload page or contact the developer`, error));


let currentQuestionIndex =  -1;
let selectedAnswers = "";
let answeredQuestions = [];


const startQuiz = () => {
    if (currentQuestionIndex >= 0) {
        loadQuestion(currentQuestionIndex);
    } else {
        console.log(`can't load up questions`);
        question_head.textContent = `Pick any question from 1 - 70`;
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
    if (currentQuestionIndex< 0) {
        alert('pick a question');
        return;
    }

    deselectedAnswer();
    selectedAnswers = answer;
    
    const selectedBtn = document.getElementById(answer);
    const correctAnswer = questions[currentQuestionIndex].correct;

        if (selectedAnswers === correctAnswer) {
            //selectedBtn.style.background =  `green`;
            selectedBtn.classList.add('correct')
            } else {
            ans_opt.disabled = true;
        }

    
    
};


/*



// Function to load a question by index
const loadQuestion = (index) => {
  deselectedAnswer();
  currentQuestionIndex = index;
  let questionData = questions[index];

  question_head.textContent = `Question ${index + 1}: ${questionData.question}`;
  ans_opt.forEach((btn) => {
    btn.textContent = questionData.answers[btn.id];
    btn.classList.remove("correct", "incorrect");
    btn.disabled = false;
    btn.style.background = ""; // Reset background
    btn.style.transform = ""; // Reset transform
  });
  quizApp.style.display = "block";
};

// Function to deselect answers and reset styles
const deselectedAnswer = () => {
  selectedAnswer = "";
  ans_opt.forEach((btn) => {
    btn.classList.remove("selected");
    btn.style.background = ""; // Reset background
    btn.style.transform = ""; // Reset transform
  });
};

// Function to handle answer selection
const selectAnswer = (answer, i) => {
  if (currentQuestionIndex < 0) {
    alert("Pick a question from 1 - 70");
    return;
  }

  deselectedAnswer();
  selectedAnswer = answer;
  const selectedBtn = document.getElementById(answer);
  const correctAnswer = questions[currentQuestionIndex].correct;

  // Check if the selected answer is correct
  if (selectedAnswer === correctAnswer) {
    selectedBtn.classList.add("correct");
    selectedBtn.style.background = "green";
    selectedBtn.style.transform = "scale(1.2)";
  } else {
    selectedBtn.classList.add("incorrect");
    selectedBtn.style.background = "red";

    // Highlight the correct answer
    const correctBtn = document.getElementById(correctAnswer);
    correctBtn.style.background = "green";
    correctBtn.style.transform = "scale(1.2)";
  }

  // Track answered questions
  if (!answeredQuestions.includes(currentQuestionIndex)) {
    answeredQuestions.push(currentQuestionIndex);
    ans_opt.forEach((btn) => (btn.disabled = true));

    // Handle UI updates for answered questions
    const currentBtn = document.querySelectorAll(".optionsSelect button")[currentQuestionIndex];
    currentBtn.disabled = true;
    currentBtn.style.background = "#f31";
    currentBtn.style.opacity = "0.5";
    currentBtn.style.cursor = "no-drop";
  }

  if (answeredQuestions.length === questions.length) {
    alert("You have already answered all the questions");
  }
};

*/
