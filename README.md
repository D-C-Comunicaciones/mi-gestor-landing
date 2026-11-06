# MiGestor · Landing

Sitio público de MiGestor: una página de inicio y una página por cada función, pensadas para posicionar en buscadores (SEO) y en respuestas de asistentes de IA (GEO).

Es un sitio **estático** hecho con [Astro](https://astro.build). **No depende del backend ni del frontend de MiGestor**: no consume ninguna API, no usa base de datos y se publica por separado.

## Contenido

- [Requisitos](#requisitos)
- [Correr en local](#correr-en-local)
- [Comandos](#comandos)
- [Variables de entorno](#variables-de-entorno)
- [Deploy en Vercel](#deploy-en-vercel)
- [Deploy en otro hosting](#deploy-en-otro-hosting)
- [Después de publicar](#después-de-publicar)
- [Dónde está cada cosa](#dónde-está-cada-cosa)
- [Cómo editar el contenido](#cómo-editar-el-contenido)
- [Comportamientos que conviene conocer](#comportamientos-que-conviene-conocer)
- [Solución de problemas](#solución-de-problemas)

## Requisitos

| Herramienta | Versión | Cómo comprobarla |
| --- | --- | --- |
| Node.js | 22.12 o superior | `node -v` |
| pnpm | 12.5.1 (fijada en `package.json`) | `pnpm -v` |
| Git | Cualquiera reciente | `git --version` |

Si no tienes pnpm, instálalo con:

```bash
npm install -g pnpm@12.5.1
```

No uses `npm install` ni `yarn` en este proyecto: el lockfile es de pnpm.

## Correr en local

```bash
git clone https://github.com/D-C-Comunicaciones/mi-gestor-landing.git
cd mi-gestor-landing
pnpm install --frozen-lockfile
pnpm dev
```

Abre <http://localhost:4321>. Los cambios se ven al guardar. Si el puerto está ocupado, Astro usa el siguiente y lo indica en la consola.

El archivo `.env` es opcional en local: sin él, el sitio funciona con los valores por defecto. Para crearlo:

```bash
cp .env.example .env
```

Para probar exactamente lo que se publicará:

```bash
pnpm build
pnpm preview
```

Después de `pnpm build`, el aviso `PUBLIC_SITE_URL no está definida` es normal en local. En producción debe estar definida.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo en el puerto 4321 |
| `pnpm check` | Verifica tipos y plantillas |
| `pnpm build` | Genera el sitio final en `dist/` |
| `pnpm preview` | Sirve `dist/` en local; requiere haber corrido `pnpm build` |

Antes de subir cambios, corre `pnpm check` y `pnpm build`.

## Variables de entorno

| Variable | ¿Obligatoria? | Para qué sirve |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | **Sí, en producción** | Dominio público, por ejemplo `https://dcmigestor.co`. Define canonical, Open Graph, JSON-LD, `robots.txt`, sitemap y `llms.txt`. Sin ella se usa `https://dcmigestor.co`. |
| `PUBLIC_LOGIN_URL` | No | Muestra el enlace "Iniciar sesión" hacia la aplicación. Sin ella, el enlace no aparece. |

Se leen **al compilar**: si cambias una, hay que volver a compilar o a desplegar. Son públicas, así que nunca pongas secretos en ellas.

## Deploy en Vercel

### Primera vez

1. En [Vercel](https://vercel.com/new), elige **Add New → Project** e importa `D-C-Comunicaciones/mi-gestor-landing`.
2. Revisa la configuración. Vercel debería detectar Astro; si no, ponla a mano:

   | Campo | Valor |
   | --- | --- |
   | Framework Preset | Astro |
   | Root Directory | `./` |
   | Install Command | `pnpm install --frozen-lockfile` |
   | Build Command | `pnpm build` |
   | Output Directory | `dist` |

3. En **Environment Variables**, agrega:

   | Nombre | Valor |
   | --- | --- |
   | `PUBLIC_SITE_URL` | Tu dominio final, con `https://` y sin `/` al final |
   | `ENABLE_EXPERIMENTAL_COREPACK` | `1` |
   | `PUBLIC_LOGIN_URL` | Opcional: la dirección de inicio de sesión de la aplicación |

   `ENABLE_EXPERIMENTAL_COREPACK` hace que Vercel use la versión de pnpm fijada en `package.json`.

4. Pulsa **Deploy**.
5. En **Settings → Environments → Production**, confirma que la rama de producción sea `main`.

### Conectar el dominio

1. En **Settings → Domains**, agrega el dominio y crea en tu proveedor los registros DNS que Vercel indique.
2. Si cambias de dominio, actualiza `PUBLIC_SITE_URL` y vuelve a desplegar: canonical, sitemap y `robots.txt` se generan al compilar.

Si el dominio apuntaba al backend, que antes servía la landing, publica primero este sitio y cambia el DNS **antes** de desplegar el backend sin la landing. De lo contrario, los visitantes verán un error 404 en JSON. La API debe quedar en su propio subdominio.

### Publicar cambios

Cada `git push` a `main` despliega a producción. Las demás ramas generan una URL de vista previa.

```bash
pnpm check
pnpm build
git add .
git commit -m "Descripción del cambio"
git push origin main
```

### Comprobar el deploy

Abre estas direcciones con tu dominio:

- `/` y `/funciones/creditos/`: cargan bien y con transición entre páginas.
- `/robots.txt`, `/sitemap-index.xml` y `/llms.txt`: muestran tu dominio, no otro.
- `/una-direccion-que-no-existe/`: muestra la página 404 del sitio.

## Deploy en otro hosting

`pnpm build` genera en `dist/` archivos estáticos que funcionan en cualquier hosting, sin servidor Node.

```bash
PUBLIC_SITE_URL=https://tu-dominio.com pnpm build
```

Ejemplo con Nginx:

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/mi-gestor-landing/dist;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location /_astro/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    error_page 404 /404.html;
}
```

Agrega HTTPS con el método que uses en tu servidor.

## Después de publicar

1. Registra el dominio en Google Search Console y en Bing Webmaster Tools, y envía `sitemap-index.xml`.
2. Valida una página con la [prueba de resultados enriquecidos](https://search.google.com/test/rich-results).
3. Revisa cada mes las consultas reales en Search Console y ajusta `src/data/keywords.ts`: sus términos son hipótesis sin datos de volumen.

## Dónde está cada cosa

| Archivo o carpeta | Contenido |
| --- | --- |
| `src/data/content.ts` | Textos de la landing: funciones, roles, sección sin papel, cifras, pasos y preguntas |
| `src/data/feature-seo.ts` | Título, descripción y respuesta directa de cada función |
| `src/data/keywords.ts` | Diccionarios de palabras clave |
| `src/data/site.ts` | Empresa, teléfono, WhatsApp y horario |
| `src/pages/index.astro` | Estructura de la página de inicio |
| `src/pages/funciones/[slug].astro` | Plantilla de las páginas de cada función |
| `src/pages/404.astro` | Página de error |
| `src/pages/robots.txt.ts` | `robots.txt` |
| `src/pages/llms.txt.ts` | `llms.txt` para asistentes de IA |
| `src/lib/schema.ts` | Datos estructurados (JSON-LD) |
| `src/components/Seo.astro` | Metadatos de cada página |
| `src/components/PaperCard.astro` | Dibujo de la ficha de cobro en cartulina |
| `src/components/Zoomable.astro` | Capturas de la aplicación y marco de iPhone |
| `src/components/CtaRelief.astro` | Dibujos en relieve de la llamada a la acción |
| `src/components/Sprite.astro` | Íconos |
| `src/layouts/Base.astro` | Encabezado, pie, WhatsApp y transición entre páginas |
| `src/scripts/motion.js` | Scroll suave, URL limpia, barra de funciones, parallax y acordeón |
| `src/scripts/protect.js` | Bloqueo de atajos, clic derecho y arrastre de imágenes |
| `src/scripts/landing.js` | WhatsApp, botón "volver arriba" y visor de imágenes |
| `src/styles/global.css` | Estilos base |
| `src/styles/motion.css` | Animaciones y secciones animadas |
| `src/styles/seo-pages.css` | Estilos de las páginas de cada función |
| `src/assets/landing/` | Capturas de la aplicación |
| `public/` | Archivos servidos tal cual: logo, favicon e imagen para redes |

El sitemap lo genera `@astrojs/sitemap` en `sitemap-index.xml`.

## Cómo editar el contenido

- **Cambiar un texto:** edita `src/data/content.ts`. `llms.txt` se genera con esos mismos datos, así que se actualiza solo.
- **Cambiar teléfono, WhatsApp u horario:** edita `src/data/site.ts`.
- **Reemplazar una captura:** sustituye el archivo en `src/assets/landing/` con el mismo nombre. Astro la optimiza al compilar.
- **Agregar una función:** agrégala en `FEATURES` de `content.ts`, en `feature-seo.ts` y en `MODULE_KEYWORDS` de `keywords.ts`. La página se crea sola; si falta su SEO, el build falla.

Reglas de contenido:

- No agregues al JSON-LD precios, calificaciones ni direcciones que no estén confirmados: los datos estructurados falsos pueden acarrear penalizaciones.
- No uses los términos de `EXCLUDED_KEYWORDS` en textos ni en campañas.

## Comportamientos que conviene conocer

**Animaciones y configuración del sistema.** El sitio respeta la preferencia de reducir movimiento del sistema. En Windows, es el ajuste Configuración → Accesibilidad → Efectos visuales → **Efectos de animación**. Con ese ajuste apagado, no hay deslizamiento largo ni parallax: al navegar, la página se desvanece y reaparece en el destino. Para ver el deslizamiento completo, activa el ajuste y recarga. Si "no se ve la animación", revisa esto primero.

**Barra de funciones.** Las funciones se muestran de a una con la barra fija solo si todas caben en la pantalla y el ancho es de al menos 1024 px. En los demás casos, como en celular, van una debajo de otra con la barra pegada arriba.

**URL limpia.** Los enlaces internos no dejan `#seccion` en la dirección. Los enlaces con `#` siguen funcionando y se limpian al llegar. Sin JavaScript, el sitio funciona como navegación normal con todas las funciones visibles.

**Bloqueos contra la copia.** `protect.js` bloquea F12, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+Shift+I/J/C/K, el clic derecho y arrastrar imágenes, **también en `pnpm dev`**. Para inspeccionar la página, abre las herramientas desde el menú de Chrome o desactiva temporalmente el script en `Base.astro`. Esto solo frena la copia casual: el navegador siempre recibe el HTML y las imágenes, y no es posible impedir las capturas de pantalla.

**Auditoría de Astro.** La barra de desarrollo de Astro debe mostrar 0 avisos. El logo del encabezado es una imagen de fondo con precarga a propósito: como es fijo, la regla de carga diferida de Astro lo marcaría con cualquier valor de `loading`, según la posición del scroll.

## Solución de problemas

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| `ERR_PNPM_FROZEN_LOCKFILE_WITH_OUTDATED_LOCKFILE` | Cambió `package.json` sin actualizar el lockfile | Corre `pnpm install` y sube también `pnpm-lock.yaml` |
| pnpm rechaza un paquete recién publicado | `pnpm-workspace.yaml` no permite paquetes con menos de 24 horas | Espera 24 horas o usa una versión anterior |
| Vercel falla al instalar | Usa otra versión de pnpm | Confirma `ENABLE_EXPERIMENTAL_COREPACK=1` y vuelve a desplegar sin caché |
| El sitemap o el canonical muestran otro dominio | `PUBLIC_SITE_URL` falta o está mal | Corrígela y vuelve a desplegar |
| No se ven las animaciones | Efectos de animación del sistema apagados | Lee [Comportamientos que conviene conocer](#comportamientos-que-conviene-conocer) |
| F12 o el clic derecho no funcionan | Bloqueo intencional de `protect.js` | Abre las herramientas desde el menú del navegador |
| Los cambios no se ven en `pnpm preview` | `dist/` está desactualizado | Corre `pnpm build` de nuevo |
