// Textos migrados sin cambios de la landing del backend (src/landing-page.ts).

export type Shot = { src: string; alt: string; width: number; height: number; phone?: boolean };

// Capturas reales de la aplicación, tomadas con la base de demostración (scripts/dev)
const desktopShot = (name: string, alt: string): Shot => ({ src: `/landing/${name}.jpg`, alt, width: 1440, height: 900 });
const phoneShot = (name: string, alt: string): Shot => ({ src: `/landing/${name}.jpg`, alt, width: 390, height: 844, phone: true });

export const SHOTS = {
  dashboard: desktopShot('dashboard', 'Dashboard de MiGestor con recaudo, clientes en mora y gráficas'),
  clientes: desktopShot('clientes', 'Listado de clientes de MiGestor'),
  calculadora: desktopShot('calculadora', 'Calculadora de MiGestor con el plan de pagos y el botón para crear el crédito'),
  vencidas: desktopShot('vencidas', 'Cuentas vencidas en MiGestor, con interés moratorio y deuda total'),
  mora: desktopShot('mora', 'Formulario para agregar interés moratorio a un crédito en MiGestor'),
  rutas: desktopShot('rutas', 'Rutas de cobranza de MiGestor con sus clientes y cobradores'),
  movil: phoneShot('cobrador-movil', 'Vista móvil del cobrador en MiGestor con sus clientes por cobrar'),
  importar: desktopShot('importar', 'Importación masiva de clientes en MiGestor con su plantilla'),
  gastos: desktopShot('gastos', 'Reporte de gastos de la operación en MiGestor'),
  reportes: desktopShot('reportes', 'Reporte de estado de cartera en MiGestor'),
  usuarios: desktopShot('usuarios', 'Usuarios y roles en MiGestor con su último acceso'),
  marca: desktopShot('marca', 'Configuración de los colores de la marca en MiGestor'),
  sesiones: desktopShot('sesiones', 'Registro de sesiones de MiGestor con dispositivo, IP y estado'),
  cambios: desktopShot('cambios', 'Historial de cambios de MiGestor con el valor anterior y el nuevo de cada campo'),
};

export const BENEFITS: [string, string, string][] = [
  ['cloud', 'En la nube', 'Entras desde el navegador, sin instalar nada en tu computador.'],
  ['phone', 'También en el celular', 'Cada cobrador trabaja su ruta y registra los pagos desde su teléfono.'],
  ['shield', 'Pagos validados', 'El sistema no acepta un recaudo mayor a lo que el cliente debe.'],
  ['file', 'Reportes listos', 'Descarga tus reportes en PDF y Excel con los datos de tu empresa.'],
  ['eye', 'Todo queda registrado', 'Sabes quién entró al sistema y quién modificó cada dato.'],
];

export const AUDIENCES: [string, string, string][] = [
  ['Empresas y oficinas de crédito', 'Que manejan cartera propia y necesitan controlar saldos, mora y recaudo sin depender de hojas de cálculo.', 'building'],
  ['Inversionistas y prestamistas formales', 'Que quieren saber con exactitud cuánto han prestado, cuánto han recibido y cuánto falta por cobrar.', 'coins'],
  ['Operaciones con cobradores en calle', 'Con rutas diarias o semanales, donde cada cobro debe quedar registrado en el momento y por quien lo hizo.', 'route'],
  ['Negocios que venden a crédito', 'Que financian a sus propios clientes y deben hacer seguimiento a las cuotas de cada uno.', 'store'],
];

export type Feature = { id: string; title: string; heading: string; items: string[]; shots: Shot[] };

