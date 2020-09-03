const express = require('express');
const _ = require('underscore');
const fileUpload = require('express-fileupload');
const Categoria = require('../models/categoria'); //subir nivel
const fs = require('fs');
const neatCsv = require('neat-csv');
const path = require('path');
const app = express();


app.get('/buscar', (req,res)=>{
    const fs = require('fs')

    fs.readFile('./uploads/gAw6x1AS6A6D13NXZGT4zu7l.csv', async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
     let valores = await neatCsv(data);
     console.log(valores);
    })
});

app.get('/obtener', (req, res) => {
    Categoria.find({}).sort({_id:-1}) 
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
app.get('/obtener/:nombre', (req, res) => {
    let nombre = req.params.nombre;
    Categoria.find({blnActivo:true, strNombre: nombre}).sort({_id:-1}) 
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
app.get('/obtenerId/:id', (req, res) => {
    let id = req.params.id;
    Categoria.find({ _id: id}) 
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
app.delete('/activar/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndUpdate(id,{ blnActivo: true }, { new: true, runValidators: true, context: 'query' })
    .then((categoria)=>{
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Success: Informacion activada correctamente.',
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