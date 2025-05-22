const checkBoxList=document.querySelectorAll('.custom-checkbox');
const goalInput=document.querySelectorAll('.goal-input');
const progressBar=document.querySelector('.progress-bar');
const progressValue=document.querySelector('.progress-value');
const progressLabel=document.querySelector('.progress-label');
const resetBtn = document.querySelector(".reset-goals");

const allQuotes=[
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill '
]
     

const allGoals=JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoalsCount=Object.values(allGoals).filter((goal)=> goal.completed).length;
progressValue.style.width=`${completedGoalsCount / goalInput.length*100}%`;
progressValue.firstElementChild.innerText=`${completedGoalsCount}/${goalInput.length} completed`;
progressLabel.innerText=allQuotes[completedGoalsCount];




checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{
        console.log("clicked");
        const allFilled=[...goalInput].every((input)=>{
            return input.value;
        })
        if(allFilled){
            checkbox.parentElement.classList.toggle('completed');
            const inputId=checkbox.nextElementSibling.id;
            allGoals[inputId].completed=!allGoals[inputId].completed;
            completedGoalsCount=Object.values(allGoals).filter((goal)=> goal.completed).length;
            progressValue.style.width=`${(completedGoalsCount / goalInput.length)*100}%`;
            progressValue.firstElementChild.innerText=`${completedGoalsCount}/${goalInput.length} completed`;
            progressLabel.innerText=allQuotes[completedGoalsCount];
            localStorage.setItem('allGoals', JSON.stringify(allGoals));

        }
        else{
        progressBar.classList.add('show-error');
        }
    });
});


goalInput.forEach((input)=>{

    if(allGoals[input.id]){
   input.value=allGoals[input.id].name;
      if(allGoals[input.id].completed){
 input.parentElement.classList.add('completed');
    }
    }

    input.addEventListener('focus',()=>{
        progressBar.classList .remove('show-error');
    })
    input.addEventListener('input',(e)=>{
        if(allGoals[input.id]&& allGoals[input.id].completed){
            input.value=allGoals[input.id].name;
            return
        }
        if(allGoals[input.id]){
            allGoals[input.id].name=input.value;
        }
        else{
            allGoals[input.id]={
                name:input.value,
                completed:false,
            }
        }
            localStorage.setItem('allGoals', JSON.stringify(allGoals));

    })

})
 resetBtn.addEventListener("click", () => {
  localStorage.removeItem("allGoals");
  location.reload();
});