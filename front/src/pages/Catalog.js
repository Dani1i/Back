import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchBooks } from "../services/catalogService"; // Importar servicio del backend
import Breadcrumb from "../components/Breadcrumb"; // Migas de pan
import "../styles/Catalog.css";

const Catalog = () => {
  const location = useLocation();

  // Estados para búsqueda, filtros y datos
  const [libros, setLibros] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  console.log("Libros cargados:", libros);
  console.log("Categorías de los libros:", libros.map((libro) => libro.category));


  // Calcular géneros únicos
  const genres = [...new Set(libros.map((libro) => libro.category))];
  console.log("Géneros disponibles:", genres); // Verificación aquí

  // Obtener libros desde el backend al montar el componente
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const books = await fetchBooks();
        setLibros(books);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los libros:", err);
        setError("Error al cargar los libros.");
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  // Actualizar el género preseleccionado si viene desde otra página
  useEffect(() => {
    if (location.state?.generoSeleccionado) {
      setSelectedGenre(location.state.generoSeleccionado);
    }
  }, [location.state]);

  // Filtrar los libros dinámicamente
  const filteredBooks = libros.filter((libro) => {
    return (
      (libro.title.toLowerCase().includes(appliedQuery.toLowerCase()) ||
        libro.author.toLowerCase().includes(appliedQuery.toLowerCase())) &&
      (!showAvailableOnly || libro.available) &&
      (selectedGenre === "" || libro.category === selectedGenre)
    );
  });

  // Aplicar filtros al hacer clic o presionar Enter
  const applyFilters = () => {
    setAppliedQuery(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      applyFilters();
    }
  };

  // Configuración de las migas de pan
  const breadcrumbItems = [
    { label: "Inicio", path: "/", active: false },
    { label: "Catálogo", path: "/catalog", active: true },
  ];

  if (loading) return <p>Cargando catálogo...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      {/* Migas de Pan */}
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-center mb-4">Catálogo Completo</h1>

      {/* Barra de Búsqueda */}
      <div className="mb-4 d-flex align-items-center">
        <input
          type="text"
          placeholder="Buscar por título o autor"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="form-control"
        />
        <button className="btn btn-dark ms-2" onClick={applyFilters}>
          Buscar
        </button>
      </div>

      {/* Filtros */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Dropdown para Género */}
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            id="dropdownGenero"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedGenre === "" ? "Todos los Géneros" : selectedGenre}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownGenero">
            <li
              onClick={() => setSelectedGenre("")}
              className={`dropdown-item ${selectedGenre === "" ? "active" : ""}`}
            >
              Todos los Géneros
              
            </li>
            {genres.map((genre) => (
              <li
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`dropdown-item ${
                  selectedGenre === genre ? "active" : ""
                }`}
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>

        {/* Checkbox para Disponibilidad */}
        <div className="form-check">
          <input
            type="checkbox"
            id="availableOnly"
            checked={showAvailableOnly}
            onChange={(e) => setShowAvailableOnly(e.target.checked)}
            className="form-check-input"
          />
          <label className="form-check-label" htmlFor="availableOnly">
            Mostrar solo disponibles
          </label>
        </div>
      </div>

      {/* Resultados del Catálogo */}
      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((libro) => (
            <div
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={libro._id}
            >
              <Link to={`/book/${libro._id}`} className="text-decoration-none">
                <div className="card">
                  <img
                    src={libro.image || "default-image.jpg"}
                    className="card-img-top"
                    alt={libro.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{libro.title}</h5>
                    <h6 className="card-subtitle text-muted">{libro.author}</h6>
                    <p>
                      <span
                        className={`badge ${
                          libro.available ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {libro.available ? "Disponible" : "No Disponible"}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
