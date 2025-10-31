import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import TipoProyecto from "../pages/TipoProyecto";
import TipoResponsable from "../pages/TipoResponsable";
import Estado from "../pages/Estado";
import Persona from "../pages/Persona";
import TransformacionInstitucional from "../pages/TransformacionInstitucional";
import "../styles/layout.css";
import { AppRoutes } from "./routes";
import Proyecto from "../pages/Proyecto";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="logo">Gestor</h2>
          <nav className="nav-links">
            <NavLink to={AppRoutes.Dashboard} end>Inicio</NavLink>
            <NavLink to={AppRoutes.Proyecto} end>Proyectos</NavLink>
            <NavLink to={AppRoutes.TipoProyecto}>Tipo Proyecto</NavLink>
            <NavLink to={AppRoutes.TipoResponsable}>Tipo Responsable</NavLink>
            <NavLink to={AppRoutes.Estado}>Estado</NavLink>
            <NavLink to={AppRoutes.Usuarios}>Usuarios</NavLink>
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="main-content">
          <Routes>
            <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
            <Route path={AppRoutes.Proyecto} element={<Proyecto />} />
            <Route path={AppRoutes.TipoProyecto} element={<TipoProyecto />} />
            <Route path={AppRoutes.TipoResponsable} element={<TipoResponsable />} />
            <Route path={AppRoutes.Estado} element={<Estado />} />
            <Route path={AppRoutes.Usuarios} element={<Persona />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
