const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bolsaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es requerido!']
    },
    bolsa: {
        type: String
    }

});

module.exports = mongoose.model('Bolsa', bolsaSchema);