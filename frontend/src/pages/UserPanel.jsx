import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const defaultProfilePic = "/default-user.png"; // Imagen por defecto para usuarios sin foto

function UserPanel({ user, setUser }) {
  const [profilePic, setProfilePic] = useState(user?.foto_url || defaultProfilePic);
  const [hovering, setHovering] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("userId", user.id); // Asegúrate de que el ID esté disponible

    try {
      const response = await axios.post("http://localhost:5000/api/users/upload-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedUrl = response.data.foto_url;
      setProfilePic(updatedUrl); // Actualiza la foto de perfil en el estado local
      setUser((prev) => ({ ...prev, foto_url: updatedUrl })); // Actualiza el estado global
    } catch (error) {
      console.error("Error al subir la foto", error);
      alert("No se pudo actualizar la foto");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Botón para pantallas pequeñas */}
      <button
        className="md:hidden fixed top-2 left-2 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        ☰
      </button>

      {/* Columna izquierda */}
      {isSidebarVisible && (
        <aside className="hidden md:flex flex-col items-center bg-white w-64 p-4 shadow-lg relative">
          <div
            className="relative w-24 h-24 mx-auto cursor-pointer group"
            onClick={() => document.getElementById('fileInput').click()}
          >
            <img src="/worku-removebg.png" alt="WorkU" className="w-40 mx-auto mb-4" />
            <img
              src={profilePic}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full hidden group-hover:flex items-center justify-center text-white text-sm">
              Cambiar
            </div>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <h2 className="mt-2 font-bold text-lg">{user?.nombre || "Usuario"}</h2>
          <p className="text-sm text-center">Lorem ipsum dolor sit amet consectetur...</p>

          <div className="mt-4 space-y-2 w-full">
            <button className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200">📁 Publicaciones guardadas</button>
            <button className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200">👥 Seguidores</button>
            <button className="w-full text-left p-2 rounded bg-gray-100 hover:bg-gray-200">📄 Contratos</button>
          </div>

          <div className="mt-6 w-full">
            <h3 className="font-semibold mb-2">Chats</h3>
            <ul className="space-y-2">
              <li className="bg-gray-50 p-2 rounded shadow">💬 User1</li>
              <li className="bg-gray-50 p-2 rounded shadow">💬 User2</li>
            </ul>
          </div>

          <div className="mt-6 w-full">
            <h3 className="font-semibold mb-2">KPIs</h3>
            <div className="bg-gray-100 p-4 rounded">📊 Aquí irán tus estadísticas</div>
          </div>
        </aside>
      )}

      {/* Columna central */}
      <main className="flex-1 flex flex-col bg-gray-50 p-4 overflow-y-auto">
        {/* Carrusel tipo historias */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-16 h-16 rounded-full border-4 border-blue-400 flex-shrink-0 bg-white shadow"></div>
          ))}
        </div>

        {/* Barra de herramientas */}
        <div className="flex justify-between items-center bg-white p-2 rounded shadow mb-4">
          <input type="text" placeholder="Buscar..." className="border p-1 rounded w-1/2" />
          <div className="flex items-center space-x-4">
            <button className="text-xl">👤</button>
            <button className="text-xl">➕</button>
            <button className="text-xl">🔔</button>
          </div>
        </div>

        {/* Aquí podrían ir las publicaciones futuras */}
        <div className="text-center text-gray-400">No hay publicaciones aún</div>
      </main>

      {/* Columna derecha */}
      <aside className="hidden lg:flex flex-col w-72 p-4 bg-white shadow-lg">
        <Calendar className="mb-4" />
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="font-bold">Sponsor</h3>
          <p className="text-sm">Publicidad de empresas destacadas</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold">Ranking de tu nicho</h3>
          <ol className="text-sm list-decimal pl-4">
            <li>Empresa A</li>
            <li>Empresa B</li>
            <li>Profesional C</li>
          </ol>
        </div>
      </aside>
    </div>
  );
}

export default UserPanel;
