export const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=573506105945&text=Estoy+interesado+en+el+software+MiGestor.&type=phone_number&app_absent=0';

export const SITE = {
  name: 'MiGestor',
  legalName: 'D&C IDEM COMUNICACIONES S.A.S.',
  companyUrl: 'https://dccomunicacionessas.com',
  phone: '+573506105945',
  phoneLabel: '+57 350 610 5945',
  locale: 'es-CO',
  ogLocale: 'es_CO',
  country: { code: 'CO', name: 'Colombia' },
  hours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
  logoPath: '/logo.png',
  ogImagePath: '/og.jpg',
  ogImageAlt: 'Dashboard de MiGestor con recaudo, clientes en mora y gráficas',
} as const;

/** Enlace opcional a la aplicación. La landing no depende de ella: sin esta variable, el enlace no aparece. */
export const LOGIN_URL: string | undefined = import.meta.env.PUBLIC_LOGIN_URL || undefined;
