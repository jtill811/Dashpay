import path from 'path'
// Locales y Pre-procesadores
import __dirname from './src/file_set.js'
// Liberias 
import express from 'express'
// Cargar Rutas
import Routes from './src/Routes.js'
// Objeto de servidor
var server = {
    // Archivos de configuracion 
    config: {
        "PORT": process.env.PORT || 8080,
        "TEMPLATES-DIR": __dirname + '/templates/',
        "ENGINE_TEMPLATES": "ejs"
    },
    app: express()
}
// Definir motor de plantillas
server.app.set('view engine', 'ejs');
server.app.set('templates', path.join(__dirname, 'templates'));
// Definir motor de API
server.app.use()
// Rutas 
Routes(server.app)
// Definir activacion de servidor 
server.app.listen(server.config["PORT"], () => {
    console.log(`server into: localhost:${server.config["PORT"]}`)
});