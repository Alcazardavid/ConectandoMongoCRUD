// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // URL de conexión a MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/miapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1); // Detener la app si no conecta
  }
};

module.exports = connectDB;
