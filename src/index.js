/**
 * OFM TOP — Cloudflare Worker (punto de entrada).
 *
 * Flujo de cada petición:
 *   1. /robots.txt, /sitemap.xml, /favicon.ico → generados desde CONFIG
 *   2. Rutas de páginas registradas          → SSR (layout.js)
 *   3. /css, /js, /fonts                     → env.ASSETS (public/)
 *   4. resto                                  → 404 personalizada
 *
 * Todas las respuestas (HTML y estáticos) pasan por el Worker
 * (run_worker_first), así los headers de seguridad son consistentes.
 */
import { getRoute, STATIC_PREFIXES } from './routes.js';
import { renderPage, renderNotFound } from './layout.js';
import {
  FAVICON_SVG,
  robotsTxt,
  securityHeaders,
  sitemapXml,
  cacheControlFor,
} from './utils.js';
import { handleLeadPost } from './leadproxy.js';

function security() {
  return securityHeaders();
}

function htmlResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      ...security(),
    },
  });
}

async function notFound(pathname) {
  return htmlResponse(renderNotFound(pathname), 404);
}

export default {
  async fetch(request, env) {
    // 0) Relé de leads (POST /api/lead): guarda las respuestas en el
    //    Google Form original (Google Sheets sigue siendo el CRM).
    const leadUrl = new URL(request.url);
    if (leadUrl.pathname === '/api/lead') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ ok: false, error: 'method' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json; charset=utf-8', Allow: 'POST', ...security() },
        });
      }
      const lead = await handleLeadPost(request);
      const out = new Headers(lead.headers);
      for (const [k, v] of Object.entries(security())) out.set(k, v);
      return new Response(lead.body, { status: lead.status, headers: out });
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD', ...security() },
      });
    }

    const url = new URL(request.url);
    let pathname = url.pathname;
    // Normaliza barras finales: /creadoras/ → /creadoras
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.replace(/\/{2,}/g, '/').replace(/\/$/, '');
    }

    // 1) Archivos dinámicos generados desde la configuración central
    if (pathname === '/robots.txt') {
      return new Response(robotsTxt(), {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          ...security(),
        },
      });
    }
    if (pathname === '/sitemap.xml') {
      return new Response(sitemapXml(), {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=86400',
          ...security(),
        },
      });
    }
    if (pathname === '/favicon.ico') {
      return new Response(FAVICON_SVG, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=604800',
          ...security(),
        },
      });
    }

    // 2) Páginas registradas
    const route = getRoute(pathname);
    if (route) {
      return htmlResponse(renderPage(route, pathname), route.status ?? 200);
    }

    // 3) Estáticos (css / js / fuentes)
    const isStatic = STATIC_PREFIXES.some((p) => pathname.startsWith(p));
    if (isStatic && env?.ASSETS) {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) {
        const headers = new Headers(asset.headers);
        headers.set('Cache-Control', cacheControlFor(pathname));
        for (const [key, value] of Object.entries(security())) {
          headers.set(key, value);
        }
        return new Response(asset.body, {
          status: asset.status,
          statusText: asset.statusText,
          headers,
        });
      }
    }

    // 4) 404
    return notFound(pathname);
  },
};
