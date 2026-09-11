import { CONFIG } from './config.js';
import { escapeHtml } from './utils.js';

/**
 * Logo siempre dentro de un marco perfectamente circular (.logo-mark en CSS):
 * border-radius 50%, overflow hidden, aspect-ratio 1/1, proporciones intactas.
 * El zoom interno se controla con --logo-zoom (mismo círculo exterior).
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

/**
 * Hero de página con oferta de guía (mismo estilo en todo el sitio):
 * fondo fotográfico + badge GUÍA GRATUITA + titular + subtítulo + CTAs.
 *
 * - ctaForm: clave de CONFIG.forms o grupo ("choice:ofm" / "choice:creadoras")
 *   → el CTA principal abre el formulario integrado (data-attrs; el href al
 *   Google Form queda como fallback sin JavaScript, sin target=_blank).
 * - ctaHref sin ctaForm → enlace interno normal (p. ej. "#guias").
 * - secondary: { href, label } → CTA secundario fantasma.
 */
export function guideHero({ bg, crumbs, title, sub, ctaForm = '', ctaLabel, secondary = null }) {
  let dataAttrs = '';
  if (ctaForm) {
    const isChoice = ctaForm.startsWith('choice:');
    dataAttrs = isChoice
      ? ` data-form-choice="${ctaForm.slice(7)}"`
      : ` data-form-link="${ctaForm}"`;
  }
  return (
    `<section class="hero ofm-hero">` +
    heroBg(bg) +
    `  <div class="container">` +
    breadcrumb(crumbs) +
    `    <div data-reveal>` +
    `      <p class="hero-badge"><span class="hero-badge-dot" aria-hidden="true"></span>Guía gratuita</p>` +
    `      <h1 id="page-title" class="hero-title">${title}</h1>` +
    `      <p class="hero-sub">${sub}</p>` +
    `      <div class="hero-actions">` +
    `        <a class="btn btn-primary btn-lg btn-caps" href="#guia-gratis"${dataAttrs}>${ctaLabel}</a>` +
    (secondary
      ? `        <a class="btn btn-ghost btn-lg btn-caps" href="${secondary.href}">${secondary.label}</a>`
      : '') +
    `      </div>` +
    `    </div>` +
    `  </div>` +
    `</section>`
  );
}

