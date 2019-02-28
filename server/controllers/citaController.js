const express = require('express');

// const app = express();

const Cita = require('../models/cita');
const Solicitud = require('../models/solicitud');
const Usuario = require('../models/usuario');

// Handlers
// const mail = require('../handlers/mail');

const nodemailer = require('nodemailer');


exports.postCita = async (req, res) => {
    // var carrera = req.params.carrera;
    try {
        const { body } = req;
        const idAlumno = req.params.alumno;
        const solicitud = await Solicitud.find({ alumno: idAlumno });

        var idSolicitud = solicitud[0]._id;

        const alumno = await Usuario.findById(idAlumno);

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: `instituto taular <noreply@taular.com>`,
            to: alumno.email,
            subject: 'Cita para matricula',
            html: 'Hemos programado una cita para ti',
            text: `Por favor se puntual tu cita queda para las ${body.fecha}`
        };

        transporter.sendMail(mailOptions);

        const cita = new Cita({
            ...body,
            solicitud: idSolicitud
        });

        await cita.save();
        res.sendStatus(201);
    } catch (error) {
        console.log(error);

        res.sendStatus(500);
    }
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