import { breadcrumb } from '../components.js';

export default {
  path: '/ofm',
  seo: {
    title: 'Aprende a construir proyectos OFM · OFM TOP',
    description:
      'Fundamentos del OFM para trabajar con creadoras: modelos reales o modelos virtuales creados con IA. Construye sistemas de crecimiento.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { label: 'OFM' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">OFM</p>` +
      `      <h1 id="page-title">Aprende a construir proyectos OFM</h1>` +
      `      <p class="page-sub">Aprende los fundamentos para trabajar con creadoras y construir sistemas de crecimiento.</p>` +
      `    </div>` +
      `  </div>` +
      `</section>` +
      `<section class="section">` +
      `  <div class="container container-narrow">` +
      `    <div class="choice-grid">` +
      `      <article class="choice-card d1" data-reveal>` +
      `        <p class="eyebrow">Modelos reales</p>` +
      `        <h2>Aprende a trabajar con modelos reales.</h2>` +
      `        <p>Gestión profesional junto a creadoras: del primer contacto al escalado del proyecto.</p>` +
      `        <a class="btn btn-primary" href="/ofm/modelos-reales">Modelos reales</a>` +
      `      </article>` +
      `      <article class="choice-card d2" data-reveal>` +
      `        <p class="eyebrow">Modelos IA</p>` +
      `        <h2>Aprende a construir un proyecto alrededor de modelos virtuales creados con IA.</h2>` +
      `        <p>Identidad, branding, sistemas de contenido y gestión de un personaje virtual.</p>` +
      `        <a class="btn btn-primary" href="/ofm/modelos-ia">Modelos IA</a>` +
      `      </article>` +
      `    </div>` +
      `  </div>` +
      `</section>`
    );
  },
};
