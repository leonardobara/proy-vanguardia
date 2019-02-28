const express = require('express');

const app = express();

const path = require('path');
const fs = require('fs');

app.get('/:carrera/:pdf', (req, res, next) => {

    var carrera = req.params.carrera;
    var pdf = req.params.pdf;

    var pathArchivo = path.resolve(__dirname, `/planes/${carrera}/${pdf}`);

    if (fs.existsSync(pathArchivo)) {
        res.sendFile(pathArchivo);
    } else {
        var pathNoImagen = path.resolve(__dirname, '/planes/por-defecto/no-img.jpg');
        res.sendFile(pathNoImagen);
    }

});

app.get('/bolsas/:bolsa/:pdf', (req, res, next) => {

    var bolsa = req.params.bolsa;
    var pdf = req.params.pdf;

    var pathArchivo = path.resolve(__dirname, `/bolsas/${bolsa}/${pdf}`);

    if (fs.existsSync(pathArchivo)) {
        res.sendFile(pathArchivo);
        //res.download(pathArchivo);
    } else {
        var pathNoImagen = path.resolve(__dirname, '/bolsas/por-defecto/no-img.jpg');
        res.sendFile(pathNoImagen);
    }

});

app.get('/solicitudes/todas/:pdf', (req, res, next) => {

    var pdf = req.params.pdf;

    var pathArchivo = path.resolve(__dirname, `/solicitudes/todas/${pdf}`);

    if (fs.existsSync(pathArchivo)) {
        res.sendFile(pathArchivo);
        // res.download(pathArchivo);
    } else {
        var pathNoImagen = path.resolve(__dirname, '/solicitudes/por-defecto/no-img.jpg');
        res.sendFile(pathNoImagen);

    }

});

module.exports = app;