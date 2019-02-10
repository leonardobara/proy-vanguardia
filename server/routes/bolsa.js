const express = require('express');

const app = express();

const Bolsa = require('../models/bolsa');

const bolsaController = require('../controllers/bolsaController');

app.post( '/bolsa', ( bolsaController.postBolsa) ); 
app.get( '/bolsa', (bolsaController.getBolsas) );
app.get( '/bolsa/:id', (bolsaController.getBolsa) );
app.put( '/bolsa/:id', (bolsaController.putBolsa) );
app.delete( '/bolsa/:id', (bolsaController.deleteBolsa) );

module.exports = app;