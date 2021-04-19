const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

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
        element.classList.add("correct")
        
    }
    else{
        //set the red color to the incorrect option
        element.classList.add("wrong")
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }

    unclikableOptions();
}
//make all the options unclikable once the user select a option (RESTRICT THE USER)
function unclikableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}
function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");

    }
    else{
        getNewQuestion(); 
    }
}


window.onload = function(){
    setAvailableQuestions();
    getNewQuestion();

}