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
    let preficDir = dir.replace('src','templates/')
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
    });
    /***
     * 
     * Metodos POST/
     * 
     */
    route.post('/verify-user',(req,res)=>{
        res.send({"response":true})
    })  
}

export default main;