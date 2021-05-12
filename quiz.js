const questionsDiv = document.getElementById('questions');
const scoreDiv = document.getElementById('score');

class Quiz
{
    constructor(questions){
        this.questions = questions;
        this.score = [];
    }

    getScore(){
        scoreDiv.innerText = 'Total score: '+this.score.length;
    }

    allAnswersCorrect(){
        const total = document.getElementById('total');
        const h3 = document.createElement('h3');
        total.appendChild(h3);
        h3.setAttribute('id', 'congrats');
        const congrats = document.getElementById('congrats');

        if (this.score.length === this.questions.length){
            congrats.style.color = 'green';
            congrats.innerText = "✔ You have passed the quiz! Well done!";
        } else {
            congrats.innerText = "";
        }

    }

    displayAll() {
        this.questions.forEach(question => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            const form = document.createElement('form');
            const field = document.createElement("input");
            const submit = document.createElement("input");


            const questionLi = questionsDiv.appendChild(li);
            questionLi.innerText = question.getQuestion();


            field.setAttribute('type', 'text');
            field.setAttribute('placeholder', 'Your answer');

            const questionForm = questionLi.appendChild(form);
            questionForm.appendChild(field);
            form.setAttribute('id', 'answer-'+question.getId());
            field.setAttribute('id', 'input-'+question.getId());
            const formIdElement = document.getElementById('answer-'+question.getId());

            const error = questionLi.appendChild(p);
            error.setAttribute('id', 'error-'+question.getId());
            
            formIdElement.appendChild(submit);
            submit.setAttribute('type', 'submit');
            submit.setAttribute('value', 'Check');

   
            formIdElement.addEventListener("submit", (e)=>{
                e.preventDefault();
                const userAnswerValue = document.getElementById('input-'+question.getId()).value.trim();

                if (this.checkAnswer(userAnswerValue, question.getAnswer()) && !this.score.includes(question.getId())) {
                    submit.disabled = true;
                    field.disabled = true;
                    this.score.push(question.getId());
                    this.getScore();
                    this.allAnswersCorrect()

                    error.style.color = 'green';
                    error.innerText = "✔ Correct!";
                } else if (!this.checkAnswer(userAnswerValue, question.getAnswer()) && this.score.includes(question.getId())){
                    var index = this.score.indexOf(question.getId());
                    if (index > -1) {
                        this.score.splice(index, 1);
                        this.getScore();
                        this.allAnswersCorrect()

                        error.style.color = 'red';
                        error.innerText = "✘ Incorrect answer please try again.";
                    }
                } else if (this.checkAnswer(userAnswerValue, question.getAnswer()) && this.score.includes(question.getId())){
                    submit.disabled = true;
                    field.disabled = true;
                    error.style.color = 'green';
                    error.innerText = "✔ Correct!";
                } else {
                    this.getScore();
                    this.allAnswersCorrect()
                    error.style.color = 'red';
                    error.innerText = "✘ Incorrect answer please try again.";
                }
            }, false); 
            
        });
    }

    checkAnswer(userAnswer, correctAnswer){
        
        if (userAnswer == correctAnswer){
            return true;
        }

        return false;
    }
}


class Question {
    constructor(id, question, answer){
        this.id = id;
        this.question = question;
        this.answer = answer;
    }

    getId(){
        return this.id;
    }

    getQuestion(){
        return this.question;
    }

    getAnswer(){
        return this.answer;
    }
}

let question1 = new Question(1, "What is the capital of England?", "London");
let question2 = new Question(2, "What is the capital of Spain?", "Madrid");
let question3 = new Question(3, "What is the capital of France?", "Paris");
let question4 = new Question(4, "What is the capital of Germany?", "Berlin");
let question5 = new Question(5, "What is the capital of Denmark?", "Copenhagen");

let quiz = new Quiz([question1, question2, question3, question4, question5]);

quiz.displayAll();
quiz.getScore();