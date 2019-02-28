require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');


const app = express();
// app.use(cors())
var allowedOrigins = ['http://localhost:4200', 'http://localhost:3000',

];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },

    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true,

}));
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// parse application/json
app.use(bodyParser.json());


// res.header("Access-Control-Allow-Origin", req.headers['Host']);

app.use(require('./routes/index'));

mongoose.connect('mongodb://localhost:27017/colegios', (err, res) => {
    if (err) throw err;

    console.log('BDD Conectada exitosamente!!!');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});