/** Iconos inline (mínimos, sin dependencias). */
export const ICONS = {
  arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  check: '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="7.5 12.5 10.5 15.5 16.5 9"/></svg>',
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
    `      <a class="btn btn-primary btn-sm" href="#guia-gratis" data-form-choice="creadoras">Empezar</a>` +
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
    `  <a class="btn btn-primary btn-lg" href="#guia-gratis" data-form-choice="creadoras">Quiero mi guía gratis</a>` +
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
    `      <nav class="footer-col" aria-label="Contacto y redes sociales">` +
    `        <h2>Contacto</h2>` +
    `        <a href="mailto:${CONFIG.legal.email}">Contactar</a>` +
    `        <a href="${CONFIG.social.instagram}" target="_blank" rel="noopener">Instagram</a>` +
    `        <a href="${CONFIG.social.threads}" target="_blank" rel="noopener">Threads</a>` +
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

/**
 * Tarjeta de guía (hubs /ofm y /creadoras): imagen + badge GUÍA GRATIS
 * + CTA al formulario integrado + enlace al temario completo.
 * formKey: clave en CONFIG.forms (fuente única de las URLs).
 */
export function guideCard({ media, alt, eyebrow, title, desc, formKey, moreHref, delay = '' }) {
  const form = CONFIG.forms[formKey];
  if (!form) throw new Error(`Formulario desconocido: ${formKey}`);
  return (
    `<article class="guide-card ${delay}" data-reveal>` +
    `  <div class="guide-media">` +
    `    <span class="guide-chip" aria-hidden="true">Guía gratis</span>` +
    picture({ base: media, alt, width: 1000, height: 666 }) +
    `  </div>` +
    `  <div class="guide-body">` +
    `    <p class="eyebrow">${escapeHtml(eyebrow)}</p>` +
    `    <h3>${escapeHtml(title)}</h3>` +
    `    <p>${escapeHtml(desc)}</p>` +
    `    <a class="btn btn-primary btn-block btn-caps" href="#guia-gratis" data-form-link="${formKey}">` +
    `      Quiero la guía gratis` +
    `    </a>` +
    `    <a class="guide-more" href="${moreHref}">Ver el temario completo →</a>` +
    `  </div>` +
    `</article>`
  );
}

/** Opción del bloque CTA final: abre el formulario integrado. */
export function ctaOption({ tag, label, formKey, delay = '' }) {
  const form = CONFIG.forms[formKey];
  if (!form) throw new Error(`Formulario desconocido: ${formKey}`);
  return (
    `<a class="cta-option ${delay}" href="#guia-gratis" data-form-link="${formKey}" data-reveal>` +
    `<span class="cta-tag">${escapeHtml(tag)}</span>` +
    `<span class="cta-label">${escapeHtml(label)}</span>` +
    `<span class="cta-arrow" aria-hidden="true">→</span>` +
    `</a>`
  );
}

/**
 * Panel final de conversión (páginas de temario): lead magnet + CTA que
 * abre el formulario integrado de OFM TOP (Google Forms sigue siendo el
 * backend; el href queda como fallback sin JavaScript, sin target=_blank).
 * formKey: clave en CONFIG.forms (fuente única de las URLs).
 */
export function leadPanel({ formKey }) {
  const form = CONFIG.forms[formKey];
  if (!form) throw new Error(`Formulario desconocido: ${formKey}`);
  return (
    `<div class="lead-panel" data-reveal>` +
    `  <p class="lead-magnet-label">Guía gratuita</p>` +
    `  <p class="lead-magnet">«${escapeHtml(form.guide)}»</p>` +
    `  <a class="btn btn-primary btn-lg" href="#guia-gratis" data-form-link="${formKey}">` +
    `    Quiero la guía gratis` +
    `  </a>` +
    `  <p class="lead-note">` +
    `    Rellenas el formulario aquí mismo y recibes la guía. Al enviarlo, aceptas nuestra ` +
    `    <a href="/legal/privacidad">política de privacidad</a>. Servicio exclusivo para mayores de 18 años.` +
    `  </p>` +
    `</div>`
  );
}

/**
 * Capa del formulario integrado (modal/drawer) + isla de datos JSON.
 * El HTML del formulario lo genera public/js/main.js a partir de la isla,
 * con los entry.* de CONFIG (verificados) y la UTM de la sesión.
 * Sin JavaScript, los CTAs caen al Google Form (fallback).
 */
export function formModal() {
  const data = {};
  for (const [key, form] of Object.entries(CONFIG.forms)) {
    data[key] = {
      action: form.action,
      url: form.url,
      kind: form.kind,
      kindLabel: form.kindLabel,
      guide: form.guide,
      guideHref: form.guideHref,
      guideFile: form.guideFile,
      utmEntries: form.utmEntries,
      fields: form.fields,
    };
  }
  const json = JSON.stringify({
    forms: data,
    groups: CONFIG.formGroups,
    age: CONFIG.brand.age,
  }).replace(/</g, '\\u003c');

  return (
    `<div class="lmodal" id="lead-modal" hidden>` +
    `  <div class="lmodal-backdrop" data-lf-close></div>` +
    `  <section class="lmodal-sheet" role="dialog" aria-modal="true" aria-labelledby="lf-title" tabindex="-1">` +
    `    <header class="lmodal-head">` +
    `      <span class="lmodal-brand">${escapeHtml(CONFIG.brand.name)} · Guía gratis</span>` +
    `      <button class="lmodal-close" type="button" data-lf-close aria-label="Cerrar formulario" aria-controls="lf-body">${ICONS.close}</button>` +
    `    </header>` +
    `    <div class="lmodal-body" id="lf-body" data-lf-body></div>` +
    `  </section>` +
    `  <script type="application/json" id="ofmtop-forms">${json}</script>` +
    `</div>`
  );
}
