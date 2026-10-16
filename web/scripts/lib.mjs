// Utilidades compartidas por los scripts de calidad (Node 22+, importa los .ts de contenido directamente).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const SRC = join(ROOT, 'src');

export const PENDING_MARKER = /\[PENDIENTE:\s*([^\]]+)\]/g;

export async function loadContents() {
  const load = async (name) =>
    (await import(pathToFileURL(join(SRC, 'app', 'content', `${name}.ts`)).href))[name];
  return { en: await load('en'), es: await load('es') };
}

/** Recorre un objeto y llama a `visit(path, value, parent, key)` por cada hoja y cada objeto. */
export function walk(value, visit, path = '', parent = null, key = null) {
  visit(path, value, parent, key);
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, visit, `${path}[${i}]`, value, i));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) walk(v, visit, path ? `${path}.${k}` : k, value, k);
  }
}

export function listFiles(dir, ext, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) listFiles(full, ext, out);
    else if (full.endsWith(ext)) out.push(full);
  }
  return out;
}

export const read = (file) => readFileSync(file, 'utf8');
export const rel = (file) => relative(ROOT, file);
