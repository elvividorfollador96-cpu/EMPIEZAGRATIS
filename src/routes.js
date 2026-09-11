/**
 * Tabla de rutas. Cada página es un módulo con:
 *   path  → ruta exacta
 *   seo   → { title, description, headingId? }
 *   content() → HTML del <main>
 *   noindex? → true para páginas que no deben indexarse
 */
import home from './pages/home.js';
import creadoras from './pages/creadoras.js';
import creadorasEmpezar from './pages/creadoras-empezar.js';
import creadorasEscalar from './pages/creadoras-escalar.js';
import ofm from './pages/ofm.js';
import ofmModelosReales from './pages/ofm-modelos-reales.js';
import ofmModelosIA from './pages/ofm-modelos-ia.js';
import legalPrivacidad from './pages/legal-privacidad.js';
import legalAviso from './pages/legal-aviso.js';
import legalCookies from './pages/legal-cookies.js';
import guias from './pages/guias.js';

const PAGES = [
  home,
  creadoras,
  creadorasEmpezar,
  creadorasEscalar,
  ofm,
  ofmModelosReales,
  ofmModelosIA,
  legalPrivacidad,
  legalAviso,
  legalCookies,
  ...guias,
];

export function getRoute(pathname) {
  return PAGES.find((r) => r.path === pathname) || null;
}

export const PAGE_PATHS = PAGES.map((r) => r.path);

/** Prefijos de archivos estáticos servidos desde `public/` (env.ASSETS). */
export const STATIC_PREFIXES = ['/css/', '/js/', '/fonts/', '/img/'];
