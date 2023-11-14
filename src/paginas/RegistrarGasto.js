import React, { useState, useEffect } from 'react';
import Header from '../componentes/Header';
import Boton from '../componentes/Boton';
import Card from '../componentes/Card'; // Importa el componente Card
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

const RegistrarGasto = () => {
  const { getToken } = useAuth();
  const token = getToken();

  const [monto, setMonto] = useState("");
  const [moneda, setMoneda] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [idGrupo, setIdGrupo] = useState("");
  const [idCubiertoPor, setIdCubiertoPor] = useState("");
  const [idBeneficiados, setIdBeneficiados] = useState([]);
  const [idCategoria, setIdCategoria] = useState("");
  const [usuariosGrupo, setUsuariosGrupo] = useState([]);
  const [beneficiados, setBeneficiados] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Función para obtener los usuarios del grupo por ID
  const obtenerUsuariosGrupo = async () => {
    try {
      if (!idGrupo) {
        setIdCubiertoPor(""); // Establecer el valor en blanco si idGrupo está vacío
        setIdBeneficiados([]); // Establecer el valor en blanco si idGrupo está vacío
        setUsuariosGrupo([]); // Reiniciar la lista de usuarios si idGrupo está vacío
        return;
      }
  
      const response = await axios.get(`/api/grupos/${idGrupo}/usuarios`, {
        headers: {
          'Authorization': `Bearer ${token}` // Agregar el token al encabezado de autorización
        }
      });
  
      if (response.status === 200) {
        const usuariosObtenidos = response.data;
  
        // Filtrar usuarios para obtener la lista de beneficiados excluyendo al seleccionado como cubridor
        const usuariosBeneficiados = usuariosObtenidos.filter(usuario => usuario.correo !== idCubiertoPor);
  
        setUsuariosGrupo(usuariosObtenidos);
        setBeneficiados(usuariosBeneficiados);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios del grupo:', error);
    }
  };
  

  useEffect(() => {
    if (idGrupo) {
      obtenerUsuariosGrupo(); // Llama a la función si se selecciona un grupo
    }
  }, [idGrupo]);  

  useEffect(() => {
    async function obtenerCategorias() {
      try {  
        const response = await axios.get('/api/categorias/', {
          headers: {
            'Authorization': `Bearer ${token}` // Agregar el token al encabezado de autorización
          }
        });
  
        if (response.status === 200) {
          setCategorias(response.data);
        }
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    }
  
    obtenerCategorias();
  }, []); // Sin dependencias, se ejecutará solo una vez al montar el componente
  

  const handleMontoChange = (e) => {
    const input = e.target.value;
    // Validar que el input contenga solo números y hasta dos lugares decimales
    if (/^\d+(\.\d{0,2})?$/.test(input)) {
      setMonto(input);
    }
  };
  
  
  const handleBeneficiadoChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setIdBeneficiados(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const fechaFormateada = formatearFecha(fecha);

    if (!monto || !moneda || !descripcion || !fecha || !idGrupo || !idCubiertoPor || !idBeneficiados || !idCategoria) {
      alert("Por favor complete los campos vacíos.");
      return;
    }

    const data = {
      monto: parseFloat(monto),
      moneda,
      descripcion,
      fecha,
      idGrupo: parseInt(idGrupo),
      idCubiertoPor,
      idBeneficiados: idBeneficiados.map(email => email), // Asumiendo que idBeneficiados es una lista de correos electrónicos
      idCategoria: parseInt(idCategoria)
    };

    try {
      const response = await axios.post('/api/gastos/', data, {
        headers: {
          'Authorization': `Bearer ${token}` // Agregar el token al encabezado de autorización
        }
      });
      if (response.status === 200) {
        console.log('Gasto registrado correctamente:', response.data);
        alert("Gasto registrado correctamente.");
      } else {
        console.error('Error al registrar el gasto:', response.statusText);
        alert('Error al registrar el gasto: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div id="AgregarGasto">
      <Header />
      <div style={{ marginTop: '50px' }}>
        <div className="container">
          <Card title="Registrar Gasto">
            <div>
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
                  {/* Otras opciones */}
                </select>
              </div>
              <div className="form-group">
                <input
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción"
                  className='placeholder-white'
                  style={styles.inputStyle}
                />
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
                  value={idGrupo}
                  onChange={(e) => setIdGrupo(e.target.value)}
                  placeholder="ID de Grupo"
                  className='placeholder-white'
                  style={styles.inputStyle}
                />
              </div>
              <div className="form-group">
              <select
                  value={idCubiertoPor}
                  onChange={(e) => setIdCubiertoPor(e.target.value)}
                  style={styles.selectStyle}>
                  <option value="">Seleccione una opción</option> {/* Opción predeterminada */}
                  {usuariosGrupo.map((usuario) => (
                    <option key={usuario.correo} value={usuario.correo}>
                      {usuario.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <select
                  value={idBeneficiados}
                  onChange={handleBeneficiadoChange}
                  multiple
                  style={styles.selectStyle}>
                  {beneficiados.map((usuario) => (
                    <option key={usuario.correo} value={usuario.correo}>
                      {usuario.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <select
                  value={idCategoria}
                  onChange={(e) => setIdCategoria(e.target.value)}
                  style={styles.selectStyle}>
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <Boton onClick={handleSubmit}>Registrar Gasto</Boton>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

}; export default RegistrarGasto;
