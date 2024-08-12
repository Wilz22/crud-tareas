const db = require('../config/database');

const Task = {
    getAll: async (callback) => {
        try {
            const query = 'SELECT * FROM tareas';
            const result = await db.query(query);
            callback(null, result);
        } catch (error) {
            console.error('Error getting all tasks:', error);
            callback(error);
        }
    },

    getById: async (id, callback) => {
        try {
            const query = 'SELECT * FROM tareas WHERE id = ?';
            const result = await db.query(query, [id]);
            callback(null, result);
        } catch (error) {
            console.error('Error getting task by ID:', error);
            callback(error);
        }
    },

    create: async (task, callback) => {
        try {
            const query = 'INSERT INTO tareas (titulo, descripcion, estado) VALUES (?, ?, ?)';
            const result = await db.query(query, [task.title, task.description, task.status]);
            callback(null, result);
        } catch (error) {
            console.error('Error creating task:', error);
            callback(error);
        }
    },

    update: async (task, callback) => {
        console.log('Updating task with data:', task); // Verifica los datos recibidos
        try {
            const query = 'UPDATE tareas SET titulo = ?, descripcion = ?, estado = ? WHERE id = ?';
            const result = await db.query(query, [task.title, task.description, task.status, task.id]);
            console.log('Update result:', result); // Verifica el resultado de la consulta
            callback(null, result);
        } catch (error) {
            console.error('Error during update:', error); // Muestra el error en caso de fallo
            callback(error);
        }
    },

    delete: async (id, callback) => {
        try {
            const query = 'DELETE FROM tareas WHERE id = ?';
            const result = await db.query(query, [id]);
            callback(null, result);
        } catch (error) {
            console.error('Error deleting task:', error);
            callback(error);
        }
    },
}

module.exports = Task;
