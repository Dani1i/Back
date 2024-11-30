import React from "react";
import { useParams, Link } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();

  const libros = [
    {
      id: 1,
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      categoria: "Filosofía",
      disponible: true,
      sinopsis:
        "El Principito es una obra clásica que explora la vida, el amor y la amistad desde la perspectiva de un niño.",
      imagen: "https://th.bing.com/th/id/OIP.4jjqK8r4niDGIu1EzysUaAHaL8?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      titulo: "Cien Años de Soledad",
      autor: "Gabriel García Márquez",
      categoria: "Literatura",
      disponible: false,
      sinopsis:
        "Una obra maestra del realismo mágico que narra la historia de la familia Buendía en Macondo.",
      imagen: "https://th.bing.com/th/id/OIP.V_zRhQVc2o3qUvlc7KwpxgHaLT?w=600&h=916&rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      titulo: "1984",
      autor: "George Orwell",
      categoria: "Distopía",
      disponible: true,
      sinopsis:
        "Un relato distópico sobre un mundo donde la vigilancia y el control son absolutos.",
      imagen: "https://th.bing.com/th/id/OIP.8weipgxeZASSI2nt9APKNAAAAA?rs=1&pid=ImgDetMain",
    },
  ];

  const libro = libros.find((book) => book.id === parseInt(id));

  if (!libro) {
    return <p>Libro no encontrado.</p>;
  }

  return (
    <div className="container mt-5">
      <Link to="/catalog" className="btn btn-dark mb-4">
        Volver al Catálogo
      </Link>
      <div
        className="d-flex align-items-start"
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Imagen a la izquierda */}
        <img
          src={libro.imagen}
          alt={libro.titulo}
          style={{
            height: "200px",
            width: "auto",
            borderRadius: "10px",
            marginRight: "20px",
          }}
        />

        {/* Detalles a la derecha */}
        <div>
          <h1>{libro.titulo}</h1>
          <h5 className="text-muted">Autor: {libro.autor}</h5>
          <h6>Categoría: {libro.categoria}</h6>
          <p className="mt-3">{libro.sinopsis}</p>
          <p>
            <strong>Estado:</strong>{" "}
            <span className={`badge ${libro.disponible ? "bg-success" : "bg-danger"}`}>
              {libro.disponible ? "Disponible" : "No Disponible"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
