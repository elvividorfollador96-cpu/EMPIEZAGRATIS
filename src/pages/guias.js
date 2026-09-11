import { CONFIG } from '../config.js';
import { heroBg } from '../components.js';
import { magnetPage } from './magnet-page.js';

/**
 * Páginas Lead Magnet (estructura terminada, contenido por desarrollar):
 *   /guia/primer-mes-en-onlyfans        ← formulario "empezar"
 *   /guia/como-crecer-y-escalar         ← formulario "escalar"
 *   /guia/ofm-desde-cero-modelos-reales ← formulario "reales"
 *   /guia/modelo-virtual-con-ia         ← formulario "ia"
 *
 * Cada página incluye: portada (hero con fondo fotográfico), introducción,
 * índice de bloques, bloques con placeholders [En preparación] y CTA final.
 * El contenido real se añadirá en los slots `sections` de cada página.
 */
function build({ path, title, description, eyebrow, intro, sections, bg, crumbs, ctaKey, moreHref, moreLabel }) {
  return magnetPage({
    path,
    seo: { title, description, headingId: 'page-title' },
    eyebrow,
    title,
    intro,
    sections,
    bg,
    crumbs,
    ctaKey,
    moreHref,
    moreLabel,
    heroBgFn: heroBg,
    domain: CONFIG.domain,
    age: CONFIG.brand.age,
  });
}

/* ── 1. Tu primer mes en OnlyFans ─────────────────────────────────── */
const primerMes = build({
  path: '/guia/primer-mes-en-onlyfans',
  title: 'Tu primer mes en OnlyFans · Guía gratuita · OFM TOP',
  description:
    'Guía gratuita: tu primer mes en OnlyFans paso a paso — preparación, posicionamiento, contenido, tráfico, conversión y organización. De OFM TOP.',
  eyebrow: 'Creadoras · Guía gratis',
  intro:
    'Una guía para entender qué hacer durante tus primeros pasos y evitar empezar sin dirección: qué preparar antes de publicar, cómo posicionar tu cuenta y cómo leer tus primeras señales.',
  sections: [
    { n: '01', t: 'Preparación', d: 'Perfil, presentación y expectativas realistas antes de publicar.' },
    { n: '02', t: 'Posicionamiento', d: 'Qué ofreces, a quién y por qué alguien te sigue.' },
    { n: '03', t: 'Contenido', d: 'Una estructura de contenido sostenible desde el primer día.' },
    { n: '04', t: 'Tráfico', d: 'Cómo consigue tu proyecto ser descubierto fuera de OnlyFans.' },
    { n: '05', t: 'Conversión', d: 'Cómo se transforma un seguidor nuevo en una primera suscripción.' },
    { n: '06', t: 'Organización', d: 'Rutinas y flujo de trabajo para no depender de la inspiración.' },
    { n: '07', t: 'Errores habituales', d: 'Los fallos más comunes de las primeras semanas y cómo evitarlos.' },
    { n: '08', t: 'Primeras métricas', d: 'Qué datos mirar, cuáles ignorar y cómo leer tus primeras señales.' },
  ],
  bg: 'creacion-empezar',
  crumbs: [
    { href: '/', label: 'Inicio' },
    { href: '/creadoras', label: 'Creadoras' },
    { label: 'Tu primer mes' },
  ],
  ctaKey: 'empezar',
  moreHref: '/creadoras/empezar',
  moreLabel: 'Ver el temario completo',
});

/* ── 2. Cómo crecer y escalar una cuenta de OnlyFans ─────────────── */
const crecer = build({
  path: '/guia/como-crecer-y-escalar',
  title: 'Cómo crecer y escalar una cuenta de OnlyFans · Guía gratuita · OFM TOP',
  description:
    'Guía gratuita: cómo crecer y escalar una cuenta de OnlyFans — tráfico, contenido, conversión, retención, análisis y escalado. De OFM TOP.',
  eyebrow: 'Creadoras · Guía gratis',
  intro:
    'Una guía para pasar de publicar sin dirección a trabajar con una estrategia de crecimiento: tráfico, contenido, conversión, retención y análisis, en ese orden.',
  sections: [
    { n: '01', t: 'Adquisición de tráfico', d: 'Fuentes de tráfico y una estrategia que no dependa de un solo canal.' },
    { n: '02', t: 'Contenido', d: 'Calendario, formatos y consistencia para mantener el interés.' },
    { n: '03', t: 'Conversión', d: 'Dónde se está perdiendo la suscripción y cómo corregirlo.' },
    { n: '04', t: 'Retención', d: 'Razones para que la audiencia se quede y vuelva a suscribirse.' },
    { n: '05', t: 'Análisis', d: 'Las métricas que importan y cómo leerlas sin ruido.' },
    { n: '06', t: 'Optimización', d: 'Ajustes basados en datos, no en intuición.' },
    { n: '07', t: 'Escalado', d: 'Estructura el proyecto para crecer sin perder el control.' },
  ],
  bg: 'analitica-escalar',
  crumbs: [
    { href: '/', label: 'Inicio' },
    { href: '/creadoras', label: 'Creadoras' },
    { label: 'Crecer y escalar' },
  ],
  ctaKey: 'escalar',
  moreHref: '/creadoras/escalar',
  moreLabel: 'Ver el temario completo',
});

