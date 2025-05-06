const tabs = document.querySelectorAll('.tab');
const rows = document.querySelectorAll('.table-row:not(.header-row)');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;

    rows.forEach(row => {
      if (filter === 'todos' || row.dataset.status === filter) {
        row.style.display = 'flex';
      } else {
        row.style.display = 'none';
      }
    });
  });
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


