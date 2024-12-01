const Document = require("../models/Document");

// Obtener todos los libros
const getBooks = async (req, res) => {
  try {
    const books = await Document.find(); // Obtiene todos los libros
    res.status(200).json(books);
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ message: "Error al obtener los libros" });
  }
};

// Obtener libros destacados
const getFeaturedBooks = async (req, res) => {
  try {
    const featuredBooks = await Document.find({ available: true }).limit(10); // Obtiene libros disponibles (máximo 10)
    res.status(200).json(featuredBooks);
  } catch (error) {
    console.error("Error al obtener libros destacados:", error);
    res.status(500).json({ message: "Error al obtener libros destacados" });
  }
};

// Crear un nuevo libro
const createBook = async (req, res) => {
  try {
    const { title, author, category, type, stock, available, image } = req.body;

    // Crea un nuevo documento (libro)
    const newBook = new Document({
      title,
      author,
      category,
      type,
      stock,
      available,
      image,
    });

    await newBook.save(); // Guarda el libro en la base de datos
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error al crear un libro:", error);
    res.status(500).json({ message: "Error al crear el libro" });
  }
};

// Actualizar un libro por ID
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Encuentra y actualiza el libro
    const updatedBook = await Document.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    res.status(500).json({ message: "Error al actualizar el libro" });
  }
};

// Eliminar un libro por ID
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra y elimina el libro
    const deletedBook = await Document.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.status(200).json({ message: "Libro eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    res.status(500).json({ message: "Error al eliminar el libro" });
  }
};

module.exports = {
  getBooks,
  getFeaturedBooks,
  createBook,
  updateBook,
  deleteBook,
};
