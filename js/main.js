/**
 * MAIN PORTFOLIO CONTROLLER & INTERACTIONS
 * Handles particle canvas, project filtering, skills showcase,
 * modal dialogs, typing effects, theme toggling, and contact actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all subsystems
  initTheme();
  initParticles();
  initHeroTyping();
  initStats();
  initSkills();
  initProjects();
  initJourney();
  initPhilosophy();
  initContact();
  initNavigation();
  initLucide();
});

/**
 * -------------------------------------------------------------
 * 1. THEME SWITCHER (Dark / Light Mode with LocalStorage)
 * -------------------------------------------------------------
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('light-theme');
    updateThemeIcon(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
    });
  }

  function updateThemeIcon(isLight) {
    if (!themeIcon) return;
    if (isLight) {
      themeIcon.setAttribute('data-lucide', 'moon');
    } else {
      themeIcon.setAttribute('data-lucide', 'sun');
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

/**
 * -------------------------------------------------------------
 * 2. INTERACTIVE PARTICLES CANVAS
 * -------------------------------------------------------------
 */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 120 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.8;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 20 + 5;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
    }

    draw() {
      const isLight = document.body.classList.contains('light-theme');
      ctx.fillStyle = isLight ? 'rgba(59, 130, 246, 0.45)' : 'rgba(56, 189, 248, 0.45)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      // Free drift
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse proximity repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density * 0.4;
          const directionY = forceDirectionY * force * this.density * 0.4;

          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connect() {
    const isLight = document.body.classList.contains('light-theme');
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const opacity = (1 - dist / 110) * 0.18;
          ctx.strokeStyle = isLight
            ? `rgba(59, 130, 246, ${opacity})`
            : `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
      particles[i].update();
    }
    connect();
    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * -------------------------------------------------------------
 * 3. HERO SECTION TYPING ROTATOR
 * -------------------------------------------------------------
 */
function initHeroTyping() {
  const targetElement = document.getElementById('typing-text');
  if (!targetElement) return;

  const titles = PORTFOLIO_DATA.personal.rotatingTitles;
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseEnd = 1600;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      targetElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, pauseEnd);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(type, 300);
      return;
    }

    const timeout = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, timeout);
  }

  type();
}

/**
 * -------------------------------------------------------------
 * 4. STATS COUNTER DISPLAY
 * -------------------------------------------------------------
 */
function initStats() {
  const statsContainer = document.getElementById('stats-grid');
  if (!statsContainer) return;

  statsContainer.innerHTML = PORTFOLIO_DATA.personal.stats
    .map(
      (stat) => `
      <div class="glass-panel p-5 rounded-2xl flex items-center space-x-4 border border-slate-700/40">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
          <i data-lucide="${stat.icon}" class="w-6 h-6"></i>
        </div>
        <div>
          <div class="text-2xl lg:text-3xl font-extrabold tracking-tight font-heading gradient-text">${stat.number}</div>
          <div class="text-xs uppercase tracking-wider text-slate-400 font-medium mt-0.5">${stat.label}</div>
        </div>
      </div>
    `
    )
    .join('');
}

/**
 * -------------------------------------------------------------
 * 5. SIGNIFICANCE OF SKILLS (With Filters & Deep Explanations)
 * -------------------------------------------------------------
 */
function initSkills() {
  const categoriesContainer = document.getElementById('skill-filters');
  const skillsGrid = document.getElementById('skills-grid');
  if (!categoriesContainer || !skillsGrid) return;

  // Render Filter Tabs
  categoriesContainer.innerHTML = PORTFOLIO_DATA.skillCategories
    .map(
      (cat, idx) => `
      <button 
        class="filter-btn px-4 py-2 rounded-xl text-sm font-medium border border-slate-700/60 transition-all ${
          idx === 0 ? 'active' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
        }" 
        data-filter="${cat.id}">
        ${cat.label}
      </button>
    `
    )
    .join('');

  // Render Skills
  function renderSkillsList(filter = 'all') {
    const filtered =
      filter === 'all'
        ? PORTFOLIO_DATA.skills
        : PORTFOLIO_DATA.skills.filter((s) => s.category === filter);

    skillsGrid.innerHTML = filtered
      .map(
        (skill) => `
        <div class="skill-card glass-panel p-6 rounded-2xl flex flex-col justify-between border border-slate-800/80 group">
          <div>
            <!-- Header with Icon & Proficiency Badge -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                  <i data-lucide="${skill.icon}" class="w-6 h-6"></i>
                </div>
                <div>
                  <h3 class="font-heading font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">${skill.name}</h3>
                  <span class="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">${skill.tag}</span>
                </div>
              </div>
              <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800/80 text-cyan-300 border border-slate-700">
                ${skill.level}%
              </span>
            </div>

            <!-- Proficiency Progress Bar -->
            <div class="w-full bg-slate-800/80 rounded-full h-2 mb-4 overflow-hidden border border-slate-700/30">
              <div 
                class="skill-bar-fill h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" 
                style="width: ${skill.level}%">
              </div>
            </div>

            <!-- THE SIGNIFICANCE (Key Highlight) -->
            <div class="bg-cyan-950/25 border border-cyan-500/20 rounded-xl p-3.5 mb-4">
              <div class="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mb-1">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                <span>Significance & Engineering Value</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">${skill.significance}</p>
            </div>

            <!-- Real-world Impact Bullet points -->
            <div class="space-y-1.5 pt-1">
              ${skill.impactHighlights
                .map(
                  (pt) => `
                <div class="flex items-start space-x-2 text-xs text-slate-400">
                  <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5"></i>
                  <span>${pt}</span>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      `
      )
      .join('');

    initLucide();
  }

  // Initial render
  renderSkillsList('all');

  // Filter button click events
  categoriesContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    categoriesContainer.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.getAttribute('data-filter');
    renderSkillsList(filterVal);
  });
}

