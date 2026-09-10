/**
 * OFM TOP — Configuración centralizada.
 *
 * Un único lugar para cambiar marca, dominio, logo, redes, formularios
 * y textos principales. Nada de URLs duplicadas por el código.
 */
export const CONFIG = Object.freeze({
  brand: Object.freeze({
    name: 'OFM TOP',
    claim: 'No se trata de publicar más. Se trata de hacerlo mejor.',
    description:
      'Estrategia, crecimiento y gestión para creadoras. Formación y recursos para quienes quieren entrar en el mundo OFM.',
    /** Requisito de edad del servicio (servicio 18+). */
    age: 18,
  }),

  /** Dominio público (workers.dev). NO cambiar sin actualizar sitemap/canonical. */
  domain: 'https://empiezagratis.ofmtop.workers.dev',

  /**
   * Fuente única del logo en toda la web.
   * Se muestra siempre dentro de un marco circular (.logo-mark en CSS).
   */
  logo:
    'https://raw.githubusercontent.com/elvividorfollador96-cpu/EMPIEZAGRATIS/refs/heads/main/1.png',

  social: Object.freeze({
    instagram: 'https://www.instagram.com/ofm.top/',
    threads: 'https://www.threads.com/@ofm.top',
  }),

  /**
   * Formularios públicos de Google Forms (siempre /viewform, nunca /edit).
   * Única fuente de verdad para los CTAs de lead.
   */
  forms: Object.freeze({
    empezar:
      'https://docs.google.com/forms/d/e/1FAIpQLSe49DpRZ_QPeET3wexkLEjMZ23ojZwdM6e3sCUdaMcc_pCZKg/viewform',
    escalar:
      'https://docs.google.com/forms/d/e/1FAIpQLSf3n29jDlJZa96jnhXM7c-5vL5w-IpK7Us4e9S2pjzh2-TmKg/viewform',
    modelosReales:
      'https://docs.google.com/forms/d/e/1FAIpQLSdea3iZlCktl7NVY2SJ8jHjwWKeniZC_6-AVM6q5hegkKq6gg/viewform',
    modelosIA:
      'https://docs.google.com/forms/d/e/1FAIpQLSeoBChY7EoVpjW5dp4W5R5FLLtglcuB-VE5Bpf73Rv-X67BKQ/viewform',
  }),

  /** Parámetros UTM reconocidos (preparado para CRM/analytics futuros). */
  utmParams: Object.freeze([
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ]),
});
