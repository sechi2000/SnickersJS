/* script.js
  Lógica de interactividad para JULIA25
*/

// Espera a que todo el contenido del HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

  // --- SELECCIÓN DE ELEMENTOS ---

  // Pantallas
  const loginScreen = document.getElementById('login-screen');
  const countdownScreen = document.getElementById('countdown-screen');
  const portalScreen = document.getElementById('portal-screen');
  const mainScreen = document.getElementById('main-screen');
  const particleBackground = document.getElementById('particle-background');

  // Elementos de Login
  const passwordInput = document.getElementById('password-input');
  const unlockButton = document.getElementById('unlock-button');
  const errorMessage = document.getElementById('error-message');
  const correctPassword = "27122000";

  // Elementos de Countdown
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');
  const enterButton = document.getElementById('enter-button');

  // --- LÓGICA DE FASE 1: LOGIN ---

  unlockButton.addEventListener('click', checkPassword);

  // También permite presionar "Enter" en el campo de contraseña
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkPassword();
    }
  });

  function checkPassword() {
    if (passwordInput.value === correctPassword) {
      // Contraseña correcta: Iniciar transición
      errorMessage.classList.add('hidden');

      // 1. Desvanecer pantalla de login
      loginScreen.classList.add('fade-out');

      // 2. Después de 1 segundo (duración del fade-out), mostrar pantalla de countdown
      setTimeout(() => {
        loginScreen.classList.add('hidden');

        // Mostrar countdown
        countdownScreen.style.display = 'flex'; // Cambiado de 'hidden' a 'flex'
        countdownScreen.classList.remove('hidden'); // Asegurarse
        countdownScreen.classList.add('fade-in');

        // Iniciar la cuenta regresiva
        startCountdown();

      }, 1000); // 1000ms = 1s

    } else {
      // Contraseña incorrecta: Mostrar error y temblor
      errorMessage.classList.remove('hidden');
      loginScreen.classList.add('shake', 'error-bg');

      // Quitar clases de error después de un tiempo
      setTimeout(() => {
        loginScreen.classList.remove('shake', 'error-bg');
      }, 1000); // 1s
    }
  }

  // --- LÓGICA DE FASE 2: COUNTDOWN ---

  const targetDate = new Date('2025-12-27T00:00:00');

  function startCountdown() {
    // Actualizar el contador inmediatamente al cargar
    updateCountdown();

    // Actualizar el contador cada segundo
    setInterval(updateCountdown, 1000);
  }

  function updateCountdown() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      // Tiempo terminado
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    // Calcular tiempo
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Mostrar tiempo (con '0' al inicio si es menor de 10)
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // --- LÓGICA DE FASE 3: PORTAL ---

  enterButton.addEventListener('click', () => {
    // 1. Desvanecer pantalla de countdown
    countdownScreen.classList.add('fade-out');

    // 2. Después de 1 segundo, mostrar portal
    setTimeout(() => {
      countdownScreen.classList.add('hidden');
      countdownScreen.style.display = 'none';

      // Ocultar fondo de partículas original
      particleBackground.classList.add('hidden');

      // Mostrar portal
      portalScreen.classList.remove('hidden');
      // Las animaciones del portal (portal-expand, etc.) se activan automáticamente con CSS

    }, 1000); // 1s

    // 3. Después de 2.5 segundos (duración del portal), mostrar pantalla principal
    setTimeout(() => {
      portalScreen.classList.add('hidden'); // Ocultar portal

      // Mostrar pantalla principal
      mainScreen.classList.remove('hidden');
      mainScreen.classList.add('fade-in');

    }, 2500); // 2.5s (Duración total de la animación del portal)
  });

});