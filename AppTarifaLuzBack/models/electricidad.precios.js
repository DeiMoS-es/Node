// Este será mi modelo para obtener los precios
class precioModel {
    constructor(response) {
        this.dataType = response.data.type;

        // Comprueba si 'included' existe y tiene al menos un elemento
        if (response.included && response.included.length > 0) {
            // Puedes ajustar esta parte según tus necesidades específicas
            this.includeTypes = response.included.map(item => item.type);
            this.values = response.included.flatMap(item => item.attributes.values.map(valueItem => new Value(valueItem)));
        } else {
            this.includeTypes = [];
            this.values = [];
        }
    }
}

// Resto de la clase Value
class Value {
    constructor(item) {
        this.value = item.value;
        this.datetime = item.datetime;
    }
}


module.exports = precioModel;
