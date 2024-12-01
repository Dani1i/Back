import axios from "axios";

const API_URL = "http://localhost:5000/api/catalog";


export const getCatalog = async () => {
  try {
    const response = await axios.get(API_URL); // Llama al backend
    return response.data;
  } catch (error) {
    console.error("Error al cargar el catálogo:", error);
    throw error;
  }
};

export const getDocumentByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/title/${title}`); // Llama al backend con el título
    return response.data;
  } catch (error) {
    console.error("Error al obtener documento:", error);
    throw error;
  }
};

