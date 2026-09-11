import { CONFIG } from '../config.js';
import { ctaOption, guideCard, guideHero } from '../components.js';

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
    title: 'Guía gratis para aprender OFM desde cero · OFM TOP',
    description:
      'Guía gratuita de OFM: elige modelos reales o modelos virtuales con IA y aprende tráfico, captación, contenido, conversión y gestión desde cero.',
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
      // HERO: GUÍA GRATUITA bien visible + CTA principal al formulario integrado
      guideHero({
        bg: 'direccion-modelo-virtual',
        crumbs: [
          { href: '/', label: 'Inicio' },
          { label: 'OFM' },
        ],
        title: 'Aprende OFM desde cero',
        sub: 'Aprende a construir tu proyecto OFM, entender el tráfico, la captación, el contenido, la conversión y la gestión desde cero.',
        ctaHref: CONFIG.forms.reales.url,
        ctaForm: 'choice:ofm',
        ctaLabel: 'Quiero la guía gratis',
        secondary: { href: '#guias', label: 'Ver las guías' },
      }) +
      // GUÍAS GRATUITAS: dos caminos, ambos gratis, formulario integrado
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
        formKey: 'reales',
        moreHref: '/ofm/modelos-reales',
        delay: 'd1',
      }) +
      guideCard({
        media: 'gen-modelo-virtual',
        alt: 'Monitor con una retícula de variaciones del mismo modelo virtual generadas con IA',
        eyebrow: 'Modelos IA',
        title: 'Cómo construir un proyecto de modelo virtual con IA',
        desc: 'Aprende cómo plantear identidad, contenido, tráfico y monetización de un proyecto de modelo virtual.',
        formKey: 'ia',
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
      // CTA FINAL: formulario integrado
      `<section class="section cta-final" aria-labelledby="ofm-cta-title">` +
      `  <div class="container container-narrow">` +
      `    <div class="section-head section-head-center" data-reveal>` +
      `      <h2 id="ofm-cta-title">Empieza gratis.</h2>` +
      `      <p class="section-lead">Elige una guía y empieza a aprender.</p>` +
      `    </div>` +
      `    <div class="cta-grid">` +
      ctaOption({ tag: 'Guía gratis', label: 'Modelos reales', formKey: 'reales' }) +
      ctaOption({ tag: 'Guía gratis', label: 'Modelos IA', formKey: 'ia', delay: 'd1' }) +
      `    </div>` +
      `  </div>` +
      `</section>`
    );
  },
};
