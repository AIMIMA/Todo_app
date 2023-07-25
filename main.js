let html = document.querySelector("html");
let iconDark = document.querySelector(".wrapper .todo .header img");
let inputUserName = document.querySelector(".todo .info h2 input");
let formBubble = document.querySelector(".todo #container .bubble");
let formInput = document.querySelector(".todo #container input");
let formBtnAdd = document.querySelector(".todo #container i");
let tasksContainer = document.querySelector(".todo .tasks .content");
let counterTasks = document.querySelector(".tools .counter span")
let clearCompleted = document.querySelector(".tools .clear-completes")
let categoryDes = document.querySelectorAll(".wrapper .todo .tasks .category li")
let categoryMob = document.querySelectorAll(".wrapper .todo > .category li")
let tasksArray = [];

if (localStorage.getItem("mode") === 'dark') {
  html.classList.add(localStorage.getItem("mode"));
  iconDark.src = `./images/icon-sun.svg`;
} else {
  html.classList.add(localStorage.getItem("mode"));
  iconDark.src = `./images/icon-moon.svg`;
}
if (localStorage.getItem("userName")) {
  inputUserName.value = localStorage.getItem("userName");
}
if (localStorage.getItem("task")) {
  tasksArray = JSON.parse(localStorage.getItem("task"))
}
getDataFromLocal()

// Start Add Name of User 
window.onload = () => {
  if (inputUserName.value === "") {
    inputUserName.focus();
    inputUserName.onblur = () => {
      addUserNameToLocal(inputUserName.value)
    }
  } else {
    inputUserName.onblur = () => {
      addUserNameToLocal(inputUserName.value)
    };
    formInput.focus();
  }
}
// End Add Name of User 

