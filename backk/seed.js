// const mongoose = require("mongoose");
// const fs = require("fs");
// const path = require("path");
// const Document = require("./models/Document"); // Ruta correcta del modelo

// // Función para leer datos desde libros.json
// const loadBooksFromFile = () => {
//   const filePath = path.join(__dirname, "assets", "libros.json");
//   const data = fs.readFileSync(filePath, "utf8");
//   return JSON.parse(data);
// };

// // Función para transformar los datos del archivo al esquema del modelo
// const transformDataToSchema = (books) => {
//   return books.map((book) => ({
//     title: book.titulo,
//     author: book.autor,
//     category: book.genero,
//     type: "book", // Ajuste basado en el esquema
//     stock: book.disponible ? 10 : 0, // Asigna stock basado en disponibilidad
//     available: book.disponible,
//     image: book.imagen, // Agrega la URL de la imagen
//     synopsis: book.sinopsis || "Sinopsis no disponible.", // Agrega el campo de sinopsis
//   }));
// };

// // Función principal para poblar la base de datos
// const seedDatabase = async () => {
//   try {
//     // Conexión a la base de datos
//     await mongoose.connect("mongodb://localhost:27017/biblioteca", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("Conectado a MongoDB");

//     // Limpia la colección antes de poblarla
//     await Document.deleteMany({});
//     console.log("Colección limpiada");

//     // Cargar y transformar datos desde libros.json
//     const books = loadBooksFromFile();
//     const transformedData = transformDataToSchema(books);

//     // Inserta los datos en la base de datos
//     await Document.insertMany(transformedData);
//     console.log("Datos iniciales insertados");

//     // Cierra la conexión
//     mongoose.connection.close();
//     console.log("Conexión cerrada");
//   } catch (error) {
//     console.error("Error al poblar la base de datos:", error);
//     mongoose.connection.close();
//   }
// };

// // Ejecuta la función para poblar la base de datos
// seedDatabase();

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Document = require("./models/Document"); // Ruta correcta del modelo

// Función para leer datos desde libros.json
const loadBooksFromFile = () => {
  const filePath = path.join(__dirname, "assets", "libros.json");
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Función para transformar los datos del archivo al esquema del modelo
const transformDataToSchema = (books) => {
  return books.map((book) => ({
    id: book.id,
    title: book.titulo,
    author: book.autor,
    category: book.genero,
    type: "book",
    stock: book.disponible ? 10 : 0,
    available: book.disponible,
    image: book.imagen,
    synopsis: book.sinopsis || "Sinopsis no disponible.",
  }));
};

// Función principal para poblar la base de datos
const seedDatabase = async () => {
  try {
    // Conexión a MongoDB Atlas
    await mongoose.connect(
      "mongodb+srv://fran:1234@becdb.jbqf3.mongodb.net/BEC?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log("Conectado a MongoDB Atlas");

    // Limpia la colección antes de poblarla
    await Document.deleteMany({});
    console.log("Colección limpiada");

    // Cargar y transformar datos desde libros.json
    const books = loadBooksFromFile();
    const transformedData = transformDataToSchema(books);

    // Inserta los datos en la base de datos
    await Document.insertMany(transformedData);
    console.log("Datos iniciales insertados");

    // Cierra la conexión
    await mongoose.connection.close();
    console.log("Conexión cerrada");
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
    mongoose.connection.close();
  }
};

// Ejecuta la función para poblar la base de datos
seedDatabase();
