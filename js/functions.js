const menuCarro = document.getElementById('menu-carro');
const cerrar = document.getElementById('cerrar-carro');
const carro = document.getElementById('carrito');
const imagenVacio = document.querySelector('#containerCartEmpty i');
const textoVacio = document.querySelector('#containerCartEmpty p');

menuCarro.addEventListener('click', (e) => {
    e.preventDefault();
    carro.classList.add('showElement');
});

cerrar.addEventListener('click', (e) => {
    e.preventDefault();
    carro.classList.remove('showElement');
});

document.addEventListener('click', function clickOutside(e) {
    if (menuCarro.contains(e.target) || e.target.classList.contains('borrar-producto')) {
        return false
    } else if (!carro.contains(e.target)) {
        carro.classList.remove('showElement');
    }
})

export default class Func {
    isEmpty() {
        if (document.querySelector('tbody').hasChildNodes()) {
            imagenVacio.classList.add('d-none');
            textoVacio.classList.add('d-none');
        } else {
            imagenVacio.classList.remove('d-none');
            textoVacio.classList.remove('d-none');
        }
    }
}