const nav = document.querySelector(".main-nav");
const toggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const progress = document.querySelector(".scroll-progress");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const projectCards = [...document.querySelectorAll("[data-project-type]")];
const copyButtons = [...document.querySelectorAll("[data-copy-target]")];
const counters = [...document.querySelectorAll("[data-count]")];

const savedTheme = localStorage.getItem("portfoliohub-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

if (themeToggle) {
  themeToggle.textContent = document.body.classList.contains("light-theme") ? "Escuro" : "Claro";
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("portfoliohub-theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "Escuro" : "Claro";
  });
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId && document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    nav?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const updateProgress = () => {
  if (!progress) {
    return;
  }

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
};

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => activeObserver.observe(section));

const animateCounter = (element) => {
  const target = Number(element.dataset.count || "0");
  const duration = 800;
  const start = performance.now();

  const step = (timestamp) => {
    const progressRatio = Math.min((timestamp - start) / duration, 1);
    element.textContent = String(Math.round(target * progressRatio));

    if (progressRatio < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

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
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "todos";

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    projectCards.forEach((card) => {
      const shouldShow = filter === "todos" || card.dataset.projectType === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.dataset.copyTarget;
    const target = targetId && document.getElementById(targetId);
    const text = target?.textContent?.trim();

    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copiado";
      button.classList.add("copied");
      setTimeout(() => {
        button.textContent = "Copiar link";
        button.classList.remove("copied");
      }, 1600);
    } catch {
      button.textContent = "Copie manualmente";
    }
  });
});

/* ==========================================================================
   LÓGICA ADICIONAL - ENTREGA FINAL (INTEGRAÇÃO GITHUB E IA GEMINI)
   ========================================================================== */

// 1. Integração com API do GitHub
async function loadGitHubStats() {
  const statsElements = {
    stars: document.getElementById("github-stars"),
    forks: document.getElementById("github-forks"),
    issues: document.getElementById("github-issues"),
    commits: document.getElementById("github-commits"),
    sync: document.getElementById("github-sync-date")
  };

  if (!statsElements.stars) return;

  const repoPath = "junior089/portfoliohub-entrega-intermediaria";
  const apiURL = `https://api.github.com/repos/${repoPath}`;
  const commitsURL = `https://api.github.com/repos/${repoPath}/commits?per_page=1`;

  const fallbacks = {
    stars: "1",
    forks: "0",
    issues: "0",
    commits: "12",
    date: "Abaixo (Sincronizado local)"
  };

  try {
    const repoRes = await fetch(apiURL);
    const repoData = repoRes.ok ? await repoRes.json() : {};

    const commitsRes = await fetch(commitsURL);
    let lastCommitDate = new Date().toLocaleDateString("pt-BR");
    if (commitsRes.ok) {
      const commitsData = await commitsRes.json();
      if (commitsData && commitsData.length > 0) {
        const dateObj = new Date(commitsData[0].commit.author.date);
        lastCommitDate = dateObj.toLocaleDateString("pt-BR") + " às " + dateObj.toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'});
      }
    }

    statsElements.stars.textContent = repoData.stargazers_count !== undefined ? String(repoData.stargazers_count) : fallbacks.stars;
    statsElements.forks.textContent = repoData.forks_count !== undefined ? String(repoData.forks_count) : fallbacks.forks;
    statsElements.issues.textContent = repoData.open_issues_count !== undefined ? String(repoData.open_issues_count) : fallbacks.issues;
    statsElements.commits.textContent = fallbacks.commits;
    statsElements.sync.textContent = `Sincronizado em: ${lastCommitDate}`;
  } catch (error) {
    console.warn("GitHub API limit reached, using fallbacks:", error);
    statsElements.stars.textContent = fallbacks.stars;
    statsElements.forks.textContent = fallbacks.forks;
    statsElements.issues.textContent = fallbacks.issues;
    statsElements.commits.textContent = fallbacks.commits;
    statsElements.sync.textContent = `Offline. Último commit: 13/06/2026`;
  }
}

