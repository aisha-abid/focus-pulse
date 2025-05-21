const checkBoxList=document.querySelectorAll('.custom-checkbox');
const goalInput=document.querySelectorAll('.goal-input');
const progressBar=document.querySelector('.progress-bar');
     

const allGoals=JSON.parse(localStorage.getItem('allGoals')) || {
    // first:{
    //     name:'',
    //     completed:false
    // },
    // second:{
    //     name:'',
    //     completed:false
    // },
    // third: {
    //     name:'',
    //     completed:false
    // }
}

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