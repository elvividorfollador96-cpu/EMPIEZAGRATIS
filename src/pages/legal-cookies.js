import { breadcrumb, ICONS } from '../components.js';

const ph = (label) => `<span class="ph" title="Pendiente de completar">[COMPLETAR: ${label}]</span>`;

export default {
  path: '/legal/cookies',
  seo: {
    title: 'Política de cookies · OFM TOP',
    description:
      'Información sobre el uso de cookies y almacenamiento local en el sitio web OFM TOP.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { label: 'Política de cookies' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">Legal</p>` +
      `      <h1 id="page-title">Política de cookies</h1>` +
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
      `      <h2>1. ¿Usamos cookies?</h2>` +
      `      <p>Este sitio no instala cookies de seguimiento publicitario ni de analítica de terceros.</p>` +
      `      <h2>2. Memoria de sesión (parámetros UTM)</h2>` +
      `      <p>Para atribuir correctamente el tráfico, este sitio puede guardar temporalmente en la memoria de sesión de tu navegador (sessionStorage) los parámetros UTM por los que has llegado: utm_source, utm_medium, utm_campaign, utm_content y utm_term.</p>` +
      `      <ul>` +
      `        <li>No son datos personales.</li>` +
      `        <li>No se envían a servidores de terceros.</li>` +
      `        <li>Se eliminan automáticamente al cerrar la sesión.</li>` +
      `      </ul>` +
      `      <h2>3. Servicios de terceros</h2>` +
      `      <p>Los formularios de solicitud se abren en Google Forms (google.com) y los enlaces de redes sociales llevan a Instagram y Threads. Dichos servicios pueden utilizar cookies propias según sus respectivas políticas de privacidad.</p>` +
      `      <h2>4. Cómo desactivar el almacenamiento</h2>` +
      `      <p>Puedes borrar los datos de sesión de tu navegador en cualquier momento o configurar tu navegador para que bloquee el almacenamiento local. El sitio seguirá funcionando con normalidad.</p>` +
      `      <h2>5. Cambios en esta política</h2>` +
      `      <p>${ph('si en el futuro se incorporan analítica, cookies o consentimiento, se detallarán aquí su finalidad y cómo gestionarlos')}</p>` +
      `    </article>` +
      `  </div>` +
      `</section>`
    );
  },
};
