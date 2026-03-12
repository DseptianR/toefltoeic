/* ============================================================
   KENTWOOD ACADEMY — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     Hero Scroll Button
     Clicking "Telusuri ↓" smoothly scrolls to section 2
  ---------------------------------------------------------- */
  var heroScroll = document.getElementById('heroScroll');

  if (heroScroll) {
    heroScroll.addEventListener('click', function () {
      var section2 = document.getElementById('section2');
      if (section2) {
        section2.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ----------------------------------------------------------
     SCROLL ANIMATIONS (Intersection Observer)
     Trigger animations when elements enter viewport
  ---------------------------------------------------------- */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Also trigger child animations for grid containers
        if (entry.target.classList.contains('grid-section2') ||
            entry.target.classList.contains('grid-section2-bottom') ||
            entry.target.classList.contains('grid-section3-top') ||
            entry.target.classList.contains('grid-section3-bottom') ||
            entry.target.classList.contains('sertifikat-grid') ||
            entry.target.classList.contains('biaya-grid') ||
            entry.target.classList.contains('testi-grid') ||
            entry.target.classList.contains('kontak-grid')) {
          entry.target.classList.add('visible');
        }
      }
    });
  }, observerOptions);

  // Observe all animated elements including grid containers
  const animatedSelectors = [
    '.animate-on-scroll',
    '.grid-section2',
    '.grid-section2-bottom', 
    '.grid-section3-top',
    '.grid-section3-bottom',
    '.sertifikat-grid',
    '.biaya-grid',
    '.testi-grid',
    '.kontak-grid',
    '.vmt-block',
    '.cefr-card',
    '.legalitas-card',
    '.testi-cta-card',
    '.biaya-note-card',
    '.peserta-info-card',
    '.kontak-jam-card',
    '.peserta-table-wrap',
    '.jam-row'
  ];

  document.querySelectorAll(animatedSelectors.join(', ')).forEach(el => {
    observer.observe(el);
  });

  // Also observe individual cards in grids
  document.querySelectorAll('.grid-section2 > div, .grid-section2-bottom > div, .sertifikat-grid > div, .biaya-grid > div, .testi-grid > div, .kontak-grid > div').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  // Make sure all sections are visible by default as fallback
  document.querySelectorAll('#section2, #section3, footer').forEach(el => {
    el.style.opacity = '1';
  });

  /* ----------------------------------------------------------
     NAVBAR SCROLL EFFECT
     Add background on scroll for better visibility
  ---------------------------------------------------------- */
  const navbar = document.querySelector('nav');
  
  if (navbar && !navbar.classList.contains('navbar-page')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 27, 75, 0.95)';
        navbar.style.transition = 'background 0.3s ease';
      } else {
        navbar.style.background = 'transparent';
      }
    });
  }

});

/**
 * filterTable()
 * Menyaring baris tabel berdasarkan input pencarian.
 * Mencari di kolom Nama Lengkap dan Alamat.
 */
function filterTable() {
  var input  = document.getElementById('searchInput');
  var filter = input.value.toLowerCase().trim();
  var tbody  = document.getElementById('pesertaTbody');
  var rows   = tbody.getElementsByTagName('tr');
  var empty  = document.getElementById('pesertaEmpty');
  var countEl = document.getElementById('countNum');

  var visibleCount = 0;

  for (var i = 0; i < rows.length; i++) {
    var namaCell   = rows[i].getElementsByTagName('td')[1];
    var alamatCell = rows[i].getElementsByTagName('td')[2];

    if (namaCell && alamatCell) {
      var namaText   = namaCell.textContent || namaCell.innerText;
      var alamatText = alamatCell.textContent || alamatCell.innerText;
      var combined   = (namaText + ' ' + alamatText).toLowerCase();

      if (combined.indexOf(filter) > -1) {
        rows[i].style.display = '';
        visibleCount++;
      } else {
        rows[i].style.display = 'none';
      }
    }
  }

  /* Tampilkan/sembunyikan empty state */
  if (visibleCount === 0) {
    empty.style.display = 'flex';
  } else {
    empty.style.display = 'none';
  }

  /* Update jumlah peserta yang tampil */
  countEl.textContent = visibleCount;
}

