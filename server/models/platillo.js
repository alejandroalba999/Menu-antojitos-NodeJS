const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Categoria = require('../models/categoria');

let Schema = mongoose.Schema;

let platillo = new Schema({
    idCategoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, "Ingrese el id de la categoria a la que pertenece el platillo"]
    },
    strNombre: {
        type: String,
        required: [true, "Ingrese el nombre del platillo"]
    },
    strDescripcion: {
        type: String,
        required: [true, "Es necesaria la descripcion del platillo"]
    },
    strIngredientes:{
       type: String,
       required: [true, "Son necesarios los ingredientes del platillo"]
    },
    nmbPiezas:{
        type:Number,
        required: [true, "Es necesaria el numero de piezas del platillo"]
    },
    nmbPrecio:{
        type:Number,
        required: [true, "Es necesaria el precio del platillo"]
    },
    blnActivo: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Platillo', platillo);