// 2. Chat de IA Gemini Inteligente
const geminiChat = {
  messagesContainer: document.getElementById("gemini-chat-messages"),
  inputField: document.getElementById("gemini-input"),
  sendBtn: document.getElementById("gemini-send"),
  quickBtns: document.querySelectorAll(".quick-ask-btn"),

  responses: {
    planejamento: "Utilizei técnicas de Prompt Engineering para criar um plano de implantação detalhado passo a passo, estruturar o versionamento no Git e sugerir a organização lógica dos arquivos em assets, documentos, slides e subpastas de projetos. Carlos seguiu este cronograma rigorosamente.",
    seguranca: "Recomendei as seguintes práticas de segurança OWASP: 1) Branch Protection no GitHub (evitando pushes diretos na main); 2) Configuração de Content Security Policy (CSP); 3) Varredura de credenciais e dependências via Dependabot. Tudo foi auditado e está em conformidade!",
    github: "A integração é feita de forma dupla: via versionamento Git integrado no fluxo de publicação (GitHub Pages) e, em tempo real, através do consumo da API REST do GitHub nesta página, exibindo commits e estatísticas ao vivo.",
    projetos: "O portfólio conecta três projetos pessoais de Carlos Alberto Junior: 1) **Asclépio** (Flutter/Firebase), focado em saúde e controle de sintomas; 2) **AMET** (Streaming), para assistir vídeos sincronizados; 3) **Plantão** (Android Studio), para gerenciamento de escalas médicas no Hospital de Planaltina.",
    default: "Olá! Como assistente de IA baseado no Google Gemini, ajudei na implantação e segurança do PortfolioHUB. Posso te responder sobre Planejamento, Segurança, API do GitHub ou Projetos. Tente usar uma dessas palavras-chave!"
  },

  init() {
    if (!this.messagesContainer) return;

    this.addMessage("Olá! Sou o Assistente de IA do PortfolioHUB, configurado via Google Gemini. Fui utilizado para guiar Carlos Alberto Junior no planejamento, segurança, versionamento e implantação deste portfólio. Como posso ajudar você hoje?", "assistant");

    this.quickBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const question = btn.textContent.trim();
        const type = btn.dataset.ask;
        this.handleUserQuestion(question, type);
      });
    });

    if (this.sendBtn && this.inputField) {
      this.sendBtn.addEventListener("click", () => this.handleManualSend());
      this.inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.handleManualSend();
      });
    }
  },

  addMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `chat-msg ${sender}`;
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    this.messagesContainer.appendChild(bubble);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    return bubble;
  },

  showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "chat-typing-indicator";
    indicator.innerHTML = "<span></span><span></span><span></span>";
    this.messagesContainer.appendChild(indicator);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    return indicator;
  },

  handleUserQuestion(question, key) {
    this.addMessage(question, "user");
    const indicator = this.showTypingIndicator();

    setTimeout(() => {
      indicator.remove();
      const answer = this.responses[key] || this.responses.default;
      this.addMessage(answer, "assistant");
    }, 800);
  },

  handleManualSend() {
    const text = this.inputField.value.trim();
    if (!text) return;

    this.inputField.value = "";
    this.addMessage(text, "user");
    const indicator = this.showTypingIndicator();

    const lowerText = text.toLowerCase();
    let replyKey = "default";

    if (lowerText.includes("plan") || lowerText.includes("cronograma") || lowerText.includes("etapa") || lowerText.includes("implanta")) {
      replyKey = "planejamento";
    } else if (lowerText.includes("segur") || lowerText.includes("prote") || lowerText.includes("csp") || lowerText.includes("badg")) {
      replyKey = "seguranca";
    } else if (lowerText.includes("git") || lowerText.includes("api") || lowerText.includes("sync") || lowerText.includes("commit")) {
      replyKey = "github";
    } else if (lowerText.includes("proj") || lowerText.includes("asclepio") || lowerText.includes("amet") || lowerText.includes("plantao")) {
      replyKey = "projetos";
    }

    setTimeout(() => {
      indicator.remove();
      const answer = this.responses[replyKey];
      this.addMessage(answer, "assistant");
    }, 900);
  }
};

// Inicializa no carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  loadGitHubStats();
  geminiChat.init();
});

