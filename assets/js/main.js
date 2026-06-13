const nav = document.querySelector(".main-nav");
const toggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const progress = document.querySelector(".scroll-progress");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const projectCards = [...document.querySelectorAll("[data-project-type]")];
const searchInput = document.getElementById("project-search");
const emptyProjects = document.getElementById("empty-projects");
const counters = [...document.querySelectorAll("[data-count]")];

const themeStorageKey = "portfoliohub-theme-v2";
const savedTheme = localStorage.getItem(themeStorageKey);
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

function updateThemeButton() {
  if (!themeToggle) return;
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.setAttribute("aria-label", isLight ? "Ativar tema escuro" : "Ativar tema claro");
  themeToggle.title = isLight ? "Ativar tema escuro" : "Ativar tema claro";
}

updateThemeButton();

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem(themeStorageKey, document.body.classList.contains("light-theme") ? "light" : "dark");
  updateThemeButton();
});

toggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open") || false;
  toggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  if (!nav?.classList.contains("open")) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest(".main-nav") || target.closest(".nav-toggle")) return;
  nav.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
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

function animateCounter(element) {
  if (element.dataset.animated) return;
  element.dataset.animated = "true";
  const target = Number(element.dataset.count || "0");
  const duration = 850;
  const start = performance.now();

  function step(timestamp) {
    const ratio = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - ratio, 3);
    element.textContent = String(Math.round(target * eased));
    if (ratio < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

if ("IntersectionObserver" in window) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-32% 0px -58% 0px", threshold: 0 });

  sections.forEach((section) => activeObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll("[data-count]").forEach(animateCounter);
      if (entry.target.matches("[data-count]")) animateCounter(entry.target);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
  counters.forEach(animateCounter);
}

function applyProjectFilters() {
  const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "todos";
  const query = (searchInput?.value || "").trim().toLowerCase();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const typeMatches = activeFilter === "todos" || card.dataset.projectType === activeFilter;
    const searchSource = `${card.textContent || ""} ${card.dataset.search || ""}`.toLowerCase();
    const searchMatches = !query || searchSource.includes(query);
    const isVisible = typeMatches && searchMatches;
    card.classList.toggle("hidden", !isVisible);
    if (isVisible) visibleCount += 1;
  });

  if (emptyProjects) {
    emptyProjects.hidden = visibleCount > 0;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyProjectFilters();
  });
});

searchInput?.addEventListener("input", applyProjectFilters);
applyProjectFilters();

async function loadGitHubStats() {
  const el = {
    stars: document.getElementById("github-stars"),
    forks: document.getElementById("github-forks"),
    issues: document.getElementById("github-issues"),
    updated: document.getElementById("github-updated"),
    sync: document.getElementById("github-sync-date"),
    state: document.getElementById("github-state")
  };
  if (!el.stars || !el.forks || !el.issues || !el.updated || !el.sync || !el.state) return;

  const repo = "junior089/portfoliohub-entrega-intermediaria";
  const fallback = {
    stars: "0",
    forks: "0",
    issues: "0",
    updated: "13/06/2026",
    sync: "Dados publicos locais exibidos. A API pode estar indisponivel, limitada ou bloqueada pela rede.",
    state: "Local"
  };

  function renderFallback(message) {
    el.stars.textContent = fallback.stars;
    el.forks.textContent = fallback.forks;
    el.issues.textContent = fallback.issues;
    el.updated.textContent = fallback.updated;
    el.sync.textContent = message || fallback.sync;
    el.state.textContent = fallback.state;
    el.state.dataset.status = "local";
  }

  function explainGitHubError(status) {
    if (status === 403) return "Limite publico da GitHub API atingido. Dados locais exibidos.";
    if (status === 404) return "Repositorio nao encontrado pela API publica. Verifique se ele esta publico.";
    if (status >= 500) return "GitHub API instavel no momento. Dados locais exibidos.";
    return `GitHub API respondeu ${status}. Dados locais exibidos.`;
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 6500);

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      cache: "no-store",
      signal: controller.signal
    });

    if (!response.ok) {
      renderFallback(explainGitHubError(response.status));
      return;
    }

    const data = await response.json();
    const updated = data.updated_at ? new Date(data.updated_at) : null;
    const remaining = response.headers.get("x-ratelimit-remaining");

    el.stars.textContent = String(data.stargazers_count ?? fallback.stars);
    el.forks.textContent = String(data.forks_count ?? fallback.forks);
    el.issues.textContent = String(data.open_issues_count ?? fallback.issues);
    el.updated.textContent = updated ? updated.toLocaleDateString("pt-BR") : fallback.updated;
    el.sync.textContent = updated
      ? `Sincronizado pela API publica em ${updated.toLocaleDateString("pt-BR")} as ${updated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}. Requisicoes restantes: ${remaining ?? "nao informado"}.`
      : "Sincronizado pela API publica.";
    el.state.textContent = "Publico";
    el.state.dataset.status = "online";
  } catch (error) {
    console.warn("Falha ao consultar GitHub API:", error);
    const message = error?.name === "AbortError"
      ? "Tempo de resposta da GitHub API esgotado. Dados locais exibidos."
      : fallback.sync;
    renderFallback(message);
  } finally {
    window.clearTimeout(timeout);
  }
}

document.addEventListener("DOMContentLoaded", loadGitHubStats);
