// -----------------------------
// CONFIGURACIÓN PRINCIPAL
// -----------------------------
const PASSWORD = "27122000";
const EVENT_DATE = new Date("2025-12-27T00:00:00");

// Referencias a elementos
const loginScreen = document.getElementById("login-screen");
const countdownScreen = document.getElementById("countdown-screen");
const portalScreen = document.getElementById("portal-screen");
const mainScreen = document.getElementById("main-screen");

const passwordInput = document.getElementById("password-input");
const unlockButton = document.getElementById("unlock-button");
const errorMessage = document.getElementById("error-message");

const enterButton = document.getElementById("enter-button");

// -----------------------------
// 1️⃣ LOGIN / DESBLOQUEO
// -----------------------------
unlockButton.addEventListener("click", () => {
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === PASSWORD) {
    errorMessage.classList.add("hidden");
    loginScreen.classList.add("hidden");
    countdownScreen.classList.remove("hidden");
    startCountdown();
  } else {
    errorMessage.classList.remove("hidden");
    errorMessage.classList.add("animate-shake");
    setTimeout(() => {
      errorMessage.classList.remove("animate-shake");
    }, 500);
  }
});

// -----------------------------
// 2️⃣ CUENTA REGRESIVA
// -----------------------------
function startCountdown() {
  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");

  function updateCountdown() {
    const now = new Date();
    const diff = EVENT_DATE - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(d).padStart(2, "0");
    hoursEl.textContent = String(h).padStart(2, "0");
    minutesEl.textContent = String(m).padStart(2, "0");
    secondsEl.textContent = String(s).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// -----------------------------
// 3️⃣ PORTAL ANIMADO
// -----------------------------
enterButton.addEventListener("click", () => {
  countdownScreen.classList.add("hidden");
  portalScreen.classList.remove("hidden");

  // Efecto de transición tipo "portal"
  const circle = document.querySelector(".portal-circle");
  const text = document.querySelector(".portal-text");

  circle.classList.add("animate-portal-grow");
  text.classList.add("animate-fade-in");

  setTimeout(() => {
    portalScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");
  }, 3000);
});

// -----------------------------
// 4️⃣ EFECTOS DE FONDO
// -----------------------------
createParticles("particle-background", 80);
createParticles("main-particle-background", 50);

function createParticles(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.width = `${Math.random() * 3 + 1}px`;
    particle.style.height = particle.style.width;
    particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
    container.appendChild(particle);
  }
}
