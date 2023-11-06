class GrupoAddDto {
    constructor(nombre, descripcion, idDueño) {
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.idDueño = idDueño;
    }
  }
  
  // Ejemplo de cómo crear una instancia del DTO y enviarlo al backend
  const nuevoGrupo = new GrupoAddDto('Nombre del Grupo', 'Descripción opcional', 'ID del Dueño');
  
  // Luego, puedes enviar este objeto al backend, por ejemplo, utilizando una solicitud POST con axios:
  axios.post('http://localhost:8081/api/grupos', nuevoGrupo)
  .then((response) => {
    console.log('Grupo creado con éxito:', response.data); // Puedes mostrar la respuesta o realizar otras acciones
  })
  .catch((error) => {
    if (error.response && error.response.status === 409) {
      console.log('Error: El grupo ya existe.');
    } else {
      console.error('Error al crear el grupo:', error);
    }
  });

  