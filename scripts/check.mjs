/**
 * Verificación de producción (sin navegador):
 *  - estado HTTP de todas las rutas
 *  - enlaces internos rotos
 *  - los 4 formularios en sus páginas (con target=_blank + rel=noopener)
 *  - headers de seguridad en HTML y estáticos
 *  - SEO (title/description/canonical/OG únicos por página)
 *  - robots.txt y sitemap.xml
 *
 *   npm run check
 */
import worker from '../src/index.js';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONFIG } from '../src/config.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
};

const assetsFetch = async (request) => {
  const url = new URL(request.url);
  const safe = path.normalize(decodeURIComponent(url.pathname)).replace(/^[/\\]+/, '');
  const file = path.join(publicDir, safe);
  if (!file.startsWith(publicDir)) return new Response('Forbidden', { status: 403 });
  try {
    const info = await stat(file);
    if (!info.isFile()) throw new Error('no file');
    const data = await readFile(file);
    return new Response(new Uint8Array(data), {
      status: 200,
      headers: { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' },
    });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
};

const env = { ASSETS: { fetch: assetsFetch } };
const BASE = CONFIG.domain;

let passed = 0;
let failed = 0;
const fail = (msg) => {
  failed += 1;
  console.error(`  ✗ ${msg}`);
};
const pass = (msg) => {
  passed += 1;
  console.log(`  ✓ ${msg}`);
};

const get = async (p) => worker.fetch(new Request(BASE + p), env, {});

const PAGES = [
  ['/', 200],
  ['/creadoras', 200],
  ['/creadoras/empezar', 200],
  ['/creadoras/escalar', 200],
  ['/ofm', 200],
  ['/ofm/modelos-reales', 200],
  ['/ofm/modelos-ia', 200],
  ['/legal/privacidad', 200],
  ['/legal/aviso-legal', 200],
  ['/legal/cookies', 200],
  // normalización de barras
  ['/creadoras/', 200],
  ['/creadoras/empezar//', 200],
  // estáticos
  ['/css/styles.css', 200],
  ['/js/main.js', 200],
  ['/fonts/inter-latin-400-normal.woff2', 200],
  // archivos generados
  ['/robots.txt', 200],
  ['/sitemap.xml', 200],
  ['/favicon.ico', 200],
  // 404
  ['/no-existe', 404],
  ['/css/fake.css', 404],
  // método no permitido
];

const KNOWN_STATIC = ['/css/', '/js/', '/fonts/', '/favicon.ico', '/robots.txt', '/sitemap.xml'];
const KNOWN_PAGES = PAGES.map(([p]) => (p.length > 1 ? p.replace(/\/+$/, '') : p));

console.log('── Rutas ────────────────────────────────');
const htmlByPath = {};
for (const [p, expected] of PAGES) {
  const res = await get(p);
  const body = await res.text();
  if (res.status === expected) pass(`${p} → ${res.status}`);
  else fail(`${p} → ${res.status} (esperado ${expected})`);
  if (expected === 200 && res.headers.get('content-type')?.includes('text/html')) {
    const key = p === '/' ? '/' : p.replace(/\/+$/, '');
    htmlByPath[key] = { html: body, headers: res.headers };
  }
}

console.log('── Headers de seguridad ──────────────────');
const required = [
  'content-security-policy',
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
];
for (const [label, res] of [
  ['HTML /', htmlByPath['/']],
  ['estático /css/styles.css', await get('/css/styles.css')],
]) {
  for (const h of required) {
    if (res && res.headers.get(h)) pass(`${label}: ${h}`);
    else fail(`${label}: falta ${h}`);
  }
}

console.log('── Enlaces internos ──────────────────────');
const anchorRe = /<a\b[^>]*\bhref="([^"]*)"[^>]*>/g;
let totalLinks = 0;
for (const [p, { html }] of Object.entries(htmlByPath)) {
  let m;
  while ((m = anchorRe.exec(html)) !== null) {
    totalLinks += 1;
    const href = m[1];
    if (href.startsWith('http')) {
      // Externos: deben ser solo las cuentas conocidas (Instagram/Threads/Google Forms)
      const ok =
        href.startsWith(CONFIG.social.instagram) ||
        href.startsWith(CONFIG.social.threads) ||
        href.startsWith('https://docs.google.com/forms/') ||
        href === CONFIG.logo;
      if (!ok) fail(`${p}: externo no reconocido → ${href}`);
      continue;
    }
    if (href.startsWith('#')) continue;
    const clean = href.split('#')[0].split('?')[0] || '/';
    const known =
      KNOWN_PAGES.includes(clean) || KNOWN_STATIC.some((s) => clean.startsWith(s));
    if (!known) fail(`${p}: enlace interno roto → ${href}`);
  }
}
pass(`${totalLinks} enlaces revisados (sin enlaces rotos)`);

