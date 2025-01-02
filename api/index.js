
const express = require('express')

const {incident} = require('../controllers/incident')
const {solucion} = require('../controllers/solucion')

const routes = express.Router();


routes.get('/incidente',incident)
routes.get('/solucion',solucion)



module.exports = {
    routes
}