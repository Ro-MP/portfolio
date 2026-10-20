import type { Lang } from '../types';

/**
 * Diagrama de arquitectura del TMS (SVG en línea, 960 × 540).
 *
 * Convenciones (ver `shared/media.ts` y `shared/svg-draw.directive.ts`):
 * - Los conectores y las puntas de flecha son path/polygon: se "dibujan" al entrar en pantalla.
 * - Las cajas son rect y los textos son text: aparecen sin animar, así que el diagrama es legible aunque no haya movimiento.
 * - Colores y fuentes salen de `styles/tokens.css`; el hex es solo el respaldo.
 * - Contenido genérico: sin nombres de empresa, clientes ni sistemas internos.
 */

interface Labels {
  readonly title: string;
  readonly desc: string;
  readonly alt: string;
  readonly zones: { readonly device: string; readonly sync: string; readonly backend: string; readonly consumers: string };
  readonly deliveries: readonly [string, string];
  readonly capture: readonly [string, string, string];
  readonly localDb: readonly [string, string];
  readonly queue: readonly [string, string];
  readonly gps: readonly [string, string];
  readonly decision: readonly [string, string];
  readonly online: readonly [string, string, string];
  readonly offline: readonly [string, string, string];
  readonly api: string;
  readonly db: string;
  readonly storage: readonly [string, string];
  readonly location: readonly [string, string];
  readonly portal: string;
  readonly paused: string;
  readonly ops: readonly [string, string, string, string];
  readonly legend: readonly [string, string];
}

const LABELS: Record<Lang, Labels> = {
  es: {
    title: 'Arquitectura de la app de transporte con modo sin conexión',
    desc: 'Flujo en seis pasos de izquierda a derecha: el chofer recibe entregas, captura foto y firma, y las guarda en una base de datos local con cola de sincronización. La app detecta si hay conexión: con conexión sincroniza con el servidor; sin conexión la evidencia queda pendiente y se reenvía al volver la señal. En el backend están la API, la base de datos, el almacenamiento de evidencias y el servicio de ubicación. La operación consulta evidencia y ubicación, y el portal web está en pausa.',
    alt: 'Diagrama de arquitectura del TMS: la app del chofer guarda la evidencia en local, sincroniza con el backend cuando hay conexión y la operación consulta evidencia y ubicación.',
    zones: { device: 'Dispositivo del chofer', sync: 'Sincronización', backend: 'Backend', consumers: 'Consumidores' },
    deliveries: ['Entregas del día', 'Recibe las entregas'],
    capture: ['Captura de evidencia', 'Llega y captura', 'foto + firma'],
    localDb: ['Base de datos local', 'Guarda en local'],
    queue: ['Cola de', 'sincronización'],
    gps: ['GPS', 'Registra posición'],
    decision: ['¿Hay conexión?', 'Detecta conexión'],
    online: ['Con conexión', 'Sincroniza con', 'el servidor'],
    offline: ['Sin conexión', 'Pendiente en local', 'Cola y reintentos'],
    api: 'API',
    db: 'Base de datos',
    storage: ['Almacenamiento', 'de evidencias'],
    location: ['Servicio de', 'ubicación'],
    portal: 'Portal web',
    paused: 'En pausa',
    ops: ['Operación /', 'monitoreo', 'Consulta evidencia', 'y ubicación'],
    legend: ['Continuo: con conexión', 'Punteado: sin conexión / en pausa'],
  },
  en: {
    title: 'Architecture of the transport app with offline mode',
    desc: 'Six-step flow from left to right: the driver receives deliveries, captures a photo and signature, and saves them in a local database with a sync queue. The app detects whether there is a connection: when online it syncs with the server; when offline the evidence stays pending and is resent once the signal returns. The backend holds the API, the database, evidence storage and the location service. Operations views evidence and location, and the web portal is paused.',
    alt: 'Architecture diagram of the TMS: the driver app saves evidence locally, syncs with the backend when there is a connection, and operations views evidence and location.',
    zones: { device: "Driver's device", sync: 'Sync', backend: 'Backend', consumers: 'Consumers' },
    deliveries: ["Today's deliveries", 'Receives deliveries'],
    capture: ['Evidence capture', 'Arrives and captures', 'photo + signature'],
    localDb: ['Local database', 'Saves locally'],
    queue: ['Sync', 'queue'],
    gps: ['GPS', 'Logs position'],
    decision: ['Connected?', 'Detects connection'],
    online: ['Online', 'Syncs with', 'the server'],
    offline: ['Offline', 'Pending locally', 'Queue and retries'],
    api: 'API',
    db: 'Database',
    storage: ['Evidence', 'storage'],
    location: ['Location', 'service'],
    portal: 'Web portal',
    paused: 'Paused',
    ops: ['Operations /', 'monitoring', 'Views evidence', 'and location'],
    legend: ['Solid: online', 'Dotted: offline / paused'],
  },
};

