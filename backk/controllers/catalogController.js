const Document = require("../models/Document");

// Obtener todos los documentos
const getAllDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    next(error);
  }
};

// Crear un documento
const createDocument = async (req, res, next) => {
  const { title, author, category, type, stock } = req.body;

  try {
    const newDocument = new Document({ title, author, category, type, stock });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDocuments,
  createDocument,
};
