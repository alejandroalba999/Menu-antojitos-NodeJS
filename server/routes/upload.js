var express = require('express');
var multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty({ uploadDir: './uploads' });
const fs = require('fs');
const neatCsv = require('neat-csv');

var app = express();

let path = "";
let valor = "";
let bandera = false;
app.post('/subir',multipartyMiddleware, function(req, res) {
    req.files.uploads.forEach(element => {
        path = element.path;
        //leer valor de archivo csv con File System
        fs.readFile(element.path, async (err, data) => {
            if (err) {
              console.error(err)
              return
            } 
            else{
              valor=  await neatCsv(data);
            }
            valor.forEach(element => {
                if(element.campo === null || element.campo === undefined || element.campo ==''){
                   bandera = true;
                }else{
                    
                }  
            });
            if(bandera == true){
                fs.unlinkSync(path);
            return res.status(400).json({msg:"campos vacios"});
            }else{

                return res.status(200).json({msg:"OK"})
            }
          });
    });

});

module.exports = app;