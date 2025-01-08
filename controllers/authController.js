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
     
        res.status(200).json({ message: 'Login exitoso', token, usuario });
      
    } catch (error) {
        res.status(404).json({message: 'Error al iniciar sesion',error:  error.message})
    }
}

module.exports = {
    login,
    register
}