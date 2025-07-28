const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db"); // Conexión a base de datos
const router = express.Router();

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: "uploads/", // Carpeta donde se guardarán las imágenes
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Genera un nombre único
  }
});

const upload = multer({ storage });

// Ruta para actualizar la foto de perfil del usuario
router.post("/upload-photo", upload.single("foto"), async (req, res) => {
  try {
    const foto_url = `http://localhost:5000/uploads/${req.file.filename}`;
    const { userId } = req.body; // Asegúrate de enviar el ID del usuario desde el frontend

    // Actualiza la foto en la base de datos
    await db.execute("UPDATE Usuario SET foto_url = ? WHERE id_usuario = ?", [foto_url, userId]);

    // Responde con la nueva URL de la foto
    res.json({ foto_url });
  } catch (error) {
    console.error("Error al actualizar la foto:", error);
    res.status(500).json({ error: "No se pudo actualizar la foto" });
  }
});

module.exports = router;
