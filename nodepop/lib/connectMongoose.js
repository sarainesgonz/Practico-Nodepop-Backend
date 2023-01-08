'use strict';

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error',err => {
    console.log('Error de conexión a MongoDB', err);
    process.exit(1); 
});

// 5  NO NECESARIO suscribimos a otro evento, para que cada vez que se habra una nueva conexion con open, se pinte en la consola
mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect('mongodb://127.0.0.1/adsNodepop')

module.exports = mongoose.connection;