const nombre = document.getElementById('nombre');
const apellidoPaterno = document.getElementById('apellidoPaterno');
const apellidoMaterno = document.getElementById('apellidoMaterno');
const fechaNacimiento = document.getElementById('fechaNacimiento');
const numeroTarjeta = document.getElementById('numeroTarjeta');
const correo = document.getElementById('correo');
const form = document.getElementById('formRegistro');
const mensaje = document.getElementById('mensajeExito');
const mensajeError = document.getElementById('mensajeError');
const errorEdad = document.getElementById('errorEdad');

// 1. Nombres y apellidos: solo letras, aunque escribas en minúsculas se pasa a MAYÚSCULAS
function soloLetrasMayusculas(input) {
  input.addEventListener('input', () => {
    input.value = input.value.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑÜ ]/g, '');
  });
}
soloLetrasMayusculas(nombre);
soloLetrasMayusculas(apellidoPaterno);
soloLetrasMayusculas(apellidoMaterno);

// 2. Número de Tarjeta: solo 16 números, sin letras
numeroTarjeta.addEventListener('input', () => {
  let soloNumeros = numeroTarjeta.value.replace(/\D/g, '').slice(0, 16);
  numeroTarjeta.value = soloNumeros.replace(/(\d{4})(?=\d)/g, '$1 ');
});

// 3. Correo: a minúsculas
correo.addEventListener('input', () => {
  correo.value = correo.value.toLowerCase();
});

// 4. Fecha: Solo de 1945 a 2008 = 18 años o más
function esFechaValida(fecha) {
  if (!fecha) return false;
  const nacimiento = new Date(fecha);
  const min = new Date('1945-01-01');
  const max = new Date('2008-11-17');
  if (nacimiento < min || nacimiento > max) return false;
  return true;
}

fechaNacimiento.addEventListener('change', () => {
  if (fechaNacimiento.value && !esFechaValida(fechaNacimiento.value)) {
    errorEdad.classList.remove('oculto');
  } else {
    errorEdad.classList.add('oculto');
  }
});

// 5. Al darle REGISTRARSE: se envía, muestra mensaje y queda en blanco
form.addEventListener('submit', function(e) {
  e.preventDefault();
  mensajeError.classList.add('oculto');

  if (!esFechaValida(fechaNacimiento.value)) {
    mensajeError.textContent = 'La fecha debe ser de 1945 a 2008. Debes tener 18 años o más.';
    mensajeError.classList.remove('oculto');
    return;
  }

  const numerosTarjeta = numeroTarjeta.value.replace(/\D/g, '');
  if (numerosTarjeta.length !== 16) {
    mensajeError.textContent = 'La tarjeta debe tener 16 números.';
    mensajeError.classList.remove('oculto');
    return;
  }

  // Todo bien: muestra mensaje y limpia el formulario
  mensaje.classList.remove('oculto');
  form.reset();

  setTimeout(() => {
    mensaje.classList.add('oculto');
  }, 3000);
});