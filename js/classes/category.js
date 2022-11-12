// Clase Categoría
export default class Category {

    // Lista todas las categorías
    static loadCategory(API_URL) {
        // Elemento principal (ul)
        const HTMLResponse = document.querySelector('#category');

        //Método que consume la API
        fetch(`${API_URL}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Error, no se pudo conectar.');
                }
                return response.json()
            })
            .then(categories => {
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

                    li.appendChild(name)
                    HTMLResponse.appendChild(li);
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
}