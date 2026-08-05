/* Menú móvil reutilizable + nav scroll shadow */
(function () {
  'use strict';

  /* ===== Nav scroll shadow ===== */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===== Menú móvil ===== */
  var btn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.menu');
  if (!btn || !menu) return;

  var menuId = menu.id || 'menu-principal';
  if (!menu.id) menu.id = menuId;

  function toggle(open) {
    var expand = open === undefined ? !menu.classList.contains('abierto') : open;
    menu.classList.toggle('abierto', expand);
    btn.setAttribute('aria-expanded', expand ? 'true' : 'false');
    btn.setAttribute('aria-label', expand ? 'Cerrar menú' : 'Abrir menú');
  }

  btn.addEventListener('click', function () {
    toggle();
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle(false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') toggle(false);
  });

  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', menuId);
})();