import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaListarGrupo from './paginas/listaGrupo/ListaGrupos';
import './App.css'
import PaginaAgregarGrupo from './paginas/agregarGrupo/AgregarGrupo';
import PaginaDetalleGrupo from './paginas/detalleGrupo/DetalleGrupo';
import InvitarAmigo from './paginas/invitarAmigo/invitarAmigo';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PaginaInicio />} /> */}
        <Route path="/agregar-grupo" element={<PaginaAgregarGrupo />} />
        <Route path="/listar-grupos" element={<PaginaListarGrupo />} />
        <Route path="/detalle-grupo/:id" element={<PaginaDetalleGrupo />} />
        <Route path="/invitar-amigo" element={<InvitarAmigo />} />
      </Routes>
    </Router>
  );
}

export default App;
