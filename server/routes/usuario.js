const express = require('express');

const app = express();


const usuarioController = require('../controllers/usuarioController');

app.post('/usuario', (usuarioController.postUsuario));
app.get('/usuario', (usuarioController.getUsuarios));
app.get('/usuario/:id', (usuarioController.getUsuario));
app.put('/usuario/:id', (usuarioController.putUsuario));
app.delete('/usuario/:id', (usuarioController.deleteUsuario));

module.exports = app;