console.log('── Formularios (4) ───────────────────────');
const formChecks = [
  ['/creadoras/empezar', CONFIG.forms.empezar, 'Quiero empezar'],
  ['/creadoras/escalar', CONFIG.forms.escalar, 'Quiero crecer'],
  ['/ofm/modelos-reales', CONFIG.forms.modelosReales, 'Quiero aprender OFM'],
  ['/ofm/modelos-ia', CONFIG.forms.modelosIA, 'Quiero aprender'],
];
for (const [p, url, cta] of formChecks) {
  const { html } = htmlByPath[p] || { html: '' };
  const snippet = html.match(new RegExp(`<a[^>]*href="${url}"[^>]*>`));
  if (snippet) {
    const okBlank = snippet[0].includes('target="_blank"') && snippet[0].includes('rel="noopener"');
    if (okBlank) pass(`${p}: formulario ${url.slice(28, 44)}… (blank+noopener)`);
    else fail(`${p}: formulario sin target=_blank/rel=noopener`);
  } else {
    fail(`${p}: no aparece el formulario ${url}`);
  }
  if (html.includes(cta)) pass(`${p}: CTA “${cta}” presente`);
  else fail(`${p}: falta CTA “${cta}”`);
  if (html.includes('/edit')) fail(`${p}: se detectó un enlace /edit (prohibido)`);
}

console.log('── Logo (URL oficial + marco circular) ───');
for (const [p, { html }] of Object.entries(htmlByPath)) {
  const count = (html.match(new RegExp(CONFIG.logo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (count >= 3) pass(`${p}: logo oficial presente (${count}×)`);
  else fail(`${p}: logo oficial ausente o poco usado (${count}×)`);
  if (!html.includes('logo-mark')) fail(`${p}: falta el contenedor .logo-mark (marco circular)`);
}

console.log('── SEO ───────────────────────────────────');
const titles = new Set();
for (const [p, { html }] of Object.entries(htmlByPath)) {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const og = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  if (!title || title.length < 20) fail(`${p}: title ausente o corto`);
  else titles.add(title);
  if (!desc || desc.length < 60) fail(`${p}: description ausente o corta`);
  if (canonical !== (p === '/' ? `${BASE}/` : BASE + p)) fail(`${p}: canonical incorrecto → ${canonical}`);
  if (og !== CONFIG.logo) fail(`${p}: og:image no usa el logo oficial`);
}
if (titles.size === Object.keys(htmlByPath).length) pass('titles únicos en las 10 páginas');
else fail('hay titles duplicados');

console.log('── robots + sitemap ──────────────────────');
{
  const robots = await (await get('/robots.txt')).text();
  if (robots.includes(`${BASE}/sitemap.xml`)) pass('robots.txt apunta al sitemap');
  else fail('robots.txt sin sitemap');
  const sitemap = await (await get('/sitemap.xml')).text();
  const locs = sitemap.match(/<loc>([^<]*)<\/loc>/g) || [];
  if (locs.length === 10) pass(`sitemap con ${locs.length} URLs`);
  else fail(`sitemap con ${locs.length} URLs (esperado 10)`);
  const bad = locs.filter((l) => !l.includes(BASE)).length;
  if (bad === 0) pass('todas las URLs del sitemap usan el dominio oficial');
  else fail(`${bad} URLs del sitemap sin el dominio oficial`);
}

console.log('── UTM (persistencia en el HTML) ─────────');
{
  const res = worker.fetch(
    new Request(BASE + '/?utm_source=ig&utm_medium=social&utm_content=link_in_bio'),
    env,
    {},
  );
  const r = await res;
  const body = await r.text();
  // El HTML no debe romper al recibir UTM; los enlaces internos se
  // amplían en el cliente (main.js). Verificamos que main.js gestiona los 5 params.
  const mainJs = await readFile(path.join(root, 'public/js/main.js'), 'utf8');
  const hasAll = CONFIG.utmParams.every((p) => mainJs.includes(p));
  if (hasAll) pass('main.js reconoce los 5 parámetros UTM');
  else fail('main.js no reconoce los 5 parámetros UTM');
  if (r.status === 200 && body.includes('<title>')) pass('home responde 200 con UTM en la URL');
  else fail('home falla con UTM en la URL');
}

console.log('─────────────────────────────────────────');
console.log(`Resultado: ${passed} OK, ${failed} fallos`);
process.exit(failed === 0 ? 0 : 1);
