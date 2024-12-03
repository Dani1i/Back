import React from "react";

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

  // Calcular tiempo transcurrido
  const calcularTiempo = (fecha) => {
    const now = new Date();
    const solicitudFecha = new Date(fecha);
    const diff = now - solicitudFecha; // Diferencia en milisegundos
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${dias} días, ${horas} horas`;
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
            <h1 className="text-center mb-4">Añadir libro</h1>
            <h5 className="text-center mb-4">Próximamente</h5>
        </div>
        <div className="mt-5">
            <h1 className="text-center mb-4">Añadir multimedia</h1>
            <h5 className="text-center mb-4">Próximamente</h5>
        </div>
      
    </div>
  );
};

export default PrestamosAdmin;