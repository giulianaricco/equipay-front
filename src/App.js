import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaListarGrupo from './paginas/ListaGrupos';
import './App.css'
import PaginaAgregarGrupo from './paginas/agregarGrupo/AgregarGrupo';
import PaginaRegistrarUsuario from './paginas/RegistrarUsuario';
import PaginaListarUsuarios from './paginas/ListarUsuarios';
import PaginaRegistrarGasto from './paginas/RegistrarGasto';
import PaginaIniciarSesion from './paginas/IniciarSesion';
import PaginaEliminarCategoria from './paginas/EliminarCategoria';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PaginaInicio />} /> */}
        <Route path="/agregar-grupo" element={<PaginaAgregarGrupo />} />
        <Route path="/listar-grupos" element={<PaginaListarGrupo />} />
        <Route path="/registrar-usuario" element={<PaginaRegistrarUsuario />} />
        <Route path="/listar-usuarios" element={<PaginaListarUsuarios />} />
        <Route path="/registrar-gasto" element={<PaginaRegistrarGasto />} />
        <Route path="/iniciar-sesion" element={<PaginaIniciarSesion />} />
        <Route path="/eliminar-categoria" element={<PaginaEliminarCategoria />} />
      </Routes>
    </Router>
  );
}

export default App;