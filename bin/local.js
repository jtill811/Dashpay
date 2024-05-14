/****
 * 
 *  Servidor Local
 *  version: commonJS
 *  f: 2024
 * 
 */
// Native 
const os    = require("os")
const path  = require("path")
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
    /*  Enviar Codigo QR
        Ruta de API REST */
    app.get('/'+ base64.encode("set-api-release"),(req,res)=>{
        // Mensaje de vista de consola
        // console.log("SE HA LLAMADO A LA RUTA DE LA API_MAIN.JSON")
        // Variables
        let fileContent         = "",
            STATE_JSON_READER   = undefined,
            pathFileJson        = __dirname + '/src/_api.json'          
        /*
        *
        *   Relizar lectura de archivo para creacion de una API DINAMICA
        *
        */
        fs.readFile(pathFileJson,'utf-8', function(err, d) {
            if (!err) {
                console.log("Load JSON -> \t100%")
                // Convertir contenido en JSON
                fileContent = JSON.parse(d)
                // Mostar ID para DEBUG
                // console.log("id: %s",fileContent["meta"].id)
                // Re-Escribir codigo QR
                if(typeof fileContent["meta"].base64 != "string" && typeof fileContent["meta"].id != "string"){
                    // Definir nuevo codigo QR Unico
                    QRCode.toDataURL(app.getNativeURL()).then((url)=>{
                        fileContent["meta"].base64  = url
                        fileContent["meta"].id      = nodeBase64.encode(JSON.stringify(fileContent))
                        // JSON -> String
                        STATE_JSON_READER = JSON.stringify(fileContent)
                        /*
                        *
                        *   Se ejecutara la lectura de el archivo
                        *   Una vez archivo leido para acutalizar datos de personalizacion y verificacion de Codigo de accesso
                        * 
                        */
                        fs.writeFile(pathFileJson,`${JSON.stringify(fileContent)}`,{encoding: "utf-8"}, (err) => {
                            if (err){
                                console.log(err);
                            } else {
                                console.log("File written successfully\n");
                                console.log("The written has the following contents:");
                            }
                        });
                        // console.log(JSON.stringify(fileContent)) // Verificar si es String
                    // Error de creacion de QR
                    }).catch((err)=>{
                        console.log(err)
                    })
                } else{
                    // console.log("API_MAIN.JSON A SIDO VERIFICADA CON EXITO Y ENVIADA AL SERVIDOR")
                }
            }else{
                console.log(err)
            }
        })
    })
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