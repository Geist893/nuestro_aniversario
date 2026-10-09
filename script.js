
"use strict";

/* =========================================
   APERTURA DE LA EXPERIENCIA
========================================= */

const openButton = document.getElementById("openButton");
const intro = document.getElementById("intro");

openButton.addEventListener("click", () => {
  intro.classList.add("hidden");
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "auto";
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* =========================================
   CONTADOR DEL ANIVERSARIO
   9 de octubre de 2025, medianoche
========================================= */

const startDate = new Date(2025, 9, 9, 0, 0, 0);

function updateCounter() {
  const now = new Date();
  const elapsed = Math.max(0, now.getTime() - startDate.getTime());

  const totalSeconds = Math.floor(elapsed / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);


/* =========================================
   FOTOS AMPLIADAS
========================================= */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

function showPhoto(image) {
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt || "Nuestro recuerdo";
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function hidePhoto() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = intro.classList.contains("hidden") ? "auto" : "hidden";
}

document.querySelectorAll(".gallery-item img, .photo-card img").forEach(image => {
  image.addEventListener("click", () => showPhoto(image));
});

closeLightbox.addEventListener("click", hidePhoto);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) hidePhoto();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") hidePhoto();
});


/* =========================================
   APARICIÓN SUAVE AL DESPLAZARSE
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}


/* =========================================
   ESTRELLAS TITILANTES
========================================= */

const floatingStars = document.querySelector(".floating-stars");

for (let i = 0; i < 100; i++) {
  const star = document.createElement("span");
  const size = Math.random() * 2 + 1;

  star.style.position = "absolute";
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.borderRadius = "50%";
  star.style.background = "#ffffff";
  star.style.opacity = String(Math.random() * 0.6 + 0.1);
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animation = `twinkle ${Math.random() * 4 + 3}s infinite ease-in-out`;
  star.style.animationDelay = `${Math.random() * 5}s`;

  floatingStars.appendChild(star);
}


/* =========================================
   MOVIMIENTO SUTIL DE LOS RECUERDOS
========================================= */

const memories = document.querySelectorAll(".memory");
let scrollTicking = false;

window.addEventListener("scroll", () => {
  if (scrollTicking) return;

  scrollTicking = true;

  window.requestAnimationFrame(() => {
    const scrollY = window.scrollY;

    memories.forEach((memory, index) => {
      const speed = 0.012 + (index % 3) * 0.004;
      memory.style.setProperty("--float-y", `${scrollY * speed}px`);
    });

    scrollTicking = false;
  });
}, { passive: true });
