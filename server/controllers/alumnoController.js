const express = require('express');

// const app = express();

const Alumno = require('../models/alumno');


exports.postAlumno = (req, res) => {
    
    let body = req.body;

    const alumno = new Alumno({
        nombre: body.nombre,
        email: body.email
    });

    alumno.save( (err, alumnoSaved) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err, err
            });
        }

        if (!alumnoSaved) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(201).json({
            ok: true,
            alumno: alumnoSaved
        });

    });
}


exports.getAlumnos = (req, res) => {

    var query = {};

    if (req.query.nombre) {
        query.nombre = req.query.nombre;
    }
    Alumno.find(query, (err, alumnos) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!alumnos) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            alumno: alumnos
        });

    });

}


exports.getAlumno = (req, res) => {

    var id = req.params.id;

    Alumno.findById(id, (err, alumno) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err, err
            });
        }

        if (!alumno) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            alumno: alumno
        });

    });

}

