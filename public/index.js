
document.querySelector('#btn-log-out').addEventListener('click',(e)=>{
    // Cerrar estado de session
    xhttp = new XMLHttpRequest();
    // Enviar cerrar Session
    xhttp.open("POST", "/out-log", true)
    xhttp.send()
    // Recargar ventana y refrescar datos
    window.location.reload();
},false)