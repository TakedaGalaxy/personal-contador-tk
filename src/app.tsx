import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import PaginaHome from './paginas/home/home';

const container = document.getElementById('app');

const root = createRoot(container);

function App() {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path='/' element={<PaginaHome />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  )
}
root.render(<App />);
