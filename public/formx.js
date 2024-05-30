/**
 * 
 * Archvio de envio de peticiones al servidor
 * 
 */
if(document.querySelector('#form-status').hasAttribute('logging-mode')){
    document.querySelector('#btn-submit-log-in').addEventListener('click', (e) => {
        e.preventDefault();
        // Cargar datos
        let form = {
            "nickname": document.getElementById('nickname-0').value,
            "pass": document.getElementById('pass-0').value
        },
            xhttp = new XMLHttpRequest();
        // Abrir peticion
        xhttp.open("POST", "/verify-user", true)
        // Procesar
        xhttp.setRequestHeader('Content-Type','application/json')
        // Al cargar los datos reenviados
        xhttp.onload = function(){
            if(this.status === 200){
                // JSON view
                const data_ = JSON.parse(xhttp.responseText)
                // Verificar datos 
                if(data_.error){
                    alert("Este usuario no ha sido Registrado")
                }else {
                    // Iniciar sesion 
                    alert("Ha inicado session")
                    // console.log(data_)
                    if(!data_.error){
                        // Cambiar de ventana 
                        window.location.href = '/main'
                    }else {
                        alert('Error al registrar usuario')
                    }
                }
            } else{
                console.error('Error: %s', xhttp.statusText)
            }
        }
        // Enviar al servidor 
        xhttp.send(JSON.stringify(form))
    }, false);
    document.querySelector('#btn-submit-sign-up').addEventListener('click', (e) => {
        e.preventDefault();
        // Cargar datos
        let form = {
                "nickname": document.getElementById('nickname-1').value,
                "name":     document.getElementById('name-1').value,
                "ci":       parseInt(document.getElementById('ci-1').value),
                "pass":     document.getElementById('pass-1').value // Este se verifica su exactitudantes de enviar
            },
            xhttp = new XMLHttpRequest();
        // Abrir peticion
        xhttp.open("POST", "/verify-user", true)
        // Procesar
        xhttp.setRequestHeader('Content-Type','application/json')
        // Al cargar los datos reenviados
        xhttp.onload = function(){
            if(this.status === 200){
                const data_ = JSON.parse(xhttp.responseText)
                console.log(data_)
            } else{
                console.error('Error: %s', xhttp.statusText)
            }
        }
        // Enviar al servidor 
        xhttp.send(JSON.stringify(form))
    }, false);
}