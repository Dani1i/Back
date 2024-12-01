const express = require("express");
const Document = require("../models/Document");
const router = express.Router();

// Endpoint para obtener todos los libros
router.get("/", async (req, res) => {
  try {
    const books = await Document.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ message: "Error al obtener los libros" });
  }
});

// Endpoint para obtener libros destacados
router.get("/featured", async (req, res) => {
  try {
    // Obtener libros disponibles y limitar el resultado a 10
    const featuredBooks = await Document.find({ available: true }).limit(10);
    res.status(200).json(featuredBooks);
  } catch (error) {
    console.error("Error al obtener libros destacados:", error);
    res.status(500).json({ message: "Error al obtener libros destacados" });
  }
});

module.exports = router;
