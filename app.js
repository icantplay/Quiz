const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const questionImage = document.querySelector(".question-image");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const videoBox = document.querySelector("#video");
const categoria = document.querySelector(".categoria").innerText;

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push the questions into available Questions array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for( let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

function getNewQuestion(){
    questionNumber.innerHTML = "Pergunta " + (questionCounter + 1) + " de " + quiz.length;
    
    //set question text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random()*availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    if (currentQuestion.questionImage != undefined) {
        questionImage.innerHTML = '<img src="' + currentQuestion.questionImage + '" width=\"400px\" height=\"150px\">'
    } else {
        questionImage.innerHTML = ''
    }
    // get the position of 'questionIndex' from availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);

    //set options
    // get the length of options
    const optionLen = currentQuestion.options.length
    //push options into the array easy 
    for( let i=0; i<optionLen;i++){
        availableOptions.push(i)

    }
    optionContainer.innerHTML= '';
   let animationDelay = 0.2;
    // create the options in html
    for (let i=0; i<optionLen; i++){
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random()*availableOptions.length)]
        // get the position of 'optionIndex' from the availableOptions
        const index2 = availableOptions.indexOf(optionIndex);
        //remove the 'optionIndex' from the availableOptions, so that the option does not repeat
        availableOptions.splice(index2,1)
        if (currentQuestion.optionImages != undefined) {
            const optionImage = document.createElement("div");
            optionImage.innerHTML = '<img src="' + currentQuestion.optionImages[currentQuestion.options[optionIndex]] + '" width=\"400px\" height=\"150px\">';
            optionImage.className = "optionImage";
            optionContainer.appendChild(optionImage)
        } 
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");

    }
    questionCounter++;
   
}
//get result of the current attempt question
function getResult(element){
    const id = parseInt(element.id);
    //get the answer by comparing the id of clicked option
    if(id == currentQuestion.answer) {
        //set the green color to the correct option
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        //set the red color to the incorrect option
        element.classList.add("wrong")
        updateAnswerIndicator("wrong");
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclikableOptions();
}
//make all the options unclikable once the user select a option (RESTRICT THE USER)
function unclikableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML= '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)


}

function next(){
    if(questionCounter === quiz.length){
        
        quizOver();
    }
    else{
        getNewQuestion(); 
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + quiz.length;

}
function premio(){
    
    wrongAnswers =attempt - correctAnswers;
    if (correctAnswers > wrongAnswers && categoria == "ASTRONOMIA") {
        resultBox.innerHTML = '<h2 class="Premio"> Parabéns ganhaste uma viagem ao Centro Espacial Kennedy na Florida </h2><button class="voltar" onclick="homePage()">VOLTAR AO INÍCIO</button><iframe class="video" width="850" height="650" src="https://www.youtube.com/embed/rYY0p0199fw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        $(".result-box").css({"margin-left":"280px", "margin-right":"0px"});
    }
    else if(correctAnswers > attempt-correctAnswers && categoria == "AVIÕES"){
        resultBox.innerHTML = '<h2 class="Premio"> Parabéns ganhaste uma viagem ao Aviation museum washington</h2><button class="voltar" onclick="homePage()">VOLTAR AO INÍCIO</button><iframe class="video" width="850" height="650" src="https://www.youtube.com/embed/zblzaW2aeMU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        $(".result-box").css({"margin-left":"280px", "margin-right":"0px"});
    }
    else if(correctAnswers > wrongAnswers && categoria == "COMBOIOS"){
        resultBox.innerHTML = '<h2 class="Premio"> Parabéns ganhaste uma Viagem ao Museu de transportes de Londres </h2><button class="voltar" onclick="homePage()">VOLTAR AO INÍCIO</button><iframe class="video" width="850" height="650" src="https://www.youtube.com/embed/Ip-WfVdn1yk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        $(".result-box").css({"margin-left":"280px", "margin-right":"0px"});
    }else if (correctAnswers > wrongAnswers && categoria == "DINOSSAURO") {
        resultBox.innerHTML = '<h2 class="Premio"> Parabéns ganhaste uma viagem ao  Museu de História Natural de Nova Iorque </h2><button class="voltar" onclick="homePage()">VOLTAR AO INÍCIO</button><iframe class="video" width="850" height="650" src="https://www.youtube.com/embed/y6Dyhi-MVag" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        $(".result-box").css({"margin-left":"280px", "margin-right":"0px"});
    } else {
        resultBox.innerHTML = '<div class="try"> NÃO TENS PRÉMIO DIOGO </div> <button class="manel" onclick="homePage()"> TENTAR OUTRA VEZ </button> <img src="https://i.pinimg.com/originals/af/80/04/af8004c810a9064ca32e3659329c4be8.gif" width="700 height="700">'
        console.log("Falácia da má programação");
    }
    
} 


function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
  }

function homePage(){
    window.location.href = "index.html";
}



window.onload = function(){
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();

}