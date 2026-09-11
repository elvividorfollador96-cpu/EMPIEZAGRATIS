import { CONFIG } from '../config.js';
import { breadcrumb } from '../components.js';
import { contactLink } from '../utils.js';

export default {
  path: '/legal/privacidad',
  seo: {
    title: 'Política de privacidad · OFM TOP',
    description:
      'Política de privacidad de OFM TOP: responsable, datos tratados, finalidades, bases jurídicas, conservación, Google Forms/Sheets, derechos y seguridad.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { label: 'Privacidad' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">Legal</p>` +
      `      <h1 id="page-title">Política de privacidad</h1>` +
      `    </div>` +
      `  </div>` +
      `</section>` +
      `<section class="section">` +
      `  <div class="container container-doc">` +
      `    <article class="doc" data-reveal>` +
      `      <p class="doc-updated">Última actualización: 11 de septiembre de 2026</p>` +
      `      <h2>1. Responsable del tratamiento</h2>` +
      `      <ul>` +
      `        <li>Responsable: <strong>${CONFIG.legal.owner}</strong></li>` +
      `        <li>Domicilio: ${CONFIG.legal.address}</li>` +
      `        <li>Contacto: ${contactLink()}</li>` +
      `        <li>Sitio web: ${CONFIG.domain}</li>` +
      `      </ul>` +
      `      <h2>2. Datos que tratamos</h2>` +
      `      <p>A través de los formularios del sitio tratamos únicamente los datos que el usuario facilita voluntariamente:</p>` +
      `      <ul>` +
      `        <li><strong>Datos identificativos y de contacto:</strong> nombre, email, WhatsApp o teléfono e, informáticamente y siempre de forma opcional, perfiles públicos de redes sociales (Instagram, X/Twitter, Threads).</li>` +
      `        <li><strong>Datos facilitados en las respuestas del formulario:</strong> situación actual, experiencia, objetivos y otra información que el usuario decide compartir para poder enviarle el recurso adecuado.</li>` +
      `        <li><strong>Datos de navegación:</strong> parámetros UTM (fuente, medio, campaña, contenido y término) que describen el origen de la visita. No son datos personales por sí mismos y se almacenan en el propio navegador durante la sesión.</li>` +
      `      </ul>` +
      `      <p>No tratamos categorías especiales de datos ni tomamos decisiones automatizadas sobre los usuarios.</p>` +
      `      <h2>3. Fuentes de los datos</h2>` +
      `      <p>Los datos proceden directamente del interesado, cuando rellena uno de los formularios del sitio. No se obtienen datos de terceros ni de fuentes públicas.</p>` +
      `      <h2>4. Finalidades</h2>` +
      `      <ul>` +
      `        <li>Atender la solicitud del usuario y remitirle la guía o recurso gratuito solicitado.</li>` +
      `        <li>Hacer un seguimiento de la solicitud para acompañar al usuario en su proceso de aprendizaje.</li>` +
      `        <li>Analizar de forma agregada el origen de las visitas (UTM) para mejorar los contenidos y canales de comunicación.</li>` +
      `        <li>Únicamente si el usuario lo marca expresamente: enviarle novedades, recursos y comunicaciones comerciales de ${CONFIG.legal.owner}.</li>` +
      `      </ul>` +
      `      <h2>5. Bases jurídicas</h2>` +
      `      <ul>` +
      `        <li><strong>Consentimiento</strong> (art. 6.1.a RGPD): al enviar el formulario, el usuario consiente el tratamiento de sus datos para recibir la guía solicitada y acepta expresamente la política de privacidad y la confirmación de mayoría de edad.</li>` +
      `        <li><strong>Consentimiento (opcional)</strong> para comunicaciones comerciales: la casilla correspondiente nunca está premarcada y su falta de marcado no afecta al envío de la guía.</li>` +
      `        <li><strong>Interés legítimo</strong> (art. 6.1.f RGPD) para el análisis agregado y anónimo del origen de las visitas.</li>` +
      `      </ul>` +
      `      <h2>6. Conservación</h2>` +
      `      <p>Los datos de los formularios se conservan mientras el usuario no solicite su supresión o se oponga al tratamiento, y en cualquier caso durante los plazos necesarios para atender responsabilidades legales. Los parámetros UTM se conservan solo durante la sesión del navegador (sessionStorage) y se eliminan al cerrarla.</p>` +
      `      <h2>7. Destinatarios y proveedores</h2>` +
      `      <p>${CONFIG.legal.owner} no cede datos personales a terceros con fines propios. Para la operativa del sitio se utilizan los siguientes proveedores, que actúan como encargados o como responsables de sus propios servicios:</p>` +
      `      <ul>` +
      `        <li><strong>Google Ireland Limited</strong> — recepción de solicitudes (Google Forms) y base de datos de respuestas (Google Sheets). Más detalles en la sección 8.</li>` +
      `        <li><strong>Cloudflare, Inc.</strong> — hosting y distribución del sitio web (Cloudflare Workers).</li>` +
      `        <li><strong>GitHub, Inc.</strong> — repositorio del código del sitio y alojamiento del logotipo.</li>` +
      `        <li><strong>Meta Platforms Ireland Ltd. y X Corp.</strong> — únicamente si el usuario visita nuestros perfiles sociales mediante los enlaces del sitio.</li>` +
      `      </ul>` +
      `      <h2>8. Uso de Google Forms y Google Sheets</h2>` +
      `      <p>Las solicitudes de guías se gestionan con formularios de <strong>Google Forms</strong> integrados visualmente en el sitio. Al enviarlos:</p>` +
      `      <ul>` +
      `        <li>Los datos que introduces se registran en el formulario correspondiente de Google Forms.</li>` +
      `        <li>Las respuestas se almacenan en la hoja de cálculo de Google Sheets vinculada a cada formulario, que funciona como base de datos del proyecto.</li>` +
      `        <li>El tratamiento de esos datos en la infraestructura de Google se rige también por las condiciones y la política de privacidad de Google: https://policies.google.com/privacy</li>` +
      `      </ul>` +
      `      <p>La web no añade formularios ni hojas de cálculo ajenos a este sistema, y no trata copias locales de los datos fuera de las herramientas descritas.</p>` +
      `      <h2>9. Derechos del usuario</h2>` +
      `      <p>El usuario puede ejercer en cualquier momento los siguientes derechos:</p>` +
      `      <ul>` +
      `        <li>Acceso: saber qué datos suyos tratamos.</li>` +
      `        <li>Rectificación: corregir datos inexactos o incompletos.</li>` +
      `        <li>Supresión: solicitar la eliminación de sus datos.</li>` +
      `        <li>Oposición: oponerse a determinados tratamientos.</li>` +
      `        <li>Limitación: pedir la restricción del tratamiento.</li>` +
      `        <li>Portabilidad: recibir los datos en un formato estructurado.</li>` +
      `        <li>Retirar el consentimiento en cualquier momento, sin que ello afecte a tratamientos anteriores.</li>` +
      `      </ul>` +
      `      <p>Asimismo, puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que no hemos atendido correctamente sus derechos.</p>` +
      `      <h2>10. Cómo ejercer los derechos</h2>` +
      `      <p>Puede ejercer sus derechos dirigiéndose a ${contactLink()} e indicando la solicitud que desea realizar. Para poder verificar su identidad, le podemos pedir información adicional exclusivamente con esa finalidad, y le responderemos en el plazo máximo legal de un mes.</p>` +
      `      <h2>11. Seguridad</h2>` +
      `      <p>El sitio se sirve íntegramente mediante conexión cifrada (HTTPS) y aplica cabeceras de seguridad que restringen la ejecución de código y los orígenes de conexión. El acceso a las herramientas de gestión (formularios y hojas de respuestas) está protegido por las medidas de seguridad de las cuentas de Google del responsable, incluida la doble autenticación. No se introducen datos personales en la consola del navegador ni en sistemas de registro de errores.</p>` +
      `      <h2>12. Transferencias internacionales</h2>` +
      `      <p>Al utilizarse servicios de Google, Cloudflare y GitHub, los datos pueden almacenarse o procesarse fuera del Espacio Económico Europeo (principalmente en Estados Unidos). Estas transferencias se amparan en las garantías exigidas por la normativa europea, en particular las Cláusulas Contractuales Tipo y los Marcos de Certificación de Privacidad de Datos UE–EE. UU. aplicables a dichos proveedores.</p>` +
      `      <h2>13. Mayores de edad</h2>` +
      `      <p>El sitio y sus servicios están dirigidos exclusivamente a personas mayores de ${CONFIG.brand.age} años. Los formularios incluyen una casilla de confirmación expresa de mayoría de edad, cuya marcación es obligatoria para enviar el formulario. Si tuviéramos conocimiento de que un menor de edad nos ha facilitado datos, los eliminaremos de forma inmediata.</p>` +
      `      <h2>14. Cambios de esta política</h2>` +
      `      <p>${CONFIG.legal.owner} puede actualizar esta política de privacidad para adaptarla a cambios normativos o en la operativa del sitio. La versión vigente será siempre la publicada en esta página, con su fecha de última actualización.</p>` +
      `      <p>Para cualquier duda sobre esta política, puedes ${contactLink({ label: 'ponerte en contacto con nosotros' })}.</p>` +
      `    </article>` +
      `  </div>` +
      `</section>`
    );
  },
};
