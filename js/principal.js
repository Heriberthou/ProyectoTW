
let calificacion = 0;

const platillosEjemplo = {
    lunes: {
        desayuno: [
            { nombre: "Chilaquiles verdes", descripcion: "Totopos con salsa verde, crema y pollo.", imagen: "imagenes/chilaquiles.png" },
            { nombre: "Molletes", descripcion: "Pan con frijoles y queso gratinado.", imagen: "imagenes/molletes.png" }
        ],
        comida: [
            { nombre: "Enchiladas rojas", descripcion: "Tortillas con queso y salsa roja.", imagen: "imagenes/enchiladas.png" },
            { nombre: "Albóndigas", descripcion: "Albóndigas de res en chipotle.", imagen: "imagenes/albondigas.png" }
        ]
    },
    martes: {
        desayuno: [
            { nombre: "Molletes", descripcion: "Pan con frijoles y queso gratinado.", imagen: "imagenes/molletes.png" },
            { nombre: "Avena con frutas", descripcion: "Avena caliente con plátano y manzana.", imagen: "imagenes/avena.png" }
        ],
        comida: [
            { nombre: "Pescado empanizado", descripcion: "Filete crujiente con arroz.", imagen: "imagenes/pescado.png" },
            { nombre: "Pechuga empanizada", descripcion: "Pechuga con verduras y arroz.", imagen: "imagenes/pechuga.png" }
        ]
    },
    miércoles: {
        desayuno: [
            { nombre: "Avena con frutas", descripcion: "Avena caliente con plátano y manzana.", imagen: "imagenes/avena.png" },
            { nombre: "Tamales", descripcion: "De mole y rajas en hoja de maíz.", imagen: "imagenes/tamales.png" }
        ],
        comida: [
            { nombre: "Albóndigas", descripcion: "Albóndigas de res en chipotle.", imagen: "imagenes/albondigas.png" },
            { nombre: "Tlayuda", descripcion: "Con tasajo, quesillo y frijoles.", imagen: "imagenes/tlayuda.png" }
        ]
    },
    jueves: {
        desayuno: [
            { nombre: "Tamales", descripcion: "De mole y rajas en hoja de maíz.", imagen: "imagenes/tamales.png" },
            { nombre: "Pan francés", descripcion: "Pan con miel y canela.", imagen: "imagenes/panfrances.png" }
        ],
        comida: [
            { nombre: "Pechuga empanizada", descripcion: "Pechuga con verduras y arroz.", imagen: "imagenes/pechuga.png" },
            { nombre: "Enchiladas rojas", descripcion: "Tortillas con queso y salsa roja.", imagen: "imagenes/enchiladas.png" }
        ]
    },
    viernes: {
        desayuno: [
            { nombre: "Pan francés", descripcion: "Pan con miel y canela.", imagen: "imagenes/panfrances.png" },
            { nombre: "Chilaquiles verdes", descripcion: "Totopos con salsa verde, crema y pollo.", imagen: "imagenes/chilaquiles.png" }
        ],
        comida: [
            { nombre: "Tlayuda", descripcion: "Con tasajo, quesillo y frijoles.", imagen: "imagenes/tlayuda.png" },
            { nombre: "Pescado empanizado", descripcion: "Filete crujiente con arroz.", imagen: "imagenes/pescado.png" }
        ]
    }
};

function seleccionarExplorar(elemento) {
    document.querySelectorAll('.explorar-item').forEach(el => el.classList.remove('active'));
    elemento.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    let diaSimulado = 1;
    let tipoActual = "desayuno";
    const contenedor = document.getElementById("platillo-del-dia");
    const textoDia = document.getElementById("diaSimuladoTexto");
    const btnDesayunos = document.getElementById("btnDesayunos");
    const btnComidas = document.getElementById("btnComidas");

    function mostrar(tipo) {
        const nombreDia = dias[diaSimulado % 7];
        textoDia.textContent = `Día simulado: ${nombreDia}`;
        const platillos = platillosEjemplo[nombreDia]?.[tipo] || [];
        contenedor.innerHTML = "";

        const bloqueIncluye = document.getElementById("bloqueIncluye");
        const contenidoIncluye = document.getElementById("contenidoIncluye");
        
        // Ocultar sección si es sábado o domingo
        if (bloqueIncluye) {
            if (nombreDia === "sábado" || nombreDia === "domingo") {
                bloqueIncluye.style.display = "none";
            } else {
                bloqueIncluye.style.display = "";
                // Actualizar contenido dinámico
                contenidoIncluye.innerHTML = "";
        
                if (tipo === "desayuno") {
                    contenidoIncluye.innerHTML = `
                        <div class="p-2 text-center rounded-4" style="background-color: #004B7F; color: white; width: 100px;">
                            <img src="imagenes/gelatina.png" alt="Gelatina" style="max-height: 50px;" />
                            <div class="small">Gelatina</div>
                        </div>
                        <div class="p-2 text-center rounded-4" style="background-color: #004B7F; color: white; width: 100px;">
                            <img src="imagenes/sabor.png" alt="Agua de sabor" style="max-height: 50px;" />
                            <div class="small">Agua de sabor</div>
                        </div>
                    `;
                } else if (tipo === "comida") {
                    contenidoIncluye.innerHTML = `
                        <div class="p-2 text-center rounded-4" style="background-color: #004B7F; color: white; width: 100px;">
                            <img src="imagenes/sopa.png" alt="Sopa" style="max-height: 50px;" />
                            <div class="small">Sopa</div>
                        </div>
                        <div class="p-2 text-center rounded-4" style="background-color: #004B7F; color: white; width: 100px;">
                            <img src="imagenes/sabor.png" alt="Agua de sabor" style="max-height: 50px;" />
                            <div class="small">Agua de sabor</div>
                        </div>
                    `;
                }
                
            }
        }
        

        if (nombreDia === "sábado" || nombreDia === "domingo" || platillos.length === 0) {
            contenedor.innerHTML = `<p class="text-muted">No hay ${tipo} registrado para hoy (${nombreDia}).</p>`;
            return;
        }

        platillos.forEach(p => {
            const precioFijo = tipo === "desayuno" ? 45 : 50;
            const card = document.createElement("div");
            card.className = "col";
            card.innerHTML = `
                <div class="card border-0 shadow-sm rounded-4 platillo-card" data-nombre="${p.nombre}" data-img="${p.imagen}" data-precio="${precioFijo}">
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
        
        // Añadir redirección después de pintar los platillos
        setTimeout(() => {
            document.querySelectorAll('.platillo-card').forEach(card => {
                card.addEventListener('click', () => {
                    const nombre = card.getAttribute('data-nombre');
                    const imagen = card.getAttribute('data-img');
                    const precio = card.getAttribute('data-precio');
                    const url = new URL('Pedidos.html', window.location.href);
                    url.searchParams.set('platillo', nombre);
                    url.searchParams.set('imagen', imagen);
                    url.searchParams.set('precio', precio);
                    window.location.href = url.toString();
                });
            });
        }, 100); // Espera a que las tarjetas estén renderizadas
        
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

    // Cambio automático cada 10 segundos: desayuno -> comida -> siguiente día
    setInterval(() => {
        if (tipoActual === "desayuno") {
            tipoActual = "comida";
            btnDesayunos.classList.remove("active");
            btnComidas.classList.add("active");
        } else {
            tipoActual = "desayuno";
            diaSimulado = (diaSimulado + 1) % 7;
            btnComidas.classList.remove("active");
            btnDesayunos.classList.add("active");
        }
        mostrar(tipoActual);
    }, 10000);

    mostrar(tipoActual);
});
