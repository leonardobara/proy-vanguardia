const express = require('express');

const app = express();

const Maestro = require('../models/maestro');

const loginController = require('../controllers/loginController');

app.post( '/login', ( loginController.postLogin) ); 

module.exports = app;