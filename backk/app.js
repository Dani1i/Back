// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const catalogRoutes = require("./routes/Catalog");
// const errorHandler = require("./middlewares/errorHandler");


// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Conexión a MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/biblioteca", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Conectado a MongoDB"))
//   .catch((error) => console.error("Error al conectar a MongoDB:", error));

// // Rutas
// app.use("/api/catalog", catalogRoutes);

// // Middleware de manejo de errores
// app.use(errorHandler);

// // Puerto
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const catalogRoutes = require("./routes/Catalog");
const cors = require("cors");

const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    rut: { type: String, required: true, unique: true }, // Identificador único
    nombres: { type: String, required: true },
    direccion: { type: String, required: true },
    correo: { type: String, required: true, unique: true }, // Correo debe ser único
    telefono: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, // Nuevo campo para identificar si es admin
  },
  {
    collection: "Usuarios", // Especifica el nombre de la colección
  }
);

module.exports = mongoose.model("User", userSchema);

