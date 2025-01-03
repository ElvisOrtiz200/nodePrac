
const {Incident} = require('../models/Incident');

const IncidentCreate = async (req, res ) =>{
    try {
        const newIncident = new Incident(req.body);
        await newIncident.save();
        res.status(201).json({message: 'Incidente enviado', data: newIncident})
    } catch (error) {
        res.status(400).json({ message: 'Error al enviar el incidente', error });
    }
}

module.exports = {
    IncidentCreate
};


