import axios from "axios";

// Configuración base de Axios
const api = axios.create({
  baseURL: "http://localhost:5000/api/catalog", // Base URL del backend para el catálogo
});

// Obtener todos los libros
export const fetchBooks = async () => {
  try {
    const response = await api.get("/");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    throw error;
  }
};

// Obtener libros destacados
export const fetchFeaturedBooks = async () => {
  try {
    const response = await api.get("/featured");
    
    // Asegúrate de que la respuesta contenga datos
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("La respuesta no contiene un arreglo válido de libros.");
    }

    return response.data;
  } catch (error) {
    console.error("Error al obtener libros destacados:", error.response?.data || error.message);
    throw error;
  }
};

// Crear un nuevo libro
export const createBook = async (bookData) => {
  try {
    const response = await api.post("/", bookData);
    return response.data;
  } catch (error) {
    console.error("Error al crear un libro:", error);
    throw error;
  }
};

// Actualizar un libro por ID
export const updateBook = async (id, updatedData) => {
  try {
    const response = await api.put(`/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    throw error;
  }
};

// Eliminar un libro por ID
export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    throw error;
  }
};

// Obtener un libro por su ID
export const fetchBookById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el libro:", error);
    throw error;
  }
};