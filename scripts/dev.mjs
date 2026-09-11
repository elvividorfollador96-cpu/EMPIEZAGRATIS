/**
 * Servidor de desarrollo local (Node puro, sin wrangler).
 * Ejecuta el MÍSMO módulo Worker que se despliega, simulando
 * env.ASSETS con los archivos de public/.
 *
 *   npm run dev:node   →  http://localhost:8787
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import worker from '../src/index.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
};

/** Simula Workers Static Assets: sirve archivos de public/. */
const assetsFetch = async (request) => {
  const url = new URL(request.url);
  const safe = path.normalize(decodeURIComponent(url.pathname)).replace(/^[/\\]+/, '');
  const file = path.join(publicDir, safe);
  if (!file.startsWith(publicDir)) {
    return new Response('Forbidden', { status: 403 });
  }
  try {
    const info = await stat(file);
    if (!info.isFile()) throw new Error('no es un archivo');
    const data = await readFile(file);
    return new Response(new Uint8Array(data), {
      status: 200,
      headers: {
        'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      },
    });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
};

const env = { ASSETS: { fetch: assetsFetch } };
const port = Number(process.env.PORT || 8787);

const server = http.createServer(async (req, res) => {
  try {
    const headers = {};
    for (const [key, value] of Object.entries(req.headers)) {
      headers[key] = value;
    }
    // Reenvía el cuerpo de POST/PUT (necesario p. ej. para /api/lead).
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = chunks.length ? Buffer.concat(chunks) : undefined;
    const request = new Request(`http://localhost:${port}${req.url}`, {
      method: req.method,
      headers,
      body,
      duplex: body ? 'half' : undefined,
    });
    const response = await worker.fetch(request, env, {});
    const outHeaders = {};
    response.headers.forEach((value, key) => {
      outHeaders[key] = value;
    });
    res.writeHead(response.status, outHeaders);
    if (req.method === 'HEAD') return res.end();
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Worker error: ' + (err && err.message ? err.message : String(err)));
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`OFM TOP (dev local) → http://localhost:${port}`);
});
