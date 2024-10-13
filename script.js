const tasksList = document.getElementById('tasks');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

// Function to add a new task to the list
function addTask() {
    const taskText = newTaskInput.value;
    if (taskText.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(deleteButton);

        tasksList.appendChild(li);
        newTaskInput.value = '';
    }
}

// Event listener for the "Add Task" button
addTaskButton.addEventListener('click', addTask);

// Event listener for the "Enter" key press
newTaskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
