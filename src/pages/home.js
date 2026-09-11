import { CONFIG } from '../config.js';
import { ctaOption, heroBg, picture } from '../components.js';

const PILLARS = [
  'Adquisición de tráfico',
  'Crecimiento de audiencia',
  'Estrategia de contenido',
  'Conversión',
  'Gestión',
  'Análisis de métricas',
  'Optimización',
  'Escalado',
];

const STEPS = [
  {
    n: '01',
    t: 'Cuéntanos dónde estás',
    d: 'Eliges tu camino y respondes unas pocas preguntas sobre tu punto de partida.',
  },
  {
    n: '02',
    t: 'Recibe el recurso adecuado',
    d: 'Te llega el recurso pensado para tu situación. Sin ruido y sin promesas.',
  },
  {
    n: '03',
    t: 'Empieza a construir tu proyecto',
    d: 'Aplicas los pasos con una estructura clara desde el primer día.',
  },
];

const OPTIONS = [
  { tag: 'Creadora', label: 'Empezar en OnlyFans', formKey: 'empezar' },
  { tag: 'Creadora', label: 'Crecer y escalar', formKey: 'escalar' },
  { tag: 'OFM', label: 'Modelos reales', formKey: 'reales' },
  { tag: 'OFM', label: 'Modelos IA', formKey: 'ia' },
];

