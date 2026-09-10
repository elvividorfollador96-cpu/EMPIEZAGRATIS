import { breadcrumb, leadPanel, topicsList } from '../components.js';

const TOPICS = [
  { n: '01', t: 'Preparación', d: 'La base del proyecto antes de publicar: perfil, presentación y expectativas realistas.' },
  { n: '02', t: 'Posicionamiento', d: 'Qué ofreces, a quién y por qué alguien te sigue, definido desde el principio.' },
  { n: '03', t: 'Contenido', d: 'Una estructura de contenido sostenible, no una lista de ideas sueltas.' },
  { n: '04', t: 'Tráfico', d: 'Dónde y cómo consigue tu proyecto ser descubierto fuera de OnlyFans.' },
  { n: '05', t: 'Conversión', d: 'Cómo se transforma un seguidor nuevo en una primera suscripción.' },
  { n: '06', t: 'Organización', d: 'Rutinas y flujo de trabajo para no depender de la inspiración.' },
  { n: '07', t: 'Errores habituales', d: 'Los fallos más comunes de las primeras semanas y cómo evitarlos.' },
  { n: '08', t: 'Primeras métricas', d: 'Qué datos mirar, cuáles ignorar y cómo leer tus primeras señales.' },
];

export default {
  path: '/creadoras/empezar',
  seo: {
    title: 'Empezar en OnlyFans · OFM TOP — Tu primer mes',
    description:
      'Tu primer mes en OnlyFans: una guía para preparar, posicionar y estructurar tus primeros pasos con claridad. Sin empezar sin dirección.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { href: '/creadoras', label: 'Creadoras' },
        { label: 'Empezar' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">Creadoras · Empezar</p>` +
      `      <h1 id="page-title">Tu primer mes en OnlyFans</h1>` +
      `      <p class="page-sub">Una guía para entender qué hacer durante tus primeros pasos y evitar empezar sin dirección.</p>` +
      `    </div>` +
      `  </div>` +
      `</section>` +
      `<section class="section">` +
      `  <div class="container container-narrow">` +
      topicsList(TOPICS) +
      leadPanel({
        magnet: 'Tu primer mes en OnlyFans',
        cta: 'Quiero empezar',
        formKey: 'empezar',
      }) +
      `  </div>` +
      `</section>`
    );
  },
};
