const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware')
const routes = require('./index');
const routesAuth = require('./auth');

const route = express.Router();

route.use('/auth',routesAuth);
route.use('/', authenticateToken,routes);

module.exports = route;