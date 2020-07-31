const express = require('express');
const _ = require('underscore');
const Platillo = require('../models/platillo'); //subir nivel
const fs = require('fs');
const path = require('path');
const app = express();



app.get('/obtener', (req, res) => {
    Platillo.find({blnActivo:true}).populate('idCategoria') 
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
    let body = _.pick(req.body, ['strNombre', 'strDescripcion']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
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

module.exports = app;