export default {
  path: '/',
  seo: {
    title: 'OFM TOP · No se trata de publicar más, se trata de hacerlo mejor',
    description:
      'Estrategia, crecimiento y gestión para creadoras de OnlyFans. Formación y recursos para quienes quieren trabajar como OFM.',
    headingId: 'hero-title',
  },
  content() {
    const steps = STEPS.map(
      (s, i) =>
        `<li class="step d${i + 1}" data-reveal>` +
        `<span class="step-n" aria-hidden="true">${s.n}</span>` +
        `<h3>${s.t}</h3>` +
        `<p>${s.d}</p>` +
        `</li>`,
    ).join('\n');

    const pillars = PILLARS.map((p) => `<li><span class="pillar-dot" aria-hidden="true"></span>${p}</li>`).join('\n');

    const options = OPTIONS.map((o) => ctaOption(o)).join('\n');

    return (
      // HERO
      `<section class="hero">` +
      heroBg('hero-home-agencia') +
      `  <div class="container">` +
      `    <div class="hero-logo" data-reveal>` +
      `      <span class="logo-mark logo-mark-hero" aria-hidden="true">` +
      `        <img class="logo-img" src="${CONFIG.logo}" alt="" width="2000" height="2000" fetchpriority="high" decoding="async">` +
      `        <span class="logo-fallback">OFM</span>` +
      `      </span>` +
      `    </div>` +
      `    <div class="hero-tag-row d1" data-reveal>` +
      `      <span class="eyebrow">${CONFIG.brand.name}</span>` +
      `      <span class="age-chip">${CONFIG.brand.age}+</span>` +
      `    </div>` +
      `    <h1 id="hero-title" class="hero-title d1" data-reveal>No se trata de publicar más.<br>Se trata de hacerlo mejor.</h1>` +
      `    <p class="hero-sub d2" data-reveal>${CONFIG.brand.description}</p>` +
      `  </div>` +
      `</section>` +
      // GUÍAS GRATIS COMO EJE
      `<section class="section paths-section" aria-labelledby="guias-title">` +
      `  <div class="container">` +
      `    <div class="section-head" data-reveal>` +
      `      <p class="eyebrow">Guías gratuitas</p>` +
      `      <h2 id="guias-title">Elige tu camino y recibe tu guía gratis</h2>` +
      `      <p class="section-lead">Sea cual sea tu punto de partida, al elegir tu camino recibes nuestra guía gratuita.</p>` +
      `    </div>` +
      `    <div class="guide-grid guide-grid-4">` +
      `      <article class="guide-card d1" data-reveal>` +
      `        <div class="guide-media">` +
      `          <span class="guide-chip">Guía gratis</span>` +
      picture({
        base: 'creacion-empezar',
        alt: 'Escritorio de creadora en casa: móvil en trípode con aro de luz, libreta de notas y té',
        width: 1000,
        height: 666,
      }) +
      `        </div>` +
      `        <div class="guide-body">` +
      `          <p class="eyebrow">Creadora</p>` +
      `          <h3>Empezar en OnlyFans</h3>` +
      `          <p>Para quienes todavía no han empezado o están dando sus primeros pasos.</p>` +
      `          <a class="btn btn-primary btn-block btn-caps" href="${CONFIG.forms.empezar.url}" data-form-link="empezar">Quiero mi guía gratis</a>` +
      `        </div>` +
      `      </article>` +
      `      <article class="guide-card d2" data-reveal>` +
      `        <div class="guide-media">` +
      `          <span class="guide-chip">Guía gratis</span>` +
      picture({
        base: 'analitica-escalar',
        alt: 'Mano señalando una curva de crecimiento ascendente en un monitor con notas adhesivas',
        width: 1000,
        height: 666,
      }) +
      `        </div>` +
      `        <div class="guide-body">` +
      `          <p class="eyebrow">Creadora</p>` +
      `          <h3>Crecer y escalar</h3>` +
      `          <p>Para creadoras que ya tienen una cuenta y quieren mejorar tráfico, conversión y estructura.</p>` +
      `          <a class="btn btn-primary btn-block btn-caps" href="${CONFIG.forms.escalar.url}" data-form-link="escalar">Quiero mi guía gratis</a>` +
      `        </div>` +
      `      </article>` +
      `      <article class="guide-card d3" data-reveal>` +
      `        <div class="guide-media">` +
      `          <span class="guide-chip">Guía gratis</span>` +
      picture({
        base: 'set-grabacion-reales',
        alt: 'Set de grabación con aro de luz y móvil: una mano del equipo ajusta el soporte junto a la cámara',
        width: 1000,
        height: 666,
      }) +
      `        </div>` +
      `        <div class="guide-body">` +
      `          <p class="eyebrow">OFM</p>` +
      `          <h3>Modelos reales</h3>` +
      `          <p>Aprende los fundamentos para trabajar con modelos reales y construir un sistema de crecimiento.</p>` +
      `          <a class="btn btn-primary btn-block btn-caps" href="${CONFIG.forms.reales.url}" data-form-link="reales">Quiero mi guía gratis</a>` +
      `        </div>` +
      `      </article>` +
      `      <article class="guide-card d4" data-reveal>` +
      `        <div class="guide-media">` +
      `          <span class="guide-chip">Guía gratis</span>` +
      picture({
        base: 'gen-modelo-virtual',
        alt: 'Monitor con una retícula de variaciones del mismo modelo virtual generadas con IA',
        width: 1000,
        height: 666,
      }) +
      `        </div>` +
      `        <div class="guide-body">` +
      `          <p class="eyebrow">OFM</p>` +
      `          <h3>Modelos IA</h3>` +
      `          <p>Aprende los fundamentos para crear y desarrollar un proyecto alrededor de modelos virtuales generados con IA.</p>` +
      `          <a class="btn btn-primary btn-block btn-caps" href="${CONFIG.forms.ia.url}" data-form-link="ia">Quiero mi guía gratis</a>` +
      `        </div>` +
      `      </article>` +
      `    </div>` +
      `  </div>` +
      `</section>` +
      // ¿CÓMO FUNCIONA?
      `<section class="section" aria-labelledby="como-funciona">` +
      `  <div class="container">` +
      `    <div class="section-head" data-reveal>` +
      `      <p class="eyebrow">¿Cómo funciona?</p>` +
      `      <h2 id="como-funciona">Tres pasos, sin fricción.</h2>` +
      `    </div>` +
      `    <ol class="steps">${steps}</ol>` +
      `  </div>` +
      `</section>` +
      // OFM TOP
      `<section class="section section-alt" aria-labelledby="ofmtop-title">` +
      `  <div class="container">` +
      `    <div class="section-head" data-reveal>` +
      `      <p class="eyebrow">${CONFIG.brand.name}</p>` +
      `      <h2 id="ofmtop-title">Estructura para cada pieza del proyecto.</h2>` +
      `      <p class="section-lead">OFM TOP ayuda a estructurar proyectos de creadoras alrededor de las piezas que de verdad marcan la diferencia:</p>` +
      `    </div>` +
      `    <ul class="pillars" data-reveal>` + pillars + `</ul>` +
      `    <p class="fineprint" data-reveal>Ningún recurso de este sitio garantiza ingresos o resultados. El crecimiento depende de la ejecución, la constancia y el contexto de cada proyecto.</p>` +
      `  </div>` +
      `</section>` +
      // CTA FINAL
      `<section class="section cta-final" id="empezar" aria-labelledby="cta-title">` +
      `  <div class="container container-narrow">` +
      `    <div class="section-head section-head-center" data-reveal>` +
      `      <p class="eyebrow">Elige tu camino</p>` +
      `      <h2 id="cta-title">¿Dónde quieres empezar?</h2>` +
      `    </div>` +
      `    <div class="cta-grid">${options}</div>` +
      `  </div>` +
      `</section>`
    );
  },
};
