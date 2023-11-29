import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { Bar } from 'react-chartjs-2';
import { useAuth } from '../../contexto/AuthContext'; 
import AdminHeader from '../../componentes/AdminHeader';
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
        borderWidth: 2,
        barThickness: 100,
        hoverBackgroundColor: ['rgba(75,192,192,0.8)', 'rgba(255,99,132,0.8)'],
        hoverBorderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        data: estadisticas.map((item) => item.valor),
      },
    ],
  };


  // Opciones de configuración de la gráfica
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100, 
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'center',
      },
    },
    layout: {
      padding: {
        left: 100,
        right: 100,
        top: 5,
        bottom: 10,
      },
    },
    width: 800,
    height: 1600,
  };

  return (
    <div>
      <AdminHeader />
      <h1>Estadísticas de Gastos</h1>
      <div>
        <Bar data={datosGrafica} options={options} />
      </div>
    </div>
  );
};

export default VisualizarGraficos;