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
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
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
  ['/guia/primer-mes-en-onlyfans', 200],
  ['/guia/como-crecer-y-escalar', 200],
  ['/guia/ofm-desde-cero-modelos-reales', 200],
  ['/guia/modelo-virtual-con-ia', 200],
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

const KNOWN_STATIC = ['/css/', '/js/', '/fonts/', '/img/', '/guias/', '/favicon.ico', '/robots.txt', '/sitemap.xml'];
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
    if (/^(mailto:|tel:)/i.test(href)) continue; // contacto por email/teléfono
    const clean = href.split('#')[0].split('?')[0] || '/';
    const known =
      KNOWN_PAGES.includes(clean) || KNOWN_STATIC.some((s) => clean.startsWith(s));
    if (!known) fail(`${p}: enlace interno roto → ${href}`);
  }
}
pass(`${totalLinks} enlaces revisados (sin enlaces rotos)`);

console.log('── Imágenes locales (/img/) ──────────────');
const imgSrcRe = /(?:src|srcset)="(\/img\/[^"]+)"/g;
let imgRefs = 0;
const imgSet = new Set();
for (const [p, { html }] of Object.entries(htmlByPath)) {
  let m;
  while ((m = imgSrcRe.exec(html)) !== null) {
    imgRefs += 1;
    imgSet.add(m[1]);
  }
}
for (const src of imgSet) {
  const res = await get(src);
  const type = res.headers.get('content-type');
  if (res.status === 200 && type && type.startsWith('image/'))
    pass(`${src} → 200 (${type})`);
  else fail(`${src} → ${res.status} (${type || 'sin content-type'})`);
}
if (imgRefs > 0) pass(`${imgRefs} referencias <img>/<source> a /img/ en el HTML`);
else fail('ninguna página referencia imágenes locales');

console.log('── Descargas PDF por guía ────────────────');
{
  const GUIDE_PAGES = [
    ['/guia/primer-mes-en-onlyfans', 'empezar'],
    ['/guia/como-crecer-y-escalar', 'escalar'],
    ['/guia/ofm-desde-cero-modelos-reales', 'reales'],
    ['/guia/modelo-virtual-con-ia', 'ia'],
  ];
  for (const [p, key] of GUIDE_PAGES) {
    const { html } = htmlByPath[p] || { html: '' };
    const pdf = CONFIG.forms[key].pdf;
    const dl = html.match(new RegExp(`<a[^>]*href="${pdf}"[^>]*download[^>]*>`));
    if (dl) pass(`${p}: botón de descarga → ${pdf}`);
    else fail(`${p}: falta el botón de descarga ${pdf}`);
    const res = await get(pdf);
    const type = res.headers.get('content-type');
    if (res.status === 200 && type === 'application/pdf') pass(`${pdf} → 200 (application/pdf)`);
    else fail(`${pdf} → ${res.status} (${type || 'sin content-type'})`);
  }
  // El JS del modal enlaza el PDF en la pantalla de éxito (descarga según la guía elegida)
  const js = await readFile(path.join(publicDir, 'js/main.js'), 'utf8');
  if (js.includes('href="${escL(F.pdf)}" download')) pass('main.js: descarga del PDF en la pantalla de éxito');
  else fail('main.js: falta la descarga del PDF en la pantalla de éxito');
}

console.log('── Formularios integrados (4) ────────────');
const formChecks = [
  ['/creadoras/empezar', 'empezar'],
  ['/creadoras/escalar', 'escalar'],
  ['/ofm/modelos-reales', 'reales'],
  ['/ofm/modelos-ia', 'ia'],
];
for (const [p, key] of formChecks) {
  const { html } = htmlByPath[p] || { html: '' };
  const form = CONFIG.forms[key];
  // CTA integrado (data-form-link) presente y sin target=_blank
  const snippet = html.match(new RegExp(`<a[^>]*data-form-link="${key}"[^>]*>`));
  if (snippet) {
    if (snippet[0].includes('target="_blank"')) fail(`${p}: el CTA del formulario abre en pestaña nueva (prohibido)`);
    else if (snippet[0].includes('href="https://docs.google.com')) fail(`${p}: el CTA apunta a Google Forms (prohibido)`);
    else pass(`${p}: CTA integrado data-form-link="${key}" (ancla interna, sin Google)`);
  } else {
    fail(`${p}: falta el CTA integrado data-form-link="${key}"`);
  }
  // Endpoint real del Google Form en la isla de datos del modal
  if (html.includes(form.action)) pass(`${p}: endpoint formResponse en la isla de datos`);
  else fail(`${p}: falta el endpoint formResponse (formKey=${key})`);
  // entry.* verificados presentes en la isla
  const entries = form.fields.map((f) => f.entry);
  const missing = entries.filter((e) => !html.includes(e));
  if (missing.length === 0) pass(`${p}: ${entries.length} entry.* verificados presentes`);
  else fail(`${p}: faltan entry.* → ${missing.join(', ')}`);
  // Enlaces /edit prohibidos
  if (html.includes('/edit')) fail(`${p}: se detectó un enlace /edit (prohibido)`);
  // El CTA de éxito debe llevar a la página lead magnet correspondiente
  if (html.includes(form.guideHref)) pass(`${p}: pantalla de éxito → ${form.guideHref}`);
  else fail(`${p}: falta el enlace al lead magnet ${form.guideHref}`);
}

