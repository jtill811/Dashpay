/****
 * 
 *  Servidor Local
 * 
 * 
 */
const base64  = require('./__bs64.js') // Encriptacion de Archivos
const express = require('express')
// Variables globales
const app = express()
const port = 3000

const serverRun = ()=>{
    // Definir archivos estaticos
    app.setStaticFiles("/public",__dirname + "/public")
    // Rutas
    app.get('/', (req, res) => res.send('Hello World!'))
    app.get('/',)
    // Metodos
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

module.exports = {
    run: serverRun
}