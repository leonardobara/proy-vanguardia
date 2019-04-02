const express = require('express');

// const app = express();

const Solicitud = require('../models/solicitud');


exports.postSolicitud = (bolsa, alumno) => {
    // var carrera = req.params.carrera;
    // var alumno = req.params.alumno;

    const solicitud = new Solicitud({
        bolsa: bolsa,
        alumno: alumno
    });

    solicitud.save();
}

exports.getSolicitudes = (req, res) => {

    Solicitud.find({})
        .populate('alumno')
        .exec((err, solicitudes) => {
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


            return res.status(200).json({
                ok: true,
                solicitudes: solicitudes
            });

        });

}


exports.obtenerSoli = (req, res) => {

    var id = req.params.id;

    Solicitud.findById(id)
        .populate('usuario', 'nombre email')
        .exec((err, solicitudCargada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar solicitud',
                    errors: err
                });
            }

            if (!solicitudCargada) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La solicitud con el id ' + id + ' no existe',
                    errors: { message: 'No existe una solicitud con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                solicitud: solicitudCargada
            });

        });
}


/* exports.putSolicitud = (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Solicitud.findById(id, body, (err, solicitudUpdated) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!solicitudUpdated) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        solicitudUpdated.estado = true;
        solicitudUpdated.save();

        res.status(201).json({
            ok: true,
            solicitud: solicitudUpdated
        });

    });

}

 */