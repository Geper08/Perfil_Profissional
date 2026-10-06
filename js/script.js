/* =========================================================================
   Geovani Martins Pereira — Landing page pessoal
   JavaScript puro · sem dependências externas
   ========================================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     1. Ano atual no rodapé
     --------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  /* ---------------------------------------------------------------
     2. Topbar: fundo ao rolar + barra de progresso de leitura
     --------------------------------------------------------------- */
  var topbar = document.getElementById('topbar');
  var progress = document.getElementById('scrollProgress');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;

    if (topbar) { topbar.classList.toggle('is-stuck', y > 12); }

    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (y / max) * 100 : 0;
      progress.style.width = pct.toFixed(2) + '%';
    }
  }

  /* ---------------------------------------------------------------
     3. Menu mobile
     --------------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');

  function closeNav() {
    if (!nav || !navToggle) { return; }
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  }

  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha ao clicar em um link
    Array.prototype.forEach.call(nav.querySelectorAll('a'), function (link) {
      link.addEventListener('click', closeNav);
    });

    // Fecha com a tecla Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeNav(); }
    });

    // Fecha ao clicar fora
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) { return; }
      if (nav.contains(e.target) || navToggle.contains(e.target)) { return; }
      closeNav();
    });

    // Fecha ao redimensionar para desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) { closeNav(); }
    });
  }

  /* ---------------------------------------------------------------
     4. Animações leves ao rolar (IntersectionObserver)
     --------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealEls, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    Array.prototype.forEach.call(revealEls, function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------
     5. Link ativo no menu conforme a seção visível
     --------------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }

  if (sections.length) {
    if ('IntersectionObserver' in window) {
      var activeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { setActive(entry.target.id); }
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

      sections.forEach(function (sec) { activeObserver.observe(sec); });
    }

    // Fallback leve por posição de scroll
    window.addEventListener('scroll', function () {
      if ('IntersectionObserver' in window) { return; }
      var y = window.scrollY + window.innerHeight * 0.35;
      var current = sections[0].id;
      sections.forEach(function (sec) { if (sec.offsetTop <= y) { current = sec.id; } });
      setActive(current);
    }, { passive: true });
  }

  /* ---------------------------------------------------------------
     6. Rolagem suave com compensação da topbar
     --------------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) { return; }

    var id = link.getAttribute('href');
    if (!id || id === '#') { return; }

    var target = document.querySelector(id);
    if (!target) { return; }

    e.preventDefault();
    var offset = (topbar ? topbar.offsetHeight : 0) + 12;
    var top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: top,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  });

  /* ---------------------------------------------------------------
     7. Parallax discreto no fundo (apenas desktop)
     --------------------------------------------------------------- */
  var glow = document.querySelector('.bg-glow');
  var ticking = false;

  function parallax() {
    if (glow && window.innerWidth > 1024) {
      glow.style.transform = 'translate3d(0,' + (window.scrollY * 0.03).toFixed(2) + 'px,0)';
    }
    ticking = false;
  }

  /* ---------------------------------------------------------------
     8. Loop único de scroll (requestAnimationFrame)
     --------------------------------------------------------------- */
  window.addEventListener('scroll', function () {
    onScroll();
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(parallax);
    }
  }, { passive: true });

  window.addEventListener('resize', onScroll);

  // Estado inicial
  onScroll();
})();
