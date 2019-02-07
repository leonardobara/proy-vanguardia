const express = require('express');

const app = express();

const Carrera = require('../models/carrera');

const carreraController = require('../controllers/carreraController');

app.post( '/carrera', ( carreraController.postCarrera) ); 
app.get( '/carrera', (carreraController.getCarreras) );
app.get( '/carrera/:id', (carreraController.getCarrera) );
app.put( '/carrera/:id', (carreraController.putCarrera) );
app.delete( '/carrera/:id', (carreraController.deleteCarrera) );

module.exports = app;