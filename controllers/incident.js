
const {Incident} = require('../models/ModelIncident');

const IncidentCreate = async (req, res ) =>{
    try {
        const newIncident = new Incident(req.body);
        await newIncident.save();
        res.status(201).json({message: 'Incidente enviado', data: newIncident})
    } catch (error) {
        res.status(400).json({ message: 'Error al enviar el incidente', error });
    }
}

const getIncident = async (req, res) => {
    try {
        const incidents = await Incident.find().sort({createdAt: 1})
        res.status(200).json({ message: 'Incidentes obtenidos', data: incidents }); 
    } catch (error) {
        res.status(400).json({message: 'Error', error})
    }
}

const getIncidentUser = async (req, res) => {
    try {
        const { user } = req.params; // Obtener el usuario desde los parámetros de la consulta (query string)
        console.log(req.params); // Esto debería mostrar todos los parámetros de consulta en la consola

        let incidents;
        if (user) {
            // Si se proporciona un usuario en la consulta, filtra por el campo "user"
            incidents = await Incident.find({ user }).sort({ createdAt: 1 });
        } else {
            // Si no se proporciona un usuario, obtiene todos los incidentes
            incidents = await Incident.find().sort({ createdAt: 1 });
        }

        res.status(200).json({ message: 'Incidentes obtenidos', data: incidents });
    } catch (error) {
        res.status(400).json({ message: 'Error', error });
    }
};

const getIncidentbyID = async(req, res) => {
    try {
        const { id } = req.params; // Obtener el ID desde los parámetros de la URL
        const incidentFound = await Incident.findById(id); 
        if (!incidentFound) {
            return res.status(404).json({ message: 'Incidente no encontrado' }); // Responder si no se encuentra
        }
        res.status(200).json({message: 'Encontrado', data: incidentFound})
    } catch (error) {
        res.status(400).json({message:'Error',error})
    }
}

const updateIncident = async (req, res) =>{
    try {
        const id = req.params.id;
        const updateData = req.body;
        const incident = await Incident.findByIdAndUpdate(id, updateData, {new: true});
        if (!incident) {
            return res.status(404).json({ message: 'Incidente no encontrado' });
        }
        res.status(200).json({message: 'Update', data: incident})
    } catch (error) {
        res.status(400).json({message: 'Error', error})
    }
}

const deleteIncident = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID desde los parámetros de la URL
 
        // Eliminar el incidente por su ID
        const incidentDelete = await Incident.findByIdAndDelete(id);

        if (!incidentDelete) {
            return res.status(404).json({ message: 'Incidente no encontrado' }); // Si no se encuentra el incidente, se responde con 404
        }

        // Si se encuentra y se elimina, se devuelve la respuesta de éxito
        res.status(200).json({ message: 'Incidente eliminado', data: incidentDelete });
    } catch (error) {
        // En caso de error en la operación, respondemos con 400
        res.status(400).json({ message: 'Error al eliminar el incidente', error });
    }
};



module.exports = {
    IncidentCreate,
    getIncident,
    getIncidentbyID,
    updateIncident,
    deleteIncident,
    getIncidentUser
};

 
