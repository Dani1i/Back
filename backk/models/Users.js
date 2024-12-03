const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    rut: { type: String, required: true, unique: true }, // Identificador único
    nombres: { type: String, required: true },
    direccion: { type: String, required: true },
    correo: { type: String, required: true, unique: true }, // Correo debe ser único
    telefono: { type: String, required: true },
  },
  {
    collection: "Usuarios", // Especifica el nombre de la colección
  }
);

module.exports = mongoose.model("User", userSchema);
