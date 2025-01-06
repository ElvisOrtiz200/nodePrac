
const express = require('express');
const {register, login} = require('../controllers/authController')
const routesAuth = express.Router();

routesAuth.post('/register',register);
routesAuth.post('/login',login);

module.exports = routesAuth;
