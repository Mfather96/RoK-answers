const questionInput = document.getElementById('questionInput');
const outputAnswer = document.getElementById('outputAnswer');
const ruLang = document.querySelector('.ru-lang');
const enLang = document.querySelector('.en-lang');
const special = document.querySelector('.special');

const inputlabel = document.getElementById('inputlabel');
const clearInput = document.getElementById('clear-input');
const welcomeTitle = document.querySelector('.welcome-title');
const welcomeSubtitle = document.querySelector('.welcome-subtitle');
let currentLang = 'ru';

init();
getAllQuestions();

questionInput.addEventListener('input', function() {
    if(questionInput.value.length == 0){
        let divs = outputAnswer.querySelectorAll('div');
        divs.forEach(div => div.remove())
    }
    outputAnswer.innerHTML = '';

    let value = questionInput.value.toLowerCase();
    let filtered = questions.filter((q) => {
        return q.question.toLowerCase().includes(value)
    });

    for(let ques of filtered){
        let div = document.createElement('div');

        div.innerHTML = getAnswer(ques.question, ques.answer, questionInput.value, value);
        outputAnswer.appendChild(div)
    }
})
clearInput.addEventListener('click', ()=> {
    questionInput.value = '';
    outputAnswer.innerHTML = '';
    getAllQuestions();
})

ruLang.addEventListener('click', function(){
    currentLang = 'ru';
    ruLang.classList.add('active');
    enLang.classList.remove('active');
    init()
})

enLang.addEventListener('click', function(){
    currentLang = 'en';
    enLang.classList.add('active');
    ruLang.classList.remove('active');
    init()
})

function getAnswer(ques, ans, val, lowValue){
    if(val){
        ques = ques.toLowerCase();
        if(val.toLowerCase() === lowValue){
            return `<div class="question-wrp">

                <div class="question">
                ${ques.replace(val, `<span class="entered-text">${val.replace(val[0], val[0].toUpperCase())}</span>`)}
                </div>

                <div class="answer">${ans}</div>

            </div>`
        }
    } else {
        return `<div class="question-wrp">

                <div class="question">
                ${ques}
                </div>

                <div class="answer">${ans}</div>

            </div>`
    }

}

function init(){
    inputlabel.textContent = `${lang[currentLang].label}`;
    questionInput.placeholder = `${lang[currentLang].placeholder}`;
    welcomeTitle.textContent = `${lang[currentLang].welcomeTitle}`;
    welcomeSubtitle.textContent = `${lang[currentLang].welcomeSubtitle}`;
    clearInput.textContent = `${lang[currentLang].clearInput}`;
    special.textContent = `${lang[currentLang].special} v${lang.version}`;

}

function getAllQuestions(){
    questions.forEach((ques) => {
        let div = document.createElement('div');
        div.innerHTML = getAnswer(ques.question, ques.answer);
        outputAnswer.appendChild(div)
    })
}
