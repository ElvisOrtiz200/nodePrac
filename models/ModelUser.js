const mongoose = require('mongoose');


const UsuarioSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true, 
        unique: true
    },
    contra : {
        type : String,
        required : true
    },
    estado : {
        type : String,
        
    }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);