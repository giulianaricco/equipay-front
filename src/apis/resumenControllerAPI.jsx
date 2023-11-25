import axios from 'axios';

export async function getCantidadPagosRealizados(userId, userToken) {
  const url = `http://localhost:8080/api/resumenes/usuarios/${userId}/cantidad-pagos-realizados`;

  const headers = {
    'Authorization': `Bearer ${userToken}`,
  };

  try {
    const response = await axios.get(url, {headers});
    return response.data; 
  } 
  catch (error) {
    throw error;
  }
}

export async function getValorTotalPagosRealizados(userId, userToken) {
  const url = `http://localhost:8080/api/resumenes/usuarios/${userId}/valor-total-pagos-realizados`
  const headers = {
    'Authorization': `Bearer ${userToken}`,
  };

  try {
    const response = await axios.get(url, {headers});
    return response.data; 
  } 
  catch (error) {
    throw error;
  }
}
export async function getTotalPagosPorGrupo(userId, moneda, userToken) {
  const url = `http://localhost:8080/api/resumenes/usuarios/${userId}/valor-total-pagos-realizados/${moneda}`

  const headers = {
    'Authorization': `Bearer ${userToken}`,
  };

  try {
    const response = await axios.get(url, {headers});
    return response.data; 
  } 
  catch (error) {
    throw error;
  }
}

export async function getTotalUltimosDoceMeses(userId, moneda, userToken) {
  const url = `http://localhost:8080/api/resumenes/usuarios/${userId}/gastos-cubiertos-ultimos-doce-meses/${moneda}`

  const headers = {
    'Authorization': `Bearer ${userToken}`,
  };

  try {
    const response = await axios.get(url, {headers});
    return response.data; 
  } 
  catch (error) {
    throw error;
  }
}


