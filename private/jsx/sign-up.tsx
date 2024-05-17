import * as React from 'react'
import * as mui from '@mui/material'

import { Outlet, Link } from "react-router-dom";

export default class Component extends React.Component{
    constructor(props:any){
        super(props)
        props = { messageUser: '' }
    }
    handleEvent(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        // Recolectar Datos 
        const formDataContent = new FormData(e.currentTarget);
        // Enviar datos
        var dataSend = {
            name:       formDataContent.get('name'),
            lastname:   formDataContent.get('lastname'),
            nickname:   formDataContent.get('nickname'),
            password:   formDataContent.get('password')
        }
        // Conectar al servidor 
        var xml = new XMLHttpRequest();
        xml.open('POST', '/register', true)
        xml.setRequestHeader('Content-Type', 'application/json')
        xml.send(JSON.stringify(dataSend))
        // Realizar Respuesta del servidor
        xml.onreadystatechange = () => {
            if (xml.readyState == 4) {
                let j = JSON.parse(xml.responseText)
                // Respuesta recibida
                console.log(xml.responseText)
            }
        }
    }   
    render(){
        const defaultTheme = mui.createTheme()

        return(
            <mui.ThemeProvider theme={defaultTheme}>
                <mui.Container component="main" maxWidth="xs">
                    <mui.CssBaseline />
                    <mui.Box sx={{ marginTop: 26, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <mui.Typography component="h1" variant="h5">
                            Crear Cuenta
                        </mui.Typography>

                        <mui.Box component="form" onSubmit={this.handleEvent} noValidate sx={{ mt: 1 }}>
                            <mui.Grid>
                                <mui.TextField
                                    variant='standard'
                                    margin="normal"
                                    id="name"
                                    label="Nombre"
                                    name="name"
                                    color="primary"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                                <mui.TextField
                                    variant='standard'
                                    margin="normal"
                                    id="lastname"
                                    label="Apellido"
                                    name="lastname"
                                    color="primary"
                                    required
                                    fullWidth
                                />
                            </mui.Grid>
                            <mui.Grid>
                                <mui.TextField
                                    variant='standard'
                                    margin="normal"
                                    id="ci"
                                    label="Cedula"
                                    name="ci"
                                    color="primary"
                                    required
                                    fullWidth
                                />
                                <mui.TextField
                                    variant='standard'
                                    margin="normal"
                                    id="nickname"
                                    label="Usuario"
                                    name="nickname"
                                    color="primary"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                                <mui.TextField
                                    variant='standard'
                                    margin="normal"
                                    id="password"
                                    label="Contraseña"
                                    name="password"
                                    color="primary"
                                    required
                                    fullWidth
                                />
                                <mui.TextField
                                    variant='standard'
                                    margin="normal"
                                    id="re-password"
                                    label="Confirmar Contraseña"
                                    name="re-password"
                                    color="primary"
                                    required
                                    fullWidth
                                />
                            </mui.Grid>

                            <mui.Box sx={{display: 'flex', flexDirection: 'rows', alignItems: 'right' }}>
                                <Link to="/">Iniciar Sesion</Link>
                            </mui.Box>

                            <mui.Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrar Usuario
                            </mui.Button>

                        </mui.Box>

                    </mui.Box>
                </mui.Container>
            </mui.ThemeProvider>
        )
    }
}