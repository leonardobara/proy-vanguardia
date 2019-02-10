const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let alumnoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email necesario']
    }

});

module.exports = mongoose.model('Alumno', alumnoSchema);