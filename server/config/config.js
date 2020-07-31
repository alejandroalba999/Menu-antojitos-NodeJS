const permiso = require('../middlewares/permisos');
process.env.PORT = process.env.PORT || 3000;
//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Conecciona  a la base de datos
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    log = true;
    urlDB = 'mongodb://localhost:27017/ruta'; //mongodb://localhost:27017/ruta
} else {
    urlDB = 'mongodb+srv://admin:admin@cluster0-rzrls.mongodb.net/ruta';
    log= false;
}
process.middlewares = [permiso.rolMenuUsuario];
process.env.URLDB = urlDB;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//FIRMA DE JWT
process.env.SEED = process.env.SEED || 'firma-super-secreta';

//EXPIRE TIME JWT
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '3h';