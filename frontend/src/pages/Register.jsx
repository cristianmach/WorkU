import React from 'react'
import { useState } from "react";
import axios from "axios";

function Register({ switchForm }) {
  const [form, setForm] = useState({ nombre: "", correo: "", contraseña: "", tipo_usuario: "cliente" });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Usuario registrado correctamente");
      switchForm();
    } catch (err) {
      alert("Error al registrarse");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-80">
      <img src="/worku-removebg.png" alt="WorkU" className="w-40 mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-4">Registro</h2>
      <input className="input" placeholder="Nombre" onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
      <input className="input" placeholder="Correo" onChange={(e) => setForm({ ...form, correo: e.target.value })} />
      <input className="input" type="password" placeholder="Contraseña" onChange={(e) => setForm({ ...form, contraseña: e.target.value })} />
      <select className="input" onChange={(e) => setForm({ ...form, tipo_usuario: e.target.value })}>
        <option value="cliente">Cliente</option>
        <option value="vendedor">Vendedor</option>
      </select>
      <button className="btn" onClick={handleRegister}>Registrarse</button>
      <p className="text-sm mt-2">¿Ya tienes cuenta? <span className="text-blue-500 cursor-pointer" onClick={switchForm}>Inicia sesión</span></p>
    </div>
  );
}

export default Register;
