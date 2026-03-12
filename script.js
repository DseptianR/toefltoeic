/* ============================================================
   GLOBAL EDUCATION — script.js  v2
   Modern Animation System + All Functionality
   ============================================================ */

'use strict';

/* ============================================================
   1. SCROLL PROGRESS BAR
   ============================================================ */
(function initProgressBar() {
  var bar = document.createElement('div');
  bar.id = 'scrollProgressBar';
  document.body.appendChild(bar);
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    var total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }, { passive: true });
})();

/* ============================================================
   2. HERO SCROLL BUTTON
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var heroScroll = document.getElementById('heroScroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', function () {
      var s2 = document.getElementById('section2');
      if (s2) s2.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

/* ============================================================
   3. NAVBAR — glass on scroll
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.querySelector('nav');
  if (!navbar) return;
  var isPageNav = navbar.classList.contains('navbar-page');
  function updateNav() {
    if (!isPageNav) {
      if (window.scrollY > 60) {
        navbar.style.background           = 'rgba(13,27,75,0.94)';
        navbar.style.backdropFilter       = 'blur(16px)';
        navbar.style.webkitBackdropFilter = 'blur(16px)';
        navbar.style.boxShadow            = '0 2px 32px rgba(13,27,75,0.24)';
      } else {
        navbar.style.background           = 'transparent';
        navbar.style.backdropFilter       = 'none';
        navbar.style.webkitBackdropFilter = 'none';
        navbar.style.boxShadow            = 'none';
      }
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
});

/* ============================================================
   4. SCROLL-REVEAL SYSTEM
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  var revealMap = [
    ['.card-headteacher',      'rv-left',  false],
    ['.card-visit',            'rv-right', false],
    ['.card-admissions-row',   'rv-up',    false],
    ['.card-ethos',            'rv-left',  false],
    ['.card-students',         'rv-right', false],
    ['.s3-img-left',           'rv-left',  false],
    ['.s3-text-right',         'rv-right', false],
    ['.s3-text-left',          'rv-left',  false],
    ['.s3-img-right',          'rv-right', false],
    ['.tentang-selayang h2',   'rv-up',    false],
    ['.tentang-selayang p',    'rv-up',    false],
    ['.prog-intro h2',         'rv-up',    false],
    ['.prog-intro p',          'rv-up',    false],
    ['.testi-intro h2',        'rv-up',    false],
    ['.testi-intro p',         'rv-up',    false],
    ['.kontak-intro h2',       'rv-up',    false],
    ['.kontak-intro p',        'rv-up',    false],
    ['.peserta-intro h2',      'rv-up',    false],
    ['.peserta-intro p',       'rv-up',    false],
    ['.biaya-section-header h2','rv-up',   false],
    ['.biaya-section-header p', 'rv-up',   false],
    ['.section-title-group',   'rv-fade',  false],
    ['.vmt-block',             'rv-up',    true],
    ['.legalitas-card',        'rv-scale', false],
    ['.cefr-card',             'rv-scale', false],
    ['.biaya-note-card',       'rv-scale', false],
    ['.testi-cta-card',        'rv-scale', false],
    ['.peserta-info-card',     'rv-scale', false],
    ['.kontak-jam-card',       'rv-scale', false],
    ['.sert-card',             'rv-up',    true],
    ['.biaya-card',            'rv-up',    true],
    ['.testi-card',            'rv-up',    true],
    ['.kontak-card',           'rv-up',    true],
    ['.peserta-table-wrap',    'rv-up',    false],
    ['.peserta-toolbar',       'rv-fade',  false],
    ['.jam-row',               'rv-up',    true],
    ['.footer-brand',          'rv-left',  false],
    ['.footer-col',            'rv-up',    true],
  ];

  var delays = ['rv-delay-1','rv-delay-2','rv-delay-3','rv-delay-4','rv-delay-5','rv-delay-6'];
  var staggerMap = new Map();

  revealMap.forEach(function (item) {
    document.querySelectorAll(item[0]).forEach(function (el) {
      if (el.dataset.rvSet) return;
      el.dataset.rvSet = '1';
      el.classList.add(item[1]);
      if (item[2]) {
        var p = el.parentElement;
        if (!staggerMap.has(p)) staggerMap.set(p, 0);
        var n = staggerMap.get(p);
        el.classList.add(delays[n % delays.length]);
        staggerMap.set(p, n + 1);
      }
    });
  });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('rv-show');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.06 });

  document.querySelectorAll('.rv-up,.rv-left,.rv-right,.rv-scale,.rv-fade').forEach(function (el) {
    obs.observe(el);
  });

  /* backward compat */
  var oldObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); oldObs.unobserve(e.target); }});
  }, { threshold: 0.05 });
  document.querySelectorAll('.animate-on-scroll').forEach(function (el) { oldObs.observe(el); });

  /* section-title-group line width reveal */
  var lineObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('rv-show'); lineObs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.section-title-group').forEach(function (el) { lineObs.observe(el); });
});

/* ============================================================
   5. PARALLAX
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var bgImg  = document.querySelector('.hero-bg img');
  var heroEl = document.getElementById('hero');
  if (!bgImg || !heroEl) return;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    var h = heroEl.offsetHeight;
    if (y < h) {
      var p = y / h;
      bgImg.style.transform =
        'scale(' + (1.12 - p * 0.12) + ') translate(' + (-8 * p) + 'px,' + (-4 * p + y * 0.18) + 'px)';
    }
  }, { passive: true });
});

/* ============================================================
   6. HAMBURGER MENU
   ============================================================ */
function closeNav() {
  var o = document.getElementById('navMobileOverlay');
  var b = document.getElementById('navHamburger');
  if (o) o.classList.remove('open');
  if (b) b.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {
  var hbg     = document.getElementById('navHamburger');
  var overlay = document.getElementById('navMobileOverlay');
  var closeB  = document.getElementById('navMobileClose');
  if (hbg && overlay) {
    hbg.addEventListener('click', function () {
      var open = overlay.classList.toggle('open');
      hbg.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  if (closeB) closeB.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
});

/* ============================================================
   7. PESERTA TABLE FILTER
   ============================================================ */
function filterTable() {
  var input   = document.getElementById('searchInput');
  if (!input) return;
  var filter  = input.value.toLowerCase().trim();
  var tbody   = document.getElementById('pesertaTbody');
  var rows    = tbody ? tbody.getElementsByTagName('tr') : [];
  var empty   = document.getElementById('pesertaEmpty');
  var countEl = document.getElementById('countNum');
  var visible = 0;
  for (var i = 0; i < rows.length; i++) {
    var c1 = rows[i].getElementsByTagName('td')[1];
    var c2 = rows[i].getElementsByTagName('td')[2];
    if (c1 && c2) {
      var match = (c1.textContent + ' ' + c2.textContent).toLowerCase().indexOf(filter) > -1;
      rows[i].style.display = match ? '' : 'none';
      if (match) visible++;
    }
  }
  if (empty)   empty.style.display = visible === 0 ? 'flex' : 'none';
  if (countEl) countEl.textContent = visible;
}