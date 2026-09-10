import { CONFIG } from './config.js';
import { escapeHtml } from './utils.js';

/**
 * Logo siempre dentro de un marco perfectamente circular (.logo-mark):
 * border-radius 50%, overflow hidden, aspect-ratio 1/1, proporciones intactas.
 * Si la imagen remota no carga, se muestra un monograma de respaldo.
 */
export function logoMark({ size = 'md', priority = false } = {}) {
  const eager = priority ? 'fetchpriority="high"' : 'loading="lazy"';
  return (
    `<span class="logo-mark logo-mark-${size}" aria-hidden="true">` +
    `<img class="logo-img" src="${CONFIG.logo}" alt="" width="2000" height="2000" ${eager} decoding="async">` +
    `<span class="logo-fallback">OFM</span>` +
    `</span>`
  );
}

export function picture({ base, alt, width, height, lazy = true }) {
  const load = lazy
    ? 'loading="lazy" decoding="async"'
    : 'loading="eager" fetchpriority="high" decoding="async"';
  return (
    `<picture>` +
    `<source type="image/webp" srcset="/img/${base}.webp">` +
    `<img src="/img/${base}.jpg" alt="${alt}" width="${width}" height="${height}" ${load}>` +
    `</picture>`
  );
}

export function heroBg(base) {
  return (
    `<div class="hero-bg" aria-hidden="true">` +
    `<picture>` +
    `<source type="image/webp" srcset="/img/${base}.webp">` +
    `<img src="/img/${base}.jpg" alt="" loading="eager" fetchpriority="low" decoding="async">` +
    `</picture>` +
    `</div>`
  );
}

/** Iconos inline (mínimos, sin dependencias). */
export const ICONS = {
  external:
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
};

export function header(active = '') {
  const navLink = (href, label, key) =>
    `<a href="${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`;
  return (
    `<header class="site-header">` +
    `  <div class="nav">` +
    `    <a class="brand" href="/" aria-label="${escapeHtml(CONFIG.brand.name)} — Inicio">` +
    `      ${logoMark({ size: 'md', priority: true })}` +
    `      <span class="brand-name">${escapeHtml(CONFIG.brand.name)}</span>` +
    `    </a>` +
    `    <nav class="nav-links" aria-label="Principal">` +
    navLink('/creadoras', 'Creadoras', 'creadoras') +
    navLink('/ofm', 'OFM', 'ofm') +
    `    </nav>` +
    `    <div class="nav-actions">` +
    `      <a class="btn btn-primary btn-sm" href="/#empezar">Empezar</a>` +
    `      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu-movil" aria-label="Abrir menú">` +
    `        <span class="bar"></span><span class="bar"></span>` +
    `      </button>` +
    `    </div>` +
    `  </div>` +
    `</header>`
  );
}

export function mobileMenu() {
  return (
    `<div class="mobile-menu" id="menu-movil" hidden>` +
    `  <nav aria-label="Menú">` +
    `    <a class="mobile-link" href="/creadoras">Creadoras<span>Empezar o escalar tu cuenta</span></a>` +
    `    <a class="mobile-link" href="/ofm">OFM<span>Aprende a construir proyectos</span></a>` +
    `  </nav>` +
    `  <a class="btn btn-primary btn-lg" href="/#empezar">Ver opciones</a>` +
    `  <div class="mobile-menu-foot">` +
    `    <span class="socials">` +
    `      <a href="${CONFIG.social.instagram}" target="_blank" rel="noopener">Instagram</a>` +
    `      <span aria-hidden="true">·</span>` +
    `      <a href="${CONFIG.social.threads}" target="_blank" rel="noopener">Threads</a>` +
    `    </span>` +
    `    <span class="age-chip">18+</span>` +
    `  </div>` +
    `</div>`
  );
}

