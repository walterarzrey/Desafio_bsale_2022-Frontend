# Desafio_bsale_2022-Frontend
Frontend del Desfio Bsale 2022 (Frontend)
Bienvenido a la documentación del frontend de la tienda virtual, el cual permite mostrar los productos y categorías extraído de los endpoints del [API Rest Desafio Bsale 2022 (Backend)](https://github.com/walterarzrey/Desafio_bsale_2022-Backend).
La conexión con la API no requiere token o algún tipo de autenticación, debido a que es un desarrollo de prueba técnica.

# Contenidos 📋
* [Introducción](#introducción-)
* [Explicación del Desafio](#explicación-del-desafio-)
    1. [Estructura](#1-estructura)
    2. [Maquetación y estilos](#2-maquetación-y-estilos-)
    3. [Creación de las clases](#3-creación-de-las-clases)
    4. [Uso de las clases en App.js](#4-uso-de-las-clases-en-appjs)

## Introducción 🚀
- La aplicación esta desarrollada en JavaScript Vanilla.
- Se empleó métodos estáticos asíncronos.
- La explicación detallada se encuentra en los comentarios del código fuente.

## Explicación del Desafio 🔈
### 1. Estructura
- css
    - main.css
- js
    - classes
        - product.js
        - category.js
    - app.js
- index.html
    
### 2. Maquetación y estilos 🎨
- Se creo tres estructuras en el body de HTML: *header*, *main* y *footer*.
    - header: Se encuentra la barra de navegación con el desplegable de categorías y el formulario de búsqueda por nombre.
    - main: Se encuentra el ordenamiento y contenido (lista los productos).
    - footer: Se encuentra la paginación.
- Se asignaron `id` a los elementos principales como el main para poder generar los elementos hijos desde JavaScript.
- Se usó estilos propios y bootstrap para agilizar el diseño.

### 3. Creación de las clases
- En primer lugar, se creo la clase Product que contiene los siguientes métodos, la explicación de los argumentos de cada método se encuentra detallado en los comentarios del código fuente:
    1. clearPage - Método estático que elimina el contenido del main.
    2. currencyFormat - Función estática que da el formato moneda al precio brindado. 
    3. alert - Método estático que muestra mensajes de alerta al usuario.
    4. loadProducts - Método stático que realiza la petición de todos los productos.
    5. loadProductsByName - Método stático que realiza la petición de todos los productos filtrado por nombre.
    6. loadProductsByCategory - Método stático que realiza la petición de todos los productos filtrado por categoría.
    7. pagination - Método stático para gestionar la paginación de las distintas consultas.
    8. sort - Método stático para gestionar el ordenamiento de las distintas consultas.
- Se usó localStorage para almacenar las consultas y no volver a realizar la petición a la API.

- En segundo lugar, se creo la clase Category que contiene el siguiente método, la explicación de los argumentos de cada método se encuentra detallado en los comentarios del código fuente:
    1. loadCategory - Método statico para obtener todas las categorías.

### 4. Uso de las clases en App.js
- Se almacena la URL de la API para enviarla a los métodos de las clases.
- Se ejecutan las peticiones de productos y categorías al momento de cargar el archivo, cuando se activa el evento click y cuando se busca un determinado producto, todo mediante los filtros de nombre y categoría.
- Se usa el localStorage para evaluar si las peticiones deben o no volverse a ejecutar al momento de recargar la página.
- Finalmente se empleo un timer que reinicia los valores almacenados en el localStorage de las consultas.