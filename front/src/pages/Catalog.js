import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCatalog } from "../services/catalogService"; // Llama al servicio para obtener el catálogo

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await getCatalog(); // Llama al backend para obtener los libros
        setBooks(data); // Guarda los datos en el estado
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el catálogo:", error);
      }
    };
    fetchCatalog();
  }, []);

  if (loading) {
    return <p>Cargando catálogo...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Catálogo Completo</h1>
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="col-md-4 mb-4" key={book._id}>
              <div className="card">
                <img
                  src={book.image || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={book.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle text-muted">{book.author}</h6>
                  <p>
                    <span
                      className={`badge ${
                        book.available ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {book.available ? "Disponible" : "No Disponible"}
                    </span>
                  </p>
                  <Link to={`/book/${encodeURIComponent(book.title)}`} className="btn btn-dark">
                    Ver Detalles
                  </Link>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
