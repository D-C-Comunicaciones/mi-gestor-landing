import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// astro.config se evalúa antes de que Vite cargue .env
try {
  process.loadEnvFile('.env');
} catch {
  // Sin .env: se usan las variables del entorno o los valores por defecto
}

const DEFAULT_SITE = 'https://dcmigestor.co';
const site = process.env.PUBLIC_SITE_URL || DEFAULT_SITE;

if (!process.env.PUBLIC_SITE_URL) {
  console.warn(`[mi-gestor-landing] PUBLIC_SITE_URL no está definida: se usa ${DEFAULT_SITE}. Confírmala antes de publicar.`);
}

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      lastmod: new Date(),
      serialize(item) {
        const path = new URL(item.url).pathname;
        item.priority = path === '/' ? 1 : 0.8;
        return item;
      },
    }),
  ],
});
