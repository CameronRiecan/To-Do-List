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

// function to render given todos to screen
function renderTodos(todos) {
    // clear inside of ul with todo items class
    todoItemsList.innerHTML = '';

    todos.forEach(item => {
        const checked = item.competed ? 'checked' : null;


        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);

        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button">X</button>
        `;

        todoItemsList.append(li);
    });
}