const express = require('express');

const app = express();

const solicitudController = require('../controllers/solicitudController');
app.post('/solicitud');
app.get('/solicitud', (solicitudController.getSolicitudes));
app.get('/solicitud/:id', (solicitudController.obtenerSoli));
// app.put('/solicitud/:id', (solicitudController.putSolicitud));


module.exports = app;