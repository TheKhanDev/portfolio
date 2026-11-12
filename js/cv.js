/* ============================================================
   cv.js — CV page rendering & interactions
   ============================================================ */

/* ---------- Preloader ---------- */
function cvPreloader() {
  const p = document.getElementById('preloader');
  const pct = document.getElementById('preloaderPercent');
  if (!p) return;
  let v = 0, done = false;
  const t = setInterval(() => {
    if (done) return;
    v = Math.min(95, v + Math.random() * 20);
    if (pct) pct.textContent = Math.floor(v) + '%';
  }, 120);
  const fin = () => {
    if (done) return;
    done = true;
    clearInterval(t);
    if (pct) pct.textContent = '100%';
    setTimeout(() => p.classList.add('hide'), 250);
  };
  if (document.readyState === 'complete') fin();
  else window.addEventListener('load', fin);
  setTimeout(fin, 3000);
}

/* ---------- Scroll progress ---------- */
function cvScrollProgress() {
  const p = document.getElementById('scrollProgress');
  if (!p) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    p.style.width = h > 0 ? (window.scrollY / h) * 100 + '%' : '0%';
  }, { passive: true });
}

/* ---------- Reveal ---------- */
function cvReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---------- Navbar scrolled ---------- */
function cvNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ---------- Back to top ---------- */
function cvBackToTop() {
  const btn = document.getElementById('cvTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('active', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Theme ---------- */
function cvTheme() {
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const meta = document.getElementById('metaThemeColor');

  const setTheme = (dark) => {
    document.body.classList.toggle('dark-mode', dark);
    if (icon) {
      icon.classList.toggle('fa-moon', !dark);
      icon.classList.toggle('fa-sun', dark);
    }
    if (meta) meta.setAttribute('content', dark ? '#0f172a' : '#2563eb');
    try { localStorage.setItem('wk_theme', dark ? 'dark' : 'light'); } catch (e) {}
  };
  try { setTheme(localStorage.getItem('wk_theme') === 'dark'); } catch (e) { setTheme(false); }
  toggle?.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark-mode'));
  });
}

/* ---------- Placeholder fallback ---------- */
function cvPlaceholder(text, w = 400, h = 400) {
  const safe = String(text).replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#06b6d4"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" font-family="Poppins,sans-serif" font-size="80" font-weight="900"
          fill="white" text-anchor="middle" dominant-baseline="middle">${safe}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/* ---------- Render: Header ---------- */
function renderCVHeader() {
  const el = document.getElementById('cvHeader');
  if (!el) return;
  const h = cvData.header;
  
  // Format contact pills
  const contacts = h.contacts.map(c => `
    <a href="${c.href}" target="${c.href.startsWith('http') ? '_blank' : '_self'}" rel="noopener">
      <i class="${c.icon}"></i> <span>${c.label}</span>
    </a>`).join('');

  el.innerHTML = `
    <div class="cv-photo">
      <img src="${h.photo}" alt="${h.name}" onerror="this.src='${cvPlaceholder('WK')}'">
    </div>
    <div class="cv-header-info">
      <h1>${h.name}</h1>
      <p class="cv-title">${h.title}</p>
      <p class="cv-tagline">${h.tagline}</p>
      <div class="cv-contact">${contacts}</div>
    </div>`;
}

/* ---------- Render: Summary ---------- */
function renderCVSummary() {
  const el = document.getElementById('cvSummary');
  if (!el) return;
  el.innerHTML = cvData.summary.map(p => `<p>${p}</p>`).join('');
}

/* ---------- Render: Competencies ---------- */
function renderCVCompetencies() {
  const el = document.getElementById('cvCompetencies');
  if (!el) return;
  el.innerHTML = cvData.competencies.map(c => `
    <div class="competency-row">
      <div class="competency-label">${c.label}</div>
      <div class="competency-values">${c.values}</div>
    </div>`).join('');
}

/* ---------- Render: Experience ---------- */
function renderCVExperience() {
  const el = document.getElementById('cvExperience');
  if (!el) return;
  el.innerHTML = cvData.experience.map(j => `
    <div class="cv-job">
      <div class="cv-job-head">
        <span class="cv-job-role">${j.role}</span>
        <span class="cv-job-date">${j.date}</span>
      </div>
      <p class="cv-job-meta"><strong>${j.company}</strong> · ${j.location}</p>
      <ul>${j.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>`).join('');
}

/* ---------- Render: Projects ---------- */
function renderCVProjects() {
  const el = document.getElementById('cvProjects');
  if (!el) return;
  el.innerHTML = cvData.projects.map(p => {
    const links = [];
    if (p.liveUrl) {
      links.push(`<a href="${p.liveUrl}" target="_blank" rel="noopener" class="link-live">
        <i class="fas fa-external-link-alt"></i> Live Demo
      </a>`);
    }
    if (p.githubUrl) {
      links.push(`<a href="${p.githubUrl}" target="_blank" rel="noopener" class="link-source">
        <i class="fab fa-github"></i> Source
      </a>`);
    }
    return `
    <div class="cv-project ${p.featured ? 'featured' : ''}">
      <h3 class="cv-project-title">${p.title}</h3>
      <p class="cv-project-desc">${p.description}</p>
      <div class="cv-project-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="cv-project-links">${links.join('')}</div>
    </div>`;
  }).join('');
}

/* ---------- Render: Education ---------- */
function renderCVEducation() {
  const el = document.getElementById('cvEducation');
  if (!el) return;
  el.innerHTML = cvData.education.map(e => `
    <div class="cv-edu-item">
      <div class="cv-edu-head">
        <span class="cv-edu-title">${e.title}</span>
        <span class="cv-edu-date">${e.date}</span>
      </div>
      <p class="cv-edu-meta">${e.institution}</p>
      ${e.note ? `<p class="cv-edu-note">${e.note}</p>` : ''}
    </div>`).join('');
}

/* ---------- Render: Certifications ---------- */
function renderCVCerts() {
  const el = document.getElementById('cvCerts');
  if (!el) return;
  el.innerHTML = cvData.certifications.map(g => `
    <div class="cv-cert-group ${g.variant}">
      <div class="cv-cert-group-title">
        <i class="${g.icon}"></i> ${g.title}
      </div>
      <ul class="cv-cert-list">
        ${g.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>`).join('');
}

/* ---------- Render: Footer ---------- */
function renderCVFooter() {
  const el = document.getElementById('cvFooter');
  if (!el) return;
  el.innerHTML = `
    <p>${cvData.footer.text}</p>
    <p style="margin-top:0.4rem;">📧 <strong>${cvData.footer.contact}</strong></p>
    <div class="cv-actions">
      <a href="index.html" class="btn btn-primary">
        <i class="fas fa-arrow-left"></i> Back to Portfolio
      </a>
      <button class="btn btn-secondary" onclick="window.print()">
        <i class="fas fa-print"></i> Save as PDF
      </button>
    </div>`;
}

/* ---------- Print button ---------- */
function bindPrintButton() {
  document.getElementById('printCV')?.addEventListener('click', () => window.print());
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  cvPreloader();
  cvScrollProgress();
  cvTheme();
  cvNavScroll();
  cvBackToTop();
  bindPrintButton();

  renderCVHeader();
  renderCVSummary();
  renderCVCompetencies();
  renderCVExperience();
  renderCVProjects();
  renderCVEducation();
  renderCVCerts();
  renderCVFooter();

  cvReveal();
});