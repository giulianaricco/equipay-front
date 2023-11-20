import React, { useState, useEffect } from 'react';
import AdminHeader from '../componentes/AdminHeader';
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

const EliminarCategoria = () => {
  const { getToken } = useAuth();
  const token = getToken();

  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState("");

  // Definir la función obtenerCategorias en el ámbito más amplio
  const obtenerCategorias = async () => {
    try {  
      const response = await axios.get('/api/categorias/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        setCategorias(response.data);
      }
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  useEffect(() => {
    // Llamar a obtenerCategorias al montar el componente
    obtenerCategorias();
  }, []); // Sin dependencias, se ejecutará solo una vez al montar el componente
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idCategoria) {
      alert("Por favor seleccione una categoría.");
      return;
    }

    try {
      const response = await fetch(`/api/categorias/${idCategoria}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        console.log('Categoría eliminada exitosamente');
        alert("Categoría eliminada exitosamente.");
        // Actualizar la lista de categorías después de la eliminación
        obtenerCategorias();
        setIdCategoria(""); // Limpiar el valor de idCategoria
      } else {
        console.error('Error inesperado:', response.statusText);
        alert('Error inesperado: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <AdminHeader /*agregar condicion por administrador logeado*//>
      {/*token /*&& isAdmin(token) &&*/ (
        <div style={{ marginTop: '50px' }}>
          <div className="container">
            <Card title="Eliminar Categoría">
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
              <Boton onClick={handleSubmit}>Eliminar</Boton>
          </Card>
        </div>
      </div>
    )}
  </div> 
  );
};

export default EliminarCategoria;