export const FEATURES: Feature[] = [
  {
    id: 'creditos',
    title: 'Créditos',
    heading: 'Crea créditos con el plan de pagos ya calculado',
    items: [
      'Nos adaptamos a tu modelo de negocio y a tus líneas de crédito',
      'Frecuencia de pago diaria, semanal, quincenal o mensual, y períodos de gracia',
      'Calculadora flotante: simula y crea el crédito eligiendo solo el cliente',
      'Refinanciación, ajuste de interés y listado de créditos anulados',
      'Estados claros: Al día, En mora, Saldo pendiente, Pagado, Anulado y Refinanciado',
    ],
    shots: [SHOTS.calculadora],
  },
  {
    id: 'clientes',
    title: 'Clientes',
    heading: 'La ficha completa de cada persona a la que le prestas',
    items: [
      'Registro guiado en tres pasos, con documento, contacto y datos personales',
      'Detalle con créditos abiertos, créditos en mora y saldo total',
      'Notas sobre cada cliente para que el equipo conserve el contexto',
      'Activa o desactiva clientes sin perder su información',
    ],
    shots: [SHOTS.clientes],
  },
  {
    id: 'cobranza',
    title: 'Cobranza',
    heading: 'Cada pago validado y confirmado antes de afectar el saldo',
    items: [
      'Tope automático: no se recauda más de lo adeudado, saldo más mora pendiente',
      'Se puede pagar más o menos que la cuota, dentro de ese tope',
      'Vista previa con cliente, valor, medio de pago y saldo resultante',
      'Cuentas vencidas con interés moratorio, deuda total y días de atraso',
      'Mora opcional: manual o automática, según lo que necesite tu empresa',
      'Descuentos aplicados y consultables por crédito',
    ],
    shots: [SHOTS.vencidas],
  },
  {
    id: 'cobradores',
    title: 'Cobradores y rutas',
    heading: 'Organiza el trabajo en calle desde la oficina',
    items: [
      'Rutas con sus clientes y cobradores, y aviso de rutas sin cobrador',
      'Vista móvil con los clientes asignados y lo vencido primero',
      'Registro de cobros desde el celular, con el mismo tope y la misma vista previa',
      'Historial de cobros del cobrador y aviso de clientes fuera de ruta',
      'Gastos propios del cobrador, separados de los de la empresa',
    ],
    shots: [SHOTS.rutas, SHOTS.movil],
  },
  {
    id: 'importaciones',
    title: 'Importaciones',
    heading: 'Trae tu cartera sin digitar uno por uno',
    items: [
      'Clientes, cobradores y rutas desde archivos Excel o CSV',
      'Plantillas descargables con campos obligatorios, ejemplos y listas desplegables',
      'Se procesa en segundo plano mientras sigues trabajando',
      'Avance visible y errores detallados por fila',
    ],
    shots: [SHOTS.importar],
  },
  {
    id: 'reportes',
    title: 'Reportes',
    heading: 'Tu operación en cifras, lista para compartir',
    items: [
      'Dashboard personalizable: agrega, quita y ordena gráficas y reportes',
      'Resumen general, estado de cartera y créditos nuevos',
      'Recaudo, cobro por cobrador y cuotas por recaudar',
      'Cartera vencida, intereses moratorios y gastos',
      'Cuadre de cifras y descarga en PDF y Excel',
    ],
    shots: [SHOTS.reportes],
  },
  {
    id: 'gastos',
    title: 'Gastos',
    heading: 'Los gastos de la operación junto a tu cartera',
    items: [
      'Registro, edición y eliminación de gastos por categoría',
      'Totales por categoría y por cobrador en el centro de reportes',
    ],
    shots: [SHOTS.gastos],
  },
  {
    id: 'auditoria',
    title: 'Auditoría',
    heading: 'Sabes quién hizo qué, cuándo y desde dónde',
    items: [
      'Registro de sesiones con dispositivo, navegador, IP y ubicación',
      'Intentos fallidos de inicio de sesión y su motivo',
      'Historial de cambios: quién modificó cada dato, cómo estaba y cómo quedó',
      'Acceso controlado con permisos propios',
    ],
    shots: [SHOTS.sesiones, SHOTS.cambios],
  },
  {
    id: 'usuarios',
    title: 'Usuarios y permisos',
    heading: 'Cada persona ve y hace solo lo que le corresponde',
    items: [
      'Crea roles a tu medida y elige sus permisos módulo por módulo',
      'Crea, edita o desactiva usuarios y consulta su último acceso',
      'El administrador conserva el acceso total',
    ],
    shots: [SHOTS.usuarios],
  },
  {
    id: 'marca',
    title: 'Tu marca',
    heading: 'La plataforma con la identidad de tu empresa',
    items: [
      'Logo, nombre y paleta de cinco colores configurables',
      'Tus colores y datos también en los reportes PDF y Excel',
      'Guía de uso por rol y tutoriales paso a paso en cada pantalla',
    ],
    shots: [SHOTS.marca],
  },
];

export const PAPERLESS = {
  title: 'Ahorra en papel: la ficha de cobro ahora es virtual',
  lead: 'Deja de comprar cartulinas y de llenar una ficha por cada cliente. En MiGestor cada abono queda registrado desde el celular del cobrador, y la oficina trabaja con la misma información.',
  points: [
    'Sin cartulinas que comprar, repartir ni reponer',
    'Sin fichas que se pierden, se mojan o se dañan en la ruta',
    'El saldo se actualiza con cada abono, sin cuentas a mano',
  ],
};

export const FACTS: [string, string, string][] = [
  ['9', 'reportes listos para descargar', 'file'],
  ['4', 'frecuencias de pago', 'calendar'],
  ['3', 'tipos de importación masiva', 'upload'],
  ['5', 'colores para tu marca', 'palette'],
];

