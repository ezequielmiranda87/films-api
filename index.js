const express = require("express");
const app = express();

// el metodo require recibe por parametro la ruta del modulo a importar, por defecto busca un archivo index.js un modulo en js es un archivo js
// El cual tiene una sentencia export, en este caso se exporta desde routes/views/index.js una funcion que recibe por parametro la instancia de la app

// RUTAS
require('./routes/views/')(app)

// Si no matchea en niguna de las rutas ejecuta el midleware or defecto
require('./routes/special/')(app)

console.log("Iniciando Express.js");
app.listen(3000, ()=>{
    console.log("Express ha iniciado correctamente!");
});