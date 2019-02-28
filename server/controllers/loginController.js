

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

exports.postLogin = (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioBDD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!usuarioBDD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o Contrasena invalidos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioBDD.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o Contrasena invalidos'
                }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBDD
        });

    });

}

