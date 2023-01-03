import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ComponenteBarraControle from './componentes/barra-de-controle/barra-de-controle';
import PaginaHome from './paginas/home/home';
import "./app.scss";

const container = document.getElementById('app');

const root = createRoot(container);

function App() {
  return (
    <React.StrictMode>
      <div id="ContainerPrincipal">
        <ComponenteBarraControle />
        <HashRouter>
          <Routes>
            <Route path='/' element={<PaginaHome />} />
          </Routes>
        </HashRouter>
      </div>
    </React.StrictMode>
  )
}
root.render(<App />);
