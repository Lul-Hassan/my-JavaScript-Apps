# my-JavaScript-Apps
#JavaScript project 
// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(taskElement => {
        tasks.push({
            text: taskElement.textContent.replace("❌", "").replace("✏️", ""),
            completed: taskElement.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create task list element
function createTaskElement(text, completed = false) {
    const li = document.createElement("li");
    li.textContent = text;
    if (completed) li.classList.add("completed");

    // Delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    // Edit button
    const editBtn = document.createElement("span");
    editBtn.textContent = "✏️";
    editBtn.classList.add("editBtn");
    editBtn.onclick = () => {
        const newText = prompt("Edit task:", li.textContent.replace("❌", "").replace("✏️", ""));
        if (newText) {
            li.textContent = newText;
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            saveTasks();
        }
    };

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
}

// Add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    createTaskElement(taskText);
    taskInput.value = "";
    saveTasks();
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// Load tasks on page load
window.onload = loadTasks;


