// ui.js
// Este archivo solo se encarga de mostrar cosas en pantalla (crear
// elementos del DOM, pintar la lista de tareas y las estadisticas).
// No sabe nada de localStorage ni de la logica de negocio, solo
// recibe datos ya listos y los muestra. Esto sigue el principio de
// Responsabilidad Unica (SRP).

export function renderTaskList(tasks, onToggle, onDelete) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No hay tareas para mostrar</p>';
        return;
    }

    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task, onToggle, onDelete));
    });
}

// Funcion pequeña que solo crea el elemento de UNA tarea.
// Antes esto estaba mezclado dentro de un for gigante en main.js.
function createTaskElement(task, onToggle, onDelete) {
    const taskDiv = document.createElement('div');
    taskDiv.className = task.completed ? 'task-item completed' : 'task-item';

    taskDiv.innerHTML = `
        <span>${task.text}</span>
        <div class="task-buttons">
          <button class="complete-btn" data-id="${task.id}">
            ${task.completed ? 'Reactivar' : 'Completar'}
          </button>
          <button class="delete-btn" data-id="${task.id}">Eliminar</button>
        </div>`;

    taskDiv.querySelector('.complete-btn').onclick = () => onToggle(task.id);
    taskDiv.querySelector('.delete-btn').onclick = () => onDelete(task.id);

    return taskDiv;
}

export function renderStats(stats) {
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `Total: ${stats.total} | Completadas: ${stats.completed} | Activas: ${stats.active}`;
}

export function setActiveFilterButton(filter) {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-filter') === filter);
    });
}

export function getTaskInputValue() {
    return document.getElementById('taskInput').value.trim();
}

export function clearTaskInput() {
    document.getElementById('taskInput').value = '';
}
