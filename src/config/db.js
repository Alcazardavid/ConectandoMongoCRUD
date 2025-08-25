//db.js se en carga de la conexion a la base datos Mongo

const mongoose = require("mongoose");//importar la libreria Mongoose

//funcion asincrona para conectarse a Mongo
const connectDB = async () => {
  try {
    // URL de conexión a MongoDB
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/miapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conectado a MongoDB: ${conn.connection.host}`);
    console.log(`Base de datos: ${conn.connection.name}`);
    return conn;//devolvemos el objeto de conexion 
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1); // Salir si no puede conectar
  }
};
//exportamos la funcion connectBD para que server la use y se conecte al iniciar
module.exports = connectDB;