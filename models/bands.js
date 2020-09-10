const Band = require('./band');


class Bands {

    constructor() {
        this.bands = [];
    }

    // Se agrega una banda al arreglo
    addBand(band = new Band()) {
        this.bands.push(band);
    }

    // Se obtienen las bandas
    getBands() {
        return this.bands;
    }

    // Se elimina la banda indicada
    deleteBands(id = '') {
        this.bands = this.bands.filter(band => band.id != id);
        return this.bands;
    }

    // Se agrega un voto a la banda indicada por id
    voteBand(id = '') {

        this.bands = this.bands.map(band => {

            if (band.id == id) {
                band.votes++;
                return band;
            } else {
                return band;
            }

        });
    }
}

// Exporta la clase para poder ser utilizada en otro documento
module.exports = Bands;