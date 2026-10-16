// Después de `ng build`: 404.html, robots.txt, sitemap.xml y (opcional) quita noindex.
//   ALLOW_INDEX=1  → publica sin noindex (solo cuando Rodrigo lo apruebe)
//   SITE_URL=https://www.tudominio.com → habilita sitemap.xml
import { copyFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, listFiles, read, rel } from './lib.mjs';

const OUT = join(ROOT, 'dist', 'web', 'browser');
const SITE_URL = (process.env['SITE_URL'] ?? '').replace(/\/$/, '');
const CASES = ['demand-forecasting', 'wms', 'tms', 'automations'];
const LANGS = ['en', 'es'];

// 404: el shell de cliente resuelve la ruta `**` y muestra la página de error.
copyFileSync(join(OUT, 'index.csr.html'), join(OUT, '404.html'));

let stripped = 0;
if (process.env['ALLOW_INDEX'] === '1') {
  for (const file of listFiles(OUT, '.html')) {
    const html = read(file);
    const next = html
      .replace(/\s*<!-- noindex[^>]*-->/g, '')
      .replace(/\s*<meta name="robots" content="noindex, nofollow">/g, '');
    if (next !== html) {
      writeFileSync(file, next);
      stripped++;
    }
  }
}

const robots = ['User-agent: *', 'Allow: /', SITE_URL ? `Sitemap: ${SITE_URL}/sitemap.xml` : ''].filter(Boolean);
writeFileSync(join(OUT, 'robots.txt'), `${robots.join('\n')}\n`);

if (SITE_URL) {
  const paths = ['', ...CASES.map((c) => `/cases/${c}`)];
  const urls = paths.flatMap((p) =>
    LANGS.map((lang) => {
      const alternates = LANGS.map(
        (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${p}"/>`,
      ).join('\n');
      return `  <url>\n    <loc>${SITE_URL}/${lang}${p}</loc>\n${alternates}\n  </url>`;
    }),
  );
  writeFileSync(
    join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
  );
}

console.log(
  `postbuild: 404.html, robots.txt${SITE_URL ? ', sitemap.xml' : ' (sin sitemap: falta SITE_URL)'}` +
    `${process.env['ALLOW_INDEX'] === '1' ? `, noindex retirado de ${stripped} páginas` : ', noindex ACTIVO'} → ${rel(OUT)}`,
);
