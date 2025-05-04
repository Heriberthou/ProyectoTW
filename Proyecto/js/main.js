// Asumimos que firebase ya fue inicializado en admin.html y que db y storage ya existen

const form = document.getElementById('menuForm');
const preview = document.getElementById('preview');
const imagenArchivo = document.getElementById('imagenArchivo');
const btnCamara = document.getElementById('btnCamara');
const videoContainer = document.getElementById('videoContainer');
const video = document.getElementById('video');
const capturar = document.getElementById('capturar');
const alerta = document.getElementById('alerta');
const tablaPlatillos = document.getElementById('tablaPlatillos');
const listaPlatillos = document.getElementById('listaPlatillos');
const sinPlatillos = document.getElementById('sinPlatillos');
const filtroDia = document.getElementById('filtroDia');
const filtroTipo = document.getElementById('filtroTipo');
const btnMostrar = document.getElementById('btnMostrarPlatillos');

let imagenBase64 = "";
let streamActivo = null;

if (btnMostrar) {
    btnMostrar.addEventListener('click', () => {
        actualizarTablaPlatillos();
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dia = document.getElementById('dia').value;
    const tipo = document.getElementById('tipo').value;
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = document.getElementById('precio').value;

    if (!dia || !tipo || !nombre || !descripcion || !precio || !imagenBase64) {
        mostrarAlerta('Por favor llena todos los campos y selecciona una imagen.', 'danger');
        marcarCamposInvalidos();
        return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(precio)) {
        mostrarAlerta('El precio debe ser un número válido con hasta 2 decimales.', 'danger');
        document.getElementById('precio').classList.add('is-invalid');
        return;
    }

    try {
        mostrarAlerta('Guardando en Firebase...', 'info');
        const nombreArchivo = `${dia}-${tipo}`;
        const subida = await subirImagenAFirebase(imagenBase64, nombreArchivo);
        const url = await verificarYRepararURL(nombreArchivo, subida);

        await db.collection('platillos').doc(nombreArchivo).set({
            dia, tipo, nombre, descripcion, precio, imagen: url
        });

        mostrarAlerta('Platillo guardado exitosamente.', 'success');
        form.reset();
        preview.classList.add('d-none');
        imagenBase64 = "";
    } catch (error) {
        console.error(error);
        mostrarAlerta('Error al guardar el platillo.', 'danger');
    }
});

imagenArchivo.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = (event) => {
        imagenBase64 = event.target.result;
        mostrarVistaPrevia(imagenBase64);
    };
    lector.readAsDataURL(archivo);
});

btnCamara.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            streamActivo = stream;
            video.srcObject = stream;
            videoContainer.style.display = 'block';
        })
        .catch(err => mostrarAlerta('No se pudo acceder a la cámara.', 'danger'));
});

capturar.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const img = canvas.toDataURL('image/png');

    if (streamActivo) {
        streamActivo.getTracks().forEach(track => track.stop());
        streamActivo = null;
    }

    videoContainer.style.display = 'none';
    imagenBase64 = img;
    mostrarVistaPrevia(imagenBase64);
});

function mostrarAlerta(mensaje, tipo) {
    alerta.className = `alert alert-${tipo} text-center`;
    alerta.textContent = mensaje;
    alerta.classList.remove('d-none');
    alerta.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => alerta.classList.add('d-none'), 4000);
}

function mostrarVistaPrevia(src) {
    preview.src = src;
    preview.classList.remove('d-none');
}

function marcarCamposInvalidos() {
    form.querySelectorAll('input, select, textarea').forEach(campo => {
        campo.classList.toggle('is-invalid', !campo.value.trim());
    });
}

document.querySelectorAll('input, select, textarea').forEach(campo => {
    campo.addEventListener('input', () => campo.classList.remove('is-invalid'));
});

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

async function actualizarTablaPlatillos() {
    const snapshot = await db.collection("platillos").get();
    listaPlatillos.innerHTML = '';
    let hay = false;

    snapshot.forEach(doc => {
        const p = doc.data();
        if (
            (!filtroDia.value || p.dia === filtroDia.value) &&
            (!filtroTipo.value || p.tipo === filtroTipo.value)
        ) {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${capitalizar(p.dia)}</td>
        <td>${capitalizar(p.tipo)}</td>
        <td>${p.nombre}</td>
        <td>$${parseFloat(p.precio).toFixed(2)}</td>
        <td><img src="${p.imagen}" alt="${p.nombre}" height="60"></td>
        <td><button class="btn btn-sm btn-danger" onclick="eliminarPlatillo('${p.dia}', '${p.tipo}')">
            <i class="bi bi-trash"></i> Eliminar
        </button></td>
      `;
            listaPlatillos.appendChild(row);
            hay = true;
        }
    });

    tablaPlatillos.classList.toggle('d-none', !hay);
    sinPlatillos.classList.toggle('d-none', hay);
}

async function eliminarPlatillo(dia, tipo) {
    await db.collection("platillos").doc(`${dia}-${tipo}`).delete();
    mostrarAlerta('Platillo eliminado correctamente.', 'success');
    actualizarTablaPlatillos();
}

async function subirImagenAFirebase(base64, nombreArchivo) {
    const blob = await (await fetch(base64)).blob();
    const ref = storage.ref(`platillos/${nombreArchivo}.png`);
    await ref.put(blob);
    return ref.getDownloadURL();
}

async function verificarYRepararURL(nombreArchivo, urlActual) {
    if (urlActual.includes("alt=media") && urlActual.includes("token=")) {
        return urlActual;
    }

    try {
        const ref = storage.ref(`platillos/${nombreArchivo}.png`);
        const urlNueva = await ref.getDownloadURL();
        return urlNueva;
    } catch (error) {
        console.warn("No se pudo obtener la URL pública de Firebase Storage:", error);
        return urlActual;
    }
}