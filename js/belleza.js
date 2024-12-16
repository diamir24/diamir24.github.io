// Array de productos
const productos = [
    {
        "ID": 1,
        "categoria": "Bloqueador",
        "imagen": "img/belleza/p1.png",
        "alt": "Protector Facial Nivea Sun Antiedad Q10",
        "marca": "Nivea",
        "nombre": "Protector Facial Nivea Sun Antiedad Q10",
        "descripcion": "Protege la piel de los rayos UVA / UVB y de los efectos de la luz visible de alta energía, Fórmula con Q10 previene y combate la aparición de líneas, arrugas y manchas, Sensación ligera y sedosa en la piel.",
        "genero": "Bloqueador",
        "precio": 46,
        "disponible": true
    },
    {
        "ID": 2,
        "categoria": "Limpiador",
        "imagen": "img/belleza/p2.png",
        "alt": "Gel Limpiador Espumoso CeraVe Foaming Cleanser",
        "marca": "CeraVe",
        "nombre": "Gel Limpiador Espumoso CeraVe Foaming Cleanser",
        "descripcion": "Adecuado para pieles normales a grasas,Limpiador refrescante en forma de gel espumoso, Limpia y elimina la grasa sin alterar la barrera protectora de la piel.",
        "genero": "Limpiador",
        "precio": 61,
        "disponible": true
    },
    {
        "ID": 3,
        "categoria": "Bloqueador",
        "imagen": "img/belleza/p3.png",
        "alt": "Protector Solar Facial en Crema Eucerin Oil Control FPS50+",
        "marca": "Eucerin",
        "nombre": "Protector Solar Facial en Crema Oil Control FPS50+",
        "descripcion": "Protección solar facial, Sin brillo hasta por 8 horas, Factor de protección solar 50+, Con filtros UVA y UVB, NSOC63190-14CO",
        "genero": "Bloqueador",
        "precio": 120,
        "disponible": true
    },
];

// Array para almacenar los productos en el carrito
let carrito = [];

// Función para guardar el carrito en el localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde el localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('cart-count');
    if (contadorCarrito) {
        const totalProductos = carrito.length;
        const totalPrecio = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
        contadorCarrito.textContent = `${totalProductos} productos - $${totalPrecio.toFixed(2)}`;
    }
}

// Función para mostrar productos en el contenedor
function mostrarProductos() {
    const contenedorProductos = document.getElementById("product-list");

    if (contenedorProductos) {
        productos.forEach(producto => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("col-md-4", "mb-4");

            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.src = producto.imagen;
            img.alt = producto.alt;
            img.classList.add("card-img-top");
            img.style.cursor = "pointer";
            img.onclick = () => mostrarDetalle(producto.ID);

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardTitle = document.createElement("h3");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = producto.nombre;

            const cardTextDesc = document.createElement("p");
            cardTextDesc.classList.add("card-text");
            cardTextDesc.textContent = producto.descripcion;

            const cardTextPrice = document.createElement("p");
            cardTextPrice.classList.add("card-text");
            cardTextPrice.textContent = `Precio: S/. ${producto.precio}`;

            const button = document.createElement("button");
            button.classList.add("btn", "btn-primary");
            button.textContent = "Agregar al carrito";
            button.onclick = () => agregarAlCarrito(producto.ID);

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardTextDesc);
            cardBody.appendChild(cardTextPrice);
            cardBody.appendChild(button);

            card.appendChild(img);
            card.appendChild(cardBody);

            divProducto.appendChild(card);
            contenedorProductos.appendChild(divProducto);
        });
    }
}

// Función para mostrar detalles del producto en una modal
window.mostrarDetalle = function(productoID) {
    const productoSeleccionado = productos.find(producto => producto.ID === productoID);

    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.style.width = "50%";
    modalContent.style.margin = "50px auto";
    modalContent.style.position = "relative";

    const closeButton = document.createElement("button");
    closeButton.classList.add("close");
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.left = "10px";
    closeButton.style.fontSize = "24px";
    closeButton.style.cursor = "pointer";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = () => cerrarModalDetalle(closeButton);

    const modalTitle = document.createElement("h2");
    modalTitle.style.textAlign = "center";
    modalTitle.textContent = productoSeleccionado.nombre;

    const modalImg = document.createElement("img");
    modalImg.src = productoSeleccionado.imagen;
    modalImg.alt = productoSeleccionado.alt;
    modalImg.style.width = "200px";
    modalImg.style.height = "200px";
    modalImg.style.display = "block";
    modalImg.style.margin = "0 auto";

    const modalDesc = document.createElement("p");
    modalDesc.style.textAlign = "center";
    modalDesc.textContent = productoSeleccionado.descripcion;

    const modalMarca = document.createElement("p");
    modalMarca.style.textAlign = "center";
    modalMarca.textContent = `Marca: ${productoSeleccionado.marca}`;

    const modalFecha = document.createElement("p");
    modalFecha.style.textAlign = "center";
    modalFecha.textContent = `Fecha de lanzamiento: ${productoSeleccionado.fecha}`;

    const modalGenero = document.createElement("p");
    modalGenero.style.textAlign = "center";
    modalGenero.textContent = `Categoría: ${productoSeleccionado.genero}`;

    const modalPrecio = document.createElement("p");
    modalPrecio.style.textAlign = "center";
    modalPrecio.textContent = `Precio: S/. ${productoSeleccionado.precio}`;

    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalImg);
    modalContent.appendChild(modalDesc);
    modalContent.appendChild(modalMarca);
    modalContent.appendChild(modalFecha);
    modalContent.appendChild(modalGenero);
    modalContent.appendChild(modalPrecio);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.style.display = "block";

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            cerrarModalDetalle(modal);
        }
    });
};

