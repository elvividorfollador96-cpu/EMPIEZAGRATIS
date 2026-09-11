import { CONFIG } from '../config.js';
import { breadcrumb, guideCard, ICONS, heroBg } from '../components.js';

/** Bloques de aprendizaje (sin descripciones inventadas: número + concepto). */
const LEARN = [
  { n: '01', t: 'Tráfico' },
  { n: '02', t: 'Contenido' },
  { n: '03', t: 'Conversión' },
  { n: '04', t: 'Gestión' },
  { n: '05', t: 'Métricas' },
  { n: '06', t: 'Escalado' },
];

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
      // HERO: badge GUÍA GRATUITA + titular + CTA con fondo fotográfico
      `<section class="hero ofm-hero">` +
      heroBg('direccion-modelo-virtual') +
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
