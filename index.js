import express from 'express'
// Objeto de servidor
var server = {
    config: {
        "PORT": process.env.PORT || 3000
    },
    app: express()
}
// Rutas 
server.app.get('/', (req, res) => res.send('Hello World!'))
// Definir activacion de servidor 
server.app.listen(server.config["PORT"], () => {
    console.log(`Example app listening on port ${server.config["PORT"]}!`)
});