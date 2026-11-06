/**
 * SEO de la página propia de cada módulo (/funciones/<id>/).
 * `answer` es la respuesta directa con la que abre la página: los buscadores y los
 * asistentes de IA citan mejor un párrafo que se entiende solo. Debe describir únicamente
 * lo que el producto hace (ver los items del módulo en content.ts).
 * `faqs` son posiciones dentro de FAQS.
 */
export type FeatureSeo = { title: string; description: string; h1: string; answer: string; faqs: number[] };

export const FEATURE_SEO: Record<string, FeatureSeo> = {
  creditos: {
    title: 'Software de créditos con plan de pagos | MiGestor',
    description: 'Crea créditos con el plan de pagos calculado: frecuencia diaria, semanal, quincenal o mensual, períodos de gracia, refinanciación y estados claros.',
    h1: 'Software de créditos con el plan de pagos ya calculado',
    answer: 'El módulo de créditos de MiGestor calcula el plan de pagos a partir del monto, el interés, el plazo, la frecuencia y la fecha del primer pago. Maneja frecuencias diaria, semanal, quincenal y mensual, períodos de gracia y refinanciación, y se adapta a tus líneas de crédito.',
    faqs: [0],
  },
  clientes: {
    title: 'Gestión de clientes de crédito | MiGestor',
    description: 'Ficha completa de cada cliente: documento, contacto, créditos abiertos, créditos en mora, saldo total y notas para que el equipo conserve el contexto.',
    h1: 'Gestión de clientes de crédito en una sola ficha',
    answer: 'MiGestor guarda la ficha completa de cada persona a la que le prestas: documento, contacto, datos personales, créditos abiertos, créditos en mora, saldo total y notas del equipo. Puedes desactivar a un cliente sin perder su información.',
    faqs: [3],
  },
  cobranza: {
    title: 'Software de cobranza y control de recaudo | MiGestor',
    description: 'Registra cada pago con tope automático y vista previa del saldo. Consulta cuentas vencidas, interés moratorio, deuda total y días de atraso.',
    h1: 'Software de cobranza con cada pago validado',
    answer: 'MiGestor valida cada pago antes de afectar el saldo: no permite recaudar más de lo adeudado y muestra una vista previa con el cliente, el valor, el medio de pago y el saldo resultante. También lista las cuentas vencidas con su interés moratorio, deuda total y días de atraso.',
    faqs: [1],
  },
  cobradores: {
    title: 'App para cobradores y rutas de cobro | MiGestor',
    description: 'Organiza rutas de cobro desde la oficina. Cada cobrador ve sus clientes en el celular, registra pagos con vista previa y separa sus gastos.',
    h1: 'App para cobradores y gestión de rutas de cobro',
    answer: 'Con MiGestor organizas las rutas de cobro desde la oficina y cada cobrador trabaja desde el celular: ve sus clientes asignados con lo vencido primero, registra los cobros con el mismo tope y la misma vista previa, y lleva su historial y sus gastos.',
    faqs: [2],
  },
  importaciones: {
    title: 'Importa tu cartera desde Excel | MiGestor',
    description: 'Trae clientes, cobradores y rutas desde Excel o CSV con plantillas descargables. El proceso muestra el avance y los errores detallados por fila.',
    h1: 'Importa tu cartera desde Excel sin digitar uno por uno',
    answer: 'MiGestor importa clientes, cobradores y rutas desde archivos Excel o CSV con plantillas descargables. La importación corre en segundo plano mientras sigues trabajando y muestra el avance y los errores detallados por fila.',
    faqs: [3],
  },
  reportes: {
    title: 'Reportes de cartera y recaudo en PDF y Excel | MiGestor',
    description: 'Dashboard personalizable y reportes de estado de cartera, recaudo, cobro por cobrador, cartera vencida, intereses moratorios y gastos, en PDF y Excel.',
    h1: 'Reportes de cartera y recaudo listos para compartir',
    answer: 'MiGestor incluye un dashboard personalizable y reportes de resumen general, estado de cartera, créditos nuevos, recaudo, cobro por cobrador, cuotas por recaudar, cartera vencida, intereses moratorios y gastos, con descarga en PDF y Excel.',
    faqs: [],
  },
  gastos: {
    title: 'Control de gastos de la operación de crédito | MiGestor',
    description: 'Registra los gastos de tu operación por categoría y consulta los totales por categoría y por cobrador en el centro de reportes de MiGestor.',
    h1: 'Control de gastos de tu operación de crédito',
    answer: 'MiGestor registra los gastos de la operación por categoría, junto a tu cartera, y muestra los totales por categoría y por cobrador en el centro de reportes.',
    faqs: [],
  },
  auditoria: {
    title: 'Auditoría de sesiones y cambios | MiGestor',
    description: 'Consulta quién entró, desde qué dispositivo e IP, los intentos fallidos y quién modificó cada dato, con su valor anterior y su valor nuevo.',
    h1: 'Auditoría: quién hizo qué, cuándo y desde dónde',
    answer: 'MiGestor registra las sesiones con dispositivo, navegador, IP y ubicación, los intentos fallidos de inicio de sesión y su motivo, y el historial de cambios: quién modificó cada dato, cómo estaba y cómo quedó.',
    faqs: [4],
  },
  usuarios: {
    title: 'Usuarios, roles y permisos | MiGestor',
    description: 'Crea roles a tu medida y elige sus permisos módulo por módulo. Administra usuarios y consulta su último acceso en MiGestor.',
    h1: 'Usuarios, roles y permisos a tu medida',
    answer: 'En MiGestor creas roles a tu medida y eliges sus permisos módulo por módulo, de modo que cada persona ve y hace solo lo que le corresponde. También puedes crear, editar o desactivar usuarios y consultar su último acceso.',
    faqs: [4],
  },
  marca: {
    title: 'Software de créditos con tu marca | MiGestor',
    description: 'Configura el logo, el nombre y una paleta de cinco colores. Tu identidad también aparece en los reportes PDF y Excel que genera MiGestor.',
    h1: 'Software de créditos con la identidad de tu empresa',
    answer: 'MiGestor se configura con el logo, el nombre y una paleta de cinco colores de tu empresa, y esa identidad también aparece en los reportes PDF y Excel. Incluye una guía de uso por rol y tutoriales paso a paso en cada pantalla.',
    faqs: [5],
  },
};
