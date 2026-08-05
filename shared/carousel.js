/* ==========================================================================
   CAROUSEL.JS - Testimonials manual carousel (prev/next + dots + keyboard)
   ========================================================================== */
(function () {
  'use strict';

  function initCarousel(carouselSelector) {
    var carousel = document.querySelector(carouselSelector);
    if (!carousel) return;

    var track = carousel.querySelector('.testimonials-track');
    var slides = track.querySelectorAll('.testimonial');
    var prevBtn = carousel.querySelector('.carousel-btn.prev');
    var nextBtn = carousel.querySelector('.carousel-btn.next');
    var dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dotsContainer) dotsContainer.style.display = 'none';
      return;
    }

    var currentIndex = 0;
    var slideWidth = 0;
    var slidesPerView = 1;
    var maxIndex = 0;
    var isAnimating = false;

    /* Create dots */
    function createDots() {
      dotsContainer.innerHTML = '';
      var totalDots = Math.ceil(slides.length / slidesPerView);
      for (var i = 0; i < totalDots; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Ir al testimonio ' + (i + 1));
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', function () {
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateLayout() {
      var containerWidth = track.parentElement.offsetWidth;
      var slideStyle = window.getComputedStyle(slides[0]);
      var gap = parseInt(slideStyle.marginRight) || 24;
      var slideWidthWithGap = slides[0].offsetWidth + gap;
      slidesPerView = Math.max(1, Math.floor((containerWidth + gap) / slideWidthWithGap));
      slideWidth = slides[0].offsetWidth;
      maxIndex = Math.max(0, slides.length - slidesPerView);
      
      /* Adjust track for centering if needed */
      if (slides.length <= slidesPerView) {
        track.style.justifyContent = 'center';
      } else {
        track.style.justifyContent = 'flex-start';
      }
      
      createDots();
      goToSlide(Math.min(currentIndex, maxIndex));
    }

    function goToSlide(index, animate) {
      if (isAnimating) return;
      isAnimating = true;
      
      index = Math.max(0, Math.min(index, maxIndex));
      currentIndex = index;
      
      var translateX = -index * (slideWidth + 24);
      track.style.transform = 'translateX(' + translateX + 'px)';
      
      /* Update dots */
      var dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
      
      /* Update buttons */
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index >= maxIndex;
      
      setTimeout(function () {
        isAnimating = false;
      }, 400);
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    /* Event listeners */
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }

    /* Keyboard navigation */
    document.addEventListener('keydown', function (e) {
      if (e.target.closest(carouselSelector)) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        }
      }
    });

    /* Touch/swipe support */
    var touchStartX = 0;
    var touchStartTime = 0;
    
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      var touchEndX = e.changedTouches[0].clientX;
      var deltaX = touchStartX - touchEndX;
      var deltaTime = Date.now() - touchStartTime;
      
      if (Math.abs(deltaX) > 50 && deltaTime < 300) {
        if (deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }, { passive: true });

    /* Resize handler */
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var wasAtEnd = currentIndex >= maxIndex;
        layout = updateLayout();
        if (wasAtEnd) {
          goToSlide(maxIndex);
        }
      }, 100);
    });

    /* Initial setup */
    var layout = updateLayout();

    /* Auto-update dots on slide change (for manual navigation) */
    var observer = new MutationObserver(function () {
      var activeDot = dotsContainer.querySelector('.carousel-dot.active');
      if (activeDot) {
        var index = parseInt(activeDot.getAttribute('aria-label').match(/\d+/)[0], 10) - 1;
        if (index !== currentIndex && index <= maxIndex) {
          currentIndex = index;
        }
      }
    });
    observer.observe(dotsContainer, { attributes: true, attributeFilter: ['class'] });
  }

  /* ==========================================================================
     INIT ALL CAROUSELS
     ========================================================================== */
  function initAllCarousels() {
    var carousels = document.querySelectorAll('.testimonials-carousel');
    carousels.forEach(function (carousel) {
      initCarousel(carousel);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCarousels);
  } else {
    initAllCarousels();
  }
})();