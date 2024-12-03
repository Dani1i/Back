import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchFeaturedBooks } from "../services/catalogService"; // Servicio para obtener libros destacados
import "../styles/Home.css";

const Home = () => {
  const [librosDestacados, setLibrosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar libros destacados al montar el componente
  useEffect(() => {
    const loadFeaturedBooks = async () => {
      try {
        const books = await fetchFeaturedBooks();
        setLibrosDestacados(books);
        setLoading(false);
      } catch (err) {
        console.error("Detalles del error al cargar los libros destacados:", err.response || err.message);
        setError("Error al cargar los libros destacados.");
        setLoading(false);
      }
    };    

    loadFeaturedBooks();
  }, []);

  // Manejar redirección al catálogo con filtro de género
  const handleVerMas = (genero) => {
    navigate("/catalog", { state: { generoSeleccionado: genero } });
  };

  // Agrupar libros por género
  const agruparPorGenero = (libros) => {
    return libros.reduce((resultado, libro) => {
      if (!resultado[libro.category]) {
        resultado[libro.category] = [];
      }
      resultado[libro.category].push(libro);
      return resultado;
    }, {});
  };

  if (loading) return <p>Cargando libros destacados...</p>;
  if (error) return <p>{error}</p>;

  const librosPorGenero = agruparPorGenero(librosDestacados);

  return (
    <div>
      {/* Jumbotron */}
      <div
        className="jumbotron text-center"
        style={{
          marginTop: "1rem",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "1rem",
        }}
      >
        <h1>Bienvenido a la Biblioteca BEC</h1>
        <p>Descubre nuestra colección de libros y multimedia.</p>
        <Link to="/catalog" className="btn btn-dark">
          Ver Catálogo Completo
        </Link>
      </div>

      {/* Libros por Género */}
      <div className="container mt-5">
        {Object.keys(librosPorGenero).map((genero) => (
          <div key={genero} className="mb-5">
            <div className="section-container">
              <div className="section-title">
                <h3>{genero}</h3>
              </div>
              <div className="home-line"></div>
              <div className="section-more-info">
                <button
                  className="btn btn-dark"
                  onClick={() => handleVerMas(genero)}
                >
                  Ver más
                </button>
              </div>
            </div>

            {/* Lista de Libros */}
            <div className="row d-flex align-items-center justify-content-center">
              {librosPorGenero[genero]
                .slice(0, 3) // Mostrar hasta 3 libros por género
                .map((libro) => (
                  <div
                    className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-center justify-content-center"
                    key={libro._id}
                  >
                    <Link to={`/book/${libro._id}`} className="text-decoration-none">
                      <div
                        className="card"
                        style={{
                          cursor: "pointer",
                          border: "1px solid #ddd",
                          borderRadius: "10px",
                          overflow: "hidden",
                          padding: "5px",
                          transition: "transform 0.2s",
                          width: "200px",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        {/* Imagen del libro */}
                        <div
                          style={{
                            width: "100%",
                            height: "300px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={libro.image || "default-image.jpg"}
                            alt={libro.title}
                            style={{
                              borderRadius: "12px",
                              width: "200px",
                              height: "300px",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        {/* Título y Autor */}
                        <div className="card-body" style={{ padding: "10px", textAlign: "left" }}>
                          <h5
                            className="card-title text-dark"
                            style={{
                              textTransform: "capitalize",
                              fontSize: "1rem",
                              lineHeight: "1.2",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {libro.title}
                          </h5>
                          <p
                            className="card-text text-dark"
                            style={{
                              fontSize: "0.9rem",
                              lineHeight: "1.2",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {libro.author}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
