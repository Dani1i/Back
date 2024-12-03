const mongoose = require("mongoose");
const User = require("./models/Users"); // Asegúrate de que la ruta sea correcta

// Datos iniciales para poblar la colección de usuarios
const seedUsers = [
  {
    rut: "12345678-9",
    nombres: "Juan Pérez",
    direccion: "Calle Falsa 123",
    correo: "juan.perez@example.com",
    telefono: "123456789",
    isAdmin: true,
  },
  {
    rut: "98765432-1",
    nombres: "María López",
    direccion: "Avenida Siempre Viva 456",
    correo: "maria.lopez@example.com",
    telefono: "987654321",
    isAdmin: false,
  },
  {
    rut: "11223344-5",
    nombres: "Carlos González",
    direccion: "Pasaje Los Pinos 789",
    correo: "carlos.gonzalez@example.com",
    telefono: "112233445",
    isAdmin: false,
  },
];

// Función para poblar la base de datos
const seedDatabase = async () => {
  try {
    // Conexión a MongoDB
    await mongoose.connect("mongodb+srv://fran:1234@becdb.jbqf3.mongodb.net/BEC?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conectado a MongoDB");

    // Limpia la colección antes de poblarla
    await User.deleteMany({});
    console.log("Colección de usuarios limpiada");

    // Inserta los datos iniciales
    await User.insertMany(seedUsers);
    console.log("Usuarios iniciales insertados");

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
