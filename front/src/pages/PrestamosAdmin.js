import React, { useState, useEffect } from "react";
import { fetchBooks } from "../services/catalogService";

const PrestamosAdmin = () => {
  const solicitudesData = [
    {
      id: 1,
      usuario: "Juan Pérez",
      correo: "juanperez@gmail.com",
      libro: "1984",
      fechaSolicitud: "2024-11-25T10:00:00Z",
      estado: "Pendiente",
    },
    {
      id: 2,
      usuario: "María López",
      correo: "marialopez@gmail.com",
      libro: "El Principito",
      fechaSolicitud: "2024-11-20T14:30:00Z",
      estado: "Aprobado",
    },
    {
      id: 3,
      usuario: "Carlos Gómez",
      correo: "carlosgomez@gmail.com",
      libro: "Cien Años de Soledad",
      fechaSolicitud: "2024-11-23T09:15:00Z",
      estado: "Pendiente",
    },
    {
      id: 4,
      usuario: "Ana Martínez",
      correo: "anamartinez@gmail.com",
      libro: "La Odisea",
      fechaSolicitud: "2024-11-22T16:45:00Z",
      estado: "Rechazado",
    },
    {
      id: 5,
      usuario: "Luis Ramírez",
      correo: "luisramirez@gmail.com",
      libro: "Fahrenheit 451",
      fechaSolicitud: "2024-11-21T14:00:00Z",
      estado: "Aprobado",
    },
  ];

	const [libros, setLibros] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [error, setError] = useState(null);

	useEffect(() => {
    const loadBooks = async () => {
      try {
        const books = await fetchBooks();
        console.log("Libros cargados:", books); // Depura los libros cargados
        setLibros(books); // Asegúrate de que `books` es un arreglo
      } catch (err) {
        console.error("Error al cargar los libros:", err);
        setError("Error al cargar los libros.");
      }
    };

    loadBooks();
  }, []);

	// const filteredBooks = libros.filter((libro) => {
  //   return (
  //     (libro.title.toLowerCase().includes(appliedQuery.toLowerCase()) ||
  //       libro.author.toLowerCase().includes(appliedQuery.toLowerCase()))
  //   );
  // });

	const filteredBooks = appliedQuery
  ? libros.filter((libro) => {
      return (
        libro.title.toLowerCase().includes(appliedQuery.toLowerCase()) ||
        libro.author.toLowerCase().includes(appliedQuery.toLowerCase())
      );
    })
  : [];

  // Calcular tiempo transcurrido
  const calcularTiempo = (fecha) => {
    const now = new Date();
    const solicitudFecha = new Date(fecha);
    const diff = now - solicitudFecha; // Diferencia en milisegundos
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${dias} días, ${horas} horas`;
  };

   // Aplicar filtros al hacer clic o presionar Enter
  const applyFilters = () => {
    setAppliedQuery(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      applyFilters();
    }
  };

  return (
    <div className="container">
        <div className="mt-5">
            <h1 className="text-center mb-4">Administración de Préstamos</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>Libro</th>
                    <th>Fecha de Solicitud</th>
                    <th>Tiempo Transcurrido</th>
                    <th>Estado</th>
                </tr>
                </thead>
                <tbody>
                {solicitudesData.map((solicitud) => (
                    <tr key={solicitud.id}>
                    <td>{solicitud.id}</td>
                    <td>{solicitud.usuario}</td>
                    <td>{solicitud.correo}</td>
                    <td>{solicitud.libro}</td>
                    <td>{new Date(solicitud.fechaSolicitud).toLocaleString()}</td>
                    <td>{calcularTiempo(solicitud.fechaSolicitud)}</td>
                    <td>
                        <span
                        className={`badge ${
                            solicitud.estado === "Aprobado"
                            ? "bg-success"
                            : solicitud.estado === "Pendiente"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                        >
                        {solicitud.estado}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <div className="mt-5">
            <h1 className="text-center mb-4">Añadir recursos</h1>
            <h5 className="text-center mb-4">Próximamente</h5>
        </div>
        <div className="mt-5">
            <h1 className="text-center mb-4">Actualizar recursos</h1>
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
						<div className="row">
							{filteredBooks.length > 0 ? (
								filteredBooks.map((libro) => (
									<div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-center justify-content-center" key={libro.id}>
										<div
															className="card"
															style={{
																cursor: "pointer",
																border: "1px solid #ddd",
																borderRadius: "10px",
																overflow: "hidden",
																padding: "5px",
																transition: "transform 0.2s",
																width: "200px", // Ancho fijo para la card
															}}
															onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
															onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
														>
															{/* Imagen del libro */}
															<div
																style={{
																	width: "100%",
																	height: "300px", // Altura fija para el contenedor
																	display: "flex",
																	justifyContent: "center",
																	alignItems: "center",
																	overflow: "hidden", // Asegurar que la imagen no se salga del contenedor
																}}
															>
																<img
																	src={libro.image}
																	alt={libro.title}
																	style={{
																		borderRadius: "12px",
																		width: "200px", // Ancho fijo
																		height: "300px", // Alto fijo
																		objectFit: "cover", // Asegurar que la imagen cubra todo el contenedor sin deformarse
																	}}
																/>
															</div>

															{/* Título debajo */}
															<div
																className="card-body"
																style={{
																	padding: "10px",
																	textAlign: "left", // Alineación a la izquierda
																}}
															>
																<h5
																	className="card-title text-dark"
																	style={{
																		textTransform: "capitalize", // camelCase
																		fontSize: "1rem",
																		lineHeight: "1.2", // Altura para dos líneas (1.2rem * 2 líneas)
																		overflow: "hidden", // Esconder el texto adicional
																		textOverflow: "ellipsis", // Mostrar "..." al final del texto
																		whiteSpace: "nowrap", // Evitar saltos de línea
																	}}
																>
																	{libro.title.toLowerCase()}
																</h5>
																<h5
																	className="card-title text-dark"
																	style={{
																		textTransform: "capitalize", // camelCase
																		fontSize: "1rem",
																		lineHeight: "1.2",// Altura para dos líneas (1.2rem * 2 líneas)
																		overflow: "hidden", // Esconder el texto adicional
																		textOverflow: "ellipsis", // Mostrar "..." al final del texto
																		whiteSpace: "nowrap", // Evitar saltos de línea
																	}}
																>
																	{libro.author.toLowerCase()}
																</h5>
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
													</div>
								))
							) : (
								<p className="text-center">Busque un recurso.</p>
							)}
						</div>
        </div>
      
    </div>
  );
};

export default PrestamosAdmin;