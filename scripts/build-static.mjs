/**
 * Generador estático para GitHub Pages.
 *
 * Renderiza las MISMAS páginas SSR del Worker (src/routes.js + src/layout.js)
 * a HTML estático dentro de `docs/`, y copia los estáticos de `public/`.
 * Las URLs relativas a la raíz (/css/..., /creadoras...) se reescriben con
 * el prefijo BASE para que funcionen bajo https://<user>.github.io/<repo>/.
 *
 *   npm run build:static                  → BASE por defecto: /EMPIEZAGRATIS
 *   STATIC_BASE=/ npm run build:static    → otro prefijo (p. ej. dominio propio)
 *
 * GitHub Pages debe estar configurado con: rama `main`, carpeta `/docs`.
 */
import { cp, mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PAGE_PATHS, getRoute } from '../src/routes.js';
import { renderPage, renderNotFound } from '../src/layout.js';
import { robotsTxt, sitemapXml } from '../src/utils.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'docs');
const publicDir = path.join(root, 'public');

/** Prefijo bajo el que se sirve el sitio (GitHub Pages: /<nombre-del-repo>). */
const BASE = (process.env.STATIC_BASE ?? '/EMPIEZAGRATIS').replace(/\/+$/, '');

/** Reescribe href/src absolutos ("/x") añadiendo el prefijo BASE. */
function rewriteHtml(html) {
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`);
}

/** Reescribe url("/x") de CSS añadiendo el prefijo BASE. */
function rewriteCss(css) {
  return css.replace(/url\("\/(?!\/)/g, `url("${BASE}/`);
}

/** Ruta → archivo: '/' → index.html · '/a/b' → a/b/index.html */
function fileFor(routePath) {
  const clean = routePath.replace(/^\/|\/$/g, '');
  return clean === '' ? 'index.html' : path.join(clean, 'index.html');
}

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  let pages = 0;

  // 1) Páginas SSR pre-renderizadas
  for (const routePath of PAGE_PATHS) {
    const route = getRoute(routePath);
    const html = rewriteHtml(renderPage(route, routePath));
    const file = path.join(outDir, fileFor(routePath));
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html, 'utf-8');
    pages += 1;
  }

  // 2) 404 personalizada (GitHub Pages sirve 404.html en rutas inexistentes)
  await writeFile(path.join(outDir, '404.html'), rewriteHtml(renderNotFound()), 'utf-8');

  // 3) robots.txt y sitemap.xml (mismos que genera el Worker)
  await writeFile(path.join(outDir, 'robots.txt'), robotsTxt(), 'utf-8');
  await writeFile(path.join(outDir, 'sitemap.xml'), sitemapXml(), 'utf-8');

  // 4) Estáticos (css, js, fuentes, imágenes) + reescritura de CSS
  await cp(publicDir, outDir, { recursive: true });
  const cssFile = path.join(outDir, 'css', 'styles.css');
  await writeFile(cssFile, rewriteCss(await readFile(cssFile, 'utf-8')), 'utf-8');

  // 5) Desactiva Jekyll (GitHub Pages no debe procesar el sitio)
  await writeFile(path.join(outDir, '.nojekyll'), '', 'utf-8');

  console.log(`✔ docs/ generado: ${pages} páginas + 404 + estáticos (BASE=${BASE || '/'})`);
}

main().catch((err) => {
  console.error('✗ Error generando docs/:', err);
  process.exit(1);
});
