/* ============================================================
   effects.js — Preloader, Scroll, Typing, Reveal, Counters,
   Skill bars, Particles, Back-to-top, Nav states
   ============================================================ */

let _revealObserver = null;
let _counterObserver = null;
let _skillObserver = null;

function generatePlaceholder(text, w = 600, h = 400) {
  const safe = String(text).replace(/[<>&"']/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;'
  }[c]));
  const fs = Math.round(Math.min(w, h) / 9);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#06b6d4"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" font-family="Poppins,sans-serif" font-size="${fs}" font-weight="800"
          fill="white" text-anchor="middle" dominant-baseline="middle">${safe}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
window.generatePlaceholder = generatePlaceholder;

document.addEventListener('error', e => {
  const img = e.target;
  if (!img || img.tagName !== 'IMG' || img.dataset.fallback) return;
  img.dataset.fallback = '1';
  img.src = generatePlaceholder(img.alt || 'Image');
}, true);

function initPreloader() {
  const preloader = document.getElementById('preloader');
  const pctEl = document.getElementById('preloaderPercent');
  if (!preloader) return;
  let pct = 0, done = false;
  const tick = setInterval(() => {
    if (done) return;
    pct = Math.min(95, pct + Math.random() * 18);
    if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
  }, 120);
  const finish = () => {
    if (done) return;
    done = true;
    clearInterval(tick);
    if (pctEl) pctEl.textContent = '100%';
    setTimeout(() => preloader.classList.add('hide'), 350);
  };
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish);
  setTimeout(finish, 4000);
}

function initScrollProgress() {
  const p = document.getElementById('scrollProgress');
  if (!p) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    p.style.width = h > 0 ? (window.scrollY / h) * 100 + '%' : '0%';
  }, { passive: true });
}

function initTypingEffect() {
  const el = document.getElementById('typedText');
  if (!el || !portfolioData || !portfolioData.typedRoles) return;
  const roles = portfolioData.typedRoles;
  let r = 0, c = 0, del = false;
  (function tick() {
    const cur = roles[r];
    if (!del) {
      el.textContent = cur.slice(0, c + 1);
      c++;
      if (c === cur.length) { del = true; return setTimeout(tick, 1800); }
    } else {
      el.textContent = cur.slice(0, c - 1);
      c--;
      if (c === 0) { del = false; r = (r + 1) % roles.length; }
    }
    setTimeout(tick, del ? 45 : 90);
  })();
}

function observeReveals() {
  if (!_revealObserver) return;
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    _revealObserver.observe(el);
  });
}

function initScrollReveal() {
  _revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      _revealObserver.unobserve(e.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  observeReveals();
}
window.refreshReveals = observeReveals;

function initCounters() {
  _counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target || 0;
      const duration = 1800;
      const start = performance.now();
      (function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target) + (t === 1 ? '+' : '');
        if (t < 1) requestAnimationFrame(step);
      })(start);
      _counterObserver.unobserve(el);
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('.stat-number').forEach(el => _counterObserver.observe(el));
}

function initSkillBars() {
  if (!_skillObserver) {
    _skillObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const bar = e.target;
        requestAnimationFrame(() => {
          bar.style.width = (bar.dataset.width || 0) + '%';
        });
        _skillObserver.unobserve(bar);
      });
    }, { threshold: 0.2 });
  }
  document.querySelectorAll('.skill-progress').forEach(b => {
    if (!b.dataset.observed) {
      b.dataset.observed = '1';
      _skillObserver.observe(b);
    }
  });
}
window.refreshSkillBars = initSkillBars;

function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  const circle = document.getElementById('progressCircle');
  if (!btn) return;
  const len = 2 * Math.PI * 17;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = h > 0 ? window.scrollY / h : 0;
    btn.classList.toggle('active', window.scrollY > 400);
    if (circle) circle.style.strokeDashoffset = len * (1 - pct);
  }, { passive: true });
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  if (!sections.length) return;
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) cur = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
    });
  }, { passive: true });
}

function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, particles = [], raf = null;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    w = rect.width;
    h = rect.height;
    const count = Math.min(50, Math.floor(w / 30));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.6
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const isDark = document.body.classList.contains('dark-mode');
    const c = isDark ? 'rgba(96,165,250,' : 'rgba(37,99,235,';
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.fillStyle = c + '0.6)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.strokeStyle = c + (0.25 * (1 - d / 120)) + ')';
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    });
    raf = requestAnimationFrame(draw);
  }
  resize();
  draw();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(draw);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollProgress();
  initTypingEffect();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initNavbarScroll();
  initBackToTop();
  initActiveNav();
  initParticles();
});