/* ── 3. OFM desde cero: modelos reales ───────────────────────────── */
const reales = build({
  path: '/guia/ofm-desde-cero-modelos-reales',
  title: 'OFM desde cero: modelos reales · Guía gratuita · OFM TOP',
  description:
    'Guía gratuita de OFM con modelos reales: qué hace un gestor, cómo conseguir modelos, tráfico, contenido, gestión, conversión y métricas. De OFM TOP.',
  eyebrow: 'OFM · Guía gratis',
  intro:
    'Una guía para entender cómo funciona el trabajo de un OFM con creadoras reales: el papel del gestor, la adquisición de modelos y las piezas necesarias para construir un proyecto.',
  sections: [
    { n: '01', t: 'Qué hace un OFM', d: 'Estrategia, operaciones y crecimiento junto a la creadora.' },
    { n: '02', t: 'Adquisición de modelos', d: 'Cómo buscar, evaluar y negociar de forma profesional.' },
    { n: '03', t: 'Posicionamiento', d: 'Definir el ángulo del proyecto antes de invertir en tráfico.' },
    { n: '04', t: 'Adquisición de tráfico', d: 'Canales, contenido y campañas para atraer audiencia.' },
    { n: '05', t: 'Contenido', d: 'Sistemas de contenido que sostienen el crecimiento.' },
    { n: '06', t: 'Gestión', d: 'Comunicación, flujo de trabajo y operaciones del día a día.' },
    { n: '07', t: 'Conversión y métricas', d: 'Cómo se transforma la audiencia en suscripción y qué medir.' },
    { n: '08', t: 'Escalado', d: 'Cómo estructura un proyecto cuando empieza a crecer.' },
  ],
  bg: 'set-grabacion-reales',
  crumbs: [
    { href: '/', label: 'Inicio' },
    { href: '/ofm', label: 'OFM' },
    { label: 'Modelos reales' },
  ],
  ctaKey: 'reales',
  moreHref: '/ofm/modelos-reales',
  moreLabel: 'Ver el temario completo',
});

/* ── 4. Cómo construir un proyecto de modelo virtual con IA ──────── */
const ia = build({
  path: '/guia/modelo-virtual-con-ia',
  title: 'Cómo construir un modelo virtual con IA · Guía gratis · OFM TOP',
  description:
    'Guía gratuita: cómo construir un proyecto de modelo virtual con IA — identidad, branding, generación de contenido, audiencia y monetización. De OFM TOP.',
  eyebrow: 'OFM · Guía gratis',
  intro:
    'Una guía para entender cómo se construye un proyecto de modelo virtual con IA: de la identidad del personaje a la audiencia, pasando por branding, contenido y monetización.',
  sections: [
    { n: '01', t: 'Concepto de modelo virtual', d: 'Qué es, qué es viable hoy y qué expectativas son realistas.' },
    { n: '02', t: 'Identidad', d: 'Personalidad, tono y universo del personaje.' },
    { n: '03', t: 'Branding', d: 'Nombre, estética y coherencia visual.' },
    { n: '04', t: 'Generación de contenido', d: 'Herramientas y flujo de trabajo para producir con consistencia.' },
    { n: '05', t: 'Coherencia de identidad', d: 'Cómo mantiene el personaje una identidad estable.' },
    { n: '06', t: 'Adquisición de audiencia', d: 'Dónde y cómo crece una cuenta de modelo virtual.' },
    { n: '07', t: 'Monetización', d: 'Los modelos de ingresos propios de este tipo de proyecto.' },
    { n: '08', t: 'Escalado', d: 'Cómo escala un proyecto virtual cuando crece la audiencia.' },
  ],
  bg: 'gen-modelo-virtual',
  crumbs: [
    { href: '/', label: 'Inicio' },
    { href: '/ofm', label: 'OFM' },
    { label: 'Modelos IA' },
  ],
  ctaKey: 'ia',
  moreHref: '/ofm/modelos-ia',
  moreLabel: 'Ver el temario completo',
});

export default [primerMes, crecer, reales, ia];
