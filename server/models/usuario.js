const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email necesario']
    },
    password: {
        type: String,
        required: [true, 'Password Requerida!']
    },
    role: {
        type: String,
        required: false,
        default: 'ALUMNO_ROLE'
    }

});

module.exports = mongoose.model('Usuario', usuarioSchema);