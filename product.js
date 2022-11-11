// URL de nuestra API
const API_URL = 'http://localhost:5000';

// Clase Producto
class Product {
    /**
     * @param {string} product_name - Nombre del producto a buscar
     * @param {string} page - Número de página a listar
     */

    // Limpia la página
    clearPage() {
        const HTMLResponse = document.querySelector('#product');
        HTMLResponse.innerHTML = '';
    }

    // Lista todos los productos
    loadProducts(page) {
        this.clearPage();

        // Variables de comprobación de métodos (paginación)
        if (!page) {
            page = 1;
        }

        // Variables de comprobación de métodos (paginación)
        const product_name = '';
        const category = '';

        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Formato de moneda
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        // Método que consume la API
        fetch(`${API_URL}/products?page=${page}`, {
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
                this.pagination(products.totalProducts, products.ITEMS_PER_PAGE, page, product_name, category);
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

                    // Paginación


                    image_container.appendChild(img);
                    article.appendChild(image_container);
                    header.appendChild(name);
                    article.appendChild(header);
                    article.appendChild(hr);
                    content.appendChild(price);
                    article.appendChild(content);

                    HTMLResponse.appendChild(article);
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Lista los productos buscados por nombre
    loadProductsByName(product_name, page) {
        this.clearPage();

        // Comporbación de página inicial
        if (!page) {
            page = 1;
        }

        // Variable de comprobación de métodos (paginación)
        const category = '';

        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Formato de moneda
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        fetch(`${API_URL}/products?product_name=${product_name}&page=${page}`, {
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
                this.pagination(products.totalProducts, products.ITEMS_PER_PAGE, page, product_name, category);
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

                    HTMLResponse.appendChild(article);
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Lista los productos por categoría
    loadProductsByCategory(category, page) {
        this.clearPage();

        // Comporbación de página inicial
        if (!page) {
            page = 1;
        }

        // Variables de comprobación de métodos (paginación)
        const product_name = '';

        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Formato de moneda
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        fetch(`${API_URL}/products/` + category+`?page=${page}`, {
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
                this.pagination(products.totalProducts, products.ITEMS_PER_PAGE, page, product_name, category);
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

                    HTMLResponse.appendChild(article);
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    pagination(totalProducts, ITEMS_PER_PAGE, page, product_name, category) {
        // Elemento principal - paginación
        const paginate = document.querySelector('#pagination');

        // Limpiar paginación
        paginate.innerHTML = '';
        
        // variables para las páginas
        const currentPage = page;
        const hasNextPage = ITEMS_PER_PAGE * page < totalProducts;
        const hasPreviousPage = page > 1;
        const nextPage = page + 1;
        const previousPage = page - 1;
        const lastPage = Math.ceil(totalProducts / ITEMS_PER_PAGE);

        // Vista de paginación
        if (currentPage === 1) {
            let a = document.createElement('a');
            a.innerHTML = '1';
            a.classList = 'active';
            paginate.appendChild(a);
        }
        if (currentPage !== 1 && previousPage !== 1) {
            let a = document.createElement('a');
            a.innerHTML = '1';
            paginate.appendChild(a);

            if (product_name !== '') {
                a.onclick = () => {
                    this.loadProductsByName(product_name, 1);
                };
            } else if (category !== '') {
                a.onclick = () => {
                    this.loadProductsByCategory(category, 1);
                };
            } else {
                a.onclick = () => {
                    this.loadProducts(1);
                };
            }
        }
        if (hasPreviousPage) {
            let b = document.createElement('a');
            b.innerHTML = `${previousPage}`;

            let c = document.createElement('a');
            c.innerHTML = `${currentPage}`;
            c.classList = 'active';

            paginate.appendChild(b);
            paginate.appendChild(c);

            if (product_name !== '') {
                b.onclick = () => {
                    this.loadProductsByName(product_name, previousPage);
                };
            } else if (category !== '') {
                b.onclick = () => {
                    this.loadProductsByCategory(category, previousPage);
                };
            } else {
                b.onclick = () => {
                    this.loadProducts(previousPage);
                };
            }
        }
        if (hasNextPage) {
            let d = document.createElement('a');
            d.innerHTML = `${nextPage}`;
            paginate.appendChild(d);

            if (product_name !== '') {
                d.onclick = () => {
                    this.loadProductsByName(product_name, nextPage);
                };
            } else if (category !== '') {
                d.onclick = () => {
                    this.loadProductsByCategory(category, nextPage);
                };
            } else {
                d.onclick = () => {
                    this.loadProducts(nextPage);
                };
            }
        }
        if (lastPage !== currentPage && nextPage !== lastPage) {
            let e = document.createElement('a');
            e.innerHTML = `${lastPage}`;
            paginate.appendChild(e);

            if (product_name !== '') {
                e.onclick = () => {
                    this.loadProductsByName(product_name, lastPage);
                };
            } else if (category !== '') {
                e.onclick = () => {
                    this.loadProductsByCategory(category, lastPage);
                };
            } else {
                e.onclick = () => {
                    this.loadProducts(lastPage);
                };
            }
        }
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
    buscar.addEventListener('click', (e) => {
        e.preventDefault();
        const product_name = input.value;
        product.loadProductsByName(product_name);
    });
});