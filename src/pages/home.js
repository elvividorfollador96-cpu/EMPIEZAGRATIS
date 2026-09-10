import { CONFIG } from '../config.js';
import { ctaOption } from '../components.js';

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
  { tag: 'Creadora', label: 'Empezar en OnlyFans', href: '/creadoras/empezar' },
  { tag: 'Creadora', label: 'Crecer y escalar', href: '/creadoras/escalar' },
  { tag: 'OFM', label: 'Modelos reales', href: '/ofm/modelos-reales' },
  { tag: 'OFM', label: 'Modelos IA', href: '/ofm/modelos-ia' },
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
      `    <div class="paths">` +
      `      <article class="path-card d2" data-reveal>` +
      `        <p class="eyebrow">Soy creadora</p>` +
      `        <h2>Quiero convertir OnlyFans en un proyecto serio.</h2>` +
      `        <div class="path-actions">` +
      `          <a class="btn btn-primary btn-block" href="/creadoras/empezar">Empezar en OnlyFans</a>` +
      `          <a class="btn btn-ghost btn-block" href="/creadoras/escalar">Crecer y escalar mi cuenta</a>` +
      `        </div>` +
      `      </article>` +
      `      <article class="path-card d3" data-reveal>` +
      `        <p class="eyebrow">Quiero ser OFM</p>` +
      `        <h2>Aprende a construir y gestionar proyectos de creadoras.</h2>` +
      `        <div class="path-actions">` +
      `          <a class="btn btn-primary btn-block" href="/ofm/modelos-reales">Modelos reales</a>` +
      `          <a class="btn btn-ghost btn-block" href="/ofm/modelos-ia">Modelos IA</a>` +
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
