document.addEventListener("DOMContentLoaded", function () {
  const cantidades = document.querySelectorAll(".cantidad");
  const precios = document.querySelectorAll(".precio");
  const subtotalSpan = document.getElementById("subtotal");
  const totalSpan = document.getElementById("total");
  const totalUnidades = document.getElementById("totalUnidades");

  function actualizarResumen() {
    let subtotal = 0;
    let totalProductos = 0;

    precios.forEach((precio, index) => {
      const precioUnitario = parseFloat(precio.dataset.precio);
      const cantidadInput = document.getElementById("cantidad");
      const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;
      subtotal += precioUnitario * cantidad;
      totalProductos += cantidad;
    });

    subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
    totalSpan.textContent = `$${subtotal.toFixed(2)}`;
    if (totalUnidades) {
      totalUnidades.textContent = totalProductos;
    }
  }

  actualizarResumen();

  const cantidadInput = document.getElementById("cantidad");
  if (cantidadInput) {
    cantidadInput.addEventListener("change", actualizarResumen);
  }
});

