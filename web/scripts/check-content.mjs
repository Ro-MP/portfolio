// Auditoría de veracidad y confidencialidad (spec 3.5 y 3.6). Falla si el contenido viola alguna regla.
import { join } from 'node:path';
import { PENDING_MARKER, SRC, listFiles, loadContents, read, rel, walk } from './lib.mjs';

// Términos que no deben aparecer nunca en el sitio. [regex, motivo]
const FORBIDDEN = [
  [/farmagana/i, 'nombre de cliente (D4)'],
  [/redsinergia/i, 'nombre del empleador (regla 3.6.4)'],
  [/farmac|pharma/i, 'identifica la industria del cliente (regla 3.6.3)'],
  [/freelanc/i, 'lenguaje comercial (D3)'],
  [/work with me|hire me|trabaja conmigo|contr[aá]tame/i, 'lenguaje comercial (D3)'],
  [/available for|disponible para (proyectos|contrataci)/i, 'lenguaje comercial / búsqueda de empleo (D3)'],
  [/my services|mis servicios|servicios de consultor/i, 'ofrece servicios (D3)'],
  [/\brates?\b|tarifa|hourly|por hora/i, 'tarifas (D3)'],
  [/cloud architect/i, 'afirmación no permitida (spec 3.5)'],
  [/infrastructure as code|infraestructura como c[oó]digo/i, 'IaC sin nombrar la herramienta (spec 3.5)'],
  [/previene quiebres|prevent(s|ing)? stock-?outs?/i, 'afirmación no permitida (spec 3.5)'],
  [/forecast accuracy of|precisi[oó]n del \d|\d+% (accuracy|de precisi)/i, 'cifra de precisión inexistente (spec 3.5)'],
  [/sustituy[oó] un rol|replaced a (dedicated )?role/i, 'redacción sensible (regla 3.6.6)'],
  [/passionate|rockstar|synergy/i, 'jerga vacía (spec 3.7)'],
];

// Números permitidos: solo los de la sección 3.4 del spec (más años y fechas).
const ALLOWED_NUMBERS = new Set([
  '70', '150,000', '150', '30', '2,000', '32', '10', '500', '200', '6', '8', '1', '2',
  '2015', '2020', '2025', '2026',
]);
const SKIP_KEYS = new Set(['ratio', 'href', 'email', 'src', 'poster', 'lang', 'ogLocale', 'type', 'slug', 'pending', 'cvPending']);

const problems = [];
const { en, es } = await loadContents();

// Un SVG en línea es marcado: se audita solo su texto visible (sin la geometría ni los números de paso 1–9).
const svgText = (svg) =>
  [...svg.matchAll(/>([^<]+)</g)]
    .map((m) => m[1].trim())
    .filter((t) => t && !/^\d$/.test(t))
    .join(' ');

function strings(content) {
  const out = [];
  walk(content, (path, value, _p, key) => {
    if (typeof value === 'string' && !SKIP_KEYS.has(key)) out.push({ path, text: key === 'svg' ? svgText(value) : value });
  });
  return out;
}

// 1) Términos prohibidos y números fuera de la lista, en ambos idiomas.
for (const [lang, content] of [['en', en], ['es', es]]) {
  for (const { path, text } of strings(content)) {
    for (const [re, why] of FORBIDDEN) {
      if (re.test(text)) problems.push(`[${lang}] ${path}: "${text.slice(0, 60)}…" → ${why}`);
    }
    const clean = text.replace(PENDING_MARKER, ' ').replace(/\b(C4|S3)\b/g, ' ');
    for (const n of clean.match(/\d[\d,]*(?:\.\d+)?/g) ?? []) {
      if (!ALLOWED_NUMBERS.has(n.replace(/[.,]$/, ''))) problems.push(`[${lang}] ${path}: número "${n}" no está en el spec 3.4`);
    }
  }
}

// 2) Paridad EN/ES: mismos números en cada ruta.
const numbersByPath = (content) => {
  const map = new Map();
  for (const { path, text } of strings(content)) {
    map.set(path, (text.replace(PENDING_MARKER, ' ').replace(/\b(C4|S3)\b/g, ' ').match(/\d[\d,]*/g) ?? []).sort().join('|'));
  }
  return map;
};
const enNums = numbersByPath(en);
const esNums = numbersByPath(es);
for (const [path, nums] of enNums) {
  if (esNums.get(path) !== nums) problems.push(`Paridad: ${path} tiene números distintos en EN y ES (${nums} vs ${esNums.get(path)})`);
}

// 3) Términos prohibidos en el código y las plantillas.
for (const file of listFiles(join(SRC, 'app'), '.ts').concat(listFiles(SRC, '.html'))) {
  if (file.includes('/content/') || file.endsWith('.spec.ts')) continue;
  read(file).split('\n').forEach((line, i) => {
    for (const [re, why] of FORBIDDEN) {
      if (re.test(line)) problems.push(`${rel(file)}:${i + 1}: ${why}`);
    }
  });
}

if (problems.length) {
  console.error(`check-content: ${problems.length} problema(s)\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('check-content: OK (sin términos prohibidos, números solo del spec, paridad EN/ES).');
