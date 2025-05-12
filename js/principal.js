const platillosEjemplo = {
    lunes: { desayuno: [{ nombre: "Chilaquiles verdes", descripcion: "Totopos con salsa verde, crema y pollo.", imagen: "imagenes/chilaquiles.png" }], comida: [{ nombre: "Enchiladas rojas", descripcion: "Tortillas con queso y salsa roja.", imagen: "imagenes/enchiladas.png" }] },
    martes: { desayuno: [{ nombre: "Molletes", descripcion: "Pan con frijoles y queso gratinado.", imagen: "imagenes/molletes.png" }], comida: [{ nombre: "Pescado empanizado", descripcion: "Filete crujiente con arroz.", imagen: "imagenes/pescado.png" }] },
    miércoles: { desayuno: [{ nombre: "Avena con frutas", descripcion: "Avena caliente con plátano y manzana.", imagen: "imagenes/avena.png" }], comida: [{ nombre: "Albóndigas", descripcion: "Albóndigas de res en chipotle.", imagen: "imagenes/albondigas.png" }] },
    jueves: { desayuno: [{ nombre: "Tamales", descripcion: "De mole y rajas en hoja de maíz.", imagen: "imagenes/tamales.png" }], comida: [{ nombre: "Pechuga empanizada", descripcion: "Pechuga con verduras y arroz.", imagen: "imagenes/pechuga.png" }] },
    viernes: { desayuno: [{ nombre: "Pan francés", descripcion: "Pan con miel y canela.", imagen: "imagenes/panfrances.png" }], comida: [{ nombre: "Tlayuda", descripcion: "Con tasajo, quesillo y frijoles.", imagen: "imagenes/tlayuda.png" }] }
};

function seleccionarExplorar(elemento) {
    document.querySelectorAll('.explorar-item').forEach(el => el.classList.remove('active'));
    elemento.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    let diaSimulado = 1;
    const contenedor = document.getElementById("platillo-del-dia");
    const textoDia = document.getElementById("diaSimuladoTexto");
    const btnDesayunos = document.getElementById("btnDesayunos");
    const btnComidas = document.getElementById("btnComidas");
    let tipoActual = "desayuno";

    function mostrar(tipo) {
        const nombreDia = dias[diaSimulado % 7];
        textoDia.textContent = `Día simulado: ${nombreDia}`;
        const platillos = platillosEjemplo[nombreDia]?.[tipo] || [];
        contenedor.innerHTML = "";

        if (platillos.length === 0) {
            contenedor.innerHTML = `<p class="text-muted">No hay ${tipo} registrado para hoy (${nombreDia}).</p>`;
            return;
        }

        platillos.forEach(p => {
            const precioFijo = tipo === "desayuno" ? 45 : 50;
            const card = document.createElement("div");
            card.className = "col";
            card.innerHTML = `
                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-body d-flex align-items-center">
                        <div class="img-container me-3">
                            <img src="${p.imagen}" alt="${p.nombre}" class="img-fluid rounded-3">
                        </div>
                        <div>
                            <h5 class="fw-bold mb-1 text-primary">${p.nombre}</h5>
                            <p class="mb-1 small text-muted">${p.descripcion}</p>
                            <p class="fw-semibold">$${precioFijo.toFixed(2)}</p>
                        </div>
                    </div>
                </div>`;
            contenedor.appendChild(card);
        });
    }

    btnDesayunos.addEventListener("click", () => {
        tipoActual = "desayuno";
        btnDesayunos.classList.add("active");
        btnComidas.classList.remove("active");
        mostrar(tipoActual);
    });

    btnComidas.addEventListener("click", () => {
        tipoActual = "comida";
        btnComidas.classList.add("active");
        btnDesayunos.classList.remove("active");
        mostrar(tipoActual);
    });

    setInterval(() => {
        diaSimulado = (diaSimulado + 1) % 7;
        mostrar(tipoActual);
    }, 10000);

    mostrar(tipoActual);
});

// Script para el modal de sugerencias
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
        const val = parseInt(star.getAttribute('data-value'));
        document.querySelectorAll('.star').forEach(s => {
            s.classList.remove('text-warning');
            s.classList.add('text-secondary');
        });
        star.classList.add('text-warning');
        let prev = star.previousElementSibling;
        while (prev) {
            prev.classList.add('text-warning');
            prev.classList.remove('text-secondary');
            prev = prev.previousElementSibling;
        }
        calificacion = val;
    });
});

document.getElementById('enviarSugerencia').addEventListener('click', () => {
    const texto = document.getElementById('sugerenciaTexto').value.trim();
    if (!texto || calificacion === 0) {
        Swal.fire('Completa los campos', 'Escribe tu sugerencia y califica.', 'warning');
        return;
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('sugerenciaModal'));
    modal.hide();

    setTimeout(() => {
        Swal.fire({
            icon: 'success',
            title: '¡Gracias!',
            html: `<p>Tu sugerencia ha sido enviada.</p>
                <p><strong>Sugerencia:</strong> ${texto}</p>
                <p><strong>Calificación:</strong> ${calificacion} estrella(s)</p>`,
            confirmButtonColor: '#2266ff'
        });
        document.getElementById('sugerenciaTexto').value = '';
        calificacion = 0;
        document.querySelectorAll('.star').forEach(s => s.classList.remove('text-warning'));
        document.querySelectorAll('.star').forEach(s => s.classList.add('text-secondary'));
    }, 300);
});
