// todo/js/state.js
import { save, load } from "./storage.js";

const STORAGE_KEY = "todo_state";

export const state = {
    todos: load("todos", []),
    filter: load("filter", "all"),
    theme: load("theme", "light")
};

const listeners = [];

export function subscribe(listener) {
    listeners.push(listener);
    return () => {
        const i = listeners.indexOf(listener);
        if (i > -1) listeners.splice(i, 1);
    };
}

function notify() {
    save("todos", state.todos);
    save("filter", state.filter);
    save("theme", state.theme);
    listeners.forEach(l => l(state));
}

export function setState(updates) {
    Object.assign(state, updates);
    notify();
}

// Action creators
export function addTodo(text) {
    setState({
        todos: [...state.todos, {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
        }]
    });
}

export function toggleTodo(id) {
    setState({
        todos: state.todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        )
    });
}

export function deleteTodo(id) {
    setState({ todos: state.todos.filter(t => t.id !== id) });
}

export function setFilter(filter) {
    setState({ filter });
}