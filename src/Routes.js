import { Console } from 'console';
import path from 'path'
import { fileURLToPath } from 'url';
/**
 * 
 * 
 * Para metros para la creacion de rutas dinamicas
 * solo de uso especializado para mandar rutas dinamicas y estaticas
 * 
 * @param {Request::HTTP} route 
 * @param {Render::HTMLMotorObject} r 
 *
 */
function main(route,r,database,dir=path.dirname(fileURLToPath(import.meta.url))) {
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
        // Añadir datos a base de datos
        const dbInsertInto = (compare=null)=>{
            let q = [req.body.nickname,req.body.name,parseInt(req.body.ci),req.body.pass],
                aa = false;
            // Empezar a comparar
            if(compare!=null){
                console.log('Realizar comparacion')
                // Enviar a bucle
                for(let i = 0;i < compare.length; i++){
                    // Definir comparativa
                    let e = compare[i]; // Obtener Objeto de forma singular
                    // Condicional de comprobacion 
                    if(e.nickname == req.body.nickname){
                        // Este dato ya existe
                        aa = true
                        // Enviar
                        console.log("67 | usuario existente")
                        // ---------------------------------------------------------------------
                    }
                };
                // Verificar
                if(!aa){ // False
                    console.log("75 | Usuario no existe: ",aa);
                    // Relizar agregar a usuario
                    database.run('INSERT INTO users VALUES(?,?,?,?)',q,(err)=>{
                        if(!err){ // False
                            console.error(err)
                        } else{
                            res.send(JSON.stringify({i_status: true}))
                            //  Usuario en Base de datos
                            console.log("Insertado en Base de datos")
                        }
                    })
                }

            }
        }
        /***
         * 
         * Cargar todos loas datos de la base de datos
         * para realizar comparacion y insertar en base de datos
         * 
         */
        database.all('SELECT * FROM users', (err, rows) => {
            // Carga la base de datos
            if (err) {
                console.error('Error fetching users:', err);
            } else if (rows.length === 0) {
                // console.log('No users found');
                res.send({error: true, showMessageError: 'No users found'})
            } else {
                // Aqui se nesecita llamar a la base de datos y regredar un archivo JSON
                dbInsertInto(rows)
            }
        });
    });

    route.post('/verify-user',(req,res)=>{
        try {
            // GET ALL DATABASE
            // Obtener toda la base de datos 
            database.all('SELECT * FROM users', (err, rows) => {
                // Carga la base de datos
                if (err) {
                    console.error('Error fetching users:', err);
                } else if (rows.length === 0) {
                    console.log('No users found');
                    res.send({error: true, message: 'No users found'})
                } else {
                    // Aqui se nesecita llamar a la base de datos y regredar un archivo JSON
                    const session = rows;
                    // Imprimir en consola 
                    console.log('Users (JSON):', session);
                    // Verificar Array
                    for (let i = 0; i < session.length; i++) {
                        const e = session[i];
                        // console.log(e) // Mostrar tipo de dato de E
                        // Verificar Existencia
                        if(e.nickname == req.body.nickname && e.password == req.body.pass){
                            // console.log("Acceso consedido desde log-in"); // Entra en verificacion
                            // Cambiar estado del render   
                            r.session       = true
                            r.loggingMode   = false 
                            // Renderizar titulo dinamico
                            r.dynamicTitle  = "Welcome, " + req.body.nickname;  // Cambia el titulo
                            // Añadir a Storage
                            r.Storage = {
                                nickname: req.body.nickname,
                                password: req.body.pass,
                                error: false
                            };  
                            //
                            console.log("View send")
                            // Esto va referido a la parte de login
                            // Confirmar y dar acceso main de la app
                            res.send({data: r.Storage, error: false});
                            /***
                             * Romper el bucle
                             * 
                             */
                            break;
                        }
                    } // End-For
                }
            }); 
        } catch (err) {
            console.error(err)
        }
    });  

    // Cerrar
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