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
