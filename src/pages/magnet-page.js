import { breadcrumb, ICONS } from '../components.js';
import { contactLink } from '../utils.js';

/**
 * Fábrica de páginas Lead Magnet (diseño actual de la web, sin rediseño).
 * Estructura: portada (hero con fondo fotográfico) → introducción →
 * índice de bloques → bloques (contenido por desarrollar, marcado) →
 * CTA final hacia OFM TOP.
 *
 * `sections` admite dos formas de bloque:
 *   { n, t, d }            → bloque pendiente de desarrollar (placeholder)
 *   { n, t, d, body: [ … ] } → bloque con contenido real (párrafos/lista)
 * El cuerpo real se añadirá en la siguiente fase; hoy se muestra el
 * aviso «En preparación» solo en los bloques sin `body`.
 */
export function magnetPage({ path, seo, eyebrow, title, intro, sections, bg, crumbs, ctaKey, moreHref, moreLabel, heroBgFn, domain, age }) {
  if (!path || !seo || !Array.isArray(sections)) {
    throw new Error('magnetPage: faltan datos base');
  }

  const index = sections
    .map(
      (s) =>
        `<li><span class="mi-n" aria-hidden="true">${s.n}</span>` +
        `<div><h3>${s.t}</h3><p>${s.d}</p></div></li>`,
    )
    .join('\n');

  const blocks = sections
    .map((s) => {
      let body = '';
      if (Array.isArray(s.body) && s.body.length) {
        body = s.body
          .map((b) => {
            if (typeof b === 'string') return `<p>${b}</p>`;
            if (b.ul) return `<ul>${b.ul.map((li) => `<li>${li}</li>`).join('')}</ul>`;
            return '';
          })
          .join('\n');
      } else {
        body =
          `<p class="magnet-todo">${ICONS.info}` +
          `  <span><strong>En preparación.</strong> Este bloque se completará con el contenido de la guía. La estructura del recurso ya está definida.</span>` +
          `</p>`;
      }
      return (
        `<article class="magnet-block" id="bloque-${s.n}" data-reveal>` +
        `<p class="magnet-block-n" aria-hidden="true">${s.n}</p>` +
        `<h3>${s.t}</h3>` +
        `<p class="magnet-block-d">${s.d}</p>` +
        body +
        `</article>`
      );
    })
    .join('\n');

  const tocLinks = sections
    .map((s) => `<a href="#bloque-${s.n}">${s.n} · ${s.t}</a>`)
    .join('');

  return {
    path,
    seo,
    content() {
      return (
        // PORTADA
        `<section class="hero ofm-hero magnet-hero">` +
        heroBgFn(bg) +
        `  <div class="container">` +
        breadcrumb(crumbs) +
        `    <div data-reveal>` +
        `      <p class="hero-badge"><span class="hero-badge-dot" aria-hidden="true"></span>Guía gratuita</p>` +
        `      <h1 id="page-title" class="hero-title">${title}</h1>` +
        `      <p class="hero-sub">Recurso gratuito de OFM TOP. Sin coste y sin promesas: estructura y criterio para construir tu proyecto.</p>` +
        `      <div class="hero-actions">` +
        `        <a class="btn btn-primary btn-lg btn-caps" href="#contenido-guia">Leer la guía</a>` +
        `      </div>` +
        `    </div>` +
        `  </div>` +
        `</section>` +
        // INTRODUCCIÓN
        `<section class="section" id="contenido-guia" aria-labelledby="intro-title">` +
        `  <div class="container container-narrow">` +
        `    <div class="section-head" data-reveal>` +
        `      <p class="eyebrow">${eyebrow}</p>` +
        `      <h2 id="intro-title">Qué vas a encontrar</h2>` +
        `      <p class="section-lead">${intro}</p>` +
        `    </div>` +
        // ÍNDICE
        `    <nav class="magnet-toc" aria-label="Índice de la guía" data-reveal>` +
        `      <p class="magnet-toc-title">Índice</p>` +
        `      <div class="magnet-toc-links">${tocLinks}</div>` +
        `    </nav>` +
        // BLOQUES
        `    <div class="magnet-blocks">${blocks}</div>` +
        // NOTA LEGAL BREVE
        `    <p class="fineprint" data-reveal>Contenido informativo y formativo. Ningún recurso garantiza ingresos o resultados: el crecimiento depende de la ejecución, la constancia y el contexto de cada proyecto. Servicio exclusivo para mayores de ${age} años.</p>` +
        `  </div>` +
        `</section>` +
        // CTA FINAL HACIA OFM TOP
        `<section class="section section-alt" aria-labelledby="magnet-cta-title">` +
        `  <div class="container container-narrow">` +
        `    <div class="section-head section-head-center" data-reveal>` +
        `      <p class="eyebrow">Siguiente paso</p>` +
        `      <h2 id="magnet-cta-title">¿Quieres estructura para tu proyecto?</h2>` +
        `      <p class="section-lead">Descubre cómo trabaja OFM TOP o elige otra guía gratuita.</p>` +
        `    </div>` +
        `    <div class="cta-grid">` +
        `      <a class="cta-option" href="${moreHref}" data-reveal>` +
        `        <span class="cta-tag">Temario</span>` +
        `        <span class="cta-label">${moreLabel}</span>` +
        `        <span class="cta-arrow" aria-hidden="true">→</span>` +
        `      </a>` +
        `      <a class="cta-option d1" href="/ofm" data-reveal>` +
        `        <span class="cta-tag">OFM TOP</span>` +
        `        <span class="cta-label">Conocer OFM TOP</span>` +
        `        <span class="cta-arrow" aria-hidden="true">→</span>` +
        `      </a>` +
        `    </div>` +
        `    <p class="contact-line" data-reveal>¿Dudas? ${contactLink()}</p>` +
        `  </div>` +
        `</section>`
      );
    },
  };
}
