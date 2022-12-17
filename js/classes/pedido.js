import Func from '../functions.js';
import Carrito from './carrito.js';

const carro = new Carrito();
const functions = new Func();
const productos = document.getElementById('product');
const carrito = document.getElementById('carrito');
const vaciarCarrito = document.getElementById('vaciar-carro');

cargarCarro();

function cargarCarro() {
    productos.addEventListener('click', (e) => {
        carro.comprarProducto(e);
        functions.isEmpty();
    });

    carrito.addEventListener('click', (e) => {
        carro.eliminarProducto(e);
        functions.isEmpty();
    });

    vaciarCarrito.addEventListener('click', (e) => {
        carro.vaciarCarrito(e);
        functions.isEmpty();
    });

    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage(), functions.isEmpty());
}

