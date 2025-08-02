const db = require("../db");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { nombre, correo, contraseña, tipo_usuario } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    await db.execute(
      "INSERT INTO Usuario (nombre, correo, contraseña, tipo_usuario) VALUES (?, ?, ?, ?)",
      [nombre, correo, hashedPassword, tipo_usuario]
    );
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const [rows] = await db.execute("SELECT id_usuario AS id, nombre, correo, tipo_usuario, foto_url, contraseña FROM Usuario WHERE correo = ?", [correo]);
    if (rows.length === 0) return res.status(401).json({ error: "Usuario no encontrado" });

    const user = rows[0];
    const match = await bcrypt.compare(contraseña, user.contraseña);
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    res.status(200).json({ message: "Login exitoso", user });
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ error: error.message });
  }  
};
