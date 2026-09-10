import { breadcrumb, leadPanel, topicsList, heroBg, picture } from '../components.js';

const TOPICS = [
  { n: '01', t: 'Adquisición de tráfico', d: 'Fuentes de tráfico y una estrategia que no dependa de un solo canal.' },
  { n: '02', t: 'Contenido', d: 'Calendario, formatos y consistencia para mantener el interés de la audiencia.' },
  { n: '03', t: 'Conversión', d: 'Dónde se está perdiendo la suscripción y cómo corregirlo.' },
  { n: '04', t: 'Retención', d: 'Razones para que la audiencia se quede y vuelva a suscribirse.' },
  { n: '05', t: 'Análisis', d: 'Las métricas que importan y cómo leerlas sin distraerte con el ruido.' },
  { n: '06', t: 'Optimización', d: 'Ajustes basados en datos, no en intuición.' },
  { n: '07', t: 'Escalado', d: 'Estructura el proyecto para crecer sin perder el control.' },
];

export default {
  path: '/creadoras/escalar',
  seo: {
    title: 'Crecer y escalar tu OnlyFans · OFM TOP',
    description:
      'Tráfico, contenido, conversión, retención y análisis: la estructura para pasar de publicar sin dirección a una estrategia de crecimiento.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      heroBg('analitica-escalar') +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { href: '/creadoras', label: 'Creadoras' },
        { label: 'Crecer y escalar' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">Creadoras · Escalar</p>` +
      `      <h1 id="page-title">Crecer y escalar mi OnlyFans</h1>` +
      `      <p class="page-sub">Pasar de publicar sin dirección a trabajar con una estrategia de crecimiento.</p>` +
      `      <div class="page-visual" data-reveal>` +
      picture({
        base: 'analitica-escalar',
        alt: 'Mano señalando una curva de crecimiento ascendente en un monitor con notas adhesivas',
        width: 1000,
        height: 666,
      }) +
      `      </div>` +
      `    </div>` +
      `  </div>` +
      `</section>` +
      `<section class="section">` +
      `  <div class="container container-narrow">` +
      topicsList(TOPICS) +
      leadPanel({
        magnet: 'Cómo crecer y escalar una cuenta de OnlyFans',
        cta: 'Quiero crecer',
        formKey: 'escalar',
      }) +
      `  </div>` +
      `</section>`
    );
  },
};
