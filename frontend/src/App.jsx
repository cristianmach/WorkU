import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPanel from "./pages/UserPanel";
import Profile from "./pages/Profile";
import axios from "axios";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    if (loggedUser && loggedUser.id) {
      axios.get(`http://localhost:5000/api/auth/user/${loggedUser.id}`)
        .then((response) => {
          setLoggedUser(response.data.user);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [loggedUser?.id]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          loggedUser ? (
            <UserPanel user={loggedUser} setUser={setLoggedUser} />
          ) : (
            showLogin ? (
              <Login switchForm={() => setShowLogin(false)} onLogin={setLoggedUser} />
            ) : (
              <Register switchForm={() => setShowLogin(true)} />
            )
          )
        } />
        {loggedUser && (
          <Route path="/profile" element={<Profile user={loggedUser} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;