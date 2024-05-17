import * as React from 'react';
import { createRoot } from 'react-dom/client';
// Crear rutas dinamicas
import { BrowserRouter, Routes, Route } from "react-router-dom";
// SCSS 
import "./scss/index.scss"
// # MUUI SYSTEMS
import LoginMain from './jsx/login'
import SignUp    from './jsx/sign-up'
import NoPage    from './jsx/404'
// Agregar a la pagina web 
const documentDOMCointainerBase = document.getElementById('root');
// 
// Renderizar en el DOM 
const root = createRoot(documentDOMCointainerBase!)
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginMain/>}/>
            <Route path="/register" element={<SignUp/>}/>

            <Route path="*" element={<NoPage/>}/>
        </Routes>
    </BrowserRouter>
)