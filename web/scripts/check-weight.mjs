// Presupuesto de peso por página: HTML + CSS + JS iniciales, comprimidos con gzip (sin fuentes ni medios diferidos).
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { ROOT, listFiles, rel } from './lib.mjs';

const OUT = join(ROOT, 'dist', 'web', 'browser');
const BUDGET_KB = Number(process.env['WEIGHT_BUDGET_KB'] ?? 130);
const gz = (buf) => gzipSync(buf).length;

let failed = 0;
console.log(`Peso inicial por página (gzip, presupuesto ${BUDGET_KB} kB)\n`);
for (const file of listFiles(OUT, '.html')) {
  if (file.endsWith('index.csr.html')) continue;
  const html = readFileSync(file);
  const refs = new Set();
  for (const m of html.toString().matchAll(/<(?:link rel="(?:stylesheet|modulepreload)"[^>]*href|script[^>]*src)="([^"]+)"/g)) {
    refs.add(m[1].replace(/^\//, ''));
  }
  let total = gz(html);
  for (const ref of refs) {
    const p = join(OUT, ref);
    if (existsSync(p) && statSync(p).isFile()) total += gz(readFileSync(p));
  }
  const kb = total / 1024;
  const ok = kb <= BUDGET_KB;
  if (!ok) failed++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${kb.toFixed(1).padStart(6)} kB  ${rel(file).replace('dist/web/browser/', '')}`);
}
if (failed) {
  console.error(`\n${failed} página(s) exceden el presupuesto.`);
  process.exit(1);
}
