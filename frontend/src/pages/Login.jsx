import React from 'react'
import { useState } from "react";
import axios from "axios";

function Login({ switchForm, onLogin }) {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        correo,
        contraseña,
      });
      onLogin(res.data.user);
    } catch (err) {
      alert("La contraseña o el correo es incorrecto");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
        <img src="/worku-removebg.png" alt="WorkU" className="w-40 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>

        <input className="input" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        <input className="input" type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />

        <button className="btn" onClick={handleLogin}>Entrar</button>

        <p className="text-sm mt-2">
          ¿No tienes cuenta?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={switchForm}>Regístrate</span>
        </p>
      </div>
    </div>
  );

  
}

export default Login;
