const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IncidentSchema = Schema({
    title: {
        type: String,
        required: true  // CORRECCIÓN aquí
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high']  // Opciones predefinidas
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });  // Agrega createdAt y updatedAt automáticamente

const Incident = mongoose.model('Incident', IncidentSchema);

module.exports = {Incident};
