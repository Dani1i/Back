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
const uri = "mongodb+srv://fran:1234@becdb.jbqf3.mongodb.net/BEC?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error al conectar a MongoDB Atlas:", err));

// Rutas
app.use("/api/catalog", catalogRoutes);

// Middleware para manejo de errores
app.use(require("./middlewares/errorHandler"));

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
