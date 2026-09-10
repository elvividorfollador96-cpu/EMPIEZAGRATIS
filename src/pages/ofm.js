import { CONFIG } from '../config.js';
import { breadcrumb, ICONS } from '../components.js';

/** Bloques de aprendizaje (sin descripciones inventadas: número + concepto). */
const LEARN = [
  { n: '01', t: 'Tráfico' },
  { n: '02', t: 'Contenido' },
  { n: '03', t: 'Conversión' },
  { n: '04', t: 'Gestión' },
  { n: '05', t: 'Métricas' },
  { n: '06', t: 'Escalado' },
];

/** Imagen optimizada (WebP + JPEG de respaldo) integrada en el diseño. */
function picture({ base, alt, width, height, lazy = true }) {
  const load = lazy
    ? 'loading="lazy" decoding="async"'
    : 'loading="eager" fetchpriority="high" decoding="async"';
  return (
    `<picture>` +
    `<source type="image/webp" srcset="/img/${base}.webp">` +
    `<img src="/img/${base}.jpg" alt="${alt}" width="${width}" height="${height}" ${load}>` +
    `</picture>`
  );
}

/** Tarjeta de guía: imagen + badge GUÍA GRATIS + CTA al formulario público. */
function guideCard({ media, alt, eyebrow, title, desc, formKey, moreHref, delay }) {
  const formUrl = CONFIG.forms[formKey];
  return (
    `<article class="guide-card ${delay}" data-reveal>` +
    `  <div class="guide-media">` +
    `    <span class="guide-chip" aria-hidden="true">Guía gratis</span>` +
    picture({ base: media, alt, width: 1000, height: 666 }) +
    `  </div>` +
    `  <div class="guide-body">` +
    `    <p class="eyebrow">${eyebrow}</p>` +
    `    <h3>${title}</h3>` +
    `    <p>${desc}</p>` +
    `    <a class="btn btn-primary btn-block btn-caps" href="${formUrl}" target="_blank" rel="noopener">` +
    `      Quiero la guía gratis ${ICONS.external}` +
    `    </a>` +
    `    <a class="guide-more" href="${moreHref}">Ver el temario completo →</a>` +
    `  </div>` +
    `</article>`
  );
}

export default {
  path: '/ofm',
  seo: {
    title: 'Guías gratuitas para aprender OFM desde cero · OFM TOP',
    description:
      'Consigue gratis una guía OFM: elige modelos reales o modelos virtuales con IA y aprende los fundamentos para construir tu proyecto desde cero.',
    headingId: 'page-title',
  },
  content() {
    const learn = LEARN.map(
      (l, i) =>
        `<li class="learn-item d${(i % 4) + 1}" data-reveal>` +
        `<span class="learn-n" aria-hidden="true">${l.n}</span>` +
        `<h3>${l.t}</h3>` +
        `</li>`,
    ).join('\n');

    return (
      // HERO: badge GUÍA GRATUITA + titular + CTA + visual
      `<section class="hero ofm-hero">` +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { label: 'OFM' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="hero-badge"><span class="hero-badge-dot" aria-hidden="true"></span>Guía gratuita</p>` +
      `      <h1 id="page-title" class="hero-title">Aprende a construir tu proyecto OFM</h1>` +
      `      <p class="hero-sub">Aprende cómo funciona el mundo OFM, qué necesitas para empezar y cómo estructurar un proyecto desde cero.</p>` +
      `      <div class="hero-actions">` +
      `        <a class="btn btn-primary btn-lg" href="#guias">Ver las guías gratis</a>` +
      `      </div>` +
      `    </div>` +
      `    <div class="ofm-hero-visual d2" data-reveal>` +
      picture({
        base: 'direccion-modelo-virtual',
        alt: 'Dirección de arte de espaldas ante dos monitores con la hoja de personaje de un modelo virtual',
        width: 1280,
        height: 853,
        lazy: false,
      }) +
      `    </div>` +
      `  </div>` +
      `</section>` +
      // GUÍAS GRATUITAS: dos tarjetas con imagen y CTA al formulario
      `<section class="section" id="guias" aria-labelledby="guias-title">` +
      `  <div class="container">` +
      `    <div class="section-head section-head-center" data-reveal>` +
      `      <p class="eyebrow">Elige tu camino</p>` +
      `      <h2 id="guias-title" class="h2-caps">Guías gratuitas</h2>` +
      `      <p class="section-lead">Elige el camino que quieres aprender y recibe nuestra guía gratuita.</p>` +
      `    </div>` +
      `    <div class="guide-grid">` +
      guideCard({
        media: 'set-grabacion-reales',
        alt: 'Set de grabación con aro de luz y móvil: una mano del equipo ajusta el soporte junto a la cámara',
        eyebrow: 'Modelos reales',
        title: 'OFM desde cero: modelos reales',
        desc: 'Aprende los fundamentos para trabajar con modelos reales y construir un sistema de crecimiento.',
        formKey: 'modelosReales',
        moreHref: '/ofm/modelos-reales',
        delay: 'd1',
      }) +
      guideCard({
        media: 'gen-modelo-virtual',
        alt: 'Monitor con una retícula de variaciones del mismo modelo virtual generadas con IA',
        eyebrow: 'Modelos IA',
        title: 'Construye un proyecto de modelo virtual con IA',
        desc: 'Aprende los fundamentos para crear y desarrollar un proyecto alrededor de modelos virtuales generados con IA.',
        formKey: 'modelosIA',
        moreHref: '/ofm/modelos-ia',
        delay: 'd2',
      }) +
      `    </div>` +
      `  </div>` +
      `</section>` +
      // ¿QUÉ VAS A APRENDER?
      `<section class="section section-alt" aria-labelledby="aprender-title">` +
      `  <div class="container">` +
      `    <div class="section-head section-head-center" data-reveal>` +
      `      <p class="eyebrow">OFM TOP</p>` +
      `      <h2 id="aprender-title">¿Qué vas a aprender?</h2>` +
      `    </div>` +
      `    <ul class="learn-grid">${learn}</ul>` +
      `  </div>` +
      `</section>` +
      // CTA FINAL
      `<section class="section cta-final" aria-labelledby="ofm-cta-title">` +
      `  <div class="container container-narrow">` +
      `    <div class="section-head section-head-center" data-reveal>` +
      `      <h2 id="ofm-cta-title">Empieza gratis.</h2>` +
      `      <p class="section-lead">Elige una guía y empieza a aprender.</p>` +
      `    </div>` +
      `    <div class="cta-grid">` +
      `      <a class="cta-option" href="${CONFIG.forms.modelosReales}" target="_blank" rel="noopener" data-reveal>` +
      `        <span class="cta-tag">Guía gratis</span>` +
      `        <span class="cta-label">Modelos reales</span>` +
      `        ${ICONS.external}` +
      `      </a>` +
      `      <a class="cta-option d1" href="${CONFIG.forms.modelosIA}" target="_blank" rel="noopener" data-reveal>` +
      `        <span class="cta-tag">Guía gratis</span>` +
      `        <span class="cta-label">Modelos IA</span>` +
      `        ${ICONS.external}` +
      `      </a>` +
      `    </div>` +
      `  </div>` +
      `</section>`
    );
  },
};
