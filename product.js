// URL de nuestra API
const API_URL = 'http://localhost:5000';

// Clase Producto
class Product {

    // Limpia la página
    clearPage() {
        const HTMLResponse = document.querySelector('#product');
        HTMLResponse.innerHTML = '';
    }

    // Lista todos los productos
    loadProducts() {
        this.clearPage();
        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Div principal
        const main_div = document.createElement('div');
        main_div.classList = 'grid';

        // Formato de moneda
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        // Método que consume la API
        fetch(`${API_URL}/products`, {
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
            .then(products => {
                products.products.forEach((product) => {
                    // Nombre del producto
                    let name = document.createElement('h1');
                    name.innerHTML = `${product.name}`;
                    name.classList = 'product-name'

                    // Header que contiene el nombre del producto
                    let header = document.createElement('header');
                    header.classList = 'mycard-header';

                    // Linea de division
                    let hr = document.createElement('hr');

                    // Imagen del producto
                    let img = document.createElement('img');
                    img.src = `${product.url_image}`;
                    img.alt = 'imagen-producto';

                    // Div que contiene a la imagen del producto
                    let image_container = document.createElement('div');
                    image_container.classList = 'mycard-image'

                    // Div que contiene precio y demás
                    let content = document.createElement('div');
                    content.classList = 'mycard-content';

                    // H3 que contiene el precio
                    let price = document.createElement('h3');
                    price.innerHTML = formatter.format(`${product.price}`);
                    price.classList = 'product-price';

                    // Article que contiene los datos de cada producto
                    let article = document.createElement('article');
                    article.classList = 'mycard product-item';

                    image_container.appendChild(img);
                    article.appendChild(image_container);
                    header.appendChild(name);
                    article.appendChild(header);
                    article.appendChild(hr);
                    content.appendChild(price);
                    article.appendChild(content);

                    main_div.appendChild(article);
                    HTMLResponse.appendChild(main_div);
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Lista los productos buscados por nombre
    loadProductsByName(product_name) {
        this.clearPage();
        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Div principal
        const main_div = document.createElement('div');
        main_div.classList = 'grid';

        // Formato de moneda
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        fetch(`${API_URL}/products?product_name=${product_name}`, {
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
            .then(products => {
                products.products.forEach((product) => {
                    // Nombre del producto
                    let name = document.createElement('h1');
                    name.innerHTML = `${product.name}`;
                    name.classList = 'product-name'

                    // Header que contiene el nombre del producto
                    let header = document.createElement('header');
                    header.classList = 'mycard-header';

                    // Linea de division
                    let hr = document.createElement('hr');

                    // Imagen del producto
                    let img = document.createElement('img');
                    img.src = `${product.url_image}`;
                    img.alt = 'imagen-producto';

                    // Div que contiene a la imagen del producto
                    let image_container = document.createElement('div');
                    image_container.classList = 'mycard-image'

                    // Div que contiene precio y demás
                    let content = document.createElement('div');
                    content.classList = 'mycard-content';

                    // H3 que contiene el precio
                    let price = document.createElement('h3');
                    price.innerHTML = formatter.format(`${product.price}`);
                    price.classList = 'product-price';

                    // Article que contiene los datos de cada producto
                    let article = document.createElement('article');
                    article.classList = 'mycard product-item';

                    image_container.appendChild(img);
                    article.appendChild(image_container);
                    header.appendChild(name);
                    article.appendChild(header);
                    article.appendChild(hr);
                    content.appendChild(price);
                    article.appendChild(content);

                    main_div.appendChild(article);
                    HTMLResponse.appendChild(main_div);
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Lista los productos por categoría
    loadProductsByCategory(category) {
        this.clearPage();
        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Div principal
        const main_div = document.createElement('div');
        main_div.classList = 'grid';

        // Formato de moneda
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        fetch(`${API_URL}/products/` + category, {
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
            .then(products => {
                products.products.forEach((product) => {
                    // Nombre del producto
                    let name = document.createElement('h1');
                    name.innerHTML = `${product.name}`;
                    name.classList = 'product-name'

                    // Header que contiene el nombre del producto
                    let header = document.createElement('header');
                    header.classList = 'mycard-header';

                    // Linea de division
                    let hr = document.createElement('hr');

                    // Imagen del producto
                    let img = document.createElement('img');
                    img.src = `${product.url_image}`;
                    img.alt = 'imagen-producto';

                    // Div que contiene a la imagen del producto
                    let image_container = document.createElement('div');
                    image_container.classList = 'mycard-image'

                    // Div que contiene precio y demás
                    let content = document.createElement('div');
                    content.classList = 'mycard-content';

                    // H3 que contiene el precio
                    let price = document.createElement('h3');
                    price.innerHTML = formatter.format(`${product.price}`);
                    price.classList = 'product-price';

                    // Article que contiene los datos de cada producto
                    let article = document.createElement('article');
                    article.classList = 'mycard product-item';

                    image_container.appendChild(img);
                    article.appendChild(image_container);
                    header.appendChild(name);
                    article.appendChild(header);
                    article.appendChild(hr);
                    content.appendChild(price);
                    article.appendChild(content);

                    main_div.appendChild(article);
                    HTMLResponse.appendChild(main_div);
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
}

// Se ejectua cuando carga la página
window.addEventListener("load", () => {
    let product = new Product();
    product.loadProducts();     // Lista todos los productos

    // Lista productos por categoría
    let menu_category = document.querySelector('#category');
    menu_category.addEventListener('click', (e) => {
        let category = e.target.parentElement.value;
        if (category === 0) {
            product.loadProducts();
        } else {
            product.loadProductsByCategory(category);
        }
    });

    // Lista los productos buscados por nombre
    let buscar = document.querySelector('#buscar');
    let input = document.querySelector('#InputBuscar');
    buscar.addEventListener('click', (e)=>{
        e.preventDefault();
        const product_name = input.value;
        console.log(product_name);
        product.loadProductsByName(product_name);
    });
});