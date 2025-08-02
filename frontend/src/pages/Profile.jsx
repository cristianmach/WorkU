import React, { useState, useEffect } from "react";
import PanelLeft from "../../components/PanelLeft";
import axios from "axios";

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [showNewPostPanel, setShowNewPostPanel] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const togglePanelVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const profilePic = user?.foto_url || "/default-user.png";
  const borderColor = user?.tipo_usuario === "cliente"
    ? "border-blue-500"
    : user?.tipo_usuario === "vendedor"
    ? "border-green-500"
    : "border-gray-300";

  const handleImageUpload = () => {}; // vacío para ahora
  const handleLogout = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/user/${user.id}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Error al obtener publicaciones", err);
      }
    };
    fetchPosts();
  }, [user.id]);

  const handlePostSubmit = async () => {
    if (!newPost && !image) return;

    const formData = new FormData();
    formData.append("titulo", newPost);
    formData.append("userId", user.id);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPosts([response.data, ...posts]);
      setNewPost("");
      setImage(null);
      setShowNewPostPanel(false);
    } catch (error) {
      console.error("Error al subir el post", error);
    }
  };

  return (
    <div className="flex h-screen">
      <PanelLeft
        user={user}
        profilePic={profilePic}
        borderColor={borderColor}
        handleImageUpload={handleImageUpload}
        handleLogout={handleLogout}
        isSidebarVisible={isSidebarVisible}
        togglePanelVisibility={togglePanelVisibility}
      />

      <main className="flex-1 bg-white p-4 overflow-y-auto">
        <div className="flex flex-col items-center">
          <img src={user.foto_url || "/default-user.png"} className="w-24 h-24 rounded-full object-cover border-4 border-blue-400" alt="Perfil" />
          <h2 className="mt-2 font-bold text-xl">{user.nombre}</h2>
          <p className="text-gray-500">@{user.correo.split("@")[0]}</p>
          <button
            onClick={() => setShowNewPostPanel(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Crear Publicación
          </button>
        </div>

        {showNewPostPanel && (
          <div className="mt-6 bg-gray-100 p-4 rounded shadow max-w-lg mx-auto">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="¿Qué estás pensando?"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowNewPostPanel(false)} className="px-4 py-1 bg-gray-300 rounded">Cancelar</button>
              <button onClick={handlePostSubmit} className="px-4 py-1 bg-blue-500 text-white rounded">Publicar</button>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.length === 0 ? (
            <p className="text-center col-span-full text-gray-400">No hay publicaciones aún</p>
          ) : (
            posts.map((post) => (
              <div key={post.id_post} className="bg-white shadow rounded p-4">
                <h3 className="font-semibold mb-2">{post.titulo}</h3>
                {post.imagen && <img src={post.imagen} alt="Post" className="w-full rounded" />}
                <p className="text-sm text-gray-500 mt-2">{new Date(post.fecha_creacion).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
