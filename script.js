const checkBoxList=document.querySelectorAll('.custom-checkbox');
const goalInput=document.querySelectorAll('.goal-input');
const progressBar=document.querySelector('.progress-bar');
     


checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{
        console.log("clicked");
        const allFilled=[...goalInput].every((input)=>{
            return input.value;
        })
        if(allFilled){
            checkbox.parentElement.classList.toggle('completed');

        }
        else{
        progressBar.classList.add('show-error');
        }
    });
});


goalInput.forEach((input)=>{
    input.addEventListener('focus',()=>{
        progressBar.classList .remove('show-error');
    })
})