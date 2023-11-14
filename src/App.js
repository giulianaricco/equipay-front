import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexto/AuthContext';
import PaginaInicio from './paginas/PaginaInicio';
import WelcomePage from './paginas/WelcomePage';
import PaginaListarGrupo from './paginas/ListaGrupos';
import PaginaAgregarGrupo from './paginas/agregarGrupo/AgregarGrupo';
import PaginaRegistrarUsuario from './paginas/RegistrarUsuario';
import PaginaListarUsuarios from './paginas/ListarUsuarios';
import PaginaRegistrarGasto from './paginas/RegistrarGasto';
import PaginaIniciarSesion from './paginas/IniciarSesion';
import PaginaEliminarCategoria from './paginas/EliminarCategoria';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/agregar-grupo" element={<PaginaAgregarGrupo />} />
            <Route path="/listar-grupos" element={<PaginaListarGrupo />} />
            <Route path="/registrar-usuario" element={<PaginaRegistrarUsuario />} />
            <Route path="/listar-usuarios" element={<PaginaListarUsuarios />} />
            <Route path="/eliminar-categoria" element={<PaginaEliminarCategoria />} />
            <Route path="/registrar-gasto" element={<PaginaRegistrarGasto />} />
          <Route path="/iniciar-sesion" element={<PaginaIniciarSesion />} />
          {/* Redirigir a la página de inicio si la ruta no coincide con ninguna de las anteriores */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
