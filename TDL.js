let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <button class="complete-button" onclick="completeTask(${index})">
                ${task.completed ? "✓" : ""}
            </button>

            <span class="task-text">${task.text}</span>

            <button class="delete-button" onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

displayTasks();

function deleteAllTasks() {
    if (tasks.length === 0) {
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete all tasks?");

    if (confirmDelete) {
        tasks = [];

        saveTasks();
        displayTasks();
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");

    localStorage.setItem("darkMode", isDarkMode);

    document.getElementById("themeButton").textContent =
        isDarkMode ? "☀️" : "🌙";
}

function loadTheme() {
    const darkMode = localStorage.getItem("darkMode");

    if (darkMode === "true") {
        document.body.classList.add("dark-mode");
        document.getElementById("themeButton").textContent = "☀️";
    }
}

loadTheme();