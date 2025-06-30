const btn = document.querySelector('.btn');
const form = document.querySelector('.my-form');
const inpt = document.querySelector('.task');
const task = document.querySelector('.addTask');


form.addEventListener('submit', onSubmit);


//this is the task adding function of the to-do-list app
function onSubmit(e) {
    e.preventDefault();

    const taskText = inpt.value.trim();
    if (!taskText) return;

    addTaskToDOM(taskText);
    saveTaskToLocal(taskText);

    inpt.value = '';
}

function addTaskToDOM(taskText) {
    const li = document.createElement('li');

    const label = document.createElement('label');
    label.className = 'custom-checkbox-wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = "task-checkbox";

    const span = document.createElement('span');
    span.className = 'checkmark';

    label.appendChild(checkbox);
    label.appendChild(span);

    li.appendChild(label);
    li.appendChild(document.createTextNode(` ${taskText}`));
    task.appendChild(li);
}

function saveTaskToLocal(taskText) {
    let tasks;

    try {
        tasks = JSON.parse(localStorage.getItem('tasks'));

        // Ensure it's an array
        if (!Array.isArray(tasks)) {
            throw new Error("Invalid tasks format");
        }
    } catch (err) {
        tasks = [];  // fallback to empty array
    }

    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


window.addEventListener('DOMContentLoaded', () => {
    let tasks;

    try {
        tasks = JSON.parse(localStorage.getItem('tasks'));

        // Check if it's actually an array
        if (!Array.isArray(tasks)) {
            throw new Error("Tasks is not an array");
        }
    } catch (error) {
        // If any error, reset tasks to empty array
        tasks = [];
    }

    tasks.forEach(taskText => addTaskToDOM(taskText));
});


//this is the delete function of the to-do-list app
function delWork() {
    const taskList = document.querySelector('.addTask');
    const checkboxes = taskList.querySelectorAll('.task-checkbox');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const li = checkbox.closest('li');
            const text = li.textContent.trim();

            // Remove from DOM
            taskList.removeChild(li);

            // Remove from localStorage
            tasks = tasks.filter(task => task !== text);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//this is the editing function of the to-do-list app

function editWork() {
    const taskList = document.querySelector('.addTask');
    const checkboxes = taskList.querySelectorAll('.task-checkbox');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const li = checkbox.closest('li');
            const oldValue = li.textContent.trim();
            const newValue = prompt("Enter new value");

            if (newValue && newValue.trim() !== "") {
                li.childNodes[1].nodeValue = ` ${newValue}`;

                // Update localStorage
                const index = tasks.indexOf(oldValue);
                if (index !== -1) {
                    tasks[index] = newValue;
                }

                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
    });
}
