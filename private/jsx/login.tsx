import * as React from 'react'
import * as mui from '@mui/material'

import { Outlet, Link } from "react-router-dom";


export default class Component extends React.Component {
    // Base
    constructor(props: any) {
        super(props)
    }
    // Eventos
    private SignInEvent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // Recolectar Datos 
        const formDataContent = new FormData(e.currentTarget);
        // Enviar datos
        var dataSend = {
            nickname: formDataContent.get('nickname'),
            password: formDataContent.get('password')
        }
        // Conectar al servidor 
        var xml = new XMLHttpRequest();
        xml.open('POST', '/base', true)
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
        // ----------------------------------
    }
    // Renderizar JSX 
    public render() {
        // Configuracion de tema 
        const defaultTheme = mui.createTheme()
        // Anidar JSX
        return (
            <mui.ThemeProvider theme={defaultTheme}>
                <mui.Container component="main" maxWidth="xs">
                    <mui.CssBaseline />
                    <mui.Box sx={{ marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <mui.Typography component="h1" variant="h5">
                            Iniciar Sesion
                        </mui.Typography>

                        <mui.Box component="form" onSubmit={this.SignInEvent} noValidate sx={{ mt: 1 }}>
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

                            <mui.Box sx={{ m: 2, display: 'flex', flexDirection: 'column', alignItems: 'right' }}>
                                <Link to="/register">Crear cuenta</Link>
                            </mui.Box>

                            <mui.Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Iniciar Sesion
                            </mui.Button>

                        </mui.Box>

                    </mui.Box>
                </mui.Container>
            </mui.ThemeProvider>
        )
    }
}