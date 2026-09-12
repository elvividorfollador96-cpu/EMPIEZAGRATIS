/**
 * OFM TOP — main.js
 *
 * JavaScript mínimo, sin dependencias:
 *  1. UTM: lee utm_source/medium/campaign/content/term de la URL,
 *     los persiste en sessionStorage (no son datos personales) y los
 *     añade a los enlaces internos para no perder atribución al navegar.
 *     `window.OFTOP.utm` queda disponible para integrar un CRM/analytics.
 *  2. Menú móvil (accesible: focus, Escape, aria-expanded).
 *  3. Animaciones de aparición (respeta prefers-reduced-motion).
 *  4. Fallback del logo remoto (monograma si la imagen no carga).
 *  5. Estado del header al hacer scroll + año dinámico en el footer.
 */
(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ *
   * 1. UTM                                                              *
   * ------------------------------------------------------------------ */
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const STORE_KEY = 'ofmtop.utm.v1';

  const readUtm = () => {
    const params = new URLSearchParams(location.search);
    const utm = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm[key] = value.slice(0, 200);
    }
    return utm;
  };

  let stored = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORE_KEY) || '{}') || {};
  } catch {
    stored = {};
  }

  const current = readUtm();
  const utm = Object.assign({}, stored, current);

  if (Object.keys(current).length > 0) {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(utm));
    } catch {
      /* almacenamiento no disponible: seguimos sin persistencia */
    }
  }

  // Superficie pública para integrar CRM/analytics más adelante.
  window.OFTOP = Object.freeze({ utm: Object.freeze(utm) });

  const isInternalHref = (href) => {
    if (typeof href !== 'string' || href.length === 0) return false;
    if (href.startsWith('javascript:')) return false;
    if (href.startsWith('//')) return false;
    if (/^https?:\/\//i.test(href)) {
      try {
        return new URL(href).origin === location.origin;
      } catch {
        return false;
      }
    }
    return true; // relativo, "#ancla" o absoluto "/ruta"
  };

  const withUtm = (href) => {
    try {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return null;
      let changed = false;
      for (const [key, value] of Object.entries(utm)) {
        if (value && !url.searchParams.has(key)) {
          url.searchParams.set(key, value);
          changed = true;
        }
      }
      return { changed, pathname: url.pathname, search: url.search, hash: url.hash };
    } catch {
      return null;
    }
  };

  document.addEventListener('click', (event) => {
    const anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!anchor || event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

    if (anchor.hasAttribute('data-form-link') || anchor.hasAttribute('data-form-choice')) return;
    const href = anchor.getAttribute('href');
    if (!isInternalHref(href)) return;

    const resolved = withUtm(href);
    if (!resolved) return;

    // ¿Mismo documento? (misma ruta + misma query): solo cambia el ancla.
    // Hacemos scroll suave sin recargar; los UTM ya están persistidos.
    const sameDoc =
      resolved.pathname === location.pathname && resolved.search === location.search;
    if (sameDoc && resolved.hash) {
      event.preventDefault();
      const target = document.querySelector(resolved.hash);
      if (target) {
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', resolved.pathname + resolved.search + resolved.hash);
      }
      return;
    }

    if (resolved.changed) {
      anchor.href = resolved.pathname + resolved.search + resolved.hash;
    }
  });

  /* ------------------------------------------------------------------ *
   * 2. Menú móvil                                                       *
   * ------------------------------------------------------------------ */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu-movil');

  if (toggle && menu) {
    let open = false;
    let closeTimer = null;

    const setOpen = (value) => {
      if (open === value) return;
      open = value;
      toggle.setAttribute('aria-expanded', String(value));
      toggle.setAttribute('aria-label', value ? 'Cerrar menú' : 'Abrir menú');
      document.documentElement.classList.toggle('menu-open', value);

      if (value) {
        clearTimeout(closeTimer);
        menu.hidden = false;
        // Doble frame para que la transición de entrada se ejecute.
        requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('open')));
        const first = menu.querySelector('a');
        if (first) first.focus();
      } else {
        menu.classList.remove('open');
        closeTimer = setTimeout(() => {
          if (!open) menu.hidden = true;
        }, 320);
      }
    };

    toggle.addEventListener('click', () => setOpen(!open));

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggle.focus();
      }
    });

    const desktopQuery = matchMedia('(min-width: 760px)');
    const onResize = (mq) => {
      if (mq.matches) setOpen(false);
    };
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', onResize);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(onResize); // Safari < 14
    }
  }

  /* ------------------------------------------------------------------ *
   * 3. Animaciones de aparición                                         *
   * ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------ *
   * 4. Fallback del logo (imagen remota)                                *
   * ------------------------------------------------------------------ */
  const failLogo = (img) => {
    const mark = img.closest ? img.closest('.logo-mark') : null;
    if (mark) mark.classList.add('logo-failed');
  };
  document.querySelectorAll('img.logo-img').forEach((img) => {
    img.addEventListener('error', () => failLogo(img), { once: true });
    // Si el navegador ya lo intentó y falló (carga en caché rota).
    if (img.complete && img.naturalWidth === 0) failLogo(img);
  });

  /* ------------------------------------------------------------------ *
   * 5. Header + footer                                                  *
   * ------------------------------------------------------------------ */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const onScroll = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
