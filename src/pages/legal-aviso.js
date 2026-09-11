import { CONFIG } from '../config.js';
import { breadcrumb, ICONS } from '../components.js';
import { contactLink } from '../utils.js';

export default {
  path: '/legal/aviso-legal',
  seo: {
    title: 'Aviso legal · OFM TOP',
    description:
      'Aviso legal del sitio web OFM TOP: identificación del titular, condiciones de uso, propiedad intelectual, responsabilidad y legislación aplicable.',
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
      `    <article class="doc" data-reveal>` +
      `      <p class="doc-updated">Última actualización: 11 de septiembre de 2026</p>` +
      `      <h2>1. Identificación del titular</h2>` +
      `      <p>En cumplimiento del deber de información de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos generales de este sitio web:</p>` +
      `      <ul>` +
      `        <li>Titular: <strong>${CONFIG.legal.owner}</strong></li>` +
      `        <li>Domicilio: ${CONFIG.legal.address}</li>` +
      `        <li>Contacto: ${contactLink()}</li>` +
      `        <li>Sitio web: ${CONFIG.domain}</li>` +
      `      </ul>` +
      `      <h2>2. Objeto</h2>` +
      `      <p>Este aviso legal regula el acceso, la navegación y el uso del sitio web ${CONFIG.domain} (en adelante, «el sitio»), así como las responsabilidades derivadas de la utilización de sus contenidos, que incluyen información, recursos formativos y formularios de contacto relacionados con la actividad de ${CONFIG.legal.owner}.</p>` +
      `      <p>El acceso al sitio es gratuito y no exige registro previo.</p>` +
      `      <h2>3. Condiciones de uso</h2>` +
      `      <p>El usuario accede al sitio de forma voluntaria y se compromete a hacer un uso lícito, diligente y respetuoso del mismo, abstiniéndose de:</p>` +
      `      <ul>` +
      `        <li>Utilizar el sitio con fines ilícitos, fraudulentos o contrarios a la buena fe.</li>` +
      `        <li>Dañar, sobrecargar o impedir el normal funcionamiento del sitio o de sus sistemas.</li>` +
      `        <li>Intentar acceder a zonas restringidas, a los sistemas informáticos de terceros o a los formularios de recogida de datos con fines distintos a los previstos.</li>` +
      `        <li>Reproducir, distribuir o explotar los contenidos del sitio sin autorización.</li>` +
      `      </ul>` +
      `      <p>${CONFIG.legal.owner} se reserva la facultad de modificar en cualquier momento la presentación, configuración y contenidos del sitio, así como de suspender o interrumpir temporalmente su disponibilidad por motivos técnicos u operativos.</p>` +
      `      <h2>4. Propiedad intelectual e industrial</h2>` +
      `      <p>Todos los contenidos del sitio (textos, diseño, estructura, logotipos, marcas y elementos gráficos) son titularidad de ${CONFIG.legal.owner} o se utilizan con la autorización de sus propietarios, y están protegidos por la normativa de propiedad intelectual e industrial.</p>` +
      `      <p>Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación, total o parcial, de dichos contenidos sin la autorización previa, expresa y por escrito de su titular.</p>` +
      `      <h2>5. Responsabilidad</h2>` +
      `      <p>Los contenidos del sitio tienen carácter informativo y formativo sobre estrategia, crecimiento y gestión de proyectos de creadoras. No constituyen asesoramiento legal, fiscal, contable ni financiero, y no deben interpretarse como una instrucción para adoptar decisiones concretas.</p>` +
      `      <p>${CONFIG.legal.owner} trabaja para que la información publicada sea correcta y esté actualizada, pero no garantiza la ausencia de errores ni la disponibilidad ininterrumpida del sitio, y no se responsabiliza de los daños que puedan derivarse de su uso, de interrupciones técnicas o de acciones de terceros sobre la disponibilidad del servicio.</p>` +
      `      <h2>6. Enlaces externos</h2>` +
      `      <p>El sitio incluye enlaces o integraciones de servicios de terceros, como formularios de Google Forms (para la recepción de solicitudes de las guías) y enlaces a redes sociales como Instagram y Threads. ${CONFIG.legal.owner} no controla ni asume responsabilidad por los contenidos, políticas o prácticas de dichos servicios de terceros, cuya utilización se realiza bajo criterio y responsabilidad exclusivos del usuario.</p>` +
      `      <h2>7. Contenido y materiales</h2>` +
      `      <p>Las guías y recursos ofrecidos a través del sitio son materiales de carácter informativo y formativo. Su contenido puede actualizarse, completarse o sustituirse en cualquier momento. El usuario se compromete a utilizarlos para su desarrollo personal y profesional, sin reventa, redistribución ni presentación como materiales propios.</p>` +
      `      <h2>8. Ausencia de garantía de resultados</h2>` +
      `      <p>Todo el contenido del sitio, incluidas las guías y recursos gratuitos, tiene finalidad exclusivamente informativa y formativa. Los resultados de cualquier proyecto dependen de múltiples factores ajenos a ${CONFIG.legal.owner}, entre otros la ejecución, la constancia, el mercado, el contexto de cada cuenta y la aplicación práctica de los conceptos descritos.</p>` +
      `      <ul>` +
      `        <li>${CONFIG.legal.owner} no garantiza la obtención de ingresos ni ningún resultado económico o de crecimiento.</li>` +
      `        <li>Ningún contenido del sitio debe interpretarse como una promesa de resultados.</li>` +
      `        <li>El usuario es el único responsable de cumplir las normas, términos y condiciones de las plataformas que utilice (incluida OnlyFans y las redes sociales), así como la legislación aplicable.</li>` +
      `      </ul>` +
      `      <h2>9. Servicios dirigidos a mayores de 18 años</h2>` +
      `      <p>El sitio, sus contenidos y sus servicios están dirigidos exclusivamente a personas mayores de ${CONFIG.brand.age} años. Al utilizar el sitio y sus formularios, el usuario declara ser mayor de edad. Los formularios de captación incluyen una confirmación expresa de mayoría de edad.</p>` +
      `      <h2>10. Modificaciones</h2>` +
      `      <p>${CONFIG.legal.owner} se reserva el derecho de modificar, en cualquier momento y sin aviso previo, este aviso legal para adaptarlo a novedades legislativas, jurisprudenciales o a cambios en la actividad del sitio. Las modificaciones serán vigentes desde su publicación en el sitio.</p>` +
      `      <h2>11. Legislación y jurisdicción</h2>` +
      `      <p>Este aviso legal se rige por la legislación española. Para cualquier controversia relacionada con el sitio, las partes se someterán a los juzgados y tribunales que resulten competentes conforme a la normativa de aplicación.</p>` +
      `      <p>Para cualquier consulta sobre este aviso legal, puedes ${contactLink({ label: 'ponerte en contacto con nosotros' })}.</p>` +
      `    </article>` +
      `  </div>` +
      `</section>`
    );
  },
};