export const tmsDiagramAlt = (lang: Lang): string => LABELS[lang].alt;

export function tmsDiagram(lang: Lang): string {
  const t = LABELS[lang];
  const sub = 'font-size:15px;font-weight:400;fill:var(--ink-soft,#4A5565)';
  const node = 'fill:var(--cream,#FAF5EC);stroke:var(--sand,#E2D6C1);stroke-width:1.5';
  const zone = 'fill:none;stroke:var(--sand,#E2D6C1);stroke-width:1.5';
  const accent = 'fill:none;stroke:var(--amber,#E3A33B);stroke-width:3;stroke-linecap:round';
  const step = 'fill:var(--cream,#FAF5EC);stroke:var(--terracotta,#B84A24);stroke-width:1.5';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="tms-title tms-desc" style="font-family:var(--font-sans,system-ui,sans-serif)">
  <title id="tms-title">${t.title}</title>
  <desc id="tms-desc">${t.desc}</desc>

  <g id="tms-zones">
    <rect id="tms-zone-device" x="12" y="16" width="236" height="464" rx="16" style="${zone}"/>
    <rect id="tms-zone-sync" x="272" y="16" width="214" height="464" rx="16" style="${zone}"/>
    <rect id="tms-zone-backend" x="510" y="16" width="224" height="464" rx="16" style="${zone}"/>
    <rect id="tms-zone-consumers" x="758" y="16" width="190" height="464" rx="16" style="${zone}"/>
  </g>

  <g id="tms-zone-titles" style="font-family:var(--font-serif,Georgia,serif);font-size:18px;font-weight:600;fill:var(--ink,#1C2430)">
    <text x="26" y="46">${t.zones.device}</text>
    <text x="286" y="46">${t.zones.sync}</text>
    <text x="524" y="46">${t.zones.backend}</text>
    <text x="770" y="46">${t.zones.consumers}</text>
  </g>

  <g id="tms-accents">
    <path d="M26,57 H50" style="${accent}"/>
    <path d="M286,57 H310" style="${accent}"/>
    <path d="M524,57 H548" style="${accent}"/>
    <path d="M770,57 H794" style="${accent}"/>
  </g>

  <g id="tms-connectors">
    <path id="tms-c-1-2" d="M130,128 V143" fill="none" style="stroke:var(--terracotta,#B84A24);stroke-width:2"/>
    <polygon id="tms-h-1-2" points="130,152 125,143 135,143" style="fill:var(--terracotta,#B84A24);stroke:none"/>
    <path id="tms-c-2-3" d="M130,234 V251" fill="none" style="stroke:var(--terracotta,#B84A24);stroke-width:2"/>
    <polygon id="tms-h-2-3" points="130,260 125,251 135,251" style="fill:var(--terracotta,#B84A24);stroke:none"/>
    <path id="tms-c-gps" d="M130,404 V389" fill="none" style="stroke:var(--ink-soft,#4A5565);stroke-width:1.5"/>
    <polygon id="tms-h-gps" points="130,380 125,389 135,389" style="fill:var(--ink-soft,#4A5565);stroke:none"/>
    <path id="tms-c-3-4" d="M234,320 H277" fill="none" style="stroke:var(--terracotta,#B84A24);stroke-width:2"/>
    <polygon id="tms-h-3-4" points="286,320 277,315 277,325" style="fill:var(--terracotta,#B84A24);stroke:none"/>
    <path id="tms-c-online" d="M372,291 V264" fill="none" style="stroke:var(--sage,#6F8F72);stroke-width:2"/>
    <polygon id="tms-h-online" points="372,255 367,264 377,264" style="fill:var(--sage,#6F8F72);stroke:none"/>
    <path id="tms-c-offline" d="M372,349 V376" fill="none" style="stroke:var(--ink-soft,#4A5565);stroke-width:2;stroke-dasharray:6 6"/>
    <polygon id="tms-h-offline" points="372,385 367,376 377,376" style="fill:var(--ink-soft,#4A5565);stroke:none"/>
    <path id="tms-c-retry" d="M458,425 H472 V240 H467" fill="none" style="stroke:var(--sage,#6F8F72);stroke-width:2"/>
    <polygon id="tms-h-retry" points="458,240 467,235 467,245" style="fill:var(--sage,#6F8F72);stroke:none"/>
    <path id="tms-c-5" d="M458,205 H515" fill="none" style="stroke:var(--terracotta,#B84A24);stroke-width:2"/>
    <polygon id="tms-h-5" points="524,205 515,200 515,210" style="fill:var(--terracotta,#B84A24);stroke:none"/>
    <path id="tms-c-api-tree" d="M536,227 V430 M536,273 H540 M536,348 H540 M536,430 H540" fill="none" style="stroke:var(--ink-soft,#4A5565);stroke-width:1.5"/>
    <polygon id="tms-h-db" points="548,273 539,268 539,278" style="fill:var(--ink-soft,#4A5565);stroke:none"/>
    <polygon id="tms-h-storage" points="548,348 539,343 539,353" style="fill:var(--ink-soft,#4A5565);stroke:none"/>
    <polygon id="tms-h-location" points="548,430 539,425 539,435" style="fill:var(--ink-soft,#4A5565);stroke:none"/>
    <path id="tms-c-portal" d="M720,205 H761" fill="none" style="stroke:var(--ink-soft,#4A5565);stroke-width:2;stroke-dasharray:6 6"/>
    <polygon id="tms-h-portal" points="770,205 761,200 761,210" style="fill:var(--ink-soft,#4A5565);stroke:none"/>
    <path id="tms-c-6a" d="M720,348 H761" fill="none" style="stroke:var(--terracotta,#B84A24);stroke-width:2"/>
    <polygon id="tms-h-6a" points="770,348 761,343 761,353" style="fill:var(--terracotta,#B84A24);stroke:none"/>
    <path id="tms-c-6b" d="M720,430 H761" fill="none" style="stroke:var(--terracotta,#B84A24);stroke-width:2"/>
    <polygon id="tms-h-6b" points="770,430 761,425 761,435" style="fill:var(--terracotta,#B84A24);stroke:none"/>
  </g>

  <g id="tms-nodes">
    <rect id="tms-n-deliveries" x="26" y="68" width="208" height="60" rx="12" style="${node}"/>
    <rect id="tms-n-capture" x="26" y="152" width="208" height="82" rx="12" style="${node}"/>
    <rect id="tms-n-localdb" x="26" y="260" width="208" height="120" rx="12" style="${node}"/>
    <rect id="tms-n-queue" x="40" y="318" width="180" height="50" rx="12" style="fill:none;stroke:var(--terracotta,#B84A24);stroke-width:1.5"/>
    <rect id="tms-n-gps" x="26" y="404" width="208" height="58" rx="12" style="${node}"/>
    <rect id="tms-n-decision" x="286" y="291" width="172" height="58" rx="12" style="fill:var(--cream,#FAF5EC);stroke:var(--terracotta,#B84A24);stroke-width:1.5"/>
    <rect id="tms-n-online" x="286" y="175" width="172" height="80" rx="12" style="fill:var(--cream,#FAF5EC);stroke:var(--sage,#6F8F72);stroke-width:1.5"/>
    <rect id="tms-n-offline" x="286" y="385" width="172" height="80" rx="12" style="fill:var(--cream,#FAF5EC);stroke:var(--ink-soft,#4A5565);stroke-width:1.5;stroke-dasharray:6 6"/>
    <rect id="tms-n-api" x="524" y="183" width="196" height="44" rx="12" style="${node}"/>
    <rect id="tms-n-db" x="548" y="251" width="172" height="44" rx="12" style="${node}"/>
    <rect id="tms-n-storage" x="548" y="319" width="172" height="58" rx="12" style="${node}"/>
    <rect id="tms-n-location" x="548" y="401" width="172" height="58" rx="12" style="${node}"/>
    <rect id="tms-n-portal" x="770" y="177" width="166" height="56" rx="12" style="fill:var(--cream,#FAF5EC);stroke:var(--ink-soft,#4A5565);stroke-width:1.5;stroke-dasharray:6 6"/>
    <rect id="tms-n-ops" x="770" y="321" width="166" height="136" rx="12" style="fill:var(--ink-deep,#1B2433);stroke:var(--ink-deep,#1B2433);stroke-width:1.5"/>
    <rect id="tms-n-paused-tag" x="828" y="165" width="100" height="24" rx="12" style="${node}"/>
  </g>

  <g id="tms-labels" style="font-size:16px;font-weight:600;fill:var(--ink,#1C2430)">
    <text x="40" y="94">${t.deliveries[0]}<tspan x="40" y="114" style="${sub}">${t.deliveries[1]}</tspan></text>
    <text x="40" y="178">${t.capture[0]}<tspan x="40" y="198" style="${sub}">${t.capture[1]}</tspan><tspan x="40" y="216" style="${sub}">${t.capture[2]}</tspan></text>
    <text x="40" y="286">${t.localDb[0]}<tspan x="40" y="306" style="${sub}">${t.localDb[1]}</tspan></text>
    <text x="130" y="339" style="font-size:15px;text-anchor:middle">${t.queue[0]}<tspan x="130" y="357">${t.queue[1]}</tspan></text>
    <text x="40" y="430">${t.gps[0]}<tspan x="40" y="450" style="${sub}">${t.gps[1]}</tspan></text>
    <text x="300" y="317">${t.decision[0]}<tspan x="300" y="337" style="${sub}">${t.decision[1]}</tspan></text>
    <text x="300" y="201">${t.online[0]}<tspan x="300" y="221" style="${sub}">${t.online[1]}</tspan><tspan x="300" y="239" style="${sub}">${t.online[2]}</tspan></text>
    <text x="300" y="411">${t.offline[0]}<tspan x="300" y="431" style="${sub}">${t.offline[1]}</tspan><tspan x="300" y="449" style="${sub}">${t.offline[2]}</tspan></text>
    <text x="538" y="211">${t.api}</text>
    <text x="562" y="279">${t.db}</text>
    <text x="562" y="345">${t.storage[0]}<tspan x="562" y="364">${t.storage[1]}</tspan></text>
    <text x="562" y="427">${t.location[0]}<tspan x="562" y="446">${t.location[1]}</tspan></text>
    <text x="786" y="211">${t.portal}</text>
    <text x="878" y="182" style="font-family:var(--font-mono,ui-monospace,monospace);font-size:15px;font-weight:400;text-anchor:middle;fill:var(--ink-soft,#4A5565)">${t.paused}</text>
  </g>

  <g id="tms-labels-dark" style="font-size:16px;font-weight:600;fill:var(--cream-light,#F4EBDD)">
    <text x="786" y="362">${t.ops[0]}<tspan x="786" y="381">${t.ops[1]}</tspan><tspan x="786" y="406" style="font-size:15px;font-weight:400">${t.ops[2]}</tspan><tspan x="786" y="424" style="font-size:15px;font-weight:400">${t.ops[3]}</tspan></text>
  </g>

  <g id="tms-steps" style="font-family:var(--font-mono,ui-monospace,monospace);font-size:15px;font-weight:700;text-anchor:middle;fill:var(--accent-text,#A8431F)">
    <circle id="tms-s1" cx="212" cy="68" r="13" style="${step}"/>
    <text x="212" y="73">1</text>
    <circle id="tms-s2" cx="212" cy="152" r="13" style="${step}"/>
    <text x="212" y="157">2</text>
    <circle id="tms-s3" cx="212" cy="260" r="13" style="${step}"/>
    <text x="212" y="265">3</text>
    <circle id="tms-s4" cx="436" cy="291" r="13" style="${step}"/>
    <text x="436" y="296">4</text>
    <circle id="tms-s5" cx="436" cy="175" r="13" style="${step}"/>
    <text x="436" y="180">5</text>
    <circle id="tms-s6" cx="914" cy="321" r="13" style="${step}"/>
    <text x="914" y="326">6</text>
  </g>

  <g id="tms-legend">
    <path id="tms-leg-solid" d="M16,507 H46" fill="none" style="stroke:var(--sage,#6F8F72);stroke-width:2"/>
    <path id="tms-leg-dotted" d="M230,507 H260" fill="none" style="stroke:var(--ink-soft,#4A5565);stroke-width:2;stroke-dasharray:6 6"/>
    <g style="font-size:13px;font-weight:400;fill:var(--ink-soft,#4A5565)">
      <text x="54" y="512">${t.legend[0]}</text>
      <text x="268" y="512">${t.legend[1]}</text>
    </g>
  </g>
</svg>`;
}
