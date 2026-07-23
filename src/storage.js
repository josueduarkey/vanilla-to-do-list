// storage.js
// Este archivo solo se encarga de guardar y leer las tareas en localStorage.
// Antes esto estaba mezclado en main.js junto con la logica y el DOM.
// Separarlo aqui sigue el principio de Responsabilidad Unica (SRP).

const STORAGE_KEY = 'tasks';

export function loadTasks() {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
}

export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