// Función para cerrar la modal de detalles del producto
function cerrarModalDetalle(element) {
    const modal = element.closest(".modal");
    if (modal) {
        modal.style.display = "none";
        document.body.removeChild(modal);
    }
}

// Función para mostrar la modal de confirmación
function mostrarModalConfirmacion() {
    const modal = document.getElementById('modal-confirmacion');
    modal.style.display = 'block';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 1000);
}

// Función para mostrar la modal de pago
function mostrarModalPago() {
    const modal = document.getElementById('modal-pago');
    modal.style.display = 'block';
}

// Función para cerrar la modal de pago
function cerrarModalPago() {
    const modal = document.getElementById('modal-pago');
    modal.style.display = 'none';
}

// Función para mostrar la modal de confirmación de compra
function mostrarModalConfirmacionCompra() {
    const modal = document.getElementById('modal-confirmacion-compra');
    modal.style.display = 'block';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}

// Función para procesar el pago
function procesarPago() {
    cerrarModalPago();
    mostrarModalConfirmacionCompra();
    vaciarCarrito();
}

// Función para agregar productos al carrito
function agregarAlCarrito(productoID) {
    const producto = productos.find(p => p.ID === productoID);
    const productoEnCarrito = carrito.find(p => p.ID === productoID);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    guardarCarrito();
    actualizarContadorCarrito();
    mostrarCarrito();
    mostrarModalConfirmacion();
    console.log(`Producto agregado al carrito con ID: ${productoID}`);
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(productoID) {
    carrito = carrito.filter(producto => producto.ID !== productoID);
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarCarrito();
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(productoID, cantidad) {
    const producto = carrito.find(p => p.ID === productoID);
    if (producto) {
        producto.cantidad += cantidad;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(productoID);
        } else {
            guardarCarrito();
            mostrarCarrito();
        }
    }
}

// Función para mostrar una modal
function mostrarModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'block';
}

// Función para cerrar una modal
function cerrarModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'none';
}

