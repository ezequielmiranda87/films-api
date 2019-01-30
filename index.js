const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const mongo = require("./db/connect")

// Setting middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


// el metodo require recibe por parametro la ruta del modulo a importar, por defecto busca un archivo index.js un modulo en js es un archivo js
// El cual tiene una sentencia export, en este caso se exporta desde routes/views/index.js una funcion que recibe por parametro la instancia de la app

//require resuelve el views/index.js el cual se encarga de configurar las rutas dinamicamente
require('./routes/views/')(app)
require('./routes/api/')(app)

// This a default response for routes
require('./routes/special/')(app)


// El up de la bd es dependencia de la instancia de la aplicación
async function initMongo(){
    try {
        const db = await mongo.connect();
        if(db){ initExpress();}        
    } catch (error) {
        console.log(error)
    }

}


function initExpress(){
    // Upload the server instance
    console.log("Iniciando Express.js");
    app.listen(3000, ()=>{
        console.log("Express ha iniciado correctamente!");
        // SIGINT y SIGTERM son eventos de cierre
        process.on("SIGINT", closeApp)
        process.on("SIGTERM", closeApp)
    });
}

function closeApp(){
    mongo.disconnect()
        .then(()=>process.exit(0))
}


//setTimeout(()=>{process.exit(0)},5000)
initMongo()