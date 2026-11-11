// todo/js/ui.js
import { state, subscribe, toggleTodo, deleteTodo, setFilter } from "./state.js";

const list = document.getElementById("todo-list");
const filterSelect = document.getElementById("filter");

export function renderTodos() {
    const filtered = state.todos.filter(t => {
        if (state.filter === "active") return !t.completed;
        if (state.filter === "completed") return t.completed;
        return true;
    });

    list.innerHTML = "";
    filtered.forEach(todo => {
        const li = document.createElement("li");
        if (todo.completed) li.classList.add("completed");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodo(todo.id));

        const span = document.createElement("span");
        span.textContent = todo.text;

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.addEventListener("click", () => deleteTodo(todo.id));

        li.append(checkbox, span, del);
        list.appendChild(li);
    });
}

export function initUI() {
    subscribe(renderTodos);  // auto-render on state change
    filterSelect.value = state.filter;
    filterSelect.addEventListener("change", e => setFilter(e.target.value));
}