const QRCode = require('qrcode')
const express = require('express')

const path = require('path')
const fs    = require("fs")

const server = require('./bin/local.js')
const base64 = require('./bin/__bs64.js')
// Ejecutar servidor
server.run(debug = true, () => {
    /**
     * Link dinamicos y estaticos
     */
    server.app.use("/static", express.static(path.join(__dirname, 'public')));
    server.app.use("/dynamic", express.static(path.join(__dirname, 'private')));
    /***  
    *   Enviar API REST
    *   Solo enviar la json y su lectura
    */
    server.app.get('/' + base64.encode("set-api-release"), (req, res) => {
        // Mensaje de vista de consola
        // console.log("SE HA LLAMADO A LA RUTA DE LA API_MAIN.JSON")
        // Variables
        let fileContent = "",
            STATE_JSON_READER = undefined,
            pathFileJson = __dirname + '/bin/__process__/__init__.json'
        /*
         *
         *   Relizar lectura de archivo para creacion de una API DINAMICA
         *
         */
        fs.readFile(pathFileJson, 'utf-8', function (err, d) {
            if (!err) {
                console.log("Load JSON -> \t100%")
                // Convertir contenido en JSON
                fileContent = JSON.parse(d)
                // Mostar ID para DEBUG
                // console.log("id: %s",fileContent["meta"].id)
                // Re-Escribir codigo QR
                if (typeof fileContent["meta"].base64 != "string" && typeof fileContent["meta"].id != "string" ) {
                    // Definir nuevo codigo QR Unico
                    QRCode.toDataURL(server.ip+server.port.toString()).then((url) => {
                        fileContent["meta"].base64 = url
                        fileContent["meta"].id = base64.encode(JSON.stringify(fileContent))
                        fileContent["meta"].rewrite += 1
                        // JSON -> String
                        STATE_JSON_READER = JSON.stringify(fileContent)
                        /*
                         *
                         *   Se ejecutara la lectura de el archivo
                         *   Una vez archivo leido para acutalizar datos de personalizacion y verificacion de Codigo de accesso
                         * 
                         */
                        fs.writeFile(pathFileJson, `${JSON.stringify(fileContent)}`, {
                            encoding: "utf-8"
                        }, (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("File written successfully\n");
                                console.log("The written has the following contents:");
                            }
                        });
                        // console.log(JSON.stringify(fileContent)) // Verificar si es String
                        // Error de creacion de QR
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    // Enviar JSON al servidor
                    res.send(JSON.stringify(fileContent))
                }
            } else {
                console.log(err)
            }
        })
    })
    // Crear ruta unica y base
    server.app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
})