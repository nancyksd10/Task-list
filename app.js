const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

loadAllEventListeners();
function loadAllEventListeners(e)
{
    //dom event
    document.addEventListener('DOMContentLoader',getTasks);
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeItem);
    clearBtn.addEventListener('click',clear);
    filter.addEventListener('keyup',filterTasks);
}
//get task from ls
function getTasks()
{
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task)
    {
        
    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(task));
    const link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    });
}
function addTask(e)
{
    if(taskInput.value==='')
    alert('Add a task');

    const li=document.createElement('li');
li.className='collection-item';
li.appendChild(document.createTextNode(taskInput.value));
const link=document.createElement('a');
link.className='delete-item secondary-content';
link.innerHTML='<i class="fa fa-remove"></i>';
li.appendChild(link);
taskList.appendChild(li);


//clear the input
taskInput.value='';
//store in the local storage
storeTaskInLocalStorage(taskInput.value);
    e.preventDefault();
}
function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function removeItem(e)
{
    if(e.target.parentElement.classList.contains('delete-item'))
    if(confirm('Are you Sure?'))
    e.target.parentElement.parentElement.remove();
    e.preventDefault();
    console.log(e.target);
    //remove from ls
    removeTaskFromLocalStorage( e.target.parentElement.parentElement);
}
//remove from ls
function removeTaskFromLocalStorage()
{
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task)
    {
if(taskItem.textContent===task)
{
    tasks.splice(index,1);
}
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function clear(e)
{
    //taskList.innerHTML='';
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }
    //clear from ls
    cleasrTasksFromLocalStorage();
}
function cleasrTasksFromLocalStorage()
{
    localStorage.clear();
}
function filterTasks(e)
{
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1)
        {
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }
    });
}
