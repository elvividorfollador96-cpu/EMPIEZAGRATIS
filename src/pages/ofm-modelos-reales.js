import { breadcrumb, leadPanel, topicsList } from '../components.js';

const TOPICS = [
  { n: '01', t: 'Qué hace un OFM', d: 'El papel real de un gestor: estrategia, operaciones y crecimiento junto a la creadora.' },
  { n: '02', t: 'Adquisición de modelos', d: 'Cómo buscar, evaluar y negociar con creadoras de forma profesional.' },
  { n: '03', t: 'Posicionamiento', d: 'Definir el ángulo del proyecto antes de invertir en tráfico.' },
  { n: '04', t: 'Adquisición de tráfico', d: 'Canales, contenido y campañas para atraer audiencia.' },
  { n: '05', t: 'Contenido', d: 'Sistemas de contenido que sostienen el crecimiento en el tiempo.' },
  { n: '06', t: 'Gestión', d: 'Comunicación, flujo de trabajo y operaciones del día a día.' },
  { n: '07', t: 'Conversión', d: 'Cómo se transforma la audiencia en suscripción.' },
  { n: '08', t: 'Métricas', d: 'Qué medir, cómo medirlo y qué significa cada señal.' },
  { n: '09', t: 'Optimización', d: 'Mejora continua basada en el análisis, no en la corazonada.' },
  { n: '10', t: 'Escalado', d: 'Cómo estructura y gestiona un proyecto cuando empieza a crecer.' },
];

export default {
  path: '/ofm/modelos-reales',
  seo: {
    title: 'OFM desde cero: modelos reales · OFM TOP',
    description:
      'Aprende cómo funciona el trabajo de un OFM: adquisición de modelos, tráfico, contenido, gestión, métricas y escalado con creadoras reales.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { href: '/ofm', label: 'OFM' },
        { label: 'Modelos reales' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">OFM · Modelos reales</p>` +
      `      <h1 id="page-title">OFM desde cero: modelos reales</h1>` +
      `      <p class="page-sub">Aprende cómo funciona el trabajo de un OFM y qué piezas necesitas para construir un proyecto.</p>` +
      `    </div>` +
      `  </div>` +
      `</section>` +
      `<section class="section">` +
      `  <div class="container container-narrow">` +
      topicsList(TOPICS) +
      leadPanel({
        magnet: 'OFM desde cero: modelos reales',
        cta: 'Quiero aprender OFM',
        formKey: 'modelosReales',
      }) +
      `  </div>` +
      `</section>`
    );
  },
};
