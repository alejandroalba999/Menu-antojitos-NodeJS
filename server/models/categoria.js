const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoria = new Schema({
    strNombre: {
        type: String,
        required: [true, "Ingrese nombre de la categoria"],
        unique: true
    },
    strDescripcion: {
        type: String,
        required: [true, "Es necesaria la descripcion de la categoria"]
    },
    blnActivo: {
        type: Boolean,
        default: true
    }
    
});

categoria.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});
module.exports = mongoose.model('Categoria', categoria);