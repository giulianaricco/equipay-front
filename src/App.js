
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaListarGrupo from './paginas/ListaGrupos';
import './App.css'
import PaginaAgregarGrupo from './paginas/agregarGrupo/AgregarGrupo';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PaginaInicio />} /> */}
        <Route path="/agregar-grupo" element={<PaginaAgregarGrupo />} />
        <Route path="/listar-grupos" element={<PaginaListarGrupo />} />
      </Routes>
    </Router>
  );
}

export default App;
