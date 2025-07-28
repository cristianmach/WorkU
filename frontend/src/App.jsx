import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPanel from "./pages/UserPanel";
import axios from "axios";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);

  // Al iniciar sesión, obtenemos los datos del usuario
  useEffect(() => {
    if (loggedUser) {
      axios.get(`http://localhost:5000/api/auth/user/${loggedUser.id}`)
        .then((response) => {
          setLoggedUser(response.data.user);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [loggedUser]);

  if (loggedUser) return <UserPanel user={loggedUser} setUser={setLoggedUser} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showLogin ? (
        <Login switchForm={() => setShowLogin(false)} onLogin={setLoggedUser} />
      ) : (
        <Register switchForm={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;


