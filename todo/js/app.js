// todo/js/app.js (initial version for 13.2, improved in 13.4 + 14.1)
import { save, load } from "./storage.js";

const STORAGE_KEY = "todos";

function loadTodos() {
    return load(STORAGE_KEY, []);
}

function saveTodos(todos) {
    save(STORAGE_KEY, todos);
}

function addTodo(text) {
    const todos = loadTodos();
    todos.push({
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString()
    });
    saveTodos(todos);
    renderTodos();
}

function toggleTodo(id) {
    const todos = loadTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos();
    }
}

function deleteTodo(id) {
    const todos = loadTodos().filter(t => t.id !== id);
    saveTodos(todos);
    renderTodos();
}

// Filter preference also saved
function saveFilter(filter) {
    save("filter", filter);
}

function loadFilter() {
    return load("filter", "all");
}

// todo/js/app.js (entry point)
import { addTodo } from "./state.js";
import { initUI } from "./ui.js";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");

form.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addTodo(text);
    input.value = "";
});

initUI();