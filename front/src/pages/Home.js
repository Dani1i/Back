import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const librosDestacados = [
    {
      id: 1,
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      imagen: "https://th.bing.com/th/id/OIP.4jjqK8r4niDGIu1EzysUaAHaL8?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      titulo: "Cien Años de Soledad",
      autor: "Gabriel García Márquez",
      imagen: "https://th.bing.com/th/id/OIP.V_zRhQVc2o3qUvlc7KwpxgHaLT?w=600&h=916&rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      titulo: "1984",
      autor: "George Orwell",
      imagen: "https://th.bing.com/th/id/OIP.8weipgxeZASSI2nt9APKNAAAAA?rs=1&pid=ImgDetMain",
    },
  ];

  return (
    <div>
      {/* Jumbotron */}
      <div
        className="jumbotron text-center text-white"
        style={{
          backgroundColor: "#f5f5dc",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ color: "#4b2e1a" }}>Bienvenido a la Biblioteca BEC</h1>
        <p style={{ color: "#4b2e1a" }}>Descubre nuestra colección de libros y multimedia.</p>
        <Link to="/catalog" className="btn btn-dark">
          Ver Catálogo Completo
        </Link>
      </div>

      {/* Libros Destacados */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Libros Destacados</h2>
        <div className="row">
          {librosDestacados.map((libro) => (
            <div className="col-md-4 mb-4" key={libro.id}>
              <div className="card">
                <img src={libro.imagen} className="card-img-top" alt={libro.titulo} />
                <div className="card-body">
                  <h5 className="card-title">{libro.titulo}</h5>
                  <p className="card-text text-muted">{libro.autor}</p>
                  {/* Botón para ver detalles */}
                  <Link to={`/book/${libro.id}`} className="btn btn-dark">
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
