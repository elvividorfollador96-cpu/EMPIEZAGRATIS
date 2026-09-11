/**
 * OFM TOP — Configuración centralizada.
 *
 * Un único lugar para cambiar marca, dominio, logo, redes, formularios,
 * datos legales y textos principales. Nada de URLs duplicadas por el código.
 *
 * FORMULARIOS (captación de leads):
 *   - El frontend propio (public/js/main.js) envía los datos mediante POST
 *     directo al endpoint `formResponse` de cada Google Form, con los
 *     entry.* verificados abajo (extraídos de cada formulario real).
 *   - Google Forms sigue siendo el backend/receptor y Google Sheets
 *     (hoja de respuestas) la base de datos/CRM. No se toca nada allí.
 *   - `url` (viewform?embedded=true) se usa como vista alternativa embebida
 *     dentro de OFM TOP si el envío directo fallara en algún navegador.
 *
 * UTM / ATRIBUCIÓN:
 *   - Los formularios actuales NO tienen campos ocultos para FUENTE/MEDIUM/
 *     CAMPAÑA/CONTENIDO, así que no se envía nada inventado.
 *   - Si más adelante añades en cada Google Form campos ocultos (tipo
 *     "respuesta breve") para la atribución, anota aquí sus entry IDs en
 *     `utmEntries` y el frontend los enviará automáticamente con la UTM
 *     de la sesión (window.OFTOP.utm).
 *     Cómo obtener el entry ID de un campo oculto: abre el formulario
 *     publicado → clic derecho → "Ver código fuente" → busca
 *     `name="entry.XXXXXXX"` dentro del bloque del campo. Ese número es el ID.
 */
const FORMS_BASE = 'https://docs.google.com/forms/d/e';
const FORM_ACTION = (id) => `${FORMS_BASE}/${id}/formResponse`;
const FORM_VIEW = (id) => `${FORMS_BASE}/${id}/viewform`;

/**
 * Constructor de formularios. Los entry.* son los reales de cada Google Form
 * (verificados sobre el HTML publicado de cada uno). Las opciones de los
 * desplegables y de las casillas son EXACTAMENTE las del formulario: si
 * cambian allí, deben cambiarse aquí.
 */
function makeForm({ id, kind, kindLabel, guide, guideHref, fields }) {
  return {
    id,
    /** Endpoint receptor (POST). No cambia sin verificar el formulario. */
    action: FORM_ACTION(id),
    /** Vista embebible (fallback integrado dentro de OFM TOP). */
    url: FORM_VIEW(id),
    kind,
    kindLabel,
    /** Guía que recibe el usuario (para el estado de éxito). */
    guide,
    /** Destino del CTA "Acceder a la guía" tras el envío. */
    guideHref,
    /** Atribución UTM → entry del CRM. Vacío hasta crear los campos ocultos. */
    utmEntries: { source: null, medium: null, campaign: null, content: null, term: null },
    fields,
  };
}

/* Opciones compartidas (texto EXACTO del Google Form correspondiente). */
const EXP_OPTIONS = ['Ninguna', 'Estoy empezando', 'Menos de 3 meses', '3–12 meses', 'Más de 1 año'];
const AUDIENCE_OPTIONS = ['No', 'Muy poca', 'Entre 1.000 y 10.000', 'Entre 10.000 y 50.000', 'Más de 50.000'];
const AGE_VALUE = 'Declaro que soy mayor de 18 años.';
const PRIVACY_VALUE = 'He leído y acepto la Política de Privacidad.';
const MARKETING_VALUE = 'Acepto recibir información, recursos y comunicaciones comerciales de OFM TOP.';

