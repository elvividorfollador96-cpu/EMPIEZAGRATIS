import { CONFIG } from './config.js';

/** Escape HTML mínimo y seguro para insertar textos dinámicos. */
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);
}

/**
 * Enlace de contacto del titular.
 * El email NUNCA se muestra como texto visible: solo existe en el href
 * mailto:. La etiqueta visible es siempre "Contactar" (o similar).
 */
export function contactLink({ label = CONFIG.legal.contactLabel, className = 'contact-link' } = {}) {
  return `<a class="${className}" href="mailto:${CONFIG.legal.email}">${escapeHtml(label)}</a>`;
}

/**
 * Favicon local (monograma) — fallback rápido y sin dependencias.
 * El icono principal de las páginas es el logo oficial (remoto).
 */
export const FAVICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
  '<circle cx="32" cy="32" r="32" fill="#38b6ff"/>' +
  '<circle cx="32" cy="32" r="23" fill="none" stroke="#ffffff" stroke-opacity="0.6" stroke-width="1.6"/>' +
  '<text x="32" y="38.5" font-family="-apple-system,\'Segoe UI\',Roboto,Arial,sans-serif" ' +
  'font-size="16.5" font-weight="700" letter-spacing="0.5" fill="#04202f" text-anchor="middle">OFM</text>' +
  '</svg>';

export function robotsTxt() {
  return (
    'User-agent: *\n' +
    'Allow: /\n' +
    '\n' +
    `Sitemap: ${CONFIG.domain}/sitemap.xml\n`
  );
}

/** Sitemap generado a partir del dominio central de CONFIG. */
export function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/creadoras', changefreq: 'weekly', priority: '0.9' },
    { loc: '/creadoras/empezar', changefreq: 'weekly', priority: '0.8' },
    { loc: '/creadoras/escalar', changefreq: 'weekly', priority: '0.8' },
    { loc: '/ofm', changefreq: 'weekly', priority: '0.9' },
    { loc: '/ofm/modelos-reales', changefreq: 'weekly', priority: '0.8' },
    { loc: '/ofm/modelos-ia', changefreq: 'weekly', priority: '0.8' },
    { loc: '/guia/primer-mes-en-onlyfans', changefreq: 'weekly', priority: '0.7' },
    { loc: '/guia/como-crecer-y-escalar', changefreq: 'weekly', priority: '0.7' },
    { loc: '/guia/ofm-desde-cero-modelos-reales', changefreq: 'weekly', priority: '0.7' },
    { loc: '/guia/modelo-virtual-con-ia', changefreq: 'weekly', priority: '0.7' },
    { loc: '/legal/privacidad', changefreq: 'monthly', priority: '0.3' },
    { loc: '/legal/aviso-legal', changefreq: 'monthly', priority: '0.3' },
    { loc: '/legal/cookies', changefreq: 'monthly', priority: '0.3' },
  ];
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${CONFIG.domain}${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    body +
    '\n</urlset>\n'
  );
}

/**
 * Headers de seguridad (compatibles con Cloudflare Workers).
 * CSP estricta: solo recursos propios + GitHub raw para el logo.
 * docs.google.com está permitido en connect-src/frame-src/form-action
 * porque los formularios integrados envían (POST/fetch/iframe) al Google
 * Form original, que sigue siendo el backend de las respuestas.
 */
export function securityHeaders() {
  return {
    'Content-Security-Policy':
      "default-src 'self'; " +
      "script-src 'self'; " +
      "style-src 'self'; " +
      "img-src 'self' data: https://raw.githubusercontent.com; " +
      "font-src 'self'; " +
      "connect-src 'self' https://docs.google.com; " +
      "frame-src 'self' https://docs.google.com; " +
      "object-src 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self' https://docs.google.com; " +
      "frame-ancestors 'self'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  };
}

/** Cache por tipo de recurso estático. */
export function cacheControlFor(pathname) {
  if (pathname.startsWith('/fonts/') || pathname.startsWith('/img/'))
    return 'public, max-age=31536000, immutable';
  if (pathname.startsWith('/css/') || pathname.startsWith('/js/'))
    return 'public, max-age=86400';
  // PDFs de las guías: contenido estable, pero refrescable en 24 h por si
  // se publica una versión corregida bajo la misma ruta.
  if (pathname.startsWith('/guias/')) return 'public, max-age=86400';
  return 'public, max-age=3600';
}
