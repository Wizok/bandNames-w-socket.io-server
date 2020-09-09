const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Node Server (Creación de servidor)
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

// Mandar ejecutar el socket
require('./sockets/socket');



// Path Publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto !!', process.env.PORT);
})