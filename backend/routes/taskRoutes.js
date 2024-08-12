const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskControllers');

// Ruta de prueba para verificar que el enrutamiento básico funciona
router.get('/', (req, res) => {
    res.send('API is working!');
});

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
