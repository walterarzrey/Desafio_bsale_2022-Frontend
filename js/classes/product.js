// Clase Producto
export default class Product {
    /**
     * @param {string} product_name - Nombre del producto a buscar
     * @param {string} page - Número de página a listar
     */

    // Limpia la página
    static clearPage() {
        const HTMLResponse = document.querySelector('#product');
        HTMLResponse.innerHTML = '';
    }

    // Lista todos los productos
    static loadProducts(API_URL, page, ordername, direction) {
        // Limpia la página
        this.clearPage();

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
        fetch(`${API_URL}/products?page=${page}&ordername=${ordername}&direction=${direction}`, {
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
                this.pagination(API_URL, products.totalProducts, products.ITEMS_PER_PAGE, page, product_name, category, ordername, direction);
                this.sort(API_URL, product_name, category);
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
    static loadProductsByName(API_URL, product_name, page, ordername, direction) {
        this.clearPage();

        // Variable de comprobación de métodos (paginación)
        const category = '';

        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Formato de moneda
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        fetch(`${API_URL}/products?product_name=${product_name}&page=${page}&ordername=${ordername}&direction=${direction}`, {
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
                this.pagination(API_URL, products.totalProducts, products.ITEMS_PER_PAGE, page, product_name, category, ordername, direction);
                this.sort(API_URL, product_name, category);
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
    static loadProductsByCategory(API_URL, category, page, ordername, direction) {
        this.clearPage();

        // Variables de comprobación de métodos (paginación)
        const product_name = '';

        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Formato de moneda
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        fetch(`${API_URL}/products/` + category + `?page=${page}&ordername=${ordername}&direction=${direction}`, {
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
                this.pagination(API_URL, products.totalProducts, products.ITEMS_PER_PAGE, page, product_name, category, ordername, direction);
                this.sort(API_URL, product_name, category);
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

    static pagination(API_URL, totalProducts, ITEMS_PER_PAGE, page, product_name, category, ordername, direction) {
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

        /**
        * Vista de paginación (Página inicial, Página Previa, Página Actual, Página Siguiente y Página final)
        * Verificación de condiciones para ejecutar el método correcto
        */
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
                    this.loadProductsByName(API_URL, product_name, 1, ordername, direction);
                };
            } else if (category !== '') {
                a.onclick = () => {
                    this.loadProductsByCategory(API_URL, category, 1, ordername, direction);
                };
            } else {
                a.onclick = () => {
                    this.loadProducts(API_URL, 1, ordername, direction);
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
                    this.loadProductsByName(API_URL, product_name, previousPage, ordername, direction);
                };
            } else if (category !== '') {
                b.onclick = () => {
                    this.loadProductsByCategory(API_URL, category, previousPage, ordername, direction);
                };
            } else {
                b.onclick = () => {
                    this.loadProducts(API_URL, previousPage, ordername, direction);
                };
            }
        }
        if (hasNextPage) {
            let d = document.createElement('a');
            d.innerHTML = `${nextPage}`;
            paginate.appendChild(d);

            if (product_name !== '') {
                d.onclick = () => {
                    this.loadProductsByName(API_URL, product_name, nextPage, ordername, direction);
                };
            } else if (category !== '') {
                d.onclick = () => {
                    this.loadProductsByCategory(API_URL, category, nextPage, ordername, direction);
                };
            } else {
                d.onclick = () => {
                    this.loadProducts(API_URL, nextPage, ordername, direction);
                };
            }
        }
        if (lastPage !== currentPage && nextPage !== lastPage) {
            let e = document.createElement('a');
            e.innerHTML = `${lastPage}`;
            paginate.appendChild(e);

            if (product_name !== '') {
                e.onclick = () => {
                    this.loadProductsByName(API_URL, product_name, lastPage, ordername, direction);
                };
            } else if (category !== '') {
                e.onclick = () => {
                    this.loadProductsByCategory(API_URL, category, lastPage, ordername, direction);
                };
            } else {
                e.onclick = () => {
                    this.loadProducts(API_URL, lastPage, ordername, direction);
                };
            }
        }
    }

    static sort(API_URL, product_name, category) {
        // Elemento contenedor para ordenar los productos
        const inputRadio1 = document.querySelector('#Ascendente');
        const inputRadio2 = document.querySelector('#Descendente');

        // Reiniciar el check
        inputRadio1.checked = false;
        inputRadio2.checked = false;

        // Verificación de casos para ordenar en los métodos respectivos
        if (product_name !== '') {
            inputRadio1.onclick = () => {
                const ordername = 'name';
                const direction = 'ASC';
                this.loadProductsByName(API_URL, product_name, 1, ordername, direction);
            }
            inputRadio2.onclick = () => {
                const ordername = 'name';
                const direction = 'DESC';
                this.loadProductsByName(API_URL, product_name, 1, ordername, direction);
            };

        } else if (category !== '') {
            inputRadio1.onclick = () => {
                const ordername = 'name';
                const direction = 'ASC';
                this.loadProductsByCategory(API_URL, category, 1, ordername, direction);
            };
            inputRadio2.onclick = () => {
                const ordername = 'name';
                const direction = 'DESC';
                this.loadProductsByCategory(API_URL, category, 1, ordername, direction);
            };

        } else {
            inputRadio1.onclick = () => {
                const ordername = 'name';
                const direction = 'ASC';
                this.loadProducts(API_URL, 1, ordername, direction);
            };
            inputRadio2.onclick = () => {
                const ordername = 'name';
                const direction = 'DESC';
                this.loadProducts(API_URL, 1, ordername, direction);
            };
        }
    }
}