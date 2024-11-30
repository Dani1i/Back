// routes/catalog.js
const express = require("express");
const router = express.Router();
const Document = require("../modules/Document");

// Ruta para obtener todos los documentos
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find(); // Consulta a la base de datos
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener documentos", error });
  }
});

// Ruta para crear un documento
router.post("/", async (req, res) => {
  const { title, author, category, type, stock } = req.body;

  try {
    const newDocument = new Document({ title, author, category, type, stock });
    await newDocument.save(); // Guardar en la base de datos
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: "Error al crear documento", error });
  }
});

module.exports = router; // Exporta el enrutador
