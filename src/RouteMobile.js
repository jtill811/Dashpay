import path from 'path'
import { fileURLToPath } from 'url';

const main = (route,r=Object,database=undefined,dir=path.dirname(fileURLToPath(import.meta.url)))=>{
    try{

        route.get('/mobile',(req,res)=>{
            try{
                res.send('A cargado desde el movil')
            } catch(err){
                console.error(err);
            }
        })
    // -> catch
    } catch(err){console.error(err)}
};

export default main