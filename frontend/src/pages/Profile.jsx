import React, { useState } from "react";
import PanelLeft from "../../components/PanelLeft"; // Asegúrate de importar PanelLeft correctamente
import axios from "axios";

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);

  // Función para subir un post
  const handlePostSubmit = async () => {
    if (!newPost) return;

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
      setPosts([...posts, response.data]);
      setNewPost("");
      setImage(null);
    } catch (error) {
      console.error("Error al subir el post", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Panel izquierdo */}
      <PanelLeft user={user} setUser={() => {}} handleLogout={() => {}} />
      
      {/* Columna derecha - Perfil */}
      <main className="flex-1 flex flex-col bg-gray-50 p-4">
        <h1 className="text-2xl font-semibold">Perfil de {user.nombre}</h1>

        {/* Formulario para agregar un post */}
        <div className="mt-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Escribe tu post..."
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-2"
          />
          <button
            onClick={handlePostSubmit}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Subir Post
          </button>
        </div>

        {/* Mostrar los posts */}
        <div className="mt-6">
          {posts.map((post) => (
            <div key={post.id} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold">{post.titulo}</h3>
              {post.image && <img src={post.image} alt="Post" className="w-full mt-2" />}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Profile;
