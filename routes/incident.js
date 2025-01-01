const express = require('express')

const IncidentController = require('../controllers/incident')

const routes = express.Router();

routes.get("/holaMundo", IncidentController.holaMundo)

module.exports = {
    routes
}


