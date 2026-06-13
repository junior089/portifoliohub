const nav = document.querySelector(".main-nav");
const toggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const progress = document.querySelector(".scroll-progress");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const searchInput = document.getElementById("project-search");
const emptyProjects = document.getElementById("empty-projects");
const counters = [...document.querySelectorAll("[data-count]")];
const projectGrid = document.getElementById("project-grid");
const loginForm = document.getElementById("login-form");
const loginUser = document.getElementById("login-user");
const loginPass = document.getElementById("login-pass");
const loginMessage = document.getElementById("login-message");
const sessionPanel = document.getElementById("session-panel");
const sessionSummary = document.getElementById("session-summary");
const permissionStrip = document.getElementById("permission-strip");
const logoutButton = document.getElementById("logout-button");
const projectForm = document.getElementById("project-form");
const projectId = document.getElementById("project-id");
const projectName = document.getElementById("project-name");
const projectType = document.getElementById("project-type");
const projectStatus = document.getElementById("project-status");
const projectTech = document.getElementById("project-tech");
const projectDescription = document.getElementById("project-description");
const projectMessage = document.getElementById("project-message");
const projectFormTitle = document.getElementById("project-form-title");
const projectFormHelp = document.getElementById("project-form-help");
const cancelEdit = document.getElementById("cancel-edit");

const themeStorageKey = "portfoliohub-theme-v2";
const projectsStorageKey = "portfoliohub-projects-v1";
const sessionStorageKey = "portfoliohub-session-v1";

const demoUsers = [
  {
    username: "admin",
    password: "admin123",
    name: "Administrador",
    role: "Owner",
    permissions: ["criar", "editar", "excluir", "publicar"]
  },
  {
    username: "editor",
    password: "editor123",
    name: "Editor de projetos",
    role: "Collaborator",
    permissions: ["criar", "editar"]
  },
  {
    username: "viewer",
    password: "viewer123",
    name: "Avaliador",
    role: "Reader",
    permissions: ["visualizar"]
  }
];

const defaultProjects = [
  {
    id: "portfoliohub",
    name: "PortfolioHUB",
    type: "academico",
    status: "Em producao",
    tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    description: "Projeto principal da implantacao, reunindo site, documentacao, relatorio, slides, GitHub API e evidencias de seguranca.",
    url: "projetos/academicos/portfoliohub/README.md",
    featured: true
  },
  {
    id: "asclepio",
    name: "Asclepio",
    type: "pessoal",
    status: "Em revisao",
    tech: ["Flutter", "Firebase", "Mobile"],
    description: "Aplicativo de saude para rotina, sintomas, localizacao e acompanhamento de indicadores pessoais.",
    url: "projetos/pessoais/asclepio/README.md"
  },
  {
    id: "amet",
    name: "AMET",
    type: "pessoal",
    status: "Planejado",
    tech: ["Web", "UX", "Tempo real"],
    description: "Conceito de plataforma para assistir videos em salas sincronizadas, com foco em experiencia compartilhada.",
    url: "projetos/pessoais/amet/README.md"
  },
  {
    id: "plantao",
    name: "Plantao",
    type: "pessoal",
    status: "Em revisao",
    tech: ["Android", "Kotlin/Java", "Mobile"],
    description: "Aplicativo para consulta e organizacao de escalas, com foco em clareza de agenda e controle operacional.",
    url: "projetos/pessoais/plantao/README.md"
  }
];

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

function readProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(projectsStorageKey) || "null");
    return Array.isArray(saved) ? saved : defaultProjects;
  } catch {
    return defaultProjects;
  }
}

function saveProjects(projects) {
  localStorage.setItem(projectsStorageKey, JSON.stringify(projects));
}

function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem(sessionStorageKey) || "null");
  } catch {
    return null;
  }
}

function saveSession(user) {
  sessionStorage.setItem(sessionStorageKey, JSON.stringify({
    username: user.username,
    name: user.name,
    role: user.role,
    permissions: user.permissions
  }));
}

function clearSession() {
  sessionStorage.removeItem(sessionStorageKey);
}

function currentUser() {
  return readSession();
}

function can(permission) {
  return currentUser()?.permissions?.includes(permission) || false;
}

function setProjectFormEnabled(enabled) {
  projectForm?.querySelectorAll("input, select, textarea, button").forEach((field) => {
    if (field === cancelEdit) {
      field.disabled = !projectId?.value;
      return;
    }
    field.disabled = !enabled;
  });
}

function renderSession() {
  const user = currentUser();
  const signedIn = Boolean(user);
  if (loginForm) loginForm.hidden = signedIn;
  if (sessionPanel) sessionPanel.hidden = !signedIn;

  if (signedIn && sessionSummary && permissionStrip) {
    sessionSummary.textContent = `${user.name} (${user.role})`;
    permissionStrip.replaceChildren(...user.permissions.map((permission) => {
      const item = document.createElement("span");
      item.textContent = permission;
      return item;
    }));
  }

  const mayWrite = can("criar") || can("editar");
  setProjectFormEnabled(mayWrite);
  if (projectFormHelp) {
    projectFormHelp.textContent = signedIn
      ? mayWrite
        ? "Voce pode cadastrar e editar projetos conforme seu perfil."
        : "Seu perfil permite visualizar projetos, mas nao alterar dados."
      : "Entre como admin ou editor para cadastrar e alterar projetos.";
  }
}

