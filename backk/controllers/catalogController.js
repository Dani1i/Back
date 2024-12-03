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
  const { title, author, category, type, stock, available, image, synopsis } = req.body;

  try {
    // Validar campos obligatorios
    if (!title || !author || !category || !type) {
      return res.status(400).json({
        success: false,
        message: "Título, autor, categoría y tipo son campos obligatorios",
      });
    }

    // Crear el documento del libro
    const newBook = new Document({
      title,
      author,
      category,
      type,
      stock: stock || 1, // Valor por defecto: 1
      available: available !== undefined ? available : true, // Por defecto: disponible
      image: image || "https://via.placeholder.com/150", // Imagen por defecto
      synopsis: synopsis || "Sin descripción disponible", // Sinopsis por defecto
    });

    const savedBook = await newBook.save();
    res.status(201).json({
      success: true,
      message: "Libro agregado con éxito",
      data: savedBook,
    });
  } catch (error) {
    console.error("Error al agregar el libro:", error);
    res.status(500).json({
      success: false,
      message: "Error al agregar el libro",
    });
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