/**
 * -------------------------------------------------------------
 * 6. PROJECTS SHOWCASE (With Modal, Links & Metrics)
 * -------------------------------------------------------------
 */
function initProjects() {
  const filterContainer = document.getElementById('project-filters');
  const projectsGrid = document.getElementById('projects-grid');
  if (!filterContainer || !projectsGrid) return;

  // Render Filter Tabs
  filterContainer.innerHTML = PORTFOLIO_DATA.projectCategories
    .map(
      (cat, idx) => `
      <button 
        class="filter-btn px-4 py-2 rounded-xl text-sm font-medium border border-slate-700/60 transition-all ${
          idx === 0 ? 'active' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
        }" 
        data-filter="${cat.id}">
        ${cat.label}
      </button>
    `
    )
    .join('');

  // Render Projects List
  function renderProjects(filter = 'all') {
    const filtered =
      filter === 'all'
        ? PORTFOLIO_DATA.projects
        : PORTFOLIO_DATA.projects.filter((p) => p.category === filter);

    projectsGrid.innerHTML = filtered
      .map(
        (project) => `
        <div class="project-card glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800/80 group">
          <!-- Thumbnail Graphic Header with Decorative Elements -->
          <div class="project-thumb-container relative h-48 bg-gradient-to-br ${project.imageGradient} p-5 flex flex-col justify-between overflow-hidden">
            <!-- Background Grid Pattern -->
            <div class="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div class="relative z-10 flex items-center justify-between">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-md text-white border border-white/20">
                ${project.badge}
              </span>
              <div class="flex items-center space-x-2">
                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" 
                   class="w-8 h-8 rounded-full bg-black/40 hover:bg-white hover:text-black transition-colors flex items-center justify-center text-white/90 backdrop-blur-md"
                   title="View Source on GitHub">
                  <i data-lucide="github" class="w-4 h-4"></i>
                </a>
                <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" 
                   class="w-8 h-8 rounded-full bg-black/40 hover:bg-white hover:text-black transition-colors flex items-center justify-center text-white/90 backdrop-blur-md"
                   title="Live Demo">
                  <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
              </div>
            </div>

            <!-- Graphic Title Watermark -->
            <div class="relative z-10">
              <div class="text-xl md:text-2xl font-black font-heading text-white drop-shadow-md">
                ${project.title.split(':')[0]}
              </div>
              <div class="text-xs text-white/80 font-mono tracking-wider uppercase mt-1">
                ${project.category}
              </div>
            </div>
          </div>

          <!-- Project Body Content -->
          <div class="p-6 flex flex-col flex-1 justify-between">
            <div>
              <h3 class="font-heading font-bold text-xl text-white group-hover:text-cyan-300 transition-colors mb-2">
                ${project.title}
              </h3>
              
              <p class="text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                ${project.summary}
              </p>

              <!-- Technical Significance Highlight Box -->
              <div class="bg-slate-900/60 border border-slate-700/60 rounded-xl p-3 mb-4">
                <span class="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <i data-lucide="cpu" class="w-3 h-3"></i> Core Engineering Significance
                </span>
                <p class="text-xs text-slate-400 line-clamp-2">
                  ${project.significance}
                </p>
              </div>

              <!-- Metrics Mini Grid -->
              <div class="grid grid-cols-3 gap-2 mb-4 text-center">
                ${project.metrics
                  .map(
                    (m) => `
                  <div class="bg-slate-800/40 rounded-lg p-2 border border-slate-700/30">
                    <div class="text-xs font-mono font-bold text-cyan-400">${m.value}</div>
                    <div class="text-[10px] text-slate-400 truncate mt-0.5">${m.label}</div>
                  </div>
                `
                  )
                  .join('')}
              </div>

              <!-- Tech Stack Badges -->
              <div class="flex flex-wrap gap-1.5 mb-6">
                ${project.techStack
                  .map(
                    (t) => `
                  <span class="tag-pill text-[11px] font-mono px-2.5 py-0.5 rounded-md">
                    ${t}
                  </span>
                `
                  )
                  .join('')}
              </div>
            </div>

            <!-- Bottom Actions -->
            <div class="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button 
                class="view-modal-btn w-full btn-secondary text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2"
                data-project-id="${project.id}">
                <i data-lucide="info" class="w-4 h-4 text-cyan-400"></i>
                <span>Explore Full Details</span>
              </button>
            </div>
          </div>
        </div>
      `
      )
      .join('');

    initLucide();
  }

  // Initial render
  renderProjects('all');

  // Filter button events
  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterContainer.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.getAttribute('data-filter');
    renderProjects(filterVal);
  });

  // Modal Triggers
  projectsGrid.addEventListener('click', (e) => {
    const modalBtn = e.target.closest('.view-modal-btn');
    if (!modalBtn) return;

    const projectId = modalBtn.getAttribute('data-project-id');
    const project = PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
    if (project) {
      openProjectModal(project);
    }
  });

  setupModalHandlers();
}

