const express = require('express');

// const app = express();

const Cita = require('../models/cita');


exports.postCita = (req, res) => {
    // var carrera = req.params.carrera;
    // var alumno = req.params.alumno;

    const cita = new Cita({
        bolsa: bolsa,
        alumno: alumno
    });

    solicitud.save();
}

/* exports.getSolicitudes = (req, res) => {
        
    Solicitud.find( {} )
    .populate('alumno')         
    .exec( (err, solicitudes) => {  
        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!solicitudes) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            solicitud: solicitudes
        });

    });

}


exports.getSolicitud = (req, res) => {

    var id = req.params.id;

    Solicitud.findById(id, (err, solicitud) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!solicitud) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            solicitud: solicitud
        });

    });

} */