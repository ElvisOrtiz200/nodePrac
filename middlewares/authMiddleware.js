require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

//configurar authorization en el header para que funcione y se verifique
const authenticateToken = (req, res, next) =>{
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado, no se proporcionó el token' });
    }
    //si el token vencio envia el error
    jwt.verify(token, SECRET_KEY, (err, user) =>{
        if(err){
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user;
        next();
    });

}


module.exports = authenticateToken;