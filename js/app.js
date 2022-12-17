// Importar las clases para usar sus métodos
import Category from './classes/category.js';
import Product from './classes/product.js';

// URL de nuestra API
//const API_URL = 'https://desafio-bsale-2022-backend.herokuapp.com';
const API_URL = 'http://localhost:3000';

// Se ejectua cuando carga la página
window.addEventListener("load", () => {
    Category.loadCategory(API_URL); // Lista todas las categorías

    /**
     * Verifica si existe o tiene datos el localStorage
     * Si no existe o no tiene datos, llamará a los métodos sin asignar valores del localStorage
     */ 
    if (!localStorage || localStorage.length === 0) {
        Product.loadProducts(API_URL);  // Lista todos los productos

        // Lista productos por categoría (dropdown)
        let menu_category = document.querySelector('#category');
        menu_category.addEventListener('click', (e) => {
            localStorage.removeItem('products');
            const category = e.target.parentElement.value;
            if (category === 0) {
                Product.loadProducts(API_URL);  // Lista todos los productos
            } else {
                Product.loadProductsByCategory(API_URL, category);  // Lista productos por categoría
            }
        });

        // Lista los productos buscados por nombre (input)
        let buscar = document.querySelector('#buscar');
        let input = document.querySelector('#InputBuscar');
        buscar.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('products');
            const product_name = input.value;
            Product.loadProductsByName(API_URL, product_name);  // Lista productos por nombre
        });
    } 

    /* Si existe o tiene datos el localStorage
     * Los asigna a los métodos para recargar la página sin volver a listar todo o consultar la db nuevamente
     */
    else {
        const storage = JSON.parse(localStorage.getItem('products'));   // Almacena los datos en un JSON
        let product_name;   // Variable que almacena el nombre del producto
        let category;       // Variable que almacena el id de categoría
        
        // Lista productos por categoría (si existe localStorage, vuelve a enviar la categoría por el dropdown)
        let menu_category = document.querySelector('#category');
        menu_category.addEventListener('click', (e) => {
            localStorage.removeItem('products');
            category = e.target.parentElement.value;
            if (category === 0) {
                Product.loadProducts(API_URL);  // Lista todos los productos
            } else {
                Product.loadProductsByCategory(API_URL, category);  // Lista productos por categoría
            }
        });

        // Lista los productos buscados por nombre (si existe localStorage, vuelve a enviar el nombre por el input)
        let buscar = document.querySelector('#buscar');
        let input = document.querySelector('#InputBuscar');
        buscar.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('products');
            product_name = input.value;
            Product.loadProductsByName(API_URL, product_name);  // Lista productos por nombre
        });

        /**
         * Verifica si el localStorage contiene el nombre, categoría o ninguno
         * En caso tuviera alguno, manda el valor al método correspondiente para listarlo sin consultar la db
         */
        if (storage.product_name) {
            product_name = storage.product_name;
            Product.loadProductsByName(API_URL, product_name);
        } else if (storage.categoryId) {
            category = storage.categoryId;
            Product.loadProductsByCategory(API_URL, category);
        } else {
            Product.loadProducts(API_URL)
        }
    }

    // Limpiar el localStorage cuando pasen 10 min
    setTimeout(() => {
        localStorage.removeItem('products');
    }, 600000)
});