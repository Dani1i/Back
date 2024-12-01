const mongoose = require("mongoose");
const Document = require("./models/Document"); // Ruta correcta del modelo

// Datos iniciales para poblar la base de datos
const seedData = [
  {
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    category: "Filosofía",
    type: "book",
    stock: 10,
    available: true,
  },
  {
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    category: "Literatura",
    type: "book",
    stock: 5,
    available: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Distopía",
    type: "book",
    stock: 3,
    available: false,
  },
];

// Función para poblar la base de datos
const seedDatabase = async () => {
  try {
    // Conecta a la base de datos
    await mongoose.connect("mongodb://localhost:27017/biblioteca", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conectado a MongoDB");

    // Limpia la colección antes de poblarla
    await Document.deleteMany({});
    console.log("Colección limpiada");

    // Inserta los datos iniciales
    await Document.insertMany(seedData);
    console.log("Datos iniciales insertados");

    // Cierra la conexión
    mongoose.connection.close();
    console.log("Conexión cerrada");
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
    mongoose.connection.close();
  }
};

// Ejecuta la función para poblar la base de datos
seedDatabase();
