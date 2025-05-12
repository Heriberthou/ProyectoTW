document.addEventListener("DOMContentLoaded", function () {
  const cantidades = document.querySelectorAll(".cantidad");
  const precios = document.querySelectorAll(".precio");
  const subtotalSpan = document.getElementById("subtotal");
  const totalSpan = document.getElementById("total");
  const totalUnidades = document.getElementById("totalUnidades");

  function actualizarResumen() {
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

//Contenido para Pedidos: Abril
function generarNumeroPedido() {
  const hoy = new Date().toISOString().slice(0, 10); // formato: YYYY-MM-DD
  const fechaGuardada = localStorage.getItem("fechaPedido");
  let contador = localStorage.getItem("contadorPedido");

  if (fechaGuardada !== hoy) {
    contador = 1;
    localStorage.setItem("fechaPedido", hoy);
  } else {
    contador = parseInt(contador || "0") + 1;
  }

  localStorage.setItem("contadorPedido", contador);

  const numeroFormateado = String(contador).padStart(4, '0');
  document.getElementById("numeroPedido").innerText = `Núm.# UMAR – ${numeroFormateado}`;
}

generarNumeroPedido();

$(document).ready(function () {
  let cantidad = 2;

  function actualizarControlesTortillas() {
    const habilitado = $('#tortillas').is(':checked');
    $('#cantidad').prop('disabled', !habilitado);
    $('#mas').prop('disabled', !habilitado);
    $('#menos').prop('disabled', !habilitado);
    $('#resumenTortillas').text(habilitado ? 'Sí' : 'No');
  }

  actualizarControlesTortillas(); // Estado inicial

  $('#tortillas').change(function () {
    actualizarControlesTortillas();
  });

  $('#mas').click(() => {
    cantidad++;
    $('#cantidad').val(cantidad);
  });

  $('#menos').click(() => {
    if (cantidad > 1) {
      cantidad--;
      $('#cantidad').val(cantidad);
    }
  });

  // Mostrar modal
  $('#btnMostrarModal').click(function () {
    const extras = [];
    if ($('#frijoles').is(':checked')) extras.push('Frijoles');
    if ($('#ensalada').is(':checked')) extras.push('Ensalada');
    if ($('#agua').is(':checked')) extras.push('Agua de sabor');
    if ($('#tortillas').is(':checked')) extras.push('Tortillas');

    $('#modalNumPedido').text($('#numeroPedido').text());
    $('#modalExtras').text(extras.length ? extras.join(', ') : 'Sin extras');
    $('#modalCantidad').text($('#tortillas').is(':checked') ? $('#cantidad').val() : '0');
    $('#modalComentario').text($('#comentarios').val() || 'Sin comentario');

    const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
    modal.show();
  });

  // Confirmar en el modal
  $('#confirmarPedido').click(function () {
    alert("Pedido confirmado correctamente");
    location.reload(); 
  });

  // Cancelar pedido
  $('#cancelarPedido').click(function () {
    alert("El Pedido fue cancelado");
    location.reload(); 
  });
});


