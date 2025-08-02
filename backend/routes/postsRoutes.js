const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// Crear nueva publicación
router.post("/", postsController.upload, postsController.createPost);

// Obtener publicaciones por usuario
router.get("/user/:id", postsController.getUserPosts);

module.exports = router;