export const CONFIG = Object.freeze({
  brand: Object.freeze({
    name: 'OFM TOP',
    claim: 'No se trata de publicar más. Se trata de hacerlo mejor.',
    description:
      'Estrategia, crecimiento y gestión para creadoras. Formación y recursos para quienes quieren entrar en el mundo OFM.',
    /** Requisito de edad del servicio (servicio 18+). */
    age: 18,
  }),

  /** Dominio público (workers.dev). NO cambiar sin actualizar sitemap/canonical. */
  domain: 'https://empiezagratis.ofmtop.workers.dev',

  /**
   * Fuente única del logo en toda la web.
   * Se muestra siempre dentro de un marco circular (.logo-mark en CSS).
   */
  logo:
    'https://raw.githubusercontent.com/elvividorfollador96-cpu/EMPIEZAGRATIS/refs/heads/main/1.png',

  social: Object.freeze({
    instagram: 'https://www.instagram.com/ofm.top/',
    threads: 'https://www.threads.com/@ofm.top',
  }),

  /** Datos legales oficiales del titular (sin NIF/CIF y sin dominio propio: no existen). */
  legal: Object.freeze({
    owner: 'OFM TOP',
    address: 'Calle Plaza del Sol 14, 6ºA — Móstoles, Madrid (España)',
    /**
     * Email de contacto: NUNCA se muestra como texto visible en la web;
     * solo como enlace mailto (ver contactLink() en utils.js).
     */
    email: 'contacto.starupmentor@gmail.com',
    contactLabel: 'Contactar',
  }),

  /**
   * Los cuatro formularios de captación. Cada uno conserva su Google Form
   * original (mismo ID, misma hoja de respuestas/CRM).
   */
  forms: Object.freeze({
    /* ── CREADORAS A) Empezar en OnlyFans ─────────────────────────────── */
    empezar: makeForm({
      id: '1FAIpQLSe49DpRZ_QPeET3wexkLEjMZ23ojZwdM6e3sCUdaMcc_pCZKg',
      kind: 'creadoras',
      kindLabel: 'Creadoras',
      guide: 'Tu primer mes en OnlyFans',
      guideHref: '/creadoras/empezar',
      fields: [
        { k: 'nombre', entry: '926132403', t: 'text', label: 'Nombre', ac: 'name', req: true },
        { k: 'email', entry: '417115347', t: 'email', label: 'Email', ac: 'email', req: true },
        { k: 'whatsapp', entry: '156670240', t: 'tel', label: 'WhatsApp / teléfono', ac: 'tel', req: true, hint: 'Te enviaremos la guía por aquí' },
        { k: 'instagram', entry: '865152098', t: 'text', label: 'Instagram', ac: 'off', hint: 'Opcional', ph: 'tuusuario', g: 'more' },
        { k: 'x', entry: '937158273', t: 'text', label: 'X / Twitter', ac: 'off', hint: 'Opcional', g: 'more' },
        { k: 'threads', entry: '1034787982', t: 'text', label: 'Threads', ac: 'off', hint: 'Opcional', g: 'more' },
        {
          k: 'situacion', entry: '942047099', t: 'select', req: true,
          label: '¿Cuál describe mejor tu situación actual?', ph: 'Elige una opción',
          options: ['Todavía no tengo OnlyFans', 'Tengo cuenta pero estoy empezando', 'Tengo cuenta pero no consigo crecer', 'Tengo seguidores pero pocos suscriptores', 'Ya genero dinero y quiero escalar', 'Estoy valorando empezar'],
        },
        { k: 'experiencia', entry: '286954665', t: 'select', req: true, label: '¿Qué experiencia tienes?', ph: 'Elige una opción', options: EXP_OPTIONS },
        { k: 'audiencia', entry: '832033020', t: 'select', req: true, label: '¿Tienes actualmente audiencia en redes?', ph: 'Elige una opción', options: AUDIENCE_OPTIONS },
        {
          k: 'ingresos', entry: '538912439', t: 'select', req: true,
          label: 'Ingresos actuales aproximados con OnlyFans', ph: 'Elige una opción',
          options: ['Todavía no tengo cuenta', 'Tengo cuenta pero aún no genero', 'Menos de 500 €/mes', '500–1.500 €/mes', '1.500–5.000 €/mes', 'Más de 5.000 €/mes'],
        },
        { k: 'objetivo', entry: '619708050', t: 'textarea', req: true, label: '¿Qué quieres conseguir con tu cuenta?', ph: 'Cuéntalo brevemente' },
        { k: 'edad', entry: '127095517', t: 'check', req: true, label: AGE_VALUE, value: AGE_VALUE },
        { k: 'privacidad', entry: '168445616', t: 'check', req: true, label: PRIVACY_VALUE, value: PRIVACY_VALUE, links: true },
        { k: 'marketing', entry: '135486977', t: 'check', req: false, label: 'Quiero recibir novedades, recursos y comunicaciones de OFM TOP.', value: MARKETING_VALUE },
      ],
    }),

    /* ── CREADORAS B) Crecer y escalar ────────────────────────────────── */
    escalar: makeForm({
      id: '1FAIpQLSf3n29jDlJZa96jnhXM7c-5vL5w-IpK7Us4e9S2pjzh2-TmKg',
      kind: 'creadoras',
      kindLabel: 'Creadoras',
      guide: 'Cómo crecer y escalar una cuenta de OnlyFans',
      guideHref: '/creadoras/escalar',
      fields: [
        { k: 'nombre', entry: '2097946739', t: 'text', label: 'Nombre', ac: 'name', req: true },
        { k: 'email', entry: '1039269640', t: 'email', label: 'Email', ac: 'email', req: true },
        { k: 'whatsapp', entry: '451485418', t: 'tel', label: 'WhatsApp / teléfono', ac: 'tel', req: true, hint: 'Te enviaremos la guía por aquí' },
        { k: 'instagram', entry: '357297570', t: 'text', label: 'Instagram', ac: 'off', hint: 'Opcional', ph: 'tuusuario', g: 'more' },
        { k: 'x', entry: '1407870938', t: 'text', label: 'X / Twitter', ac: 'off', hint: 'Opcional', g: 'more' },
        { k: 'threads', entry: '1499032316', t: 'text', label: 'Threads', ac: 'off', hint: 'Opcional', g: 'more' },
        {
          k: 'situacion', entry: '179507811', t: 'select', req: true,
          label: '¿Cuál describe mejor tu situación actual?', ph: 'Elige una opción',
          options: ['Todavía no tengo OnlyFans', 'Tengo cuenta pero estoy empezando', 'Tengo cuenta pero no consigo crecer', 'Tengo seguidores pero pocos suscriptores', 'Ya genero dinero y quiero escalar', 'Estoy valorando empezar'],
        },
        { k: 'experiencia', entry: '1369207163', t: 'select', req: true, label: '¿Qué experiencia tienes?', ph: 'Elige una opción', options: EXP_OPTIONS },
        { k: 'audiencia', entry: '1978745881', t: 'select', req: true, label: '¿Tienes actualmente audiencia en redes?', ph: 'Elige una opción', options: AUDIENCE_OPTIONS },
        {
          k: 'ingresos', entry: '244501740', t: 'select', req: true,
          label: 'Ingresos actuales aproximados con OnlyFans', ph: 'Elige una opción',
          options: ['Todavía no tengo cuenta', 'Tengo cuenta pero aún no genero', 'Menos de 500 €/mes', '500–1.500 €/mes', '1.500–5.000 €/mes', 'Más de 5.000 €/mes'],
        },
        { k: 'objetivo', entry: '803322735', t: 'textarea', req: true, label: '¿Qué quieres conseguir con tu cuenta?', ph: 'Cuéntalo brevemente' },
        { k: 'edad', entry: '823922150', t: 'check', req: true, label: AGE_VALUE, value: AGE_VALUE },
        { k: 'privacidad', entry: '23172599', t: 'check', req: true, label: PRIVACY_VALUE, value: PRIVACY_VALUE, links: true },
        { k: 'marketing', entry: '645168306', t: 'check', req: false, label: 'Quiero recibir novedades, recursos y comunicaciones de OFM TOP.', value: MARKETING_VALUE },
      ],
    }),

    /* ── OFM C) Modelos reales ────────────────────────────────────────── */
    reales: makeForm({
      id: '1FAIpQLSdea3iZlCktl7NVY2SJ8jHjwWKeniZC_6-AVM6q5hegkKq6gg',
      kind: 'ofm',
      kindLabel: 'OFM',
      guide: 'OFM desde cero: modelos reales',
      guideHref: '/ofm/modelos-reales',
      fields: [
        { k: 'nombre', entry: '508171825', t: 'text', label: 'Nombre', ac: 'name', req: true },
        { k: 'email', entry: '336290114', t: 'email', label: 'Email', ac: 'email', req: true },
        { k: 'whatsapp', entry: '92091299', t: 'tel', label: 'WhatsApp / teléfono', ac: 'tel', req: true, hint: 'Te enviaremos la guía por aquí' },
        { k: 'instagram', entry: '361219190', t: 'text', label: 'Instagram', ac: 'off', hint: 'Opcional', ph: 'tuusuario', g: 'more' },
        { k: 'x', entry: '2129261344', t: 'text', label: 'X / Twitter', ac: 'off', hint: 'Opcional', g: 'more' },
        { k: 'threads', entry: '466949815', t: 'text', label: 'Threads', ac: 'off', hint: 'Opcional', g: 'more' },
        {
          k: 'situacion', entry: '155373830', t: 'select', req: true,
          label: '¿Cuál describe mejor tu situación actual?', ph: 'Elige una opción',
          options: ['No tengo experiencia en OFM', 'Estoy empezando a aprender OFM', 'Ya he trabajado con modelos', 'Ya gestiono alguna cuenta', 'Quiero montar mi propia agencia', 'Quiero aprender antes de empezar'],
        },
        { k: 'experiencia', entry: '779744389', t: 'select', req: true, label: '¿Qué experiencia tienes?', ph: 'Elige una opción', options: EXP_OPTIONS },
        { k: 'audiencia', entry: '371670465', t: 'select', req: true, label: '¿Tienes actualmente audiencia o tráfico?', ph: 'Elige una opción', options: AUDIENCE_OPTIONS },
        { k: 'objetivo', entry: '1703598166', t: 'textarea', req: true, label: '¿Qué quieres conseguir aprendiendo OFM?', ph: 'Cuéntalo brevemente' },
        { k: 'edad', entry: '1722391411', t: 'check', req: true, label: AGE_VALUE, value: AGE_VALUE },
        { k: 'privacidad', entry: '1691924798', t: 'check', req: true, label: PRIVACY_VALUE, value: PRIVACY_VALUE, links: true },
        { k: 'marketing', entry: '672836837', t: 'check', req: false, label: 'Quiero recibir novedades, recursos y comunicaciones de OFM TOP.', value: MARKETING_VALUE },
      ],
    }),

    /* ── OFM D) Modelos IA ────────────────────────────────────────────── */
    ia: makeForm({
      id: '1FAIpQLSeoBChY7EoVpjW5dp4W5R5FLLtglcuB-VE5Bpf73Rv-X67BKQ',
      kind: 'ofm',
      kindLabel: 'OFM',
      guide: 'Cómo construir un proyecto de modelo virtual con IA',
      guideHref: '/ofm/modelos-ia',
      fields: [
        { k: 'nombre', entry: '1019620434', t: 'text', label: 'Nombre', ac: 'name', req: true },
        { k: 'email', entry: '1898824334', t: 'email', label: 'Email', ac: 'email', req: true },
        { k: 'whatsapp', entry: '981713866', t: 'tel', label: 'WhatsApp / teléfono', ac: 'tel', req: true, hint: 'Te enviaremos la guía por aquí' },
        { k: 'instagram', entry: '834930237', t: 'text', label: 'Instagram', ac: 'off', hint: 'Opcional', ph: 'tuusuario', g: 'more' },
        { k: 'x', entry: '128875942', t: 'text', label: 'X / Twitter', ac: 'off', hint: 'Opcional', g: 'more' },
        { k: 'threads', entry: '393995277', t: 'text', label: 'Threads', ac: 'off', hint: 'Opcional', g: 'more' },
        {
          k: 'situacion', entry: '998920143', t: 'select', req: true,
          label: '¿Cuál describe mejor tu situación actual?', ph: 'Elige una opción',
          options: ['No tengo experiencia en OFM', 'Estoy empezando a aprender OFM', 'Ya he trabajado con modelos', 'Ya gestiono alguna cuenta', 'Quiero montar mi propia agencia', 'Quiero aprender antes de empezar'],
        },
        { k: 'experiencia', entry: '566772433', t: 'select', req: true, label: '¿Qué experiencia tienes?', ph: 'Elige una opción', options: EXP_OPTIONS },
        { k: 'audiencia', entry: '795784272', t: 'select', req: true, label: '¿Tienes actualmente audiencia o tráfico?', ph: 'Elige una opción', options: AUDIENCE_OPTIONS },
        { k: 'objetivo', entry: '246811380', t: 'textarea', req: true, label: '¿Qué quieres conseguir aprendiendo OFM?', ph: 'Cuéntalo brevemente' },
        { k: 'edad', entry: '990780070', t: 'check', req: true, label: AGE_VALUE, value: AGE_VALUE },
        { k: 'privacidad', entry: '792280431', t: 'check', req: true, label: PRIVACY_VALUE, value: PRIVACY_VALUE, links: true },
        { k: 'marketing', entry: '1368357081', t: 'check', req: false, label: 'Quiero recibir novedades, recursos y comunicaciones de OFM TOP.', value: MARKETING_VALUE },
      ],
    }),
  }),

  /**
   * Grupos para el selector de camino ("Quiero la guía gratis" en hubs/home).
   * El usuario elige y se abre el formulario correspondiente.
   */
  formGroups: Object.freeze({
    creadoras: Object.freeze([
      { key: 'empezar', label: 'Empezar en OnlyFans', desc: 'Todavía no tengo cuenta o estoy empezando' },
      { key: 'escalar', label: 'Crecer y escalar', desc: 'Ya tengo cuenta y quiero crecer' },
    ]),
    ofm: Object.freeze([
      { key: 'reales', label: 'Modelos reales', desc: 'OFM desde cero con creadoras reales' },
      { key: 'ia', label: 'Modelos IA', desc: 'Proyecto de modelo virtual con IA' },
    ]),
  }),

  /** Parámetros UTM reconocidos (preparado para CRM/analytics futuros). */
  utmParams: Object.freeze([
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ]),
});

/** FIN — la fuente de verdad de los entry.* son los Google Forms publicados. */
