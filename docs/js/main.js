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
})();
