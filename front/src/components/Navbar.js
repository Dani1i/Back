// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/Navbar.css";
// import logo from '../assets/logo.png';

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/" style={{fontWeight: "bold"}}>
//           <img src={logo} alt="logo" style={{width: "60px", paddingLeft: "0.6rem", paddingRight: "0.6rem"}}/>
//           BEC
//         </Link>
//         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav w-100 mb-2 mb-lg-0 align-items-center justify-content-center justify-content-lg-start">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Inicio
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/catalog">
//                 Catálogo Completo
//               </Link>
//             </li>
//           </ul>
//           <div className="nav-login ms-lg-auto d-flex justify-content-center">
//             <Link className="nav-link d-flex align-items-center" to="/login">
//               <i className="bi bi-person-circle"></i> Ingresar
//             </Link>
//           </div>
//         </div>




//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from '../assets/logo.png';

const Navbar = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Constante con la contraseña correcta
  const ADMIN_PASSWORD = "admin123";

  // Función para manejar la validación y redirección
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      navigate("/prestamos-admin"); // Redirige a la sección específica
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* Logo y Título */}
        <Link className="navbar-brand" to="/" style={{ fontWeight: "bold" }}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "60px",
              paddingLeft: "0.6rem",
              paddingRight: "0.6rem",
            }}
          />
          BEC
        </Link>

        {/* Botón Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de Navegación */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Opciones Centrales */}
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center justify-content-center w-100">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalog">
                Catálogo
              </Link>
            </li>
          </ul>

          {/* Campo de Contraseña */}
          <form
            className="d-flex align-items-center ms-lg-auto"
            onSubmit={handlePasswordSubmit}
          >
            <input
              type="password"
              className="form-control me-2"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ maxWidth: "200px" }}
            />
            <button className="btn btn-primary" type="submit">
              Acceder
            </button>
          </form>

          {/* Login */}
          <div className="nav-login ms-lg-auto d-flex justify-content-center">
            <Link className="nav-link d-flex align-items-center" to="/login">
              <i className="bi bi-person-circle"></i> Ingresar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;