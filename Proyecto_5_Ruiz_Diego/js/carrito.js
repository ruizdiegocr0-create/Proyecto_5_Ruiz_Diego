
const CLAVE_CARRITO = "carpishop-carrito-v1";

let carrito = [];

try {
  carrito = JSON.parse(
    localStorage.getItem(CLAVE_CARRITO) || "[]"
  );

  if (!Array.isArray(carrito)) {
    carrito = [];
  }
} catch {
  carrito = [];
}

const numeroCarrito =
  document.querySelector("#numero-carrito");

const numeroCarritoMovil =
  document.querySelector("#numero-carrito-movil");

const filasCarrito =
  document.querySelector("#filas-carrito");

const mensajeCarritoVacio =
  document.querySelector("#mensaje-carrito-vacio");

const totalPagina =
  document.querySelector("#total-pagina");

const aviso = document.querySelector("#aviso");

let temporizadorAviso;

function mostrarAviso(mensaje) {
  aviso.textContent = mensaje;
  aviso.classList.add("visible");

  clearTimeout(temporizadorAviso);

  temporizadorAviso = setTimeout(() => {
    aviso.classList.remove("visible");
  }, 2200);
}

function guardarCarrito() {
  localStorage.setItem(
    CLAVE_CARRITO,
    JSON.stringify(carrito)
  );
}

function formatoPrecio(precio) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(precio);
}

// Abre la página del carrito.
function abrirVistaCarrito() {
  document
    .querySelector("#vista-catalogo")
    .classList.add("oculto");

  document
    .querySelector("#vista-carrito")
    .classList.remove("oculto");

  document.querySelectorAll(".boton-menu").forEach(boton => {
    boton.classList.remove("active");
  });

  actualizarCarrito();
}

// Agrega un producto o aumenta su cantidad.
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);

  if (!producto) return;

  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  actualizarCarrito();
  mostrarAviso(`${producto.nombre} agregado al carrito`);
}

// Cambia la cantidad de un producto.
function cambiarCantidad(id, cambio) {
  const item = carrito.find(p => p.id === id);

  if (!item) return;

  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  actualizarCarrito();
}

// Muestra los productos del carrito y calcula el total.
function actualizarCarrito() {
  const cantidadTotal = carrito.reduce(
    (suma, producto) => suma + producto.cantidad,
    0
  );

  numeroCarrito.textContent = cantidadTotal;
  numeroCarritoMovil.textContent = cantidadTotal;

  filasCarrito.innerHTML = "";

  mensajeCarritoVacio.classList.toggle(
    "oculto",
    carrito.length > 0
  );

  carrito.forEach(producto => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>
        <img class="miniatura-carrito" alt="${producto.nombre}">
      </td>

      <td class="nombre-tabla">
        <strong>${producto.nombre}</strong>
      </td>

      <td>
        <div class="cantidad-tabla">
          <button
            data-cambiar="${producto.id}"
            data-cambio="-1"
            aria-label="Restar cantidad">−</button>

          <span>${producto.cantidad}</span>

          <button
            data-cambiar="${producto.id}"
            data-cambio="1"
            aria-label="Aumentar cantidad">+</button>
        </div>
      </td>

      <td>${formatoPrecio(producto.precio)}</td>

      <td class="subtotal">
        ${formatoPrecio(producto.precio * producto.cantidad)}
      </td>

      <td>
        <button
          class="quitar-item"
          data-quitar="${producto.id}"
          aria-label="Eliminar ${producto.nombre}">×</button>
      </td>
    `;

    // Carga la misma imagen que aparece en el catálogo.
    const img = fila.querySelector("img");

    const extensiones = [
      ".jpg", ".jpeg", ".png", ".webp",
      ".JPG", ".PNG"
    ];

    let intento = 0;

    img.onerror = () => {
      intento++;

      if (intento < extensiones.length) {
        img.src = producto.imagen + extensiones[intento];
      } else {
        img.onerror = null;
        img.src =
          "https://placehold.co/100x120/f0edf7/3454bd?text=Foto";
      }
    };

    img.src = producto.imagen + extensiones[0];

    filasCarrito.appendChild(fila);
  });

  const total = carrito.reduce(
    (suma, producto) =>
      suma + producto.precio * producto.cantidad,
    0
  );

  totalPagina.textContent = formatoPrecio(total);

  guardarCarrito();
}

// Botones para abrir el carrito.
document
  .querySelector("#boton-carrito")
  .addEventListener("click", abrirVistaCarrito);

document
  .querySelector("#boton-carrito-movil")
  .addEventListener("click", abrirVistaCarrito);

// Botones de cantidad y eliminar.
filasCarrito.addEventListener("click", evento => {
  const botonCantidad = evento.target.closest("[data-cambiar]");
  const botonQuitar = evento.target.closest("[data-quitar]");

  if (botonCantidad) {
    cambiarCantidad(
      Number(botonCantidad.dataset.cambiar),
      Number(botonCantidad.dataset.cambio)
    );
  }

  if (botonQuitar) {
    carrito = carrito.filter(
      producto =>
        producto.id !== Number(botonQuitar.dataset.quitar)
    );

    actualizarCarrito();
    mostrarAviso("Producto eliminado");
  }
});

// Vaciar el carrito.
document
  .querySelector("#vaciar-carrito")
  .addEventListener("click", () => {
    if (!carrito.length) {
      mostrarAviso("El carrito ya está vacío");
      return;
    }

    carrito = [];
    actualizarCarrito();
    mostrarAviso("Carrito vaciado");
  });

// Botón de compra de demostración.
document
  .querySelector("#finalizar-compra")
  .addEventListener("click", () => {
    if (!carrito.length) {
      mostrarAviso("Tu carrito está vacío");
      return;
    }

    mostrarAviso(
      "Compra de demostración: no se procesan pagos reales"
    );
  });

// Carga el estado guardado al abrir la tienda.
actualizarCarrito();
