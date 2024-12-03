import React, { useState, useEffect } from "react";
import { fetchBooks, createBook, updateBook } from "../services/catalogService";


const PrestamosAdmin = () => {
  const [libros, setLibros] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [error, setError] = useState(null);
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

  const [editBook, setEditBook] = useState({
    title: "", // Título del libro a actualizar
    updatedData: {
      author: "",
      category: "",
      type: "",
      stock: 1,
      available: true,
      image: "",
      synopsis: "",
    },
  });
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditBook((prev) => ({
      ...prev,
      updatedData: {
        ...prev.updatedData,
        [name]: value,
      },
    }));
  };
  
  const handleUpdateBook = async (e) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(false);
  
    try {
      await updateBook(editBook.title, editBook.updatedData);
      setUpdateSuccess(true);
      setEditBook({
        title: "",
        updatedData: {
          author: "",
          category: "",
          type: "",
          stock: 1,
          available: true,
          image: "",
          synopsis: "",
        },
      });
    } catch (err) {
      setUpdateError("Error al actualizar el recurso.");
    }
  };
  // Estados para el formulario de añadir recursos
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    type: "",
    stock: 1,
    available: true,
    image: "",
    synopsis: "",
  });
  const [addingError, setAddingError] = useState(null);
  const [addingSuccess, setAddingSuccess] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const books = await fetchBooks();
        setLibros(books);
      } catch (err) {
        setError("Error al cargar los libros.");
      }
    };

    loadBooks();
  }, []);

  const filteredBooks = appliedQuery
    ? libros.filter((libro) => {
        return (
          libro.title.toLowerCase().includes(appliedQuery.toLowerCase()) ||
          libro.author.toLowerCase().includes(appliedQuery.toLowerCase())
        );
      })
    : [];

  const calcularTiempo = (fecha) => {
    const now = new Date();
    const solicitudFecha = new Date(fecha);
    const diff = now - solicitudFecha;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${dias} días, ${horas} horas`;
  };

  const applyFilters = () => {
    setAppliedQuery(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      applyFilters();
    }
  };

  // Manejo del formulario de añadir recursos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setAddingError(null);
    setAddingSuccess(false);

    try {
      await createBook(newBook);
      setAddingSuccess(true);
      setNewBook({
        title: "",
        author: "",
        category: "",
        type: "",
        stock: 1,
        available: true,
        image: "",
        synopsis: "",
      });
      setLibros((prev) => [...prev, newBook]);
    } catch (err) {
      setAddingError("Error al añadir el recurso.");
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
        <form onSubmit={handleAddBook} className="mb-4">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                placeholder="Título"
                className="form-control mb-2"
                required
              />
              <input
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
                placeholder="Autor"
                className="form-control mb-2"
                required
              />
              <input
                type="text"
                name="category"
                value={newBook.category}
                onChange={handleInputChange}
                placeholder="Categoría"
                className="form-control mb-2"
                required
              />
              <input
                type="text"
                name="type"
                value={newBook.type}
                onChange={handleInputChange}
                placeholder="Tipo (book/audio/video)"
                className="form-control mb-2"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="stock"
                value={newBook.stock}
                onChange={handleInputChange}
                placeholder="Cantidad en stock"
                className="form-control mb-2"
                min="1"
              />
              <input
                type="text"
                name="image"
                value={newBook.image}
                onChange={handleInputChange}
                placeholder="URL de la imagen"
                className="form-control mb-2"
              />
              <textarea
                name="synopsis"
                value={newBook.synopsis}
                onChange={handleInputChange}
                placeholder="Sinopsis"
                className="form-control mb-2"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Añadir Recurso
          </button>
        </form>
        {addingError && <p className="text-danger">{addingError}</p>}
        {addingSuccess && <p className="text-success">Recurso añadido con éxito</p>}
      </div>
      <div className="mt-5">
        <h1 className="text-center mb-4">Actualizar recursos</h1>
        <div className="mt-5">
  <form onSubmit={handleUpdateBook} className="mb-4">
    <div className="row">
      <div className="col-md-6">
        <input
          type="text"
          name="title"
          value={editBook.title}
          onChange={(e) => setEditBook((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Título del libro a actualizar"
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="author"
          value={editBook.updatedData.author}
          onChange={handleEditInputChange}
          placeholder="Nuevo Autor"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="category"
          value={editBook.updatedData.category}
          onChange={handleEditInputChange}
          placeholder="Nueva Categoría"
          className="form-control mb-2"
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          name="type"
          value={editBook.updatedData.type}
          onChange={handleEditInputChange}
          placeholder="Nuevo Tipo"
          className="form-control mb-2"
        />
        <input
          type="number"
          name="stock"
          value={editBook.updatedData.stock}
          onChange={handleEditInputChange}
          placeholder="Nuevo Stock"
          className="form-control mb-2"
          min="1"
        />
        <textarea
          name="synopsis"
          value={editBook.updatedData.synopsis}
          onChange={handleEditInputChange}
          placeholder="Nueva Sinopsis"
          className="form-control mb-2"
        />
      </div>
    </div>
    <button type="submit" className="btn btn-primary w-100">
      Actualizar Recurso
    </button>
  </form>
  {updateError && <p className="text-danger">{updateError}</p>}
  {updateSuccess && <p className="text-success">Recurso actualizado con éxito</p>}
</div>
      </div>
    </div>
  );
};

export default PrestamosAdmin;
