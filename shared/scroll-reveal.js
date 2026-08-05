/* ==========================================================================
   SCROLL-REVEAL.JS - IntersectionObserver reveal animations
   Solo para: hero, cards, stats
   ========================================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  /* ==========================================================================
     CONFIGURATION
     ========================================================================== */
  var SELECTORS = {
    hero: '.hero-content, .hero-visual, .hero-badge, .hero h1, .hero p, .hero-actions, .hero-stats',
    cards: '.card',
    stats: '.stat-item',
    testimonial: '.testimonial',
    secHeader: '.sec-header',
    footer: '.footer-brand, .footer-links, .footer-contact'
  };

  var THRESHOLDS = {
    hero: 0,
    cards: 0.1,
    stats: 0.15,
    testimonial: 0.1,
    secHeader: 0.1,
    footer: 0.1
  };

  var ROOT_MARGINS = {
    hero: '0px 0px -10% 0px',
    cards: '0px 0px -10% 0px',
    stats: '0px 0px -20% 0px',
    testimonial: '0px 0px -10% 0px',
    secHeader: '0px 0px -20% 0px',
    footer: '0px 0px -10% 0px'
  };

  /* ==========================================================================
     REVEAL FUNCTION
     ========================================================================== */
  function revealElements(elements, type) {
    if (!elements.length) return;
    
    var delay = 0;
    var staggerDelay = type === 'cards' ? 100 : (type === 'stats' ? 80 : 120);
    
    elements.forEach(function (el, index) {
      var computedStyle = window.getComputedStyle(el);
      var transform = computedStyle.transform;
      var opacity = computedStyle.opacity;
      
      /* Set initial state if not already set */
      if (opacity === '1' && transform === 'none') {
        el.style.opacity = '0';
        if (type === 'hero') {
          el.style.transform = 'translateY(30px)';
        } else if (type === 'stats') {
          el.style.transform = 'translateY(20px) scale(0.95)';
        } else {
          el.style.transform = 'translateY(30px)';
        }
        el.style.transition = 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
      
      var delayMs = delay + (index * staggerDelay);
      
      setTimeout(function () {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, delayMs);
    });
    
    delay += elements.length * staggerDelay;
  }

  /* ==========================================================================
     INTERSECTION OBSERVER SETUP
     ========================================================================== */
  function createObserver(type) {
    var selector = SELECTORS[type];
    var threshold = THRESHOLDS[type];
    var rootMargin = ROOT_MARGINS[type];
    
    if (!selector) return null;
    
    return new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var elements = entry.target.querySelectorAll(SELECTORS[type]) || [entry.target];
          revealElements(Array.from(elements), type);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: threshold,
      rootMargin: rootMargin
    });
  }

  /* ==========================================================================
     INIT OBSERVERS
     ========================================================================== */
  function initObservers() {
    var observerTypes = ['hero', 'cards', 'stats', 'testimonial', 'secHeader', 'footer'];
    
    observerTypes.forEach(function (type) {
      var observer = createObserver(type);
      if (!observer) return;
      
      var targets = document.querySelectorAll(SELECTORS[type].split(',')[0].trim());
      
      /* For hero, observe the hero section */
      if (type === 'hero') {
        var hero = document.querySelector('.hero');
        if (hero) observer.observe(hero);
      } else if (type === 'cards') {
        var cardsSections = document.querySelectorAll('.cards');
        cardsSections.forEach(function (section) {
          observer.observe(section);
        });
      } else if (type === 'stats') {
        var statsBars = document.querySelectorAll('.stats-bar');
        statsBars.forEach(function (bar) {
          observer.observe(bar);
        });
      } else if (type === 'testimonial') {
        var testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach(function (t) {
          observer.observe(t);
        });
      } else if (type === 'secHeader') {
        var headers = document.querySelectorAll('.sec-header');
        headers.forEach(function (h) {
          observer.observe(h);
        });
      } else if (type === 'footer') {
        var footer = document.querySelector('.footer');
        if (footer) observer.observe(footer);
      }
    });
  }

  /* ==========================================================================
     COUNTER ANIMATION FOR STATS
     ========================================================================== */
  function initCounterAnimation() {
    var statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target') || el.textContent.replace(/[^\d]/g, ''), 10);
          var duration = 2000;
          var start = 0;
          var startTime = null;
          
          function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            var progress = Math.min((currentTime - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            var current = Math.floor(eased * target);
            el.textContent = current.toLocaleString();
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = target.toLocaleString();
            }
          }
          
          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -20% 0px'
    });

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  /* ==========================================================================
     INIT ALL
     ========================================================================== */
  function init() {
    initObservers();
    initCounterAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();