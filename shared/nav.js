/* ==========================================================================
   NAV.JS - Glassmorphism nav, scroll progress, mobile panel
   ========================================================================== */
(function () {
  'use strict';

  /* ==========================================================================
     SCROLL PROGRESS BAR
     ========================================================================== */
  function initScrollProgress() {
    var progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuenow', '0');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.setAttribute('aria-label', 'Progreso de lectura de la página');
    document.body.appendChild(progressBar);

    var updateProgress = function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.transform = 'scaleX(' + (progress / 100) + ')';
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ==========================================================================
     NAV GLASSMORPHISM ON SCROLL
     ========================================================================== */
  function initNavGlassmorphism() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var onScroll = function () {
      var scrolled = window.scrollY > 20;
      nav.classList.toggle('scrolled', scrolled);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ==========================================================================
     MOBILE MENU PANEL
     ========================================================================== */
  function initMobileMenu() {
    var btn = document.querySelector('.menu-btn');
    var menu = document.querySelector('.menu');
    if (!btn || !menu) return;

    var menuId = menu.id || 'menu-principal';
    if (!menu.id) menu.id = menuId;

    /* Create backdrop */
    var backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);

    function toggle(open) {
      var expand = open === undefined ? !menu.classList.contains('abierto') : open;
      menu.classList.toggle('abierto', expand);
      backdrop.classList.toggle('visible', expand);
      btn.setAttribute('aria-expanded', expand ? 'true' : 'false');
      btn.setAttribute('aria-label', expand ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = expand ? 'hidden' : '';
    }

    btn.addEventListener('click', function () {
      toggle();
    });

    backdrop.addEventListener('click', function () {
      toggle(false);
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') toggle(false);
    });

    /* Handle resize - close menu if desktop */
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 768 && menu.classList.contains('abierto')) {
          toggle(false);
        }
      }, 100);
    });

    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', menuId);
  }

  /* ==========================================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var navHeight = document.querySelector('.nav')?.offsetHeight || 0;
          var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          /* Update URL without scrolling */
          history.pushState(null, '', targetId);
        }
      });
    });
  }

  /* ==========================================================================
     ACTIVE NAV ITEM ON SCROLL
     ========================================================================== */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.menu a[href^="#"]');
    if (sections.length === 0 || navLinks.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ==========================================================================
     INIT ALL
     ========================================================================== */
  function init() {
    initScrollProgress();
    initNavGlassmorphism();
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();