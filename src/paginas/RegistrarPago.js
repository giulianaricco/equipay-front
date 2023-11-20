import React, { useState, useEffect } from 'react';
import UsuarioHeader from "../componentes/UsuarioHeader";
import AdminHeader from "../componentes/AdminHeader";
import Boton from '../componentes/Boton';
import Card from '../componentes/Card';
import axios from '../utils/axios';
import { useAuth } from '../contexto/AuthContext';

const styles = {
  inputStyle: {
    width: '80%',
    backgroundColor: '#27A281', // Fondo verde
    borderRadius: '5px', // Esquinas redondeadas
    padding: '8px', // Relleno interno
    border: '1px solid white', // Borde blanco
    color: 'white', // Texto en blanco
    placeholder: 'white', // Color del marcador de posición en blanco
  },
  selectStyle: {
    width: '80%',
    backgroundColor: '#27A281', // Fondo verde
    borderRadius: '5px',
    padding: '8px',
    border: '1px solid white', // Borde blanco
    color: 'white', // Texto en blanco
    placeholder: 'white', // Color del marcador de posición en blanco
  }

};

const RegistrarPago = () => {
  const { getToken } = useAuth();
  const { user } = useAuth();
  const token = getToken();

  const [monto, setMonto] = useState("");
  const [moneda, setMoneda] = useState("");
  const [fecha, setFecha] = useState("");
  const [usuario, setUsuario] = useState("");
  const [idGrupo, setIdGrupo] = useState("");
  const [gruposUsuario, setGruposUsuario] = useState([]);
  const [deudas, setDeudas] = useState([]);
  const [deudaSeleccionada, setDeudaSeleccionada] = useState(null);
  const [sugerencias, setSugerencias] = useState([]);
  const [sugerenciaSeleccionada, setSugerenciaSeleccionada] = useState(null);
  const [monedaDeuda, setMonedaDeuda] = useState("");
  const [categorias, setCategorias] = useState([]);

  const handleDeudaClick = (deuda) => {
    setDeudaSeleccionada(deuda);
    setSugerenciaSeleccionada(null); // Limpiar la sugerencia seleccionada al cambiar deuda
    // Actualizar campos según la nueva deuda seleccionada
    setMonto("");
    setMoneda("");
    setUsuario("");
  };

  const handleSugerenciaClick = (sugerencia) => {
    setSugerenciaSeleccionada(sugerencia);
    // Actualizar campos según la nueva sugerencia seleccionada
    setMonto(sugerencia.monto.toFixed(2));
    setMoneda(sugerencia.moneda);
    setUsuario(sugerencia.usuario.correo);
  };

  const obtenerDeudas = async () => {
    try {
      if (!idGrupo || !user || !user.correo) {
        return;
      }

      const response = await axios.get(`/api/deudas?idUsuario=${user.correo}&idGrupo=${idGrupo}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        if (response.data.deudas && Array.isArray(response.data.deudas)) {
          setDeudas(response.data.deudas);

          if (response.data.deudas.length > 0) {
            const primeraDeuda = response.data.deudas[0];
            setDeudaSeleccionada(primeraDeuda);
            setSugerencias(primeraDeuda.sugerencias);
            setMonedaDeuda(primeraDeuda.moneda);
          } else {
            setDeudaSeleccionada(null);
            setSugerencias([]);
            setMonedaDeuda("");
          }
        } else {
          console.error('La propiedad deudas de la respuesta no es un array:', response.data.deudas);
        }
      }
    } catch (error) {
      console.error('Error al obtener las deudas:', error);
    }
  };

  useEffect(() => {
    obtenerDeudas();
  }, [idGrupo]);

  useEffect(() => {
    async function obtenerGruposUsuario() {
      try {
        const response = await axios.get(`/api/usuarios/${user.correo}/grupos`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setGruposUsuario(response.data);
        }
      } catch (error) {
        console.error('Error al obtener los grupos del usuario:', error);
      }
    }

    obtenerGruposUsuario();
  }, []);

  const handleMontoChange = (e) => {
    const input = e.target.value;
    if (/^\d+(\.\d{0,2})?$/.test(input)) {
      setMonto(input);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!monto || !moneda || !fecha || !idGrupo || !usuario || !user.correo) {
      alert("Por favor complete los campos vacíos.");
      return;
    }

    const data = {
      monto: parseFloat(monto),
      moneda,
      fecha,
      idGrupo: parseInt(idGrupo),
      idRealiza: user.correo,
      idRecibe: usuario,
    };

    try {
      const response = await axios.post('/api/pagos/', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        console.log('Pago registrado correctamente:', response.data);
        alert("Pago registrado correctamente.");
        // Después de realizar el pago, obtener las deudas actualizadas
        obtenerDeudas();
      } else {
        console.error('Error al registrar el pago:', response.statusText);
        alert('Error al registrar el pago: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="RegistrarPago">
      {user && user.rol === 'Usuario' && <UsuarioHeader nombre={user.nombre} />}
      {user && user.rol === 'Admin' && <AdminHeader nombre={user.nombre} />}
      <div style={{ marginTop: '50px' }}>
        <div className="container">
          <Card title="Registrar Pago">
            <div>
              <div className="form-group">
                <select
                  value={idGrupo}
                  onChange={(e) => setIdGrupo(e.target.value)}
                  style={styles.selectStyle}>
                  <option value="">Seleccione una opción</option>
                  {gruposUsuario.map((grupo) => (
                    <option key={grupo.id} value={grupo.id}>
                      {grupo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <h4>Deudas</h4>
                <ul>
                  {deudas.map((deuda) => (
                    <li
                      key={deuda.id}
                      onClick={() => handleDeudaClick(deuda)}
                      style={{
                        cursor: 'pointer',
                        color: deuda === deudaSeleccionada ? 'black' : 'white',
                        textDecoration: 'none',
                      }}
                    >
                      {deuda.moneda} {deuda.deudaEnGrupo.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>

              {deudaSeleccionada && (
                <div className="form-group">
                  <h4>Sugerencias para Pago</h4>
                  <ul>
                    {deudaSeleccionada.sugerencias.map((sugerencia) => (
                      <li
                        key={sugerencia.usuario.correo}
                        onClick={() => handleSugerenciaClick(sugerencia)}
                        style={{
                          cursor: 'pointer',
                          color: sugerencia === sugerenciaSeleccionada ? 'black' : 'white',
                          textDecoration: 'none',
                        }}
                      >
                        {sugerencia.usuario.nombre} {sugerencia.usuario.apellido} - {sugerencia.monto} {sugerencia.moneda}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="form-group">
                <input
                  value={monto}
                  onChange={handleMontoChange}
                  placeholder="Monto"
                  className='placeholder-white'
                  style={styles.inputStyle}
                />
              </div>
              <div className="form-group">
                <select
                  value={moneda}
                  onChange={(e) => setMoneda(e.target.value)}
                  style={styles.selectStyle}>
                  <option value="">Seleccione una moneda</option>
                  <option value="USD">USD</option>
                  <option value="UYU">UYU</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  value={fecha}
                  type="date"
                  onChange={(e) => setFecha(e.target.value)}
                  placeholder="Fecha"
                  className='placeholder-white'
                  style={styles.inputStyle}
                />
              </div>
              <div className="form-group">
                <input
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Correo usuario"
                  className='placeholder-white'
                  style={styles.inputStyle}
                />
              </div>

              <Boton onClick={handleSubmit}>Registrar Pago</Boton>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegistrarPago;
