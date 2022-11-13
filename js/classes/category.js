// Clase Categoría
export default class Category {
    /**
     * Lista todas las categorías
     * @param {string} API_URL - URL del backend
     */
    static loadCategory(API_URL) {
        // Elemento principal (ul)
        const HTMLResponse = document.querySelector('#category');

        // Petición al backend mediante URL
        fetch(`${API_URL}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            // Verifica si se conectó correctamente el frontend con el backend
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Error, no se pudo conectar.');
                }
                return response.json()
            })
            .then(categories => {
                // Crea el DOM desplegable de categoría para la visualización del cliente
                categories.categories.forEach((category) => {
                    // Contenedor
                    let li = document.createElement('li');
                    li.classList = 'menu_option';
                    li.value = `${category.id}`;

                    // Nombre de la categoría
                    let name = document.createElement('a');
                    name.innerHTML = `${category.name}`.toUpperCase().charAt(0) + `${category.name}`.toLowerCase().slice(1);
                    name.classList = 'dropdown-item';
                    name.style = 'cursor: pointer';

                    // Asignación
                    li.appendChild(name)

                    HTMLResponse.appendChild(li);
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
}