const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let citaSchema = new Schema({
    fecha: {
        type: Date,
        required: [true, 'La fecha y hora de la cita es requerida!!']
    },
    solicitud: {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'Solicitud',
        required: [true, 'El id de solicitud es un campo necesario']
    }

});

module.exports = mongoose.model('Cita', citaSchema);