export const STEPS: [string, string, string][] = [
  ['Carga tu cartera', 'Crea clientes uno a uno o impórtalos con las plantillas de Excel.', 'upload'],
  ['Simula y crea el crédito', 'Elige monto, interés, plazo y frecuencia; el sistema calcula el plan de pagos.', 'calculator'],
  ['Organiza las rutas', 'Asigna clientes a rutas y cobradores a cada ruta.', 'route'],
  ['Registra cada cobro', 'El cobrador o la oficina registra el pago, revisa la vista previa y confirma.', 'wallet'],
  ['Revisa los resultados', 'Dashboard y reportes muestran recaudo, cartera y mora con lo registrado.', 'chart'],
];

export const ROLES_INTRO = 'Crea los usuarios que necesites, asígnales un rol y personaliza sus permisos. Los cobradores se gestionan aparte, con un acceso hecho solo para su trabajo.';

export const ROLE_CARDS = [
  {
    name: 'Administrador',
    summary: 'Tiene acceso total y decide quién entra y qué puede hacer.',
    icon: 'shield',
    tone: 'yes',
    items: ['Crea, edita y desactiva usuarios', 'Asigna a cada usuario su rol', 'Crea roles a la medida de tu empresa', 'Agrega o quita permisos en cada rol'],
    foot: 'Conserva el acceso total a todos los módulos.',
  },
  {
    name: 'Usuarios',
    summary: 'Ven y hacen solo lo que permita el rol que les asignes.',
    icon: 'sliders',
    tone: 'choice',
    items: ['Clientes y créditos', 'Cobranza', 'Dashboard y reportes', 'Gastos', 'Auditoría'],
    note: 'Según su rol',
    foot: 'Cambias sus permisos cuando lo necesites.',
  },
  {
    name: 'Cobradores',
    summary: 'Se gestionan aparte, en su propio módulo, y solo tienen acceso a:',
    icon: 'phone',
    tone: 'yes',
    items: ['Registrar pagos', 'Ver sus recaudos', 'Registrar y ver gastos', 'Centro de ayuda'],
    foot: 'No necesitan un rol: su acceso ya está definido.',
  },
] as const;

export const FAQS: { q: string; a: string; shots?: Shot[] }[] = [
  {
    q: '¿Cómo se calcula un crédito en MiGestor?',
    a: 'Nos adaptamos a tu modelo de negocio y a las líneas de crédito que manejes. Indicas el monto, el interés, el plazo, la frecuencia de pago y la fecha del primer pago, y el sistema genera el plan de pagos. Desde la misma calculadora puedes crear el crédito: los datos quedan listos y solo eliges el cliente.',
    shots: [SHOTS.calculadora],
  },
  {
    q: '¿El sistema cobra intereses de mora automáticamente?',
    a: 'Es opcional. Tu equipo puede agregar el interés de mora de forma manual cuando corresponda o, si lo prefieres, el sistema puede hacerlo automáticamente. Esta funcionalidad se activa o se desactiva según lo que necesite tu empresa.',
    shots: [SHOTS.mora],
  },
  {
    q: '¿Mis cobradores pueden trabajar desde el celular?',
    a: 'Sí. El cobrador tiene una vista móvil con sus clientes, el registro de cobros, su historial, sus gastos y una guía de ayuda.',
    shots: [SHOTS.movil],
  },
  {
    q: '¿Puedo traer la información que ya tengo en Excel?',
    a: 'Sí. Puedes importar clientes, cobradores y rutas con plantillas descargables. El sistema muestra el avance y los errores por fila.',
    shots: [SHOTS.importar],
  },
  {
    q: '¿Puedo saber quién modificó un dato?',
    a: 'Sí. El historial de cambios muestra quién hizo cada modificación, cuándo, cómo estaba antes y cómo quedó. El registro de sesiones muestra quién entró, desde qué dispositivo e IP.',
    shots: [SHOTS.cambios],
  },
  {
    q: '¿Puede llevar el logo y los colores de mi empresa?',
    a: 'Sí. Desde la configuración defines el logo, el nombre y una paleta de cinco colores.',
    shots: [SHOTS.marca],
  },
  {
    q: '¿Me asesoran según mi modelo de negocio?',
    a: 'Estudiamos tu modelo para proponer estrategias y recomendaciones adaptadas a tu negocio, ayudándote a tomar decisiones financieras y legales informadas. Confía en nuestra asesoría experta para tomar el control de tu futuro financiero y transaccional.',
  },
  {
    q: '¿Qué incluye la implementación de MiGestor?',
    a: 'Nos ocupamos de la configuración personalizada de tu marca, la implementación de tus reglas de negocio, la preparación de plantillas de documentos y el suministro de soporte técnico continuo. Nuestro objetivo es garantizar el éxito en la implementación y puesta en marcha de tu negocio.',
  },
  {
    q: '¿Cuánto cuesta y cómo empiezo?',
    a: 'Escríbenos por WhatsApp, cuéntanos cómo funciona tu operación y te damos toda la información del producto.',
  },
];

