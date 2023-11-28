import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useAuth } from '../contexto/AuthContext'; 
import AdminHeader from '../componentes/AdminHeader';
import {getValorTotalPagosRealizados, getTotalPagosPorGrupo, getTotalUltimosDoceMeses} from '../apis/resumenControllerAPI'
import 'chart.js';
import 'chart.js/auto';

const VisualizarGraficos = () => {
  const { getToken, user } = useAuth();
  const token = getToken();

  const [isLoading, setIsLoading] = useState(false);
  const [pagosEnPesos, setPagosEnPesos] = useState([]);
  const [pagosEnDolares, setPagosEnDolares] = useState([]);
  const [pagosPorGrupos, setPagosPorGrupos] = useState([]);
  const [totalUltimosDoceMeses, setTotalUltimosDoceMeses] = useState([]);

	
	const fetchData = async () => {
		try {
			setIsLoading(true)
			const pagos = await getValorTotalPagosRealizados(user.correo, token);
      console.log('pagos', pagos)
			const pagosPorGrupo = await getTotalPagosPorGrupo(user.correo, 'UYU', token);
      console.log('pagosPorGrupo', pagosPorGrupo)
			const gatosCubiertosUltimosDoceMeses = await getTotalUltimosDoceMeses(user.correo, 'UYU', token);
      console.log('gatosCubiertosUltimosDoceMeses', gatosCubiertosUltimosDoceMeses)
			if(pagos.length !=0){
        const deudasEnPesos = [];
        const deudasEnDolares = [];
  
        pagos.forEach((pago) => {
          if (pago.moneda === "USD") {
            deudasEnDolares.push(pago);
          } 
          else if (pago.moneda === "UYU") {
            deudasEnPesos.push(pago);
          }
        });
        setPagosEnPesos(deudasEnPesos);
        setPagosEnDolares(deudasEnDolares);
				setPagosPorGrupos(pagosPorGrupo);
				setTotalUltimosDoceMeses(gatosCubiertosUltimosDoceMeses);
			}
		}
		catch (error) {
			console.error('Error:', error);
			if (error.response) {
				// Si la respuesta contiene datos, imprime el cuerpo de la respuesta
				console.log('Cuerpo de la respuesta de error:', error.response.data);
			}
		} 
		finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
      fetchData();
  }, []);

  const datosTotalGastosPorMes = {
    labels: totalUltimosDoceMeses.map(item => item.mesAbreviado),
    datasets: [
      {
        label: 'Total gastos por Mes',
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        borderWidth: 3,
        hoverBackgroundColor: ['rgba(75,192,192,0.8)', 'rgba(255,99,132,0.8)'],
        hoverBorderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        data: totalUltimosDoceMeses.map(item => item.valor)
      }
    ]
  }

  const datosTotalGastosPorMoneda = {
    labels: ['UYU', 'USD'],
    datasets: [
      {
        label: 'Total pagos por moneda',
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(75,192,192,0.8)', 'rgba(255,99,132,0.8)'],
        hoverBorderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        data: [pagosEnPesos.length !== 0 ? pagosEnPesos[0].valor : 0, pagosEnDolares.length !== 0 ? pagosEnDolares[0].valor : 0],
      },
    ],
  }

  const datosTotalPagosPorGrupo = {
    labels: pagosPorGrupos.map(item => item.nombreGrupo),
    datasets: [
      {
        label: 'Total pagos por grupo',
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(75,192,192,0.8)', 'rgba(255,99,132,0.8)'],
        hoverBorderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        data: pagosPorGrupos.map(item => item.valor),
      },
    ],
  }

  // Opciones de configuración de la gráfica
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <AdminHeader />
      <h1>Estadísticas Personales</h1>
      <div>
        <Line data={datosTotalGastosPorMes} options={options} redraw/>
      </div>
      <div>
        <Bar data={datosTotalGastosPorMoneda} options={options} redraw/>
      </div>
      <div>
        <Bar data={datosTotalPagosPorGrupo} options={options} redraw/>
      </div>
    </div>
  );
};

export default VisualizarGraficos;