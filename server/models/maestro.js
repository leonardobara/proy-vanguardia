const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let maestroSchema = new Schema({
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
    img: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('Maestro', maestroSchema);