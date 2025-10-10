import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import TipoProyecto from "../pages/TipoProyecto";
import TipoResponsable from "../pages/TipoResponsable";
import Estado from "../pages/Estado";
import Persona from "../pages/Persona";
import TransformacionInstitucional from "../pages/TransformacionInstitucional";
import "../styles/layout.css";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="logo">Gestor</h2>
          <nav className="nav-links">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/tipo-proyecto">Tipo Proyecto</NavLink>
            <NavLink to="/tipo-responsable">Tipo Responsable</NavLink>
            <NavLink to="/estado">Estado</NavLink>
            <NavLink to="/persona">Persona</NavLink>
            <NavLink to="/transformacion-institucional">
              Transformación Institucional
            </NavLink>
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tipo-proyecto" element={<TipoProyecto />} />
            <Route path="/tipo-responsable" element={<TipoResponsable />} />
            <Route path="/estado" element={<Estado />} />
            <Route path="/persona" element={<Persona />} />
            <Route
              path="/transformacion-institucional"
              element={<TransformacionInstitucional />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
