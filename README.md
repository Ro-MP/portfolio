# Portafolio — Jose Rodrigo Marquez Picazo

Sitio estático en **Angular 21** (prerender), bilingüe **EN | ES**, alojado en **AWS (S3 + CloudFront)** con **Terraform**.
Define el QUÉ y el POR QUÉ en [`portfolio-spec.md`](portfolio-spec.md) y las decisiones en [`docs/decisions.md`](docs/decisions.md).

> **Lo que falta por completar está en [`PENDING.md`](PENDING.md)** (se genera con `npm run pending`).
> En el sitio, cada pendiente se ve como una etiqueta ámbar **PENDIENTE**.

## Estado actual
- Sitio completo construido (Hero, métricas, 4 casos, About, Stack, Contact) en EN y ES.
- Todo lo que falta (fotos, videos, diagramas, detalles de proyectos, enlaces) está marcado como **PENDIENTE**.
- `infra/` está escrito pero **no validado ni aplicado**: no hay nada creado en AWS ni en Hostinger todavía.
- El sitio se construye con `noindex`; no se indexa hasta que lo apruebes (ver `docs/runbook.md`, paso 5).

## Estructura

| Ruta | Qué es |
|---|---|
| `web/` | App Angular. Contenido en `web/src/app/content/{en,es}.ts` |
| `infra/` | Terraform: bucket S3 privado, CloudFront, certificado, rol de deploy por OIDC, alarma de costos |
| `docs/` | `decisions.md` (decisiones), `taglines.md` (opciones de tagline y título) y `runbook.md` (despliegue) |
| `.github/workflows/` | CI (tests, build, e2e, `terraform validate`) y deploy |

## Trabajar en el sitio

Requisitos: Node 20.19+ / 22.12+ (Angular 21).

```bash
cd web
npm install          # usa legacy-peer-deps por web/.npmrc
npm start            # http://localhost:4200
npm test             # pruebas unitarias (Vitest)
npm run build:staging  # build + contraste + auditoría de contenido + pendientes + peso
npm run e2e          # Playwright + axe sobre el build; corre build:staging antes
                     # (la primera vez: npx playwright install chromium)
```

### Editar contenido
Todo el texto vive en `content/en.ts` y `content/es.ts`, tipado con `SiteContent` (`content/types.ts`):
si falta una clave en un idioma, **no compila**. Para marcar algo pendiente escribe `[PENDIENTE: lo que falta]`
dentro del texto, o `pending: '…'` en un medio. Para completar un medio, añade `src`, `videoSources` o `svg`
(los archivos van en `web/public/media/`).

#### Ejemplo: completar la foto del Hero
1. Copia la imagen a `web/public/media/portrait.avif`.
2. En `content/en.ts` y `content/es.ts`, dentro de `hero.photo`, añade `src: '/media/portrait.avif'` y quita `pending`.
3. `npm run pending` y el marco PENDIENTE desaparece (de la página y de `PENDING.md`).

Para un video de portada usa `videoSources: [{ src: '/media/loop.webm', type: 'video/webm' }, { src: '/media/loop.mp4', type: 'video/mp4' }]` y `poster`.
Loops mudos de 10–15 s, 720p, idealmente ≤ 2 MB cada uno. El demo largo va en YouTube/Vimeo, no en el sitio.

### Controles de calidad (corren en `build:staging` y en CI)
- `check:contrast`: contraste WCAG AA de cada par de color usado.
- `check:content`: términos prohibidos (clientes, empleador, lenguaje comercial, afirmaciones de spec 3.5), números solo del spec 3.4 y paridad EN/ES.
- `pending`: regenera `PENDING.md`.
- `e2e`: navegación, switch de idioma, redirección por idioma, axe (WCAG AA), teclado, "reducir movimiento" y móvil (sin scroll horizontal, objetivos de 44 px).
- `build:release`: igual que staging pero **falla si queda un pendiente** y quita `noindex` de las páginas.

## Publicar
Ver [`docs/runbook.md`](docs/runbook.md). El sitio nace con `noindex` y no se indexa hasta que lo apruebes.

## Reglas de contenido (resumen)
El sitio solo muestra credenciales y logros: sin servicios, sin lenguaje comercial ni de búsqueda de empleo,
sin nombres de cliente ni del empleador, y con la nota de confidencialidad en el footer y en cada caso.
Detalle en `portfolio-spec.md` (sección 3.6); `check:content` lo hace cumplir.
