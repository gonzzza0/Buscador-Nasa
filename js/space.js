document.getElementById('btnBuscar').addEventListener('click', async () => {
    const query = document.getElementById('inputBuscar').value.trim();
    if (!query) {
        alert('Por favor ingresa un término de búsqueda.');
        return;
    }
    
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        displayResults(data.collection.items);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        alert('Ocurrió un error al obtener las imágenes. Intenta de nuevo más tarde.');
    }
});

function displayResults(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; // Limpiar resultados previos

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron imágenes.</p>';
        return;
    }

    items.forEach(item => {
        const { title, description, date_created } = item.data[0]; // Desestructuramos el primer objeto del array de datos
        const imageUrl = item.links[0].href; // Accede a la URL de la imagen

        const card = `
            <div class="card mb-4">
                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description || 'Sin descripción disponible.'}</p>
                    <p class="card-text"><small class="text-muted">Fecha: ${date_created}</small></p>
                </div>
            </div>
        `;
        
        contenedor.insertAdjacentHTML('beforeend', card); // Añadir la tarjeta al contenedor
    });
}
