import React, { useState, useEffect } from 'react';
import UsuarioHeader from '../../componentes/UsuarioHeader';
import Card from '../../componentes/Card';
import InputField from '../../componentes/InputField';
import SelectField from '../../componentes/SelectField';
import Boton from '../../componentes/Boton';
import axios from '../../utils/axios';
import { useAuth } from '../../contexto/AuthContext';
import { useNavigate } from 'react-router-dom';

const PaginaInvitarAmigos = () => {
  const { getToken, user } = useAuth();
  const token = getToken();
  const correoUsuario = user.correo;
  const navigate = useNavigate();

  const [grupos, setGrupos] = useState([]);
  const [grupoId, setGrupoId] = useState('');
  const [contacto, setContacto] = useState('');
  const [amigos, setAmigos] = useState([]);
  const [correosInvitados, setCorreosInvitados] = useState(new Set());

  useEffect(() => {
    axios
      .get(`/api/usuarios/${correoUsuario}/grupos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGrupos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de grupos:', error);
      });
  }, [correoUsuario, token]);

  const handleGrupoIdChange = (event) => {
    setGrupoId(event.target.value);
  };

  const handleContactoChange = (event) => {
    setContacto(event.target.value);
  };

  const validarContacto = (contacto) => {
    const esEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto);
    return esEmailValido;
  };

  const handleAgregarAmigo = () => {
    if (validarContacto(contacto)) {
      if (contacto.toLowerCase() === correoUsuario.toLowerCase()) {
        alert('No puedes invitarte a ti mismo.');
        return;
      }

      if (correosInvitados.has(contacto.toLowerCase())) {
        alert('Ya has enviado una invitación a este correo.');
        return;
      }

      setAmigos([...amigos, contacto]);
      setCorreosInvitados(new Set(correosInvitados).add(contacto.toLowerCase()));
      setContacto('');

      axios
        .post(`/api/grupos/${grupoId}/invitar-amigo/${contacto}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('Amigo invitado con éxito:', response.data);
        })
        .catch((error) => {
          console.error('Error al invitar amigo:', error);
        });
    } else {
      alert('El contacto no es un email válido.');
    }
  };

  const handleContinuarClick = () => {
    navigate('/listar-grupos');
  };
  
  const handleCancel = async (e) => {
    e.preventDefault();
    navigate('/welcome');
}

  return (
    <div id="InvitarAmigos">
      <UsuarioHeader />
      <div style={{ marginTop: '50px' }} />
      <div className="container">
        <Card title="Invitar Amigos">
          <div>
            <div className="form-group">
              <label>Seleccionar Grupo:</label>
              <SelectField
                value={grupoId}
                onChange={handleGrupoIdChange}
                placeholder="Seleccionar Grupo"
                options={grupos.map((grupo) => ({ value: grupo.id, label: grupo.nombre }))}
              />
            </div>
            <div className="form-group">
              <label>Invitar a:</label>
              <InputField
                value={contacto}
                onChange={handleContactoChange}
                placeholder="Correo del amigo"
              />
              <br />
              <br />
              <Boton onClick={handleAgregarAmigo}>Invitar Amigo</Boton>
            </div>
            {amigos.length > 0 && (
              <div className="form-group">
                <label>Amigos invitados:</label>
                <ul>
                  {amigos.map((amigo, index) => (
                    <li key={index}>{amigo}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Boton onClick={handleContinuarClick}>Ver mis grupos</Boton>
              <Boton onClick={handleCancel}>Cancelar</Boton>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaginaInvitarAmigos;
