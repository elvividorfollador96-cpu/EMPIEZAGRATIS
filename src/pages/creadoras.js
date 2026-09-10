import { breadcrumb, heroBg, picture } from '../components.js';

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
      heroBg('creacion-empezar') +
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
      `  <div class="container">` +
      `    <div class="guide-grid">` +
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
      `          <p class="eyebrow">Primeros pasos</p>` +
      `          <h3>Empezar en OnlyFans</h3>` +
      `          <p>Para quienes todavía no han empezado o están dando sus primeros pasos.</p>` +
      `          <a class="btn btn-primary btn-block btn-caps" href="/creadoras/empezar">Ver la guía para empezar</a>` +
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
      `          <p class="eyebrow">Cuenta activa</p>` +
      `          <h3>Crecer y escalar</h3>` +
      `          <p>Para creadoras que ya tienen una cuenta y quieren mejorar tráfico, conversión y estructura.</p>` +
      `          <a class="btn btn-primary btn-block btn-caps" href="/creadoras/escalar">Ver la guía para crecer</a>` +
      `        </div>` +
      `      </article>` +
      `    </div>` +
      `  </div>` +
      `</section>`
    );
  },
};
