const PASSWORD = "27122000";
const EVENT_DATE = new Date("2025-12-27T00:00:00");

const guests = [
  { name: "Alejandro", photo: "assets/invitados/alejandro.jpg" },
  { name: "Nacho Rueda", photo: "assets/invitados/nacho_rueda.jpg" },
  { name: "Masca", photo: "assets/invitados/masca.jpg" },
  { name: "Mafer", photo: "assets/invitados/mafer.jpg" },
  { name: "Gabi Prima", photo: "assets/invitados/gabi_prima.jpg" },
  { name: "Vicente", photo: "assets/invitados/vicente.jpg" },
  { name: "Alex", photo: "assets/invitados/alex.jpg" },
  { name: "Nacho Moral", photo: "assets/invitados/nacho_moral.jpg" },
  { name: "Irene (Novia de Jaime)", photo: "assets/invitados/irene_jaime.jpg" },
  { name: "Jaime", photo: "assets/invitados/jaime.jpg" },
  { name: "Danii Rovi", photo: "assets/invitados/danii_rovi.jpg" },
  { name: "Irene Murillo", photo: "assets/invitados/irene_murillo.jpg" },
  { name: "Sofía Amezcua", photo: "assets/invitados/sofia_amezcua.jpg" },
  { name: "Criss", photo: "assets/invitados/criss.jpg" },
  { name: "Teresa", photo: "assets/invitados/teresa.jpg" },
  { name: "Sofía González", photo: "assets/invitados/sofia_gonzalez.jpg" },
  { name: "Fausto", photo: "assets/invitados/fausto.jpg" },
  { name: "Meli", photo: "assets/invitados/meli.jpg" }
];

document.getElementById("unlock").addEventListener("click", () => {
  const input = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (input === PASSWORD) {
    document.getElementById("portal-container").classList.add("hidden");
    document.getElementById("countdown-container").classList.remove("hidden");
    startCountdown();
  } else {
    error.textContent = "Esa no es la fecha correcta... ¿seguro que me conoces tanto? 😉";
    setTimeout(() => (error.textContent = ""), 2000);
  }
});

function startCountdown() {
  const countdown = document.getElementById("countdown");
  const interval = setInterval(() => {
    const now = new Date();
    const diff = EVENT_DATE - now;
    if (diff <= 0) {
      clearInterval(interval);
      countdown.textContent = "¡Ha llegado el gran día!";
    } else {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      countdown.textContent = `${d} días : ${h}h : ${m}m : ${s}s`;
    }
  }, 1000);
}

document.getElementById("enterPortal").addEventListener("click", () => {
  document.getElementById("countdown-container").classList.add("hidden");
  document.getElementById("invite-container").classList.remove("hidden");

  const guestList = document.getElementById("guest-list");
  guestList.innerHTML = "";

  guests.forEach((guest, index) => {
    const li = document.createElement("li");
    li.classList.add("guest-card");
    li.style.animationDelay = `${index * 0.1}s`;

    const img = document.createElement("img");
    img.src = guest.photo;
    img.alt = guest.name;
    img.classList.add("guest-photo");

    const name = document.createElement("p");
    name.textContent = guest.name;

    li.appendChild(img);
    li.appendChild(name);
    guestList.appendChild(li);
  });
});
