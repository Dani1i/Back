const express = require("express");
const Document = require("../models/Document");

const router = express.Router();

// Obtener todos los documentos
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error al obtener los documentos:", error);
    res.status(500).json({ message: "Error al obtener los documentos", error });
  }
});

// Crear un documento
router.post("/", async (req, res) => {
  const { title, author, category, type, stock } = req.body;
  try {
    const newDocument = new Document({ title, author, category, type, stock });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    console.error("Error al crear el documento:", error);
    res.status(500).json({ message: "Error al crear el documento", error });
  }
});


router.get("/title/:title", async (req, res) => {
  const { title } = req.params; // Obtén el título desde los parámetros
  try {
    const document = await Document.findOne({ title: { $regex: `^${title}$`, $options: "i" } }); // Busca el título exacto, ignorando mayúsculas y minúsculas
    if (!document) {
      return res.status(404).json({ message: "Documento no encontrado" });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error("Error al obtener el documento:", error);
    res.status(500).json({ message: "Error al obtener el documento", error });
  }
});



module.exports = router;
