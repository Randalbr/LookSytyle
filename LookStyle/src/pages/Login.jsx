import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/authService.js";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/admin/"); // redirige al Home
      } else {
        setError(response.error || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Tu correo"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Entrar</button>
        <br /><br />
        <p>Volver al inicio has <a href="/">Click Aqui</a></p>
      </form>
    </div>
  );
}
