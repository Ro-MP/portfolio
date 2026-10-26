import { tmsDiagram, tmsDiagramAlt } from './diagrams/tms.ts';
import type { SiteContent } from './types';

/**
 * Contenido en inglés (idioma principal).
 * Regla: solo cifras del spec 3.4; lo que falte lleva `[PENDIENTE: …]` o `pending:` en los medios.
 */
export const en: SiteContent = {
  lang: 'en',
  meta: {
    siteName: 'Rodrigo Márquez',
    title: 'Rodrigo Márquez — Software Engineer',
    description:
      'Software engineer building ERP integrations, distributed data pipelines and applied forecasting. Case studies with decisions, architecture and results.',
    ogLocale: 'en_US',
  },
  ui: {
    skipToContent: 'Skip to content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    langSwitcherLabel: 'Language',
    langNames: { en: 'English', es: 'Español' },
    pendingTag: 'PENDIENTE',
  },
  nav: {
    cases: 'Cases',
    about: 'About',
    contact: 'Contact',
    cv: 'CV',
    cvPending: 'PDF del CV en inglés',
  },
  hero: {
    eyebrow: 'Software Engineer · México',
    headline:
      'Software Engineer transforming operations through enterprise integrations, high-performance pipelines, and predictive AI.',
    subtitle:
      "I work on ERP integrations, distributed data pipelines and applied forecasting, and I own what I build from the customer's problem to production.",
    ctaCases: 'View case studies',
    ctaContact: 'Get in touch',
    photo: {
      kind: 'image',
      ratio: '4 / 5',
      alt: 'Portrait of Rodrigo Márquez',
      src: '/media/hero-1.webp',
    },
  },
  metrics: {
    title: 'Selected results',
    items: [
      {
        prefix: '~',
        value: 70,
        suffix: '%',
        label: 'less sync time',
        context: 'SAP B1 sync pipeline redesign with +150k products',
      },
      {
        text: '6–8',
        value: 8,
        suffix: ' hrs',
        label: 'saved per day',
        context: 'Inbound goods distribution, from a manual spreadsheet process',
      },
      {
        value: 200,
        suffix: '+',
        label: 'daily users',
        context: 'Android WMS in warehouse operations',
      },
      {
        value: 150,
        suffix: 'k',
        label: 'products synced',
        context: 'Across ~30 branches',
      },
    ],
  },
  casesSection: {
    eyebrow: 'Case studies',
    title: 'Problems I worked on, and the decisions behind them',
    intro:
      'Each case goes from the business problem to the decisions, the architecture and the results. It takes about three minutes to read.',
    readCase: 'Read the case study',
    metricLabel: 'Key result',
  },
  caseTemplate: {
    back: 'All case studies',
    next: 'Next case study',
    statusLabel: 'Status',
    summaryLabel: 'In short',
    sections: {
      context: 'Context and problem',
      role: 'My role',
      decisions: 'Decisions and discarded alternatives',
      architecture: 'Architecture',
      modules: 'What I automated',
      results: 'Results',
      tech: 'Technologies',
      retro: 'What I would do differently',
      demo: 'Demo',
    },
    decisionLabels: { chosen: 'What I chose', discarded: 'Alternatives I discarded', why: 'Why' },
    before: 'Before',
    after: 'After',
    moduleLabels: { problem: 'Problem', solution: 'Solution', result: 'Result' },
  },
  cases: {
    'demand-forecasting': {
      slug: 'demand-forecasting',
      kicker: 'Backend · Data · AWS',
      title: 'Demand Forecasting Platform',
      summary:
        'A multi-tenant demand forecasting platform: the client registers its SAP Service Layer connection and the platform does the rest.',
      keyMetric: { value: '~10 min → seconds', label: 'per-product analysis' },
      cover: {
        kind: 'video',
        ratio: '16 / 10',
        alt: 'Forecast chart combining sales history and projected demand',
        pending: 'Loop mudo de 10–15 s del frontend (histórico + pronóstico) con datos sintéticos, y su imagen de portada',
      },
      context: [
        'Purchasing decisions for a multi-branch retail/distribution operation [PENDIENTE: confirmar con tu empleador cómo describir la industria] were analysed product by product, and each analysis took about 10 minutes.',
        'The goal was a platform where the client only registers its connection to SAP Service Layer and the platform handles the rest: reading the data, forecasting demand and producing purchase requisitions.',
      ],
      role: [
        'I proposed, designed, built and deployed the platform end to end.',
        '[PENDIENTE: detalla tu rol concreto: qué partes escribiste tú y con quién colaboraste]',
      ],
      decisions: [
        {
          topic: 'Multi-tenancy and client onboarding',
          chosen: '[PENDIENTE: cómo aíslas los datos de cada cliente y cómo funciona el registro de la conexión]',
          discarded: '[PENDIENTE: alternativas que evaluaste]',
          why: '[PENDIENTE: por qué elegiste este enfoque]',
        },
        {
          topic: 'Forecasting approach',
          chosen:
            'Time-series forecasting that returns confidence intervals, not only a point estimate. [PENDIENTE: modelo o librería elegida]',
          discarded: '[PENDIENTE: modelos o enfoques descartados]',
          why: '[PENDIENTE: por qué]',
        },
        {
          topic: 'How the result reaches SAP',
          chosen: 'The platform generates purchase requisitions automatically in SAP. [PENDIENTE: mecanismo y validaciones]',
          discarded: '[PENDIENTE: alternativas]',
          why: '[PENDIENTE: por qué]',
        },
      ],
      architecture: {
        caption: 'Context and container view of the platform.',
        media: {
          kind: 'diagram',
          ratio: '16 / 9',
          alt: 'C4 architecture diagram of the Demand Forecasting Platform',
          pending: 'Diagrama C4 (contexto y contenedores) rediseñado en SVG con la paleta del sitio',
        },
      },
      results: [
        { label: 'Per-product analysis', before: '~10 min', after: 'seconds' },
        { label: 'Purchase requisitions', after: 'Generated automatically in SAP' },
        { label: 'Adoption', after: 'Pilot with one client: 2,000+ products across 32 branches' },
        { label: 'Forecast accuracy', after: '[PENDIENTE: backtest con métrica vs. baseline]' },
      ],
      tech: [
        { group: 'Cloud', items: ['AWS'] },
        { group: 'Integration', items: ['SAP Service Layer'] },
        { group: 'Forecasting', items: ['Time-series forecasting with confidence intervals'] },
        {
          group: 'Other',
          items: ['[PENDIENTE: lenguajes, framework web, librería de forecasting, base de datos y servicios de AWS]'],
        },
      ],
      retro: ['[PENDIENTE: qué harías distinto, con criterio y madurez]'],
      demo: {
        caption: 'Walkthrough with synthetic data.',
        media: {
          kind: 'video',
          ratio: '16 / 9',
          alt: 'Demo of the Demand Forecasting Platform with synthetic data',
          pending: 'Demo de ~2 min (YouTube no listado o Vimeo) o capturas con datos sintéticos',
        },
      },
    },
    wms: {
      slug: 'wms',
      kicker: 'Android · Warehouse operations',
      title: 'WMS: warehouse operations from an Android app',
      summary:
        'An Android warehouse management app used daily for picking, packing and transfers on industrial devices.',
      keyMetric: { value: '~30%', label: 'improvement in goods receiving' },
      cover: {
        kind: 'video',
        ratio: '16 / 10',
        alt: 'Android app scanning items in a warehouse',
        pending: 'Loop mudo de 10–15 s del flujo de escaneo en la app, con datos sintéticos, y su portada',
      },
      context: [
        'The operation needed to digitise warehouse work: receiving, picking, packing and transfers, done on the floor from handheld devices.',
        'The app had to work with industrial scanners and label printers, and let operators scan items in batches.',
      ],
      role: ['[PENDIENTE: tu rol: diseño, desarrollo Android, integración con SAP, despliegue]'],
      decisions: [
        {
          topic: 'Native Android',
          chosen: 'A native Android app running in production. [PENDIENTE: lenguaje y arquitectura de la app]',
          discarded: '[PENDIENTE: alternativas, p. ej. multiplataforma o web móvil]',
          why: '[PENDIENTE: por qué]',
        },
        {
          topic: 'Industrial hardware',
          chosen: 'Integration with Zebra scanners and printers.',
          discarded: '[PENDIENTE: alternativas]',
          why: '[PENDIENTE: por qué]',
        },
        {
          topic: 'Batch scanning',
          chosen: 'Batch scanning through QR codes.',
          discarded: '[PENDIENTE: alternativas]',
          why: '[PENDIENTE: por qué]',
        },
      ],
      architecture: {
        caption: 'How the app, the backend and the warehouse devices fit together.',
        media: {
          kind: 'diagram',
          ratio: '16 / 9',
          alt: 'Architecture diagram of the WMS',
          pending: 'Diagrama de arquitectura del WMS (app, API, SAP, dispositivos Zebra)',
        },
      },
      results: [
        { label: 'Daily users', after: '~200' },
        { label: 'Daily operations', after: '2,000+ picking, packing and transfer operations' },
        { label: 'Goods receiving', after: '~30% improvement' },
      ],
      tech: [
        { group: 'Mobile', items: ['Android (native)'] },
        { group: 'Hardware', items: ['Zebra scanners', 'Zebra printers', 'QR batch scanning'] },
        { group: 'Other', items: ['[PENDIENTE: lenguaje, API/backend e integración con SAP]'] },
      ],
      retro: ['[PENDIENTE: qué harías distinto]'],
      demo: {
        caption: 'The app in use, with synthetic data.',
        media: {
          kind: 'video',
          ratio: '16 / 9',
          alt: 'Demo of the WMS app with synthetic data',
          pending: 'Demo o capturas del WMS con datos sintéticos y marco de dispositivo discreto',
        },
      },
    },
    tms: {
      slug: 'tms',
      kicker: 'Android · Offline-first',
      title: 'TMS: proof of delivery that works without a connection',
      summary:
        'An Android transport management app with driver tracking, photo evidence, customer signature and offline mode.',
      keyMetric: { value: '~10', label: 'active users' },
      status: 'Paused, waiting for requirements for the web portal.',
      cover: {
        kind: 'video',
        ratio: '16 / 10',
        alt: 'Android app capturing a delivery signature',
        pending: 'Loop mudo de 10–15 s de una entrega (firma y foto) con datos sintéticos, y su portada',
      },
      context: [
        'The transport operation needed to know where drivers were and to prove each delivery.',
        'Drivers often work without a reliable connection, so the app had to keep working offline.',
      ],
      role: ['[PENDIENTE: tu rol]'],
      decisions: [
        {
          topic: 'Offline mode',
          chosen: 'The app works offline. [PENDIENTE: estrategia de almacenamiento local y de sincronización]',
          discarded: '[PENDIENTE: alternativas]',
          why: '[PENDIENTE: por qué]',
        },
        {
          topic: 'Delivery evidence',
          chosen: 'Photo evidence and customer signature captured in the app.',
          discarded: '[PENDIENTE: alternativas]',
          why: '[PENDIENTE: por qué]',
        },
      ],
      architecture: {
        caption: 'How the driver app, the backend and tracking fit together.',
        media: {
          kind: 'diagram',
          ratio: '16 / 9',
          alt: tmsDiagramAlt('en'),
          svg: tmsDiagram('en'),
        },
      },
      results: [
        { label: 'Active users', after: '~10' },
        { label: 'Status', after: 'Paused until the requirements for the web portal are defined' },
      ],
      tech: [
        { group: 'Mobile', items: ['Android (native)', 'Driver GPS', 'Photo evidence', 'Customer signature', 'Offline mode'] },
        { group: 'Other', items: ['[PENDIENTE: lenguaje, backend y sincronización]'] },
      ],
      retro: ['[PENDIENTE: qué harías distinto]'],
      demo: {
        caption: 'The delivery flow, with synthetic data.',
        media: {
          kind: 'video',
          ratio: '16 / 9',
          alt: 'Demo of the TMS app with synthetic data',
          pending: 'Demo o capturas del TMS con datos sintéticos',
        },
      },
    },
    automations: {
      slug: 'automations',
      kicker: 'Integrations · SAP B1 · Pipelines',
      title: 'Smaller automations that removed hours of manual work',
      summary:
        'A set of integrations and pipelines on top of SAP Business One that turned manual, slow processes into reliable ones.',
      keyMetric: { value: '~70%', label: 'less time in the SAP B1 sync' },
      cover: {
        kind: 'video',
        ratio: '16 / 10',
        alt: 'Animated pipeline with an orchestrator dispatching parallel workers',
        pending: 'Animación del diagrama orquestador / workers / callback (reemplaza al video en este caso)',
      },
      context: [
        'Several day-to-day processes depended on manual work or on slow synchronisation across branches.',
        'Each of these automations had to be reliable on real ERP data, handle errors and report its state.',
      ],
      role: ['[PENDIENTE: tu rol en cada automatización]'],
      decisions: [
        {
          topic: 'Sync pipeline architecture',
          chosen:
            'An orchestrator / worker / callback pattern with parallel tasks, retries and checkpoints.',
          discarded: '[PENDIENTE: alternativas que se evaluaron y por qué se descartaron]',
          why: '[PENDIENTE: por qué]',
        },
      ],
      architecture: {
        caption: 'Orchestrator, workers and callback in the SAP B1 sync pipeline.',
        media: {
          kind: 'diagram',
          ratio: '16 / 9',
          alt: 'Diagram of the orchestrator, worker and callback pattern',
          pending: 'Diagrama del orquestador, workers paralelos y callback',
        },
      },
      modules: [
        {
          title: 'SAP B1 sync pipeline',
          problem: 'A massive, slow synchronisation of products across branches.',
          solution: 'Redesigned with an orchestrator / worker / callback pattern, parallel tasks, retries and checkpoints.',
          result: '~70% less sync time, with ~150,000 products across ~30 branches.',
        },
        {
          title: 'Bulk document upload',
          problem: 'Documents of ~500 products each had to be captured by hand.',
          solution:
            'Upload of ~500 products per file, with validation of existence and duplicates, and retries and checkpoints per item.',
          result: 'Replaced manual data entry.',
        },
        {
          title: 'Inbound goods distribution',
          problem: 'Each incoming document was distributed by hand in a spreadsheet, taking ~1–2 hrs per document.',
          solution: 'Automated the distribution of incoming goods.',
          result: '~6 documents a day, saving ~6–8 hrs a day.',
        },
        {
          title: 'Invoice stamping (CFDI) and bulk purchase orders',
          problem: '[PENDIENTE: describe cómo se hacía antes del proceso de timbrado y carga de órdenes]',
          solution: 'Automated both, with error handling and status tracking.',
          result: '[PENDIENTE: cifra de impacto, si la tienes]',
        },
      ],
      results: [
        { label: 'SAP B1 sync', before: 'Slow, massive sync', after: '~70% less time (~150,000 products, ~30 branches)' },
        { label: 'Inbound goods distribution', before: '~1–2 hrs per document', after: '~6–8 hrs saved per day' },
        { label: 'Bulk document upload', after: '~500 products per file, validated, with per-item retries' },
      ],
      tech: [
        { group: 'ERP', items: ['SAP Business One'] },
        { group: 'Patterns', items: ['Orchestrator / worker / callback', 'Parallel tasks', 'Retries and checkpoints'] },
        { group: 'Other', items: ['[PENDIENTE: lenguajes, colas, base de datos y servicios usados]'] },
      ],
      retro: ['[PENDIENTE: qué harías distinto en el pipeline de sincronización]'],
      demo: {
        caption: 'The pipeline running, with synthetic data.',
        media: {
          kind: 'video',
          ratio: '16 / 9',
          alt: 'Demo of the sync pipeline with synthetic data',
          pending: 'Captura o video corto de una ejecución del pipeline con datos sintéticos',
        },
      },
    },
  },
  about: {
    eyebrow: 'About',
    title: 'Software engineer, from the problem to production',
    paragraphs: [
      "I'm Rodrigo, a software engineer based in Pachuca, México, with about three and a half years of professional experience building backend systems, mobile apps and cloud infrastructure for business operations.",
      'I like owning a problem end to end: understanding the operation, designing the system, shipping it and seeing how it behaves in production.',
      'I use AI agents as part of my engineering practice, writing specs and plans and reviewing the result, and I keep communication short and explicit.',
    ],
    photos: [
      {
        kind: 'image',
        ratio: '4 / 3',
        alt: 'Rodrigo working at his desk',
        src: '/media/wo-context-1.webp',
      },
      {
        kind: 'image',
        ratio: '4 / 3',
        alt: 'Rodrigo in an operations context',
        src: '/media/op-context-1.webp',
      },
    ],
    educationTitle: 'Education',
    education: [
      'B.Eng. in Control and Automation Engineering, IPN (2015–2020)',
      'President of the ISA-IPN student section',
    ],
    certificationsTitle: 'Certifications',
    certifications: [
      'MIT xPRO: Designing and Developing AI Products and Services (2025)',
    ],
  },
  stack: {
    eyebrow: 'Stack',
    title: 'Tools I use',
    intro: 'A quick reference, grouped by area.',
    groups: [
      { group: 'Backend', items: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis'] },
      { group: 'Cloud / DevOps', items: ['Docker', 'AWS', 'Github Actions', 'Terraform'] },
      { group: 'Data / AI', items: ['Prophet'] },
      { group: 'SAP', items: ['SAP Business One', 'Service Layer', 'BPA', 'Web Client Extensions'] },
      { group: 'Frontend', items: ['TypeScript', 'Angular'] },
      { group: 'Mobile', items: ['Android (Kotlin)'] },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    text: 'If you want to talk about ERP integrations, data pipelines or forecasting, send me a message.',
    emailLabel: 'Email me',
    email: 'picazodeveloper@gmail.com',
    linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rodrigomarquezp' },
    github: { label: 'GitHub', href: 'https://github.com/Ro-MP', pending: 'Github' },
    cv: { label: 'Download CV', pending: 'PDF del CV en inglés' },
    expectation: 'I reply within 48 hours',
    location: 'Pachuca, Hidalgo, México',
  },
  footer: {
    confidentiality:
      'Case studies are anonymised: client names and data are omitted, and any screenshots use synthetic data.',
    rights: '© 2026 Jose Rodrigo Marquez Picazo',
    builtWith: 'Built with Angular, hosted on AWS (S3 and CloudFront), infrastructure in Terraform.',
  },
  notFound: {
    title: 'Page not found',
    text: "That page doesn't exist.",
    home: 'Back to the home page',
  },
};
