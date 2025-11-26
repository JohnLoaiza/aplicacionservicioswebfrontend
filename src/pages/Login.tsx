import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      console.log("va");

      const response = await UserLogin(email, password);

      if (response != null) {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("exp", response.expiracion);
        sessionStorage.setItem("user", response.usuario);
        navigate("/dashboard");
      } else {
        alert("Usuario o contraseña incorrecto");
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form-box">
        <h2>Iniciar Sesión</h2>

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

        <button type="submit" className="btn-primary">
          Entrar
        </button>

        <p className="form-footer">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </form>
    </div>
  );
}
