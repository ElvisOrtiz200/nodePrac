
const express = require('express')

const {IncidentCreate, getIncidentbyID, getIncident, deleteIncident, updateIncident, getIncidentUser} = require('../controllers/incident')
const {solucion} = require('../controllers/solucion')

const routes = express.Router();

routes.post('/incident', IncidentCreate);
routes.get('/incident/:id', getIncidentbyID);
routes.get('/incidents', getIncident);
routes.get('/incidents/:user', getIncidentUser);
routes.delete('/incident/:id', deleteIncident);
routes.put('/incident/:id', updateIncident);





routes.get('/solucion',solucion)

 

module.exports = routes;
