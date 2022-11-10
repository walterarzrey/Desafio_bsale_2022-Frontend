// URL de nuestra API
const API_URL = 'http://localhost:5000';

// Clase Categoría
class Category {

    // Lista todas las categorías
    loadCategory() {
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

// Se ejectua cuando carga la página
window.addEventListener("load", () => {
    const category = new Category();
    category.loadCategory();        // Lista todas las categorías
});