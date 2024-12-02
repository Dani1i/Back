import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBookById } from "../services/catalogService"; // Servicio para obtener un libro por ID
import Breadcrumb from "../components/Breadcrumb"; // Componente de migas de pan

const BookDetails = () => {
  const { id } = useParams(); // Obtén el ID del libro desde la URL
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los detalles del libro al montar el componente
  useEffect(() => {
    const loadBookDetails = async () => {
      try {
        const fetchedBook = await fetchBookById(id); // Solicitar datos al backend
        setLibro(fetchedBook);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar el libro:", err);
        setError("No se pudo cargar el libro.");
        setLoading(false);
      }
    };

    loadBookDetails();
  }, [id]);

  // Mostrar mensaje de carga o error
  if (loading) return <p>Cargando detalles del libro...</p>;
  if (error) return <p>{error}</p>;
  if (!libro) return <p>Libro no encontrado.</p>;

  // Configuración de las migas de pan
  const breadcrumbItems = [
    { label: "Inicio", path: "/", active: false },
    { label: "Catálogo", path: "/catalog", active: false },
    { label: libro.title, path: `/book/${id}`, active: true },
  ];

  return (
    <div className="container mt-5">
      {/* Migas de Pan */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Detalles del Libro */}
      <div
        className="d-flex flex-column flex-md-row align-items-start"
        style={{
          padding: "20px",
        }}
      >
        {/* Imagen del libro */}
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
            marginRight: "20px",
          }}
        >
          <img
            src={libro.image || "default-image.jpg"}
            alt={libro.title}
            style={{
              maxHeight: "600px",
              maxWidth: "100%",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Detalles del libro */}
        <div
          style={{
            flex: "1",
            display: "flex",
            textAlign: "left",
            flexDirection: "column",
          }}
        >
          <h1>{libro.title}</h1>
          <h7 className="text-muted">{libro.author}</h7>
          <h7>
            <strong>Género:</strong> {libro.category}
          </h7>
          <p>
            <strong>Sinopsis:</strong> {libro.synopsis}
          </p>
          <p>
            <strong>Estado: </strong>
            <span
              className={`badge ${
                libro.available ? "bg-success" : "bg-danger"
              }`}
            >
              {libro.available ? "Disponible" : "No Disponible"}
            </span>
          </p>

          {/* Botón de Reservar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              className="btn btn-primary"
              disabled={!libro.available}
              onClick={() => alert(`Has reservado: ${libro.title}`)}
              style={{
                cursor: libro.available ? "pointer" : "not-allowed",
                opacity: libro.available ? "1" : "0.6",
              }}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
