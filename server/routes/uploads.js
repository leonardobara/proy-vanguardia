const express = require('express');
const fu = require('express-fileupload');

const fs = require('fs');
const Carrera = require('../models/carrera');

const app = express();


app.use(fu());

app.put('/upload/:carrera/:id', (req, res) => {
    var carrera = req.params.carrera;
    var id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe de seleccionar un archivo' }
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.pdf;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Sólo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'jpeg', 'pdf'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida',
            errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    var nombreArchivo = `${ carrera }-${ new Date().getMilliseconds() }.${ extensionArchivo }`; 

    // Mover el archivo del temporal a un path
     var path = `/planes/${ carrera }/${ nombreArchivo }`;

  
    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        subirPorTipo(carrera, id, nombreArchivo, res);
});

});



function subirPorTipo(carrera, id, nombreArchivo, res) {

    if (carrera === 'electricidad1') {
        Carrera.findById(id, (err, carrera) => {

            if (!carrera) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'NO existe'
                    
                });
            }

            var oldPath = '/planes/electricidad1/' + carrera.plan;

            // Si existe, elimina archivo anterior
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
                
                carrera.plan = nombreArchivo;

                carrera.save( (err, carreraActualizada) => {
                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Plan de estudios actualizado',
                        carrera: carreraActualizada
                    });
                });
        });
    }

    if (carrera === 'electricidad2') {
        Carrera.findById(id, (err, carrera) => {

            if (!carrera) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'NO existe'
                    
                });
            }

            var oldPath = '/planes/electricidad2/' + carrera.plan;

            // Si existe, elimina archivo anterior
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync ( oldPath );
            }
                carrera.plan = nombreArchivo;

                carrera.save( (err, carreraActualizada) => {
                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Plan de estudios actualizado',
                        carrera: carreraActualizada
                    });
                });
        });
    }
    
    if (carrera === 'electricidad3') {
        Carrera.findById(id, (err, carrera) => {

            if (!carrera) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'NO existe'
                    
                });
            }

            var oldPath = '/planes/electricidad3/' + carrera.plan;
            

            // Si existe, elimina archivo anterior
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync ( oldPath );
            }
                carrera.plan = nombreArchivo;

                carrera.save( (err, carreraActualizada) => {
                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Plan de estudios actualizado',
                        carrera: carreraActualizada
                    });
                });
        });
    }
}

module.exports = app;