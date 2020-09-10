const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');


// Instancia de Bands que reinicia la lista de bandas cada ves que se actualiza el servidor
const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Metallica'));



// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado =D');

    client.emit('active-bands', bands.getBands());

    // Escucha Mensaje
    client.on('disconnect', () => {
        console.log('Cliente Desconectado =(');
    });

    // Escucha Mensaje
    client.on('mensaje', (payload) => {
        console.log('Mensaje !!!', payload)

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    // metodo para el voto de la banda
    client.on('vote-band', (payload) => {

        bands.voteBand(payload.id); // Llama al metodo 
        io.emit('active-bands', bands.getBands()); // Notifica a todos los clientes incluyendo el que voto con el "io"

    });

    // Eschar el alta de la banda "add-band"
    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands()); // Notifica a todos los clientes incluyendo el que voto con el "io"
    });

    // Escuchar el borrado de una banda "delete-band"
    client.on('delete-band', (payload) => {
        bands.deleteBands(payload.id);
        io.emit('active-bands', bands.getBands());

    });

    // Escucha Mensaje
    // client.on('emitir-mensaje', (payload) => {

    //     // console.log(payload); // Imprimir en Terminal
    //     // io.emit('nuevo-mensaje', payload);  // Emitir a todos
    //     client.broadcast.emit('nuevo-mensaje', payload);  // Emitir a todos menos al que lo emitió

    // });




});