const express   = require('express')
const path      = require('path')
const server    = require('./bin/local.js')
// Ejecutar servidor
server.run(debug=true,()=>{
    server.app.use("/static",   express.static(path.join(__dirname, 'public')));
    server.app.use("/dynamic",  express.static(path.join(__dirname, 'private')));
    // Crear ruta unica y base
    server.app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
})