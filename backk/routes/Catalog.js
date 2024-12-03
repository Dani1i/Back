const express = require("express");
const mongoose = require("mongoose");
const Document = require("../models/Document");
const router = express.Router();

const { getBooks, updateBookByTitle, getFeaturedBooks, createBook, updateBook, deleteBook } = require("../controllers/catalogController");

// Ruta para agregar un nuevo libro
router.get("/", getBooks);


// Ruta para actualizar un libro por título
router.put("/title/:title", updateBookByTitle);

module.exports = router;

// Obtener todos los libros
router.get("/", async (req, res) => {
  try {
    const books = await Document.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ success: false, message: "Error al obtener los libros" });
  }
});

// Obtener libros destacados
router.get("/featured", async (req, res) => {
  try {
    // Consulta libros destacados
    const featuredBooks = await Document.find({ available: true }).limit(10);

    // Asegúrate de devolver un arreglo válido
    res.status(200).json(featuredBooks);
  } catch (error) {
    console.error("Error al obtener libros destacados:", error);
    res.status(500).json({ success: false, message: "Error al obtener libros destacados" });
  }
});

// Obtener un libro por su ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID es un número
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "El ID debe ser un número válido" });
    }

    // Buscar el libro por ID
    const book = await Document.findOne({ id: Number(id) }); // Convertir el ID a número para la consulta
    if (!book) {
      return res.status(404).json({ success: false, message: "Libro no encontrado" });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error("Error al obtener el libro:", error);
    res.status(500).json({ success: false, message: "Error al obtener el libro" });
  }
});



// Crear un nuevo libro
router.post("/", async (req, res) => {
  try {
    const { title, author, category, type, stock, available, image } = req.body;

    const newBook = new Document({
      title,
      author,
      category,
      type,
      stock,
      available,
      image,
    });

    const savedBook = await newBook.save();
    res.status(201).json({ success: true, data: savedBook });
  } catch (error) {
    console.error("Error al crear un libro:", error);
    res.status(500).json({ success: false, message: "Error al crear el libro" });
  }
});

// Actualizar un libro por ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validar el formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const updatedBook = await Document.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: "Libro no encontrado" });
    }

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    res.status(500).json({ success: false, message: "Error al actualizar el libro" });
  }
});

// Eliminar un libro por ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validar el formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const deletedBook = await Document.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ success: false, message: "Libro no encontrado" });
    }

    res.status(200).json({ success: true, message: "Libro eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    res.status(500).json({ success: false, message: "Error al eliminar el libro" });
  }
});

module.exports = router;
