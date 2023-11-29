import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './contexto/AuthContext';
import PaginaInicio from './paginas/PaginaInicio';
import WelcomePage from './paginas/WelcomePage';
import PaginaListarGrupo from './paginas/listaGrupo/ListaGrupos';
import PaginaListarGrupoAdmin from './paginas/listaGrupo/ListaGrupoAdmin';
import PaginaAgregarGrupo from './paginas/agregarGrupo/AgregarGrupo';
import PaginaDetalleGrupo from './paginas/detalleGrupo/DetalleGrupo';
import PaginaDetalleGrupoAdmin from './paginas/detalleGrupo/DetalleGrupoAdmin';
import InvitarAmigo from './paginas/invitarAmigo/invitarAmigo';
import PaginaRecuperarContrasena from './paginas/recuperarContrasena/RecuperarContrasena';
import PaginaUnirseGrupoLink from './paginas/unirseGrupo/UnirseGrupoLink';
import PaginaUnirseGrupoCodigo from './paginas/unirseGrupo/UnirseGrupoCodigo';
import PaginaAgregarGrupoAdmin from './paginas/agregarGrupo/AgregarGrupoAdmin';

import PaginaRegistrarUsuario from './paginas/RegistrarUsuario';
import PaginaListarUsuarios from './paginas/ListarUsuarios';
import PaginaRegistrarGasto from './paginas/RegistrarGasto';
import PaginaIniciarSesion from './paginas/IniciarSesion';
import PaginaEliminarCategoria from './paginas/EliminarCategoria';
import PaginaEliminarUsuario from './paginas/EliminarUsuario';
import PaginaBloquearUsuario from './paginas/BloquearUsuario';
import PaginaDesbloquearUsuario from './paginas/DesbloquearUsuario';
import PaginaEliminarCuenta from './paginas/EliminarCuenta';
import PaginaRegistrarPago from './paginas/RegistrarPago';
import PaginaConsultarDeuda from './paginas/ConsultarDeudas';
import PaginaVisualizarGraficosUser from './paginas/VisualizarGraficosUser';
import PaginaVisualizarGraficosAdmin from './paginas/VisualizarGraficosAdmin';



import PaginaAgregarCategoria from './paginas/AgregarCategoria';
import PaginaModificarCategoria from './paginas/ModificarCategoria';
import PaginaModificarPerfil from './paginas/modificarPerfil/ModificarPerfil';
import PaginaModificarPerfilAdmin from './paginas/modificarPerfil/ModificarPerfilAdmin';
import PaginaAltaUsuario from './paginas/AltaUsuario';
import PaginaVisualizarUsuario from './paginas/VisualizarUsuario';
import PaginaVisualizarGrupo from './paginas/VisualizarGrupo';
import PaginaHistorico from './paginas/HistoricoActividad';