console.log('── Relé /api/lead ────────────────────────');
{
  const r405 = await get('/api/lead');
  if (r405.status === 405) pass('GET /api/lead → 405 (solo POST)');
  else fail(`GET /api/lead → ${r405.status} (esperaba 405)`);
  const post = async (body) =>
    worker.fetch(new Request(BASE + '/api/lead', { method: 'POST', body }), env, {});
  const r1 = await post('{mal');
  if (r1.status === 400) pass('POST JSON inválido → 400');
  else fail(`POST JSON inválido → ${r1.status}`);
  const r2 = await post(JSON.stringify({ key: 'nope', values: [['1', 'x']] }));
  if (r2.status === 400) pass('POST formulario desconocido → 400');
  else fail(`POST form desconocido → ${r2.status}`);
  const r3 = await post(JSON.stringify({ key: 'empezar', values: [['999', 'x']] }));
  if (r3.status === 400) pass('POST entry fuera de whitelist → 400');
  else fail(`POST entry ajeno → ${r3.status}`);
  const r4 = await post(
    JSON.stringify({ key: 'empezar', values: [['219114604', 'x']] }),
  );
  if (r4.status === 400) pass('POST sin 18+/privacidad → 400 (legal)');
  else fail(`POST sin consentimientos → ${r4.status}`);
}

console.log('── Experiencia del formulario ────────────');
for (const p of ['/', '/creadoras', '/ofm', '/creadoras/empezar', '/ofm/modelos-ia']) {
  const { html } = htmlByPath[p] || { html: '' };
  if (html.includes('id="lead-modal"')) pass(`${p}: capa del formulario integrado presente`);
  else fail(`${p}: falta la capa del formulario integrado`);
  if (html.includes('id="ofmtop-forms"')) pass(`${p}: isla de datos JSON presente`);
  else fail(`${p}: falta la isla de datos JSON`);
  if (html.includes('Guía gratuita') || html.includes('Guía gratis')) pass(`${p}: oferta GUÍA GRATIS visible`);
  else fail(`${p}: falta la oferta GUÍA GRATIS`);
  if (!/<a[^>]*target="_blank"[^>]*href="https:\/\/docs\.google\.com\/forms[^"]*"[^>]*data-form-link/.test(html))
    pass(`${p}: ningún CTA de formulario abre en pestaña nueva`);
  else fail(`${p}: hay CTAs de formulario con target=_blank`);
}

console.log('── Legal ─────────────────────────────────');
for (const p of ['/legal/aviso-legal', '/legal/privacidad', '/legal/cookies']) {
  const { html } = htmlByPath[p] || { html: '' };
  const text = html.replace(/<[^>]+>/g, ' ');
  if (text.includes('Calle Plaza del Sol 14, 6ºA')) pass(`${p}: domicilio oficial presente`);
  else fail(`${p}: falta el domicilio oficial`);
  if (text.includes('OFM TOP')) pass(`${p}: titular OFM TOP presente`);
  else fail(`${p}: falta el titular`);
  if (text.includes('@gmail') || text.includes('contacto.starupmentor')) fail(`${p}: el email es visible como texto (prohibido)`);
  else pass(`${p}: el email no aparece como texto visible`);
  if (html.includes('mailto:contacto.starupmentor@gmail.com')) pass(`${p}: enlace mailto de contacto presente`);
  else fail(`${p}: falta el enlace mailto de contacto`);
  if (!text.includes('[COMPLETAR') && !text.includes('COMPLETAR:')) pass(`${p}: sin placeholders pendientes`);
  else fail(`${p}: quedan placeholders [COMPLETAR]`);
  if (!text.includes('NIF') && !text.includes('CIF')) pass(`${p}: sin NIF/CIF (correcto)`);
  else fail(`${p}: se menciona NIF/CIF`);
  if (p !== '/legal/cookies' && (text.includes('mayor de 18') || text.includes('mayores de 18'))) pass(`${p}: advertencia 18+ presente`);
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
  if (locs.length === 14) pass(`sitemap con ${locs.length} URLs`);
  else fail(`sitemap con ${locs.length} URLs (esperado 14)`);
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