/* ============================================================
   GLOBAL EDUCATION — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. HERO SCROLL BUTTON
  ---------------------------------------------------------- */
  var heroScroll = document.getElementById('heroScroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', function () {
      var section2 = document.getElementById('section2');
      if (section2) section2.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     2. NAVBAR — solid on scroll, glass effect
  ---------------------------------------------------------- */
  var navbar = document.querySelector('nav');
  if (navbar && !navbar.classList.contains('navbar-page')) {
    function updateNavbar() {
      if (window.scrollY > 60) {
        navbar.style.background    = 'rgba(13, 27, 75, 0.94)';
        navbar.style.backdropFilter       = 'blur(14px)';
        navbar.style.webkitBackdropFilter = 'blur(14px)';
        navbar.style.boxShadow    = '0 2px 28px rgba(13,27,75,0.22)';
        navbar.style.transition   = 'all 0.35s ease';
      } else {
        navbar.style.background    = 'transparent';
        navbar.style.backdropFilter       = 'none';
        navbar.style.webkitBackdropFilter = 'none';
        navbar.style.boxShadow    = 'none';
      }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  /* ----------------------------------------------------------
     3. REGISTER ANIMATION TARGETS
     We add .anim-hidden (and delay/direction classes) HERE via JS.
     This means: if JS is disabled, all content is fully visible.
     Only when JS runs do elements get the hidden-then-reveal treatment.
  ---------------------------------------------------------- */
  var animTargets = [
    /* selector,          direction class,    delay class   */
    ['.card-headteacher', 'anim-hidden',      'anim-delay-1'],
    ['.card-visit',       'anim-hidden',      'anim-delay-2'],
    ['.card-admissions-row', 'anim-hidden',   'anim-delay-3'],
    ['.card-ethos',       'anim-hidden',      'anim-delay-4'],
    ['.card-students',    'anim-hidden',      'anim-delay-5'],
    ['.s3-img-left',      'anim-from-left',   ''],
    ['.s3-text-right',    'anim-from-right',  ''],
    ['.s3-text-left',     'anim-from-left',   ''],
    ['.s3-img-right',     'anim-from-right',  ''],
  ];

  animTargets.forEach(function (item) {
    var selector  = item[0];
    var animClass = item[1];
    var delayClass = item[2];
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add(animClass);
      if (delayClass) el.classList.add(delayClass);
    });
  });

  /* ----------------------------------------------------------
     4. INTERSECTION OBSERVER — adds .is-visible on scroll
  ---------------------------------------------------------- */
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.06
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, observerOptions);

  /* Observe everything that has an animation class */
  document.querySelectorAll(
    '.anim-hidden, .anim-from-left, .anim-from-right'
  ).forEach(function (el) {
    observer.observe(el);
  });

  /* Also observe other-page elements (safe, no-op if not present) */
  var extraTargets = [
    '.vmt-block', '.legalitas-card', '.cefr-card',
    '.sert-card', '.biaya-card', '.kontak-card',
    '.testi-card', '.testi-cta-card', '.biaya-note-card',
    '.peserta-info-card', '.kontak-jam-card',
    '.peserta-table-wrap', '.jam-row'
  ];
  extraTargets.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      observer.observe(el);
    });
  });

  /* ----------------------------------------------------------
     5. PARALLAX — hero background moves slower than scroll
  ---------------------------------------------------------- */
  var heroBgImg    = document.querySelector('.hero-bg img');
  var heroSection  = document.getElementById('hero');
  if (heroBgImg && heroSection) {
    window.addEventListener('scroll', function () {
      var scrolled    = window.scrollY;
      var heroHeight  = heroSection.offsetHeight;
      if (scrolled < heroHeight) {
        /* Ken Burns is running via CSS animation.
           We layer a subtle translateY on top for parallax depth. */
        var pct = scrolled / heroHeight; // 0 → 1
        heroBgImg.style.transform = 'scale(' + (1.08 - pct * 0.08) + ') translateY(' + (scrolled * 0.22) + 'px)';
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     6. BACKWARD COMPAT — old .animate-on-scroll → .visible
  ---------------------------------------------------------- */
  var oldObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        oldObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    oldObserver.observe(el);
  });

});

/* ----------------------------------------------------------
   filterTable() — halaman peserta ujian
---------------------------------------------------------- */
function filterTable() {
  var input    = document.getElementById('searchInput');
  var filter   = input.value.toLowerCase().trim();
  var tbody    = document.getElementById('pesertaTbody');
  var rows     = tbody.getElementsByTagName('tr');
  var empty    = document.getElementById('pesertaEmpty');
  var countEl  = document.getElementById('countNum');
  var visible  = 0;

  for (var i = 0; i < rows.length; i++) {
    var namaCell   = rows[i].getElementsByTagName('td')[1];
    var alamatCell = rows[i].getElementsByTagName('td')[2];
    if (namaCell && alamatCell) {
      var text = (namaCell.textContent + ' ' + alamatCell.textContent).toLowerCase();
      if (text.indexOf(filter) > -1) {
        rows[i].style.display = '';
        visible++;
      } else {
        rows[i].style.display = 'none';
      }
    }
  }

  empty.style.display = visible === 0 ? 'flex' : 'none';
  countEl.textContent = visible;
}