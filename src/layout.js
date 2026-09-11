import { CONFIG } from './config.js';
import { escapeHtml, FAVICON_SVG } from './utils.js';
import { header, footer, mobileMenu, logoMark, formModal } from './components.js';

/** Página actual para resaltar en la navegación de escritorio. */
function activeNav(pathname) {
  if (pathname.startsWith('/creadoras')) return 'creadoras';
  if (pathname.startsWith('/ofm')) return 'ofm';
  return '';
}

function head({ title, description, canonical, noindex = false }) {
  const esc = escapeHtml;
  return (
    `<!doctype html>` +
    `<html lang="es">` +
    `<head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` +
    `<title>${esc(title)}</title>` +
    `<meta name="description" content="${esc(description)}">` +
    `<link rel="canonical" href="${esc(canonical)}">` +
    `<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow'}">` +
    `<meta name="theme-color" content="#06090d">` +
    // Open Graph
    `<meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="${esc(CONFIG.brand.name)}">` +
    `<meta property="og:locale" content="es_ES">` +
    `<meta property="og:url" content="${esc(canonical)}">` +
    `<meta property="og:title" content="${esc(title)}">` +
    `<meta property="og:description" content="${esc(description)}">` +
    `<meta property="og:image" content="${esc(CONFIG.logo)}">` +
    `<meta property="og:image:alt" content="Logotipo de ${esc(CONFIG.brand.name)}">` +
    // Twitter / X
    `<meta name="twitter:card" content="summary_large_image">` +
    `<meta name="twitter:title" content="${esc(title)}">` +
    `<meta name="twitter:description" content="${esc(description)}">` +
    `<meta name="twitter:image" content="${esc(CONFIG.logo)}">` +
    // Favicon: logo oficial (remoto) + monograma local como respaldo
    `<link rel="icon" type="image/png" href="${esc(CONFIG.logo)}">` +
    `<link rel="apple-touch-icon" href="${esc(CONFIG.logo)}">` +
    `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}">` +
    // Rendimiento
    `<link rel="preconnect" href="https://raw.githubusercontent.com">` +
    `<link rel="preload" as="font" type="font/woff2" href="/fonts/inter-latin-400-normal.woff2" crossorigin>` +
    `<link rel="stylesheet" href="/css/styles.css">` +
    `<script type="module" src="/js/main.js"></script>` +
    `</head>`
  );
}

/**
 * Shell completo de la web: head + header + main + footer + menú móvil.
 * Todo el HTML se renderiza en el Worker (SSR) — el JS del cliente solo
 * añade microinteracciones, menú móvil y persistencia de UTM.
 */
function layout({ title, description, canonical, noindex, content, headingId }) {
  return (
    head({ title, description, canonical, noindex }) +
    `<body>` +
    `<a class="skip-link" href="#contenido">Saltar al contenido</a>` +
    header(activeNav(canonical ? new URL(canonical).pathname : '')) +
    `<main id="contenido" ${headingId ? `aria-labelledby="${headingId}"` : ''}>` +
    content +
    `</main>` +
    footer() +
    mobileMenu() +
    formModal() +
    `</body>` +
    `</html>`
  );
}

/** Renderiza una ruta registrada (página normal). */
export function renderPage(route, pathname) {
  const canonical = pathname === '/' ? `${CONFIG.domain}/` : `${CONFIG.domain}${pathname}`;
  return layout({
    title: route.seo.title,
    description: route.seo.description,
    canonical,
    noindex: Boolean(route.noindex),
    headingId: route.seo.headingId,
    content: route.content(),
  });
}

/** Página 404 personalizada (no indexable). */
export function renderNotFound(pathname = '') {
  const canonical = `${CONFIG.domain}/404`;
  return layout({
    title: 'Página no encontrada · OFM TOP',
    description: 'La página que buscas no existe o se ha movido.',
    canonical,
    noindex: true,
    content:
      `<section class="notfound">` +
      `  <div class="container">` +
      `    <div class="nf-logo">${logoMark({ size: 'lg' })}</div>` +
      `    <p class="nf-code" aria-hidden="true">404</p>` +
      `    <h1>Página no encontrada</h1>` +
      `    <p class="nf-text">La página que buscas no existe o se ha movido.` +
      (pathname ? ` Estabas buscando <code>${escapeHtml(pathname)}</code>.` : '') +
      `</p>` +
      `    <div class="nf-actions">` +
      `      <a class="btn btn-primary" href="/">Volver al inicio</a>` +
      `      <a class="btn btn-ghost" href="/#empezar">Ver opciones</a>` +
      `    </div>` +
      `  </div>` +
      `</section>`,
  });
}
