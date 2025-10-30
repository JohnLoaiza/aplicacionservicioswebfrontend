import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex gap-6">
      <Link to="/">Inicio</Link>
      <Link to="/tipo-proyecto">Tipo Proyecto</Link>
      <Link to="/tipo-responsable">Tipo Responsable</Link>
      <Link to="/estado">Estado</Link>
      <Link to="/usuarios">Usuarios</Link>
      <Link to="/transformacion-institucional">
        Transformación Institucional
      </Link>
    </nav>
  );
}
