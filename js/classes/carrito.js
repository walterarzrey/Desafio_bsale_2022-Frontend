const listaProductos = document.querySelector('#lista-carrito tbody');

// Clase Carrito
export default class Carrito {

    // Añadir productos al carrito
    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('fa-cart-shopping')) {
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

    // Leer datos de productos
    leerDatosProducto(producto) {
        const infoProducto = {
            image: producto.querySelector('img').src,
            name: producto.querySelector('h1').textContent,
            precio: producto.querySelector('h3').textContent,
            id: producto.querySelector('i').getAttribute('data-id'),
            cantidad: 1
        }

        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });
        if (productosLS === infoProducto.id) {
            return this.aumentarCantidad(productosLS);
        }

        this.insertarCarrito(infoProducto);
    }

    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-id="${producto.id}">${producto.cantidad}</td>
            <td>
                <img src="${producto.image}" width=100>
            </td>
            <td>${producto.name}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-trash-alt" data-id="${producto.id}"></a>
            </td>
        `;

        // Crear la tabla
        listaProductos.appendChild(row);

        // Guardar en el LocalStorage
        this.guardarProductosLS(producto);
    }

    aumentarCantidad(productoId) {
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === productoId) {
                productoLS.cantidad += 1;
                document.querySelector(`td[data-id="${productoId}"]`).innerHTML = productoLS.cantidad;
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoId;
        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoId = producto.querySelector('a').getAttribute('data-id');
        }

        // Eliminar producto del LocalStorage
        this.eliminarProductoLS(productoId);
    }

    vaciarCarrito(e) {
        e.preventDefault();
        while (listaProductos.hasChildNodes()) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        localStorage.removeItem('productos');
        return false;
    }

    guardarProductosLS(producto) {
        let productos;
        productos = this.obtenerProductosLS();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    eliminarProductoLS(productoId) {
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === productoId) {
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    obtenerProductosLS() {
        let productoLS;
        if (localStorage.getItem('productos') === null) {
            productoLS = [];
        } else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td data-id="${producto.id}">${producto.cantidad}</td>
            <td>
                <img src="${producto.image}" width=100>
            </td>
            <td>${producto.name}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-trash-alt" data-id="${producto.id}"></a>
            </td>
        `;

            // Crear la tabla
            listaProductos.appendChild(row);
        })
    }
}