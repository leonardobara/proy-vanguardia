const Maestro = require('../models/maestro');

const bcrypt = require('bcryptjs');

exports.postLogin = (req, res) => {
    
    let body = req.body;

    Maestro.findOne({ email: body.email }, (err, maestroBDD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
        
        if ( !maestroBDD ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o Contrasena invalidos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, maestroBDD.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o Contrasena invalidos'
                }
            });
        }

        res.status(200).json({
            ok: true,
            maestro: maestroBDD
        });

    });
    
}

