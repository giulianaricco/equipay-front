import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaListarGrupo from './paginas/ListaGrupos';
import './App.css'
import PaginaAgregarGrupo from './paginas/agregarGrupo/AgregarGrupo';
import PaginaRegistrarUsuario from './paginas/RegistrarUsuario';
import PaginaListarUsuarios from './paginas/ListarUsuarios'
import PaginaIniciarSesion from './paginas/IniciarSesion';
import PaginaAgregarCategoria from './paginas/AgregarCategoria';
import PaginaModificarCategoria from './paginas/ModificarCategoria';
import PaginaModificarPerfil from './paginas/ModificarPerfil';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PaginaInicio />} /> */}
        <Route path="/agregar-grupo" element={<PaginaAgregarGrupo />} />
        <Route path="/listar-grupos" element={<PaginaListarGrupo />} />
        <Route path="/registrar-usuario" element={<PaginaRegistrarUsuario />} />
        <Route path="/listar-usuarios" element={<PaginaListarUsuarios />} />
        <Route path="/Iniciar-sesion" element={<PaginaIniciarSesion />} />
        <Route path="/agregar-categoria" element={<PaginaAgregarCategoria />} />
        <Route path="/modificar-categoria/:categoryId" element={<PaginaModificarCategoria />} />
        <Route path="/modificar-perfil" element={<PaginaModificarPerfil />} />
      </Routes>
    </Router>
  );
}

export default App;