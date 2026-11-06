import { FEATURES, FAQS } from '../data/content';
import { SITE, WHATSAPP_URL } from '../data/site';

/**
 * Datos estructurados (JSON-LD). Solo declaran hechos publicados en la página: no se
 * agregan precios, calificaciones ni direcciones que el negocio no haya confirmado.
 */
const abs = (site: URL, path: string) => new URL(path, site).href;
const id = (site: URL, name: string) => `${abs(site, '/')}#${name}`;

export const organizationSchema = (site: URL) => ({
  '@type': 'Organization',
  '@id': id(site, 'organization'),
  name: SITE.legalName,
  url: SITE.companyUrl,
  logo: abs(site, SITE.logoPath),
  sameAs: [SITE.companyUrl],
  areaServed: { '@type': 'Country', name: SITE.country.name },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: SITE.phone,
    url: WHATSAPP_URL,
    availableLanguage: ['es'],
    areaServed: SITE.country.code,
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: SITE.hours.days,
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
  },
});

export const websiteSchema = (site: URL) => ({
  '@type': 'WebSite',
  '@id': id(site, 'website'),
  url: abs(site, '/'),
  name: SITE.name,
  inLanguage: SITE.locale,
  publisher: { '@id': id(site, 'organization') },
});

export const softwareSchema = (site: URL, description: string) => ({
  '@type': 'SoftwareApplication',
  '@id': id(site, 'software'),
  name: SITE.name,
  url: abs(site, '/'),
  description,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Gestión de créditos, cartera y cobranza',
  operatingSystem: 'Web',
  inLanguage: SITE.locale,
  image: abs(site, SITE.ogImagePath),
  featureList: FEATURES.map((f) => f.title),
  publisher: { '@id': id(site, 'organization') },
});

export const faqSchema = (faqs: typeof FAQS) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

export const breadcrumbSchema = (site: URL, items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(site, item.path),
  })),
});

export const webPageSchema = (site: URL, path: string, name: string, description: string) => ({
  '@type': 'WebPage',
  '@id': `${abs(site, path)}#webpage`,
  url: abs(site, path),
  name,
  description,
  inLanguage: SITE.locale,
  isPartOf: { '@id': id(site, 'website') },
  about: { '@id': id(site, 'software') },
  primaryImageOfPage: abs(site, SITE.ogImagePath),
});

/** Agrupa los nodos en un solo documento JSON-LD. */
export const graph = (nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
