var express = require('express');

var app = express();

app.use( require('./carrera') );
app.use( require('./uploads') );
app.use( require('./maestro') );
app.use( require('./login') );
app.use( require('./archivos') );

module.exports = app;