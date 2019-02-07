const express = require('express');

// const app = express();

const Carrera = require('../models/carrera');


exports.postCarrera = (req, res) => {
    
    let body = req.body;

    const carrera = new Carrera({
        nombre: body.nombre,
        descripcion: body.descripcion,
        plan: body.plan
    });

    carrera.save( (err, carreraSaved) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err, err
            });
        }

        if (!carreraSaved) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(201).json({
            ok: true,
            carrera: carreraSaved
        });

    });
}


exports.putCarrera = (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Carrera.findById(id, body, (err, carreraUpdated) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err, err
            });
        }

        if (!carreraUpdated) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        carreraUpdated.nombre = body.nombre;
        carreraUpdated.descripcion = body.descripcion;
        carreraUpdated.save();

        res.status(201).json({
            ok: true,
            carrera: carreraUpdated
        });

    });

}

exports.getCarreras = (req, res) => {

    var query = {};

    if (req.query.nombre) {
        query.nombre = req.query.nombre;
    }
    Carrera.find(query, (err, carreras) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!carreras) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            carrera: carreras
        });

    });

}


exports.getCarrera = (req, res) => {

    var id = req.params.id;

    Carrera.findById(id, (err, carrera) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err, err
            });
        }

        if (!carrera) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            carrera: carrera
        });

    });

}

exports.deleteCarrera =  (req, res) => {
    var id = req.params.id;

    Carrera.findByIdAndDelete(id, (err, carreraDeleted) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err, err
            });
        }

        if (!carreraDeleted) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(201).json({
            ok: true,
            carrera: carreraDeleted
        });

    });

}
