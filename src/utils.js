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
 */
export function securityHeaders() {
  return {
    'Content-Security-Policy':
      "default-src 'self'; " +
      "script-src 'self'; " +
      "style-src 'self'; " +
      "img-src 'self' data: https://raw.githubusercontent.com; " +
      "font-src 'self'; " +
      "connect-src 'self'; " +
      "object-src 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self'; " +
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
  return 'public, max-age=3600';
}
