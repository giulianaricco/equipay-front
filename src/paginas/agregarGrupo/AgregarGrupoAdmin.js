import React, { useState, useEffect } from 'react';
import AdminHeader from '../../componentes/AdminHeader';
import Boton from '../../componentes/Boton';
import Card from '../../componentes/Card'; 
import InputField from '../../componentes/InputField';
import SelectField from '../../componentes/SelectField';
import axios from '../../utils/axios';
import './AgregarGrupo.css';
import { useAuth } from '../../contexto/AuthContext';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const styles = {
  input: {
    width: '100%',
  },
  addButton: {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  roundedInput: {
    width: '100%',
    borderRadius: '5px', 
    padding: '8px', 
    border: '1px solid #27A281',
  },
};

// ... (importaciones)

const AgregarGrupoAdmin = () => {
    const { getToken } = useAuth();
    const { user } = useAuth();
    const token = getToken();
    const correo = user.correo;
    const navigate = useNavigate();
  
    const [nombreGrupo, setNombreGrupo] = useState('');
    const [contacto, setContacto] = useState('');
    const [mostrarBotonContinuar, setMostrarBotonContinuar] = useState(false);
    const [mostrarBotonCrearGrupo, setMostrarBotonCrearGrupo] = useState(true);
    const [descripcion, setDescripcion] = useState('');
    const [grupoIdCreated, setGrupoIdCreated] = useState(null); 
    const [correosInvitados, setCorreosInvitados] = useState(new Set());
    const [redireccionar, setRedireccionar] = useState(false);
    const [userId, setUserId] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios
          .get(`/api/usuarios/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUsuarios(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener la lista de usuarios:', error);
          });
      }, [token]);

  
  
    const handleNombreGrupoChange = (event) => {
      setNombreGrupo(event.target.value);
    };
  
    const handleContactoChange = (event) => {
      setContacto(event.target.value);
    };
  
    const handleContinuarClick = () => {
  
      setRedireccionar(true);
    };
  
    if (redireccionar) {
      return <Navigate to="/listar-grupos-admin" />;
    }
  
    const validarContacto = (contacto) => {
      const esEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto);
  
      return esEmailValido;
    };
  
    const handleDescripcionChange = (event) => {
      setDescripcion(event.target.value); // Manejar cambios en el campo de descripción
    };
  
    const handleCrearGrupoClick = () => {
      if (nombreGrupo.length >= 3) {
        setMostrarBotonContinuar(true);
        setMostrarBotonCrearGrupo(false);
      } else {
        alert('El nombre del grupo debe tener al menos 3 caracteres.');
      }
        const nuevoGrupo = {
          nombre: nombreGrupo,
          descripcion: descripcion, 
          idDueño: userId, // Reemplaza con el ID adecuado del dueño
        };
  
        axios.post('/api/grupos/', nuevoGrupo, {
          headers: {
            'Authorization': `Bearer ${token}`  // Agrega el token al encabezado de autorización
          }
        })
        .then((response) => {
          const grupoId = response.data;
          setGrupoIdCreated(grupoId);
          console.log('Grupo creado con éxito:', response.data);
        })
        .catch((error) => {
          console.error('Error al crear el grupo:', error);
        });
    };

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
      };
  
    const handleCancel = async (e) => {
      e.preventDefault();
      navigate('/welcome');
    }
    
  
    return (
      <div id="AgregarGrupo">
        <AdminHeader />
        <div className="container">
          <Card title="Agregar Grupo">
            <div>
              <div className="form-group">
                <label>Nombre del Grupo:</label>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <InputField
                    value={nombreGrupo}
                    onChange={handleNombreGrupoChange}
                    placeholder="Nombre del Grupo"
                  />
                </div>
              </div>
  
              <div className="form-group">
                <label>Descripción:</label>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <InputField
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    placeholder="Descripción (opcional)"
                  />
                </div>
              </div>

              <div className="form-group">
              <label>Dueño:</label>
              <SelectField
                value={userId}
                onChange={handleUserIdChange}
                placeholder="Seleccionar Usuario"
                options={usuarios.map((usuario) => ({ value: usuario.correo, label: usuario.correo }))}
              />
            </div>
  
            <div style={{ display: "flex", justifyContent: "center" }}>
              {mostrarBotonCrearGrupo && (
                <Boton onClick={handleCrearGrupoClick}>Crear Grupo</Boton>
              )}
              <Boton onClick={handleCancel}>Cancelar</Boton>
            </div>
  
            {mostrarBotonContinuar && (
              <Boton onClick={handleContinuarClick}>Ver mis grupos</Boton>
            )}
             
            </div>
          </Card>
        </div>
      </div>
    );
  
}; export default AgregarGrupoAdmin;
  