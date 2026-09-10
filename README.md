# OFM TOP — `empiezagratis.ofmtop.workers.dev`

Landing premium (oscura, minimalista, mobile-first) para captar dos tipos de leads:

1. **Creadoras/modelos** → empezar en OnlyFans o crecer y escalar.
2. **Futuros OFM** → modelos reales o modelos IA.

Stack: **Cloudflare Workers + HTML/CSS/JS puro** (sin frameworks). El Worker
renderiza el HTML (SSR), los estáticos viven en `public/` y la única
dependencia externa en runtime es la imagen del logo (GitHub raw).

## Estructura

```
├── wrangler.jsonc          # Configuración del Worker (name = empiezagratis)
├── package.json            # Scripts: dev, dev:node, check, test, deploy
├── 1.png                   # Logo original (fuente de la URL raw oficial)
├── public/                 # Estáticos (servidos vía env.ASSETS)
│   ├── css/styles.css      # Sistema de diseño completo
│   ├── js/main.js          # Menú móvil, UTM, microinteracciones
│   ├── fonts/              # Inter (auto-alojado, woff2 latin)
│   └── img/                # Visuales propios de /ofm (JPG + WebP, optimizados)
├── src/                    # Worker
│   ├── index.js            # Punto de entrada: routing + headers de seguridad
│   ├── config.js           # ⚙️ CONFIG CENTRAL: marca, dominio, logo, redes, formularios
│   ├── routes.js           # Tabla de rutas
│   ├── layout.js           # Shell HTML (head/SEO + header + footer + menú)
│   ├── components.js       # Componentes compartidos (logo circular, CTA, …)
│   ├── utils.js            # SEO (robots/sitemap), CSP, favicon
│   └── pages/              # Una página por módulo (contenido + SEO)
├── scripts/
│   ├── dev.mjs             # Dev local con Node puro (mismo código que producción)
│   └── check.mjs           # Comprobación de rutas/enlaces/formularios/SEO/headers
└── test/smoke.test.mjs     # Tests del cliente (linkedom): menú, UTM, a11y, logo
```

## Páginas

| Ruta                  | Título                                   |
| --------------------- | ---------------------------------------- |
| `/`                   | Home (hero + caminos + CTA final)        |
| `/creadoras`          | Tu proyecto empieza aquí                 |
| `/creadoras/empezar`  | Tu primer mes en OnlyFans                |
| `/creadoras/escalar`  | Crecer y escalar mi OnlyFans             |
| `/ofm`                | Aprende a construir proyectos OFM        |
| `/ofm/modelos-reales` | OFM desde cero: modelos reales           |
| `/ofm/modelos-ia`     | Modelo virtual con IA                    |
| `/legal/privacidad`   | Política de privacidad (con [COMPLETAR]) |
| `/legal/aviso-legal`  | Aviso legal (con [COMPLETAR])            |
| `/legal/cookies`      | Política de cookies                      |

## Desarrollo local

```bash
npm install
npm run dev:node    # Node puro → http://localhost:8787
# o
npm run dev         # wrangler dev (misma plataforma) → http://localhost:8787
```

## Verificación

```bash
npm run check       # rutas, enlaces, 4 formularios, SEO, headers, sitemap
npm test            # tests del cliente (menú, UTM, accesibilidad, logo)
npm run lint:html   # validación HTML de las 11 páginas renderizadas
```

## Despliegue a Cloudflare Workers

La URL pública **no cambia**: `https://empiezagratis.ofmtop.workers.dev`
(deriva de `name: "empiezagratis"` + slug de cuenta `ofmtop`).

```bash
npm install

# Opción A: login interactivo
npx wrangler login
npx wrangler deploy

# Opción B: token (recomendado para CI)
CLOUDFLARE_API_TOKEN=xxx CF_ACCOUNT_ID=yyy npx wrangler deploy
```

> `wrangler.jsonc` no incluye `account_id` a propósito (no es un secreto que
> quieras versionar). Añádelo al archivo o pásalo por `CF_ACCOUNT_ID` /
> `--account-id` en tu entorno de despliegue.

## Configuración central

Todo lo editable vive en **`src/config.js`**:

- `brand` — nombre, claim, descripción, edad mínima (18+)
- `domain` — dominio workers.dev (usada en canonical/OG/sitemap/robots)
- `logo` — URL oficial del logo (única fuente en toda la web)
- `social` — Instagram y Threads
- `forms` — los 4 formularios Google Forms (`/viewform`, nunca `/edit`)
- `utmParams` — parámetros UTM reconocidos

## UTM / tracking

- `main.js` lee `utm_source, utm_medium, utm_campaign, utm_content, utm_term`
  de la URL de entrada, los guarda en `sessionStorage` (no son datos
  personales) y los **añade automáticamente a los enlaces internos** al
  hacer clic, de modo que la atribución no se pierde al navegar.
- `window.OFTOP.utm` expone los valores actuales para conectar después un
  CRM o analytics (no se incluye nada de terceros de momento).
- La URL de Instagram `/?utm_source=ig&utm_medium=social&utm_content=link_in_bio`
  funciona sin tocar nada.

## Seguridad

- CSP estricta (`script-src 'self'`, `style-src 'self'`, `img-src` solo
  propio + `raw.githubusercontent.com` para el logo), `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS —
  aplicados a **todas** las respuestas (HTML y estáticos).
- Sin secretos ni API keys en el frontend. Sin scripts de terceros.
- Los formularios son enlaces externos (Google Forms) con
  `target="_blank" rel="noopener"`.

## Antes de lanzar tráfico real

1. **Rellenar los placeholders legales** `[COMPLETAR]` en
   `/legal/privacidad`, `/legal/aviso-legal` y `/legal/cookies`
   (responsable, NIF, dirección, email, plazos…).
2. Revisar que los 4 formularios Google Forms están activos y apuntan a tu
   hoja/CRM de destino.
3. Opcional: conectar un analytics/CRM leyendo `window.OFTOP.utm`.
4. Opcional: probar el flujo completo desde un iPhone (Instagram →
   link in bio → formulario).
