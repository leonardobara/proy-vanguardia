const express = require('express');

const app = express();


const loginController = require('../controllers/loginController');

app.post('/login', (loginController.postLogin));

module.exports = app;