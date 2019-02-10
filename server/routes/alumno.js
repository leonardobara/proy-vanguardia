const express = require('express');

const app = express();

const Alumno = require('../models/maestro');

const alumnoController = require('../controllers/alumnoController');

app.post( '/alumno', ( alumnoController.postAlumno) ); 
app.get( '/alumno', ( alumnoController.getAlumnos) );
app.get( '/alumno/:id', ( alumnoController.getAlumno) );


module.exports = app;