//* Select Elements

let filterValue = "all";
const welcomeMsg = document.querySelector(".welcome");
const startMenu = document.querySelector(".startMenu");
const startBtn = document.querySelector(".startMenu__button");
const todoList = document.querySelector(".todoList");
const todoListList = document.querySelector(".todoList__list");
const editMode = document.querySelector(".editTask__mode");
const newTaskForm = document.querySelector(".newTaskForm");
const newTaskValue = document.querySelector(".newTask__input");
const taskTitle = document.querySelector(".newTask__title");

//* Style Changes

welcomeMsg.addEventListener("click", () => {
  document.querySelector(".welcome").style.display = "none";
  startMenu.style.display = "flex";
});

startBtn.addEventListener("click", () => {
  startMenu.style.display = "none";
  todoList.style.display = "flex";
  const tasksArray = getTasks();
  createTask(tasksArray);
});

const newItemBtn = document.querySelector(".newItemBtn");
newItemBtn.addEventListener("click", () => {
  todoList.style.display = "none";
  todoList.style.height = "auto";

  document.querySelector(".newTask").style.display = "flex";
});
document.querySelector(".newTask__submit").addEventListener("click", () => {
  document.querySelector(".newTask").style.display = "none";
  todoList.style.display = "flex";
});

//* Submit New Task

newTaskForm.addEventListener("submit", submitTodo);

function submitTodo(event) {
  event.preventDefault();
  if (!newTaskValue.value) return null;
  const newTask = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: taskTitle.value,
    description: newTaskValue.value,
    isCompleted: false,
  };
  saveTasks(newTask);

  filterTasks();
}

//* Create New Task

function createTask(tasksArray) {
  let result = "";
  tasksArray.forEach((task) => {
    result += `<li class="todoList__item">
  <h3 class="item__title ${task.isCompleted && "completed"}">${task.title}</h3>
  <p class="item__description ${task.isCompleted && "completed"}">${
      task.description
    }</p>
  <p class="item__date ${task.isCompleted && "completed"}">${new Date(
      task.createdAt
    ).toLocaleDateString("en-US")}</p>
  <div class="todoList__buttonBox">
      <button data-task-id=${task.id} class="todoList__check">
          <i class="fa-solid fa-check-to-slot item--buttons"></i>
      </button>
      <button data-task-id=${task.id} class="todoList__remove">
          <i class="fa-solid fa-trash item--buttons"></i>
      </button>
      <button data-task-id=${task.id} class="todoList__edit">
      <i class="fas fa-edit item--buttons"></i>
      </button>
  </div>
</li>`;
  });
  newTaskValue.value = "";
  taskTitle.value = "";
  todoListList.innerHTML = result;

  const removeBtns = [...document.querySelectorAll(".todoList__remove")];

  removeBtns.forEach((btn) => btn.addEventListener("click", removeTasks));

  const checkBtns = [...document.querySelectorAll(".todoList__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTasks));

  const editBtns = [...document.querySelectorAll(".todoList__edit")];
  editBtns.forEach((btn) => btn.addEventListener("click", editTasks));
}

//* Filtering

const todoListSort = document.querySelector(".todoList__sort");

todoListSort.addEventListener("change", (event) => {
  filterValue = event.target.value;
  filterTasks();
});

function filterTasks() {
  // const selectedFilter = event.target.value;
  let tasksArray = getTasks();
  switch (filterValue) {
    case "all":
      {
        createTask(tasksArray);
      }

      break;
    case "completed":
      {
        const completedTasks = tasksArray.filter((t) => t.isCompleted === true);
        createTask(completedTasks);
      }
      break;

    case "uncompleted":
      {
        const uncompletedTasks = tasksArray.filter(
          (t) => t.isCompleted === false
        );
        createTask(uncompletedTasks);
      }
      break;
    default:
      createTask(tasksArray);
  }
}

//* Remove Tasks

function removeTasks(event) {
  let tasksArray = getTasks();
  const taskId = Number(event.target.dataset.taskId);
  tasksArray = tasksArray.filter((t) => t.id !== taskId);
  saveAllTasks(tasksArray);
  filterTasks();
}

//* Check Tasks

function checkTasks(event) {
  let tasksArray = getTasks();
  const taskId = Number(event.target.dataset.taskId);
  const checkedTasks = tasksArray.find((t) => t.id === taskId);
  checkedTasks.isCompleted = !checkedTasks.isCompleted;
  saveAllTasks(tasksArray);
  filterTasks();
}

//*Edit Tasks

function editTasks(event) {
  let tasksArray = getTasks();
  const taskId = Number(event.target.dataset.taskId);
  const editingTask = tasksArray.find((t) => t.id === taskId);
  let result = `<div class="backdrop"></div>
  <div class="editTask__modal">
      <form id="editTask" action="" method="post" class="editTaskForm">
          <input type="text" class="taskTitle__edit" value="${editingTask.title}" placeholder="Title">
          <input type="text" class="taskInput__edit" value="${editingTask.description}" placeholder="Task">
          <button class="editedTask__submit" type="" form="">Save</button>
      </form>
  </div>`;
  editMode.innerHTML = result;
  const backdrop = document.querySelector(".backdrop");
  const editModal = document.querySelector(".editTask__modal");
  editMode.style.display = "flex";
  backdrop.style.display = "flex";
  editModal.style.display = "flex";

  const editedTitle = document.querySelector(".taskTitle__edit");
  const editedDescription = document.querySelector(".taskInput__edit");
  const saveBtn = document.querySelector(".editedTask__submit");
  saveBtn.addEventListener("click", () => {
    editingTask.title = `${editedTitle.value}  `;
    editingTask.description = `${editedDescription.value}  `;
    saveAllTasks(tasksArray);
    filterTasks();
    editMode.style.display = "none";
  });
}

//* Save Tasks

function getTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasksArray")) || [];
  return savedTasks;
}

function saveTasks(task) {
  const savedTasks = getTasks();
  savedTasks.push(task);
  localStorage.setItem("tasksArray", JSON.stringify(savedTasks));
}

function saveAllTasks(task) {
  localStorage.setItem("tasksArray", JSON.stringify(task));
}

//* Search Tasks

const searchInput = document.querySelector(".todoList__search");

function searchTask() {
  let tasksArray = getTasks();
  let searchValue = searchInput.value.toLowerCase();
  let filteredTasksArray = tasksArray.filter((t) => {
    return (
      t.title.toLowerCase().includes(searchValue) ||
      t.description.toLowerCase().includes(searchValue)
    );
  });
  createTask(filteredTasksArray);
}
searchInput.addEventListener("input", searchTask);
