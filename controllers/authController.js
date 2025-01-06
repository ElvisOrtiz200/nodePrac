require('dotenv').config();
const Usuario = require('../models/ModelUser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const SECRET_KEY = process.env.SECRET_KEY;



const register = async (req, res) => {
    const { username, contra } = req.body;
  
    // Validación inicial
    if (!username || !contra) {
      return res.status(400).json({ message: 'Faltan datos requeridos: username o contraseña.' });
    }
  
    try {
      // Comprobar si el usuario ya existe
      const existingUser = await Usuario.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya está registrado.' });
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(contra, 10);
  
      // Crear un nuevo usuario
      const usuario = new Usuario({
        username,
        contra: hashedPassword,
        estado : 0
      });
  
      // Guardar en la base de datos
      await usuario.save();
  
      // Responder con el usuario creado (sin incluir contraseña)
      res.status(201).json({
        message: 'Usuario registrado exitosamente.',
        usuario: {
          id: usuario._id,
          username: usuario.username,
        },
      });
    } catch (error) {
      // Loguear el error en la consola
      console.error('Error al registrar usuario:', error);
  
      // Responder con el mensaje de error
      res.status(500).json({
        message: 'Error al registrar usuario.',
        error: error.message || 'Error desconocido.',
      });
    }
  };
  


const login = async (req, res)=>{
  
    try {
        const {username, contra } = req.body;
        if (!username || !contra) {
            return res.status(400).json({ message: 'Faltan credenciales' });
        }

        const usuario  = await Usuario.findOne({username});
        
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

    

        const esValida = await bcrypt.compare(contra, usuario.contra);
        
        if (!esValida) {
          return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        
                 
        const token = jwt.sign(
            { id: usuario._id, username: usuario.username },
            SECRET_KEY,
            { expiresIn: '1m' }
        );
     
        res.status(200).json({ message: 'Login exitoso', token });
      
    } catch (error) {
        res.status(404).json({message: 'Error al iniciar sesion',error:  error.message})
    }
}

module.exports = {
    login,
    register
}