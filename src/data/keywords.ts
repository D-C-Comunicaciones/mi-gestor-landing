/**
 * Diccionarios de palabras clave de MiGestor (español de Colombia).
 *
 * Son hipótesis de búsqueda, sin datos de volumen ni de competencia: valídalas con
 * Google Keyword Planner y Search Console, y conserva aquí solo las que traigan
 * impresiones de personas que realmente podrían comprar el producto.
 *
 * Uso: las páginas toman de aquí su meta keywords. Google ignora esa etiqueta para
 * posicionar, así que lo que importa es usar estos términos de forma natural en
 * títulos, encabezados y textos.
 */

/** Marca: búsquedas de quien ya conoce el producto. */
export const BRAND_KEYWORDS = ['MiGestor', 'MiGestor software', 'MiGestor créditos'];

/** Términos principales que describen el producto. */
export const PRIMARY_KEYWORDS = [
  'software de créditos',
  'software de cobranza',
  'software de gestión de cartera',
  'software para empresas de crédito',
  'software para prestamistas',
];

/** Variantes y sinónimos con que se describe la misma necesidad. */
export const SECONDARY_KEYWORDS = [
  'programa para prestamistas',
  'sistema de cobranza',
  'sistema para gestionar créditos',
  'plataforma de gestión de créditos',
  'control de cartera',
  'gestión de cobradores',
  'rutas de cobro',
  'app para cobradores',
];

/** Búsquedas según lo que la persona quiere lograr. */
export const INTENT_KEYWORDS = {
  /** Quiere resolver un problema o aprender. */
  informational: [
    'cómo llevar el control de créditos',
    'cómo controlar la cartera de clientes',
    'cómo organizar rutas de cobro',
    'cómo calcular un plan de pagos',
    'cómo pasar la cartera de Excel a un software',
  ],
  /** Está comparando opciones. */
  commercial: [
    'mejor software de cobranza',
    'software de cartera en la nube',
    'software de créditos con app para cobradores',
    'alternativa a Excel para controlar créditos',
  ],
  /** Está listo para hablar con alguien. */
  transactional: [
    'comprar software de créditos',
    'precio software de cobranza',
    'demo software de gestión de cartera',
  ],
};

/** Variantes geográficas. Agrega ciudades solo donde de verdad se ofrezca el servicio. */
export const LOCAL_KEYWORDS = [
  'software de créditos en Colombia',
  'software de cobranza Colombia',
  'software para prestamistas en Colombia',
  'software de cartera para empresas colombianas',
];

/** Preguntas en lenguaje natural, como se formulan a un buscador o a un asistente de IA. */
export const QUESTION_KEYWORDS = [
  '¿Qué software sirve para administrar créditos y cobradores?',
  '¿Cómo controlar los pagos de los cobradores en ruta?',
  '¿Qué programa usar en lugar de Excel para llevar una cartera de créditos?',
  '¿Cómo saber quién modificó un dato en un software de cartera?',
];

/** Términos por módulo: cada clave coincide con el id de una función en content.ts. */
export const MODULE_KEYWORDS: Record<string, string[]> = {
  creditos: ['software de créditos', 'calculadora de créditos', 'plan de pagos automático', 'refinanciación de créditos'],
  clientes: ['base de datos de clientes de crédito', 'ficha de clientes de crédito', 'gestión de clientes de crédito'],
  cobranza: ['software de cobranza', 'control de recaudo', 'cuentas vencidas', 'interés moratorio'],
  cobradores: ['app para cobradores', 'rutas de cobro', 'gestión de cobradores', 'cobranza en ruta'],
  importaciones: ['importar clientes desde Excel', 'migrar cartera desde Excel', 'plantilla de cartera en Excel'],
  reportes: ['reportes de cartera', 'reporte de recaudo', 'cartera vencida', 'dashboard de cobranza'],
  gastos: ['control de gastos de cobradores', 'gastos de operación de crédito', 'reporte de gastos'],
  auditoria: ['auditoría de cambios', 'registro de sesiones', 'historial de cambios de cartera'],
  usuarios: ['roles y permisos', 'permisos por usuario', 'control de acceso para cobradores'],
  marca: ['software de marca blanca para créditos', 'software de créditos con mi logo', 'reportes con logo de la empresa'],
};

/**
 * Términos que NO se deben usar para atraer tráfico.
 * "Gota a gota" designa préstamos informales asociados a ilegalidad en Colombia, y el
 * producto se dirige a operaciones formales. Úsalos también como negativas en campañas.
 */
export const EXCLUDED_KEYWORDS = ['gota a gota', 'préstamos gota a gota', 'préstamos sin papeles', 'cobro extorsivo'];

/** Palabras clave de la página de inicio. */
export const HOME_KEYWORDS = [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS.slice(0, 4), ...LOCAL_KEYWORDS.slice(0, 2), BRAND_KEYWORDS[0]];
