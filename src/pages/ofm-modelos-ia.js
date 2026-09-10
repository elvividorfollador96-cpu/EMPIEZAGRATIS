import { breadcrumb, leadPanel, topicsList, ICONS, heroBg, picture } from '../components.js';

const TOPICS = [
  { n: '01', t: 'Concepto de modelo virtual', d: 'Qué es, qué es viable hoy y qué expectativas son realistas.' },
  { n: '02', t: 'Identidad', d: 'Personalidad, tono y universo del personaje: la base de todo el proyecto.' },
  { n: '03', t: 'Branding', d: 'Nombre, estética y coherencia visual que generan reconocimiento.' },
  { n: '04', t: 'Generación de contenido', d: 'Herramientas y flujo de trabajo para producir de forma consistente.' },
  { n: '05', t: 'Coherencia de identidad', d: 'Cómo mantiene el personaje una identidad estable en el tiempo.' },
  { n: '06', t: 'Adquisición de audiencia', d: 'Dónde y cómo crece una cuenta de modelo virtual.' },
  { n: '07', t: 'Estrategia de contenido', d: 'Estructura orientada a retención y conversión.' },
  { n: '08', t: 'Monetización', d: 'Los modelos de ingresos propios de este tipo de proyectos.' },
  { n: '09', t: 'Gestión', d: 'Sistemas y rutinas para operar el proyecto en el día a día.' },
  { n: '10', t: 'Escalado', d: 'Cómo escala un proyecto virtual cuando crece la audiencia.' },
];

export default {
  path: '/ofm/modelos-ia',
  seo: {
    title: 'Modelo virtual con IA · OFM TOP',
    description:
      'Construye un proyecto de modelo virtual con IA: identidad, branding, generación de contenido, audiencia, monetización y escalado.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      heroBg('gen-modelo-virtual') +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { href: '/ofm', label: 'OFM' },
        { label: 'Modelos IA' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">OFM · Modelos IA</p>` +
      `      <h1 id="page-title">Construye un proyecto de modelo virtual con IA</h1>` +
      `      <p class="page-sub">De la identidad del personaje al escalado del proyecto: la estructura completa para construir un modelo virtual con IA.</p>` +
      `      <div class="page-visual" data-reveal>` +
      picture({
        base: 'gen-modelo-virtual',
        alt: 'Monitor con una retícula de variaciones del mismo modelo virtual generadas con IA',
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
      `    <p class="transparency-note" data-reveal>` +
      `      ${ICONS.info}` +
      `      <span>Los proyectos de modelo virtual trabajan con personajes generados por IA, no con personas reales. La transparencia y el cumplimiento de las normativas de cada plataforma son parte integral de cualquier proyecto serio.</span>` +
      `    </p>` +
      leadPanel({
        magnet: 'Cómo construir un proyecto de modelo virtual con IA',
        cta: 'Quiero aprender',
        formKey: 'modelosIA',
      }) +
      `  </div>` +
      `</section>`
    );
  },
};
