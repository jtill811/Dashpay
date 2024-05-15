/*
 *
 *   Base de Aplicacion web
 *
 */

const xhttp = new XMLHttpRequest(); // AJAX

xhttp.onload = ()=>{
    
}

document.getElementById("send-login").addEventListener('submit',(e)=>{
    e.preventDefault();
    // Object 
    let formContent;
    // Metodo
    xhttp.open('POST','/sign-up',true)
    // Movilizar en cambio
    xhttp.onreadystatechange = ()=>{
        if(this.readyState == 4 && this.status == 200){
            formContent = {
                nickname: document.getElementById('login-text').innerText,
                password: document.getElementById('login-password').innerText
            }
        }
    }
    // Enviar
    xhttp.send();
    // 
    console.log(formContent)
},true)