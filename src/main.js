import './style.css';
import { addTask, toggleTask, deleteTask, getFilteredTasks, getStats } from './taskService.js';
import {
    renderTaskList,
    renderStats,
    setActiveFilterButton,
    getTaskInputValue,
    clearTaskInput
} from './ui.js';

// main.js ya no hace de todo (guardar, calcular, pintar) como antes.
// Ahora solo conecta los eventos de la pagina con taskService.js
// (la logica) y ui.js (la pantalla). Cada funcion aqui es pequeña y
// tiene un solo trabajo, siguiendo Clean Code y el principio SRP.

let currentFilter = 'all';

function refreshView() {
    renderTaskList(getFilteredTasks(currentFilter), handleToggleTask, handleDeleteTask);
    renderStats(getStats());
}

function handleAddTask() {
    const text = getTaskInputValue();

    if (text === '') {
        alert('Por favor escribe una tarea');
        return;
    }

    addTask(text);
    clearTaskInput();
    refreshView();
}

function handleToggleTask(id) {
    toggleTask(id);
    refreshView();
}

function handleDeleteTask(id) {
    deleteTask(id);
    refreshView();
}

function handleFilterChange(filter) {
    currentFilter = filter;
    setActiveFilterButton(filter);
    refreshView();
}

function handleTaskInputKeyPress(event) {
    if (event.key === 'Enter') {
        handleAddTask();
    }
}

function setupEventListeners() {
    document.getElementById('addBtn').onclick = handleAddTask;
    document.getElementById('taskInput').onkeypress = handleTaskInputKeyPress;

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.onclick = () => handleFilterChange(button.getAttribute('data-filter'));
    });
}

window.onload = function () {
    setupEventListeners();
    refreshView();
};
