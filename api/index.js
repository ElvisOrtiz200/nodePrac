
const express = require('express')

const {IncidentCreate} = require('../controllers/incident')
const {solucion} = require('../controllers/solucion')

const routes = express.Router();




routes.post('/Incidente',IncidentCreate)
routes.get('/solucion',solucion)



module.exports = {
    routes
}