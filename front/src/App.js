import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog"; // Importación de la exportación predeterminada
import BookDetails from "./pages/BookDetails";
import PrestamosAdmin from "./pages/PrestamosAdmin";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prestamos-admin" element={<PrestamosAdmin />} />
      </Routes>

    </Router>
  );
};

export default App;

