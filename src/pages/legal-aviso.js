import { CONFIG } from '../config.js';
import { breadcrumb, ICONS } from '../components.js';

/**
 * Nota: los datos del titular NO se inventan.
 * Los campos [COMPLETAR] deben rellenarse antes de captar leads reales.
 */
const ph = (label) => `<span class="ph" title="Pendiente de completar">[COMPLETAR: ${label}]</span>`;

export default {
  path: '/legal/aviso-legal',
  seo: {
    title: 'Aviso legal · OFM TOP',
    description:
      'Aviso legal del sitio web OFM TOP: titular, condiciones de uso, propiedad intelectual y responsabilidad.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { label: 'Aviso legal' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">Legal</p>` +
      `      <h1 id="page-title">Aviso legal</h1>` +
      `    </div>` +
      `  </div>` +
      `</section>` +
      `<section class="section">` +
      `  <div class="container container-doc">` +
      `    <div class="doc-notice" data-reveal>` +
      `      ${ICONS.info}` +
      `      <span><strong>Documento en preparación.</strong> Los campos marcados como <span class="ph">[COMPLETAR]</span> deben completarse antes de captar leads reales. Esta web no debe considerarse legalmente operativa hasta que se rellenen.</span>` +
      `    </div>` +
      `    <article class="doc" data-reveal>` +
      `      <h2>1. Información del sitio web</h2>` +
      `      <ul>` +
      `        <li>Denominación: ${CONFIG.brand.name}</li>` +
      `        <li>Titular: ${ph('nombre o razón social del titular')}</li>` +
      `        <li>NIF: ${ph('NIF')}</li>` +
      `        <li>Domicilio: ${ph('domicilio')}</li>` +
      `        <li>Email: ${ph('email de contacto')}</li>` +
      `      </ul>` +
      `      <h2>2. Objeto</h2>` +
      `      <p>El presente aviso legal regula el uso del sitio web ${CONFIG.domain}. El acceso al sitio te hace usuario de la misma, por lo que la relación con este sitio se rige por las presentes condiciones.</p>` +
      `      <h2>3. El público del sitio</h2>` +
      `      <p>El contenido y los servicios de este sitio están dirigidos exclusivamente a personas mayores de ${CONFIG.brand.age} años. Al acceder y utilizar este sitio, declaras ser mayor de edad. El sitio no contiene imágenes ni contenido dirigido a menores.</p>` +
      `      <h2>4. Uso del sitio</h2>` +
      `      <p>El acceso al sitio es gratuito. No está permitido utilizar este sitio con fines ilícitos o de cualquier otro modo que pueda causar daño a terceros, comprometer su seguridad informática o impedir su normal funcionamiento.</p>` +
      `      <h2>5. Propiedad intelectual e industrial</h2>` +
      `      <p>Los contenidos de este sitio web (textos, diseño, estructura, marcas y logotipos) pertenecen a su titular o se utilizan con la autorización correspondiente. Sin perjuicio de lo anterior, no se concede licencia ni autorización de uso alguno.</p>` +
      `      <h2>6. Exención de responsabilidad</h2>` +
      `      <p>Los contenidos de este sitio son de carácter informativo y orientativo sobre estrategia de crecimiento y gestión de proyectos de creadoras. No constituyen asesoramiento legal, fiscal, contable ni financiero.</p>` +
      `      <p>Este sitio no realiza promesas de ingresos ni garantiza resultados económicos. El resultado de cualquier proyecto depende de múltiples factores, entre otros el contexto de cada proyecto, el mercado y la ejecución de la persona o equipo responsable.</p>` +
      `      <h2>7. Enlaces a terceros</h2>` +
      `      <p>Este sitio incluye enlaces a servicios de terceros (formularios de Google Forms, Instagram, Threads). No nos hacemos responsables de sus contenidos, funcionalidades ni de sus políticas de privacidad.</p>` +
      `      <h2>8. Legislación aplicable</h2>` +
      `      <p>Las presentes condiciones se rigen por la legislación española. ${ph('jurisdicción aplicable, si procede')}</p>` +
      `    </article>` +
      `  </div>` +
      `</section>`
    );
  },
};
