document.addEventListener("DOMContentLoaded", () => {
  console.log("🟣 JULS Script cargado correctamente");

  const PASSWORD = "27122000";
  const EVENT_DATE = new Date("2025-12-27T00:00:00");

  // --- Referencias a elementos ---
  const loginScreen = document.getElementById("login-screen");
  const countdownScreen = document.getElementById("countdown-screen");
  const portalScreen = document.getElementById("portal-screen");
  const mainScreen = document.getElementById("main-screen");

  const passwordInput = document.getElementById("password-input");
  const unlockButton = document.getElementById("unlock-button");
  const errorMessage = document.getElementById("error-message");

  const enterButton = document.getElementById("enter-button");

  // --- LOG IN ---
  unlockButton?.addEventListener("click", () => {
    const entered = passwordInput.value.trim();

    if (entered === PASSWORD) {
      console.log("✅ Contraseña correcta, avanzando...");
      errorMessage.classList.add("hidden");
      loginScreen.classList.add("hidden");
      countdownScreen.classList.remove("hidden");
      startCountdown();
    } else {
      console.log("❌ Contraseña incorrecta");
      errorMessage.classList.remove("hidden");
      errorMessage.classList.add("animate-shake");
      setTimeout(() => errorMessage.classList.remove("animate-shake"), 600);
    }
  });

  // --- CUENTA REGRESIVA ---
  function startCountdown() {
    const d = document.getElementById("countdown-days");
    const h = document.getElementById("countdown-hours");
    const m = document.getElementById("countdown-minutes");
    const s = document.getElementById("countdown-seconds");

    function updateCountdown() {
      const now = new Date();
      const diff = EVENT_DATE - now;

      if (diff <= 0) {
        d.textContent = "00";
        h.textContent = "00";
        m.textContent = "00";
        s.textContent = "00";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      d.textContent = String(days).padStart(2, "0");
      h.textContent = String(hours).padStart(2, "0");
      m.textContent = String(mins).padStart(2, "0");
      s.textContent = String(secs).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // --- PORTAL DE TRANSICIÓN ---
  enterButton?.addEventListener("click", () => {
    console.log("🌌 Entrando al portal...");

    countdownScreen.classList.add("hidden");
    portalScreen.classList.remove("hidden");

    const circle = document.querySelector(".portal-circle");
    const text = document.querySelector(".portal-text");

    circle.classList.add("animate-portal-grow");
    text.classList.add("animate-fade-in");

    setTimeout(() => {
      portalScreen.classList.add("hidden");
      mainScreen.classList.remove("hidden");
      console.log("✨ Portal completado, mostrando invitación principal");
    }, 3000);
  });

  // --- PARTÍCULAS DE FONDO ---
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

  createParticles("particle-background", 80);
  createParticles("main-particle-background", 50);
});
