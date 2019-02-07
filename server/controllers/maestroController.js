
const Maestro = require('../models/maestro');

const bcrypt = require('bcryptjs');

exports.postMaestro = (req, res) => {
    
    let body = req.body;

    const maestro = new Maestro({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img
    });

    maestro.save( (err, maestroSaved) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al crear maestro, error en el lado del cliente',
                errors: err
            });
        }


        res.status(201).json({
            ok: true,
            mestro: maestroSaved
        });

    });
}


exports.putMaestro = (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Maestro.findById(id, body, (err, maestroUpdated) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar maestro',
                errors: err
            });
        }

        if (!maestroUpdated) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al buscar medico en BDD, Error en el lado del servidor',
                errors: { message: 'No existe un maestro con ese ID: ' + id }
            });
        }

        maestroUpdated.nombre = body.nombre;
        maestroUpdated.email = body.email;
        maestroUpdated.save();

        res.status(201).json({
            ok: true,
            maestro: maestroUpdated
        });

    });

}

exports.getMaestros = (req, res) => {

    var query = {};

    if (req.query.nombre) {
        query.nombre = req.query.nombre;
    }
    Maestro.find(query, (err, maestros) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err, err
            });
        }

        if (!maestros) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            maestro: maestros
        });

    });

}


exports.getMaestro = (req, res) => {

    var id = req.params.id;

    Maestro.findById(id, (err, maestro) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!maestro) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            maestro: maestro
        });

    });

}

exports.deleteMaestro =  (req, res) => {
    var id = req.params.id;

    Maestro.findByIdAndDelete(id, (err, maestroDeleted) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!maestroDeleted) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(201).json({
            ok: true,
            maestro: maestroDeleted
        });

    });

}
