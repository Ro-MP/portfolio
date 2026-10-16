import type { SiteContent } from './types';

/**
 * Contenido en español. Mismas reglas que `en.ts`: solo cifras del spec 3.4 y todo lo que falte
 * lleva `[PENDIENTE: …]` o `pending:` en los medios.
 */
export const es: SiteContent = {
  lang: 'es',
  meta: {
    siteName: 'Rodrigo Márquez',
    title: 'Rodrigo Márquez — Software Engineer',
    description:
      'Ingeniero de software que construye integraciones con ERP, pipelines de datos distribuidos y forecasting aplicado. Casos de estudio con decisiones, arquitectura y resultados.',
    ogLocale: 'es_MX',
  },
  ui: {
    skipToContent: 'Saltar al contenido',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    langSwitcherLabel: 'Idioma',
    langNames: { en: 'English', es: 'Español' },
    pendingTag: 'PENDIENTE',
  },
  nav: {
    cases: 'Casos',
    about: 'Sobre mí',
    contact: 'Contacto',
    cv: 'CV',
    cvPending: 'PDF del CV en español',
  },
  hero: {
    eyebrow: 'Software Engineer · Pachuca, México',
    headline:
      'Ingeniero de software que construye las integraciones, pipelines y pronósticos que mantienen la operación en marcha.',
    subtitle:
      'Trabajo con integraciones ERP, pipelines de datos distribuidos y forecasting aplicado, y me hago cargo de lo que construyo, desde el problema del cliente hasta producción.',
    ctaCases: 'Ver casos de estudio',
    ctaContact: 'Contáctame',
    photo: {
      kind: 'image',
      ratio: '4 / 5',
      alt: 'Retrato de Rodrigo Márquez',
      pending: 'Retrato profesional, vertical 4:5, tratamiento cálido',
    },
  },
  metrics: {
    title: 'Resultados destacados',
    items: [
      {
        prefix: '~',
        value: 70,
        suffix: '%',
        label: 'menos tiempo de sincronización',
        context: 'Rediseño del pipeline de sync de SAP B1',
      },
      {
        text: '6–8',
        value: 8,
        suffix: ' hrs',
        label: 'ahorradas al día',
        context: 'Distribución de mercancía entrante, antes un proceso manual en hojas de cálculo',
      },
      {
        value: 200,
        suffix: '+',
        label: 'usuarios diarios',
        context: 'WMS Android en la operación de almacén',
      },
      {
        value: 150,
        suffix: 'k',
        label: 'productos sincronizados',
        context: 'En ~30 sucursales',
      },
    ],
  },
  casesSection: {
    eyebrow: 'Casos de estudio',
    title: 'Problemas en los que trabajé y las decisiones detrás',
    intro:
      'Cada caso va del problema de negocio a las decisiones, la arquitectura y los resultados. Se lee en unos tres minutos.',
    readCase: 'Leer el caso de estudio',
    metricLabel: 'Resultado clave',
  },
  caseTemplate: {
    back: 'Todos los casos',
    next: 'Siguiente caso',
    statusLabel: 'Estado',
    summaryLabel: 'En breve',
    sections: {
      context: 'Contexto y problema',
      role: 'Mi rol',
      decisions: 'Decisiones y alternativas descartadas',
      architecture: 'Arquitectura',
      modules: 'Qué automaticé',
      results: 'Resultados',
      tech: 'Tecnologías',
      retro: 'Qué haría distinto',
      demo: 'Demo',
    },
    decisionLabels: { chosen: 'Qué elegí', discarded: 'Alternativas que descarté', why: 'Por qué' },
    before: 'Antes',
    after: 'Después',
    moduleLabels: { problem: 'Problema', solution: 'Solución', result: 'Resultado' },
  },
  cases: {
    'demand-forecasting': {
      slug: 'demand-forecasting',
      kicker: 'Backend · Datos · AWS',
      title: 'Plataforma de pronóstico de demanda',
      summary:
        'Una plataforma multi-tenant de pronóstico de demanda: el cliente solo registra su conexión a SAP Service Layer y la plataforma hace el resto.',
      keyMetric: { value: '~10 min → segundos', label: 'por análisis de producto' },
      cover: {
        kind: 'video',
        ratio: '16 / 10',
        alt: 'Gráfica de pronóstico que combina el histórico de ventas y la demanda proyectada',
        pending: 'Loop mudo de 10–15 s del frontend (histórico + pronóstico) con datos sintéticos, y su imagen de portada',
      },
      context: [
        'Las decisiones de compra de una operación de retail/distribución con varias sucursales [PENDIENTE: confirmar con tu empleador cómo describir la industria] se analizaban producto por producto, y cada análisis tomaba unos 10 minutos.',
        'El objetivo era una plataforma en la que el cliente solo registra su conexión a SAP Service Layer y la plataforma se encarga del resto: leer los datos, pronosticar la demanda y generar las requisiciones de compra.',
      ],
      role: [
        'Propuse, diseñé, construí y desplegué la plataforma de punta a punta.',
        '[PENDIENTE: detalla tu rol concreto: qué partes escribiste tú y con quién colaboraste]',
      ],
      decisions: [
        {
          topic: 'Multi-tenancy y alta de clientes',
          chosen: '[PENDIENTE: cómo aíslas los datos de cada cliente y cómo funciona el registro de la conexión]',
          discarded: '[PENDIENTE: alternativas que evaluaste]',
          why: '[PENDIENTE: por qué elegiste este enfoque]',
        },
        {
          topic: 'Enfoque de pronóstico',
          chosen:
            'Pronóstico de series de tiempo que devuelve intervalos de confianza, no solo una estimación puntual. [PENDIENTE: modelo o librería elegida]',
          discarded: '[PENDIENTE: modelos o enfoques descartados]',
          why: '[PENDIENTE: por qué]',
        },
        {
          topic: 'Cómo llega el resultado a SAP',
          chosen: 'La plataforma genera las requisiciones de compra automáticamente en SAP. [PENDIENTE: mecanismo y validaciones]',
          discarded: '[PENDIENTE: alternativas]',
          why: '[PENDIENTE: por qué]',
        },
      ],
      architecture: {
        caption: 'Vista de contexto y contenedores de la plataforma.',
        media: {
          kind: 'diagram',
          ratio: '16 / 9',
          alt: 'Diagrama de arquitectura C4 de la plataforma de pronóstico de demanda',
          pending: 'Diagrama C4 (contexto y contenedores) rediseñado en SVG con la paleta del sitio',
        },
      },
      results: [
        { label: 'Análisis por producto', before: '~10 min', after: 'segundos' },
        { label: 'Requisiciones de compra', after: 'Generadas automáticamente en SAP' },
        { label: 'Adopción', after: 'Piloto con un cliente: más de 2,000 productos en 32 sucursales' },
        { label: 'Precisión del pronóstico', after: '[PENDIENTE: backtest con métrica vs. baseline]' },
      ],
      tech: [
        { group: 'Nube', items: ['AWS'] },
        { group: 'Integración', items: ['SAP Service Layer'] },
        { group: 'Pronóstico', items: ['Series de tiempo con intervalos de confianza'] },
        {
          group: 'Otros',
          items: ['[PENDIENTE: lenguajes, framework web, librería de forecasting, base de datos y servicios de AWS]'],
        },
      ],
      retro: ['[PENDIENTE: qué harías distinto, con criterio y madurez]'],
      demo: {
        caption: 'Recorrido con datos sintéticos.',
        media: {
          kind: 'video',
          ratio: '16 / 9',
          alt: 'Demo de la plataforma de pronóstico de demanda con datos sintéticos',
          pending: 'Demo de ~2 min (YouTube no listado o Vimeo) o capturas con datos sintéticos',
        },
      },
    },
    wms: {
      slug: 'wms',
      kicker: 'Android · Operación de almacén',
      title: 'WMS: la operación del almacén desde una app Android',
      summary:
        'Una app Android de gestión de almacén que se usa a diario para surtido, empaque y traspasos en dispositivos industriales.',
      keyMetric: { value: '~30%', label: 'de mejora en la recepción de mercancía' },
      cover: {
        kind: 'video',
        ratio: '16 / 10',
        alt: 'App Android escaneando artículos en un almacén',
        pending: 'Loop mudo de 10–15 s del flujo de escaneo en la app, con datos sintéticos, y su portada',
      },
      context: [
        'La operación necesitaba digitalizar el trabajo del almacén: recepción, surtido, empaque y traspasos, hechos en piso desde dispositivos portátiles.',
        'La app tenía que funcionar con escáneres y impresoras de etiquetas industriales, y permitir escanear artículos por lotes.',
      ],
      role: ['[PENDIENTE: tu rol: diseño, desarrollo Android, integración con SAP, despliegue]'],
      decisions: [
        {
          topic: 'Android nativo',
          chosen: 'Una app Android nativa en producción. [PENDIENTE: lenguaje y arquitectura de la app]',
          discarded: '[PENDIENTE: alternativas, p. ej. multiplataforma o web móvil]',
          why: '[PENDIENTE: por qué]',
        },
        {
          topic: 'Hardware industrial',
          chosen: 'Integración con escáneres e impresoras Zebra.',
          discarded: '[PENDIENTE: alternativas]',
          why: '[PENDIENTE: por qué]',
        },
        {
          topic: 'Escaneo por lotes',
          chosen: 'Escaneo por lotes mediante códigos QR.',
          discarded: '[PENDIENTE: alternativas]',
          why: '[PENDIENTE: por qué]',
        },
      ],
      architecture: {
        caption: 'Cómo encajan la app, el backend y los dispositivos del almacén.',
        media: {
          kind: 'diagram',
          ratio: '16 / 9',
          alt: 'Diagrama de arquitectura del WMS',
          pending: 'Diagrama de arquitectura del WMS (app, API, SAP, dispositivos Zebra)',
        },
      },
      results: [
        { label: 'Usuarios diarios', after: '~200' },
        { label: 'Operaciones diarias', after: 'Más de 2,000 operaciones de surtido, empaque y traspasos' },
        { label: 'Recepción de mercancía', after: '~30% de mejora' },
      ],
      tech: [
        { group: 'Móvil', items: ['Android (nativo)'] },
        { group: 'Hardware', items: ['Escáneres Zebra', 'Impresoras Zebra', 'Escaneo por lotes con QR'] },
        { group: 'Otros', items: ['[PENDIENTE: lenguaje, API/backend e integración con SAP]'] },
      ],
      retro: ['[PENDIENTE: qué harías distinto]'],
      demo: {
        caption: 'La app en uso, con datos sintéticos.',
        media: {
          kind: 'video',
          ratio: '16 / 9',
          alt: 'Demo de la app del WMS con datos sintéticos',
          pending: 'Demo o capturas del WMS con datos sintéticos y marco de dispositivo discreto',
        },
      },
    },
    tms: {
      slug: 'tms',
      kicker: 'Android · Offline-first',
      title: 'TMS: evidencia de entrega que funciona sin conexión',
      summary:
        'Una app Android de gestión de transporte con ubicación de choferes, evidencia fotográfica, firma del cliente y modo sin conexión.',
      keyMetric: { value: '~10', label: 'usuarios activos' },
      status: 'Pausado, a la espera de los requisitos del portal web.',
      cover: {
        kind: 'video',
        ratio: '16 / 10',
        alt: 'App Android capturando la firma de una entrega',
        pending: 'Loop mudo de 10–15 s de una entrega (firma y foto) con datos sintéticos, y su portada',
      },
      context: [
        'La operación de transporte necesitaba saber dónde estaban los choferes y comprobar cada entrega.',
        'Los choferes suelen trabajar sin una conexión confiable, así que la app tenía que seguir funcionando sin conexión.',
      ],
      role: ['[PENDIENTE: tu rol]'],
      decisions: [
        {
          topic: 'Modo sin conexión',
          chosen: 'La app funciona sin conexión. [PENDIENTE: estrategia de almacenamiento local y de sincronización]',
          discarded: '[PENDIENTE: alternativas]',
          why: '[PENDIENTE: por qué]',
        },
        {
          topic: 'Evidencia de entrega',
          chosen: 'Evidencia fotográfica y firma del cliente capturadas en la app.',
          discarded: '[PENDIENTE: alternativas]',
          why: '[PENDIENTE: por qué]',
        },
      ],
      architecture: {
        caption: 'Cómo encajan la app del chofer, el backend y el rastreo.',
        media: {
          kind: 'diagram',
          ratio: '16 / 9',
          alt: 'Diagrama de arquitectura del TMS',
          pending: 'Diagrama de arquitectura del TMS (app, sincronización offline, backend)',
        },
      },
      results: [
        { label: 'Usuarios activos', after: '~10' },
        { label: 'Estado', after: 'Pausado hasta definir los requisitos del portal web' },
      ],
      tech: [
        {
          group: 'Móvil',
          items: ['Android (nativo)', 'GPS de choferes', 'Evidencia fotográfica', 'Firma del cliente', 'Modo sin conexión'],
        },
        { group: 'Otros', items: ['[PENDIENTE: lenguaje, backend y sincronización]'] },
      ],
      retro: ['[PENDIENTE: qué harías distinto]'],
      demo: {
        caption: 'El flujo de entrega, con datos sintéticos.',
        media: {
          kind: 'video',
          ratio: '16 / 9',
          alt: 'Demo de la app del TMS con datos sintéticos',
          pending: 'Demo o capturas del TMS con datos sintéticos',
        },
      },
    },
    automations: {
      slug: 'automations',
      kicker: 'Integraciones · SAP B1 · Pipelines',
      title: 'Automatizaciones menores que eliminaron horas de trabajo manual',
      summary:
        'Un conjunto de integraciones y pipelines sobre SAP Business One que convirtieron procesos manuales y lentos en procesos confiables.',
      keyMetric: { value: '~70%', label: 'menos tiempo en la sincronización de SAP B1' },
      cover: {
        kind: 'video',
        ratio: '16 / 10',
        alt: 'Pipeline animado con un orquestador que reparte tareas a workers en paralelo',
        pending: 'Animación del diagrama orquestador / workers / callback (reemplaza al video en este caso)',
      },
      context: [
        'Varios procesos del día a día dependían de trabajo manual o de una sincronización lenta entre sucursales.',
        'Cada automatización tenía que ser confiable con datos reales del ERP, manejar errores y reportar su estado.',
      ],
      role: ['[PENDIENTE: tu rol en cada automatización]'],
      decisions: [
        {
          topic: 'Arquitectura del pipeline de sincronización',
          chosen: 'Un patrón orquestador / worker / callback con tareas en paralelo, reintentos y checkpoints.',
          discarded: '[PENDIENTE: alternativas que se evaluaron y por qué se descartaron]',
          why: '[PENDIENTE: por qué]',
        },
      ],
      architecture: {
        caption: 'Orquestador, workers y callback en el pipeline de sincronización de SAP B1.',
        media: {
          kind: 'diagram',
          ratio: '16 / 9',
          alt: 'Diagrama del patrón orquestador, worker y callback',
          pending: 'Diagrama del orquestador, workers paralelos y callback',
        },
      },
      modules: [
        {
          title: 'Pipeline de sincronización de SAP B1',
          problem: 'Una sincronización masiva y lenta de productos entre sucursales.',
          solution: 'Rediseñado con un patrón orquestador / worker / callback, tareas en paralelo, reintentos y checkpoints.',
          result: '~70% menos tiempo de sincronización, con ~150,000 productos en ~30 sucursales.',
        },
        {
          title: 'Carga masiva de documentos',
          problem: 'Documentos de ~500 productos cada uno se capturaban a mano.',
          solution:
            'Carga de ~500 productos por archivo, con validación de existencia y duplicados, y reintentos y checkpoints por ítem.',
          result: 'Sustituyó la captura manual.',
        },
        {
          title: 'Distribución de mercancía entrante',
          problem: 'Cada documento entrante se distribuía a mano en una hoja de cálculo y tomaba ~1–2 hrs por documento.',
          solution: 'Automaticé la distribución de la mercancía entrante.',
          result: '~6 documentos al día, con ~6–8 hrs ahorradas al día.',
        },
        {
          title: 'Timbrado de facturas (CFDI) y órdenes de compra masivas',
          problem: '[PENDIENTE: describe cómo se hacía antes del proceso de timbrado y carga de órdenes]',
          solution: 'Automaticé ambos procesos, con manejo de errores y seguimiento de estados.',
          result: '[PENDIENTE: cifra de impacto, si la tienes]',
        },
      ],
      results: [
        { label: 'Sincronización de SAP B1', before: 'Sincronización masiva y lenta', after: '~70% menos tiempo (~150,000 productos, ~30 sucursales)' },
        { label: 'Distribución de mercancía entrante', before: '~1–2 hrs por documento', after: '~6–8 hrs ahorradas al día' },
        { label: 'Carga masiva de documentos', after: '~500 productos por archivo, validados, con reintentos por ítem' },
      ],
      tech: [
        { group: 'ERP', items: ['SAP Business One'] },
        { group: 'Patrones', items: ['Orquestador / worker / callback', 'Tareas en paralelo', 'Reintentos y checkpoints'] },
        { group: 'Otros', items: ['[PENDIENTE: lenguajes, colas, base de datos y servicios usados]'] },
      ],
      retro: ['[PENDIENTE: qué harías distinto en el pipeline de sincronización]'],
      demo: {
        caption: 'El pipeline en ejecución, con datos sintéticos.',
        media: {
          kind: 'video',
          ratio: '16 / 9',
          alt: 'Demo del pipeline de sincronización con datos sintéticos',
          pending: 'Captura o video corto de una ejecución del pipeline con datos sintéticos',
        },
      },
    },
  },
  about: {
    eyebrow: 'Sobre mí',
    title: 'Ingeniero de software, del problema a producción',
    paragraphs: [
      'Soy Rodrigo, ingeniero de software de Pachuca, México, con unos tres años y medio de experiencia profesional construyendo sistemas backend, apps móviles e infraestructura en la nube para operaciones de negocio.',
      'Me gusta hacerme cargo de un problema de punta a punta: entender la operación, diseñar el sistema, entregarlo y ver cómo se comporta en producción.',
      'Uso agentes de IA como parte de mi práctica de ingeniería, escribiendo specs y planes y revisando el resultado, y mantengo la comunicación breve y explícita. [PENDIENTE: ajusta esta frase a tu forma real de trabajar]',
    ],
    photos: [
      {
        kind: 'image',
        ratio: '4 / 3',
        alt: 'Rodrigo trabajando en su escritorio',
        pending: 'Foto trabajando, tratamiento cálido coherente con el retrato',
      },
      {
        kind: 'image',
        ratio: '4 / 3',
        alt: 'Rodrigo en un contexto de operación',
        pending: 'Foto en contexto de operación (almacén, dispositivos o pantalla), sin datos reales visibles',
      },
    ],
    educationTitle: 'Formación',
    education: [
      'Ingeniería en Control y Automatización, IPN (2015–2020)',
      'Presidente de la sección estudiantil ISA-IPN',
    ],
    certificationsTitle: 'Certificaciones',
    certifications: [
      'MIT xPRO: Diseño y desarrollo de productos y servicios de IA (2025)',
      'IBM: RAG y Agentic AI (en curso) [PENDIENTE: confirmar si sigue en curso]',
    ],
  },
  stack: {
    eyebrow: 'Stack',
    title: 'Herramientas que puedo defender en una entrevista',
    intro: 'Una referencia rápida, agrupada por área.',
    groups: [
      { group: 'Backend', items: ['[PENDIENTE: lenguajes y frameworks de backend que puedas defender]'] },
      { group: 'Nube / DevOps', items: ['AWS', '[PENDIENTE: servicios de AWS, CI/CD y herramientas de infraestructura que uses]'] },
      { group: 'Frontend', items: ['[PENDIENTE: frameworks de frontend que puedas defender]'] },
      { group: 'Móvil', items: ['Android (nativo)'] },
      { group: 'Datos / IA', items: ['Pronóstico de series de tiempo', '[PENDIENTE: librerías y herramientas de datos e IA]'] },
      { group: 'SAP', items: ['SAP Business One', 'SAP Service Layer'] },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Contáctame',
    text: 'Si quieres hablar de integraciones con ERP, pipelines de datos o forecasting, escríbeme.',
    emailLabel: 'Escríbeme por correo',
    email: 'picazodeveloper@gmail.com',
    linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rodrigomarquezp' },
    github: { label: 'GitHub', pending: 'URL de tu perfil de GitHub' },
    cv: { label: 'Descargar CV', pending: 'PDF del CV en español' },
    expectation: '[PENDIENTE: confirmar tiempo de respuesta, p. ej. "Respondo en menos de 48 horas"]',
    location: 'Pachuca, Hidalgo, México',
  },
  footer: {
    confidentiality:
      'Los casos de estudio están anonimizados: se omiten nombres de clientes y datos, y cualquier captura usa datos sintéticos.',
    rights: '© 2026 Jose Rodrigo Marquez Picazo',
    builtWith: 'Hecho con Angular, alojado en AWS (S3 y CloudFront), infraestructura en Terraform.',
  },
  notFound: {
    title: 'Página no encontrada',
    text: 'Esa página no existe.',
    home: 'Volver al inicio',
  },
};
