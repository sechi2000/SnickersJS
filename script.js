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
// -----------------------------
// 5️⃣ INVITADOS DE HONOR (crea las tarjetas con foto)
// -----------------------------
function renderGuestList() {
  const guestContainer = document.getElementById("guest-list");
  if (!guestContainer) return;

  const guests = [
    { name: "Alejandro", photo: "assets/invitados/alejandro.jpg" },
    { name: "Nacho Rueda", photo: "assets/invitados/nacho_rueda.jpg" },
    { name: "Masca y Mafer", photo: "assets/invitados/masca_mafer.jpg" },
    { name: "Gabi", photo: "assets/invitados/gabi.jpg" },
    { name: "Vicente", photo: "assets/invitados/vicente.jpg" },
    { name: "Alex", photo: "assets/invitados/alex.jpg" },
    { name: "Nacho Moral", photo: "assets/invitados/nacho_moral.jpg" },
    { name: "Jaime e Irene", photo: "assets/invitados/jaime_irene.jpg" },
    { name: "Danii Rovi", photo: "assets/invitados/danii.jpg" },
    { name: "Irene Murillo", photo: "assets/invitados/irene_murillo.jpg" },
    { name: "Sofía Amezcua", photo: "assets/invitados/sofia_amezcua.jpg" },
    { name: "Criss", photo: "assets/invitados/criss.jpg" },
    { name: "Teresa", photo: "assets/invitados/teresa.jpg" },
    { name: "Sofía González", photo: "assets/invitados/sofia_gonzalez.jpg" },
    { name: "Fausto", photo: "assets/invitados/fausto.jpg" },
    { name: "Meli", photo: "assets/invitados/meli.jpg" },
    { name: "Frida", photo: "assets/invitados/frida.jpg" },
    { name: "Patri", photo: "assets/invitados/patri.jpg" }
  ];

  guestContainer.innerHTML = guests
    .map(g => `
      <div class="flex flex-col items-center text-center p-4 border border-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/40 hover:border-violet-400">
        <img src="${g.photo}" alt="${g.name}" class="w-24 h-24 rounded-full object-cover mb-3 border-2 border-white shadow-md hover:shadow-violet-400 transition-all duration-300">
        <h3 class="font-playfair text-xl font-semibold">${g.name}</h3>
      </div>
    `)
    .join("");
}

// Ejecuta la función cuando se entra a la pantalla principal
enterButton?.addEventListener("click", () => {
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

    renderGuestList(); // <--- 💥 Aquí genera los invitados
  }, 3000);
});
