document.addEventListener('DOMContentLoaded', async () => {
    fetch('js/cities.json')
        .then(response => response.json()) // Convertir la respuesta a formato JSON
        .then(data => {
            console.log(data); // Mostrar los datos en la consola
        })
        .catch(error => {
            console.error('Error al leer el archivo JSON:', error);
        });
});