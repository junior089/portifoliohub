const nav = document.querySelector(".main-nav");
const toggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const progress = document.querySelector(".scroll-progress");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const projectCards = [...document.querySelectorAll("[data-project-type]")];
const counters = [...document.querySelectorAll("[data-count]")];

const savedTheme = localStorage.getItem("portfoliohub-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");

function updateThemeButton() {
  if (!themeToggle) return;
  themeToggle.textContent = document.body.classList.contains("light-theme") ? "Tema escuro" : "Tema claro";
}
updateThemeButton();

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("portfoliohub-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  updateThemeButton();
});

toggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open") || false;
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    nav?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

function updateProgress() {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

if ("IntersectionObserver" in window) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
  sections.forEach((section) => activeObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      if (entry.target.matches(".metric")) {
        const counter = entry.target.querySelector("[data-count]");
        if (counter && !counter.dataset.animated) {
          counter.dataset.animated = "true";
          animateCounter(counter);
        }
      }
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

function animateCounter(element) {
  const target = Number(element.dataset.count || "0");
  const duration = 750;
  const start = performance.now();
  function step(timestamp) {
    const ratio = Math.min((timestamp - start) / duration, 1);
    element.textContent = String(Math.round(target * ratio));
    if (ratio < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "todos";
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    projectCards.forEach((card) => card.classList.toggle("hidden", filter !== "todos" && card.dataset.projectType !== filter));
  });
});

async function loadGitHubStats() {
  const el = {
    stars: document.getElementById("github-stars"),
    forks: document.getElementById("github-forks"),
    issues: document.getElementById("github-issues"),
    updated: document.getElementById("github-updated"),
    sync: document.getElementById("github-sync-date"),
    state: document.getElementById("github-state")
  };
  if (!el.stars) return;
  const repo = "junior089/portfoliohub-entrega-intermediaria";
  const fallback = { stars: "0", forks: "0", issues: "0", updated: "local", sync: "Modo offline: dados locais exibidos." };

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, { headers: { "Accept": "application/vnd.github+json" } });
    if (!response.ok) throw new Error(`GitHub API respondeu ${response.status}`);
    const data = await response.json();
    const updated = data.updated_at ? new Date(data.updated_at) : null;
    el.stars.textContent = String(data.stargazers_count ?? fallback.stars);
    el.forks.textContent = String(data.forks_count ?? fallback.forks);
    el.issues.textContent = String(data.open_issues_count ?? fallback.issues);
    el.updated.textContent = updated ? updated.toLocaleDateString("pt-BR") : fallback.updated;
    el.sync.textContent = updated ? `Sincronizado pela API em ${updated.toLocaleDateString("pt-BR")} às ${updated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}.` : "Sincronizado pela API.";
    el.state.textContent = "Online";
  } catch (error) {
    console.warn("Falha ao consultar GitHub API:", error);
    el.stars.textContent = fallback.stars;
    el.forks.textContent = fallback.forks;
    el.issues.textContent = fallback.issues;
    el.updated.textContent = fallback.updated;
    el.sync.textContent = fallback.sync;
    el.state.textContent = "Offline";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadGitHubStats();
});
