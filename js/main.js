/* ============================================================
   main.js — Rendering, Nav, Theme, Filters, Search, Modal,
   Tabs, Forms
   ============================================================ */

const portfolioState = {
  filter: 'all',
  search: '',
  sort: 'featured',
  view: 'grid'
};

/* ============ RENDERERS ============ */

const renderSocialLinks = () => {
  const html = portfolioData.socials.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener" class="social-link"
       aria-label="${s.name}" title="${s.name}">
      <i class="${s.icon}"></i>
    </a>`).join('');
  ['heroSocials', 'socialLinksContainer', 'footerSocialsContainer'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
};

const renderServices = () => {
  const el = document.getElementById('servicesGrid');
  if (!el) return;
  el.innerHTML = portfolioData.services.map((s, i) => `
    <div class="service-card reveal" style="transition-delay:${i * 80}ms">
      <div class="service-icon"><i class="${s.icon}"></i></div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>`).join('');
};

/* --- SKILLS: enhanced rendering --- */
const renderSkillsStats = () => {
  const el = document.querySelector('.skills-stats');
  if (!el || !portfolioData.skillsStats) return;
  el.innerHTML = portfolioData.skillsStats.map(stat => `
    <div class="skills-stat">
      <div class="skills-stat-value">
        <span class="skills-stat-num" data-target="${stat.value}">0</span>${stat.suffix}
      </div>
      <div class="skills-stat-label">${stat.label}</div>
    </div>`).join('');

  // Animate the numbers
  const animate = () => {
    el.querySelectorAll('.skills-stat-num').forEach(elNum => {
      const target = +elNum.dataset.target || 0;
      const duration = 1500;
      const start = performance.now();
      (function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        elNum.textContent = Math.floor(eased * target);
        if (t < 1) requestAnimationFrame(step);
        else elNum.textContent = target;
      })(start);
    });
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animate();
        io.disconnect();
      }
    });
  }, { threshold: 0.3 });
  io.observe(el);
};

const renderSkills = () => {
  const el = document.getElementById('skillsContainer');
  if (!el) return;
  el.innerHTML = portfolioData.skillsCategories.map((cat, idx) => `
    <div class="skills-category accent-${cat.accent || 'blue'} reveal" style="transition-delay:${idx * 100}ms">
      <div class="skills-category-head">
        <div class="skills-category-icon"><i class="${cat.icon}"></i></div>
        <div class="skills-category-meta">
          <h3>${cat.title}</h3>
          ${cat.description ? `<p>${cat.description}</p>` : ''}
        </div>
      </div>
      <div class="skills-list">
        ${cat.skills.map(s => `
          <div class="skill">
            <div class="skill-info">
              <span class="skill-name">
                ${s.icon ? `<i class="${s.icon}"></i>` : ''}
                <span>${s.name}</span>
              </span>
              <span class="skill-percent">${s.percentage}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" data-width="${s.percentage}"></div>
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');
};

const renderToolsChips = () => {
  const el = document.getElementById('toolsChips');
  if (!el || !portfolioData.toolsChips) return;
  el.innerHTML = portfolioData.toolsChips
    .map(t => `<span class="tool-chip">${t}</span>`).join('');
};

const renderPortfolioFilters = () => {
  const el = document.getElementById('portfolioFilterContainer');
  if (!el) return;
  el.innerHTML = portfolioData.portfolioCategories.map((c, i) => `
    <button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${c.id}"
            role="tab" aria-selected="${i === 0}">${c.label}</button>
  `).join('');
};

const getFilteredProjects = () => {
  let items = [...portfolioData.projects];
  if (portfolioState.filter !== 'all') {
    items = items.filter(p => p.category.split(' ').includes(portfolioState.filter));
  }
  const q = portfolioState.search.trim().toLowerCase();
  if (q) {
    items = items.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.infoTitle.toLowerCase().includes(q) ||
      p.infoDesc.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  if (portfolioState.sort === 'featured') {
    items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  } else if (portfolioState.sort === 'newest') {
    items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  } else if (portfolioState.sort === 'az') {
    items.sort((a, b) => a.infoTitle.localeCompare(b.infoTitle));
  }
  return items;
};

const renderTechChips = (items) => {
  const el = document.getElementById('techChips');
  if (!el) return;
  const tags = [...new Set(items.flatMap(p => p.tags))].sort();
  if (!tags.length || portfolioState.search) {
    el.innerHTML = '';
    return;
  }
  el.innerHTML = tags.map(t => `
    <button class="tech-chip" data-tech-chip="${t}">
      <i class="fas fa-hashtag"></i> ${t}
    </button>`).join('');
  el.querySelectorAll('[data-tech-chip]').forEach(btn => {
    btn.addEventListener('click', () => {
      portfolioState.search = btn.dataset.techChip;
      const searchInput = document.getElementById('projectSearch');
      if (searchInput) searchInput.value = btn.dataset.techChip;
      renderPortfolioGrid();
    });
  });
};

const renderPortfolioGrid = () => {
  const el = document.getElementById('portfolioGridContainer');
  if (!el) return;
  const items = getFilteredProjects();
  const counter = document.getElementById('projectCount');
  if (counter) {
    counter.textContent = `Showing ${items.length} of ${portfolioData.projects.length} projects`;
  }
  renderTechChips(items);

  if (!items.length) {
    el.innerHTML = `
      <div class="portfolio-empty">
        <i class="fas fa-search"></i>
        <h3>No projects match your search</h3>
        <p>Try different keywords or clear the filters.</p>
        <button class="btn btn-primary" id="clearFiltersBtn">
          <i class="fas fa-times"></i> Clear All Filters
        </button>
      </div>`;
    document.getElementById('clearFiltersBtn')?.addEventListener('click', () => {
      portfolioState.search = '';
      portfolioState.filter = 'all';
      const searchInput = document.getElementById('projectSearch');
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === 'all');
      });
      renderPortfolioGrid();
    });
    return;
  }

  el.className = 'portfolio-grid' + (portfolioState.view === 'list' ? ' list-view' : '');

  el.innerHTML = items.map(p => {
    const safeTitle = p.title.replace(/'/g, "\\'");
    const featuredClass = p.featured ? ' featured' : '';
    const featuredBadge = p.featured
      ? '<span class="featured-badge"><i class="fas fa-star"></i> Featured</span>'
      : '';
    const liveBtn = p.demoUrl
      ? `<a href="${p.demoUrl}" target="_blank" rel="noopener" class="portfolio-link">
           <i class="fas fa-external-link-alt"></i> Live Demo
         </a>`
      : '';
    const detailsBtn = `
      <button class="portfolio-link ghost" data-details="${p.id}">
        <i class="fas fa-info-circle"></i> Details
      </button>`;

    return `
    <div class="portfolio-item${featuredClass}" data-id="${p.id}">
      ${featuredBadge}
      <div class="portfolio-img">
        <img src="${p.image}" alt="${p.title}" loading="lazy"
             onerror="if(window.generatePlaceholder)this.src=window.generatePlaceholder('${safeTitle}')">
        <div class="portfolio-overlay">
          <h4>${p.infoTitle}</h4>
          <p>${p.infoDesc}</p>
          <div class="portfolio-links">
            ${liveBtn}
            ${detailsBtn}
          </div>
        </div>
      </div>
      <div class="portfolio-info">
        <h3>${p.infoTitle}</h3>
        <p>${p.infoDesc}</p>
        <div class="tech-tags">
          ${p.tags.map(t => `<button class="tech-tag" data-tech="${t}">${t}</button>`).join('')}
        </div>
      </div>
    </div>`;
  }).join('');

  el.querySelectorAll('[data-tech]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      portfolioState.search = btn.dataset.tech;
      const searchInput = document.getElementById('projectSearch');
      if (searchInput) searchInput.value = btn.dataset.tech;
      renderPortfolioGrid();
    });
  });

  window.refreshReveals?.();
};

const expTypeClass = (type) => {
  const t = String(type).toLowerCase();
  if (t.includes('current') || t.includes('present')) return 'current';
  if (t.includes('intern')) return 'internship';
  if (t.includes('full')) return 'full-time';
  if (t.includes('remote') || t.includes('self')) return 'remote';
  return 'current';
};

const renderExperienceTimeline = () => {
  const el = document.getElementById('experienceTimeline');
  if (!el) return;
  el.innerHTML = portfolioData.experience.map(e => `
    <div class="exp-item reveal">
      <div class="exp-item-head">
        <span class="exp-date"><i class="fas fa-calendar-alt"></i> ${e.date}</span>
        <span class="exp-type ${expTypeClass(e.type)}">${e.type}</span>
      </div>
      <h3 class="exp-role">${e.role}</h3>
      <p class="exp-company"><i class="fas fa-building"></i> ${e.company}</p>
      <p class="exp-location"><i class="fas fa-map-marker-alt"></i> ${e.location}</p>
      <p class="exp-desc">${e.description}</p>
      <ul class="exp-highlights">
        ${e.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
      <div class="exp-tech">
        ${e.tech.map(t => `<span class="exp-tech-pill">${t}</span>`).join('')}
      </div>
    </div>`).join('');
};

const renderEducationTimeline = () => {
  const el = document.getElementById('educationTimeline');
  if (!el) return;
  el.innerHTML = portfolioData.education.map(e => `
    <div class="exp-item reveal">
      <div class="exp-item-head">
        <span class="exp-date"><i class="fas fa-calendar-alt"></i> ${e.date}</span>
        <span class="exp-type ${expTypeClass(e.type)}">${e.type}</span>
      </div>
      <h3 class="exp-role">${e.role}</h3>
      <p class="exp-company"><i class="fas fa-university"></i> ${e.company}</p>
      <p class="exp-location"><i class="fas fa-map-marker-alt"></i> ${e.location}</p>
      <p class="exp-desc">${e.description}</p>
      <ul class="exp-highlights">
        ${e.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
      <div class="exp-tech">
        ${e.tech.map(t => `<span class="exp-tech-pill">${t}</span>`).join('')}
      </div>
    </div>`).join('');
};

let currentCertFilter = 'all';

const renderCertCategories = () => {
  const el = document.getElementById('certCategoryTabs');
  if (!el) return;
  el.innerHTML = portfolioData.certCategories.map(c => `
    <button class="cert-tab ${c.id === currentCertFilter ? 'active' : ''}" data-cert-filter="${c.id}">
      <i class="${c.icon}"></i> ${c.label}
    </button>`).join('');
  el.querySelectorAll('[data-cert-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCertFilter = btn.dataset.certFilter;
      el.querySelectorAll('.cert-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCertifications();
    });
  });
};

const renderCertifications = () => {
  const el = document.getElementById('certificationsGrid');
  if (!el) return;
  let certs = portfolioData.certifications;
  if (currentCertFilter !== 'all') {
    certs = certs.filter(c => c.category === currentCertFilter);
  }
  const badge = document.getElementById('certCountBadge');
  if (badge) badge.textContent = certs.length;
  el.innerHTML = certs.length
    ? certs.map(c => `
      <div class="cert-card ${c.category} reveal">
        <div class="cert-icon"><i class="${c.icon}"></i></div>
        <h3 class="cert-title">${c.title}</h3>
        <p class="cert-issuer">${c.issuer}</p>
        <p class="cert-desc">${c.desc}</p>
      </div>`).join('')
    : `<p style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted)">No certifications in this category.</p>`;
  window.refreshReveals?.();
};

const renderTestimonials = () => {
  const el = document.getElementById('testimonialsGrid');
  if (!el) return;
  el.innerHTML = portfolioData.testimonials.map((t, i) => `
    <div class="testimonial-card reveal" style="transition-delay:${i * 100}ms">
      <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
      <div class="testimonial-stars">${'<i class="fas fa-star"></i>'.repeat(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.avatar}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>`).join('');
};

/* ============ MODAL ============ */

const bindModalClose = () => {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.querySelectorAll('[data-close]').forEach(el => {
    if (el.dataset.closeBound === '1') return;
    el.dataset.closeBound = '1';
    el.addEventListener('click', closeProjectModal);
  });
};

const openProjectModal = (id) => {
  const p = portfolioData.projects.find(x => x.id === +id);
  if (!p) return;
  const modal = document.getElementById('projectModal');
  const body = document.getElementById('modalBody');
  if (!modal || !body) return;
  const safeTitle = (p.infoTitle || 'Project').replace(/'/g, "\\'");
  const liveBtn = p.demoUrl
    ? `<a href="${p.demoUrl}" target="_blank" rel="noopener" class="btn btn-primary">
         <i class="fas fa-external-link-alt"></i> Live Demo
       </a>`
    : '';
  const privateNote = !p.demoUrl
    ? '<p class="modal-private"><i class="fas fa-lock"></i> Source code is private — contact for access.</p>'
    : '';
  body.innerHTML = `
    <img src="${p.image}" alt="${p.infoTitle}"
         onerror="if(window.generatePlaceholder)this.src=window.generatePlaceholder('${safeTitle}')">
    <div class="modal-body-content">
      ${p.featured ? '<span class="modal-featured"><i class="fas fa-star"></i> Featured Project</span>' : ''}
      <h3 id="modalTitle">${p.infoTitle}</h3>
      <p>${p.infoDesc}</p>
      <div class="tech-tags">
        ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
      ${privateNote}
      <div class="modal-actions">
        ${liveBtn}
        <button class="btn btn-outline" data-close>
          <i class="fas fa-times"></i> Close
        </button>
      </div>
    </div>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  bindModalClose();
  modal.querySelector('.modal-close')?.focus();
};

const closeProjectModal = () => {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

/* ============ TOAST & CLIPBOARD ============ */

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
  toast.className = 'toast show ' + type;
  toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4000);
}
window.showToast = showToast;

function copyToClipboard(text, successMsg = 'Copied!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => showToast(successMsg, 'success'),
      () => showToast('Could not copy', 'error')
    );
    return;
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast(successMsg, 'success');
  } catch (e) {
    showToast('Could not copy', 'error');
  }
  ta.remove();
}

/* ============ FORM VALIDATION ============ */

function attachFormValidation(form) {
  if (!form) return null;
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  const validate = (input) => {
    const err = form.querySelector(`.form-error[data-for="${input.id}"]`);
    let msg = '';
    if (!input.value.trim()) {
      msg = 'This field is required';
    } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      msg = 'Enter a valid email address';
    }
    input.classList.toggle('invalid', !!msg);
    if (err) err.textContent = msg;
    return !msg;
  };
  inputs.forEach(i => {
    i.addEventListener('input', () => validate(i));
    i.addEventListener('blur', () => validate(i));
  });
  return validate;
}

/* ============ EXPERIENCE TABS ============ */

function initExperienceTabs() {
  const tabs = document.querySelectorAll('.exp-tab');
  const panels = document.querySelectorAll('.exp-panel');
  if (!tabs.length || !panels.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panelId = 'panel-' + tab.dataset.tab;
      document.getElementById(panelId)?.classList.add('active');
      window.refreshReveals?.();
    });
  });
}

/* ============ PROJECT TOOLBAR ============ */

function initProjectToolbar() {
  const searchInput = document.getElementById('projectSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      portfolioState.search = e.target.value;
      renderPortfolioGrid();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput &&
          !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        portfolioState.search = '';
        renderPortfolioGrid();
        searchInput.blur();
      }
    });
  }

  const sortSelect = document.getElementById('projectSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      portfolioState.sort = e.target.value;
      renderPortfolioGrid();
    });
  }

  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      portfolioState.view = btn.dataset.view;
      document.querySelectorAll('[data-view]').forEach(b =>
        b.classList.toggle('active', b.dataset.view === portfolioState.view)
      );
      renderPortfolioGrid();
    });
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      portfolioState.filter = btn.dataset.filter;
      renderPortfolioGrid();
    });
  });
}

/* ============ BOOT ============ */

document.addEventListener('DOMContentLoaded', () => {
  renderSocialLinks();
  renderServices();
  renderSkillsStats();
  renderSkills();
  renderToolsChips();
  renderPortfolioFilters();
  renderPortfolioGrid();
  renderExperienceTimeline();
  renderEducationTimeline();
  renderCertCategories();
  renderCertifications();
  renderTestimonials();

  window.refreshReveals?.();
  window.refreshSkillBars?.();

  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  const closeNav = () => {
    navMenu?.classList.remove('active');
    navToggle?.classList.remove('active');
    navOverlay?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
  };

  navToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active', open);
    navOverlay.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeNav));
  navOverlay?.addEventListener('click', closeNav);

  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const metaTheme = document.getElementById('metaThemeColor');

  const setTheme = (dark) => {
    document.body.classList.toggle('dark-mode', dark);
    if (themeIcon) {
      themeIcon.classList.toggle('fa-moon', !dark);
      themeIcon.classList.toggle('fa-sun', dark);
    }
    if (metaTheme) metaTheme.setAttribute('content', dark ? '#0f172a' : '#2563eb');
    try { localStorage.setItem('wk_theme', dark ? 'dark' : 'light'); } catch (e) {}
  };

  try {
    setTheme(localStorage.getItem('wk_theme') === 'dark');
  } catch (e) {
    setTheme(false);
  }

  themeToggle?.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark-mode'));
  });

  initProjectToolbar();

  const grid = document.getElementById('portfolioGridContainer');
  grid?.addEventListener('click', e => {
    const btn = e.target.closest('[data-details]');
    if (btn) openProjectModal(btn.dataset.details);
  });

  bindModalClose();
  initExperienceTabs();

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      copyToClipboard(btn.dataset.copy, 'Email copied to clipboard!');
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1500);
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
  });

  const form = document.getElementById('contactForm');
  const validateContact = attachFormValidation(form);

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const allValid = [...form.querySelectorAll('[required]')].every(validateContact);
    if (!allValid) {
      showToast('Please fix the errors above', 'error');
      return;
    }
    const btnText = form.querySelector('.btn-text');
    const btnLoading = form.querySelector('.btn-loading');
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline-flex';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        showToast("Message sent! I'll reply soon.", 'success');
        form.reset();
      } else {
        throw new Error('Submit failed');
      }
    } catch (err) {
      showToast('Failed to send. Please try WhatsApp instead.', 'error');
    } finally {
      if (btnText) btnText.style.display = 'inline-flex';
      if (btnLoading) btnLoading.style.display = 'none';
    }
  });
});