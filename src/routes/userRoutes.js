//aqui configuramos un router que escucha peticiones POST y las dirige a la funcion createUser
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Ruta para crear un nuevo usuario
router.post('/users', userController.createUser);
router.get('/users', userController.getUser);
router.put('/users/:id', userController.updateUser);
module.exports = router;