// Función para aplicar el descuento
function aplicarDescuento() {
    const codigoDescuento = document.getElementById('codigo-descuento').value;
    const totalPrecioElement = document.getElementById('total-precio');
    let total = parseFloat(totalPrecioElement.textContent);

    if (codigoDescuento === 'PARFUM10') {
        const descuento = total * 0.10;
        total -= descuento;
        totalPrecioElement.textContent = total.toFixed(2);
        mostrarModal('modal-descuento-aplicado');
    } else {
        mostrarModal('modal-descuento-invalido');
    }
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const contenedorCarrito = document.getElementById("carrito-list");
    const totalPrecio = document.getElementById("total-precio");
    let total = 0;

    if (contenedorCarrito) {
        contenedorCarrito.innerHTML = "";

        carrito.forEach(producto => {
            const trProducto = document.createElement("tr");

            const tdImg = document.createElement("td");
            const divImg = document.createElement("div");
            divImg.classList.add("d-flex", "align-items-center", "justify-content-center");
            const img = document.createElement("img");
            img.src = producto.imagen;
            img.alt = producto.alt;
            img.classList.add("img-thumbnail");
            img.style.width = "50px";
            divImg.appendChild(img);
            tdImg.appendChild(divImg);

            const tdNombre = document.createElement("td");
            const divNombre = document.createElement("div");
            divNombre.classList.add("d-flex", "align-items-center", "justify-content-center");
            divNombre.textContent = producto.nombre;
            tdNombre.appendChild(divNombre);

            const tdCantidad = document.createElement("td");
            tdCantidad.classList.add("quantity-control");
            const divCantidad = document.createElement("div");
            divCantidad.classList.add("d-flex", "align-items-center", "justify-content-center");
            const btnMenos = document.createElement("button");
            btnMenos.classList.add("btn", "btn-sm", "btn-secondary", "btn-circle");
            btnMenos.textContent = "-";
            btnMenos.onclick = () => actualizarCantidad(producto.ID, -1);
            const spanCantidad = document.createElement("span");
            spanCantidad.classList.add("mx-2");
            spanCantidad.textContent = producto.cantidad;
            const btnMas = document.createElement("button");
            btnMas.classList.add("btn", "btn-sm", "btn-secondary", "btn-circle");
            btnMas.textContent = "+";
            btnMas.onclick = () => actualizarCantidad(producto.ID, 1);
            divCantidad.appendChild(btnMenos);
            divCantidad.appendChild(spanCantidad);
            divCantidad.appendChild(btnMas);
            tdCantidad.appendChild(divCantidad);

            const tdPrecio = document.createElement("td");
            const divPrecio = document.createElement("div");
            divPrecio.classList.add("d-flex", "align-items-center", "justify-content-center");
            divPrecio.textContent = `$${(producto.precio * producto.cantidad).toFixed(2)}`;
            tdPrecio.appendChild(divPrecio);

            const tdEliminar = document.createElement("td");
            const divEliminar = document.createElement("div");
            divEliminar.classList.add("d-flex", "align-items-center", "justify-content-center");
            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.onclick = () => eliminarDelCarrito(producto.ID);
            divEliminar.appendChild(btnEliminar);
            tdEliminar.appendChild(divEliminar);

            trProducto.appendChild(tdImg);
            trProducto.appendChild(tdNombre);
            trProducto.appendChild(tdCantidad);
            trProducto.appendChild(tdPrecio);
            trProducto.appendChild(tdEliminar);

            contenedorCarrito.appendChild(trProducto);
            total += producto.precio * producto.cantidad;
        });

        totalPrecio.textContent = total.toFixed(2);
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarCarrito();
}

// Función para pagar el carrito
function pagarCarrito() {
    mostrarModalPago();
}

// Función para cargar opciones del filtro
function cargarOpcionesFiltro() {
    const selectGenero = document.getElementById("filtroGenero");

    if (selectGenero) {
        // Obtener géneros únicos de los productos
        const generosUnicos = [...new Set(productos.map(producto => producto.genero))];

        // Agregar la opción "Todos"
        const optionTodos = document.createElement("option");
        optionTodos.value = "todos";
        optionTodos.textContent = "Todos";
        selectGenero.appendChild(optionTodos);

        // Agregar las opciones de género
        generosUnicos.forEach(genero => {
            const option = document.createElement("option");
            option.value = genero;
            option.textContent = genero.charAt(0).toUpperCase() + genero.slice(1); 
            selectGenero.appendChild(option);
        });
    }
}

// Función para filtrar productos por género
function filtrarPorGenero(genero) {
    const contenedorProductos = document.getElementById("product-list");
    contenedorProductos.innerHTML = "";

    productos
        .filter(producto => genero === "todos" || producto.genero === genero)
        .forEach(producto => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("col-md-4", "mb-4");

            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.src = producto.imagen;
            img.alt = producto.alt;
            img.classList.add("card-img-top");
            img.style.cursor = "pointer";
            img.onclick = () => mostrarDetalle(producto.ID);

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardTitle = document.createElement("h3");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = producto.nombre;

            const cardTextDesc = document.createElement("p");
            cardTextDesc.classList.add("card-text");
            cardTextDesc.textContent = producto.descripcion;

            const cardTextPrice = document.createElement("p");
            cardTextPrice.classList.add("card-text");
            cardTextPrice.textContent = `Precio: $${producto.precio}`;

            const button = document.createElement("button");
            button.classList.add("btn", "btn-primary");
            button.textContent = "Agregar al carrito";
            button.onclick = () => agregarAlCarrito(producto.ID);

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardTextDesc);
            cardBody.appendChild(cardTextPrice);
            cardBody.appendChild(button);

            card.appendChild(img);
            card.appendChild(cardBody);

            divProducto.appendChild(card);
            contenedorProductos.appendChild(divProducto);
        });

    // Mostrar oferta especial en todas las categorías
    mostrarOfertaEspecial();
}

// Función para mostrar la oferta especial
function mostrarOfertaEspecial() {
    const ofertaBanner = document.createElement("div");
    ofertaBanner.classList.add("oferta-banner");
    ofertaBanner.textContent = "¡Los mejores precios en HuancaExpress!!!";
    ofertaBanner.style.position = "fixed";
    ofertaBanner.style.top = "10px";
    ofertaBanner.style.left = "50%";
    ofertaBanner.style.transform = "translateX(-50%)";
    ofertaBanner.style.backgroundColor = "yellow";
    ofertaBanner.style.padding = "10px";
    ofertaBanner.style.border = "2px solid black";
    ofertaBanner.style.zIndex = "1000";

    document.body.appendChild(ofertaBanner);

    setTimeout(() => {
        document.body.removeChild(ofertaBanner);
    }, 10000);
}

// Mostrar productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
    cargarOpcionesFiltro();
    mostrarProductos();
    mostrarCarrito();
    actualizarContadorCarrito();
});