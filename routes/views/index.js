const glob = require("glob");
const path = require("path");

// Con glob logramos una carga de rutas dinamicas y facilmente asistida

module.exports = function(app){
  glob.sync("./routes/**/*.js").forEach((file)=>{
    if (!file.includes("index.js")) {
      require(path.resolve(file))(app);
    }
  })
}