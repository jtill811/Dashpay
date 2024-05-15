/****
 * 
 *  Servidor Local
 *  version: commonJS
 *  f: 2024
 * 
 */
// Native 
const os    = require("os")
// Bin 
const base64  = require('./__bs64.js') // Encriptacion de Archivos
// Librerias
const express = require('express')
const Router  = express.Router
// Variables globales
const app = express()
// Verificar si hay puerto libre designado
const port = process.env.PORT || 8080
const ip     = 'http://192.168.0.110'
// Ejecutar Servidor
const serverRun = (debug=false,f=()=>{})=>{
    f();
    // Metodos
    app.listen(port,()=>{
        switch(debug){
            case true:
                console.log(`ip: ${ip}:${port}`)
            case false:
                /* Don't Write on Console*/
                return 1
        }
    });
}
// Exportar
module.exports = {
    app: app, // Objeto Principal
    router: Router,
    run: serverRun,
    port: port,
    ip: ip,
    base64: require('./__bs64.js'),
    uuid: require('uuid'), // Require ID Unica
    database: { 
        nedb: require('nedb'),
        users: null
    }
}