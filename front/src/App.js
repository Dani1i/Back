import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog"; // Importación de la exportación predeterminada
import BookDetails from "./pages/BookDetails";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/book/:title" element={<BookDetails />} /> {/* Usa 'title' como parámetro */}
      </Routes>

    </Router>
  );
};

export default App;

