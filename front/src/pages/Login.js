import React from "react";
import "../styles/Login.css";

const Login = () => {
  return (
    <div>
        <div className="container mt-5">
            <div className="row">
            {/* Iniciar Sesión */}
            <div className="col-xs-12 col-md-6">
                <div className="login-container">
                <div className="section-title">
                    <h3>Iniciar sesión</h3>
                </div>
                <div className="home-line mt-3 mb-4"></div>
                <form className="mt-2" style={{alignSelf: "center"}}>
                    <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        placeholder="Ingresa tu correo"
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="loginPassword"
                        placeholder="Ingresa tu contraseña"
                    />
                    </div>
                    <button type="submit" className="btn btn-dark w-100">
                    Iniciar Sesión
                    </button>
                </form>
                </div>
            </div>

            {/* Registrarse */}
            <div className="col-xs-12 col-md-6">
                <div className="login-container">
                <div className="section-title">
                    <h3>Registrarse</h3>
                </div>
                <div className="home-line mt-3 mb-4"></div>
                <form className="mt-2" style={{alignSelf: "center"}}>
                    <div className="mb-3">
                    <label htmlFor="registerName" className="form-label">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="registerName"
                        placeholder="Ingresa tu nombre"
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="registerEmail"
                        placeholder="Ingresa tu correo"
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="registerPassword"
                        placeholder="Crea una contraseña"
                    />
                    </div>
                    <button type="submit" className="btn btn-dark w-100">
                    Registrarse
                    </button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>

  );
};

export default Login;