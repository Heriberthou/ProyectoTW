document.addEventListener("DOMContentLoaded", function () {
    // Función principal para calcular total en base a cantidad y precio
    function actualizarResumen() {
      const precioUnitario = parseFloat($('.precio').data('precio')) || 0;
      const cantidad = parseInt($('#cantidad').val()) || 1;
  
      $('#subtotal').text(`$${subtotal.toFixed(2)}`);
      $('#total').text(`$${subtotal.toFixed(2)}`);
      $('#totalUnidades').text(cantidad);
    }
  
    // Ejecutar al cargar
    actualizarResumen();
  
    // Evento cuando cambia la cantidad
    $('#cantidad').on('change', actualizarResumen);
  });
  
  // Generar número de pedido diario
  function generarNumeroPedido() {
    const hoy = new Date().toISOString().slice(0, 10);
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
    // Calcular cambio en tiempo real al escribir el monto
    $('#montoPago').on('input', function () {
    const monto = parseFloat($(this).val());
    const totalTexto = $('#total').text().replace('$', '');
    const total = parseFloat(totalTexto);

    if (isNaN(monto) || isNaN(total)) {
        $('#cambioCalculado').text('$0.00');
        return;
    }

    const cambio = (monto - total).toFixed(2);
    $('#cambioCalculado').text(`$${cambio < 0 ? '0.00' : cambio}`);
    });
  
    let cantidad = parseInt($('#cantidad').val()) || 2;
  
    function actualizarControlesTortillas() {
      const habilitado = $('#tortillas').is(':checked');
      $('#cantidad').prop('disabled', !habilitado);
      $('#mas').prop('disabled', !habilitado);
      $('#menos').prop('disabled', !habilitado);
      $('#resumenTortillas').text(habilitado ? 'Sí' : 'No');
    }
  
    actualizarControlesTortillas();
  
    $('#tortillas').change(actualizarControlesTortillas);
  
    $('#mas').click(() => {
      cantidad++;
      $('#cantidad').val(cantidad).trigger('change');
    });
  
    $('#menos').click(() => {
      if (cantidad > 1) {
        cantidad--;
        $('#cantidad').val(cantidad).trigger('change');
      }
    });
  
    // Abrir modal de pago al hacer clic en Confirmar pedido
    $('#btnMostrarModal').click(function () {
      const extras = [];
      if ($('#frijoles').is(':checked')) extras.push('Frijoles');
      if ($('#ensalada').is(':checked')) extras.push('Ensalada');
      if ($('#agua').is(':checked')) extras.push('Agua de sabor');
      if ($('#tortillas').is(':checked')) extras.push('Tortillas');
  
      $('#btnContinuarConfirmacion').data('extras', extras);
      $('#btnContinuarConfirmacion').data('cantidad', $('#tortillas').is(':checked') ? $('#cantidad').val() : '0');
      $('#btnContinuarConfirmacion').data('comentario', $('#comentarios').val() || 'Sin comentario');
      $('#btnContinuarConfirmacion').data('numeroPedido', $('#numeroPedido').text());
  
      const totalTexto = $('#total').text();
      $('#montoTotalTexto').text(totalTexto);
  
      const modalPago = new bootstrap.Modal(document.getElementById('modalPago'));
      modalPago.show();
    });
  
    // Continuar del modalPago al modalConfirmacion
    $('#btnContinuarConfirmacion').click(function () {
      const monto = parseFloat($('#montoPago').val());
      const totalTexto = $('#total').text().replace('$', '');
      const total = parseFloat(totalTexto);
  
      if (isNaN(monto) || isNaN(total) || monto < total) {
        alert('El monto debe ser mayor o igual al total.');
        return;
      }
  
      const cambio = (monto - total).toFixed(2);
      $('#cambioCalculado').text(`$${cambio}`);
      $('#modalMontoPagado').text(`$${monto.toFixed(2)}`);
      $('#modalCambio').text(`$${cambio}`);
  
      $('#modalNumPedido').text($(this).data('numeroPedido'));
      $('#modalExtras').text($(this).data('extras').length ? $(this).data('extras').join(', ') : 'Sin extras');
      $('#modalCantidad').text($(this).data('cantidad'));
      $('#modalComentario').text($(this).data('comentario'));
  
      const modalPago = bootstrap.Modal.getInstance(document.getElementById('modalPago'));
      modalPago.hide();
  
      const modalConfirm = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
      modalConfirm.show();
    });
  
    // Confirmar pedido
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
  