export function footer() {
  return (
    `<footer class="site-footer">` +
    `  <div class="container">` +
    `    <div class="footer-grid">` +
    `      <div class="footer-brand">` +
    `        <a class="brand" href="/" aria-label="${escapeHtml(CONFIG.brand.name)} — Inicio">` +
    `          ${logoMark({ size: 'sm' })}` +
    `          <span class="brand-name">${escapeHtml(CONFIG.brand.name)}</span>` +
    `        </a>` +
    `        <p class="footer-claim">${escapeHtml(CONFIG.brand.claim)}</p>` +
    `      </div>` +
    `      <nav class="footer-col" aria-label="Explorar">` +
    `        <h2>Explorar</h2>` +
    `        <a href="/creadoras">Creadoras</a>` +
    `        <a href="/ofm">OFM</a>` +
    `        <a href="/#empezar">Empezar</a>` +
    `      </nav>` +
    `      <nav class="footer-col" aria-label="Legal">` +
    `        <h2>Legal</h2>` +
    `        <a href="/legal/privacidad">Privacidad</a>` +
    `        <a href="/legal/aviso-legal">Aviso legal</a>` +
    `        <a href="/legal/cookies">Cookies</a>` +
    `      </nav>` +
    `      <nav class="footer-col" aria-label="Redes sociales">` +
    `        <h2>Síguenos</h2>` +
    `        <a href="${CONFIG.social.instagram}" target="_blank" rel="noopener">Instagram ${ICONS.external}</a>` +
    `        <a href="${CONFIG.social.threads}" target="_blank" rel="noopener">Threads ${ICONS.external}</a>` +
    `      </nav>` +
    `    </div>` +
    `    <div class="footer-bottom">` +
    `      <p>© <span data-year>2026</span> ${escapeHtml(CONFIG.brand.name)}. Todos los derechos reservados.</p>` +
    `      <p class="footer-age">Contenido y servicios dirigidos exclusivamente a personas mayores de ${CONFIG.brand.age} años.</p>` +
    `    </div>` +
    `  </div>` +
    `</footer>`
  );
}

/** Migas de pan: items = [{ href, label }]; el último se marca como actual. */
export function breadcrumb(items) {
  const links = items
    .map((item, i) => {
      const last = i === items.length - 1;
      return last
        ? `<span aria-current="page">${escapeHtml(item.label)}</span>`
        : `<a href="${item.href}">${escapeHtml(item.label)}</a>`;
    })
    .join(`<span class="sep" aria-hidden="true">/</span>`);
  return `<nav class="breadcrumb" aria-label="Migas de pan">${links}</nav>`;
}

/** Lista numerada de temas (páginas de detalle). */
export function topicsList(items) {
  const rows = items
    .map(
      (t) =>
        `<li><span class="t-n" aria-hidden="true">${t.n}</span>` +
        `<h3>${escapeHtml(t.t)}</h3>` +
        `<p>${escapeHtml(t.d)}</p></li>`,
    )
    .join('\n');
  return `<ol class="topics" data-reveal>${rows}</ol>`;
}

/** Opción del bloque CTA final (home). */
export function ctaOption({ tag, label, href }) {
  return (
    `<a class="cta-option" href="${href}" data-reveal>` +
    `<span class="cta-tag">${escapeHtml(tag)}</span>` +
    `<span class="cta-label">${escapeHtml(label)}</span>` +
    `<span class="cta-arrow" aria-hidden="true">→</span>` +
    `</a>`
  );
}

/**
 * Panel final de conversión: lead magnet + CTA al formulario público.
 * formKey: clave en CONFIG.forms (fuente única de las URLs).
 */
export function leadPanel({ magnet, cta, formKey }) {
  const formUrl = CONFIG.forms[formKey];
  if (!formUrl) throw new Error(`Formulario desconocido: ${formKey}`);
  return (
    `<div class="lead-panel" data-reveal>` +
    `  <p class="lead-magnet-label">Qué recibes</p>` +
    `  <p class="lead-magnet">«${escapeHtml(magnet)}»</p>` +
    `  <a class="btn btn-primary btn-lg" href="${formUrl}" target="_blank" rel="noopener">` +
    `    ${escapeHtml(cta)} ${ICONS.external}` +
    `  </a>` +
    `  <p class="lead-note">` +
    `    El formulario se abre en una pestaña nueva (Google Forms). Al enviarlo, aceptas ` +
    `    nuestra <a href="/legal/privacidad">política de privacidad</a>.` +
    `  </p>` +
    `</div>`
  );
}
