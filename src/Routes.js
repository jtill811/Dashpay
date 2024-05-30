import path from 'path'
import { stringify } from 'querystring';
import { fileURLToPath } from 'url';
/**
 * 
 * Para metros para la creacion de rutas dinamicas
 * solo de uso especializado para mandar rutas dinamicas y estaticas
 * 
 * @param {Request::HTTP} route 
 * @param {Render::HTMLMotorObject} r 
 *
 */
function main(route,r,dir=path.dirname(fileURLToPath(import.meta.url))) {
    // Definir variable de acceso 
    let preficDir   = dir.replace('src','templates/'),
        dataSession = Object
    /**
     *  Rutas estaticas
     */

    /**
     * 
     * Metodos GET/
     * 
     */
    route.get('/',(req,res)=>{
        try{
            res.status(200).render('index',{render:r})
        } catch(err){
            console.error(err);
        }
    })
    .get('/main',(req,res)=>{
        try{
            if(!r.session){
                // Redireccionar 
                res.redirect('/')
            } else{
                res.status(200).render('index',{render:r})
            }
        } catch(err){
            console.error(err);
        }
    })
    /***
     * 
     * Metodos POST/
     * 
     */
    route.post('/add-user',(req,res)=>{
        // Añadir nuevo usuario en la base de datos
        res.send(req.body)
    });
    route.post('/verify-user',(req,res)=>{
        const session = {
            nickname: "jtiller811",
            password: "12345678"
        };
        // Verificar nombre
        if(session.nickname == req.body.nickname && session.password == req.body.pass){
            console.log("Acceso consedido desde log-in");
            // Cambiar estado del render   
            r.session       = true
            r.loggingMode   = false 
            // Renderizar titulo dinamico
            r.dynamicTitle  = "Welcome, " + req.body.nickname; 
            // Añadir a Storage
            r.Storage = {
                nickname: req.body.nickname,
                password: req.body.password,
                error: false
            };  
            // Esto va referido a la parte de login
            // Confirmar y dar acceso main de la app
            res.send({data: req.body,error: false});
        }else{
            // Enviar error 
            res.send({error: true});
        }
    });  
    route.post('/out-log',(req,res)=>{
        // Finalizar Session
        r.session       = false 
        // Renderizar titulo dinamico
        r.dynamicTitle  = "Dashpay"
        // Añadir a Storage
        r.Storage = null
        // Esto va referido a la parte de login
        // Confirmar y dar acceso main de la app
        res.redirect('/')
    });
}

export default main;