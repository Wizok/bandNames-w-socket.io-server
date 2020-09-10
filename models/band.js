const { v4: uuidV4 } = require('uuid');

class Band {
    constructor(name = 'no-name') {
        this.id = uuidV4(); // identificador único
        this.name = name;
        this.votes = 0;
    }
}

// Exporta la clase para poder ser utilizada en otro documento
module.exports = Band;

// Se instala el packete "uuid" con el comando "npm i uuid" para generar ID unicos