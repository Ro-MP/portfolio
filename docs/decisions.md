# Decisiones

| ID | Decisión | Motivo |
|---|---|---|
| D1 | Frontend en **Angular**, salida estática (prerender), sin servidor. | Preferencia de Rodrigo; el sitio es estático y se sirve desde un CDN. |
| D2 | Hosting en **AWS**: S3 privado + CloudFront, infraestructura con **Terraform**. DNS se queda en Hostinger. | Costo mínimo, sin límite práctico de ancho de banda para los loops de video, y Terraform es nombrable en el sitio. |
| D3 | El sitio **no ofrece servicios**: sin sección Services, sin "Work with me", sin lenguaje freelance. | Evitar conflictos con el empleador. Solo credenciales y logros. |
| D4 | El proyecto de forecasting se llama **Demand Forecasting Platform**. "Farmagana" es un cliente y no aparece. | Confidencialidad. |
| D5 | Título del Hero: **Software Engineer**. El ángulo Product / Forward-Deployed va en tagline y subtítulo. | Es el título real y el más buscable; las palabras clave de FDE/Product se ganan sin afirmar un puesto que no se ha tenido. |
| D6 | EN y ES desde el inicio. Contenido tipado (`SiteContent`) en `en.ts` y `es.ts`. | Si falta una clave en un idioma, no compila. |
| D7 | Orden de casos: Demand Forecasting, WMS, TMS, automatizaciones menores. | Indicación de Rodrigo. |
| D8 | Todo lo que falte se marca **PENDIENTE** y se ve en la interfaz. Un build de release falla si queda alguno. | Que nada incompleto llegue a producción por descuido. |
| D9 | El sitio se despliega con `noindex` hasta que Rodrigo confirme el contenido. | Confidencialidad. |
| D10 | Tinta y Tinta profunda se unifican en `#1c2430`. El texto pequeño en terracota usa `--accent-text` (`#a8431f`). | Eran casi idénticos; Terracota `#b84a24` sobre Papel da 4.35:1 y no cumple AA para texto pequeño. `scripts/check-contrast.mjs` lo verifica. |
| D11 | El sitio no emite señales de búsqueda de empleo: sin "open to work", sin "open to relocation", sin disponibilidad. | Coherente con D3. El contacto dice solo "Get in touch". Se puede cambiar editando `contact` y `hero` en `content/`. |
| D12 | Angular 21 (no 22). Se instala con `legacy-peer-deps` (`web/.npmrc`). | Angular 22 exige Node ≥ 22.22 y la máquina tiene 22.18; npm 10 falla resolviendo peers de jsdom sin esa bandera. |
| D13 | DNS en Hostinger: el sitio se sirve en `www.<dominio>` y el apex se redirige con el reenvío de dominio de Hostinger. | Hostinger no permite CNAME en el apex y CloudFront requiere un nombre DNS. |