/**
 * Project Modal Dialog Management
 */
function setupModalHandlers() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const container = document.getElementById('modal-dynamic-content');
  if (!modal || !container) return;

  container.innerHTML = `
    <!-- Modal Header Banner -->
    <div class="h-44 bg-gradient-to-r ${project.imageGradient} p-6 flex flex-col justify-between relative rounded-t-2xl">
      <div class="flex items-center justify-between">
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-md text-white border border-white/20">
          ${project.badge} • ${project.category.toUpperCase()}
        </span>
      </div>
      <div>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white font-heading">${project.title}</h2>
      </div>
    </div>

    <!-- Modal Body -->
    <div class="p-6 md:p-8 space-y-6">
      <!-- Full Description -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-2">Overview</h4>
        <p class="text-sm md:text-base text-slate-300 leading-relaxed">${project.fullDescription}</p>
      </div>

      <!-- Significance Deep Dive -->
      <div class="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-4 md:p-5">
        <div class="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-2">
          <i data-lucide="sparkles" class="w-4 h-4"></i>
          <span>Architecture & Technical Significance</span>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">${project.significance}</p>
      </div>

      <!-- Key Metrics -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-3">Key Performance Metrics</h4>
        <div class="grid grid-cols-3 gap-3">
          ${project.metrics
            .map(
              (m) => `
            <div class="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/50 text-center">
              <div class="text-lg font-extrabold text-cyan-300 font-mono">${m.value}</div>
              <div class="text-xs text-slate-400 mt-1">${m.label}</div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Features Checklist -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-3">Core Implemented Capabilities</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          ${project.features
            .map(
              (feat) => `
            <div class="flex items-start space-x-2.5 text-xs md:text-sm text-slate-300 bg-slate-800/30 p-2.5 rounded-lg border border-slate-800">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
              <span>${feat}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Tech Stack -->
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-2.5">Technologies Used</h4>
        <div class="flex flex-wrap gap-2">
          ${project.techStack
            .map(
              (tech) => `
            <span class="tag-pill px-3 py-1 rounded-lg text-xs font-mono font-medium">${tech}</span>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Action Footer Links -->
      <div class="pt-6 border-t border-slate-800 flex flex-wrap gap-3">
        <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" 
           class="flex-1 btn-primary py-3 px-5 rounded-xl text-center text-sm font-bold text-white flex items-center justify-center gap-2">
          <i data-lucide="external-link" class="w-4 h-4"></i>
          <span>Launch Live Application</span>
        </a>
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" 
           class="flex-1 btn-secondary py-3 px-5 rounded-xl text-center text-sm font-bold text-slate-200 flex items-center justify-center gap-2">
          <i data-lucide="github" class="w-4 h-4"></i>
          <span>View Source Code</span>
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  initLucide();
}

/**
 * -------------------------------------------------------------
 * 7. JOURNEY / EXPERIENCE TIMELINE
 * -------------------------------------------------------------
 */
