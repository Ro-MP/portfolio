// Verifica el contraste WCAG de los pares de color usados en el sitio (lee los tokens de styles/tokens.css).
import { join } from 'node:path';
import { SRC, read } from './lib.mjs';

const css = read(join(SRC, 'styles', 'tokens.css'));
const tokens = {};
for (const m of css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) tokens[m[1]] = m[2];
tokens['ink-deep'] ??= tokens['ink'];

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(tokens[a]), lum(tokens[b])].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [texto, fondo, mínimo, dónde se usa]
const PAIRS = [
  ['ink', 'cream', 4.5, 'Texto principal'],
  ['ink', 'paper', 4.5, 'Texto en tarjetas'],
  ['ink-soft', 'cream', 4.5, 'Texto secundario'],
  ['ink-soft', 'paper', 4.5, 'Texto secundario en tarjetas'],
  ['accent-text', 'cream', 4.5, 'Enlaces y cifras clave'],
  ['accent-text', 'paper', 4.5, 'Enlaces y cifras en tarjetas'],
  ['terracotta', 'cream', 3, 'Foco visible (UI)'],
  ['cream', 'terracotta', 4.5, 'Botón primario'],
  ['cream', 'terracotta-deep', 4.5, 'Botón primario (hover)'],
  ['cream', 'ink', 4.5, 'Selector de idioma activo, botón ghost (hover)'],
  ['cream-light', 'ink-deep', 4.5, 'Texto en secciones oscuras'],
  ['on-dark-soft', 'ink-deep', 4.5, 'Texto secundario en oscuro'],
  ['amber', 'ink-deep', 4.5, 'Cifras, eyebrow y enlaces en oscuro'],
  ['ink', 'amber', 4.5, 'Etiqueta PENDIENTE y botón primario en oscuro'],
];

let failed = 0;
console.log('Contraste WCAG AA\n');
for (const [fg, bg, min, use] of PAIRS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${r.toFixed(2).padStart(5)}:1 (mín. ${min})  ${fg} sobre ${bg}  ·  ${use}`);
}
console.log(`\nNota: sage (${tokens.sage}) sobre cream da ${ratio('sage', 'cream').toFixed(2)}:1; solo para detalles decorativos, nunca texto pequeño.`);
console.log(`Nota: terracotta sobre paper da ${ratio('terracotta', 'paper').toFixed(2)}:1; por eso el texto usa accent-text.`);
if (failed) {
  console.error(`\n${failed} par(es) no cumplen.`);
  process.exit(1);
}
