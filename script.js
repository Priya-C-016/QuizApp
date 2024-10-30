import {SampleData} from "./response.js";
// console.log(SampleData);
const start=document.getElementById("startbtn");
const numQuestion=document.getElementById("numberofQuestions");
const difficulty=document.getElementById("difficulty");
const timerValue=document.querySelector(".quiz-timer-value");
const QuesNo=document.querySelector(".quiz-ques-number");
const questionText=document.querySelector(".quiz-ques-text");
const quizOption=document.querySelectorAll(".quiz-option");
const quesLeft=document.querySelector(".quiz-ques-left .ques-number");
const totalQuestion=document.querySelector(".quiz-ques-left .total");
const endquiz=document.querySelector(".endquiz");
const scorevalue=document.getElementById("scorevalue");
const performance=document.getElementById("performance");
let timer=10;
let currentQues=0;
let totalQues=5;
let questions=randomQues(totalQues);
let countDown;
let score=0;


function randomQues(nofoQues){
    let Ques=[];
    for(let i=0;i<nofoQues;i++){
        const randomIndex=Math.floor(Math.random()*SampleData.length);
        const selectQues=SampleData[randomIndex];
        Ques.push(selectQues);
    }
    return Ques;
}

function display(){
   const current=questions[currentQues];
   QuesNo.innerText=`${currentQues+1 }.`;
   questionText.innerText=current.question;
   quesLeft.innerText=currentQues+1;
   totalQuestion.innerText=totalQues; 

   quizOption.forEach((option,index)=>{
    option.classList.remove("correct","incorrect")
    option.querySelector(".quiz-option-text").innerText=current.options[index];
    option.onclick=()=>checkAnswer(current.answer,option.querySelector(".quiz-option-text").innerText);
   });
}

function checkAnswer(answer,selectedAns){
    clearInterval(countDown);

    quizOption.forEach(option=>{
        const optionText=option.querySelector(".quiz-option-text");
        if(optionText.innerText===answer){
            option.classList.add("correct");
            // if(optionText===selectedAns)score++;
        }
        else if(optionText.innerText===selectedAns){
            option.classList.add("incorrect");
        }
    });

    if(selectedAns===answer)score++;
    scorevalue.innerText=score;

    setTimeout(()=>{
        currentQues++;
        if(currentQues < questions.length){
            display();
            startTimer();
        }else{
            console.log("Quiz Completed");
            endQuiz();
        }
    },2000);
}

function startTimer(){
    clearInterval(countDown);
    let timeleft=timer;
    timerValue.innerText=timeleft;
    countDown=setInterval(()=>{
        timeleft--;
        timerValue.innerText=timeleft;
        if(timeleft<=0){
            clearInterval(countDown);
            currentQues++;
            if(currentQues<questions.length){
                display();
                startTimer();
            }else{
                console.log("done");
                endQuiz();
            }
        }
    },1000);
}

function endQuiz(){
    scorevalue.innerText= `${score} / ${totalQues}`;
    if(score===totalQues){performance.innerText="Well Done!";}
    else if(score < totalQues/2){performance.innerText="You got this!";}
    else {performance.innerText="Try Again!";}
    endquiz.style.display="block";
    document.getElementById("quizApp").style.display="none";
}


start.addEventListener("click",function(){
    
    totalQues=parseInt(numQuestion.value);
    questions=randomQues(totalQues);
    const selectlevel=difficulty.value;
    if(selectlevel==="easy"){
        timer=10;
    }
    else if(selectlevel==="medium"){
        timer=5;
    }
    else if(selectlevel==="hard"){
        timer=3;
    }
    totalQuestion.innerText=totalQues;
    score=0;
    scorevalue.innerText="0";
    endquiz.style.display="none";
    document.querySelector(".startQuiz").style.display="none";
    document.getElementById("quizApp").style.display="block";
    display();
    startTimer();
});