function resetProjectForm() {
  if (!projectForm) return;
  projectForm.reset();
  projectId.value = "";
  projectType.value = "academico";
  projectStatus.value = "Em producao";
  if (projectFormTitle) projectFormTitle.textContent = "Novo projeto";
  if (projectMessage) projectMessage.textContent = "";
  if (cancelEdit) cancelEdit.disabled = true;
  setProjectFormEnabled(can("criar") || can("editar"));
}

function normalizeTech(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function projectMatches(project, filter, query) {
  const typeMatches = filter === "todos" || project.type === filter;
  const source = [
    project.name,
    project.type,
    project.status,
    project.description,
    project.tech.join(" ")
  ].join(" ").toLowerCase();
  return typeMatches && (!query || source.includes(query));
}

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = `project-card visible${project.featured ? " featured" : ""}`;
  article.dataset.projectId = project.id;
  article.dataset.projectType = project.type;

  const topline = document.createElement("div");
  topline.className = "card-topline";
  const type = document.createElement("span");
  type.textContent = project.type === "academico" ? "Academico" : "Pessoal";
  const status = document.createElement("strong");
  status.textContent = project.status;
  topline.append(type, status);

  const title = document.createElement("h3");
  title.textContent = project.name;

  const description = document.createElement("p");
  description.textContent = project.description;

  const techList = document.createElement("ul");
  techList.className = "tech-list";
  project.tech.forEach((tech) => {
    const item = document.createElement("li");
    item.textContent = tech;
    techList.appendChild(item);
  });

  const actions = document.createElement("div");
  actions.className = "project-actions";

  if (project.url) {
    const link = document.createElement("a");
    link.className = "inline-link";
    link.href = project.url;
    link.textContent = "Ler README";
    actions.appendChild(link);
  }

  const edit = document.createElement("button");
  edit.className = "project-action";
  edit.type = "button";
  edit.dataset.action = "edit";
  edit.dataset.id = project.id;
  edit.textContent = "Editar";
  edit.disabled = !can("editar");
  actions.appendChild(edit);

  const remove = document.createElement("button");
  remove.className = "project-action danger";
  remove.type = "button";
  remove.dataset.action = "delete";
  remove.dataset.id = project.id;
  remove.textContent = "Excluir";
  remove.disabled = !can("excluir");
  actions.appendChild(remove);

  article.append(topline, title, description, techList, actions);
  return article;
}

function renderProjects() {
  if (!projectGrid) return;
  const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "todos";
  const query = (searchInput?.value || "").trim().toLowerCase();
  const projects = readProjects();
  const visible = projects.filter((project) => projectMatches(project, activeFilter, query));
  projectGrid.replaceChildren(...visible.map(createProjectCard));
  if (emptyProjects) emptyProjects.hidden = visible.length > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderProjects();
  });
});

searchInput?.addEventListener("input", renderProjects);

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = loginUser.value.trim().toLowerCase();
  const password = loginPass.value;
  const user = demoUsers.find((item) => item.username === username && item.password === password);

  if (!user) {
    loginMessage.textContent = "Usuario ou senha invalidos.";
    return;
  }

  saveSession(user);
  loginForm.reset();
  loginMessage.textContent = "";
  renderSession();
  renderProjects();
});

logoutButton?.addEventListener("click", () => {
  clearSession();
  resetProjectForm();
  renderSession();
  renderProjects();
});

projectForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const editing = Boolean(projectId.value);
  if (editing && !can("editar")) {
    projectMessage.textContent = "Seu perfil nao pode editar projetos.";
    return;
  }
  if (!editing && !can("criar")) {
    projectMessage.textContent = "Seu perfil nao pode criar projetos.";
    return;
  }

  const projects = readProjects();
  const payload = {
    id: editing ? projectId.value : `projeto-${Date.now()}`,
    name: projectName.value.trim(),
    type: projectType.value,
    status: projectStatus.value,
    tech: normalizeTech(projectTech.value),
    description: projectDescription.value.trim(),
    url: "",
    featured: false
  };

  if (!payload.name || !payload.description || !payload.tech.length) {
    projectMessage.textContent = "Preencha nome, descricao e tecnologias.";
    return;
  }

  const nextProjects = editing
    ? projects.map((project) => project.id === payload.id ? { ...project, ...payload, url: project.url, featured: project.featured } : project)
    : [...projects, payload];

  saveProjects(nextProjects);
  projectMessage.textContent = editing ? "Projeto atualizado." : "Projeto cadastrado.";
  resetProjectForm();
  renderProjects();
});

cancelEdit?.addEventListener("click", resetProjectForm);

projectGrid?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;
  const action = target.dataset.action;
  const id = target.dataset.id;
  if (!action || !id) return;

  const projects = readProjects();
  const selected = projects.find((project) => project.id === id);
  if (!selected) return;

  if (action === "edit") {
    if (!can("editar")) return;
    projectId.value = selected.id;
    projectName.value = selected.name;
    projectType.value = selected.type;
    projectStatus.value = selected.status;
    projectTech.value = selected.tech.join(", ");
    projectDescription.value = selected.description;
    projectFormTitle.textContent = "Editar projeto";
    projectMessage.textContent = "";
    cancelEdit.disabled = false;
    document.getElementById("painel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (action === "delete") {
    if (!can("excluir")) return;
    saveProjects(projects.filter((project) => project.id !== id));
    resetProjectForm();
    renderProjects();
  }
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
  if (!el.stars || !el.forks || !el.issues || !el.updated || !el.sync || !el.state) return;

  const repo = "junior089/portfoliohub";
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

renderSession();
renderProjects();
document.addEventListener("DOMContentLoaded", loadGitHubStats);
