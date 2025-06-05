let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index].text);
  if (newTask !== null) {
    tasks[index].text = newTask.trim();
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  let completed = 0;
  tasks.forEach((task, index) => {
    if (task.completed) completed++;

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task' + (task.completed ? ' completed' : '');
    taskDiv.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
        <span>${task.text}</span>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
        <button class="btn btn-secondary btn-sm" onclick="editTask(${index})">Edit</button>
      </div>
    `;
    taskList.appendChild(taskDiv);
  });

  document.getElementById('status').textContent =
    `Completed: ${completed} | Uncompleted: ${tasks.length - completed}`;
}
