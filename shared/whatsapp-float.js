/* ==========================================================================
   WHATSAPP FLOAT PREMIUM - Expandable button, pulse rings, premium modal
   ========================================================================== */
(function () {
  'use strict';

  /* ==========================================================================
     CONFIGURATION
     ========================================================================== */
  var WHATSAPP_NUMBER = '573178695838';
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/QUOTE_FORM_ID'; // Reemplazar con tu Formspree ID
  var DEFAULT_MESSAGE = 'Hola, vi su web y quiero cotizar una página para mi {tipo}. Mi nombre es {nombre}, mi WhatsApp es {tel}. ¿Cuánto cuesta y en cuánto tiempo lo entrega?';

  /* ==========================================================================
     UTILITIES
     ========================================================================== */
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

  function validateField(input) {
    var value = input.value.trim();
    var errorEl = input.parentNode.querySelector('.quote-modal__error');
    
    if (input.required && !value) {
      input.classList.add('error');
      if (errorEl) errorEl.classList.add('visible');
      return false;
    }
    
    if (input.type === 'tel' && value) {
      var phoneRegex = /^[\+]?[0-9\s\-]{10,}$/;
      if (!phoneRegex.test(value)) {
        input.classList.add('error');
        if (errorEl) {
          errorEl.textContent = 'Ingresa un WhatsApp válido';
          errorEl.classList.add('visible');
        }
        return false;
      }
    }
    
    input.classList.remove('error');
    if (errorEl) errorEl.classList.remove('visible');
    return true;
  }

  function clearFieldError(input) {
    input.classList.remove('error');
    var errorEl = input.parentNode.querySelector('.quote-modal__error');
    if (errorEl) errorEl.classList.remove('visible');
  }

  /* ==========================================================================
     CREATE FLOAT BUTTON
     ========================================================================== */
  function createFloatButton() {
    var btn = createElement('\n      <button class="whatsapp-float__btn" aria-label="Escríbenos por WhatsApp" aria-expanded="false" aria-controls="quote-modal">\n        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\n          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>\n        </svg>\n      </button>\n      <span class="whatsapp-float__label">Escríbenos por WhatsApp</span>\n    ');
    return btn;
  }

  /* ==========================================================================
     CREATE MODAL PREMIUM
     ========================================================================== */
  function createModal() {
    var pageType = getPageType();
    var modal = createElement('\n      <div class="quote-modal" id="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">\n        <div class="quote-modal__backdrop"></div>\n        <div class="quote-modal__content">\n          <div class="quote-modal__header">\n            <h2 class="quote-modal__title" id="quote-modal-title">Cotiza tu web gratis</h2>\n            <button class="quote-modal__close" aria-label="Cerrar modal">\n              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\n            </button>\n          </div>\n          <form class="quote-modal__form" id="quote-form" novalidate>\n            <input type="hidden" name="tipo" value="' + getPageType() + '">\n            <div class="quote-modal__field">\n              <label class="quote-modal__label" for="quote-nombre">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\n                Tu nombre *\n              </label>\n              <input class="quote-modal__input" type="text" id="quote-nombre" name="nombre" placeholder="Juan Pérez" required autocomplete="name">\n              <div class="quote-modal__error"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Nombre requerido</div>\n            </div>\n            <div class="quote-modal__field">\n              <label class="quote-modal__label" for="quote-whatsapp">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>\n                Tu WhatsApp *\n              </label>\n              <input class="quote-modal__input" type="tel" id="quote-whatsapp" name="whatsapp" placeholder="+57 3XX XXX XXXX" required autocomplete="tel" pattern="[+0-9\\s-]{10,}">\n              <div class="quote-modal__error"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> WhatsApp requerido</div>\n            </div>\n            <div class="quote-modal__field">\n              <label class="quote-modal__label" for="quote-tipo">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>\n                Tipo de web *\n              </label>\n              <select class="quote-modal__select" id="quote-tipo" name="tipo" required>\n                <option value="">Selecciona...</option>\n                <option value="Restaurante">Restaurante / Comida</option>\n                <option value="Tienda">Tienda / E-commerce</option>\n                <option value="Taller">Taller / Servicios</option>\n                <option value="Portafolio">Portafolio / Personal</option>\n                <option value="Corporativa">Web corporativa</option>\n                <option value="E-commerce">E-commerce</option>\n                <option value="Sistema">Sistema a medida</option>\n                <option value="Otro">Otro</option>\n              </select>\n              <div class="quote-modal__error"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Selecciona un tipo</div>\n            </div>\n            <div class="quote-modal__field">\n              <label class="quote-modal__label" for="quote-mensaje">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>\n                Mensaje (opcional)\n              </label>\n              <textarea class="quote-modal__input quote-modal__textarea" id="quote-mensaje" name="mensaje" placeholder="Cuéntanos qué necesitas..."></textarea>\n            </div>\n            <button type="submit" class="quote-modal__submit">\n              <span class="btn-text">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="5" y1="12" x2="19" y2="12"/></svg>\n                Enviar por WhatsApp\n              </span>\n              <span class="spinner"></span>\n            </button>\n            <p class="quote-modal__note">Se abrirá WhatsApp con tu mensaje listo para enviar. <a href="https://wa.me/' + '573178695838' + '" target="_blank" rel="noopener noreferrer">Ir directo a WhatsApp</a></p>\n          </form>\n          <!-- Success state -->\n          <div class="quote-modal__success">\n            <div class="quote-modal__success-icon">\n              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>\n            </div>\n            <h3>¡Mensaje enviado!</h3>\n            <p>Se abrió WhatsApp con tu cotización lista para enviar.</p>\n            <button type="button" class="btn btn-brand btn-sm quote-modal__close-success">Cerrar</button>\n          </div>\n        </div>\n      </div>\n    ');
    return modal;
  }

  /* ==========================================================================
     INITIALIZE
     ========================================================================== */
  function init() {
    /* Create and insert float button */
    var floatContainer = document.createElement('div');
    floatContainer.className = 'whatsapp-float';
    floatContainer.appendChild(createFloatButton());
    document.body.appendChild(floatContainer);

    /* Create and insert modal */
    var modal = createModal();
    document.body.appendChild(modal);

    var floatBtn = floatContainer.querySelector('.whatsapp-float__btn');
    var modalEl = modal;
    var modalBackdrop = modalEl.querySelector('.quote-modal__backdrop');
    var modalClose = modalEl.querySelector('.quote-modal__close');
    var form = modalEl.querySelector('#quote-form');
    var successClose = modalEl.querySelector('.quote-modal__close-success');

    /* ===== Float button click ===== */
    floatBtn.addEventListener('click', function () {
      modalEl.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(function () {
        modalEl.querySelector('#quote-nombre').focus();
      }, 150);
    });

    /* ===== Close modal ===== */
    function closeModal() {
      modalEl.classList.remove('is-open');
      document.body.style.overflow = '';
      form.reset();
      form.querySelectorAll('.quote-modal__input, .quote-modal__select').forEach(function (el) {
        el.classList.remove('error');
      });
      form.querySelectorAll('.quote-modal__error').forEach(function (el) {
        el.classList.remove('visible');
      });
      /* Hide success state */
      var successEl = modalEl.querySelector('.quote-modal__success');
      if (successEl) successEl.classList.remove('visible');
      /* Show form again */
      var formEl = modalEl.querySelector('#quote-form');
      if (formEl) formEl.style.display = 'flex';
      var headerEl = modalEl.querySelector('.quote-modal__header');
      if (headerEl) headerEl.style.display = 'flex';
    }

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    if (successClose) {
      successClose.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalEl.classList.contains('is-open')) closeModal();
    });

    /* ===== Field validation on blur ===== */
    form.querySelectorAll('.quote-modal__input, .quote-modal__select').forEach(function (input) {
      input.addEventListener('blur', function () {
        validateField(this);
      });
      input.addEventListener('input', function () {
        clearFieldError(this);
      });
      input.addEventListener('change', function () {
        clearFieldError(this);
      });
    });

    /* ===== Submit form ===== */
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var inputs = form.querySelectorAll('.quote-modal__input[required], .quote-modal__select[required]');
      var allValid = true;
      
      inputs.forEach(function (input) {
        if (!validateField(input)) allValid = false;
      });

      if (!allValid) return;

      var formData = new FormData(form);
      var data = {
        nombre: formData.get('nombre'),
        whatsapp: formData.get('whatsapp'),
        tipo: formData.get('tipo'),
        mensaje: formData.get('mensaje')
      };

      /* Show loading state */
      var submitBtn = form.querySelector('.quote-modal__submit');
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      /* Build WhatsApp message */
      var msg = DEFAULT_MESSAGE
        .replace('{tipo}', data.tipo || getPageType())
        .replace('{nombre}', data.nombre || 'No proporcionado')
        .replace('{tel}', data.whatsapp || 'No proporcionado');
      if (data.mensaje) {
        msg += '%0A%0A' + encodeURIComponent('Mensaje: ' + data.mensaje);
      }

      /* Send to Formspree (background) */
      var formspreePromise = Promise.resolve();
      if (FORMSPREE_ENDPOINT !== 'https://formspree.io/f/QUOTE_FORM_ID') {
        formspreePromise = fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(function () { /* silent */ });
      }

      /* Open WhatsApp and show success */
      formspreePromise.then(function () {
        var msgEncoded = DEFAULT_MESSAGE
          .replace('{tipo}', data.tipo || getPageType())
          .replace('{nombre}', data.nombre || 'No proporcionado')
          .replace('{tel}', data.whatsapp || 'No proporcionado');
        if (data.mensaje) {
          msgEncoded += '%0A%0A' + encodeURIComponent('Mensaje: ' + data.mensaje);
        }
        
        window.open('https://wa.me/' + '573178695838' + '?text=' + msgEncoded, '_blank', 'noopener,noreferrer');
        
        /* Show success state */
        form.style.display = 'none';
        var headerEl = modalEl.querySelector('.quote-modal__header');
        if (headerEl) headerEl.style.display = 'none';
        var successEl = modalEl.querySelector('.quote-modal__success');
        if (successEl) successEl.classList.add('visible');
      }).catch(function () {
        /* Even if Formspree fails, open WhatsApp */
        var msgEncoded = DEFAULT_MESSAGE
          .replace('{tipo}', data.tipo || getPageType())
          .replace('{nombre}', data.nombre || 'No proporcionado')
          .replace('{tel}', data.whatsapp || 'No proporcionado');
        if (data.mensaje) {
          msgEncoded += '%0A%0A' + encodeURIComponent('Mensaje: ' + data.mensaje);
        }
        window.open('https://wa.me/' + '573178695838' + '?text=' + msgEncoded, '_blank', 'noopener,noreferrer');
        
        form.style.display = 'none';
        var headerEl = modalEl.querySelector('.quote-modal__header');
        if (headerEl) headerEl.style.display = 'none';
        var successEl = modalEl.querySelector('.quote-modal__success');
        if (successEl) successEl.classList.add('visible');
      }).finally(function () {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      });
    });

    /* ===== Success close button ===== */
    var successClose = modalEl.querySelector('.quote-modal__close-success');
    if (successClose) {
      successClose.addEventListener('click', closeModal);
    }
  }

  /* ===== Run on DOM ready ===== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();