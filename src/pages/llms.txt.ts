import type { APIRoute } from 'astro';
import { AUDIENCES, FAQS, FEATURES } from '../data/content';
import { FEATURE_SEO } from '../data/feature-seo';
import { SITE, WHATSAPP_URL } from '../data/site';

// Resumen en Markdown para asistentes de IA (propuesta llms.txt). Se genera desde el mismo
// contenido de las páginas para que nunca diga algo distinto.
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const body = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} es un software en la nube para gestionar créditos, cartera y cobranza, con vista móvil para cobradores en ruta. Es un producto de ${SITE.legalName}, en Colombia.`,
    '',
    '## Para quién es',
    '',
    ...AUDIENCES.map(([title, text]) => `- ${title}: ${text}`),
    '',
    '## Funciones',
    '',
    ...FEATURES.map((f) => `- [${f.title}](${url(`/funciones/${f.id}/`)}): ${FEATURE_SEO[f.id]?.answer ?? f.heading}`),
    '',
    '## Preguntas frecuentes',
    '',
    ...FAQS.flatMap(({ q, a }) => [`### ${q}`, '', a, '']),
    '## Contacto',
    '',
    `- Sitio: ${url('/')}`,
    `- WhatsApp: ${SITE.phoneLabel} (${WHATSAPP_URL})`,
    '- Horario: lunes a viernes, 8 a. m. a 6 p. m.',
    `- Empresa: ${SITE.legalName} (${SITE.companyUrl})`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
