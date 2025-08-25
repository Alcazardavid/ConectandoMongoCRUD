//server.js es la entrada principal osea que es lo primero que se ejecuta

const app = require('./src/app');// Importa la aplicación desde app.js
const connectDB = require('./src/config/db');//Importa la funcion para conectarse a la bd  
const dotenv = require('dotenv');//Importa el paquete "dotenv" para las variables de entorno
dotenv.config();//carga automaticamente las variables de entorno 

// Define el puerto del servidor
const port = process.env.PORT || 3000; 

// Función asíncrona para iniciar toda la aplicación (DB y Servidor Express)
const startApplication = async () => {
  try {
    await connectDB(); //Conectar a la base de datos MongoDB
    app.listen(port, () => { //si la conexion fue exitosa inicia en el puerto 
      console.log(`Si se escuchahttp://localhost:${port}`);
    });
  } catch (error) {
    console.error('Fallo al iniciar la aplicación:', error.message);
    process.exit(1); // Sale del proceso si no se puede iniciar la aplicación
  }
};

// Llama a la función principal para iniciar la aplicación
startApplication();