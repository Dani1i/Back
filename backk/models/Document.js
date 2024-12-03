// const mongoose = require("mongoose");

// const DocumentSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // Título del documento
//   author: { type: String, required: true }, // Autor del documento
//   category: { type: String, required: true }, // Categoría (literatura, técnica, etc.)
//   type: { type: String, enum: ["book", "audio", "video"], required: true }, // Tipo de recurso
//   stock: { type: Number, default: 1 }, // Ejemplares disponibles
//   available: { type: Boolean, default: true }, // Disponibilidad general
//   image: { type: String, required: false }, // URL de la imagen
//   synopsis: { type: String, default: "Sinopsis no disponible." }, // Sinopsis del documento
// });

// module.exports = mongoose.model("Document", DocumentSchema);

const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    category: String,
    type: String,
    stock: Number,
    available: Boolean,
    image: String,
    synopsis: String,
  },
  {
    collection: "Libros", // Especifica el nombre de la colección
  }
);

module.exports = mongoose.model("Document", documentSchema);

