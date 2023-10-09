// Main JavaScript file for To Do List project

// select everything
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');

// array that stores every todo
let todos  = [];

// event listener on form for submit event
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo(todoInput.value);
});

//function to add todo
function addTodo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        renderTodos(todos);

        todoInput.value = ''; // clears the input value after
    }
}