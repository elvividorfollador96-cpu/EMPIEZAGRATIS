import { guideHero, leadPanel, topicsList } from '../components.js';

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
      // HERO: badge GUÍA GRATUITA + titular + CTA al formulario
      guideHero({
        bg: 'analitica-escalar',
        crumbs: [
          { href: '/', label: 'Inicio' },
          { href: '/creadoras', label: 'Creadoras' },
          { label: 'Crecer y escalar' },
        ],
        title: 'Crecer y escalar mi OnlyFans',
        sub: 'Pasar de publicar sin dirección a trabajar con una estrategia de crecimiento.',
        ctaHref: '/creadoras/escalar',
        ctaForm: 'escalar',
        ctaLabel: 'Quiero la guía gratis',
      }) +
      `<section class="section">` +
      `  <div class="container container-narrow">` +
      topicsList(TOPICS) +
      leadPanel({ formKey: 'escalar' }) +
      `  </div>` +
      `</section>`
    );
  },
};
