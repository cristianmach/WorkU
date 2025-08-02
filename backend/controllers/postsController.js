const db = require("../db");
const multer = require("multer");
const path = require("path");

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Middleware para multer
exports.upload = upload.single("image");

// Crear nueva publicación
exports.createPost = async (req, res) => {
  const { titulo, userId } = req.body;
  let imageUrl = null;

  if (req.file) {
    imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO Post (id_vendedor, titulo, descripcion, imagen) VALUES (?, ?, '', ?)",
      [userId, titulo, imageUrl]
    );
    const newPost = {
      id_post: result.insertId,
      id_vendedor: userId,
      titulo,
      imagen: imageUrl,
      fecha_creacion: new Date().toISOString()
    };
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error al crear post:", err);
    res.status(500).json({ error: "No se pudo crear la publicación" });
  }
};

// Obtener publicaciones por usuario
exports.getUserPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM Post WHERE id_vendedor = ? ORDER BY fecha_creacion DESC", [id]);
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener publicaciones:", err);
    res.status(500).json({ error: "No se pudieron obtener las publicaciones" });
  }
};
