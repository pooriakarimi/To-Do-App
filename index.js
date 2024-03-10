const welcomeMsg = document.querySelector(".welcome");
const startMenu = document.querySelector(".startMenu");
const startBtn = document.querySelector(".startMenu__button");
const todoList = document.querySelector(".todoList");

welcomeMsg.addEventListener("click", () => {
  document.querySelector(".welcome").classList.add("hidden");
  startMenu.style.display = "flex";
});
startBtn.addEventListener("click", () => {
  startMenu.style.display = "none";
  todoList.style.display = "flex";
});

const newItemBtn = document.querySelector(".newItemBtn");

newItemBtn.addEventListener("click", () => {
  todoList.style.display = "none";
  document.querySelector(".newTask").style.display = "flex";
});

document.querySelector(".newTask__submit").addEventListener("click", () => {
  document.querySelector(".newTask").style.display = "none";
  todoList.style.display = "flex";
  const newItem = document.createElement("li");
  newItem.classList.add("todoList__item");
  newItem.innerHTML = ` <h3 class="item__title">fafwrger</h3>
  <p class="item__description">test 1</p>
  <p class="item__date">12/12/12</p>
  <div class="todoList__buttonBox">
      <button class="todoList__check">
          <i class="fa-solid fa-check-to-slot"></i>
      </button>
      <button class="todoList__remove">
          <i class="fa-solid fa-trash"></i>
      </button>
  </div>`;
});

const deleteBtn = document.querySelector(".todoList__remove");

deleteBtn.addEventListener("click", () => {
  document.querySelector(".todoList__item").remove();
});
