import Category from './classes/category.js';
import Product from './classes/product.js';

// URL de nuestra API
const API_URL = 'https://jolly-crumble-d611ab.netlify.app';

// Se ejectua cuando carga la página
window.addEventListener("load", () => {
    // Valores predefinidos
    const page = 1;
    let ordername = 'id';
    let direction = 'ASC';
    
    Category.loadCategory(API_URL);                             // Lista todas las categorías
    Product.loadProducts(API_URL, page, ordername, direction);  // Lista todos los productos

    // Lista productos por categoría
    let menu_category = document.querySelector('#category');
    menu_category.addEventListener('click', (e) => {
        const category = e.target.parentElement.value;
        if (category === 0) {
            Product.loadProducts(API_URL, page, ordername, direction);
        } else {
            Product.loadProductsByCategory(API_URL, category, page, ordername, direction);
        }
    });

    // Lista los productos buscados por nombre
    let buscar = document.querySelector('#buscar');
    let input = document.querySelector('#InputBuscar');
    buscar.addEventListener('click', (e) => {
        e.preventDefault();
        const product_name = input.value;
        Product.loadProductsByName(API_URL, product_name, page, ordername, direction);
    });
});