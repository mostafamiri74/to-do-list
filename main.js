const todoInput = document.querySelector("#item-input");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");

addBtn.addEventListener("click", addTodo);

const todos = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : [];

renderTodos(todos);

function addTodo() {
  if (!todoInput.value) return;
  const newTodo = { value: todoInput.value, completed: false };
  todos.push(newTodo);
  updateLocalStroge(todos);
  renderTodos(todos);
  todoInput.value = "";
}

function updateLocalStroge(todos) {
  localStorage.setItem("todoList", JSON.stringify(todos));
}

function renderTodos(todos) {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    todoList.innerHTML += `
    <li class="todo-li ${todo.completed ? "completed" : ""}">${todo.value}
       <div class="buttons">
           <button class="remove" >&#10007;</button>
          <button class="complete" >&#10004;</button>
      </div>
    </li>
    `;
  });

  const removeBtn = document.querySelectorAll(".remove");
  const completeBtn = document.querySelectorAll(".complete");

  removeBtn.forEach((rBtn) => {
    rBtn?.addEventListener("click", (e) => removeTodo(e));
  });

  completeBtn.forEach((cBtn) => {
    cBtn?.addEventListener("click", (e) => completeTodo(e));
  });
}

function removeTodo(e) {
  let li = e.target.closest(".todo-li");
  let ul = e.target.closest(".todo-li").parentNode;
  let indexOfTodo = +Array.prototype.indexOf.call(ul.children, li);
  todos.splice(indexOfTodo, 1);
  updateLocalStroge(todos);
  li.remove();
}

function completeTodo(e) {
  let li = e.target.closest(".todo-li");
  let ul = e.target.closest(".todo-li").parentNode;
  let indexOfTodo = +Array.prototype.indexOf.call(ul.children, li);
  todos[indexOfTodo].completed = !todos[indexOfTodo].completed;
  updateLocalStroge(todos);
  renderTodos(todos);
}
