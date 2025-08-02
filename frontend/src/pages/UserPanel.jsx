import React, { useState } from "react"; 
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { Pocket, UserRoundCheck, ReceiptText, CircleUserRound, AlignJustify, LogOut, Bolt, SquarePen, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirección

const defaultProfilePic = "/default-user.png"; // Imagen por defecto para usuarios sin foto

function UserPanel({ user, setUser }) {
  const navigate = useNavigate(); // Hook de redirección
  const [profilePic, setProfilePic] = useState(user?.foto_url || defaultProfilePic);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Inicialmente oculto
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);

  // Función para manejar la subida de imagen
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("userId", user.id); // Asegúrate de que user.id está disponible

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

  // Determinar el color de borde según el tipo de usuario
  const borderColor = user?.tipo_usuario === "cliente" ? "border-blue-500" : user?.tipo_usuario === "vendedor" ? "border-green-500" : "border-gray-300";

  // Función para mostrar/ocultar los paneles
  const togglePanelVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setIsRightPanelVisible(!isRightPanelVisible);
  };

  // Cerrar sesión y redirigir a login
  const handleLogout = () => {
    setUser(null); // Eliminar el usuario de la sesión
    navigate("/"); // Redirigir al login
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Botón para pantallas pequeñas */}
      <button
        className="md:hidden fixed top-4 left-2 z-50 p-2 rounded bg-blue-100"
        onClick={togglePanelVisibility} // Este es el único botón que controlará la visibilidad de los paneles
      >
        <AlignJustify size={25} strokeWidth={1} />
      </button>

      {/* Columna izquierda */}
      <aside className={`md:flex flex-col items-center bg-white w-64 p-4 shadow-lg relative ${isSidebarVisible ? 'block' : 'hidden md:block'} overflow-y-auto`}>
        <div
          className="relative w-24 h-24 mx-auto cursor-pointer group mb-8"
          onClick={() => document.getElementById('fileInput').click()}
        >
          <img src="/worku-removebg.png" alt="WorkU" className="w-40 mx-auto mb-2" />
          <img
            src={profilePic}
            alt="Foto de perfil"
            className={`w-24 h-24 rounded-full object-cover border ${borderColor} shadow-lg`}
          />
          <div className="flex inset-0 bg-black bg-opacity-40 rounded-full hidden group-hover:flex items-center justify-center text-white text-sm">
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
        <div className="mt-2 items-center justify-center text-center">
          <h2 className="mt-2 font-bold text-lg">{user?.nombre || "Usuario"}</h2>
          <p className="text-sm">Lorem ipsum dolor sit amet consectetur...</p>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center space-y-2 w-full md:flex-row md:space-x-4 md:space-y-0">
          <button className="w-full md:w-auto p-4 text-center rounded-xl bg-gray-100 hover:bg-blue-100 transition-colors">
            <Pocket size={25} strokeWidth={1} />
          </button>
          <button className="w-full md:w-auto p-4 text-center rounded-xl bg-gray-100 hover:bg-blue-100 transition-colors">
            <UserRoundCheck size={25} strokeWidth={1} className="items-center justify-center "/>
          </button>
          <button className="w-full md:w-auto p-4 text-center rounded-xl bg-gray-100 hover:bg-blue-100 transition-colors">
            <ReceiptText size={25} strokeWidth={1} />
          </button>
        </div>

        <div className="mt-6 w-full">
          <h3 className="font-semibold mb-2">Chats</h3>
          <ul className="space-y-2">
            <li
              className="bg-gray-50 p-2 rounded shadow flex items-center justify-start space-x-2 cursor-pointer hover:bg-blue-100"
              onClick={() => alert("Abrir chat con User1")}
            >
              <CircleUserRound size={25} strokeWidth={1} />
              <span>User1</span>
            </li>
            <li
              className="bg-gray-50 p-2 rounded shadow flex items-center justify-start space-x-2 cursor-pointer hover:bg-blue-100"
              onClick={() => alert("Abrir chat con User2")}
            >
              <CircleUserRound size={25} strokeWidth={1} />
              <span>User2</span>
            </li>
            <li
              className="bg-gray-50 p-2 rounded shadow flex items-center justify-start space-x-2 cursor-pointer hover:bg-blue-100"
              onClick={() => alert("Abrir chat con User3")}
            >
              <CircleUserRound size={25} strokeWidth={1} />
              <span>User3</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 w-full">
          <h3 className="font-semibold mb-2">KPIs</h3>
          <div className="bg-gray-100 p-4 rounded">📊 Aquí irán tus estadísticas</div>
        </div>

        {/* Botones de logout en dispositivos pequeños */}
        <div className="md:hidden flex justify-around mt-6 mb-4">
          <button
            onClick={handleLogout}
            className="hover:bg-blue-100 p-2 rounded-md"
          >
            <LogOut size={25} strokeWidth={1} />
          </button>
          <button
            className="hover:bg-blue-100 p-2 rounded-md"
          >
            <Bolt size={25} strokeWidth={1} />
          </button>
        </div>
      </aside>

      {/* Columna central */}
      <main className="flex-1 flex flex-col bg-gray-50 p-4 overflow-y-auto">
        {/* Carrusel tipo historias */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-16 h-16 rounded-full border-4 border-blue-400 flex-shrink-0 bg-white shadow"></div>
          ))}
        </div>

        {/* Barra de herramientas */}
        <div className="flex justify-between items-center bg-white p-2 rounded shadow mb-4 md:px-4">
          <input type="text" placeholder="Buscar..." className="border p-1 rounded-xl w-full md:mx-2" />
          <div className="flex items-center space-x-4">
            <button
              className="text-xl"
              onClick={() => navigate("/profile")}
            >
              <CircleUserRound size={25} strokeWidth={1} />
            </button>
            <button className="text-xl"><SquarePen size={25} strokeWidth={1} /></button>
            <button className="text-xl"><Bell size={25} strokeWidth={1} /></button>
          </div>
        </div>

        {/* Aquí podrían ir las publicaciones futuras */}
        <div className="text-center text-gray-400">No hay publicaciones aún</div>
      </main>

      {/* Columna derecha */}
      {isRightPanelVisible && (
        <aside className="hidden lg:flex flex-col w-72 p-4 bg-white shadow-lg">
          {/* Botones de cerrar sesión y configuración */}
          <div className="flex justify-around mb-4">
            <button
              className="hover:bg-blue-100 p-2 rounded-md"
            >
              <AlignJustify size={25} strokeWidth={1} />
            </button>

            <button
              className="hover:bg-blue-100 p-2 rounded-md"
            >
              <Bolt size={25} strokeWidth={1} />
            </button>

            <button
              onClick={handleLogout}
              className="hover:bg-blue-100 p-2 rounded-md"
            >
              <LogOut size={25} strokeWidth={1} />
            </button>

          </div>

          <Calendar className="mb-4 rounded-xl" />
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
      )}
    </div>
  );
}

export default UserPanel;