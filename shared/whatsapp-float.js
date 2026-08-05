/* WhatsApp Flotante + Modal Cotización + Formspree */
(function () {
  'use strict';

  /* ===== Configuración ===== */
  var WHATSAPP_NUMBER = '573178695838';
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/QUOTE_FORM_ID'; // Reemplazar con tu Formspree ID
  var DEFAULT_MESSAGE = 'Hola, vi su web y quiero cotizar una página para mi {tipo}. Mi nombre es {nombre}, mi WhatsApp es {tel}. ¿Cuánto cuesta y en cuánto tiempo lo entrega?';

  /* ===== Utilidades ===== */
  function createElement(html) {
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild;
  }

  function getPageType() {
    var path = window.location.pathname;
    if (path.includes('demo-restaurante')) return 'Restaurante';
    if (path.includes('demo-tienda')) return 'Tienda';
    if (path.includes('demo-taller')) return 'Taller';
    if (path.includes('portafolio')) return 'Portafolio / Desarrollo Web';
    return 'Negocio';
  }

  function buildWhatsAppMessage(formData) {
    var msg = DEFAULT_MESSAGE
      .replace('{tipo}', formData.tipo || getPageType())
      .replace('{nombre}', formData.nombre || 'No proporcionado')
      .replace('{tel}', formData.whatsapp || 'No proporcionado');
    return encodeURIComponent(msg);
  }

  function openWhatsApp(message) {
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message, '_blank', 'noopener,noreferrer');
  }

  /* ===== Crear botón flotante ===== */
  function createFloatButton() {
    var btn = createElement('\n      <button class="whatsapp-float__btn" aria-label="Escríbenos por WhatsApp" aria-expanded="false" aria-controls="quote-modal">\n        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\n          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>\n        </svg>\n      </button>\n      <span class="whatsapp-float__tooltip">Escríbenos por WhatsApp</span>\n    ');
    return btn;
  }

  /* ===== Crear modal ===== */
  function createModal() {
    var pageType = getPageType();
    var modal = createElement('\n      <div class="quote-modal" id="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">\n        <div class="quote-modal__backdrop"></div>\n        <div class="quote-modal__content">\n          <div class="quote-modal__header">\n            <h2 class="quote-modal__title" id="quote-modal-title">Cotiza tu web gratis</h2>\n            <button class="quote-modal__close" aria-label="Cerrar modal">\n              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\n            </button>\n          </div>\n          <form class="quote-modal__form" id="quote-form" novalidate>\n            <input type="hidden" name="tipo" value="' + pageType + '">\n            <div class="quote-modal__field">\n              <label class="quote-modal__label" for="quote-nombre">Tu nombre *</label>\n              <input class="quote-modal__input" type="text" id="quote-nombre" name="nombre" placeholder="Juan Pérez" required autocomplete="name">\n            </div>\n            <div class="quote-modal__field">\n              <label class="quote-modal__label" for="quote-whatsapp">Tu WhatsApp *</label>\n              <input class="quote-modal__input" type="tel" id="quote-whatsapp" name="whatsapp" placeholder="+57 3XX XXX XXXX" required autocomplete="tel" pattern="[+0-9\\s-]{10,}">\n            </div>\n            <div class="quote-modal__field">\n              <label class="quote-modal__label" for="quote-tipo">Tipo de web *</label>\n              <select class="quote-modal__select" id="quote-tipo" name="tipo" required>\n                <option value="">Selecciona...</option>\n                <option value="Restaurante">Restaurante / Comida</option>\n                <option value="Tienda">Tienda / E-commerce</option>\n                <option value="Taller">Taller / Servicios</option>\n                <option value="Portafolio">Portafolio / Personal</option>\n                <option value="Otro">Otro</option>\n              </select>\n            </div>\n            <div class="quote-modal__field">\n              <label class="quote-modal__label" for="quote-mensaje">Mensaje (opcional)</label>\n              <textarea class="quote-modal__input quote-modal__textarea" id="quote-mensaje" name="mensaje" placeholder="Cuéntanos qué necesitas..."></textarea>\n            </div>\n            <button type="submit" class="quote-modal__submit">\n              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="5" y1="12" x2="19" y2="12"/></svg>\n              Enviar por WhatsApp\n            </button>\n            <p class="quote-modal__note">Se abrirá WhatsApp con tu mensaje listo para enviar. <a href="https://wa.me/' + WHATSAPP_NUMBER + '" target="_blank" rel="noopener noreferrer">Ir directo a WhatsApp</a></p>\n          </form>\n        </div>\n      </div>\n    ');
    return modal;
  }

  /* ===== Inicializar ===== */
  function init() {
    // Crear e insertar botón flotante
    var floatContainer = document.createElement('div');
    floatContainer.className = 'whatsapp-float';
    floatContainer.appendChild(createFloatButton());
    document.body.appendChild(floatContainer);

    // Crear e insertar modal
    var modal = createModal();
    document.body.appendChild(modal);

    var floatBtn = floatContainer.querySelector('.whatsapp-float__btn');
    var modalEl = modal;
    var modalBackdrop = modalEl.querySelector('.quote-modal__backdrop');
    var modalClose = modalEl.querySelector('.quote-modal__close');
    var form = modalEl.querySelector('#quote-form');

    // Abrir modal al click en botón flotante
    floatBtn.addEventListener('click', function () {
      modalEl.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // Focus first input
      setTimeout(function () {
        modalEl.querySelector('#quote-nombre').focus();
      }, 100);
    });

    // Cerrar modal
    function closeModal() {
      modalEl.classList.remove('is-open');
      document.body.style.overflow = '';
      form.reset();
    }

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalEl.classList.contains('is-open')) closeModal();
    });

    // Submit form
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(form);
      var data = {
        nombre: formData.get('nombre'),
        whatsapp: formData.get('whatsapp'),
        tipo: formData.get('tipo'),
        mensaje: formData.get('mensaje')
      };

      // Validación básica
      if (!data.nombre || !data.whatsapp || !data.tipo) return;

      // Construir mensaje WhatsApp
      var msg = buildWhatsAppMessage(data);
      if (data.mensaje) {
        msg += '%0A%0A' + encodeURIComponent('Mensaje: ' + data.mensaje);
      }

      // Enviar a Formspree (opcional, en background)
      if (FORMSPREE_ENDPOINT !== 'https://formspree.io/f/QUOTE_FORM_ID') {
        fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(function () { /* silencioso */ });
      }

      // Abrir WhatsApp
      openWhatsApp(msg);

      // Cerrar modal
      closeModal();
    });
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();