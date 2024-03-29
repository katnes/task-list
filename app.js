//define variables from ui
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//call event listeners 
loadEventListeners();

//load all event listeners
function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit',  addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //cleat tasks from the table
    clearBtn.addEventListener('click', clearTasks);
    //filter for results
    filter.addEventListener('keyup', filterTasks);
}

//get tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create li element
        const li = document.createElement('li');
        //add a class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element 
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li)
    });
}


//add a task
function addTask(e) {
if(taskInput.value === ''){
    alert("Add a Task")
}
//create li element
const li = document.createElement('li');
//add a class
li.className = 'collection-item';
//create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
//create new link element 
const link = document.createElement('a');
//add class
link.className = 'delete-item secondary-content';
// add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
//append link to li
li.appendChild(link);
//append li to ul
taskList.appendChild(li);
//store tasks in local storage
storeTaskInLocalStorage(taskInput.value);
//clear input
taskInput.value = '';
//prevent submission on enter, which is default behavior
e.preventDefault();
}

//store tasks
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('You sure?')) {
        e.target.parentElement.parentElement.remove();

         // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
    tasks = [];
    } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
        tasks.splice(index, 1);
    }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all tasks 
function clearTasks() {
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
  // Clear from LS
clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
    } else {
        task.style.display = 'none';
    }
    });
}

