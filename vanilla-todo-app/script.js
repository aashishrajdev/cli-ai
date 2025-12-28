// Utility functions for localStorage operations
const Storage = {
    /**
     * Saves todos to localStorage.
     * @param {Array<Object>} todos - The array of todo objects to save.
     */
    saveTodos(todos) {
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving todos to localStorage:', error);
            alert('Failed to save todos. Please check your browser settings.');
        }
    },

    /**
     * Loads todos from localStorage.
     * @returns {Array<Object>} An array of todo objects, or an empty array if none found.
     */
    loadTodos() {
        try {
            const todosJSON = localStorage.getItem('todos');
            return todosJSON ? JSON.parse(todosJSON) : [];
        } catch (error) {
            console.error('Error loading todos from localStorage:', error);
            alert('Failed to load todos. Your saved data might be corrupted.');
            return []; // Return empty array on error to prevent further issues
        }
    }
};

// DOM Element References
const newTodoInput = document.getElementById('new-todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

// State variables
let todos = Storage.loadTodos(); // Load todos from localStorage on startup
let currentFilter = 'all'; // Default filter

/**
 * Renders the todos to the DOM based on the current filter.
 */
function renderTodos() {
    todoList.innerHTML = ''; // Clear existing list

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'all') {
            return true;
        } else if (currentFilter === 'active') {
            return !todo.completed;
        } else if (currentFilter === 'completed') {
            return todo.completed;
        }
        return false;
    });

    if (filteredTodos.length === 0 && currentFilter !== 'all') {
        const noItemsMessage = document.createElement('p');
        noItemsMessage.className = 'no-items-message';
        noItemsMessage.textContent = `No ${currentFilter} items found.`;
        todoList.appendChild(noItemsMessage);
        return;
    } else if (filteredTodos.length === 0 && currentFilter === 'all' && todos.length === 0) {
        const noItemsMessage = document.createElement('p');
        noItemsMessage.className = 'no-items-message';
        noItemsMessage.textContent = 'No todos yet! Add some above.';
        todoList.appendChild(noItemsMessage);
        return;
    }

    filteredTodos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        listItem.dataset.id = todo.id; // Store ID for easy lookup

        listItem.innerHTML = `
            <span class="todo-item-text">${escapeHTML(todo.text)}</span>
            <div class="todo-actions-item">
                <button class="complete-btn" aria-label="Toggle completion">
                    <i class="fas ${todo.completed ? 'fa-undo' : 'fa-check'}"></i>
                </button>
                <button class="delete-btn" aria-label="Delete todo">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        todoList.appendChild(listItem);
    });
}

/**
 * Adds a new todo item.
 */
function addTodo() {
    const todoText = newTodoInput.value.trim();

    if (todoText === '') {
        alert('Todo text cannot be empty!');
        return;
    }

    const newTodo = {
        id: Date.now().toString(), // Simple unique ID generation
        text: todoText,
        completed: false
    };

    todos.unshift(newTodo); // Add to the beginning of the array
    Storage.saveTodos(todos);
    newTodoInput.value = ''; // Clear input
    renderTodos(); // Re-render the list
}

/**
 * Toggles the completion status of a todo item.
 * @param {string} id - The ID of the todo item to toggle.
 */
function toggleTodoComplete(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    Storage.saveTodos(todos);
    renderTodos();
}

/**
 * Deletes a todo item.
 * @param {string} id - The ID of the todo item to delete.
 */
function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this todo?')) {
        todos = todos.filter(todo => todo.id !== id);
        Storage.saveTodos(todos);
        renderTodos();
    }
}

/**
 * Sets the current filter and re-renders the todos.
 * @param {string} filter - The filter type ('all', 'active', 'completed').
 */
function setFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });
    renderTodos();
}

/**
 * Clears all completed todo items.
 */
function clearCompletedTodos() {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount === 0) {
        alert('No completed todos to clear!');
        return;
    }
    if (confirm(`Are you sure you want to clear all ${completedCount} completed todos?`)) {
        todos = todos.filter(todo => !todo.completed);
        Storage.saveTodos(todos);
        renderTodos();
    }
}

/**
 * Escapes HTML characters to prevent XSS attacks.
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string.
 */
function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Event Listeners
addTodoBtn.addEventListener('click', addTodo);

// Allow adding todo with Enter key
newTodoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Event delegation for todo list items (toggle complete, delete)
todoList.addEventListener('click', (event) => {
    const target = event.target;
    const listItem = target.closest('.todo-item');

    if (!listItem) return; // Click was not on a todo item

    const todoId = listItem.dataset.id;

    if (target.closest('.complete-btn')) {
        toggleTodoComplete(todoId);
    } else if (target.closest('.delete-btn')) {
        deleteTodo(todoId);
    }
});

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
});

clearCompletedBtn.addEventListener('click', clearCompletedTodos);

// Initial render when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});
