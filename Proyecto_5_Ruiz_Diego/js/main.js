const productos = [
  // ABRIGOS
  {
    id: 1,
    nombre: "Abrigo 01",
    categoria: "Abrigos",
    precio: 1000,
    imagen: "img/abrigos/01.jpg"
  },
  {
    id: 2,
    nombre: "Abrigo 02",
    categoria: "Abrigos",
    precio: 1000,
    imagen: "img/abrigos/02.jpg"
  },
  {
    id: 3,
    nombre: "Abrigo 03",
    categoria: "Abrigos",
    precio: 1000,
    imagen: "img/abrigos/03.jpg"
  },
  {
    id: 4,
    nombre: "Abrigo 04",
    categoria: "Abrigos",
    precio: 1000,
    imagen: "img/abrigos/04.jpg"
  },
  {
    id: 5,
    nombre: "Abrigo 05",
    categoria: "Abrigos",
    precio: 1000,
    imagen: "img/abrigos/05.jpg"
  },

  // PLAYERAS
{
    id: 6,
    nombre: "Camiseta 1",
    categoria: "Camisetas",
    precio: 1000,
    imagen: "img/camisetas/01.jpg"
},
{
    id: 7,
    nombre: "Camiseta 2",
    categoria: "Camisetas",
    precio: 1000,
    imagen: "img/camisetas/02.jpg"
},
{
    id: 8,
    nombre: "Camiseta 3",
    categoria: "Camisetas",
    precio: 1000,
    imagen: "img/camisetas/03.jpg"
},
{
    id: 9,
    nombre: "Camiseta 4",
    categoria: "Camisetas",
    precio: 1000,
    imagen: "img/camisetas/04.jpg"
},
{
    id: 10,
    nombre: "Camiseta 5",
    categoria: "Camisetas",
    precio: 1000,
    imagen: "img/camisetas/05.jpg"
},
{
    id: 11,
    nombre: "Camiseta 6",
    categoria: "Camisetas",
    precio: 1000,
    imagen: "img/camisetas/06.jpg"
},
{
    id: 12,
    nombre: "Camiseta 7",
    categoria: "Camisetas",
    precio: 1000,
    imagen: "img/camisetas/07.jpg"
},
{
    id: 13,
    nombre: "Camiseta 8",
    categoria: "Camisetas",
    precio: 1000,
    imagen: "img/camisetas/08.jpg"
},

  // PANTALONES
{
    id: 14,
    nombre: "Pantalón 1",
    categoria: "Pantalones",
    precio: 1000,
    imagen: "img/pantalones/01.jpg"
},
{
    id: 15,
    nombre: "Pantalón 2",
    categoria: "Pantalones",
    precio: 1000,
    imagen: "img/pantalones/02.jpg"
},
{
    id: 16,
    nombre: "Pantalón 3",
    categoria: "Pantalones",
    precio: 1000,
    imagen: "img/pantalones/03.jpg"
},
{
    id: 17,
    nombre: "Pantalón 4",
    categoria: "Pantalones",
    precio: 1000,
    imagen: "img/pantalones/04.jpg"
},
{
    id: 18,
    nombre: "Pantalón 5",
    categoria: "Pantalones",
    precio: 1000,
    imagen: "img/pantalones/05.jpg"
},
// ===== SUDADERAS =====
// ===== SUDADERAS =====
{
    id: 19,
    nombre: "Sudadera 1",
    categoria: "Sudaderas",
    precio: 1000,
    imagen: "img/sudaderas/01.jpg"
},
{
    id: 20,
    nombre: "Sudadera 2",
    categoria: "Sudaderas",
    precio: 1000,
    imagen: "img/sudaderas/02.webp"
},
{
    id: 21,
    nombre: "Sudadera 3",
    categoria: "Sudaderas",
    precio: 1000,
    imagen: "img/sudaderas/03.webp"
},
{
    id: 22,
    nombre: "Sudadera 4",
    categoria: "Sudaderas",
    precio: 1000,
    imagen: "img/sudaderas/04.webp"
},
{
    id: 23,
    nombre: "Sudadera 5",
    categoria: "Sudaderas",
    precio: 1000,
    imagen: "img/sudaderas/05.avif"
},
{
    id: 24,
    nombre: "Sudadera 6",
    categoria: "Sudaderas",
    precio: 1000,
    imagen: "img/sudaderas/06.webp"
},
// ===== ZAPATOS =====
{
    id: 25,
    nombre: "Zapatos 1",
    categoria: "Zapatos",
    precio: 1000,
    imagen: "img/zapatos/01.jpg"
},
{
    id: 26,
    nombre: "Zapatos 2",
    categoria: "Zapatos",
    precio: 1000,
    imagen: "img/zapatos/02.avif"
},
{
    id: 27,
    nombre: "Zapatos 3",
    categoria: "Zapatos",
    precio: 1000,
    imagen: "img/zapatos/03.jpg"
},
{
    id: 28,
    nombre: "Zapatos 4",
    categoria: "Zapatos",
    precio: 1000,
    imagen: "img/zapatos/04.jpg"
},
{
    id: 29,
    nombre: "Zapatos 5",
    categoria: "Zapatos",
    precio: 1000,
    imagen: "img/zapatos/05.avif"
},
{
    id: 30,
    nombre: "Zapatos 6",
    categoria: "Zapatos",
    precio: 1000,
    imagen: "img/zapatos/06.avif"
}
];

let categoriaActual = "Todos los productos";

const contenedorProductos =
  document.querySelector("#contenedor-productos");

const tituloPrincipal =
  document.querySelector("#titulo-principal");

const botonesCategoria =
  document.querySelectorAll(".boton-menu");

function formatoPrecio(precio) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(precio);
}

function mostrarProductos() {
  const lista =
    categoriaActual === "Todos los productos"
      ? productos
      : productos.filter(
          producto => producto.categoria === categoriaActual
        );

  tituloPrincipal.textContent = categoriaActual;
  contenedorProductos.innerHTML = "";

  lista.forEach(producto => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "producto";

    tarjeta.innerHTML = `
      <div class="producto-imagen">
        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
          onerror="this.onerror=null;this.src='https://placehold.co/400x400?text=Imagen+no+encontrada'"
        >
      </div>

      <div class="producto-info">
        <h3>${producto.nombre}</h3>
        <p>${formatoPrecio(producto.precio)}</p>
        <button
          class="boton-agregar"
          data-agregar="${producto.id}">
          AGREGAR
        </button>
      </div>
    `;

    contenedorProductos.appendChild(tarjeta);
  });
}

botonesCategoria.forEach(boton => {
  boton.addEventListener("click", () => {
    categoriaActual = boton.dataset.categoria;

    botonesCategoria.forEach(b => {
      b.classList.toggle("active", b === boton);
    });

    document
      .querySelector("#vista-catalogo")
      .classList.remove("oculto");

    document
      .querySelector("#vista-carrito")
      .classList.add("oculto");

    mostrarProductos();
  });
});

contenedorProductos.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-agregar]");

  if (boton) {
    agregarAlCarrito(Number(boton.dataset.agregar));
  }
});

mostrarProductos();