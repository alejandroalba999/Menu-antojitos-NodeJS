const express = require('express');
const _ = require('underscore');
const Categoria = require('../models/categoria'); //subir nivel
const fs = require('fs');
const path = require('path');
const app = express();



app.get('/obtener', (req, res) => {
    Categoria.find({blnActivo:true}) 
        //solo aceptan valores numericos
        .then((categoria)=>{
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'Success: Informacion obtenida correctamente.',
                cont: {
                    categoria
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
    let categoria = new Categoria(req.body);

    categoria.save().then((categoria)=>{
        if(categoria === null){
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
                   categoria
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
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
  .then((categoria)=>{
    return res.status(200).json({
        ok: true,
        resp: 200,
        msg: 'Success: Informacion actualizada correctamente.',
        cont: {
            categoria
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

    Categoria.findByIdAndUpdate(id,{ blnActivo: false }, { new: true, runValidators: true, context: 'query' })
    .then((categoria)=>{
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Success: Informacion eliminada correctamente.',
            cont: {
                categoria
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