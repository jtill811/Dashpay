// Dependencies 
const QRCode = require('qrcode')
const express = require('express')
const bodyparser = require('body-parser')
// Node.js 
const path = require('path')
const fs = require("fs")
// Locales 
const server = require('./bin/local.js')
const base64 = require('./bin/__bs64.js')
// Ejecutar servidor
const main = function (d) {
    // Correr srvidor
    server.run(d, () => {
        /***
         * 
         * 
         * Variables de Servidor
         * 
         */
        let serverStatus = {
            login: false
        }
        /**
         * Configuracion de Servidor
         */
        server.app.use("/static", express.static(path.join(__dirname, 'public')));
        server.app.use("/dynamic", express.static(path.join(__dirname, 'private')));
        server.app.use(bodyparser.urlencoded({
            extended: true
        }))
        /***  
         *   Enviar API REST
         *   Solo enviar la json y su lectura
         */
        server.app.get('/', (req, res) => {
            res.status(200).sendFile(path.join(__dirname, '/templates/index.html'))
        });
        /**
         * 
         *  Subir base de datos en servidor y protegerla bajo BASE64
         * 
         */
        server.app.get('/'+base64.encode('database-server-saved'),()=>{
            server.database.users = new server.database.nedb({
                filename: path.join(__dirname, '/bin/__process__/__users.dat'),
                autoload: true
            });
        });
    });
}

module.exports = main