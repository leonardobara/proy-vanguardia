const express = require('express');

// const app = express();

const Bolsa = require('../models/bolsa');


exports.postBolsa = (req, res) => {

    let body = req.body;

    const bolsa = new Bolsa({
        nombre: body.nombre,
        bolsa: body.bolsa
    });

    bolsa.save((err, bolsaSaved) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!bolsaSaved) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(201).json({
            ok: true,
            bolsa: bolsaSaved
        });

    });
}


exports.putBolsa = (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Bolsa.findById(id, body, (err, bolsaUpdated) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!bolsaUpdated) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        bolsaUpdated.nombre = body.nombre;
        bolsaUpdated.save();

        res.status(201).json({
            ok: true,
            bolsa: bolsaUpdated
        });

    });

}

exports.getBolsas = (req, res) => {

    var query = {};

    if (req.query.nombre) {
        query.nombre = req.query.nombre;
    }
    Bolsa.find(query, (err, bolsas) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!bolsas) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            bolsas: bolsas
        });

    });

}


exports.getBolsa = (req, res) => {

    var id = req.params.id;

    Bolsa.findById(id, (err, bolsa) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!bolsa) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            bolsa: bolsa
        });

    });

}

exports.deleteBolsa = (req, res) => {
    var id = req.params.id;

    Bolsa.findByIdAndDelete(id, (err, bolsaDeleted) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!bolsaDeleted) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(201).json({
            ok: true,
            bolsa: bolsaDeleted
        });

    });

}
