const express = require('express');

const app = express();

const solicitudController = require('../controllers/solicitudController');
app.post( '/solicitud' ); 
app.get( '/solicitud', (solicitudController.getSolicitudes) ); 


module.exports = app;