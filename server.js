// Dependencies 
const QRCode        = require('qrcode')
const express       = require('express')
const bodyparser    = require('body-parser')
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
        // Acceder a base de datos local 
        server.database.users = new server.database.nedb({
            filename: path.join(__dirname, '/bin/__process__/__users.dat'),
            autoload: true
        },(err)=>{
            // Verificar errores rapidos 
            if(err){console.log(err)}
        });
        /**
         * Configuracion de Servidor
         */
        server.app.use("/static", express.static(path.join(__dirname, 'public')));
        server.app.use("/dynamic", express.static(path.join(__dirname, 'private')));
        server.app.use(bodyparser.json());
        server.app.use(bodyparser.urlencoded({extended: false}));
        server.app.use((req,res)=>{
            if(res.status(200)){
                res.sendFile(path.join(__dirname, '/templates/index.html'))
            }
        })
        /**
         * 
         *  Subir base de datos en servidor y protegerla bajo BASE64
         * 
         */
        server.app.post('/base',(req,res)=>{
            //
            //  Usa Req.body para acceder a parametros enviados desde el front-end
            //
            // Estructurar datos
            var __data = {
                unique_id: server.uuid.v4(),                // ID
                ci: 30065972,                               // Cedula de identidad
                nickname: req.body.nickname,                // Nickname
                password: req.body.password,                // Contraseña
                name: "Jesus Rafael",                       // Nombre
                lastname: "Tillero Caraballo",              // Apellidos
                occupation: server.base64.encode("admin")   // Ocupacion
            }
            // Verificar en base de datos y devolver acceso
            server.database.users.find({},(err,obj)=>{
                obj.forEach(e => {
                    if(e.nickname == __data.nickname){
                        // Enviar datos
                        res.send({status: 'logged', info: __data})
                        console.log(e)
                    }
                    // console.log(__data)
                },()=>{
                    // Usuario no encontrado 
                    res.send({status: 'no-logged', info: __data})
                });
            })
        })
        .post('/register',(req,res)=>{
            res.send({status: 200})
        })
    });
}

module.exports = main