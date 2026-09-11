import { CONFIG } from '../config.js';
import { ctaOption, guideCard, guideHero } from '../components.js';

/** Bloques de aprendizaje (comunes a las dos guías de creadoras). */
const LEARN = [
  { n: '01', t: 'Preparación' },
  { n: '02', t: 'Posicionamiento' },
  { n: '03', t: 'Contenido' },
  { n: '04', t: 'Tráfico' },
  { n: '05', t: 'Conversión' },
  { n: '06', t: 'Organización' },
];

export default {
  path: '/creadoras',
  seo: {
    title: 'Guías gratuitas para creadoras · OFM TOP — Tu proyecto empieza aquí',
    description:
      'Consigue gratis una guía para creadoras: empieza en OnlyFans desde cero o crece y escala una cuenta activa con tráfico, conversión y estructura.',
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
      // HERO: GUÍA GRATUITA bien visible + CTA al formulario integrado
      guideHero({
        bg: 'creacion-empezar',
        crumbs: [
          { href: '/', label: 'Inicio' },
          { label: 'Creadoras' },
        ],
        title: 'Tu proyecto empieza aquí',
        sub: 'Da el primer paso o encuentra una estructura para llevar tu cuenta al siguiente nivel.',
        ctaHref: CONFIG.forms.empezar.url,
        ctaForm: 'choice:creadoras',
        ctaLabel: 'Quiero la guía gratis',
      }) +
      // GUÍAS GRATUITAS: dos puntos de partida, formulario integrado
      `<section class="section" id="guias" aria-labelledby="guias-title">` +
      `  <div class="container">` +
      `    <div class="section-head section-head-center" data-reveal>` +
      `      <p class="eyebrow">Elige tu punto de partida</p>` +
      `      <h2 id="guias-title" class="h2-caps">Guías gratuitas</h2>` +
      `      <p class="section-lead">Elige el punto de partida que encaja contigo y recibe nuestra guía gratuita.</p>` +
      `    </div>` +
      `    <div class="guide-grid">` +
      guideCard({
        media: 'creacion-empezar',
        alt: 'Escritorio de creadora en casa: móvil en trípode con aro de luz, libreta de notas y té',
        eyebrow: 'Primeros pasos',
        title: 'Empezar en OnlyFans',
        desc: 'Para quienes todavía no han empezado o están dando sus primeros pasos.',
        formKey: 'empezar',
        moreHref: '/creadoras/empezar',
        delay: 'd1',
      }) +
      guideCard({
        media: 'analitica-escalar',
        alt: 'Mano señalando una curva de crecimiento ascendente en un monitor con notas adhesivas',
        eyebrow: 'Cuenta activa',
        title: 'Crecer y escalar',
        desc: 'Para creadoras que ya tienen una cuenta y quieren mejorar tráfico, conversión y estructura.',
        formKey: 'escalar',
        moreHref: '/creadoras/escalar',
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
      `<section class="section cta-final" aria-labelledby="creadoras-cta-title">` +
      `  <div class="container container-narrow">` +
      `    <div class="section-head section-head-center" data-reveal>` +
      `      <h2 id="creadoras-cta-title">Empieza gratis.</h2>` +
      `      <p class="section-lead">Elige tu guía y empieza hoy.</p>` +
      `    </div>` +
      `    <div class="cta-grid">` +
      ctaOption({ tag: 'Guía gratis', label: 'Empezar desde cero', formKey: 'empezar' }) +
      ctaOption({ tag: 'Guía gratis', label: 'Crecer y escalar', formKey: 'escalar', delay: 'd1' }) +
      `    </div>` +
      `  </div>` +
      `</section>`
    );
  },
};
