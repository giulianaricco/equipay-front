import React, { useEffect } from "react";
import Header from "../componentes/AdminHeader";
import Boton from "../componentes/Boton";
import Card from "../componentes/Card";
import InputField from "../componentes/InputField";
import axios from "axios";

const VisualizarUsuario = () => {
    // obtener el id desde la URL
    const id = window.location.pathname.split("/")[2];
    const [gastos, setGastos] = React.useState([]);
    const [pagos, setPagos] = React.useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/usuarios/${id}/valor-total-gastos-cubiertos`)
        .then((response) => {
            setGastos(response.data);
        })
        .catch((error) => {
            console.error('Error al obtener la actividad del usuario:', error);
        });
    }, []);

    useEffect(() => {
        // Realizar una solicitud get para obtener la actividad de un usuario
        axios.get(`http://localhost:8080/api/usuarios/${id}/valor-total-pagos-realizados`)
        .then((response) => {
            setPagos(response.data);
        })
        .catch((error) => {
            console.error('Error al obtener la actividad del usuario:', error);
        });
    }, []);


    return (
        <div>
        <Header/>
        <div style={{ marginTop: '50px' }}>
        <div className="container">
            <Card title="Visualizar actividad">
                <ul>
                    {gastos.map((gastos) => (
                        <li key={gastos.id}>
                            <p>Descripcion: {gastos.descripcion}</p>
                            <p>Moneda: {gastos.moneda}</p>
                            <p>Monto: {gastos.monto}</p>
                            <p>Grupo: {gastos.Grupo}</p>
                        </li>
                    ))}
                </ul>
                <ul>
                    {pagos.map((pagos) => (
                        <li key={pagos.id}>
                            <p>Moneda: {pagos.moneda}</p>
                            <p>Monto: {pagos.monto}</p>
                            <p>Grupo: {pagos.Grupo}</p>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
        </div>
    </div>
    );
}

export default VisualizarUsuario;