function initJourney() {
  const journeyContainer = document.getElementById('journey-timeline');
  if (!journeyContainer) return;

  journeyContainer.innerHTML = PORTFOLIO_DATA.journey
    .map(
      (item, idx) => `
      <div class="relative flex flex-col md:flex-row items-start mb-12 last:mb-0 group">
        <!-- Center indicator dot -->
        <div class="absolute left-5 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 z-10 shadow-lg shadow-cyan-500/20 group-hover:scale-125 transition-transform">
          <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
        </div>

        <!-- Content Card: alternates left/right on desktop -->
        <div class="ml-14 md:ml-0 md:w-1/2 ${
          idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
        }">
          <div class="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all text-left">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 mb-2">
              ${item.period}
            </span>
            <h3 class="font-heading font-bold text-lg text-white">${item.role}</h3>
            <div class="text-sm text-cyan-400 font-medium mb-3">${item.organization}</div>
            <p class="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">${item.description}</p>
            <div class="flex flex-wrap gap-1.5">
              ${item.tags
                .map(
                  (tag) => `
                <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/70 text-slate-400 border border-slate-700/50">${tag}</span>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join('');
}

/**
 * -------------------------------------------------------------
 * 8. ENGINEERING PHILOSOPHY / PILLARS
 * -------------------------------------------------------------
 */
function initPhilosophy() {
  const container = document.getElementById('philosophy-grid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.principles
    .map(
      (p) => `
      <div class="philosophy-card glass-panel p-6 rounded-2xl border border-slate-800/80 group">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
          <i data-lucide="${p.icon}" class="w-6 h-6"></i>
        </div>
        <h3 class="font-heading font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">${p.title}</h3>
        <p class="text-xs md:text-sm text-slate-400 leading-relaxed">${p.description}</p>
      </div>
    `
    )
    .join('');
}

/**
 * -------------------------------------------------------------
 * 9. CONTACT FORM & ONE-CLICK EMAIL COPY
 * -------------------------------------------------------------
 */
function initContact() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-email-btn');

  // Copy Email to clipboard with feedback
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = PORTFOLIO_DATA.personal.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied to clipboard: ${email}`, 'success');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i><span>Email Copied!</span>`;
        initLucide();
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          initLucide();
        }, 2500);
      }).catch(() => {
        showToast(`Contact email: ${email}`, 'info');
      });
    });
  }

  // Handle contact form submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      // Simulated smooth submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">⟳</span>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        showToast(`Thank you, ${nameInput.value.trim()}! Your message has been received.`, 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }, 1200);
    });
  }
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconName =
    type === 'success' ? 'check-circle-2' : type === 'error' ? 'alert-triangle' : 'info';
  const iconColor =
    type === 'success'
      ? 'text-emerald-400'
      : type === 'error'
      ? 'text-rose-400'
      : 'text-cyan-400';

  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 ${iconColor} shrink-0"></i>
    <span class="text-sm font-medium">${message}</span>
  `;

  container.appendChild(toast);
  initLucide();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

/**
 * -------------------------------------------------------------
 * 10. MOBILE NAVIGATION & SMOOTH SCROLL
 * -------------------------------------------------------------
 */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Populate dynamic personal placeholders in HTML
  document.querySelectorAll('[data-bind="name"]').forEach((el) => {
    el.textContent = PORTFOLIO_DATA.personal.name;
  });
  document.querySelectorAll('[data-bind="roleTitle"]').forEach((el) => {
    el.textContent = PORTFOLIO_DATA.personal.roleTitle;
  });
  document.querySelectorAll('[data-bind="bioShort"]').forEach((el) => {
    el.textContent = PORTFOLIO_DATA.personal.bioShort;
  });
  document.querySelectorAll('[data-bind="bioLong"]').forEach((el) => {
    el.textContent = PORTFOLIO_DATA.personal.bioLong;
  });
  document.querySelectorAll('[data-bind="email"]').forEach((el) => {
    el.textContent = PORTFOLIO_DATA.personal.email;
  });
  document.querySelectorAll('[data-bind="phone"]').forEach((el) => {
    el.textContent = PORTFOLIO_DATA.personal.phone;
  });
  document.querySelectorAll('[data-bind="phoneDisplay"]').forEach((el) => {
    el.textContent = PORTFOLIO_DATA.personal.phoneDisplay;
  });
  document.querySelectorAll('[data-bind="statusText"]').forEach((el) => {
    el.textContent = PORTFOLIO_DATA.personal.status.text;
  });

  // Social & Contact Links (GitHub & LinkedIn across all elements)
  document.querySelectorAll('.social-github-link').forEach((el) => {
    el.href = PORTFOLIO_DATA.personal.github;
  });
  document.querySelectorAll('.social-linkedin-link').forEach((el) => {
    el.href = PORTFOLIO_DATA.personal.linkedin;
  });

  const githubEl = document.getElementById('social-github');
  if (githubEl) githubEl.href = PORTFOLIO_DATA.personal.github;

  const linkedinEl = document.getElementById('social-linkedin');
  if (linkedinEl) linkedinEl.href = PORTFOLIO_DATA.personal.linkedin;
  if (twitterEl) twitterEl.href = PORTFOLIO_DATA.personal.twitter;
}

/**
 * Helper to safely re-initialize Lucide icons
 */
function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
