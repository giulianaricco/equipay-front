import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Bar } from 'react-chartjs-2';
import { useAuth } from '../contexto/AuthContext'; 
import AdminHeader from '../componentes/AdminHeader';
import 'chart.js';
import 'chart.js/auto';

const VisualizarGraficos = () => {
  const { getToken } = useAuth();
  const token = getToken();
  const [estadisticas, setEstadisticas] = useState([]);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const response = await axios.get('/api/estadisticas/promedio-gastos', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.status === 200) {
          //const estadisticasArray = JSON.parse(response.data);
          setEstadisticas(response.data);
          console.log(estadisticas);
        }
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };

    fetchEstadisticas();
  }, [token]);

  if (estadisticas === null) {
    return <div>Cargando...</div>;
  }

  const datosGrafica = {
    labels: estadisticas.map((item) => item.moneda),
    datasets: [
      {
        label: 'Valor Total',
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(75,192,192,0.8)', 'rgba(255,99,132,0.8)'],
        hoverBorderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        data: estadisticas.map((item) => item.valor),
      },
    ],
  };

  return (
    <div>
      <AdminHeader />
      <h1>Estadísticas de Gastos</h1>
      <div>
        <Bar data={datosGrafica} />
        {/* Otros elementos según sea necesario */}
      </div>
    </div>
  );
};

export default VisualizarGraficos;