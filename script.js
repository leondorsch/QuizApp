let questions = [
    {
        "question": "Wer hat HTML erfunden ?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet HTML?",
        "answer_1": "Hyper Text Markup Language",
        "answer_2": "High Transfer Markup Language",
        "answer_3": "Home Tool Markup Language",
        "answer_4": "Hyperlink Transfer Markup Language",
        "right_answer": 1
    },
    {
        "question": "Welches HTML-Element wird verwendet, um eine Überschrift der höchsten Ebene zu definieren?",
        "answer_1": "h6",
        "answer_2": "h1",
        "answer_3": "header",
        "answer_4": "head",
        "right_answer": 2
    },
    {

        "question": "Welches Attribut wird verwendet, um einem HTML-Element eine eindeutige ID zuzuweisen?",
        "answer_1": "class",
        "answer_2": "id",
        "answer_3": "name",
        "answer_4": "type",
        "right_answer": 2
    },
    {
        "question": "Welches HTML-Element wird verwendet, um einen Link zu erstellen?",
        "answer_1": "a",
        "answer_2": "link",
        "answer_3": "href",
        "answer_4": "ul",
        "right_answer": 1
    },
    {
        "question": "Welches Attribut wird verwendet, um das Ziel eines Links zu bestimmen?",
        "answer_1": "href",
        "answer_2": "src",
        "answer_3": "target",
        "answer_4": "link",
        "right_answer": 1
    },
    {
        "question": "Welches Attribut wird verwendet, um ein Bild in HTML anzuzeigen?",
        "answer_1": "src",
        "answer_2": "alt",
        "answer_3": "href",
        "answer_4": "image",
        "right_answer": 1
    },

];

let currentQuestion = 0;
let rightAnswers = 0;
let audio_success = new Audio('sounds/right.mp3');
let audio_fail = new Audio('sounds/wrong.mp3');
let audio_finished = new Audio('sounds/finished.mp3');
let audio_restart = new Audio('sounds/restart.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length; //anzahl aller Fragen
    document.getElementById('all-questions-final').innerHTML = questions.length; //anzahl aller Fragen
    showQuestion(); // Funktion zum anzeigen der Fragen wird ausgeführt
}

function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
        audio_finished.play();
    } else {
        updateProgressBar();
        showNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function answer(selection) { // parameter der Funktion wird übergeben
    let question = questions[currentQuestion]; // question = questions,0
    let selectedQuestionNumber = selection.slice(-1);// = 1
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber)) { // question right answer = 1
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audio_success.play();
        rightAnswers++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger')
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success')
        audio_fail.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber){
     return selectedQuestionNumber == question['right_answer']
}

function nextQuestion() {
    currentQuestion++;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    audio_restart.play();
    document.getElementById('header-image').src = './img/pencil.jpg';
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
};

function showEndscreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('right-answers-counter').innerHTML = rightAnswers;
    document.getElementById('header-image').src = 'img/trophy.png'
};

function showNextQuestion() {
    let question = questions[currentQuestion]; // question = questions,0
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    document.getElementById('next-button').disabled = true;
};

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}