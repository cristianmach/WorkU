const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // Nueva ruta para usuario (subida de foto)
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // Rutas para manejar la actualización de la foto de perfil

// Carpeta para servir imágenes subidas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