/* ------------------------------------------------------------------ *
   * 6. Formularios integrados (Google Forms como backend)               *
   * ------------------------------------------------------------------ *
   * El usuario rellena un formulario nativo de OFM TOP (modal/drawer)
   * y los datos se envían con POST directo al endpoint `formResponse`
   * del Google Form correspondiente (entry.* verificados en config.js).
   * Google Forms sigue recibiendo las respuestas y Google Sheets
   * (hoja de respuestas) sigue siendo el CRM. Sin salir de la web.
   *
   * Estados: form → validación → envío (loading) → éxito | error.
   * Error → reintento automático → vista alternativa embebida (iframe)
   * → enlace externo como último recurso.
   * ------------------------------------------------------------------ */
  const formIsland = document.getElementById('ofmtop-forms');
  const lmodal = document.getElementById('lead-modal');

  if (formIsland && lmodal) {
    let FORMS = {};
    let GROUPS = {};
    try {
      const parsed = JSON.parse(formIsland.textContent);
      FORMS = parsed.forms || {};
      GROUPS = parsed.groups || {};
    } catch {
      /* isla corrupta: los CTAs quedan como enlaces normales */
    }

    const sheet = lmodal.querySelector('.lmodal-sheet');
    const bodyEl = lmodal.querySelector('[data-lf-body]');
    let currentForm = null;
    let lastFocus = null;
    let closeTimer = null;

    const ICON_OK =
      '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="7.5 12.5 10.5 15.5 16.5 9"/></svg>';

    const escL = (v) =>
      String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
      })[c]);

    /* ---------- construcción del formulario ---------- */
    const fieldHtml = (f) => {
      const id = `lf-${f.k}`;
      const req = f.req ? ' aria-required="true" required' : '';
      const hint = f.hint ? `<span class="lf-hint">${escL(f.hint)}</span>` : '';
      const star = f.req ? '<span class="lf-req" aria-hidden="true"> *</span>' : '';
      const label = `<label class="lf-label" for="${id}">${escL(f.label)}${star}</label>`;
      const err = '<p class="lf-field-err" hidden>Revisa este campo.</p>';
      if (f.t === 'select') {
        const opts = [(f.ph || 'Elige una opción')]
          .concat(f.options || [])
          .map((o, i) =>
            `<option value="${escL(o)}"${i === 0 ? ' disabled selected hidden' : ''}>${escL(o)}</option>`,
          )
          .join('');
        return (
          `<div class="lf-field" data-field="${f.k}">${label}${hint}` +
          `<div class="lf-select"><select class="lf-input" id="${id}" name="${f.k}"${req}>${opts}</select></div>` +
          `<p class="lf-field-err" hidden>Elige una opción.</p></div>`
        );
      }
      if (f.t === 'textarea') {
        return (
          `<div class="lf-field" data-field="${f.k}">${label}${hint}` +
          `<textarea class="lf-input" id="${id}" name="${f.k}" rows="3" placeholder="${escL(f.ph || '')}"${req}></textarea>` +
          `${err}</div>`
        );
      }
      const ac = f.ac && f.ac !== 'off' ? ` autocomplete="${f.ac}"` : '';
      const im = f.t === 'tel' ? ' inputmode="tel"' : '';
      return (
        `<div class="lf-field" data-field="${f.k}">${label}${hint}` +
        `<input class="lf-input" id="${id}" name="${f.k}" type="${f.t}"${ac}${im} placeholder="${escL(f.ph || '')}"${req}>` +
        `${err}</div>`
      );
    };

    const consentHtml = (F, k) => {
      const f = F.fields.find((x) => x.k === k);
      if (!f) return '';
      const req = f.req ? ' aria-required="true" required' : '';
      let text = escL(f.label);
      if (k === 'privacidad') {
        text =
          'He leído y acepto la <a href="/legal/privacidad" target="_blank" rel="noopener">Política de Privacidad</a>, ' +
          'el <a href="/legal/aviso-legal" target="_blank" rel="noopener">Aviso legal</a> y la ' +
          '<a href="/legal/cookies" target="_blank" rel="noopener">Política de Cookies</a>.';
      }
      return `<label class="lf-check"><input type="checkbox" name="${f.k}"${req}> <span>${text}</span></label>`;
    };

    const renderForm = (key) => {
      const F = FORMS[key];
      if (!F) return;
      currentForm = key;
      const normal = F.fields.filter((f) => f.g !== 'more' && !['edad', 'privacidad', 'marketing'].includes(f.k));
      const more = F.fields.filter((f) => f.g === 'more');
      bodyEl.innerHTML =
        `<div class="lf-state" data-lf-state="form">` +
        `  <p class="lf-eyebrow">${escL(F.kindLabel)} · Guía gratis</p>` +
        `  <h2 class="lf-title" id="lf-title">${escL(F.guide)}</h2>` +
        `  <p class="lf-sub">Rellenas el formulario y recibes tu guía gratuita. Sin coste.</p>` +
        `  <form class="lf-form" novalidate>` +
        normal.map(fieldHtml).join('') +
        (more.length
          ? `<details class="lf-more"><summary>Más perfiles <span>(opcional)</span></summary>${more.map(fieldHtml).join('')}</details>`
          : '') +
        `    <div class="lf-consents">` +
        consentHtml(F, 'edad') +
        consentHtml(F, 'privacidad') +
        consentHtml(F, 'marketing') +
        `    </div>` +
        `    <p class="lf-disclaimer">Al enviar este formulario confirmas que eres mayor de 18 años y aceptas el tratamiento de tus datos conforme a nuestra <a href="/legal/privacidad" target="_blank" rel="noopener">Política de Privacidad</a>.</p>` +
        `    <button class="btn btn-primary btn-lg btn-block" type="submit">Enviar y recibir la guía</button>` +
        `    <p class="lf-error" data-lf-error hidden></p>` +
        `    <div class="lf-net" data-lf-net hidden>` +
        `      <button class="btn btn-primary btn-block" type="button" data-lf-retry>Volver a intentar</button>` +
        `      <button class="btn btn-ghost btn-block" type="button" data-lf-frame>Rellenar el formulario aquí</button>` +
        `    </div>` +
        `  </form>` +
        `</div>` +
        `<div class="lf-state lf-state-ok" data-lf-state="ok" hidden>` +
        `  <span class="lf-ok-icon">${ICON_OK}</span>` +
        `  <h2 class="lf-title" id="lf-title-ok" tabindex="-1">Perfecto. Hemos recibido tus datos.</h2>` +
        `  <p class="lf-sub">Tu recurso está listo.</p>` +
        `  <p class="lf-ok-guide">«${escL(F.guide)}»</p>` +
        `  <a class="btn btn-primary btn-lg btn-block btn-caps" href="${escL(F.guideHref)}">Acceder a la guía</a>` +
        `  <a class="btn btn-ghost btn-block" href="${escL(F.pdf)}" download>Descargar la guía en PDF</a>` +
        `  <a class="btn btn-ghost btn-block" href="/ofm">Conocer OFM TOP</a>` +
        `</div>` +
        `<div class="lf-state" data-lf-state="frame" hidden>` +
        `  <h2 class="lf-title" id="lf-title-frame" tabindex="-1">Formulario</h2>` +
        `  <div class="lf-frame-wrap"><iframe class="lf-frame" title="Formulario de la guía" data-lf-frame-src="${escL(F.url)}?embedded=true"></iframe></div>` +
        `  <p class="lf-frame-note"><button class="lf-linkbtn" type="button" data-lf-back>Volver al formulario</button></p>` +
        `</div>`;
      sheet.scrollTop = 0;
    };

    const renderChoice = (group) => {
      const items = GROUPS[group] || [];
      if (!items.length) return;
      bodyEl.innerHTML =
        `<div class="lf-state">` +
        `  <p class="lf-eyebrow">Guía gratis</p>` +
        `  <h2 class="lf-title" id="lf-title">Elige tu guía gratuita</h2>` +
        `  <p class="lf-sub">Las dos opciones son gratis. Elige la tuya y rellenas el formulario aquí mismo.</p>` +
        `  <div class="lf-choices${items.length > 2 ? ' lf-choices-all' : ''}">` +
        items
          .map((it) => {
            const F = FORMS[it.key];
            if (!F) return '';
            return (
              `<a class="lf-choice" href="${escL(F.url)}" data-form-link="${it.key}">` +
              `  <span class="lf-choice-body">` +
              `    <span class="lf-choice-tag">${escL(F.kindLabel)} · Guía gratis</span>` +
              `    <span class="lf-choice-label">${escL(it.label)}</span>` +
              `    <span class="lf-choice-desc">${escL(it.desc)}</span>` +
              `  </span>` +
              `  <span class="cta-arrow" aria-hidden="true">→</span>` +
              `</a>`
            );
          })
          .join('') +
        `  </div>` +
        `</div>`;
      sheet.scrollTop = 0;
    };

    /* ---------- estados ---------- */
    const showState = (name) => {
      bodyEl.querySelectorAll('[data-lf-state]').forEach((el) => {
        el.hidden = el.getAttribute('data-lf-state') !== name;
      });
      const title = bodyEl.querySelector(`[data-lf-state="${name}"] .lf-title`);
      if (title) title.focus({ preventScroll: true });
      sheet.scrollTop = 0;
    };

    /* ---------- apertura / cierre ---------- */
    const focusables = () =>
      [...sheet.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(
        (el) => el.offsetParent !== null || el === sheet,
      );

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key !== 'Tab') return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === sheet)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const openModal = () => {
      clearTimeout(closeTimer);
      if (lmodal.hidden) {
        lastFocus = document.activeElement;
        lmodal.hidden = false;
        document.documentElement.classList.add('lf-open');
        requestAnimationFrame(() => requestAnimationFrame(() => lmodal.classList.add('open')));
        document.addEventListener('keydown', onKey);
      }
      sheet.focus({ preventScroll: true });
    };

    const closeModal = () => {
      lmodal.classList.remove('open');
      document.documentElement.classList.remove('lf-open');
      document.removeEventListener('keydown', onKey);
      closeTimer = setTimeout(() => {
        lmodal.hidden = true;
        bodyEl.innerHTML = '';
        currentForm = null;
      }, 280);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    /* ---------- envío (POST directo a Google Forms) ---------- */
    const collect = (form, F) => {
      const data = [];
      let firstBad = null;
      for (const f of F.fields) {
        if (f.t === 'check') {
          const cb = form.querySelector(`input[name="${f.k}"]`);
          if (!cb) continue;
          const ok = cb.checked || !f.req;
          cb.closest('.lf-check').classList.toggle('is-invalid', !ok);
          if (!ok && !firstBad) firstBad = cb;
          if (cb.checked) data.push([f.entry, f.value]);
          continue;
        }
        const el = form.querySelector(`#lf-${f.k}`);
        const wrap = form.querySelector(`[data-field="${f.k}"]`);
        if (!el) continue;
        const val = (el.value || '').trim();
        let ok = true;
        if (f.req && !val) ok = false;
        if (ok && val && f.t === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) ok = false;
        if (wrap) {
          wrap.classList.toggle('is-invalid', !ok);
          const err = wrap.querySelector('.lf-field-err');
          if (err) err.hidden = ok;
        }
        if (!ok && !firstBad) firstBad = el;
        if (val) data.push([f.entry, val.slice(0, 500)]);
      }
      return { data, firstBad };
    };

    /* Construye el cuerpo EXACTO que espera formResponse:
       entry.<id>=valor + entry.<id>_sentinel vacío (selecciones/casillas)
       + fvv + pageHistory + partialResponse + fbzx + submissionTimestamp. */
    const buildBody = (F, data, fbzx) => {
      const params = new URLSearchParams();
      for (const [entry, value] of data) params.append(`entry.${entry}`, value);
      for (const f of F.fields) {
        if (f.t === 'select' || f.t === 'check') params.append(`entry.${f.entry}_sentinel`, '');
      }
      params.append('fvv', '1');
      params.append('pageHistory', '0');
      params.append('partialResponse', `[null,null,"${fbzx}"]`);
      params.append('fbzx', fbzx);
      params.append('submissionTimestamp', String(Date.now()));
      return params.toString();
    };

    const randomFbzx = () => String(Date.now()) + String(Math.floor(Math.random() * 1e6));

    const sendForm = (F, data) => {
      // Atribución UTM → campos ocultos del CRM si existen (utmEntries).
      for (const [k, entry] of Object.entries(F.utmEntries || {})) {
        if (entry && utm[k]) data.push([entry, String(utm[k]).slice(0, 200)]);
      }
      const body = buildBody(F, data, randomFbzx());
      // 1) Relé propio (POST /api/lead): el Worker confirma de verdad el
      //    registro leyendo la página de confirmación de Google.
      return fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: currentForm, values: data }),
      })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error('relay'))))
        .then((j) => {
          if (!j || j.ok !== true) throw new Error('not_confirmed');
        })
        .catch(() =>
          // 2) Respaldo directo desde el navegador (sin CORS, mismo backend).
          fetch(F.action + '?embedded=true', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body,
          }).then(() => undefined),
        );
    };

    bodyEl.addEventListener('submit', (e) => {
      const form = e.target;
      if (!form.matches('.lf-form')) return;
      e.preventDefault();
      const F = FORMS[currentForm];
      if (!F) return;

      const { data, firstBad } = collect(form, F);
      if (firstBad) {
        firstBad.focus();
        firstBad.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const errEl = form.querySelector('[data-lf-error]');
      const netEl = form.querySelector('[data-lf-net]');
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.classList.add('is-loading');
      btn.textContent = 'Enviando…';
      errEl.hidden = true;
      netEl.hidden = true;

      const resetBtn = () => {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
        btn.classList.remove('is-loading');
        btn.textContent = 'Enviar y recibir la guía';
      };
      const fail = () => {
        resetBtn();
        errEl.textContent =
          'No hemos podido enviar el formulario. Revisa tu conexión e inténtalo de nuevo.';
        errEl.hidden = false;
        netEl.hidden = false;
      };

      sendForm(F, data)
        .then(() => showState('ok'))
        .catch(() => {
          // Reintento único antes de mostrar el error (cortes de red puntuales).
          setTimeout(() => {
            sendForm(F, data)
              .then(() => showState('ok'))
              .catch(fail);
          }, 600);
        });
    });

    /* ---------- delegación de clics ----------
       Captura (fase 1): cualquier clic en un CTA de formulario se intercepta
       ANTES que cualquier otro handler: nunca navega, siempre modal. */
    document.addEventListener(
      'click',
      (e) => {
        const opener = e.target.closest ? e.target.closest('[data-form-link]') : null;
        if (opener && FORMS[opener.getAttribute('data-form-link')]) {
          e.preventDefault();
          e.stopPropagation();
          renderForm(opener.getAttribute('data-form-link'));
          openModal();
          return;
        }
        const chooser = e.target.closest ? e.target.closest('[data-form-choice]') : null;
        if (chooser) {
          const g = chooser.getAttribute('data-form-choice');
          if (GROUPS[g] && GROUPS[g].length) {
            e.preventDefault();
            e.stopPropagation();
            renderChoice(g);
            openModal();
          }
        }
      },
      true,
    );

    /* Dentro del modal: cerrar, reintento y fallback embebido */
    document.addEventListener('click', (e) => {
      if (!lmodal.contains(e.target)) return;
      if (e.target.closest('[data-lf-close]')) {
        closeModal();
      } else if (e.target.closest('[data-lf-frame]')) {
        const F = FORMS[currentForm];
        if (F) {
          const frame = bodyEl.querySelector('[data-lf-frame-src]');
          if (frame && !frame.src) frame.src = frame.getAttribute('data-lf-frame-src');
          showState('frame');
        }
      } else if (e.target.closest('[data-lf-retry]')) {
        const form = bodyEl.querySelector('.lf-form');
        const btn = form && form.querySelector('button[type="submit"]');
        if (btn) btn.click();
      } else if (e.target.closest('[data-lf-back]')) {
        showState('form');
      }
    });
  }
})();
