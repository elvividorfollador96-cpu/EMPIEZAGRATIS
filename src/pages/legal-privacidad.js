import { CONFIG } from '../config.js';
import { breadcrumb, ICONS } from '../components.js';

/**
 * Nota: los datos del responsable NO se inventan.
 * Los campos [COMPLETAR] deben rellenarse antes de captar leads reales.
 */
const ph = (label) => `<span class="ph" title="Pendiente de completar">[COMPLETAR: ${label}]</span>`;

export default {
  path: '/legal/privacidad',
  seo: {
    title: 'Política de privacidad · OFM TOP',
    description:
      'Información sobre el tratamiento de los datos personales recogidos a través de los formularios de OFM TOP.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { label: 'Política de privacidad' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">Legal</p>` +
      `      <h1 id="page-title">Política de privacidad</h1>` +
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
      `      <h2>1. Responsable del tratamiento</h2>` +
      `      <p>El responsable del tratamiento de los datos recogidos a través de este sitio web es:</p>` +
      `      <ul>` +
      `        <li>Nombre o razón social: ${ph('nombre o razón social')}</li>` +
      `        <li>NIF: ${ph('NIF')}</li>` +
      `        <li>Dirección: ${ph('dirección')}</li>` +
      `        <li>Email de contacto: ${ph('email de contacto')}</li>` +
      `      </ul>` +
      `      <h2>2. Datos que recogemos</h2>` +
      `      <p>Cuando rellenas uno de los formularios de solicitud (Google Forms), recogemos únicamente los datos que tú nos facilitas en ese formulario: tus datos de contacto y la información sobre tu situación que el formulario te solicita.</p>` +
      `      <p>Este sitio está dirigido exclusivamente a personas mayores de ${CONFIG.brand.age} años y no recogemos datos de menores.</p>` +
      `      <p>Además, este sitio puede almacenar temporalmente en la memoria de sesión de tu navegador (sessionStorage) los parámetros de seguimiento UTM (utm_source, utm_medium, utm_campaign, utm_content, utm_term) presentes en el enlace por el que llegas. Son parámetros técnicos de atribución de tráfico: no son datos personales, no se envían a terceros y se eliminan al cerrar la sesión.</p>` +
      `      <h2>3. Finalidad</h2>` +
      `      <p>Atender tu solicitud, poder ponernos en contacto contigo y enviarte el recurso que has solicitado desde el formulario.</p>` +
      `      <h2>4. Legitimación</h2>` +
      `      <p>La base jurídica del tratamiento es tu consentimiento (art. 6.1.a RGPD), que puedes retirar en cualquier momento enviando un email a ${ph('email de contacto')}.</p>` +
      `      <h2>5. Conservación</h2>` +
      `      <p>Los datos se conservarán mientras se mantenga la relación derivada de tu solicitud o hasta que solicites su supresión. ${ph('criterio o plazo exacto de conservación')}</p>` +
      `      <h2>6. Destinatarios</h2>` +
      `      <p>No se cederán datos a terceros salvo obligación legal. Los formularios están alojados en Google Forms: Google actúa como encargado del tratamiento para el almacenamiento técnico de las respuestas, según su política de privacidad.</p>` +
      `      <p>${ph('otros encargados del tratamiento, p. ej. CRM o email marketing, si se utilizan')}</p>` +
      `      <h2>7. Tus derechos</h2>` +
      `      <p>Puedes ejercer los derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición, así como retirar tu consentimiento en cualquier momento, escribiendo a ${ph('email de contacto')}. Te facilitaremos la respuesta en el plazo legal previsto.</p>` +
      `      <h2>8. Reclamaciones</h2>` +
      `      <p>Si consideras que el tratamiento no se ajusta a la normativa aplicable, puedes presentar reclamación ante la autoridad de control competente (en España: Agencia Española de Protección de Datos, www.aepd.es).</p>` +
      `      <h2>9. Cambios en esta política</h2>` +
      `      <p>Esta política puede actualizarse con el tiempo. La versión vigente será siempre la publicada en esta página.</p>` +
      `    </article>` +
      `  </div>` +
      `</section>`
    );
  },
};
