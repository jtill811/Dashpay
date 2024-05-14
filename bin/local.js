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
// Variables globales
const app = express()
// Verificar si hay puerto libre designado
const port = process.env.PORT || 8080
const ip   = os.networkInterfaces.apply().Ethernet[1].address
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
    run: serverRun,
    port: port
}