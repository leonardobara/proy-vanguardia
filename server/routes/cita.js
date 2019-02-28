const express = require('express');

const app = express();

const citaController = require('../controllers/citaController');
app.post('/cita/:alumno', citaController.postCita);
// app.get( '/solicitud', (solicitudController.getSolicitudes) ); 


module.exports = app;