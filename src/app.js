//app.js contiene la configuracion principal, es importado por "server.js"

const express = require('express');//importamos express, framework para servidores http en node.js
const app = express();//Crear aplicación Express

// Middleware básico para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de bienvenida del servidor
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor funcionando correctamente',
    fecha: new Date().toISOString()
  });
});

// Ruta para verificar el estado de la conexión a MongoDB
app.get('/db-status', (req, res) => {
  const mongoose = require('mongoose'); 
  const estado = mongoose.connection.readyState;// Obtener el estado actual de la conexión de Mongoose
  const estados = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'  
  };

  // Enviar una respuesta JSON con el estado de la base de datos
  res.json({
    mensaje: 'Estado de la base de datos',
    estado: estados[estado],
    // Nombre de la base de datos conectada o 'No conectada'
    baseDatos: mongoose.connection.name || 'No conectada', 
    // Host al que está conectada la base de datos o 'No disponible'
    host: mongoose.connection.host || 'No disponible' 
  });
});

// Exportar la aplicación para que pueda ser utilizada por 'server.js'
module.exports = app;