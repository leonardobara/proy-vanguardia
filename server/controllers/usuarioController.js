
const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');

exports.postUsuario = (req, res) => {

    let body = req.body;

    const usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioSaved) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario, error en el lado del cliente',
                errors: err
            });
        }


        res.status(201).json({
            ok: true,
            usuario: usuarioSaved
        });

    });
}


exports.putUsuario = (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, body, (err, usuarioUpdated) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioUpdated) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al buscar medico en BDD, Error en el lado del servidor',
                errors: { message: 'No existe un usuario con ese ID: ' + id }
            });
        }

        usuarioUpdated.nombre = body.nombre;
        usuarioUpdated.email = body.email;
        usuarioUpdated.save();

        res.status(201).json({
            ok: true,
            usuario: usuarioUpdated
        });

    });

}

exports.getUsuarios = (req, res) => {

    var query = {};

    if (req.query.nombre) {
        query.nombre = req.query.nombre;
    }
    Usuario.find(query, (err, usuarios) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err, err
            });
        }

        if (!usuarios) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            usuarios: usuarios
        });

    });

}


exports.getUsuario = (req, res) => {

    var id = req.params.id;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!usuario) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.status(200).json({
            ok: true,
            usuario: usuario
        });

    });

}

exports.deleteUsuario = (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, usuarioDeleted) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!usuarioDeleted) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioDeleted
        });

    });

}
