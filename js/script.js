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
        addToLocalStorage(todos); //calls function for local storage which also renders it

        todoInput.value = ''; // clears the input value after
    }
}

// function to render given todos to screen
function renderTodos( todos) {
    // clear inside of ul with todo items class
    todoItemsList.innerHTML = '';

    todos.forEach(item => {
        const checked = item.completed ? 'checked' : null;


        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);

        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button">x</button>
        `;

        todoItemsList.append(li);
    });
}

// function to add todos to local storage where data has no expiration
function addToLocalStorage(todos) {
    // convert the array to string then store it.
    localStorage.setItem('todos', JSON.stringify(todos));
    // render them to screen
    renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    // if reference exists
    if (reference) {
      // converts back to array and store it in todos array
      todos = JSON.parse(reference);
      renderTodos(todos);
    }
}

// toggle function for value to completed or not completed
function toggle(id) {
    todos.forEach(function(item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

// deletes a to do from todos array and then updated the local storage to render updated list
function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return item.id != id;
    });

    addToLocalStorage(todos);
}

// initially get everything from localStorage
getFromLocalStorage();

// Event Listener for click events for delete button
todoItemsList.addEventListener('click', function(e) {
    if (e.target.type === 'checkbox') {
        toggle(e.target.parentElement.getAttribute('data-key'));
    }

    if (e.target.classList.contains('delete-button')) {
        deleteTodo(e.target.parentElement.getAttribute('data-key'));
    }
});

