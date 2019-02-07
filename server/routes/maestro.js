const express = require('express');

const app = express();

const Maestro = require('../models/maestro');

const maestroController = require('../controllers/maestroController');

app.post( '/maestro', ( maestroController.postMaestro) ); 
app.get( '/maestro', ( maestroController.getMaestros) );
app.get( '/maestro/:id', ( maestroController.getMaestro) );
app.put( '/maestro/:id', ( maestroController.putMaestro) );
app.delete( '/maestro/:id', ( maestroController.deleteMaestro) );

module.exports = app;