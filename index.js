import path from 'path'
import { fileURLToPath } from 'url'
// Locales y Pre-procesadores
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
// Liberias 
import sqlite3 from 'sqlite3';
import express from 'express'
// Cargar Rutas
import Routes from './src/Routes.js'
import Mobile from './src/RouteMobile.js'
// Cargar Renderizados
import Render from './src/Render.js'
// Objeto de servidor
var server = {
    // Archivos de configuracion 
    config: {
        "PORT": process.env.PORT || 8080,
        "TEMPLATES-DIR": __dirname + '/templates/',
        "ENGINE_TEMPLATES": "ejs"
    },
    app: express(),
    // Variables enviadas a renderizar por plantilla 
    render: Render,
    // Cargar base de datos
    database: new sqlite3.Database(path.join(__dirname.replace('\src','\..'),'/bin/chinook.db'))
}
// Definir motor de plantillas
server.app.set('view engine', 'ejs');
server.app.set('templates', path.join(__dirname, 'templates'));
// Definir motor de API
server.app.use(express.json())
express.urlencoded({extended: false})
server.app.use(express.static(__dirname + '/public'));
// Rutas 
Routes(server.app,server.render,server.database)
Mobile(server.app,server.render,server.database)
// Definir activacion de servidor 
server.app.listen(server.config["PORT"], () => {
    console.log(`server into: localhost:${server.config["PORT"]}`)
});