function App() {

  const ProtectedRouteUser = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
  
    if (isAuthenticated && user.rol === 'Usuario') {
      return children;
    } 
    else {
      return <Navigate to={"/"} />;
    }
  };

  const ProtectedRouteAdmin = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
  
    if (isAuthenticated && user.rol === 'Admin') {
      return children;
    } 
    else {
      return <Navigate to={"/"} />;
    }
  };

  const ProtectedRouteGenerico = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    console.log(isAuthenticated)
    if (isAuthenticated && (user.rol === 'Admin' || user.rol === 'Usuario')) {
      return children;
    } 
    else {
      return <Navigate to={"/"} />;
    }
  };
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
            <Route 
              path="/" 
              element={<PaginaInicio />} 
              />
            <Route 
              path="/welcome" 
              element={
                <ProtectedRouteGenerico>
                  <WelcomePage />
                </ProtectedRouteGenerico>
              } 
            />
            <Route 
              path="/agregar-grupo" 
              element={
                <ProtectedRouteUser>
                  <PaginaAgregarGrupo />
                </ProtectedRouteUser>
              } 
            />
            <Route 
              path="/agregar-grupo-admin" 
              element={
              <ProtectedRouteAdmin>
                <PaginaAgregarGrupoAdmin />
              </ProtectedRouteAdmin>} 
            />
            <Route 
              path="/listar-grupos" 
              element={
                <ProtectedRouteUser>
                  <PaginaListarGrupo/>
                </ProtectedRouteUser>
              }
            />
            <Route 
              path="/listar-grupos-admin" 
              element={
                <ProtectedRouteAdmin>
                  <PaginaListarGrupoAdmin />
                </ProtectedRouteAdmin>
              } 
              />
            <Route 
              path="/registrar-usuario" 
              element={
                <PaginaRegistrarUsuario />
              } 
            />
            <Route 
              path="/listar-usuarios" 
              element={
                <ProtectedRouteAdmin>
                  <PaginaListarUsuarios />
                </ProtectedRouteAdmin>
              } 
            />
            <Route 
              path="/eliminar-categoria" 
              element={
                <ProtectedRouteAdmin>
                  <PaginaEliminarCategoria />
                </ProtectedRouteAdmin>
              } 
            />
            <Route 
              path="/registrar-gasto" 
              element={
                <ProtectedRouteUser>
                  <PaginaRegistrarGasto />
                </ProtectedRouteUser>
              } 
            />
            <Route 
              path="/iniciar-sesion" 
              element={
                  <PaginaIniciarSesion />
              } 
            />
            <Route 
              path="/eliminar-usuario" 
              element={
                <ProtectedRouteAdmin>
                  <PaginaEliminarUsuario />
                </ProtectedRouteAdmin>
              } 
            />
            <Route 
              path="/bloquear-usuario" 
              element={
                <ProtectedRouteAdmin>
                  <PaginaBloquearUsuario />
                </ProtectedRouteAdmin>
              } 
            />
            <Route 
              path="/desbloquear-usuario" 
              element={
                <ProtectedRouteAdmin>              
                  <PaginaDesbloquearUsuario />
                </ProtectedRouteAdmin>
              } 
            />
            <Route 
              path="/eliminar-cuenta" 
              element={
                <ProtectedRouteGenerico>
                  <PaginaEliminarCuenta />
                </ProtectedRouteGenerico>
              }
            />
            <Route 
              path="/registrar-pago" 
              element={
                <ProtectedRouteUser>
                  <PaginaRegistrarPago />
                </ProtectedRouteUser>
              }
            />
            <Route 
              path="/consultar-deudas" 
              element={
                <ProtectedRouteUser>
                  <PaginaConsultarDeuda />
                </ProtectedRouteUser>
              } 
            />
            <Route 
              path="/detalle-grupo/:id" 
              element={
                <ProtectedRouteUser>
                  <PaginaDetalleGrupo />
                </ProtectedRouteUser>
              } 
            />
            <Route 
              path="/detalle-grupo-admin/:id" 
              element={
                <ProtectedRouteAdmin>
                  <PaginaDetalleGrupoAdmin />
                </ProtectedRouteAdmin>
              } 
            />
            <Route 
              path="/invitar-amigo" 
              element={
                <ProtectedRouteUser>             
                  <InvitarAmigo />
                </ProtectedRouteUser>
              } 
            />
            <Route 
              path="/recuperar-contrasena" 
              element={
                  <PaginaRecuperarContrasena />
              } 
            />
            <Route 
              path="/unirse-grupo-link" 
              element={
                <ProtectedRouteUser>             
                  < PaginaUnirseGrupoLink />
                </ProtectedRouteUser>
              } 
            />
            <Route 
              path="/unirse-grupo-codigo" 
              element={
                <ProtectedRouteUser>
                  < PaginaUnirseGrupoCodigo />
                </ProtectedRouteUser>
              } 
            />
            <Route 
              path="/estadisticas-personales" 
              element={
                <ProtectedRouteUser>
                  < PaginaVisualizarGraficosUser />
                </ProtectedRouteUser>
              } 
            />
            <Route 
              path="/estadisticas"
              element={
                <ProtectedRouteAdmin>
                  < PaginaVisualizarGraficosAdmin />
                </ProtectedRouteAdmin>
              } 
            />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/Iniciar-sesion" element={<PaginaIniciarSesion />} />

        <Route 
          path="/agregar-categoria" 
          element={
            <ProtectedRouteAdmin>
              <PaginaAgregarCategoria />
            </ProtectedRouteAdmin>
          }
        />
        <Route 
          path="/modificar-categoria" 
          element={
            <ProtectedRouteAdmin>
              <PaginaModificarCategoria />
            </ProtectedRouteAdmin>
          }
        />
        <Route 
          path="/modificar-perfil" 
          element={
            <ProtectedRouteUser>
              <PaginaModificarPerfil />
            </ProtectedRouteUser>
          } 
        />
        <Route 
          path="/modificar-perfil-admin" 
          element={
            <ProtectedRouteAdmin>
              <PaginaModificarPerfilAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route 
        path="/alta-usuario" 
        element={
          <ProtectedRouteAdmin>
            <PaginaAltaUsuario />
          </ProtectedRouteAdmin>
        }
        />
        <Route 
          path="/visualizar-usuario" 
          element={
            <ProtectedRouteAdmin>
              <PaginaVisualizarUsuario />
            </ProtectedRouteAdmin>
          }
        />
        <Route 
          path="/visualizar-grupo" 
          element={
            <ProtectedRouteAdmin>
              <PaginaVisualizarGrupo />
            </ProtectedRouteAdmin>
          }
        />
        <Route 
          path="/historico-actividad" 
          element={
            <ProtectedRouteUser>
              <PaginaHistorico />
            </ProtectedRouteUser>
          }
        />
      </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
