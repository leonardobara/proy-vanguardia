const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let solicitudSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es requerido!']
    },
    tutor: {
        type: String,
        required: [true, 'El nombre del tutor es necesario']
    },
    email: {
        type: String,
        required: [true, 'El email es necesario para enviarle la cita.']
    },
    identidad: {
        type: String,
        required: [true, 'La identidad del alumno/a es necesaria']
    },
    bolsa: {
        type: String
    },
    carrera: {	
        type: Schema.Types.ObjectId,	
        ref: 'Carrera',	
        required: [true, 'El id de carrera es un campo necesario']
    }

});

module.exports = mongoose.model('Solicitud', solicitudSchema);