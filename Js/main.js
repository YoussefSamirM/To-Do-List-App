let addInput = document.querySelector(".add-form input");
let btn = document.querySelector(".add-form button");
let tasks = document.querySelector(".tasks");

let arrOfTasks = [];

if (localStorage.getItem("task")) {
  arrOfTasks = JSON.parse(localStorage.getItem("task"));
}

getTasks();

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (addInput.value != "") {
    addTasksToArray(addInput.value);
    addInput.value = "";
    addInput.placeholder = "What's on your mind?";
    addInput.style.border = "1px solid #eee";
  } else {
    addInput.placeholder = "Please add your task!";
    addInput.style.border = "1px solid red";
  }
});

function addTasksToArray(inputValue) {
  let task = {
    id: Date.now(),
    taskName: inputValue,
    state: false,
  };

  arrOfTasks.push(task);

  addTasksToTasksDiv(arrOfTasks);
  saveTasks(arrOfTasks);
}

function addTasksToTasksDiv(arrOfTasks) {
  tasks.innerHTML = "";

  arrOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.setAttribute("id", task.id);
    div.className = "task";

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "checkBox";

    let p = document.createElement("p");
    p.textContent = task.taskName;

    let span = document.createElement("span");
    span.className = "fa-solid fa-xmark delete";

    div.appendChild(checkBox);
    div.appendChild(p);
    div.appendChild(span);

    tasks.appendChild(div);

    if (task.state) {
      div.className = "task done";
      checkBox.checked = true;
    }
  });
}

function saveTasks(arrOfTasks) {
  localStorage.setItem("task", JSON.stringify(arrOfTasks));
}

function getTasks() {
  let data = localStorage.getItem("task");

  if (data) {
    const arrOfTasks = JSON.parse(data);
    addTasksToTasksDiv(arrOfTasks);
  }
}

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    removeTask(e.target.parentElement.id);
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("checkBox")) {
    doneTask(e.target.parentElement.id);
    e.target.parentElement.classList.toggle("done");
  }
});

function removeTask(taskId) {
  arrOfTasks = arrOfTasks.filter((e) => e.id != taskId);
  saveTasks(arrOfTasks);
}

function doneTask(taskId) {
  for (let i = 0; i < arrOfTasks.length; i++) {
    if (arrOfTasks[i].id == taskId) {
      arrOfTasks[i].state == false
        ? (arrOfTasks[i].state = true)
        : (arrOfTasks[i].state = false);
    }
  }
  saveTasks(arrOfTasks);
}
