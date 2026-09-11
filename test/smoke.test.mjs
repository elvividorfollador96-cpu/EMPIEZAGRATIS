/**
 * Smoke test del lado cliente (main.js) con linkedom:
 *  - logo en marco circular (URL oficial)
 *  - menú móvil (abrir/cerrar, aria, focus, Escape)
 *  - UTM: lectura de la URL, persistencia, expansión de enlaces internos
 *  - anclas internas sin recarga
 *
 *   npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import worker from '../src/index.js';
import { CONFIG } from '../src/config.js';
import { readFile as fsReadFile, stat } from 'node:fs/promises';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const assetsFetch = async (request) => {
  const url = new URL(request.url);
  const safe = path.normalize(decodeURIComponent(url.pathname)).replace(/^[/\\]+/, '');
  const file = path.join(root, 'public', safe);
  if (!file.startsWith(path.join(root, 'public'))) return new Response('Forbidden', { status: 403 });
  try {
    const info = await stat(file);
    if (!info.isFile()) throw new Error('no file');
    return new Response(new Uint8Array(await fsReadFile(file)), { status: 200 });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
};

const env = { ASSETS: { fetch: assetsFetch } };

async function pageDoc(p, query = '') {
  const res = await worker.fetch(new Request(`${CONFIG.domain}${p}${query}`), env, {});
  assert.equal(res.status, 200);
  const html = await res.text();
  const url = `${CONFIG.domain}${p}${query}`;
  const doc = parseHTML(html, { url }).document;
  const win = doc.defaultView;

  // ---- Shims: linkedom es solo DOM (sin location/history/matchMedia) ----
  const parsed = new URL(url);
  const loc = {
    href: url,
    origin: parsed.origin,
    pathname: parsed.pathname,
    search: parsed.search,
    hash: parsed.hash,
  };
  win.location = loc;
  win.history = {
    replaceState(_s, _t, u) {
      if (u) {
        const n = new URL(u, url);
        loc.pathname = n.pathname;
        loc.search = n.search;
        loc.hash = n.hash;
      }
    },
    pushState() {},
  };
  const store = new Map();
  win.sessionStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => void store.set(k, String(v)),
    removeItem: (k) => void store.delete(k),
    clear: () => store.clear(),
  };
  win.matchMedia = (q) => ({
    matches: false,
    media: q,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });
  win.requestAnimationFrame = (cb) => setTimeout(cb, 0);
  win.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  if (!win.Element.prototype.scrollIntoView) {
    win.Element.prototype.scrollIntoView = function () {};
  }
  if (!win.Element.prototype.focus) {
    win.Element.prototype.focus = function () {};
  }
  win.MouseEvent = class extends win.Event {
    constructor(type, init = {}) {
      super(type, { bubbles: true, cancelable: true, ...init });
      this.metaKey = false;
      this.ctrlKey = false;
      this.shiftKey = false;
      this.altKey = false;
    }
  };
  win.KeyboardEvent = class extends win.Event {
    constructor(type, init = {}) {
      super(type, { bubbles: true, cancelable: true, ...init });
      this.key = init.key;
    }
  };

  // main.js se ejecuta con los globales de navegador como parámetros
  // (equivalente a un <script> dentro del window).
  const mainJs = await fsReadFile(path.join(root, 'public/js/main.js'), 'utf8');
  const exec = new Function(
    'window',
    'document',
    'matchMedia',
    'sessionStorage',
    'location',
    'history',
    'requestAnimationFrame',
    mainJs,
  );
  exec(win, doc, (q) => win.matchMedia(q), win.sessionStorage, loc, win.history, (cb) => setTimeout(cb, 0));
  return { doc, win, loc };
}

const tick = (ms = 40) => new Promise((r) => setTimeout(r, ms));

test('home: logo oficial dentro de marco circular (.logo-mark)', async () => {
  const { doc } = await pageDoc('/');
  const marks = doc.querySelectorAll('.logo-mark');
  assert.ok(marks.length >= 3, `esperaba >=3 logo-mark, hay ${marks.length}`);
  for (const mark of marks) {
    const img = mark.querySelector('img.logo-img');
    assert.ok(img, 'cada logo-mark debe contener <img class="logo-img">');
    assert.equal(img.getAttribute('src'), CONFIG.logo, 'src debe ser la URL oficial del logo');
    assert.ok(mark.querySelector('.logo-fallback'), 'cada logo-mark debe tener fallback');
  }
});

test('menú móvil: abre, cierra con link, cierra con Escape', async () => {
  const { doc, win } = await pageDoc('/');
  const toggle = doc.querySelector('.nav-toggle');
  const menu = doc.getElementById('menu-movil');
  assert.ok(toggle && menu);
  assert.equal(menu.hasAttribute('hidden'), true, 'inicia cerrado');

  toggle.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }));
  await tick();
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(menu.hasAttribute('hidden'), false, 'se muestra al abrir');
  assert.ok(menu.classList.contains('open'));

  // Cierre al pulsar un enlace del menú
  const link = menu.querySelector('a');
  link.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert.ok(!menu.classList.contains('open'), 'cierra al pulsar un enlace');

  // Reabrir y cerrar con Escape
  toggle.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }));
  await tick();
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  doc.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await tick();
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
});

test('UTM: se leen de la URL y se persisten', async () => {
  const { doc, win } = await pageDoc(
    '/',
    '?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
  );
  assert.deepEqual(win.OFTOP.utm, {
    utm_source: 'ig',
    utm_medium: 'social',
    utm_content: 'link_in_bio',
  });
  const raw = win.sessionStorage.getItem('ofmtop.utm.v1');
  assert.ok(raw, 'UTM persistidos en sessionStorage');
  assert.equal(JSON.parse(raw).utm_source, 'ig');
  void doc;
});

test('UTM: se añaden a los enlaces internos al navegar', async () => {
  const { doc, win } = await pageDoc(
    '/',
    '?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
  );
  const link = doc.querySelector('a[href="/creadoras"]');
  assert.ok(link, 'enlace interno de ejemplo presente');
  link.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert.equal(
    link.getAttribute('href'),
    '/creadoras?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
  );
  // Externo (Google Forms) no se toca
  const external = [...doc.querySelectorAll('a[href^="https://docs.google.com"]')][0];
  if (external) {
    external.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }));
    assert.ok(external.getAttribute('href').startsWith('https://docs.google.com/forms/d/e/'));
  }
  void win;
});

test('ancla interna en la misma página no recarga (preventDefault + scroll)', async () => {
  const { doc, win, loc } = await pageDoc('/');
  const anchor = doc.querySelector('a[href="/#empezar"]');
  assert.ok(anchor, 'CTA "Empezar" del header presente');
  const event = new win.MouseEvent('click', { bubbles: true, cancelable: true });
  anchor.dispatchEvent(event);
  assert.equal(event.defaultPrevented, true, 'la navegación se intercepta para hacer scroll');
  assert.equal(loc.hash, '#empezar', 'el ancla se aplica sin recargar');
});

test('ancla interna con UTM en la URL: scroll sin recarga', async () => {
  const { doc, win, loc } = await pageDoc('/', '?utm_source=ig');
  const anchor = doc.querySelector('a[href="/#empezar"]');
  assert.ok(anchor);
  const event = new win.MouseEvent('click', { bubbles: true, cancelable: true });
  anchor.dispatchEvent(event);
  assert.equal(event.defaultPrevented, true, 'no debe recargar la página');
  assert.equal(loc.hash, '#empezar', 'ancla aplicada en la URL');
});

test('sin UTM: los enlaces internos no se modifican', async () => {
  const { doc, win } = await pageDoc('/');
  const link = doc.querySelector('a[href="/ofm"]');
  assert.ok(link);
  link.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert.equal(link.getAttribute('href'), '/ofm');
  void win;
});

test('accessibilidad: skip link, labels, aria, lang, headings', async () => {
  for (const p of ['/', '/creadoras/empezar', '/legal/privacidad']) {
    const { doc } = await pageDoc(p);
    assert.equal(doc.documentElement.getAttribute('lang'), 'es', `${p}: lang="es"`);
    assert.ok(doc.querySelector('.skip-link'), `${p}: skip link`);
    assert.ok(doc.querySelector('main#contenido'), `${p}: main#contenido`);
    assert.ok(doc.querySelector('h1'), `${p}: tiene h1`);
    const toggles = doc.querySelectorAll('button[aria-label]');
    for (const b of toggles) {
      assert.ok(b.getAttribute('aria-controls'), `${p}: botón con aria-controls`);
    }
    // Cada img debe tener alt (vacío si es decorativo)
    for (const img of doc.querySelectorAll('img')) {
      assert.ok(img.hasAttribute('alt'), `${p}: img sin atributo alt`);
    }
  }
});

test('legal: datos oficiales completos, sin placeholders', async () => {
  for (const p of ['/legal/privacidad', '/legal/aviso-legal', '/legal/cookies']) {
    const { doc } = await pageDoc(p);
    const html = doc.documentElement.outerHTML;
    // Datos oficiales del titular presentes
    assert.ok(html.includes('Calle Plaza del Sol 14, 6ºA'), `${p}: domicilio oficial`);
    assert.ok(html.includes('mailto:contacto.starupmentor@gmail.com'), `${p}: contacto mailto`);
    // El email nunca visible como texto (solo en href)
    const text = doc.body.textContent || '';
    assert.ok(!text.includes('contacto.starupmentor') && !text.includes('@gmail.com'), `${p}: email no visible`);
    // Sin placeholders pendientes ni datos que no existen
    assert.equal(doc.querySelectorAll('.ph').length, 0, `${p}: sin placeholders`);
    assert.ok(!html.includes('[COMPLETAR'), `${p}: sin [COMPLETAR]`);
    assert.ok(!/NIF|CIF/.test(text), `${p}: sin NIF/CIF`);
  }
});
