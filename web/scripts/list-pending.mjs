// Genera PENDING.md con todo lo que falta por completar y, con --check, falla si queda algo.
//   node scripts/list-pending.mjs            → escribe PENDING.md
//   node scripts/list-pending.mjs --check    → además sale con error si hay pendientes (ALLOW_PENDING=1 lo permite)
import { writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { PENDING_MARKER, ROOT, SRC, listFiles, loadContents, read, walk } from './lib.mjs';

const MEDIA_ASSETS = ['src', 'svg', 'videoSources'];

function collect(content) {
  const items = [];
  walk(content, (path, value, parent, key) => {
    if (typeof value === 'string') {
      for (const m of value.matchAll(PENDING_MARKER)) items.push({ path, kind: 'texto', note: m[1].trim() });
      return;
    }
    if (!value || typeof value !== 'object' || Array.isArray(value)) return;

    // Medios: `pending` solo cuenta mientras no exista el archivo.
    if (typeof value.pending === 'string' && 'kind' in value) {
      const hasAsset = MEDIA_ASSETS.some((k) => (Array.isArray(value[k]) ? value[k].length : value[k]));
      if (!hasAsset) items.push({ path, kind: 'medio', note: value.pending });
    }
    // Enlaces opcionales: la nota solo cuenta mientras no exista el href.
    if (typeof value.pending === 'string' && !('kind' in value) && 'label' in value && !value.href) {
      items.push({ path, kind: 'enlace', note: value.pending });
    }
    if (path === 'nav' && !value.cvHref) items.push({ path: 'nav.cv', kind: 'enlace', note: value.cvPending });
  });
  return items;
}

const { en, es } = await loadContents();
const enItems = collect(en);
const esItems = collect(es);

// Los mismos pendientes deben existir en ambos idiomas.
const key = (i) => `${i.path} (${i.kind})`;
const enPaths = new Set(enItems.map(key));
const esPaths = new Set(esItems.map(key));
const drift = [...enPaths].filter((p) => !esPaths.has(p)).concat([...esPaths].filter((p) => !enPaths.has(p)));

// Pendientes en configuración / código
const configItems = [];
const INFRA = join(ROOT, '..', 'infra');
const configFiles = [join(SRC, 'app', 'site.config.ts'), ...listFiles(INFRA, '.tf'), join(INFRA, 'terraform.tfvars.example')];
for (const file of configFiles) {
  read(file)
    .split('\n')
    .forEach((line, i) => {
      for (const m of line.matchAll(PENDING_MARKER)) {
        configItems.push({ path: `${relative(join(ROOT, '..'), file)}:${i + 1}`, kind: 'config', note: m[1].trim() });
      }
    });
}

const section = (title, items) =>
  items.length
    ? `## ${title} (${items.length})\n\n${items.map((i) => `- [ ] \`${i.path}\` — ${i.note}`).join('\n')}\n`
    : '';

const media = enItems.filter((i) => i.kind === 'medio');
const links = enItems.filter((i) => i.kind === 'enlace');
const texts = enItems.filter((i) => i.kind === 'texto');
const total = enItems.length + configItems.length;

const md = `# PENDING — lo que falta por completar

> Generado por \`npm run pending\`. No lo edites a mano.
> Cada ruta es de \`src/app/content/en.ts\`; el mismo cambio va en \`es.ts\`.
> Total: **${total}** (${media.length} medios, ${links.length} enlaces/archivos, ${texts.length} textos, ${configItems.length} de configuración).

${section('Medios: fotos, videos y diagramas', media)}
${section('Enlaces y archivos', links)}
${section('Textos y datos del proyecto', texts)}
${section('Configuración', configItems)}`.replace(/\n{3,}/g, '\n\n');

writeFileSync(join(ROOT, '..', 'PENDING.md'), md);
console.log(`PENDING.md actualizado: ${total} pendientes (${media.length} medios, ${links.length} enlaces, ${texts.length} textos, ${configItems.length} config).`);

if (drift.length) {
  console.error(`\nLos pendientes de EN y ES no coinciden (${drift.length}):\n  ${drift.slice(0, 10).join('\n  ')}`);
  process.exit(1);
}
if (process.argv.includes('--check') && total > 0 && process.env['ALLOW_PENDING'] !== '1') {
  console.error(`\nBuild de release bloqueado: quedan ${total} pendientes. Ver PENDING.md (o ALLOW_PENDING=1 para staging).`);
  process.exit(1);
}
