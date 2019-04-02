const express = require('express');
const fu = require('express-fileupload');

const fs = require('fs');
const Carrera = require('../models/carrera');
const Bolsa = require('../models/bolsa');
const solicitudController = require('../controllers/solicitudController');

const app = express();


app.use(fu({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.put('/upload/:carrera', (req, res) => {
    const carrera = req.params.carrera;

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
    var nombreArchivo = `${carrera}-${new Date().getMilliseconds()}.${extensionArchivo}`;

    // Mover el archivo del temporal a un path
    var path = `/planes/${carrera}/${nombreArchivo}`;


    console.log(req.files);
    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        subirPorTipo(carrera, nombreArchivo, res);
    });

});

app.put('/upload2/:bolsa/:id', (req, res) => {
    const bolsa = req.params.bolsa;
    const id = req.params.id;

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
    var nombreArchivo = `${bolsa}-${new Date().getMilliseconds()}.${extensionArchivo}`;

    // Mover el archivo del temporal a un path
    var path = `/bolsas/${bolsa}/${nombreArchivo}`;

    console.log(req.files);
    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        subirPorTipo2(bolsa, id, nombreArchivo, res);
    });

});

app.post('/upload3/:alumno', (req, res) => {
    // var carrera = req.params.carrera;
    var alumno = req.params.alumno;

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
    var nombreArchivo = `${alumno}-${new Date().getMilliseconds()}.${extensionArchivo}`;


    // Mover el archivo del temporal a un path
    var path = `/request/todas/${nombreArchivo}`;


    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Correcto!'
        });
        solicitudController.postSolicitud(nombreArchivo, alumno);
    });

});


/* function subirPorTipo3(carrera, res) {

    if (carrera === 'electricidad1') {        
        
        Carrera.findById(carrera, (err, carreraBd) => {

            if (!carreraBd) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'NO existe'
                    
                });
            }

            return res.status(200).json({
                ok: true,
                mensaje: 'Si se movio'
            });

        });
    }

} */


function subirPorTipo2(bolsa, id, nombreArchivo, res) {

    if (bolsa === 'electricidad1') {


        Bolsa.findById(id, (err, bolsa) => {

            if (!bolsa) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'NO existe'

                });
            }

            var oldPath = '/bolsas/electricidad1/' + bolsa.bolsa;

            // Si existe, elimina archivo anterior
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            bolsa.bolsa = nombreArchivo;

            bolsa.save((err, bolsaActualizada) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Bolsa estudiantil actualizada',
                    bolsa: bolsaActualizada
                });
            });

        });
    }


    if (bolsa === 'electricidad2') {


        Bolsa.findById(id, (err, bolsa) => {

            if (!bolsa) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'NO existe'

                });
            }

            var oldPath = '/bolsas/electricidad2/' + bolsa.bolsa;

            // Si existe, elimina archivo anterior
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            bolsa.bolsa = nombreArchivo;

            bolsa.save((err, bolsaActualizada) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Bolsa estudiantil actualizada',
                    bolsa: bolsaActualizada
                });
            });

        });
    }

    if (bolsa === 'computacion1') {


        Bolsa.findById(id, (err, bolsa) => {

            if (!bolsa) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'NO existe'

                });
            }

            var oldPath = '/bolsas/computacion1/' + bolsa.bolsa;

            // Si existe, elimina archivo anterior
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            bolsa.bolsa = nombreArchivo;

            bolsa.save((err, bolsaActualizada) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Bolsa estudiantil actualizada',
                    bolsa: bolsaActualizada
                });
            });

        });
    }

    if (bolsa === 'computacion2') {


        Bolsa.findById(id, (err, bolsa) => {

            if (!bolsa) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'NO existe'

                });
            }

            var oldPath = '/bolsas/computacion2/' + bolsa.bolsa;

            // Si existe, elimina archivo anterior
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            bolsa.bolsa = nombreArchivo;

            bolsa.save((err, bolsaActualizada) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Bolsa estudiantil actualizada',
                    bolsa: bolsaActualizada
                });
            });

        });
    }

    if (bolsa === 'contabilidad1') {


        Bolsa.findById(id, (err, bolsa) => {

            if (!bolsa) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'NO existe'

                });
            }

            var oldPath = '/bolsas/contabilidad1/' + bolsa.bolsa;

            // Si existe, elimina archivo anterior
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            bolsa.bolsa = nombreArchivo;

            bolsa.save((err, bolsaActualizada) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Bolsa estudiantil actualizada',
                    bolsa: bolsaActualizada
                });
            });

        });
    }

    if (bolsa === 'administracion1') {


        Bolsa.findById(id, (err, bolsa) => {

            if (!bolsa) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'NO existe'

                });
            }

            var oldPath = '/bolsas/administracion1/' + bolsa.bolsa;

            // Si existe, elimina archivo anterior
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            bolsa.bolsa = nombreArchivo;

            bolsa.save((err, bolsaActualizada) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Bolsa estudiantil actualizada',
                    bolsa: bolsaActualizada
                });
            });

        });
    }
}

async function subirPorTipo(carrera, nombreArchivo, res) {
    const carreras = await Carrera.find();
    const carrerasNames = carreras.map(carrera1 => carrera1.nombre);
    console.log(carrerasNames);

    const isHere = carrerasNames.includes(carrera);

    if (isHere) {
        const carreraObj = await Carrera.find({ nombre: carrera });
        if (!carreraObj) {
            return res.status(400).json({
                ok: false,
                mensaje: 'NO existe'
            });
        }

        console.log(carreraObj[0].nombre);

        const oldPath = `/planes/${carreraObj[0].nombre}/${carreraObj[0].plan}`;
        if (fs.existsSync(oldPath)) {
            console.log(true)
            fs.unlinkSync(oldPath);
        }

        carreraObj[0].plan = nombreArchivo;
        await carreraObj[0].save();

        carreraObj[0].save((err, carreraActualizada) => {
            return res.status(200).json({
                ok: true,
                mensaje: 'Plan de estudios actualizado',
                carrera: carreraActualizada
            });
        });
    }
}
/*
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
*/

module.exports = app;