// Start Dark && Light mode with icon mode
iconDark.addEventListener('click', () => {
  html.classList.remove('light')
  html.classList.toggle("dark");
  const isDark = html.classList.contains("dark") ? "sun" : "moon";
  iconDark.src = `./images/icon-${isDark}.svg`;
  addStatueModeToLocal()
});
// End Dark && Light mode with icon mode
formBubble.addEventListener('click', () => {
  if (!formBubble.classList.contains("completed")) {
    formBubble.classList.add("completed")
  } else {
    formBubble.classList.remove("completed");
  }
})
// Start create tasks
formBtnAdd.addEventListener('click', (e) => {
  if (formInput.value.length > 0) {
    addTaskToArray(formInput.value);
    formInput.value = "";
    formInput.focus();
  }
  if (formBubble.classList.contains("completed")) {
    formBubble.classList.remove("completed")
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: new Date().getTime(),
    title: taskText,
    completed: (formBubble.classList.contains("completed")) ? "completed" : "not-completed",
  };
  tasksArray.push(task);
  addElements(tasksArray);
  addDataToLocal(tasksArray);
}

function addElements(tasksArray) {
  tasksContainer.innerHTML = "";
  tasksArray.forEach((task) => {
    let todo = document.createElement("div");
    todo.classList.add("task");
    todo.setAttribute("data-id", task.id)
  
    let bubble = document.createElement("span");
    bubble.classList.add("bubble");
    bubble.classList.add(task.completed)
    todo.appendChild(bubble);

    let taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.setAttribute("readonly", "readonly")
    taskInput.value = task.title;
    todo.appendChild(taskInput);

    let editBtn = document.createElement("i")
    editBtn.classList.add("fa-solid")
    editBtn.classList.add("fa-pen-to-square")
    editBtn.classList.add("edit")
    todo.appendChild(editBtn)

    let deleteBtn = document.createElement("i")
    deleteBtn.classList.add("fa-solid")
    deleteBtn.classList.add("fa-xmark")
    deleteBtn.classList.add("delete")
    todo.appendChild(deleteBtn)

    tasksContainer.appendChild(todo)

    countTasks()

    bubble.onclick = () => {
      bubble.classList.toggle("completed")
      bubble.classList.toggle("not-completed")
      task.completed = bubble.classList[1]
      addDataToLocal(tasksArray);
    }

    editBtn.addEventListener("click", (ele) => {
      if (taskInput.hasAttribute("readonly")) {
        taskInput.removeAttribute("readonly") 
        taskInput.focus();
        taskInput.addEventListener("blur", () => {
          task.title = taskInput.value;
          addDataToLocal(tasksArray);
        })
      } else {
        taskInput.setAttribute("readonly", "readonly")
      }
    })

    // editBtn.addEventListener("click", (ele) => {
    //   if (ele.target.innerText.toLowerCase() === "edit") {
    //     ele.target.innerText = "Save"
    //     taskInput.removeAttribute("readonly") 
    //     taskInput.focus();
    //     taskInput.addEventListener("blur", () => {
    //       task.title = taskInput.value;
    //       addDataToLocal(tasksArray);
    //     })
    //   } else {
    //     ele.target.innerText = "Edit"
    //     taskInput.setAttribute("readonly", "readonly")
    //   }
    // })

    deleteBtn.addEventListener("click", (e) => {
      deleteTask(e.target.parentElement.getAttribute("data-id"))
      e.target.parentElement.remove();
      countTasks()
    })
  })
}
categoryDes.forEach((li) => {
  let todos = tasksContainer.childNodes;
  li.addEventListener("click", () => {
    if (li.innerText.toLowerCase() == "all") {
      categoryDes.forEach((li) => {
        li.classList.remove("active")
      })
      todos.forEach((todo) => {
        todo.style.display = "flex";
      })
    } else if (li.innerText.toLowerCase() == "active") {
      categoryDes.forEach((li) => {
        li.classList.remove("active")
      })
      li.classList.add("active")
      todos.forEach((todo) => {
        if (todo.childNodes[0].classList.contains("not-completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      })
    } else if (li.innerText.toLowerCase() == "completed") {
      categoryDes.forEach((li) => {
        li.classList.remove("active")
      })
      li.classList.add("active")
      todos.forEach((todo) => {
        if (todo.childNodes[0].classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      })
    }
  })
})
categoryMob.forEach((li) => {
  let todos = tasksContainer.childNodes;
  li.addEventListener("click", () => {
    if (li.innerText.toLowerCase() == "all") {
      categoryMob.forEach((li) => {
        li.classList.remove("active")
      })
      todos.forEach((todo) => {
        todo.style.display = "flex";
      })
    } else if (li.innerText.toLowerCase() == "active") {
      categoryMob.forEach((li) => {
        li.classList.remove("active")
      })
      li.classList.add("active")
      todos.forEach((todo) => {
        if (todo.childNodes[0].classList.contains("not-completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      })
    } else if (li.innerText.toLowerCase() == "completed") {
      categoryMob.forEach((li) => {
        li.classList.remove("active")
      })
      li.classList.add("active")
      todos.forEach((todo) => {
        if (todo.childNodes[0].classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      })
    }
  })
})
clearCompleted.addEventListener("click", () => {
  tasksArray = tasksArray.filter((task) => task.completed != "completed")
  addElements(tasksArray)
  addDataToLocal(tasksArray)
  countTasks()
})
// End create tasks

const addUserNameToLocal = (ele) => localStorage.setItem("userName", ele);
const addStatueModeToLocal = () => {
  !html.classList.contains("dark") 
    ? localStorage.setItem("mode", "light")
    : localStorage.setItem("mode", "dark");
}
const addDataToLocal = (tasksArray) => localStorage.setItem("task", JSON.stringify(tasksArray));
function getDataFromLocal () {
  let data = window.localStorage.getItem("task")
  if (data) {
    let task = JSON.parse(data);
    addElements(task);
  }
}
const deleteTask = (taskId) => {
  tasksArray = tasksArray.filter((task) => task.id != taskId)
  addDataToLocal(tasksArray)
}
function countTasks () {
  counterTasks.innerText = `${tasksArray.length}`
}
function deleteCompleted () {
}