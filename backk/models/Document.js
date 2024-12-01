const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Título del documento
  author: { type: String, required: true }, // Autor del documento
  category: { type: String, required: true }, // Categoría (literatura, técnica, etc.)
  type: { type: String, enum: ["book", "audio", "video"], required: true }, // Tipo de recurso
  stock: { type: Number, default: 1 }, // Ejemplares disponibles
  available: { type: Boolean, default: true }, // Disponibilidad general
});

module.exports = mongoose.model("Document", DocumentSchema);
