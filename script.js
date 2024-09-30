// Todo functionality
const incompleteTasks = [];
const completedTasks = [];

// Add Todo functionality
document.getElementById("addTodoBtn").addEventListener("click", () => {
    document.getElementById("todoModal").classList.remove("hidden");
});

document.getElementById("addTodoConfirm").addEventListener("click", () => {
    const summary = document.getElementById("todoSummary").value;
    const description = document.getElementById("todoDescription").value;
    const dueTime = new Date(
        document.getElementById("todoDueTime").value
    ).getTime();

    if (summary && description && dueTime) {
        const task = { summary, description, dueTime };
        incompleteTasks.push(task);
        renderTasks();
        document.getElementById("todoSummary").value = "";
        document.getElementById("todoDescription").value = "";
        document.getElementById("todoDueTime").value = "";
        document.getElementById("todoModal").classList.add("hidden");
        scheduleNotification(task);
    }
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("todoModal").classList.add("hidden");
});

// Render tasks to the DOM
function renderTasks() {
    const incompleteList = document.getElementById("incompleteTasks");
    const completedList = document.getElementById("completedTasks");
    incompleteList.innerHTML = "";
    completedList.innerHTML = "";

    incompleteTasks.forEach((task, index) => {
        incompleteList.innerHTML += `<li class="flex justify-between">
            <span>${task.summary}</span>
            <button class="text-green-500" onclick="completeTask(${index})">✓</button>
        </li>`;
    });

    completedTasks.forEach((task) => {
        completedList.innerHTML += `<li>${task.summary}</li>`;
    });
}

// Mark a task as completed
function completeTask(index) {
    completedTasks.push(incompleteTasks[index]);
    incompleteTasks.splice(index, 1);
    renderTasks();
}

// Schedule notification
function scheduleNotification(task) {
    const now = Date.now();
    const timeUntilDue = task.dueTime - now;

    if (timeUntilDue > 0) {
        setTimeout(() => {
            showNotification(task);
        }, timeUntilDue);
    }
}

// Show notification
function showNotification(task) {
    const notification = document.getElementById("notification");
    const notificationContent = document.getElementById("notificationContent");

    notificationContent.textContent = `Reminder: ${task.summary} - ${task.description}`;
    notification.classList.remove("hidden");

    document.getElementById("skipNotification").onclick = () => {
        notification.classList.add("hidden");
    };

    document.getElementById("remindMeLater").onclick = () => {
        notification.classList.add("hidden");
        task.dueTime += 30 * 60 * 1000; // Add 30 minutes
        scheduleNotification(task); // Reschedule notification
    };
}
