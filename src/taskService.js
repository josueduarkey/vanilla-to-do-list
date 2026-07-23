// taskService.js
// Aqui vive toda la logica de negocio de las tareas (agregar, completar,
// eliminar, filtrar y calcular estadisticas). Antes esto estaba
// mezclado con el codigo que manipula el DOM en main.js.
//
// Este archivo depende de storage.js (loadTasks/saveTasks) en vez de
// llamar directamente a localStorage.getItem/setItem. Asi, si en el
// futuro cambiamos donde se guardan las tareas (por ejemplo a una API),
// solo hay que cambiar storage.js y no este archivo. Eso es una forma
// simple de aplicar el principio de Inversion de Dependencias (DIP).

import { loadTasks, saveTasks } from './storage.js';

let tasks = loadTasks();
let nextId = getNextId(tasks);

function getNextId(taskList) {
    if (taskList.length === 0) {
        return 1;
    }
    return Math.max(...taskList.map(task => task.id)) + 1;
}

export function addTask(text) {
    const newTask = {
        id: nextId++,
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);

    return newTask;
}

export function toggleTask(id) {
    const task = tasks.find(t => t.id === id);

    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
    }
}

export function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}

// Cada filtro es una funcion pequeña y separada. Si en el futuro se
// necesita un filtro nuevo (por ejemplo "urgentes"), solo se agrega
// aqui sin tocar el resto del codigo. Esto sigue el principio de
// Abierto/Cerrado (OCP): el codigo esta abierto a agregar filtros
// nuevos, pero cerrado a modificar los que ya existen.
const filterStrategies = {
    all: taskList => taskList,
    active: taskList => taskList.filter(task => !task.completed),
    completed: taskList => taskList.filter(task => task.completed)
};

export function getFilteredTasks(filterName) {
    const applyFilter = filterStrategies[filterName] || filterStrategies.all;
    return applyFilter(tasks);
}

export function getStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;

    return { total, completed, active };
}
