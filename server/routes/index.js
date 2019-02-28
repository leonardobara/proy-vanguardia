var express = require('express');

var app = express();

app.use(require('./carrera'));
app.use(require('./uploads'));
app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./archivos'));
app.use(require('./bolsa'));
app.use(require('./solicitud'));
app.use(require('./cita'));

module.exports = app;