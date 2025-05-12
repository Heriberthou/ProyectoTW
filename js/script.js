document.addEventListener("DOMContentLoaded", function () {
  const cantidades = document.querySelectorAll(".cantidad");
  const precios = document.querySelectorAll(".precio");
  const subtotalSpan = document.getElementById("subtotal");
  const totalSpan = document.getElementById("total");
  const totalUnidades = document.getElementById("totalUnidades");

  function actualizarResumen() {
    if (!subtotalSpan || !totalSpan || !totalUnidades) return;

    let subtotal = 0;
    let totalProductos = 0;

    cantidades.forEach((select, index) => {
      const cantidad = parseInt(select.value);
      const precioUnitario = parseFloat(precios[index].dataset.precio);
      subtotal += cantidad * precioUnitario;
      totalProductos += cantidad;
    });

    subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
    totalSpan.textContent = `$${subtotal.toFixed(2)}`;
    totalUnidades.textContent = totalProductos;
  }

  cantidades.forEach(select => {
    select.addEventListener("change", actualizarResumen);
  });

  actualizarResumen(); // cálculo inicial
});