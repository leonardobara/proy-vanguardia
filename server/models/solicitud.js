const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let solicitudSchema = new Schema({

    bolsa: {
        type: String
    },
    /* carrera: {	
        type: Schema.Types.ObjectId,	
        ref: 'Carrera',	
        required: [true, 'El id de carrera es un campo necesario']
    }, */
    alumno: {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'Usuario',
        required: [true, 'El id de alumno es un campo necesario']
    }

});

module.exports = mongoose.model('Solicitud', solicitudSchema);