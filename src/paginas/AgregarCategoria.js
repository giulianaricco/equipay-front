import React from "react";
import Header from '../componentes/Header';
import Boton from '../componentes/Boton';
import Card from '../componentes/Card'; 
import InputField from '../componentes/InputField';

//falta boton cancelar

const AgregarCategoria = () => {
    const [nombre, setNombre] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre) {
            alert("Por favor, tiene que introducir el nombre de la categoria");
            return;
        }

        const data = {
            nombre: nombre,
        }

        try {
            const response = await fetch('/api/categoria/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Categoria agregada correctamente');
                alert('Categoria agregada correctamente');
            } else if (response.status === 409) {
                console.log('Categoria ya existente');
                alert('Categoria ya existente');
            } else {
                console.error('Error inesperado:', response.statusText);
                alert('Error inesperado: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <div id="AgregarCategoria">
            <Header />
            <div style={{ marginTop: '50px' }}>
            <div className="container">
                <Card title="Categoria">
                    <div className="form-group">
                    <label>Nombre de la categoria:</label>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <InputField
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                    </div>

                    <Boton onClick={handleSubmit}>Agregar</Boton>
                </Card>
            </div>
            </div>
        </div>
    );
}

export default AgregarCategoria;