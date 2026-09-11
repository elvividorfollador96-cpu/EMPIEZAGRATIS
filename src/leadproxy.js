import { CONFIG } from './config.js';

/**
 * Relé de leads hacia Google Forms (backend existente).
 *
 * El navegador envía POST /api/lead con { key, values: [[entry, valor], …] }
 * y este módulo retransmite el POST al `formResponse` del Google Form
 * correspondiente con la receta completa que Google exige:
 *   - entry.<id> con el valor (IDs internos de envío de CONFIG)
 *   - entry.<id>_sentinel vacío para cada campo de selección/casilla
 *   - fvv=1, pageHistory=0, partialResponse, fbzx, submissionTimestamp
 *
 * La respuesta se considera enviada SOLO si Google devuelve su página de
 * confirmación (se comprueba el cuerpo, no el código de estado: con
 * algunos parámetros Google registra el envío y responde 400).
 *
 * Seguridad: whitelist estricta de entry.* por formulario, límite de
 * longitud, rate limit básico por IP y sin logging de datos personales.
 */

const UA_BROWSER =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

/** Marcadores de la página de confirmación de un envío aceptado. */
const CONFIRM_RE =
  /Hemos registrado|¡Listo!|response has been recorded|freebirdFormviewerViewResponseConfirmContent/i;

/** Rate limit en memoria (por aislamiento de Worker; suficiente como freno). */
const hits = new Map();
const RATE_MAX = 8;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // techo defensivo de memoria
  return false;
}

/** Conjunto de entry.* válidos de un formulario (whitelist estricta). */
function validEntries(form) {
  const set = new Set();
  for (const f of form.fields) set.add(String(f.entry));
  return set;
}

/** Entries de selección/casilla (requieren _sentinel vacío en el POST). */
function choiceEntries(form) {
  return form.fields.filter((f) => f.t === 'select' || f.t === 'check').map((f) => String(f.entry));
}

function fbzxRandom() {
  let n = '';
  for (let i = 0; i < 19; i += 1) n += Math.floor(Math.random() * 10);
  return n.replace(/^0+/, '') || '1';
}

/**
 * Construye el cuerpo urlencoded EXACTO que espera el formResponse.
 * values = [[entry, valor], …] del formulario `form`.
 */
function buildFormBody(form, values) {
  const params = new URLSearchParams();
  for (const [entry, value] of values) {
    params.append(`entry.${entry}`, String(value).slice(0, 800));
  }
  for (const entry of choiceEntries(form)) {
    params.append(`entry.${entry}_sentinel`, '');
  }
  const fbzx = fbzxRandom();
  params.append('fvv', '1');
  params.append('pageHistory', '0');
  params.append('partialResponse', `[null,null,"${fbzx}"]`);
  params.append('fbzx', fbzx);
  params.append('submissionTimestamp', String(Date.now()));
  return params.toString();
}

/** Punto de entrada del Worker: POST /api/lead. Devuelve siempre JSON. */
export async function handleLeadPost(request) {
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });

  const ip =
    request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'anon';

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }

  const key = typeof payload?.key === 'string' ? payload.key : '';
  const form = CONFIG.forms[key];
  if (!form) return json({ ok: false, error: 'unknown_form' }, 400);

  const values = Array.isArray(payload?.values) ? payload.values : null;
  if (!values || values.length === 0 || values.length > 60) {
    return json({ ok: false, error: 'bad_values' }, 400);
  }

  // Whitelist estricta: solo entry.* del formulario, valores como texto corto.
  const allowed = validEntries(form);
  const clean = [];
  for (const pair of values) {
    if (!Array.isArray(pair) || pair.length !== 2) return json({ ok: false, error: 'bad_pair' }, 400);
    const entry = String(pair[0]);
    const value = pair[1];
    if (!allowed.has(entry)) return json({ ok: false, error: 'bad_entry' }, 400);
    if (typeof value !== 'string' || value.length === 0 || value.length > 800) {
      return json({ ok: false, error: 'bad_value' }, 400);
    }
    clean.push([entry, value]);
  }

  // Legal: los entries de mayoría de edad y privacidad son obligatorios.
  const byKind = {};
  for (const f of form.fields) byKind[f.k] = String(f.entry);
  if (byKind.edad && !clean.some(([e]) => e === byKind.edad)) {
    return json({ ok: false, error: 'age_required' }, 400);
  }
  if (byKind.privacidad && !clean.some(([e]) => e === byKind.privacidad)) {
    return json({ ok: false, error: 'privacy_required' }, 400);
  }

  if (rateLimited(ip)) return json({ ok: false, error: 'rate_limited' }, 429);

  try {
    const res = await fetch(`${form.action}?embedded=true`, {
      method: 'POST',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'User-Agent': UA_BROWSER,
        'Referer': `${form.url}?embedded=true`,
      },
      body: buildFormBody(form, clean),
    });
    const text = await res.text();
    const ok = res.status === 200 || res.status === 302 ? CONFIRM_RE.test(text) : CONFIRM_RE.test(text);
    return json({ ok });
  } catch {
    return json({ ok: false, error: 'upstream' }, 502);
  }
}
