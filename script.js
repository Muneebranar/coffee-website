/* ---------- Loading screen ---------- */
window.addEventListener("load", () => {
  setTimeout(() => {
    const screen = document.getElementById("loadingScreen");
    screen.style.opacity = "0";
    setTimeout(() => (screen.style.display = "none"), 500);
  }, 2000);
});

/* ---------- Particles ---------- */
function createParticles() {
  const container = document.getElementById("particles");
  const particles = 500;

  for (let i = 0; i < particles; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.animationDelay = Math.random() * 6 + "s";
    const size = Math.random() * 4 + 2;
    p.style.width = p.style.height = size + "px";
    container.appendChild(p);
  }
}

/* ---------- Section navigation ---------- */
function showSection(id) {
  // hide all
  document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
  // show selected
  document.getElementById(id).classList.add("active");
  // deactivate all nav links
  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
  // scroll up
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Header hide / show on scroll ---------- */
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const y = window.pageYOffset || document.documentElement.scrollTop;
  header.style.transform = y > lastScroll && y > 100 ? "translateY(-100%)" : "translateY(0)";
  lastScroll = y;
});

/* ---------- Contact form (fake send) ---------- */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = data.get("name");
  const btn = e.target.querySelector("button[type='submit']");
  const original = btn.textContent;

  btn.textContent = "Sending…";
  btn.disabled = true;

  setTimeout(() => {
    alert(`Thank you, ${name}! Your message has been sent.`);
    e.target.reset();
    btn.textContent = original;
    btn.disabled = false;
  }, 2000);
});

/* ---------- Intersection-observer reveal ---------- */
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
    }
  }),
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  updateGreeting();

  // reveal animation
  document.querySelectorAll(".menu-card, .gallery-item, .contact-item").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "all 0.6s cubic-bezier(0.4,0,0.2,1)";
    io.observe(el);
  });

  // typewriter
  setTimeout(() => {
    const h = document.querySelector(".main-heading");
    typeWriter(h, h.textContent, 80);
  }, 2500);
});

/* ---------- Mobile nav ---------- */
document.querySelector(".mobile-menu-toggle").addEventListener("click", () => {
  const links = document.querySelector(".nav-links");
  links.style.display = links.style.display === "flex" ? "none" : "flex";
});

/* ---------- Coffee-cup animation ---------- */
const cup = document.querySelector(".hero-coffee-img");
let rot = 0;
setInterval(() => {
  rot++;
  cup.style.transform = `rotate(${rot}deg) scale(${1 + Math.sin(rot * 0.02) * 0.1})`;
}, 50);

/* ---------- Greeting based on time ---------- */
function updateGreeting() {
  const hour = new Date().getHours();
  const hi = document.querySelector(".highlight");
  hi.textContent =
    hour < 12 ? "☀️ Good Morning Coffee"
    : hour < 17 ? "☕ Afternoon Pick-Me-Up"
    : "🌙 Evening Comfort";
}

/* ---------- Typewriter ---------- */
function typeWriter(el, text, speed = 100) {
  let i = 0;
  el.textContent = "";
  (function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(type, speed);
    }
  })();
}

/* ---------- Scroll-progress bar ---------- */
const bar = document.createElement("div");
bar.style.cssText =
  "position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(135deg,#c28f4e,#ff6b35);z-index:10001;transition:width .1s";
document.body.appendChild(bar);

window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100;
  bar.style.width = scrolled + "%";
});
