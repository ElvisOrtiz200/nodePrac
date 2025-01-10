require('dotenv').config();
const Usuario = require('../models/ModelUser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const SECRET_KEY = process.env.SECRET_KEY;



const register = async (req, res) => {
    const { username, contra, rol } = req.body;
  
    if (!username || !contra) {
      return res.status(400).json({ message: 'Faltan datos requeridos: username o contraseña.' });
    }
  
    try {
      const existingUser = await Usuario.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya está registrado.' });
      }
  
      const hashedPassword = await bcrypt.hash(contra, 10);
  
      const usuario = new Usuario({
        username,
        contra: hashedPassword,
        rol,
        estado : 0
      });
  
      await usuario.save();
  
      res.status(201).json({
        message: 'Usuario registrado exitosamente.',
        usuario: {
          id: usuario._id,
          username: usuario.username,
          rol: usuario.rol
        },
      });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
  
      res.status(500).json({
        message: 'Error al registrar usuario.',
        error: error.message || 'Error desconocido.',
      });
    }
  };
  

  const login = async (req, res) => {
    try {
        const { username, contra } = req.body;
        console.log('Datos recibidos del cliente:', username, contra);

        if (!username || !contra) {
            console.log('Faltan credenciales');
            return res.status(400).json({ message: 'Faltan credenciales' });
        }
        const usuarios = await Usuario.find();
        console.log(usuarios);
        const usuario = await Usuario.findOne({ username });
        console.log('Usuario encontrado en la base de datos:', usuario);

        if (!usuario) {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const esValida = await bcrypt.compare(contra, usuario.contra);

        if (!esValida) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: usuario._id, username: usuario.username },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        console.log('Token generado:', token);

        res.status(200).json({ message: 'Login exitoso', token, usuario });
    } catch (error) {
        console.error('Error en el servidor:', error.message);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

module.exports = {
    login,
    register
}