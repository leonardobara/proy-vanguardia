const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let carreraSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es requerido!']
    },
    descripcion: {
        type: String,
        required: [true, 'Descripcion necesaria']
    },
    plan: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Carrera', carreraSchema);