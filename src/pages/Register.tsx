import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/auth.css';
import { CreateUser } from "../services/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Aquí llamas tu servicio real
    console.log({
      email,
      password,
    });

    var create = await  CreateUser(email, password)

    if (create != null) {
    alert("Cuenta creada correctamente");
    navigate("/login");
    } else {
        alert('error al crear usuario');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="form-box">
        <h2>Registrarse</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" className="btn-primary">Crear cuenta</button>

        <p className="form-footer">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
}
