const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // Mueve la creación de la app al inicio

// Middlewares
app.use(cors());
app.use(express.json()); // Middleware para procesar JSON

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/biblioteca", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Rutas del catálogo
const catalogRoutes = require("./routes/catalog"); // Usa "./" para rutas locales
app.use("/api/catalog", catalogRoutes);

// Puerto
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));



