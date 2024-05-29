import path from 'path'
import { stringify } from 'querystring';
import { fileURLToPath } from 'url';
/**
 * 
 * Para metros para la creacion de rutas dinamicas
 * solo de uso especializado para mandar rutas dinamicas y estaticas
 * 
 * @param {Request::HTTP} route 
 *
 */
function main(route,dir=path.dirname(fileURLToPath(import.meta.url))) {
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
        res.render('login-status')
    });
}

export default main;