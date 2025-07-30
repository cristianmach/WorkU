import React, { useState } from "react"; 
import { Pocket, UserRoundCheck, ReceiptText, CircleUserRound, LogOut, Bolt, AlignJustify } from "lucide-react"; // Añadir AlignJustify aquí
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirección

const defaultProfilePic = "/default-user.png"; // Imagen por defecto para usuarios sin foto

const PanelLeft = ({ user, handleImageUpload, profilePic, borderColor, handleLogout, isSidebarVisible, togglePanelVisibility }) => {
  return (
    <>
      {/* Botón para pantallas pequeñas */}
      <button
        className="md:hidden fixed top-4 left-2 z-50 p-2 rounded bg-blue-100"
        onClick={togglePanelVisibility}
      >
        <AlignJustify size={25} strokeWidth={1} />
      </button>

      {/* Columna izquierda - Solo en pantallas grandes y medianas */}
      <aside
        className={`flex-col items-center bg-white w-64 p-4 shadow-lg relative overflow-y-auto md:flex ${isSidebarVisible ? 'block' : 'hidden'}`}
      >
        <div className="relative w-24 h-24 mx-auto cursor-pointer group mb-8" onClick={() => document.getElementById('fileInput').click()}>
          <img src="/worku-removebg.png" alt="WorkU" className="w-40 mx-auto mb-2" />
          <img
            src={profilePic || defaultProfilePic}
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
            <UserRoundCheck size={25} strokeWidth={1} />
          </button>
          <button className="w-full md:w-auto p-4 text-center rounded-xl bg-gray-100 hover:bg-blue-100 transition-colors">
            <ReceiptText size={25} strokeWidth={1} />
          </button>
        </div>

        <div className="mt-6 w-full">
          <h3 className="font-semibold mb-2">Chats</h3>
          <ul className="space-y-2">
            <li className="bg-gray-50 p-2 rounded shadow flex items-center justify-start space-x-2 cursor-pointer hover:bg-blue-100">
              <CircleUserRound size={25} strokeWidth={1} />
              <span>User1</span>
            </li>
            <li className="bg-gray-50 p-2 rounded shadow flex items-center justify-start space-x-2 cursor-pointer hover:bg-blue-100">
              <CircleUserRound size={25} strokeWidth={1} />
              <span>User2</span>
            </li>
            <li className="bg-gray-50 p-2 rounded shadow flex items-center justify-start space-x-2 cursor-pointer hover:bg-blue-100">
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
          <button onClick={handleLogout} className="hover:bg-blue-100 p-2 rounded-md">
            <LogOut size={25} strokeWidth={1} />
          </button>
          <button className="hover:bg-blue-100 p-2 rounded-md">
            <Bolt size={25} strokeWidth={1} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default PanelLeft;
