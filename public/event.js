"use strict"
/*
 *
 *   Base de Aplicacion web
 *
 */

const client = new XMLHttpRequest(); // AJAX

var dataAPILoaded = undefined

const eventloadWindow = () => {
    // Definir Variables
    let data = document.getElementById('root'),
        response = client.responseText // Respuesta de AJAX
    /*
     *
     *   Ejecutar Click
     *
     */
    window.addEventListener('load', (e) => {
        try {
            // Abrir CLiente
            client.open('GET', '/' + btoa('set-api-release'), true);
            // Supercargar Estados
            client.onreadystatechange = () => {
                switch (client.readyState) {
                    case 4:
                        // Si la API es carga
                        if (client.status == 200) {
                            // Condicional de EVento
                            if (client.responseText != "" || client.responseText != " ") {
                                dataAPILoaded = JSON.parse(client.responseText)
                                //Mostrar QR en IMAGEN
                                data.setAttribute("src",dataAPILoaded["meta"].base64)
                                // data.inner =`<code>${dataAPILoaded}</code>`; // Esto solo utilizar en Debug
                            } else {
                                document.innerHTML = `<p>La direccion ${'/'+btoa('api')} no existe</p>`;
                            }
                        } else {
                            window.alert(`ERROR ${client.status}: Ha sucedido un error al cargar un archivo`);
                            console.error(`ERROR ${client.status}: Ha sucedido un error al cargar un archivo`);
                        }

                }
            };
            // Igual enviar Datos
            client.send() // Es como cerra el llamado del AJAX
        } catch (err) {
            window.alert(err);
            console.error(err);
        }
    });
}

// Ejecutar Eventos
eventloadWindow();