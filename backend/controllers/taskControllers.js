const Task = require('../models/taskModel');

function getAllTasks(req, res) {
    Task.getAll((err, tasks) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(tasks);
    });
}

function getTaskById(req, res) {
    const id = req.params.id;
    Task.getById(id, (err, task) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    });
}

function createTask(req, res) {
    const newTask = req.body;
    Task.create(newTask, (err, task) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json(task);  // Se devuelve el nuevo recurso creado
    });
}

function updateTask(req, res) {
    const id = req.params.id;
    const updatedTask = req.body;
    updatedTask.id = id; // Asegúrate de que el ID esté incluido en el objeto

    Task.update(updatedTask, (err, result) => {
        if (err) {
            console.error('Error updating task:', err); // Añade un mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task updated successfully' });
    });
}


function deleteTask(req, res) {
    const id = req.params.id;
    Task.delete(id, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    });
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
