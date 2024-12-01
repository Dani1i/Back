import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDocumentByTitle } from "../services/catalogService";

const BookDetails = () => {
  const { title } = useParams(); // Obtén el parámetro 'title' desde la URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getDocumentByTitle(title); // Llama al servicio con el título
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el libro:", error);
      }
    };
    if (title) {
      fetchBook();
    }
  }, [title]);

  if (loading) {
    return <p>Cargando libro...</p>;
  }

  if (!book) {
    return <p>Libro no encontrado.</p>;
  }

  return (
    <div className="container mt-5">
      <Link to="/catalog" className="btn btn-dark mb-4">
        Volver al Catálogo
      </Link>
      <h1>{book.title}</h1>
      <h5 className="text-muted">Autor: {book.author}</h5>
      <p>{book.category}</p>
    </div>
  );
};

export default BookDetails;

