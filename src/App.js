import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaListarGrupo from './paginas/ListaGrupos';
import './App.css'
import PaginaAgregarGrupo from './paginas/agregarGrupo/AgregarGrupo';
import PaginaRegistrarUsuario from './paginas/RegistrarUsuario';
import PaginaListarUsuarios from './paginas/ListarUsuarios'
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PaginaInicio />} /> */}
        <Route path="/agregar-grupo" element={<PaginaAgregarGrupo />} />
        <Route path="/listar-grupos" element={<PaginaListarGrupo />} />
        <Route path="/registrar-usuario" element={<PaginaRegistrarUsuario />} />
        <Route path="/listar-usuarios" element={<PaginaListarUsuarios />} />
      </Routes>
    </Router>
  );
}

export default App;