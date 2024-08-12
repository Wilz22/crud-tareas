const db = require('../config/database');

const Task = {
    // Obtener todas las tareas
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
    // Obtener la tarea por id haciendo un selec con where
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
    // Crear una tarea haciendo un insert into
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
    // Actualiza la tarea 
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
    //Elimina la tarea por el id
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
