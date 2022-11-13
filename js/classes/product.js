// Clase Producto
export default class Product {
    /**
     * Limpia el DOM
     */
    static clearPage() {
        const HTMLResponse = document.querySelector('#product');
        HTMLResponse.innerHTML = '';
    }

    /**
     * Aplica formato de moneda a los precios
     */
    static currencyFormat(price) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return formatter.format(price);
    }

    /**
     * Muestra mensajes de alerta al usuario
     */
    static alert(message) {
        const alert = document.querySelector('#alert');
        alert.innerHTML = message;
        alert.classList.remove('hide');
        alert.classList.add('show');
    }

    /**
     * Lista todos los productos
     * @param {string} API_URL - URL del backend
     * @param {integer} page - Número de página a listar
     * @param {string} ordername - Texto por el que se ordenarán los productos
     * @param {string} direction - Dirección (Ascendente o Descendente) por la que se ordenarán los productos
     */
    static async loadProducts(API_URL, page = 1, ordername = 'id', direction = 'ASC') {
        let productsData = [];      // Variable que almacenará los productos listados
        let productsObject = [];    // Variable que almacena los datos del objeto

        // Limpia la página
        this.clearPage();

        // Oculta mensajes para el usuario
        document.querySelector('#alert').classList.remove('show');
        document.querySelector('#alert').classList.add('hide');

        // Variables de comprobación de métodos (paginación)
        const product_name = '';
        const category = '';

        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Verifica si el localStorage está vacio para consumir los datos del backend (consulta base de datos)
        try {
            if (!localStorage.getItem('products')) {
                // Petición al backend mediante URL
                const response = await fetch(`${API_URL}/products?page=${page}&ordername=${ordername}&direction=${direction}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                // Verifica si se conectó correctamente el frontend con el backend
                if (response.status !== 200) {
                    this.alert('Por favor recargue la página.');    // Envía mensaje al usuario
                    throw new Error('Error, no se pudo conectar.');
                }
                productsObject = await response.json();     // Almacena el objeto
                productsData = productsObject.products;     // Almacena los datos de productos
                localStorage.setItem('products', JSON.stringify(productsObject));   // Almacena datos de productos en el localStorage
            }

            // Si el localStorage no está vacio, usará los datos de productos y objeto ya almacenados
            else {
                productsObject = JSON.parse(localStorage.getItem('products'));  // Almacena el objeto
                productsData = productsObject.products;     // Almacena los datos de productos
            }
        } catch (error) {
            console.log(error);
        }

        // Envía los datos del objeto para su paginación y ordenamiento
        this.pagination(API_URL, productsObject.totalProducts, productsObject.ITEMS_PER_PAGE, productsObject.page, product_name, category, productsObject.ordername, productsObject.direction);
        this.sort(API_URL, product_name, category);

        // Genera y devuelve el DOM para la visualización del cliente
        return productsData.forEach((product) => {
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
            price.innerHTML = this.currencyFormat(`${product.price}`);  // Se envia el precio para darle formato
            price.classList = 'product-price';

            // Icono de carrito de compras
            let cart = document.createElement('i');
            cart.classList = 'fa-solid fa-cart-shopping';

            // Article que contiene los datos de cada producto
            let article = document.createElement('article');
            article.classList = 'mycard product-item';

            // Asignación
            image_container.appendChild(img);
            article.appendChild(image_container);
            header.appendChild(name);
            article.appendChild(header);
            article.appendChild(hr);
            content.appendChild(price);
            content.appendChild(cart);
            article.appendChild(content);

            HTMLResponse.appendChild(article);
        });
    }

    /**
     * Lista todos los productos por nombre
     * @param {string} API_URL - URL del backend
     * @param {string} product_name - Nombre del producto
     * @param {integer} page - Número de página a listar
     * @param {string} ordername - Texto por el que se ordenarán los productos
     * @param {string} direction - Dirección (Ascendente o Descendente) por la que se ordenarán los productos
     */
    static async loadProductsByName(API_URL, product_name, page = 1, ordername = 'id', direction = 'ASC') {
        let productsData = [];      // Variable que almacenará los productos listados
        let productsObject = [];    // Variable que almacena los datos del objeto

        // Limpia la página
        this.clearPage();

        // Oculta mensajes para el usuario
        document.querySelector('#alert').classList.remove('show');
        document.querySelector('#alert').classList.add('hide');

        // Variable de comprobación de métodos (paginación)
        const category = '';

        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Verifica si el localStorage está vacio para consumir los datos del backend (consulta base de datos)
        try {
            if (!localStorage.getItem('products')) {
                // Petición al backend mediante URL
                const response = await fetch(`${API_URL}/products?product_name=${product_name}&page=${page}&ordername=${ordername}&direction=${direction}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                // Verifica si se conectó correctamente el frontend con el backend
                if (response.status !== 200) {
                    this.alert('Por favor recargue la página.');    // Envía mensaje al usuario
                    throw new Error('Error, no se pudo conectar.');
                }
                productsObject = await response.json();     // Almacena el objeto
                productsData = productsObject.products;     // Almacena los datos de productos
                localStorage.setItem('products', JSON.stringify(productsObject));   // Almacena datos de productos en el localStorage

                // Verifica si existen productos y manda alerta
                if (productsData.length === 0) {
                    this.alert('Todavia no contamos con ese producto.');
                }
            }

            // Si el localStorage no está vacio, usará los datos de productos y objeto ya almacenados
            else {
                productsObject = JSON.parse(localStorage.getItem('products'));  // Almacena el objeto
                productsData = productsObject.products;     // Almacena los datos de productos

                // Verifica si existen productos y manda alerta
                if (productsData.length === 0) {
                    this.alert('Todavia no contamos con ese producto.');
                }
            }
        } catch (error) {
            console.log(error);
        }

        // Envía los datos del objeto para su paginación y ordenamiento
        this.pagination(API_URL, productsObject.totalProducts, productsObject.ITEMS_PER_PAGE, productsObject.page, product_name, category, productsObject.ordername, productsObject.direction);
        this.sort(API_URL, product_name, category);

        // Genera y devuelve el DOM para la visualización del cliente
        return productsData.forEach((product) => {
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
            price.innerHTML = this.currencyFormat(`${product.price}`);  // Se envia el precio para darle formato
            price.classList = 'product-price';

            // Icono de carrito de compras
            let cart = document.createElement('i');
            cart.classList = 'fa-solid fa-cart-shopping';

            // Article que contiene los datos de cada producto
            let article = document.createElement('article');
            article.classList = 'mycard product-item';

            // Asignación
            image_container.appendChild(img);
            article.appendChild(image_container);
            header.appendChild(name);
            article.appendChild(header);
            article.appendChild(hr);
            content.appendChild(price);
            content.appendChild(cart);
            article.appendChild(content);

            HTMLResponse.appendChild(article);
        });
    }

    /**
     * Lista los productos por categoría
     * @param {string} API_URL - URL del backend
     * @param {string} category - Id de la categoría
     * @param {integer} page - Número de página a listar
     * @param {string} ordername - Texto por el que se ordenarán los productos
     * @param {string} direction - Dirección (Ascendente o Descendente) por la que se ordenarán los productos
     */
    static async loadProductsByCategory(API_URL, category, page = 1, ordername = 'id', direction = 'ASC') {
        let productsData = [];      // Variable que almacenará los productos listados
        let productsObject = [];    // Variable que almacena los datos del objeto

        // Limpia la página
        this.clearPage();

        // Oculta mensajes para el usuario
        document.querySelector('#alert').classList.remove('show');
        document.querySelector('#alert').classList.add('hide');

        // Variables de comprobación de métodos (paginación)
        const product_name = '';

        // Elemento principal (main)
        const HTMLResponse = document.querySelector('#product');

        // Verifica si el localStorage está vacio para consumir los datos del backend (consulta base de datos)
        try {
            if (!localStorage.getItem('products')) {
                // Petición al backend mediante URL
                const response = await fetch(`${API_URL}/products/` + category + `?page=${page}&ordername=${ordername}&direction=${direction}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                // Verifica si se conectó correctamente el frontend con el backend
                if (response.status !== 200) {
                    this.alert('Por favor recargue la página.');
                    throw new Error('Error, no se pudo conectar.');
                }
                productsObject = await response.json();     // Almacena el objeto
                productsData = productsObject.products;     // Almacena los datos de productos
                localStorage.setItem('products', JSON.stringify(productsObject));   // Almacena datos de productos en el localStorage
            }

            // Si el localStorage no está vacio, usará los datos de productos y objeto ya almacenados
            else {
                productsObject = JSON.parse(localStorage.getItem('products'));  // Almacena el objeto
                productsData = productsObject.products;     // Almacena los datos de productos
            }
        } catch (error) {
            console.log(error);
        }

        // Envía los datos del objeto para su paginación y ordenamiento
        this.pagination(API_URL, productsObject.totalProducts, productsObject.ITEMS_PER_PAGE, productsObject.page, product_name, category, productsObject.ordername, productsObject.direction);
        this.sort(API_URL, product_name, category);

        // Genera y devuelve el DOM para la visualización del cliente
        return productsData.forEach((product) => {
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
            price.innerHTML = this.currencyFormat(`${product.price}`);  // Se envia el precio para darle formato
            price.classList = 'product-price';

            // Icono de carrito de compras
            let cart = document.createElement('i');
            cart.classList = 'fa-solid fa-cart-shopping';

            // Article que contiene los datos de cada producto
            let article = document.createElement('article');
            article.classList = 'mycard product-item';

            // Asignación
            image_container.appendChild(img);
            article.appendChild(image_container);
            header.appendChild(name);
            article.appendChild(header);
            article.appendChild(hr);
            content.appendChild(price);
            content.appendChild(cart);
            article.appendChild(content);

            HTMLResponse.appendChild(article);
        });
    }

    /**
     * Crea la pagínación en el DOM y lo ejecuta de acuerdo a los filtros de productos establecidos (métodos)
     * @param {string} API_URL - URL del backend
     * @param {integer} totalProducts - Cantidad de productos en total por filtro
     * @param {integer} ITEMS_PER_PAGE - Cantidad de productos listados por página
     * @param {integer} page - Número de página a listar
     * @param {string} product_name - Nombre del producto
     * @param {string} category - Id de la categoría
     * @param {string} ordername - Texto por el que se ordenarán los productos
     * @param {string} direction - Dirección (Ascendente o Descendente) por la que se ordenarán los productos
     */
    static pagination(API_URL, totalProducts, ITEMS_PER_PAGE, page, product_name, category, ordername, direction) {
        // Elemento principal - paginación
        const paginate = document.querySelector('#pagination');

        // Limpiar paginación
        paginate.innerHTML = '';

        // Variables para las páginas
        const currentPage = page;
        const hasNextPage = ITEMS_PER_PAGE * page < totalProducts;
        const hasPreviousPage = page > 1;
        const nextPage = page + 1;
        const previousPage = page - 1;
        const lastPage = Math.ceil(totalProducts / ITEMS_PER_PAGE);

        /**
        * Vista de paginación (Página inicial, Página Previa, Página Actual, Página Siguiente y Página final)
        * Verificación de condiciones para ejecutar el método correcto
        * También se verifica que los cálculos de páginas sean números, si no lo son no se crean
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
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProductsByName(API_URL, product_name, 1, ordername, direction);
                };
            } else if (category !== '') {
                a.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProductsByCategory(API_URL, category, 1, ordername, direction);
                };
            } else {
                a.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProducts(API_URL, 1, ordername, direction);
                };
            }
        }
        if (hasPreviousPage && !isNaN(previousPage)) {
            let b = document.createElement('a');
            b.innerHTML = `${previousPage}`;

            let c = document.createElement('a');
            c.innerHTML = `${currentPage}`;
            c.classList = 'active';

            paginate.appendChild(b);
            paginate.appendChild(c);

            if (product_name !== '') {
                b.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProductsByName(API_URL, product_name, previousPage, ordername, direction);
                };
            } else if (category !== '') {
                b.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProductsByCategory(API_URL, category, previousPage, ordername, direction);
                };
            } else {
                b.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProducts(API_URL, previousPage, ordername, direction);
                };
            }
        }
        if (hasNextPage && !isNaN(nextPage)) {
            let d = document.createElement('a');
            d.innerHTML = `${nextPage}`;
            paginate.appendChild(d);

            if (product_name !== '') {
                d.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProductsByName(API_URL, product_name, nextPage, ordername, direction);
                };
            } else if (category !== '') {
                d.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProductsByCategory(API_URL, category, nextPage, ordername, direction);
                };
            } else {
                d.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProducts(API_URL, nextPage, ordername, direction);
                };
            }
        }
        if (lastPage !== currentPage && nextPage !== lastPage && lastPage !== 0 && !isNaN(lastPage)) {
            let e = document.createElement('a');
            e.innerHTML = `${lastPage}`;
            paginate.appendChild(e);

            if (product_name !== '') {
                e.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProductsByName(API_URL, product_name, lastPage, ordername, direction);
                };
            } else if (category !== '') {
                e.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProductsByCategory(API_URL, category, lastPage, ordername, direction);
                };
            } else {
                e.onclick = () => {
                    // Limpia el localStorage para hacer fetch de otra página
                    localStorage.clear();
                    this.loadProducts(API_URL, lastPage, ordername, direction);
                };
            }
        }
    }

    /**
     * Crea el ordenamiento en el DOM y lo ejecuta de acuerdo a los filtros de productos establecidos (métodos)
     * @param {string} API_URL - URL del backend
     * @param {string} product_name - Nombre del producto
     * @param {string} category - Id de la categoría
     */
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
                // Limpia el localStorage para hacer fetch de otra página
                localStorage.clear();
                const ordername = 'name';
                const direction = 'ASC';
                this.loadProductsByName(API_URL, product_name, 1, ordername, direction);
            }
            inputRadio2.onclick = () => {
                // Limpia el localStorage para hacer fetch de otra página
                localStorage.clear();
                const ordername = 'name';
                const direction = 'DESC';
                this.loadProductsByName(API_URL, product_name, 1, ordername, direction);
            };

        } else if (category !== '') {
            inputRadio1.onclick = () => {
                // Limpia el localStorage para hacer fetch de otra página
                localStorage.clear();
                const ordername = 'name';
                const direction = 'ASC';
                this.loadProductsByCategory(API_URL, category, 1, ordername, direction);
            };
            inputRadio2.onclick = () => {
                // Limpia el localStorage para hacer fetch de otra página
                localStorage.clear();
                const ordername = 'name';
                const direction = 'DESC';
                this.loadProductsByCategory(API_URL, category, 1, ordername, direction);
            };

        } else {
            inputRadio1.onclick = () => {
                // Limpia el localStorage para hacer fetch de otra página
                localStorage.clear();
                const ordername = 'name';
                const direction = 'ASC';
                this.loadProducts(API_URL, 1, ordername, direction);
            };
            inputRadio2.onclick = () => {
                // Limpia el localStorage para hacer fetch de otra página
                localStorage.clear();
                const ordername = 'name';
                const direction = 'DESC';
                this.loadProducts(API_URL, 1, ordername, direction);
            };
        }
    }
}