function addTask() {
    const taskInput = document.getElementById('taskinput');
    const taskText = taskInput.value;

    //the firs line of code takes gets the id of the html element that has been stored in the html 
    //the second line of code takes the iput text that the user has enterd 

    if (taskText === '') return;
    //this third line of code checks if the user has enterd somehting if he has the code continues if he hasent, the code exits

    // Create a new list item
    const li = document.createElement('li');
    //this line of code creates a new list of element 
    li.textContent = taskText;
    //that above code set the list of element

    li.onclick = function() {
        li.classList.toggle('completed');
        saveTasks(); // Save tasks whenever one is toggled
    };

    // Adding a delete button to delete the task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        li.remove();
        saveTasks(); // Save tasks after deletion
    };

    li.appendChild(deleteBtn);
    document.getElementById('tasklist').appendChild(li);
    taskInput.value = '';

    saveTasks(); // Save tasks after adding
}

function saveTasks() {
    const tasks = [];
    const items = document.querySelectorAll('#tasklist li');
    items.forEach(item => {
        const taskData = {
            text: item.firstChild.textContent,
            completed: item.classList.contains('completed')
        };
        tasks.push(taskData);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }

            li.onclick = function() {
                li.classList.toggle('completed');
                saveTasks(); // Save tasks whenever one is toggled
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = function() {
                li.remove();
                saveTasks(); // Save tasks after deletion
            };

            li.appendChild(deleteBtn);
            document.getElementById('tasklist').appendChild(li);
        });
    }
}

// Load tasks when the page loads
window.onload = loadTasks;