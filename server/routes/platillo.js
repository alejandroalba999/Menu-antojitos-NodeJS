const express = require('express');
const _ = require('underscore');
const Platillo = require('../models/platillo'); //subir nivel
const fs = require('fs');
const path = require('path');
const app = express();




app.get('/obtenerId/:idPlatillo', (req, res) => {
    let idPlatillo = req.params.idPlatillo;
    Platillo.find({_id: idPlatillo}).populate('idCategoria') 
        //solo aceptan valores numericos
        .then((platillo)=>{
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'Success: Informacion obtenida correctamente.',
                cont: {
                    platillo
                }
            });
        }).catch((err)=>{
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error: Error al obtener la api',
                cont: {
                    err: err.message
                }
            });
        })
});
app.get('/obtenerIdCategoria/:idCategoria', (req, res) => {
    let idCategoria = req.params.idCategoria;
    Platillo.find({idCategoria: idCategoria}).populate('idCategoria') 
        //solo aceptan valores numericos
        .then((platillo)=>{
            if(platillo === null || platillo.length === 0 || platillo === undefined){
                return res.status(500).json({
                    ok: false,
                    resp: 500,
                    msg: 'Error: No cuenta con registros de platillos',
                    cont: {
                        platillo: 0
                    }
                });
            }
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'Success: Informacion obtenida correctamente.',
                cont: {
                    platillo
                }
            });
        }).catch((err)=>{
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error: Error al obtener la api',
                cont: {
                    err: err.message,
                    count : 0
                }
            });
        })
});


app.post('/registrar', (req, res) => {
    let platillo = new Platillo(req.body);

    platillo.save().then((platillo)=>{
        if(platillo === null){
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error: Error al registrar la api',
                cont: {
                    err: err
                }
            });
           }else{
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'Success: Informacion registrada correctamente.',
                cont: {
                   platillo
                }
            }) 
           }
    }).catch((err)=>{
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error: Error al registrar la api',
            cont: {
                err: err
            }
        });
    })
});




app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strNombre', 'strDescripcion','strIngredientes','nmbPiezas','nmbPrecio']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
    Platillo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
  .then((platillo)=>{
    return res.status(200).json({
        ok: true,
        resp: 200,
        msg: 'Success: Informacion actualizada correctamente.',
        cont: {
            platillo
        }
    })
  }).catch((err)=>{
    return res.status(500).json({
        ok: false,
        resp: 500,
        msg: 'Error: Error al actualizar la api',
        cont: {
            err: err.message
        }
    });
  })
    
});




app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Platillo.findByIdAndUpdate(id,{ blnActivo: false }, { new: true, runValidators: true, context: 'query' })
    .then((platillo)=>{
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Success: Informacion eliminada correctamente.',
            cont: {
                platillo
            }
        });
    }).catch((err)=>{
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error: Error al eliminar la informacion',
            cont: {
                err: err.message
            }
        });
    })
});
app.delete('/activar/:id', (req, res) => {
    let id = req.params.id;

    Platillo.findByIdAndUpdate(id,{ blnActivo: true }, { new: true, runValidators: true, context: 'query' })
    .then((platillo)=>{
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Success: Informacion activada correctamente.',
            cont: {
                platillo
            }
        });
    }).catch((err)=>{
        return res.status(500).json({
            ok: false,
            resp: 500,
            msg: 'Error: Error al eliminar la informacion',
            cont: {
                err: err.message
            }
        });
    })
});

module.exports = app;