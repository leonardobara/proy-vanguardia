const express = require('express');

const app = express();

const path = require('path');
const fs = require('fs');

app.get('/:carrera/:pdf', (req, res, next) => {
    
    var carrera = req.params.carrera;
    var pdf = req.params.pdf;
    
    var pathArchivo = path.resolve(__dirname, `/planes/${ carrera }/${ pdf }`);

    if (fs.existsSync(pathArchivo)) {
        res.sendFile(pathArchivo);
    } else {
        var pathNoImagen = path.resolve(__dirname, '/planes/por-defecto/no-img.jpg');
        res.sendFile(pathNoImagen);
    }
    
});

module.exports = app;