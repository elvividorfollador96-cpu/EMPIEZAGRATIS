import { breadcrumb } from '../components.js';

export default {
  path: '/creadoras',
  seo: {
    title: 'Creadoras · OFM TOP — Tu proyecto empieza aquí',
    description:
      'Empezar en OnlyFans o crecer y escalar una cuenta existente. Encuentra el recurso adecuado según tu punto de partida.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { label: 'Creadoras' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">Creadoras</p>` +
      `      <h1 id="page-title">Tu proyecto empieza aquí.</h1>` +
      `      <p class="page-sub">Da el primer paso o encuentra una estructura para llevar tu cuenta al siguiente nivel.</p>` +
      `    </div>` +
      `  </div>` +
      `</section>` +
      `<section class="section">` +
      `  <div class="container container-narrow">` +
      `    <div class="choice-grid">` +
      `      <article class="choice-card d1" data-reveal>` +
      `        <p class="eyebrow">Primeros pasos</p>` +
      `        <h2>Empezar en OnlyFans</h2>` +
      `        <p>Para quienes todavía no han empezado o están dando sus primeros pasos.</p>` +
      `        <a class="btn btn-primary" href="/creadoras/empezar">Empezar</a>` +
      `      </article>` +
      `      <article class="choice-card d2" data-reveal>` +
      `        <p class="eyebrow">Cuenta activa</p>` +
      `        <h2>Crecer y escalar</h2>` +
      `        <p>Para creadoras que ya tienen una cuenta y quieren mejorar tráfico, conversión y estructura.</p>` +
      `        <a class="btn btn-primary" href="/creadoras/escalar">Quiero crecer</a>` +
      `      </article>` +
      `    </div>` +
      `  </div>` +
      `</section>`
    );
  },
};
