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