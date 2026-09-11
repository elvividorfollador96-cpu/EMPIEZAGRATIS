import { CONFIG } from '../config.js';
import { breadcrumb } from '../components.js';
import { contactLink } from '../utils.js';

export default {
  path: '/legal/cookies',
  seo: {
    title: 'Política de cookies y almacenamiento local · OFM TOP',
    description:
      'Política de cookies de OFM TOP: qué almacenamiento usa este sitio (sessionStorage para UTM), qué servicios de terceros intervienen y cómo gestionarlo.',
    headingId: 'page-title',
  },
  content() {
    return (
      `<section class="page-hero">` +
      `  <div class="container">` +
      breadcrumb([
        { href: '/', label: 'Inicio' },
        { label: 'Cookies' },
      ]) +
      `    <div data-reveal>` +
      `      <p class="eyebrow">Legal</p>` +
      `      <h1 id="page-title">Política de cookies y almacenamiento local</h1>` +
      `    </div>` +
      `  </div>` +
      `</section>` +
      `<section class="section">` +
      `  <div class="container container-doc">` +
      `    <article class="doc" data-reveal>` +
      `      <p class="doc-updated">Última actualización: 11 de septiembre de 2026</p>` +
      `      <h2>1. Qué cubre esta política</h2>` +
      `      <p>Esta política explica, de forma transparente, qué cookies y qué tecnologías de almacenamiento local utiliza el sitio web ${CONFIG.domain}. Distinguimos expresamente entre <strong>cookies</strong> (pequeños ficheros que un sitio guarda en tu navegador), <strong>almacenamiento local de sesión</strong> (sessionStorage, datos que desaparecen al cerrar la pestaña) y <strong>servicios de terceros</strong> que pueden instalar sus propios mecanismos.</p>` +
      `      <p>Titular del sitio: <strong>${CONFIG.legal.owner}</strong> · ${CONFIG.legal.address} · ${contactLink()}</p>` +
      `      <h2>2. Cookies propias</h2>` +
      `      <p><strong>Este sitio no utiliza cookies propias.</strong> No instala cookies de análisis, de publicidad, de personalización ni de ningún otro tipo, por lo que no es necesario mostrar un banner de consentimiento de cookies propio.</p>` +
      `      <h2>3. Almacenamiento local de sesión (sessionStorage)</h2>` +
      `      <p>Para mantener la atribución de la visita durante la navegación, el sitio guarda en el <strong>sessionStorage</strong> de tu navegador los parámetros UTM con los que llegaste (por ejemplo <code>utm_source</code>, <code>utm_medium</code> o <code>utm_campaign</code>):</p>` +
      `      <ul>` +
      `        <li>Clave: <code>ofmtop.utm.v1</code></li>` +
      `        <li>Contenido: los valores de los parámetros UTM de la visita (texto corto, sin datos personales).</li>` +
      `        <li>Duración: hasta que cierras la pestaña o el navegador (no persiste entre sesiones).</li>` +
      `        <li>Finalidad: saber de qué canal procede una solicitud para mejorar nuestros contenidos. Se trata de almacenamiento estrictamente funcional y exento de consentimiento.</li>` +
      `      </ul>` +
      `      <p>Puedes eliminarlo en cualquier momento borrando los datos de navegación de tu navegador.</p>` +
      `      <h2>4. Servicios de terceros</h2>` +
      `      <p>Al interactuar con determinados elementos del sitio, intervienen servicios de terceros que pueden instalar sus propias cookies o mecanismos equivalentes, regidos por sus respectivas políticas:</p>` +
      `      <ul>` +
      `        <li><strong>Google Forms (Google Ireland Limited):</strong> los formularios de solicitud de guías se envían a la infraestructura de Google Forms. Google puede instalar cookies de seguridad y antiabuso (por ejemplo <code>NID</code>, <code>SOCS</code>) cuando se muestra o se envía un formulario. Más información: https://policies.google.com/technologies/cookies</li>` +
      `        <li><strong>Cloudflare (Cloudflare, Inc.):</strong> el sitio se sirve a través de la red de Cloudflare (Cloudflare Workers), que puede aplicar mecanismos técnicos de seguridad y balanceo necesarios para servir la web.</li>` +
      `        <li><strong>GitHub (GitHub, Inc.):</strong> el logotipo del sitio se carga desde los servidores de GitHub.</li>` +
      `        <li><strong>Instagram y Threads (Meta Platforms Ireland Ltd.):</strong> únicamente si pulsas los enlaces a nuestros perfiles sociales y sales del sitio hacia esas plataformas.</li>` +
      `      </ul>` +
      `      <p>La instalación de cookies de terceros depende de la configuración de tu navegador y de tu navegación previa, y está sujeta a las políticas de cada proveedor.</p>` +
      `      <h2>5. Cómo gestionar o eliminar cookies</h2>` +
      `      <p>Puedes permitir, bloquear o eliminar las cookies —propias o de terceros— instaladas en tu equipo desde la configuración del navegador que utilices:</p>` +
      `      <ul>` +
      `        <li>Safari (iOS/macOS): Ajustes → Safari → Privacidad y seguridad.</li>` +
      `        <li>Chrome: Configuración → Privacidad y seguridad → Cookies.</li>` +
      `        <li>Firefox: Configuración → Privacidad y seguridad → Cookies.</li>` +
      `        <li>Edge: Configuración → Cookies y permisos del sitio.</li>` +
      `      </ul>` +
      `      <p>El bloqueo de todas las cookies puede afectar al funcionamiento de servicios de terceros, como el envío de formularios.</p>` +
      `      <h2>6. Actualizaciones de esta política</h2>` +
      `      <p>Si en el futuro el sitio incorporara cookies propias o nuevos servicios de terceros, esta política se actualizará y se informará debidamente al usuario antes de su uso. Puedes consultar cualquier duda ${contactLink({ label: 'contactando con nosotros' })}.</p>` +
      `    </article>` +
      `  </div>` +
      `</section>`
    );
  },
};
