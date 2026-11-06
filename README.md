# MiGestor · Landing

Sitio público de MiGestor, separado del backend. Es un sitio estático hecho con Astro y pensado para posicionar en buscadores (SEO) y en respuestas de asistentes de IA (GEO).

## Uso

Requiere Node 22.12 o superior y pnpm.

```bash
pnpm install
cp .env.example .env   # define el dominio real
pnpm dev               # http://localhost:4321
pnpm check             # verifica tipos
pnpm build             # genera dist/
pnpm preview           # sirve dist/ en local
```

`dist/` se puede publicar en cualquier hosting estático o detrás de Nginx.

## Configuración

| Variable | Para qué sirve |
| --- | --- |
| `PUBLIC_SITE_URL` | Dominio público. Define canonical, Open Graph, JSON-LD, `robots.txt`, sitemap y `llms.txt`. |
| `PUBLIC_LOGIN_URL` | Opcional. Muestra el enlace "Iniciar sesión"; sin ella, el enlace no aparece. |

El sitio no depende del backend ni del frontend de MiGestor: no consume ninguna API y funciona por sí solo. Define `PUBLIC_SITE_URL` al compilar para producción; si falta, el build avisa y usa el valor por defecto.

## Dónde está cada cosa

| Archivo | Contenido |
| --- | --- |
| `src/data/content.ts` | Textos de la landing y capturas |
| `src/data/feature-seo.ts` | Título, descripción y respuesta directa de cada módulo |
| `src/data/keywords.ts` | Diccionarios de palabras clave |
| `src/data/site.ts` | Datos de la empresa y de contacto |
| `src/lib/schema.ts` | Datos estructurados (JSON-LD) |
| `src/components/Seo.astro` | Metadatos de cada página |
| `src/scripts/motion.js` y `src/styles/motion.css` | Scroll suave, URL limpia, barra de funciones, acordeón y animaciones |
| `src/pages/robots.txt.ts` | `robots.txt` |
| `src/pages/llms.txt.ts` | `llms.txt` para asistentes de IA |

El sitemap lo genera `@astrojs/sitemap` en `sitemap-index.xml`.

## Después de publicar

1. Registra el dominio en Google Search Console y en Bing Webmaster Tools, y envía `sitemap-index.xml`.
2. Valida una página con la [prueba de resultados enriquecidos](https://search.google.com/test/rich-results).
3. Revisa cada mes las consultas reales en Search Console y ajusta `src/data/keywords.ts`: sus términos son hipótesis sin datos de volumen.

## Reglas de contenido

- No agregues al JSON-LD precios, calificaciones ni direcciones que no estén confirmados: los datos estructurados falsos pueden acarrear penalizaciones.
- Al crear un módulo en `content.ts`, agrega también su entrada en `feature-seo.ts` y `keywords.ts`; si falta el SEO, el build falla.
- No uses los términos de `EXCLUDED_KEYWORDS` en textos ni en campañas.
