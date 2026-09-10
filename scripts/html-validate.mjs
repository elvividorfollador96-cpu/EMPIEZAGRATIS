/**
 * Validación HTML offline de todas las páginas renderizadas
 * (usa el mismo Worker que producción, sin servidor).
 *
 *   npm run lint:html
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HtmlValidate } from 'html-validate';
import worker from '../src/index.js';
import { CONFIG } from '../src/config.js';
import { PAGE_PATHS } from '../src/routes.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const assetsFetch = async (request) => {
  const { readFile, stat } = await import('node:fs/promises');
  const url = new URL(request.url);
  const safe = path.normalize(decodeURIComponent(url.pathname)).replace(/^[/\\]+/, '');
  const file = path.join(root, 'public', safe);
  if (!file.startsWith(path.join(root, 'public'))) return new Response('Forbidden', { status: 403 });
  try {
    const info = await stat(file);
    if (!info.isFile()) throw new Error('no file');
    return new Response(new Uint8Array(await readFile(file)), { status: 200 });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
};
const env = { ASSETS: { fetch: assetsFetch } };

const dir = path.join(tmpdir(), 'ofmtop-html-validate');
await mkdir(dir, { recursive: true });

const paths = [];
for (const [i, p] of PAGE_PATHS.entries()) {
  const res = await worker.fetch(new Request(CONFIG.domain + p), env, {});
  const file = path.join(dir, `${i}-${p.replace(/\//g, '_') || 'home'}.html`);
  await writeFile(file, await res.text());
  paths.push(file);
}
// También la 404
{
  const res = await worker.fetch(new Request(CONFIG.domain + '/pagina-falsa'), env, {});
  const file = path.join(dir, '404.html');
  await writeFile(file, await res.text());
  paths.push(file);
}

const validator = new HtmlValidate({
  extends: ['html-validate:recommended'],
  rules: {
    'doctype-style': 'off', // doctype minúscula (estándar moderno)
  },
});

const reports = await validator.validateMultipleFiles(paths);
const results = Array.isArray(reports) ? reports : reports.results;
const problems = results.flatMap((res) => res.messages.map((m) => ({ file: res.filePath, ...m })));
if (problems.length === 0) {
  console.log(`HTML OK: ${paths.length} páginas validadas sin errores.`);
  process.exit(0);
}
for (const p of problems) {
  console.error(`${path.basename(p.file)}:${p.line}:${p.column}  ${p.severity === 2 ? 'error' : 'warn'}  ${p.message} (${p.ruleId})`);
}
process.exit(1);
